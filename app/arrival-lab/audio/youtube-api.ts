/** Minimal surface of the official IFrame API; no SDK or Data API key. */
export interface YouTubePlayer {
  loadVideoById(id: string): void;
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  destroy(): void;
  setVolume(value: number): void;
  mute(): void;
  unMute(): void;
  getVideoData(): { video_id?: string };
  getIframe(): HTMLIFrameElement;
}
export interface PlayerOptions {
  width: number; height: number; videoId: string;
  playerVars: Record<string, string | number>;
  events: {
    onReady(): void;
    onStateChange(event: { data: number }): void;
    onError(event: { data: number }): void;
    onAutoplayBlocked(): void;
  };
}
export interface YouTubeAPI { Player: new (element: HTMLElement, options: PlayerOptions) => YouTubePlayer }
declare global { interface Window { YT?: YouTubeAPI } }
let pending: Promise<YouTubeAPI> | undefined;
export function loadYouTube(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;
  pending = new Promise<YouTubeAPI>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    const started = Date.now();
    const finish = (error?: Error) => {
      clearInterval(poll);
      script.onerror = null;
      if (error) { script.remove(); reject(error); }
      else resolve(window.YT!);
    };
    const poll = setInterval(() => {
      if (window.YT?.Player) finish();
      else if (Date.now() - started > 12000) finish(new Error('YouTube API timeout'));
    }, 100);
    script.onerror = () => finish(new Error('YouTube API unavailable'));
    document.head.appendChild(script);
  }).catch(error => { pending = undefined; throw error; });
  return pending;
}
