import * as T from 'three';
// Authored sector: elliptical coast, western plateau, northern ridge and a river valley.
// Additional sectors can provide the same height/surface contract without changing landmarks.
export const sector = { radiusX:17, radiusZ:12.5, resolution:112, seed:41 };
export function riverX(z:number) { return 1.1 + 1.6*Math.sin(z*.32); }
export function height(x:number,z:number) {
 const edge=Math.sqrt((x/sector.radiusX)**2+(z/sector.radiusZ)**2);
 const ridge=4.6*Math.exp(-(((z+8.1)/2.3)**2))*( .7+.3*Math.cos(x*.55));
 const west=1.1*Math.exp(-(((x+9)/5)**2)-(((z-1)/7)**2));
 const east=1.5*Math.exp(-(((x-9)/5)**2)-(((z+1)/5)**2));
 const valley=1.7*Math.exp(-(((x-riverX(z))/1.25)**2));
 return Math.max(-.35, .9+ridge+west+east-valley-Math.max(0,(edge-.78))*7 + .12*Math.sin(x*.8)*Math.cos(z*.7));
}
export function terrainGeometry() {
 const n=sector.resolution, positions:number[]=[],colors:number[]=[],indices:number[]=[];
 const moss=new T.Color('#728b77'),stone=new T.Color('#89969a'),sand=new T.Color('#baad8b'),garden=new T.Color('#8b9b77');
 for(let j=0;j<=n;j++)for(let i=0;i<=n;i++) {
  const u=(i/n-.5)*2,v=(j/n-.5)*2;
  const x=sector.radiusX*u*Math.sqrt(1-v*v/2),z=sector.radiusZ*v*Math.sqrt(1-u*u/2), y=height(x,z);
  positions.push(x,y,z);
  const c=moss.clone().lerp(garden,Math.max(0,x/20)).lerp(stone,T.MathUtils.smoothstep(y,2.3,4.8)).lerp(sand,1-T.MathUtils.smoothstep(y,-.2,.5));
  c.multiplyScalar(1+.035*Math.sin(i*17+j*31)); colors.push(c.r,c.g,c.b);
 }
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i;indices.push(a,a+n+1,a+1,a+1,a+n+1,a+n+2);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
