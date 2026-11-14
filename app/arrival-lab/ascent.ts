import * as T from 'three';

/** West gallery access, metres in the shared Arrival / Origin scene. */
export const ascent = { x: -57, z: 19.5, roof: 10.4, eye: 1.65, speed: 2.2 } as const;
export const ascentCopy = {
 en: { up: 'Climb up', down: 'Climb down', climbing: 'W / ↑ · climb up   S / ↓ · climb down', touch: 'Move the joystick up or down to climb', access: 'Rooftop access' },
 de: { up: 'Hinaufsteigen', down: 'Hinabsteigen', climbing: 'W / ↑ · hinauf   S / ↓ · hinab', touch: 'Joystick zum Klettern nach oben oder unten bewegen', access: 'Dachzugang' },
 ru: { up: 'Подняться', down: 'Спуститься', climbing: 'W / ↑ · вверх   S / ↓ · вниз', touch: 'Двигайте джойстик вверх или вниз', access: 'Выход на крышу' },
};
export function roofHeight(x:number,z:number):number|undefined {
 if(x>=-60&&x<=-36&&z>=17&&z<=21)return ascent.roof;
 if(x>=-42&&x<=-38&&z>=21&&z<=43)return ascent.roof+(z-21)*4/22;
 if(x>=-48&&x<=-30&&z>=43&&z<=57)return 14.4;
}
export function createClimb(){
 let state:'walking'|'aligning'|'climbing'|'dismounting'='walking',time=0,progress=0;
 const start=new T.Vector3(),target=new T.Vector3();
 function transition(next:typeof state,p:T.Vector3,to:T.Vector3){state=next;time=0;start.copy(p);target.copy(to);}
 return {
 get state(){return state;},get active(){return state!=='walking';},get progress(){return progress;},
 activate(p:T.Vector3){if(state!=='walking')return false;progress=p.y>6?ascent.roof:0;transition('aligning',p,new T.Vector3(ascent.x,ascent.eye+progress,ascent.z));return true;},
 update(dt:number,axis:number,p:T.Vector3,reduced=false){
 dt=T.MathUtils.clamp(dt,0,.1);
 if(state==='walking')return false;
 if(state==='aligning'||state==='dismounting'){
 time+=dt;const t=Math.min(1,time/(reduced?.3:.65)),s=t*t*(3-2*t);p.lerpVectors(start,target,s);
 if(t===1){state=state==='aligning'?'climbing':'walking';time=0;}
 }else{
 progress=T.MathUtils.clamp(progress+T.MathUtils.clamp(axis,-1,1)*ascent.speed*dt,0,ascent.roof);p.set(ascent.x,ascent.eye+progress,ascent.z);
 if((axis>0&&progress===ascent.roof)||(axis<0&&progress===0))transition('dismounting',p,new T.Vector3(ascent.x+2.2,ascent.eye+progress,ascent.z));
 }
 return true;
 },
 };
}
export function createAscent(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='The Ascent';scene.add(root);
 const gs=new Map<string,T.BoxGeometry>(),ms:T.MeshStandardMaterial[]=[];
 const mat=(color:string,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.65,metalness});ms.push(m);return m;};
 const stone=mat('#e0e5df'),metal=mat('#526c7a',.65),dark=mat('#899ca8',.25);
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=stone,solid=true){const key=[w,h,d].join();let g=gs.get(key);if(!g){g=new T.BoxGeometry(w,h,d);gs.set(key,g);}const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;o.userData.room='rooftop';o.userData.noCollision=!solid;root.add(o);solids.push(o);return o;}
 // Four supported slabs surround the access well; no invisible floor covers its opening.
 box(1.8,.45,4,-59.1,10.175,19,stone,false);
 box(19.8,.45,4,-45.9,10.175,19,stone,false);
 box(2.2,.45,1.4,-57.1,10.175,17.7,stone,false);
 box(2.2,.45,.4,-57.1,10.175,20.8,stone,false);
 // Bearings follow gallery wall lines, keeping the original circulation clear.
 for(const x of [-59.6,-53,-45,-36.4])for(const z of [16.8,21.2])box(.35,10.4,.35,x,5.2,z,dark);
 for(const x of [-57.65,-56.35]){box(.09,11.5,.12,x,5.75,18.9,metal,false);for(const y of [1,4,7,9.7])box(.12,.1,.5,x,y,18.7,metal,false);}
 for(let y=.3;y<11.4;y+=.3)box(1.3,.055,.12,-57,y,18.9,metal,false);
 // Small base and broad top approach, clear of the gallery centreline.
 box(2.4,.06,2.4,-57,.03,19.5,dark,false);
 // Protected roof walk, with a deliberate opening into the southbound connector.
 for(const z of [17,21]){
 if(z===17)box(24,1.1,.25,-48,10.95,z);
 else {box(18,1.1,.25,-51,10.95,z);box(2,1.1,.25,-37,10.95,z);}
 }
 for(const x of [-60,-36])box(.25,1.1,4,x,10.95,19);
 // Guard the well on three sides; the east edge is the controlled ladder dismount.
 box(.12,1.1,2.2,-58.2,10.95,19.5,metal);
 for(const z of [18.4,20.6])box(2.2,1.1,.12,-57.1,10.95,z,metal);
 // Continuous shallow skybridge incline; geometry and surface resolver share endpoints.
 const slope=Math.atan2(4,22),length=Math.hypot(22,4);
 const bridge=box(4,.45,length,-40,12.175,32,dark,false);bridge.rotation.x=-slope;
 for(const x of [-42,-38]){const rail=box(.22,1.1,length,x,12.95,32,stone);rail.rotation.x=-slope;}
 for(const z of [25,38])box(4,.55,1,-40,10.4+(z-21)*4/22-.55,z,metal,false);
 for(const x of [-41.7,-38.3])box(.4,14,.4,x,7,42.5,dark);
 box(18,.6,14,-39,14.1,50,stone,false);
 // Low mineral edge and thin metal handrail keep the plateau visible below.
 for(const x of [-48,-30]){box(.3,.45,14,x,14.625,50);box(.12,.12,14,x,15.5,50,metal);}
 box(18,.45,.3,-39,14.625,57);box(18,.12,.12,-39,15.5,57,metal);
 for(const [x,w] of [[-45,6],[-34,8]]){box(w!,.45,.3,x!,14.625,43);box(w!,.12,.12,x!,15.5,43,metal);}
 for(const x of [-48,-39,-30])for(const z of [43,57])if(z===57||x!==-39)box(.12,1.1,.12,x,14.95,z,metal);
 // Deep cantilever edge and one quiet vertical blade frame the shared Origin panorama.
 box(18,1,1,-39,13.4,56.5,dark,false);box(.8,7,2,-47,17.9,45,stone);
 return {root,setTheme(darkTheme:boolean){stone.color.set(darkTheme?'#8b9cae':'#e0e5df');metal.color.set(darkTheme?'#8da9bb':'#526c7a');dark.color.set(darkTheme?'#536b82':'#899ca8');},dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
