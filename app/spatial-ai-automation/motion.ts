import { execution, type Scenario } from './model';
export class WorkflowMotion {
 phase:'idle'|'build'|'execute'='idle'; time=0; playing=false; reduced=false; scenario:Scenario='ready';
 get events(){return execution(this.scenario);}
 get duration(){return this.phase==='build'?2.6:this.events.at(-1)!.at;}
 get complete(){return this.phase!=='idle'&&this.time>=this.duration;}
 get active(){if(this.phase!=='execute')return null;return this.events.filter(e=>e.at<=this.time&&e.type==='node-activated').at(-1)?.node??'request';}
 start(phase:'build'|'execute'){this.phase=phase;this.time=this.reduced&&phase==='build'?2.6:0;this.playing=!this.complete;}
 tick(dt:number){if(!this.playing)return;this.time=Math.min(this.duration,this.time+dt);if(this.complete)this.playing=false;}
 reset(){this.phase='idle';this.time=0;this.playing=false;}
}
