/** Shared activity ownership. One reservation per person; all clocks use simulation time. */
export type Meeting={a:string;b:string;kind:'conversation'|'play';stage:'approach'|'greet'|'exchange'|'finish';elapsed:number;turn:number};
export function createFamilyLife(){
 const meetings:Meeting[]=[],cooldowns=new Map<string,number>();let time=0;
 return {meetings,owns(id:string){return meetings.find(m=>m.a===id||m.b===id);},
  reserve(a:string,b:string,kind:Meeting['kind']){if(a===b||this.owns(a)||this.owns(b)||(cooldowns.get(a)||0)>time||(cooldowns.get(b)||0)>time)return;const m:Meeting={a,b,kind,stage:'approach',elapsed:0,turn:0};meetings.push(m);return m;},
  cancel(id:string){const m=this.owns(id);if(m){meetings.splice(meetings.indexOf(m),1);cooldowns.set(m.a,time+45);cooldowns.set(m.b,time+45);}},
  update(dt:number,ready:(m:Meeting)=>boolean){time+=dt;for(const m of [...meetings]){m.elapsed+=dt;if(m.stage==='approach'){if(ready(m)){m.stage='greet';m.elapsed=0;}else if(m.elapsed>180)this.cancel(m.a);}else if(m.stage==='greet'&&m.elapsed>2.4){m.stage='exchange';m.elapsed=0;}else if(m.stage==='exchange'){m.turn=Math.floor(m.elapsed/3.6)%2;if(m.elapsed>(m.kind==='play'?28:18)){m.stage='finish';m.elapsed=0;}}else if(m.stage==='finish'&&m.elapsed>2)this.cancel(m.a);}},
  clear(){meetings.length=0;cooldowns.clear();}
 };
}
/** Clamp a swept disk before contact, including fast children passing stationary adults. */
export function separatedStep(x:number,z:number,dx:number,dz:number,radius:number,others:readonly {x:number;z:number;radius:number}[]){
 let fraction=1;const length=dx*dx+dz*dz;if(length<1e-12)return fraction;
 for(const q of others){const ox=x-q.x,oz=z-q.z,r=radius+q.radius,c=ox*ox+oz*oz-r*r,b=ox*dx+oz*dz;
  if(c<=0){if(b<0)fraction=0;continue;}const discriminant=b*b-length*c;if(b<0&&discriminant>=0)fraction=Math.min(fraction,Math.max(0,(-b-Math.sqrt(discriminant))/length-1e-4));
 }return fraction;
}
