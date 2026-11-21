import * as T from 'three';
export type RingPhase='idle'|'charging'|'aligning'|'open'|'launching'|'reveal'|'falling'|'braking'|'landed'|'cooldown';
export const skyfall={x:12,z:115,top:320,brake:80,eye:1.65,fallSeconds:7.4} as const;
export const brakeSeconds=3*(skyfall.brake-skyfall.eye)/(2*(skyfall.top-skyfall.brake)/skyfall.fallSeconds);
/** Bounded deterministic sequence. The caller alone decides whether world input may enter. */
export function createRingSkyfall(){
 let phase:RingPhase='idle',time=0,lastPress=-Infinity,charges=0;const start=new T.Vector3();
 const owns=()=>['launching','reveal','falling','braking','landed'].includes(phase);
 function set(next:RingPhase){phase=next;time=0;}
 function advance(){set(phase==='aligning'?'open':phase==='open'?'cooldown':phase==='launching'?'reveal':phase==='reveal'?'falling':phase==='falling'?'braking':phase==='braking'?'landed':phase==='landed'?'cooldown':'idle');if(phase==='idle')charges=0;}
 return {get phase(){return phase;},get time(){return time;},get charges(){return charges;},get count(){return ((charges&1)>0?1:0)+((charges&2)>0?1:0)+((charges&4)>0?1:0)+((charges&8)>0?1:0);},get ownsMotion(){return owns();},
 activate(now:number,ring?:number){if(!Number.isFinite(now)||now-lastPress<350||!['idle','charging'].includes(phase))return false;
  lastPress=now;let index=ring!==undefined&&Number.isInteger(ring)&&ring>=0&&ring<4&&!((1<<ring)&charges)?ring:[0,1,2,3].find(i=>!(charges&(1<<i)))!;
  charges|=1<<index;set(charges===15?'aligning':'charging');return true;
 },
 enter(p:T.Vector3,previous?:T.Vector3){
  if(phase!=='open')return false;
  let x=p.x,y=p.y,near=Math.abs(p.z-4.5)<.45;
  if(!near&&previous&&(previous.z-4.5)*(p.z-4.5)<=0&&Math.abs(p.z-previous.z)>.0001){const t=(4.5-previous.z)/(p.z-previous.z);x=T.MathUtils.lerp(previous.x,p.x,t);y=T.MathUtils.lerp(previous.y,p.y,t);near=true;}
  if(!near||Math.abs(x+49)>1.25||y<.8||y>3)return false;start.copy(p);set('launching');return true;
 },
 cancel(p:T.Vector3){if(!owns())return false;p.set(skyfall.x,skyfall.eye,skyfall.z);set('cooldown');return true;},
 update(dt:number,p?:T.Vector3){if(!Number.isFinite(dt)||dt<0)return false;dt=Math.min(dt,.2);time+=dt;
  if(phase==='charging'&&time>90){charges=0;set('idle');}
  const duration=phase==='aligning'?3:phase==='open'?45:phase==='launching'?.8:phase==='reveal'?2:phase==='falling'?skyfall.fallSeconds:phase==='braking'?brakeSeconds:phase==='landed'?1.2:phase==='cooldown'?4:Infinity;
  if(owns()&&p){
   if(phase==='launching')p.copy(start);else if(phase==='reveal')p.set(skyfall.x,skyfall.top,skyfall.z);
   else if(phase==='falling'){const u=T.MathUtils.clamp(time/skyfall.fallSeconds,0,1);p.set(skyfall.x,T.MathUtils.lerp(skyfall.top,skyfall.brake,u*u),skyfall.z);}
   else if(phase==='braking'){const u=T.MathUtils.clamp(time/brakeSeconds,0,1);p.set(skyfall.x,skyfall.eye+(skyfall.brake-skyfall.eye)*(1-u)**3,skyfall.z);}
   else p.set(skyfall.x,skyfall.eye,skyfall.z);
  }
  if(time>=duration){advance();if(p&&phase==='reveal')p.set(skyfall.x,skyfall.top,skyfall.z);}
  return phase!=='idle';
 }};
}
export const ringCopy={
 en:{charge:'Tune a ring',aligning:'Rings aligned · opening the portal',open:'Portal open · step into the blue gate',launching:'Portal transit',reveal:'Above the island · Skyfall begins',falling:'Skyfall · landing assist armed',braking:'Air cushion · slowing gently',landed:'Soft landing · welcome back',cooldown:'Rings cooling down',rescue:'Land now · Esc'},
 de:{charge:'Einen Ring stimmen',aligning:'Ringe ausgerichtet · Portal öffnet sich',open:'Portal offen · durch das blaue Tor gehen',launching:'Portalreise',reveal:'Hoch über der Insel · Skyfall beginnt',falling:'Skyfall · Landehilfe bereit',braking:'Luftpolster · sanft abbremsen',landed:'Sanft gelandet · willkommen zurück',cooldown:'Ringe kühlen ab',rescue:'Jetzt landen · Esc'},
 ru:{charge:'Настроить кольцо',aligning:'Кольца совмещены · портал открывается',open:'Портал открыт · войдите в синие врата',launching:'Переход через портал',reveal:'Высоко над островом · начало падения',falling:'Падение · помощь при посадке готова',braking:'Воздушная подушка · мягкое торможение',landed:'Мягкая посадка · с возвращением',cooldown:'Кольца остывают',rescue:'Приземлиться · Esc'}
} as const;
