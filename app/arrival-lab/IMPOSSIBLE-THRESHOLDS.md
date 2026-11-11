# Arrival 07.4 — Antipayuta

Local prototype on `/arrival-lab`. The repository places Living Works beyond the Living Wall, through the light well's east passage. The new independent door is cut into Arrival Hall's end wall at x=-12, z=-69.5, left of that existing circulation route. No Works geometry changes.

Walk toward the hall's far wall. Look left of the Living Wall for a quiet grey door. Click, tap, press E/Enter, or use the existing touch action within 3.5 metres. One activation opens it; walk through the pale reveal. Opening from a distance never changes environments. The Arctic return frame remains directly behind the arrival point, already open. Walk back through it to return. Global destination shortcuts return to the hall before handing off to their existing navigation owner.

`impossible-threshold.ts` owns the doorway state, active environment, rigid doorway transform, background/fog, and Arctic resources. The existing frame loop, renderer, camera, input, UI, and radio persist. Hall objects and their lights are hidden while Arctic is active. Movement uses separate collision sets. The switch is concealed by pale physical reveal geometry; it is not an arbitrary-angle rendered portal.

The snowfield continues under the visitor without a hard playable boundary. Low horizon ridges establish tundra scale. The wooden house is 79 metres from the frame, with a warm window and a small cradle/blanket silhouette. All objects are artistic memory cues, not historical reconstructions. No downloaded assets or new dependencies.

Validation: existing Arrival, Works, radio, screen, spatial, and touch tests; dedicated closed-door, crossing, return, collision-isolation, and reduced-motion tests; production Nuxt build. Browser visual review remains necessary, particularly doorway composition, white-reveal exposure, and touch interaction in portrait/landscape.
