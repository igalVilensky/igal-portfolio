# Arrival radio provenance

No local audio assets, procedural ambience, oscillators, noise buffers, custom sound loops or SFX remain in Arrival 05.1. YouTube is the only audio source. The old manager and event hooks were deleted, rather than muted.

Video IDs, creator/title metadata and embed verification are documented in [YOUTUBE.md](./YOUTUBE.md). Root causes and removed infrastructure are documented in [AUDIT.md](./AUDIT.md). Playback uses the visible official YouTube IFrame API; no media is downloaded, extracted, rehosted or proxied.
