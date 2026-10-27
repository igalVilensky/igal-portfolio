import * as T from 'three';
import { modules, landmarkDimensions } from './registry';
// One unit = 100 metres. All sector edges sample the same world-space field.
export interface TerrainSector {
 id:string; minX:number; maxX:number; minZ:number; maxZ:number;
 geometry:{resolution:number}; elevation:{profile:string; amplitude:number; center:[number,number]; spread:[number,number]; shelf?:[number,number,number,number]};
 ground:{color:string}; vegetation:{density:number; kind:'mixed'|'pine'|'grove'};
 landmarkIds:string[]; roadIds:string[]; waterwayIds:string[]; neighbors:string[];
}
const tile=(id:string,x:number,z:number,color:string,profile:string,density:number,kind:TerrainSector['vegetation']['kind'],landmarkIds:string[],roadIds:string[],neighbors:string[],shelf?:[number,number,number,number]):TerrainSector=>({id,minX:x,maxX:x+64,minZ:z,maxZ:z+64,geometry:{resolution:96},elevation:{profile,amplitude:0,center:[x+32,z+32],spread:[24,24],shelf},ground:{color},vegetation:{density,kind},landmarkIds,roadIds,waterwayIds:x==-16?['basin-river']:[],neighbors});
export const sectors:TerrainSector[]=[
 tile('western-ridge',-80,-64,'#628575','wooded foothills',.9,'mixed',['ai'],['valley-road'],['northern-highlands','western-valley']),
 tile('northern-highlands',-16,-64,'#899593','alpine ridge and pass',.48,'pine',['about','ask'],['valley-road','observatory-trail'],['western-ridge','eastern-uplands','central-basin'],[-5,-14,83,50]),
 tile('eastern-uplands',48,-64,'#85947c','eastern plateau',.35,'pine',[],[],['northern-highlands','eastern-reach']),
 tile('western-valley',-80,0,'#78947d','developed valley and western inlet',.7,'mixed',['work'],['valley-road','crossing'],['western-ridge','central-basin'],[-25,12,47,40]),
 tile('central-basin',-16,0,'#9c9b76','river terraces and southern gardens',.22,'grove',['experiments','music','commons'],['crossing','lake-road'],['northern-highlands','western-valley','eastern-reach'],[18,22,42,32]),
 tile('eastern-reach',48,0,'#a2a17e','open peninsula',.2,'grove',[],[],['eastern-uplands','central-basin'],[46,-2,64,31]),
];
export const worldBounds={minX:Math.min(...sectors.map(s=>s.minX)),maxX:Math.max(...sectors.map(s=>s.maxX)),minZ:Math.min(...sectors.map(s=>s.minZ)),maxZ:Math.max(...sectors.map(s=>s.maxZ))};
export const sector={resolution:96};
export const riverX=(z:number)=>3+4*Math.sin(z*.085);
const bell=(v:number,s:number)=>Math.exp(-((v/s)**2));
function naturalHeight(x:number,z:number) {
 // Broad northern landmass, western inlet, and a long eastern peninsula.
 const shelfDistance=Math.min(...sectors.flatMap(s=>s.elevation.shelf?[Math.hypot((x-s.elevation.shelf[0])/s.elevation.shelf[2],(z-s.elevation.shelf[1])/s.elevation.shelf[3])]:[]));
 const coast=shelfDistance+.025*Math.sin(x*.18)*Math.sin(z*.12)+.015*Math.sin(z*.35+x*.06);
 const ridgeZ=-25+7*Math.sin(x*.045);
 const pass=1-.86*bell(x+10,6);
 const ridge=(1-T.MathUtils.smoothstep(coast,.72,1))*12*bell(z-ridgeZ,7)*pass*(.82+.18*Math.cos(x*.23));
 const highland=4.8*bell(x-25,19)*bell(z+5,24);
 const terraces=1.7*bell(x-22,23)*bell(z-25,16);
 const valley=1.8*bell(x-riverX(z),3);
 const lake=5*Math.exp(-(((x-13)/9)**4)-((z-18)/6)**4);
 const sectorRelief=sectors.reduce((sum,s)=>sum+s.elevation.amplitude*bell(x-s.elevation.center[0],s.elevation.spread[0])*bell(z-s.elevation.center[1],s.elevation.spread[1]),0);
 const surface=2+sectorRelief+ridge+highland+terraces-valley-lake-26*Math.max(0,coast-.77)+.13*Math.sin(x*.32)*Math.cos(z*.29);
 // River descends from a spring near the highlands through the lake to the estuary.
 const channel=T.MathUtils.smoothstep(z,-18,-10)*Math.exp(-(((x-riverX(z))/1.5)**4));
 return Math.max(-3.5,T.MathUtils.lerp(surface,Math.min(surface,-.5),channel));
}
// Prepared architectural pads ease into the unmodified shared field. Coordinates come from the registry.
export function height(x:number,z:number){let y=naturalHeight(x,z);for(const m of modules){const radius=landmarkDimensions[m.landmark]!.radius,d=Math.hypot(x-m.position[0],z-m.position[1]);if(d<radius+2){const blend=1-T.MathUtils.smoothstep(d,radius*.75,radius+2);y=T.MathUtils.lerp(y,naturalHeight(...m.position),blend);}}return y;}
export function sectorAt(x:number,z:number){return sectors.find(s=>x>=s.minX&&x<s.maxX&&z>=s.minZ&&z<s.maxZ);}
export const waterways=[{id:'basin-river',source:[riverX(-10),-10],outlet:[riverX(52),52],sectorIds:['northern-highlands','central-basin']}];
const location=(id:string):[number,number]=>{const module=modules.find(m=>m.id===id);if(!module)throw new Error(`Unknown road destination: ${id}`);return module.position;};
export const routes:{id:string;width:number;points:[number,number][]}[]=[
 {id:'valley-road',width:.38,points:[location('work'),[-23,6],location('ai'),[-20,-9],[-13,-14],location('about'),[-7,-27]]},
 {id:'crossing',width:.34,points:[location('work'),[-17,14],[-8,12],[0,10],[4,10],[8,10],[12,10],[17,6],location('experiments')]},
 {id:'observatory-trail',width:.22,points:[location('experiments'),[29,-3],[31,-9],[28,-13],location('ask')]},
 {id:'lake-road',width:.3,points:[[17,6],[24,11],[28,17],[27,23],location('music'),[12,31],[riverX(30)+4,31],[riverX(30),30],[riverX(30)-4,29],location('commons'),[-8,24],[-17,14]]},
];
export const crossings=[
 {id:'basin-viaduct',position:[riverX(10),10] as [number,number],angle:0,length:6.6,width:.9,deck:2.65,material:'stone' as const},
 {id:'garden-footbridge',position:[riverX(30),30] as [number,number],angle:-Math.atan(.25),length:7,width:.85,deck:2.65,material:'wood' as const},
];
export function roadHeight(x:number,z:number){let y=height(x,z)+.08;for(const b of crossings){const dx=x-b.position[0],dz=z-b.position[1],along=dx*Math.cos(b.angle)-dz*Math.sin(b.angle),across=dx*Math.sin(b.angle)+dz*Math.cos(b.angle);if(Math.abs(across)<b.width/2+.4&&Math.abs(along)<b.length/2+2)y=Math.max(y,T.MathUtils.lerp(b.deck,y,T.MathUtils.smoothstep(Math.abs(along),b.length/2,b.length/2+2)));}return y;}
export function terrainGeometry(bounds:TerrainSector=sectors[0]!,resolution=bounds.geometry.resolution) {
 const n=resolution,positions:number[]=[],colors:number[]=[],indices:number[]=[];
 const moss=new T.Color('#688d79'),stone=new T.Color('#8c9b9f'),sand=new T.Color('#b5aa8b'),garden=new T.Color('#a2a474');
 for(let j=0;j<=n;j++)for(let i=0;i<=n;i++) {
  const x=bounds.minX+i/n*(bounds.maxX-bounds.minX),z=bounds.minZ+j/n*(bounds.maxZ-bounds.minZ),y=height(x,z);positions.push(x,y,z);
  const regional=moss.clone();for(const s of sectors){const cx=(s.minX+s.maxX)/2,cz=(s.minZ+s.maxZ)/2;const weight=Math.exp(-((x-cx)**2+(z-cz)**2)/1800)*.22;regional.lerp(new T.Color(s.ground.color),weight);}
  const c=regional.lerp(garden,T.MathUtils.smoothstep(z,2,30)*.65).lerp(stone,T.MathUtils.smoothstep(y,3.5,10)).lerp(sand,1-T.MathUtils.smoothstep(y,-.3,1));
  c.multiplyScalar(1+.015*Math.sin(x*1.7+z*2.3));colors.push(c.r,c.g,c.b);
 }
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i;indices.push(a,a+n+1,a+1,a+1,a+n+1,a+n+2);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);const normals:number[]=[];for(let j=0;j<=n;j++)for(let i=0;i<=n;i++){const x=bounds.minX+i/n*(bounds.maxX-bounds.minX),z=bounds.minZ+j/n*(bounds.maxZ-bounds.minZ);const normal=new T.Vector3(height(x-.25,z)-height(x+.25,z),.5,height(x,z-.25)-height(x,z+.25)).normalize();normals.push(normal.x,normal.y,normal.z);}g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));return g;
}
