export interface Station {
  id: string; name: string; creator: string; genre: string; videoId: string;
  sourceUrl: string; verification: 'unverified' | 'verified';
}
// Verification records actual IFrame API playback in the review environment, not perpetual availability.
export const stations: Station[] = [
  {
    "id": "spacewave",
    "name": "Spacewave Relaxation - PURE Cyberpunk Ambient Bliss - ULTRA RELAXING Blade Runner Vibes",
    "creator": "SpaceWave - Cosmic Relaxation",
    "genre": "Space Ambient / Cyberpunk",
    "videoId": "mgjXO3pay1s",
    "sourceUrl": "https://www.youtube.com/watch?v=mgjXO3pay1s",
    "verification": "verified"
  },
  {
    "id": "coding",
    "name": "Find Your Focus — Atmospheric Music for Deep Work | No AI Music",
    "creator": "Chill Music Lab",
    "genre": "Coding / Focus",
    "videoId": "xAR6N9N8e6U",
    "sourceUrl": "https://www.youtube.com/watch?v=xAR6N9N8e6U",
    "verification": "verified"
  },
  {
    "id": "focus",
    "name": "Blade Runner Oasis: A Moody Cyberpunk Ambient Retreat for Sleep & DEEP Relaxation",
    "creator": "SpaceWave - Cosmic Relaxation",
    "genre": "Deep Focus / Minimal Ambient",
    "videoId": "ohu59Ssdq7g",
    "sourceUrl": "https://www.youtube.com/watch?v=ohu59Ssdq7g",
    "verification": "verified"
  },
  {
    "id": "retro",
    "name": "HOME - Resonance",
    "creator": "Electronic Gems",
    "genre": "Retro Electronic",
    "videoId": "8GW6sLrK40k",
    "sourceUrl": "https://www.youtube.com/watch?v=8GW6sLrK40k",
    "verification": "verified"
  }
];
