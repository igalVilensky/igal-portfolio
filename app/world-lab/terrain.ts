import * as T from 'three';
// Stable coordinates: one unit = 100 metres. Sectors can be appended independently.
export const sector = { radiusX:58, radiusZ:46, resolution:200, seed:41 };
export const sectors = [{id:'river-basin',minX:-58,maxX:58,minZ:-46,maxZ:46}];
export const riverX=(z:number)=>3+4*Math.sin(z*.085);
const bell=(v:number,s:number)=>Math.exp(-((v/s)**2));
export function height(x:number,z:number) {
 // Two overlapping continental shelves create a hooked coast and a southern estuary.
 const coast=Math.min(Math.hypot((x+12)/59,(z+4)/50),Math.hypot((x-23)/35,(z+17)/37));
 const ridgeZ=-21+5*Math.sin(x*.07);
 const pass=1-.77*bell(x+10,5);
 const ridge=10*bell(z-ridgeZ,5)*pass*(.78+.22*Math.cos(x*.36));
 const highland=4.8*bell(x-25,16)*bell(z+5,24);
 const terraces=1.5*bell(x-22,19)*bell(z-22,13);
 const valley=2.1*bell(x-riverX(z),2.3);
 const lake=5.0*Math.exp(-(((x-13)/9)**4)-((z-18)/6)**4);
 const surface=1.7+ridge+highland+terraces-valley-lake-18*Math.max(0,coast-.78)+.18*Math.sin(x*.45)*Math.cos(z*.38);
 const channel=T.MathUtils.smoothstep(z,-18,-10)*Math.exp(-(((x-riverX(z))/1.35)**4));
 return Math.max(-2.8,T.MathUtils.lerp(surface,Math.min(surface,-.5),channel));
}
export const routes:{id:string;width:number;points:[number,number][]}[]=[
 {id:'valley-road',width:.38,points:[[-24,12],[-23,6],[-24,-2],[-20,-9],[-13,-14],[-10,-21],[-7,-27]]},
 {id:'crossing',width:.34,points:[[-24,12],[-17,14],[-8,12],[0,10],[8,9],[17,6],[25,0]]},
 {id:'observatory-trail',width:.22,points:[[25,0],[29,-3],[31,-9],[28,-13],[24,-12]]},
 {id:'lake-road',width:.3,points:[[17,6],[24,11],[28,17],[27,23],[23,27],[12,31],[0,28],[-8,24],[-17,14]]},
];
export function terrainGeometry(bounds=sectors[0]!,resolution=sector.resolution) {
 const n=resolution,positions:number[]=[],colors:number[]=[],indices:number[]=[];
 const moss=new T.Color('#688d79'),stone=new T.Color('#8c9b9f'),sand=new T.Color('#b5aa8b'),garden=new T.Color('#a2a474');
 for(let j=0;j<=n;j++)for(let i=0;i<=n;i++) {
  const x=bounds.minX+i/n*(bounds.maxX-bounds.minX),z=bounds.minZ+j/n*(bounds.maxZ-bounds.minZ),y=height(x,z);positions.push(x,y,z);
  const c=moss.clone().lerp(garden,T.MathUtils.smoothstep(z,2,30)*.65).lerp(stone,T.MathUtils.smoothstep(y,3.5,10)).lerp(sand,1-T.MathUtils.smoothstep(y,-.3,1));
  c.multiplyScalar(1+.035*Math.sin(i*17+j*31));colors.push(c.r,c.g,c.b);
 }
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i;indices.push(a,a+n+1,a+1,a+1,a+n+1,a+n+2);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
