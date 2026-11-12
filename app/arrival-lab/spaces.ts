import * as T from 'three';
export type Point = readonly [number, number, number];
export interface WorldSpace {
 id:string; names:Record<'en'|'de'|'ru',string>; bounds:readonly [number,number,number,number];
 position:Point; rotation:number; height:number; connections:readonly string[];
 anchor:Point; entry:Point; lookAt:Point; identity:string; status:'active'|'reserved'; mounts:readonly Point[];
}
const space=(id:string,names:WorldSpace['names'],bounds:WorldSpace['bounds'],height:number,entry:Point,anchor:Point,identity:string,mounts:readonly Point[]):WorldSpace=>({id,names,bounds,height,entry,anchor,position:anchor,rotation:0,connections:id==='commons'?['gallery','atmosphere']:['gallery'],lookAt:id==='journey'?[-94,5,19]:id==='ai-tools'?[-48,4,41]:id==='commons'?[-32,4,32]:[-48,5,-11],identity,status:'reserved',mounts});
export const atmosphereSpace:WorldSpace={id:'atmosphere',names:{en:'Living Atmosphere',de:'Lebendige Atmosphäre',ru:'Живая атмосфера'},bounds:[-22,2,26,54],position:[-10,0,40],rotation:0,height:12,connections:['commons'],entry:[-20,1.65,29],anchor:[-17,1.65,33],lookAt:[-12,3.3,39],identity:'mineral chamber of responsive matter',status:'active',mounts:[]};
export const expansionSpaces:readonly WorldSpace[]=[
 atmosphereSpace,
 space('experiments',{en:'Experiments',de:'Experimente',ru:'Эксперименты'},[-60,-38,-12,16],14,[-48,1.65,16],[-48,1.65,4],'ochre folded concrete',[[-48,2,-11]]),
 space('journey',{en:'Journey',de:'Lebenswege',ru:'Путь'},[-96,-60,8,30],17,[-60,1.65,19],[-78,1.65,19],'warm mineral fan roof',[[-94,2,19]]),
 space('ai-tools',{en:'AI & Tools',de:'KI & Werkzeuge',ru:'ИИ и инструменты'},[-60,-38,22,42],9,[-48,1.65,22],[-48,1.65,32],'blue grey coffered structure',[[-48,2,41]]),
 space('commons',{en:'Commons',de:'Gemeinschaft',ru:'Общее пространство'},[-38,-26,22,34],6,[-32,1.65,22],[-32,1.65,28],'sage intimate court',[[-32,0,28]]),
];
export const worldSpaces:readonly WorldSpace[]=[
 {id:'arrival',names:{en:'Arrival',de:'Ankunft',ru:'Прибытие'},bounds:[-24,24,-72,24],position:[0,0,0],rotation:0,height:43,connections:['gallery','light-well','origin'],anchor:[5,1.65,17],entry:[-24,1.65,19],lookAt:[0,4,-65],identity:'monumental stone',status:'active',mounts:[]},
 {id:'gallery',names:{en:'West gallery',de:'Westgalerie',ru:'Западная галерея'},bounds:[-60,-24,16,22],position:[-43,0,19],rotation:0,height:7,connections:['arrival',...expansionSpaces.filter(s=>s.id!=='atmosphere').map(s=>s.id)],anchor:[-43,1.65,19],entry:[-26,1.65,19],lookAt:[-60,3,19],identity:'bronze compression',status:'active',mounts:[]},
 {id:'light-well',names:{en:'Light well',de:'Lichthof',ru:'Световой колодец'},bounds:[-10,10,-106,-72],position:[0,0,-90],rotation:0,height:46,connections:['arrival','living-works'],anchor:[0,1.65,-88],entry:[0,1.65,-72],lookAt:[0,20,-105],identity:'vertical light',status:'active',mounts:[]},
 {id:'living-works',names:{en:'Living Works',de:'Lebendige Werke',ru:'Живые проекты'},bounds:[15,54,-114,-74],position:[34,0,-94],rotation:0,height:24,connections:['light-well'],anchor:[22,1.65,-87],entry:[15,1.65,-94],lookAt:[32,5,-101],identity:'Sunlit Primaries',status:'active',mounts:[]},...expansionSpaces,
 {id:'origin',names:{en:'The Origin',de:'Der Ursprung',ru:'Исток'},bounds:[-112,84,-125,132],position:[12,0,62],rotation:0,height:44,connections:['arrival'],anchor:[12,1.65,62],entry:[12,1.65,24],lookAt:[12,1.65,132],identity:'suspended mineral plateau',status:'active',mounts:[]}];
export function spaceAt(p:T.Vector3){return worldSpaces.find(s=>p.x>=s.bounds[0]&&p.x<=s.bounds[1]&&p.z>=s.bounds[2]&&p.z<=s.bounds[3]);}
/** Route via the circulation centreline; works/light-well routing remains in its existing owner. */
export function expansionLeg(p:T.Vector3):T.Vector3[]{
 if(spaceAt(p)?.id==='origin'){
  const points=[p.clone()];
  // Return around the occupied annexes, then through the real main opening.
  if(p.z<55){const east=p.x>24||p.z< -114;if(east)points.push(new T.Vector3(72,1.65,p.z),new T.Vector3(72,1.65,56));else points.push(new T.Vector3(-103,1.65,p.z),new T.Vector3(-103,1.65,62));}
  if(p.y>2)points.push(new T.Vector3(54,5.65,82),new T.Vector3(54,1.65,56));
  else if(p.z>=80)points.push(new T.Vector3(p.x,1.65,90),new T.Vector3(12,1.65,90));
  else if(p.z>=55)points.push(new T.Vector3(p.x,1.65,62));
  points.push(new T.Vector3(12,1.65,62),new T.Vector3(12,1.65,17));return points;
 }

 if(p.z>=26&&p.x>=-26){return [p.clone(),new T.Vector3(-20,1.65,p.z),new T.Vector3(-20,1.65,29),new T.Vector3(-32,1.65,29),new T.Vector3(-32,1.65,19),new T.Vector3(-20,1.65,19)];}
 if(p.x>=-24)return [];
 const s=expansionSpaces.find(s=>p.x>=s.bounds[0]&&p.x<=s.bounds[1]&&p.z>=s.bounds[2]&&p.z<=s.bounds[3]);
 const points=[p.clone()];
 if(s){
 // A visitor can stand outside either flared shear wall; go around its free end.
 if(s.id==='experiments'&&p.z>9){
 const flare=(16-p.z)*2/3;
 const side=p.x < -51-flare ? -57 : p.x > -45+flare ? -39.5 : undefined;
 if(side!==undefined)points.push(new T.Vector3(side,1.65,p.z),new T.Vector3(side,1.65,8),new T.Vector3(-48,1.65,8));
 }
 const last=points.at(-1)!;
 if(s.id==='journey')points.push(new T.Vector3(p.x,1.65,19),new T.Vector3(-60,1.65,19));else points.push(new T.Vector3(s.entry[0],1.65,last.z),new T.Vector3(...s.entry),new T.Vector3(s.entry[0],1.65,19));}
 else points.push(new T.Vector3(p.x,1.65,19));
 points.push(new T.Vector3(-20,1.65,19));return points;
}
