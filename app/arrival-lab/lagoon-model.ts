/** All aquatic and approach dimensions are world metres. No camera or DOM ownership. */
export const lagoon = { x:-170, z:65, rx:32, rz:27, water:-.8, floor:-11, eye:1.65 } as const;
export const yard = { x:-166,z:132,minX:-190,maxX:-142,minZ:112,maxZ:152 } as const;
export type MotionOwner='walking'|'swimming'|'guided'|'passenger'|'ui'|'other-world';
export function motionOwner(s:{otherWorld:boolean;passenger:boolean;guided:boolean;ui:boolean;water:boolean}):MotionOwner {
 return s.otherWorld?'other-world':s.passenger?'passenger':s.guided?'guided':s.ui?'ui':s.water?'swimming':'walking';
}
export function inBasin(x:number,z:number,margin=0){return ((x-lagoon.x)/(lagoon.rx-margin))**2+((z-lagoon.z)/(lagoon.rz-margin))**2<1;}
export function inExpansion(x:number,z:number){return ((x+170)/41)**2+((z-65)/39)**2<=1||(x>=yard.minX&&x<=yard.maxX&&z>=112&&z<=yard.maxZ)||(x>=-180&&x<=-152&&z>=99&&z<=114)||(x>=-132&&x<=-108&&Math.abs(z-62)<=3);}
export function onExpansionApproach(x:number,z:number){return x>=-108&&x<=-103&&Math.abs(z-62)<2.7;}
export function tunnelFloor(z:number){return z<45?-7*Math.max(0,(z-30)/15):z>85?-7*Math.max(0,(100-z)/15):-7;}
export function tunnelRoof(x:number,z:number){return tunnelFloor(z)+4.8*Math.sqrt(Math.max(0,1-((x+180)/2.6)**2));}
export function inTunnel(x:number,y:number,z:number){return Math.abs(x+180)<2.3&&z>=30&&z<=100&&y>=tunnelFloor(z)+.2&&y<tunnelRoof(x,z)-.1;}
export function lagoonFloor(x:number,z:number){
 // Broad east beach: a continuous slope to the deep floor, never a step out of water.
 if(Math.abs(z-62)<6&&x>-155)return Math.max(lagoon.floor,-( -138-x)*11/17);
 return lagoon.floor;
}
export function expansionGround(x:number,z:number){return inBasin(x,z)?lagoonFloor(x,z):0;}
export function waterState(p:{x:number;y:number;z:number}):'land'|'entering'|'surface'|'underwater'{
 if(!inBasin(p.x,p.z)||inTunnel(p.x,p.y,p.z))return 'land';
 const ground=lagoonFloor(p.x,p.z);
 if(ground>lagoon.water-1.1)return 'entering';
 return p.y<lagoon.water-.15?'underwater':'surface';
}
export function createSwimming(){
 let obstacles:readonly {min:{x:number;y:number;z:number};max:{x:number;y:number;z:number}}[]=[];
 let vy=0,state:ReturnType<typeof waterState>='land';
 return {setObstacles(bounds:typeof obstacles){obstacles=bounds;},get state(){return state;},get active(){return state==='surface'||state==='underwater';},reset(){vy=0;state='land';},
 update(dt:number,p:{x:number;y:number;z:number},delta:{x:number;z:number},vertical:number){
  dt=Math.min(.05,Math.max(0,dt));const old={...p};
  p.x+=delta.x*.64;p.z+=delta.z*.64;
  if(!inExpansion(p.x,p.z)){p.x=old.x;p.z=old.z;}
  // The dry observation tube is a real excluded volume, including its roof.
  if(Math.abs(p.x+180)<2.8&&p.z>34&&p.z<96&&p.y<tunnelFloor(p.z)+5.1){p.x=old.x;p.z=old.z;}
  if(!inBasin(p.x,p.z)&&!(p.x>-155&&Math.abs(p.z-62)<6)){p.x=old.x;p.z=old.z;}
  for(const b of obstacles){if(p.x>b.min.x-.4&&p.x<b.max.x+.4&&p.z>b.min.z-.4&&p.z<b.max.z+.4&&p.y+.3>b.min.y&&p.y-1.65<b.max.y){p.x=old.x;p.z=old.z;}}
  const floor=expansionGround(p.x,p.z)+lagoon.eye;
  if(!inBasin(p.x,p.z)||floor>lagoon.water+.55){p.y=Math.max(floor,p.y);vy=0;state=waterState(p);return;}
  const ceiling=lagoon.water+.45;
  const target=p.y>ceiling?(ceiling-p.y)*2-.4:vertical?vertical*3.5:p.y>lagoon.water-.25?(ceiling-p.y)*2:0;
  vy+=(target-vy)*(1-Math.exp(-5*dt));const next=p.y+vy*dt;p.y=Math.max(floor,p.y>ceiling?Math.max(ceiling,next):Math.min(ceiling,next));
  if(Math.abs(p.x+180)<2.8&&p.z>34&&p.z<96){const roof=tunnelFloor(p.z)+5.1;if(p.y<roof){p.y=roof;vy=Math.max(0,vy);}}
  // Only the large landmark masses block swimmers; tiny reef branches stay decorative.
  const pearlDistance=Math.hypot(p.x+193,p.y+6.5,p.z-69);
  if(pearlDistance<1.9){p.x=old.x;p.y=old.y;p.z=old.z;vy=0;}
  if(p.y===floor||p.y===ceiling)vy=0;
  state=waterState(p);
 }
 };
}

/** Clear upper-water lanes east of the tube, above reef and arch crowns.
 * A bounded depth response lets animals yield to swimmers without leaving water. */
export function marineRoute(index:number,time:number,near=0){
 const speed=index<3?.095:-.12,a=time*speed+index*2.1;
 const rx=index<3?4:3,rz=index<3?12:9;
 return {x:-167+Math.cos(a)*rx,y:-3.3-(index%3)*.65-Math.max(0,Math.min(1,near))*.35,z:65+Math.sin(a)*rz,
 yaw:Math.atan2(-Math.cos(a)*rz*speed,-Math.sin(a)*rx*speed)};
}
export function marinePositionValid(p:{x:number;y:number;z:number},radius=1.8){
 return inBasin(p.x,p.z,radius)&&p.y+radius<lagoon.water&&p.y-radius>lagoonFloor(p.x,p.z)&&Math.abs(p.x+180)>2.8+radius;
}
