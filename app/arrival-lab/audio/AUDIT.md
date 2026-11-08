# Arrival 05.1 audio audit and root causes

## Why the unwanted sound started and continued

The removed `WorldAudioManager.enable()` created and resumed a browser AudioContext, then called `startAmbience()`. That built an eight-second looping noise buffer, high/low-pass filters, three tonal oscillators and three modulation oscillators. All ran independently of the YouTube player's power state. Both Enable Sound and the radio's power action called this same activation path.

Radio power-off stopped/destroyed only the YouTube player. It did not stop those Web Audio sources. Master mute ramped a gain down while the generators remained scheduled; workspace entry only ducked their gain. Source nodes stopped and the AudioContext closed only when the route unmounted. This explains the background drone after stopping music.

`cue()` separately built triangle-wave oscillators, gain envelopes and optional positional panners. Living Wall state watchers triggered activation, propagation, panel motion, opening and closing cues. Portal state watchers triggered focus, entry, arrival and exit cues. A camera listener update also ran in the render loop. These were all unnecessary once custom world audio was rejected.

## Why closing the terminal stopped YouTube

`RadioControls.vue` attached the player host and watched its `active` prop. Closing the physical interaction called `setVisible(false)`, which invoked destructive power-off. Workspace entry also called that visibility method. The iframe was physically owned by the terminal's CSS3D DOM surface, with no independent visible playback presentation.

## Why the UI was duplicated

The physical radio and Sound Settings each rendered `RadioControls`. Top controls exposed Enable Sound/Mute and Sound Settings; the settings panel duplicated radio controls and added master, ambience and SFX sliders. Radio power also activated world sound, so the controls represented overlapping lifecycles and could not make Stop predictably silent.

## Removal and replacement

- Deleted the entire world audio manager, audio source ownership, noise/oscillator creation, gain buses, listener positioning and custom playback methods.
- Removed every wall/portal SFX watcher and the unused cue configuration.
- Removed Sound Settings, world sound toggles, duplicate controls, old localization keys and their styles.
- Retained only a route-owned YouTube controller with one volume and mute state.
- Created one persistent fixed player host outside canvas/CSS3D and workspace ownership. Presentation changes alter CSS coordinates; they never reparent, reload, seek or duplicate the iframe.
- Terminal close and portal entry select mini presentation, without any playback command. Stop alone ends the session; navigating away disposes it.
- Retained existing physical receiver geometry, navigation, wall/portal mechanisms, themes and workspace content. Only the workspace keyboard focus loop was adjusted to allow access to the global player.

There are no replacement sounds, audio assets, browser AudioContexts or procedural generators in Arrival. The only audible source is the explicitly selected official YouTube player. Native YouTube ads/UI remain under YouTube control.
