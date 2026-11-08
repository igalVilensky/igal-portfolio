import * as T from 'three';
import { worldPath } from './works/registry';
import { spawn, destination, type Architecture } from './environment';
export type JourneyState = 'arrival'|'approaching'|'investigating'|'outbound'|'secondary'|'returning';
const inspection = new T.Vector3(0,1.65,-61);
const smooth = (t:number) => t*t*(3-2*t);
export function createJourney(camera:T.Camera, _architecture:Architecture, onState:(s:JourneyState)=>void) {
  let state:JourneyState='arrival', started=0, duration=0, reduced=false, total=0;
  let path:T.Vector3[]=[];
  let pausedAt:number|undefined;
  const moving=()=>['approaching','outbound','returning'].includes(state);
  function change(next:JourneyState){state=next;onState(next);}
  function locate(){const next=camera.position.z < -72 ? 'secondary' : camera.position.z < -50 ? 'investigating' : 'arrival';if(next!==state)change(next);}
  function move(next:JourneyState, target:T.Vector3) {
    path=worldPath(camera.position,target);total=0;
    for(let i=1;i<path.length;i++)total+=path[i]!.distanceTo(path[i-1]!);
    started=performance.now();duration=reduced?.12:next==='approaching'?3.2:2.6;change(next);
  }
  return {
    get state(){return state;}, get moving(){return moving();},
    setReduced(value:boolean){reduced=value;},
    setPaused(value:boolean){
      if(value && pausedAt===undefined)pausedAt=performance.now();
      else if(!value && pausedAt!==undefined){started+=performance.now()-pausedAt;pausedAt=undefined;}
    },
    cancel(){locate();}, locate(){if(!moving())locate();},
    reset(){camera.position.copy(spawn);change('arrival');},
    approach(){if(state==='arrival')move('approaching',inspection);},
    activate(){if(state==='investigating')move('outbound',destination);else if(state==='secondary')move('returning',spawn);},
    return(){if(state!=='returning')move('returning',spawn);},
    update(now:number,_dt:number){
      if(!moving() || pausedAt!==undefined)return;
      const t=T.MathUtils.clamp((now-started)/(duration*1000),0,1);
      let distance=smooth(t)*total;
      for(let i=1;i<path.length;i++){
        const length=path[i]!.distanceTo(path[i-1]!);
        if(distance<=length || i===path.length-1){camera.position.lerpVectors(path[i-1]!,path[i]!,length?Math.min(distance/length,1):1);break;}
        distance-=length;
      }
      if(t===1)change(state==='approaching'?'investigating':state==='outbound'?'secondary':'arrival');
    },
  };
}
