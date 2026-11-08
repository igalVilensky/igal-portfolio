import { nextTick, reactive } from 'vue';
import { stations } from './stations';
import { loadYouTube, type YouTubeAPI, type YouTubePlayer } from './youtube-api';
export type PlayerMode = 'docked' | 'mini' | 'expanded';

/** Route-owned playback. Presentation changes never move/recreate the iframe. */
export class YouTubeRadio {
  readonly state = reactive({
    station: 0, manualVideoId: '', power: false, status: 'off',
    errorCode: null as number | null, mode: 'docked' as PlayerMode,
    volume: .25, muted: false,
  });
  private host?: HTMLElement;
  private player?: YouTubePlayer;
  private ready = false;
  private generation = 0;
  private desiredId = '';
  private timer?: ReturnType<typeof setTimeout>;
  private disposed = false;
  private visibility = () => { if (document.hidden) this.pause(); };
  constructor(private api: () => Promise<YouTubeAPI> = loadYouTube) {}
  get videoId() { return this.state.manualVideoId || stations[this.state.station]!.videoId; }
  get sourceUrl() { return `https://www.youtube.com/watch?v=${this.videoId}`; }
  get title() { return this.state.manualVideoId || stations[this.state.station]!.name; }
  mount() {
    try {
      const saved = JSON.parse(localStorage.getItem('arrival-radio-v1') || '{}');
      if (typeof saved.volume === 'number' && Number.isFinite(saved.volume)) this.state.volume = Math.max(0, Math.min(1, saved.volume));
    } catch { /* Storage is optional. Never restore power or autoplay. */ }
    document.addEventListener('visibilitychange', this.visibility);
  }
  attach(host: HTMLElement) { this.host = host; }
  setMode(mode: PlayerMode) { this.state.mode = mode; }
  private canPresent() {
    if (!this.host || document.hidden) return false;
    const r = this.host.getBoundingClientRect();
    return r.width >= 200 && r.height >= 200 && r.left >= 0 && r.top >= 0 && r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1;
  }
  checkPresentation() {
    if (this.state.status === 'playing' && !this.canPresent()) { this.pause(); this.state.status = 'presentation'; }
  }
  private clearDeadline() { clearTimeout(this.timer); this.timer = undefined; }
  private deadline() {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.clearDeadline();
      this.player?.pauseVideo();
      ++this.generation;
      this.player?.destroy();
      this.player = undefined;
      this.ready = false;
      this.host?.replaceChildren();
      this.state.status = 'error';
    }, 15000);
  }
  private currentVideo() { return this.player?.getVideoData().video_id === this.desiredId; }
  async play() {
    if (this.disposed) return;
    const id = this.videoId;
    const sameVideo = id === this.desiredId;
    this.desiredId = id;
    this.state.power = true;
    this.state.status = 'loading';
    this.state.errorCode = null;
    // Allow the persistent host to become visible before measuring or loading media.
    await nextTick();
    if (this.disposed || !this.state.power || id !== this.videoId || this.state.status === 'paused') return;
    if (!this.canPresent()) { this.state.status = 'presentation'; return; }
    this.clearDeadline();
    this.deadline();
    if (this.player && this.ready) {
      this.applyVolume();
      if (sameVideo && this.currentVideo()) this.player.playVideo();
      else { this.desiredId = id; this.player.stopVideo(); this.player.loadVideoById(id); }
      return;
    }
    this.desiredId = id;
    const token = ++this.generation;
    try {
      const api = await this.api();
      if (token !== this.generation || this.disposed || !this.state.power) return;
      this.player?.destroy();
      const target = document.createElement('div');
      this.host!.replaceChildren(target);
      this.player = new api.Player(target, {
        width: 480, height: 270, videoId: id,
        playerVars: { autoplay: 0, controls: 1, playsinline: 1, origin: location.origin },
        events: {
          onReady: () => {
            if (token !== this.generation || !this.player) return;
            this.ready = true;
            this.player.getIframe().title = 'YouTube radio';
            this.player.getIframe().referrerPolicy = 'strict-origin-when-cross-origin';
            this.applyVolume();
            if (this.canPresent() && this.state.status === 'loading') this.player.playVideo();
          },
          onStateChange: ({ data }) => {
            if (token !== this.generation || !this.state.power || !this.currentVideo()) return;
            if (data === 1) {
              if (!this.canPresent()) { this.pause(); this.state.status = 'presentation'; return; }
              this.clearDeadline(); this.state.status = 'playing';
            }
            else if (data === 2) { this.clearDeadline(); if (!['gesture','error','unavailable','presentation'].includes(this.state.status)) this.state.status = 'paused'; }
            else if (data === 0) { this.clearDeadline(); this.state.status = 'ended'; }
            else if (data === 3) { this.state.status = 'loading'; this.deadline(); }
          },
          onError: ({ data }) => {
            if (token !== this.generation || !this.state.power) return;
            const reportedId = this.player?.getVideoData().video_id;
            if (reportedId && reportedId !== this.desiredId) return;
            this.clearDeadline(); this.state.errorCode = data;
            this.state.status = [100,101,150].includes(data) ? 'unavailable' : 'error';
          },
          onAutoplayBlocked: () => {
            if (token !== this.generation) return;
            this.clearDeadline(); this.state.status = 'gesture';
          },
        },
      });
    } catch {
      if (token === this.generation) { this.clearDeadline(); this.state.status = 'error'; }
    }
  }
  async togglePlayback() {
    if (['playing','loading'].includes(this.state.status)) this.pause(); else await this.play();
  }
  pause() {
    if (!this.state.power) return;
    this.clearDeadline(); this.player?.pauseVideo(); this.state.status = 'paused';
  }
  select(index: number) {
    this.state.manualVideoId = '';
    this.state.station = (index + stations.length) % stations.length;
    if (this.state.power) void this.play();
  }
  playManual(id: string) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    this.state.manualVideoId = id; void this.play();
  }
  setVolume(value: number) {
    if (!Number.isFinite(value)) return;
    this.state.volume = Math.max(0, Math.min(1, value)); this.applyVolume();
    try { localStorage.setItem('arrival-radio-v1', JSON.stringify({ volume: this.state.volume })); } catch { /* optional */ }
  }
  toggleMute() { this.state.muted = !this.state.muted; this.applyVolume(); }
  private applyVolume() {
    if (!this.ready || !this.player) return;
    this.player.setVolume(Math.round(this.state.volume * 100));
    if (this.state.muted) this.player.mute(); else this.player.unMute();
  }
  stop() {
    ++this.generation; this.clearDeadline(); this.ready = false;
    this.player?.destroy(); this.player = undefined; this.host?.replaceChildren();
    this.desiredId = ''; this.state.power = false; this.state.status = 'off'; this.state.errorCode = null;
  }
  dispose() { this.disposed = true; this.stop(); document.removeEventListener('visibilitychange', this.visibility); this.host = undefined; }
}
