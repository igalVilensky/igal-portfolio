import * as T from 'three';
export type Point = readonly [number, number, number];
export interface WorldSpace {
 id:string; names:Record<'en'|'de'|'ru',string>; bounds:readonly [number,number,number,number];
 position:Point; rotation:number; height:number; connections:readonly string[];
 anchor:Point; entry:Point; lookAt:Point; identity:string; status:'active'|'reserved'; mounts:readonly Point[];
}
const space=(id:string,names:WorldSpace['names'],bounds:WorldSpace['bounds'],height:number,entry:Point,anchor:Point,identity:string,mounts:readonly Point[]):WorldSpace=>({id,names,bounds,height,entry,anchor,position:anchor,rotation:0,connections:id==='commons'?['gallery','atmosphere']:id==='journey'?['gallery','loop-district','intelligence-chamber']:['gallery'],lookAt:id==='journey'?[-94,5,19]:id==='ai-tools'?[-48,4,41]:id==='commons'?[-32,4,32]:[-48,5,-11],identity,status:'reserved',mounts});
export const atmosphereSpace:WorldSpace={id:'atmosphere',names:{en:'Living Atmosphere',de:'Lebendige Atmosphäre',ru:'Живая атмосфера'},bounds:[-22,2,26,54],position:[-10,0,40],rotation:0,height:12,connections:['commons'],entry:[-20,1.65,29],anchor:[-17,1.65,33],lookAt:[-12,3.3,39],identity:'mineral chamber of responsive matter',status:'active',mounts:[]};
export const expansionSpaces:readonly WorldSpace[]=[
 atmosphereSpace,
 space('experiments',{en:'Experiments',de:'Experimente',ru:'Эксперименты'},[-60,-38,-12,16],14,[-48,1.65,16],[-48,1.65,4],'ochre folded concrete',[[-48,2,-11]]),
 space('journey',{en:'Journey',de:'Lebenswege',ru:'Путь'},[-96,-60,8,30],17,[-60,1.65,19],[-78,1.65,19],'warm mineral fan roof',[[-94,2,19]]),
 space('ai-tools',{en:'AI & Tools',de:'KI & Werkzeuge',ru:'ИИ и инструменты'},[-60,-38,22,42],9,[-48,1.65,22],[-48,1.65,32],'blue grey coffered structure',[[-48,2,41]]),
 space('commons',{en:'Commons',de:'Gemeinschaft',ru:'Общее пространство'},[-38,-26,22,34],6,[-32,1.65,22],[-32,1.65,28],'sage intimate court',[[-32,0,28]]),
];
export const intelligenceSpace:WorldSpace={id:'intelligence-chamber',names:{en:'The Intelligence Chamber',de:'Die Intelligenzkammer',ru:'Палата разума'},bounds:[-110,-88,-32,8],position:[-99,0,-12],rotation:0,height:23,connections:['journey'],entry:[-92,1.65,8],anchor:[-98,1.65,0],lookAt:[-103,3,-23],identity:'dark mineral fins and three intelligences',status:'active',mounts:[]};
export const lagoonSpaces:readonly WorldSpace[]=[
 {id:'living-lagoon',names:{en:'The Living Lagoon',de:'Die lebendige Lagune',ru:'Живая лагуна'},bounds:[-211,-129,26,104],position:[-170,0,65],rotation:0,height:10,connections:['origin','creation-yard'],anchor:[-134,1.65,62],entry:[-130,1.65,62],lookAt:[-175,-3,65],identity:'turquoise sanctuary, coral gardens and a dry submerged passage',status:'active',mounts:[]},
 {id:'creation-yard',names:{en:'The Creation Yard',de:'Der Kreativhof',ru:'Двор творчества'},bounds:[-190,-142,104,152],position:[-166,0,132],rotation:0,height:9,connections:['living-lagoon'],anchor:[-166,1.65,113],entry:[-166,1.65,110],lookAt:[-166,2,132],identity:'mint architectural workshop and modular building playground',status:'active',mounts:[]}
];
export const worldSpaces:readonly WorldSpace[]=[
 ...lagoonSpaces,
 intelligenceSpace,
 {id:'print-lab',names:{en:'Print Lab',de:'Drucklabor',ru:'Лаборатория печати'},bounds:[-76,-56,48,68],position:[-66,0,58],rotation:0,height:6,connections:['origin'],anchor:[-60,1.65,61],entry:[-56,1.65,61],lookAt:[-66,2,52],identity:'playful mint and lilac maker pavilion',status:'active',mounts:[]},
 {id:'living-quarters',names:{en:'The Living Quarters',de:'Die Wohnräume',ru:'Жилое крыло'},bounds:[60,103,0,38],position:[84,0,19],rotation:0,height:6,connections:['little-explorer'],anchor:[76,1.65,19],entry:[60,1.65,19],lookAt:[84,2,16],identity:'warm mineral atrium and five private rooms',status:'active',mounts:[]},
 {id:'little-explorer',names:{en:'Little Explorer',de:'Kleine Entdecker',ru:'Маленький исследователь'},bounds:[26,60,-2,24],position:[46,0,11],rotation:0,height:8,connections:['arrival','living-quarters'],anchor:[36,1.65,19],entry:[26,1.65,19],lookAt:[46,3,11],identity:'warm travel pavilion',status:'active',mounts:[]},
 {id:'arrival',names:{en:'Arrival',de:'Ankunft',ru:'Прибытие'},bounds:[-24,24,-72,24],position:[0,0,0],rotation:0,height:43,connections:['gallery','light-well','origin','little-explorer'],anchor:[5,1.65,17],entry:[-24,1.65,19],lookAt:[0,4,-65],identity:'monumental stone',status:'active',mounts:[]},
 {id:'gallery',names:{en:'Work Wing',de:'Arbeitsflügel',ru:'Рабочее крыло'},bounds:[-60,-24,16,22],position:[-43,0,19],rotation:0,height:7,connections:['arrival',...expansionSpaces.filter(s=>s.id!=='atmosphere').map(s=>s.id)],anchor:[-43,1.65,19],entry:[-26,1.65,19],lookAt:[-60,3,19],identity:'creative studio spine · oak, graphite and light',status:'active',mounts:[]},
 {id:'light-well',names:{en:'Light well',de:'Lichthof',ru:'Световой колодец'},bounds:[-10,10,-106,-72],position:[0,0,-90],rotation:0,height:46,connections:['arrival','living-works'],anchor:[0,1.65,-88],entry:[0,1.65,-72],lookAt:[0,20,-105],identity:'vertical light',status:'active',mounts:[]},
 {id:'living-works',names:{en:'Living Works',de:'Lebendige Werke',ru:'Живые проекты'},bounds:[15,54,-114,-74],position:[34,0,-94],rotation:0,height:24,connections:['light-well'],anchor:[22,1.65,-87],entry:[15,1.65,-94],lookAt:[32,5,-101],identity:'Sunlit Primaries',status:'active',mounts:[]},...expansionSpaces,
 {id:'loop-vault',names:{en:'Impossible House',de:'Unmögliches Haus',ru:'Невозможный дом'},bounds:[383,417,420,466],position:[400,0,443],rotation:0,height:23,connections:['loop-district'],anchor:[400,1.65,424],entry:[400,1.65,421],lookAt:[400,13,447],identity:'luminous oversized vault',status:'active',mounts:[]},
 {id:'loop-district',names:{en:'The Loop District',de:'Das Loop-Viertel',ru:'Квартал петель'},bounds:[146,210,25.5,80.5],position:[178,0,53],rotation:0,height:12,connections:['skybridge','journey','loop-vault'],anchor:[174,1.65,58],entry:[149,1.65,48],lookAt:[177,3,59],identity:'impossible mineral neighborhood',status:'active',mounts:[]},
 {id:'skybridge',names:{en:'Skybridge',de:'Himmelsbrücke',ru:'Небесный мост'},bounds:[84,146,44.5,51.5],position:[114,0,48],rotation:0,height:2,connections:['origin','loop-district'],anchor:[114,1.65,48],entry:[84,1.65,48],lookAt:[164,3,43],identity:'open mineral and metal crossing',status:'active',mounts:[]},
 {id:'origin',names:{en:'The Origin',de:'Der Ursprung',ru:'Исток'},bounds:[-112,84,-125,132],position:[12,0,62],rotation:0,height:44,connections:['arrival','skybridge','print-lab','living-lagoon'],anchor:[12,1.65,62],entry:[12,1.65,24],lookAt:[12,1.65,132],identity:'suspended mineral plateau',status:'active',mounts:[]}];
export function spaceAt(p:T.Vector3){return worldSpaces.find(s=>p.x>=s.bounds[0]&&p.x<=s.bounds[1]&&p.z>=s.bounds[2]&&p.z<=s.bounds[3]);}
/** Route via the circulation centreline; works/light-well routing remains in its existing owner. */
export function expansionLeg(p:T.Vector3):T.Vector3[]{
 if(spaceAt(p)?.id==='living-lagoon'||spaceAt(p)?.id==='creation-yard'){
 const points=[p.clone()];
 if(p.z>100)points.push(new T.Vector3(-166,1.65,101),new T.Vector3(-145,1.65,94),new T.Vector3(-133,1.65,78));
 points.push(new T.Vector3(-134,1.65,62),new T.Vector3(-104,1.65,62),new T.Vector3(-104,1.65,72),new T.Vector3(-48,1.65,72),new T.Vector3(-48,1.65,62),new T.Vector3(12,1.65,62),new T.Vector3(12,1.65,17));return points;
 }

 if(spaceAt(p)?.id==='intelligence-chamber')return [p.clone(),new T.Vector3(-92,1.65,p.z),new T.Vector3(-92,1.65,19),new T.Vector3(-60,1.65,19),new T.Vector3(-20,1.65,19)];
 if(spaceAt(p)?.id==='skybridge')return [p.clone(),new T.Vector3(76,1.65,48),new T.Vector3(76,1.65,62),new T.Vector3(12,1.65,62),new T.Vector3(12,1.65,17)];
 if(spaceAt(p)?.id==='loop-district')return [p.clone(),new T.Vector3(p.x,1.65,58),new T.Vector3(151,1.65,58),new T.Vector3(151,1.65,48),new T.Vector3(76,1.65,48),new T.Vector3(76,1.65,62),new T.Vector3(12,1.65,62),new T.Vector3(12,1.65,17)];
 if(spaceAt(p)?.id==='print-lab')return [p.clone(),new T.Vector3(-60,1.65,61),new T.Vector3(-60,1.65,62),new T.Vector3(12,1.65,62),new T.Vector3(12,1.65,17)];
 if(spaceAt(p)?.id==='origin'){
  const points=[p.clone()];
  // Return around the occupied annexes, then through the real main opening.
  if(p.z<55){const east=p.x>24||p.z< -114;if(east)points.push(new T.Vector3(72,1.65,p.z),new T.Vector3(72,1.65,56));else points.push(new T.Vector3(-103,1.65,p.z),new T.Vector3(-103,1.65,62));}
  if(p.y>2)points.push(new T.Vector3(54,5.65,82),new T.Vector3(54,1.65,56));
  else if(p.z>=80)points.push(new T.Vector3(p.x,1.65,90),new T.Vector3(12,1.65,90));
  else if(p.z>=55)points.push(new T.Vector3(p.x,1.65,62));
  points.push(new T.Vector3(12,1.65,62),new T.Vector3(12,1.65,17));return points;
 }

 if(spaceAt(p)?.id==='living-quarters')return [p.clone(),new T.Vector3(p.x,1.65,19),new T.Vector3(56,1.65,19),new T.Vector3(56,1.65,17),new T.Vector3(35,1.65,17),new T.Vector3(35,1.65,19),new T.Vector3(20,1.65,19)];
 if(spaceAt(p)?.id==='little-explorer')return [p.clone(),new T.Vector3(35,1.65,19),new T.Vector3(20,1.65,19)];
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
