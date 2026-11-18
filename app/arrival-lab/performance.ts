import type * as T from 'three';
import { collisionMetrics, collisionOwners } from './collision';

export const arrivalMetrics = { enabled: false, picks: 0 };
export type CpuPhase = 'movement' | 'npc' | 'interaction' | 'world' | 'matrices' | 'renderSubmission' | 'other';
const phases: CpuPhase[] = ['movement','npc','interaction','world','matrices','renderSubmission','other'];
const stats = (values: number[]) => {
  if (!values.length) return { samples: 0, avgMs: null, p95Ms: null };
  const sorted = [...values].sort((a,b)=>a-b);
  return { samples: values.length, avgMs: values.reduce((a,b)=>a+b,0)/values.length,
    p95Ms: values.length >= 20 ? sorted[Math.ceil(values.length*.95)-1]! : null };
};

/** Opt-in CPU instrumentation. Exclusive phase times partition the handler; collision
 * is a separate inclusive subset, NEVER added to phase totals. No GPU timing claims. */
export function createArrivalDiagnostics(renderer: T.WebGLRenderer, clock = () => performance.now()) {
  arrivalMetrics.enabled = collisionMetrics.enabled = true;
  const raf: number[] = [], handlers: number[] = [];
  const phaseSamples = Object.fromEntries(phases.map(p=>[p,[] as number[]])) as Record<CpuPhase,number[]>;
  const frameCosts = Object.fromEntries(phases.map(p=>[p,0])) as Record<CpuPhase,number>;
  const stack: CpuPhase[] = [];
  let active: CpuPhase = 'other', inFrame = false, stamp = 0, started = 0;
  let last: number | undefined, windowStart = 0, reportAt = 0;
  let calls = 0, triangles = 0, main = 0, offscreen = 0, outsideRenderMs = 0, previousReportCpuMs = 0;
  let previousGeometries = renderer.info.memory.geometries, previousTextures = renderer.info.memory.textures;
  const restorers: (()=>void)[] = [];
  function charge() { const now=clock(); if(inFrame)frameCosts[active]+=now-stamp;stamp=now; }
  function enter(phase: CpuPhase) { if(!inFrame)return;charge();stack.push(active);active=phase; }
  function leave() { if(!inFrame)return;charge();active=stack.pop() ?? 'other'; }
  function clearWindow() {
    raf.length=handlers.length=0;for(const p of phases)phaseSamples[p].length=0;
    calls=triangles=main=offscreen=outsideRenderMs=0;
    for(const key of Object.keys(collisionMetrics) as (keyof typeof collisionMetrics)[])if(key!=='enabled')(collisionMetrics[key] as number)=0;
    arrivalMetrics.picks=0;collisionOwners.clear();
  }
  const original = renderer.render;
  const wrapped: typeof renderer.render = function(scene, camera) {
    const outsideStart = inFrame ? 0 : clock();
    enter('renderSubmission');
    try { original.call(renderer, scene, camera); }
    finally {
      leave();
      if(!inFrame)outsideRenderMs+=clock()-outsideStart;
      // Three resets info per render by default; each pass is counted once.
      calls+=renderer.info.render.calls;triangles+=renderer.info.render.triangles;
      if(renderer.getRenderTarget())offscreen++;else main++;
    }
  };
  clearWindow();
  renderer.render=wrapped;
  return {
    beginFrame(now: number) {
      if(last===undefined){windowStart=now;reportAt=now+2000;}
      else raf.push(now-last);
      last=now;for(const p of phases)frameCosts[p]=0;
      stack.length=0;active='other';started=stamp=clock();inFrame=true;
    },
    phase(phase: CpuPhase) { if(inFrame){charge();active=phase;} },
    enter, leave,
    /** Observe explicit scene-wide updates and selected subtree roots, including updates
     * invoked inside renderer.render. Recursive descendants are included once. */
    observeMatrices(object: T.Object3D) {
      for(const method of ['updateMatrixWorld','updateWorldMatrix'] as const){
        const original=object[method],descriptor=Object.getOwnPropertyDescriptor(object,method);
        const wrapped=(...args: boolean[])=>{enter('matrices');try{(original as (...args:boolean[])=>void).apply(object,args);}finally{leave();}};
        object[method]=wrapped;
        restorers.push(()=>{if(object[method]===wrapped){if(descriptor)Object.defineProperty(object,method,descriptor);else delete (object as unknown as Record<string,unknown>)[method];}});
      }
    },
    endFrame(now: number, environment: string, familyAssets = 'unknown') {
      charge();inFrame=false;
      handlers.push(stamp-started);for(const p of phases)phaseSamples[p].push(frameCosts[p]);
      if(now<reportAt)return;
      const reportStarted=clock(),windowMs=now-windowStart,frames=handlers.length;
      const frameStats=stats(raf),handlerStats=stats(handlers),geometries=renderer.info.memory.geometries,textures=renderer.info.memory.textures;
      console.table({environment, familyAssets, windowMs, completedHandlers:frames, rafIntervalAvgMs:frameStats.avgMs, rafIntervalP95Ms:frameStats.p95Ms,
        rafFps:frameStats.avgMs ? 1000/frameStats.avgMs : null,
        handlerCpuAvgMs:handlerStats.avgMs, handlerCpuP95Ms:handlerStats.p95Ms,
        drawCallsPerHandler:calls/frames, trianglesPerHandler:triangles/frames, mainPassesWindow:main, offscreenPassesWindow:offscreen,
        geometries, textures, geometryDelta:geometries-previousGeometries, textureDelta:textures-previousTextures,
        collisionQueriesWindow:collisionMetrics.collisionQueries, collisionCpuWindowMs:collisionMetrics.collisionMs,
        collisionBroadPhaseWindowMs:collisionMetrics.broadPhaseMs, collisionZeroQueriesWindow:collisionMetrics.zeroQueries,
        collisionCandidatesAvg:collisionMetrics.candidates/Math.max(1,collisionMetrics.collisionQueries-collisionMetrics.zeroQueries),
        collisionStaticCandidatesWindow:collisionMetrics.candidates-collisionMetrics.dynamicCandidates,
        collisionCandidatesMax:collisionMetrics.maxCandidates, collisionDynamicCandidatesWindow:collisionMetrics.dynamicCandidates,
        collisionBroadPhaseMeshesWindow:collisionMetrics.broadPhaseMeshes, collisionRaycastsWindow:collisionMetrics.raycasts,
        collisionMeshRaycastDispatchesWindow:collisionMetrics.meshRaycastDispatches,
        interactionQueriesWindow:arrivalMetrics.picks, interactionHz:arrivalMetrics.picks/(windowMs/1000),
        outsideHandlerRenderCpuWindowMs:outsideRenderMs, previousReportCpuMs, gpuTiming:'unavailable'});
      console.table(Object.fromEntries(phases.map(p=>[p,stats(phaseSamples[p])])));
      console.table(Object.fromEntries(collisionOwners));
      previousGeometries=geometries;previousTextures=textures;
      clearWindow();windowStart=now;reportAt=now+2000;previousReportCpuMs=clock()-reportStarted;
    },
    reset() { last=undefined;inFrame=false;stack.length=0;clearWindow(); },
    dispose() { if(renderer.render===wrapped)renderer.render=original;restorers.forEach(restore=>restore());arrivalMetrics.enabled=collisionMetrics.enabled=false; },
  };
}
