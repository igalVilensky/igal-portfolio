Arrival performance investigation

Enable `/arrival-lab?arrivalPerf` in development or on a local production preview
(`localhost`, `127.0.0.1`, or `[::1]`). Public production hosts remain disabled.
Reports appear every ~2 seconds; no Vue/DOM updates are added.

Metric interpretation

- `rafInterval*Ms` measures callback-start timestamp intervals, not CPU execution.
- `handlerCpu*Ms` measures this animation handler, including instrumentation but
  excluding report generation. Deferred Vue work, event handlers and asset loading
  outside the handler are not included.
- Phase rows are exclusive CPU milliseconds per completed handler (including zeros).
  Their averages sum to handler CPU average; their p95 values must NOT be summed.
  p95 is unavailable below 20 samples. `movement` includes player collision/jumping;
  `npc` includes intelligence/family/work-wing/explorer simulation. `transport`
  includes Horizon Express, SkyTube, coaster and ring/skyfall updates. `water`
  measures lagoon presentation; `atmosphere` measures the Atmosphere Engine;
  `installations` includes printing, interiors and interactive installations.
  `world` includes remaining world logic and portal setup. `other` includes remaining application/telemetry work.
- `matrices` observes scene-wide updates and the Loop District root, including calls
  inside rendering. Other subsystem-local matrix work stays in its owning phase.
- `renderSubmission` is synchronous renderer CPU time, exclusive of observed matrix
  work. It can include driver waits; it is NOT GPU duration. GPU timing is unavailable.
- `collisionCpuWindowMs` sums all createCollision calls, including NPCs and zero
  movement. Calls are synchronous and nonrecursive. Broad-phase time is a SUBSET;
  collision time overlaps movement/NPC/world phases and must NOT be added to them.
  The third table breaks these same totals down by collision owner (player, family,
  coast/snow and district); it is not additional CPU cost.
- Collision candidates, rays and mesh-raycast dispatches count actual work; dispatches
  are not triangle-intersection counts. Broad-phase meshes counts bounds tested after static X/Z grid selection,
  including all dynamic meshes. Triangle narrow-phase behavior is unchanged.
- Pass/query counts and outside-handler render CPU are window totals; Hz uses actual
  window duration. Draw calls/triangles divide all window passes by completed handlers.
  Three's default per-render info reset is retained. Resource counts are renderer-known
  allocations, not bytes or a census of every constructed Three object.
- `previousReportCpuMs` exposes prior aggregation/log-call CPU overhead. It cannot
  measure subsequent DevTools console rendering. Clock reads/counters add overhead;
  compare a short browser trace with diagnostics enabled and disabled if significant.
  Reset discards the partial window after visibility/text-mode pauses.

Reproduce development vs production

1. Run `npm run dev -- --host 127.0.0.1`; open the URL above. Use one browser/device,
   fixed viewport/DPR, theme, motion settings and DevTools configuration; disable CPU
   and network throttling. Keep the tab foregrounded.
2. Wait for Network activity to settle and `familyAssets: ready`. Observe resource
   deltas for at least 30 seconds at rest. Test initial Hall spawn, then repeat one
   fixed 30-second walk to the same destination. Record camera position/look from
   the canvas dataset to reproduce each view. Capture 5–10 complete windows per case.
3. Stop dev. Run `npm run build`, then `node .output/server/index.mjs` with
   `HOST=127.0.0.1 PORT=3000`. Repeat step 2 at the identical URL/positions/settings.
   Keep cold loading separate from warmed measurements. No production FPS is assumed.
4. Compare handler CPU and phase averages/p95 with RAF intervals. If handler time is
   low but intervals remain high, take ONE short browser Performance trace (no
   screenshots) to distinguish outside-handler JS/devtools, scheduling, driver waits
   and GPU work. The interval/CPU gap alone cannot identify GPU saturation.

Resource growth during first visibility is expected: family GLTF loading clones
per-character geometry/materials, portraits add geometry asynchronously, and textures
become renderer-known on upload. These owners have disposal paths. The observed
704→1551 geometries / 56→110 textures alone does not prove a leak or a plateau.
Check that warmed deltas settle; investigate repeated growth on the SAME route before
changing ownership. Asset loading outside RAF is not timed by the phase collector.

Collision microbenchmark: `node scripts/benchmark-arrival-collision.mjs [previous-collision.ts]`.
It uses real Origin/Loop District bridge geometry, warms once, takes five 1,000-query
batches, counts mesh dispatches, and compares final positions. It measures Node CPU
on an unobstructed bridge path, not browser frame time or whole-world performance.
