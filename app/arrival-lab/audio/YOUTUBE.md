# Arrival YouTube receiver

The receiver uses the official [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference). No Data API key, backend, audio extraction, proxy, downloads or additional playback library.

## Selected stations — checked 2026-11-02

All four below passed **actual embedded playback** in local Chrome at `http://127.0.0.1:3055/arrival-lab`: API state `1` (playing), matching `getVideoData().video_id`, `isPlayable=true`, and advancing `getCurrentTime()` over two seconds. Public YouTube oEmbed responses confirmed their exact titles and creators. Review logs/screenshots are outside Git in `/tmp/arrival-youtube-radio/`. Verification is specific to that date, region and browser, not a guarantee of permanent availability or permission to reuse recordings elsewhere.

| Channel / genre | Title | Creator | YouTube ID / source |
| --- | --- | --- | --- |
| Space Ambient / Cyberpunk | Spacewave Relaxation - PURE Cyberpunk Ambient Bliss - ULTRA RELAXING Blade Runner Vibes | SpaceWave - Cosmic Relaxation | [mgjXO3pay1s](https://www.youtube.com/watch?v=mgjXO3pay1s) |
| Coding / Focus | Find Your Focus — Atmospheric Music for Deep Work \| No AI Music | Chill Music Lab | [xAR6N9N8e6U](https://www.youtube.com/watch?v=xAR6N9N8e6U) |
| Deep Focus / Minimal Ambient | Blade Runner Oasis: A Moody Cyberpunk Ambient Retreat for Sleep & DEEP Relaxation | SpaceWave - Cosmic Relaxation | [ohu59Ssdq7g](https://www.youtube.com/watch?v=ohu59Ssdq7g) |
| Retro Electronic | HOME - Resonance | Electronic Gems | [8GW6sLrK40k](https://www.youtube.com/watch?v=8GW6sLrK40k) |

These are regular videos rather than verified continuous live broadcasts. HOME is a shorter track; the other selections are long-form listening videos. The coding choice is atmospheric electronic music rather than a claimed lo-fi hip-hop station; the cyberpunk choices lean ambient rather than aggressive dark synthwave.

### Rejected live candidates

The following real Lofi Girl IDs appeared in public search results but returned IFrame API error **150** in this browser. None is included in the active channel list. oEmbed alone was not treated as proof of playback; these live entries did not return full creator/title metadata in the local oEmbed responses.

- `jfKfPfyJRdk`: [lofi hip hop radio 📚 - beats to relax/study to](https://www.youtube.com/watch?v=jfKfPfyJRdk)
- `MVPTGNGiI-4`: [synthwave radio 🌌 - beats to chill/game to](https://www.youtube.com/watch?v=MVPTGNGiI-4)
- `SKhpl1OMqEY`: [dark ambient radio 🌃 - music to escape/dream to](https://www.youtube.com/watch?v=SKhpl1OMqEY)

Do not infer from these local failures that a video is unavailable everywhere. Embedding restrictions, account/region conditions and stream changes can differ.

## Configuration

Edit `stations.ts` to add or replace a station. Keep a stable unique id, accurate title/creator/genre, a real eleven-character video ID and original YouTube URL. Keep verification `unverified` until actual embedded playback is observed. The physical receiver also accepts a session-only manual video ID. Neither option bypasses creator, account, consent or regional restrictions.

## Arrival 05.1 playback and presentation

Only YouTube produces audio. There is no AudioContext, synthesized ambience, noise buffer, oscillator, custom sound loop, SFX registry or world sound-event handler. See [AUDIT.md](./AUDIT.md) for the removed implementation's root causes.

`YouTubeRadio` is the route-owned controller. It holds the selected station/manual video, player, playback status, volume/mute, error and presentation mode. The terminal owns no player lifecycle. The route starts silent, and no YouTube iframe is created until Play is explicitly selected. Saved volume does not grant autoplay.

`PersistentRadioPlayer.vue` owns one fixed DOM host outside the Three.js/CSS3D surface, canvas inert state and project workspace. It never reparents the iframe or uses conditional player components for layout changes:

- **docked**: position/size match an empty anchor on the existing physical receiver face.
- **mini**: visible bottom-right, above the existing bottom dock, while exploring or reading the workspace.
- **expanded**: a larger fixed view; Minimize returns to the visible mini-player.

Docking, leaving, expanding, minimizing, theme changes and portal transitions send no play, load or seek command. The same iframe node, content window and playback session remain in place. The receiver's existing chassis and scene geometry remain unchanged. The docking face uses a screen-aligned video viewport in place of a transformed iframe so it can switch layouts reliably.

The terminal provides Play/Pause, Previous/Next, channel selection, Stop, one volume, mute, original-video link and optional manual configuration. Mini mode has Previous, Play/Pause, Next, Expand and Close/Stop in one 44-pixel control row. Expanded mode has the current station name, the same transport, station selection, volume/mute, Minimize and Close/Stop. Native YouTube controls remain available. Close/Stop destroys the session and removes the mini-player; Minimize never hides it. Pause retains position. The bottom dock's radio icon opens the active player or approaches the terminal if stopped. A separate Work Portal icon provides guided approach/entry; the existing portfolio exit, viewpoint return and theme controls remain distinct. The old top-left project links are removed. There are no separate Sound Settings or master/ambience/SFX controls.

One iframe is used for channel changes: stop the old video, then `loadVideoById` on the same player. Resume uses `playVideo`, without reloading or seeking. Timeouts, API errors and autoplay blocks expose a status and original link. Explicit Play at the terminal or native YouTube Play recovers playback. Unmount destroys the player, clears deadlines and removes visibility/resize listeners and observers. Tab hiding pauses; returning to the tab does not automatically resume.

## Visible player requirements

The official [player requirements](https://developers.google.com/youtube/player_parameters) specify at least 200 × 200 pixels, and recommend 480 × 270 for 16:9 players. The mini-player iframe is at least 200 pixels high and 286 pixels wide in its compact 288-pixel frame, with its custom toolbar outside the video. Expanded and docked viewports are measured separately. The iframe, including branding and native controls, is never covered by custom overlays. Ads and native UI are not suppressed.

Only CSS position and dimensions change. If the docked anchor no longer fits the viewport, presentation falls back to mini. Invalid or exceptionally small viewports pause playback rather than continuing hidden audio. There is no media extraction, proxy, download, off-screen playing frame or duplicate frame.

## Verification

Run `node app/arrival-lab/audio/YouTubeRadio.test.mjs` for controller tests covering presentation continuity, pause/resume, switching, stop/disposal, errors, mute/volume, minimum dimensions and timeout cleanup. The real browser review separately checks iframe identity, advancing time through layout/portal changes, one instance, zero page AudioContexts, pause/stop, mobile input and cleanup. Arrival 05.1 artifacts are in `/tmp/arrival-051-radio-cleanup/`; the compact controls and HUD refinement review is in `/tmp/arrival-052-radio-ui/`.

The workspace focus loop yields to the global player so keyboard users can reach its controls. Native keyboard events inside the cross-origin YouTube iframe belong to YouTube; explicit Close/Stop and the terminal's Return button remain available.

Real iOS/Android hardware, Safari volume/autoplay behavior and assistive technology still require device review. YouTube consent, ads, regional availability and creator embedding settings can change. The selected videos are regular recordings rather than guaranteed continuous live stations.

## Arrival 05.2 shared controls and sizing

`RadioTransport.vue` is shared by the physical receiver and both floating modes. Its previous/next actions select configured channels, never seek. `RadioStationControls.vue` is shared by the physical and expanded interfaces and reads the one registry from `stations.ts`. All controls use the same `YouTubeRadio.state`; `togglePlayback()` is the common Play/Pause action. Display changes still issue no media load/seek command.

The outer mini-player is 288 pixels wide instead of 360 (20% narrower); the actual iframe is 286 × 200 pixels. The minimum height limits further vertical reduction. YouTube handles letterboxing at this compact width; video is neither cropped nor concealed. All five toolbar buttons retain 44-pixel targets and localized accessible names/tooltips. The toolbar is outside the iframe, with no extra panel or padding around the video.

A resize observer measures the existing bottom dock so the player clears it by 12 pixels, including a wrapped dock on narrow phones. Expanded mode also fits above the dock. Short landscape viewports use side-by-side video/controls; short portrait views can scroll just the station/volume area without scrolling the video out of sight. Unsupported extremely small viewports pause rather than play invisibly.

Dock and player UI focus release pointer lock. Keyboard events from controls do not reach scene navigation/raycasting. Pointer lock is never automatically reacquired. The Work Portal workspace close button continues to return to the chamber; the dock's exit link leaves the experiment for the localized portfolio home.
