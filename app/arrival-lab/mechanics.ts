import * as T from 'three';
import type { createWall } from './wall-geometry';
import { wallNodes, signalAt, signalDuration } from './connectivity';
export type WallState = 'dormant'|'discovered'|'activated'|'propagating'|'opening'|'open'|'traversing'|'closing';
const ease=(v:number)=>{const t=T.MathUtils.clamp(v,0,1);return t*t*(3-2*t);};
export function createMechanism(wall:ReturnType<typeof createWall>) {
 let state:WallState='dormant', started=0, opening=0, closeFrom=0, reaction=-100, selected=-1;
 return {
 get state(){return state;},get opening(){return opening;},
 discover(){if(state==='dormant')state='discovered';},
 activate(now:number){if(state!=='dormant'&&state!=='discovered')return;state='activated';started=now;},
 close(now:number){if(state!=='dormant'&&state!=='discovered'&&state!=='closing'){closeFrom=opening;state='closing';started=now;}},
 focus(id:number){selected=id;},react(now:number){reaction=now;},
 update(now:number,reduced:boolean){
 const elapsed=(now-started)/1000*(reduced?12:1);
 if(state==='activated'&&elapsed>.12)state='propagating';
 if(state==='propagating'&&elapsed>signalDuration+.25)state='opening';
 if(state==='opening'){opening=ease((elapsed-signalDuration-.25)/1.35);if(opening===1)state='open';}
 if(state==='closing'){opening=closeFrom*(1-ease(elapsed/1.5));if(opening===0)state='discovered';}
 (wall.key.material as T.MeshStandardMaterial).emissiveIntensity=selected===0 ? .65 : state==='dormant'?.025:.12;
 wall.key.position.z=.69-(state==='activated'||state==='propagating'||state==='opening'||state==='open'?.05:0);
 wall.carriages.forEach((g,i)=>{g.position.z=-ease(opening*4)*.8;g.position.x=(i===0?-1:1)*ease((opening-.25)/.75)*3.3;});
 wall.panels.forEach((p,i)=>{const active=state==='propagating'||state==='opening'||state==='open';const s=active?signalAt(elapsed-.12,wallNodes[i]!.delay):0;wall.signals[i]!.emissiveIntensity=(i===selected?1.4:.08)+s*1.7; p.position.z=.04*(i%7%2)-s*.08-(reduced?0:.055*Math.sin(Math.PI*ease((now-reaction)/450))*(i===selected?1:0));});
 }
 };
}
