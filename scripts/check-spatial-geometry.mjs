import assert from 'node:assert/strict';
import {plateSide,plateThickness,plateCenter,cameraProject,projectPlate,restingPlate} from '../app/spatial-home/plateGeometry.ts';
const sub=(a,b)=>a.map((n,i)=>n-b[i]);const dot=(a,b)=>a.reduce((s,n,i)=>s+n*b[i],0);const near=(a,b)=>assert(Math.abs(a-b)<1e-8,`${a} != ${b}`);
assert.deepEqual(projectPlate(0).vertices, restingPlate.vertices, 'shared resting geometry');
for(let step=0;step<=100;step++){
 const p=projectPlate(step/100),v=p.world;
 // All 28 pairwise distances are invariant: no corner can move independently.
 for(let a=0;a<8;a++)for(let b=a+1;b<8;b++)near(Math.hypot(...sub(v[a],v[b])),Math.hypot(...sub(restingPlate.world[a],restingPlate.world[b])));
 v.forEach((vertex,i)=>assert.deepEqual(cameraProject(vertex),p.projected[i]));
 const w=sub(v[1],v[0]),d=sub(v[3],v[0]),h=sub(v[4],v[0]);
 near(Math.hypot(...w),plateSide);near(Math.hypot(...d),plateSide);near(Math.hypot(...h),plateThickness);near(dot(w,d),0);near(dot(w,h),0);near(dot(d,h),0);
 for(let j=0;j<3;j++){near(w[j],v[2][j]-v[3][j]);near(v.reduce((s,x)=>s+x[j],0)/8,0);}
 near(p.center[0],plateCenter[0]);near(p.center[1],plateCenter[1]);
 for(const a of p.projected) {assert(a.depth>0);for(const b of p.projected)if(a.depth>b.depth)assert(a.scale<b.scale);}
 const m=p.label.match(/-?[\d.]+(?:e[+-]?\d+)?/g).map(Number);near(m[4],p.frontMidpoint[0]);near(m[5],p.frontMidpoint[1]);
 near(m[4]-180*m[0],p.vertices[3][0]);near(m[5]-180*m[1],p.vertices[3][1]);near(m[4]+180*m[0],p.vertices[2][0]);near(m[5]+180*m[1],p.vertices[2][1]);
 for(let j=0;j<2;j++)near(p.frontMidpoint[j],(p.vertices[3][j]+p.vertices[2][j])/2);
 const face=[p.vertices[3],p.vertices[2],p.vertices[6],p.vertices[7]];
 for(const [x,y] of [[-129.6,1.76],[129.6,1.76],[129.6,20.24],[-129.6,20.24]]) {
  const point=[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
  const crosses=face.map((a,i)=>{const b=face[(i+1)%4];return (b[0]-a[0])*(point[1]-a[1])-(b[1]-a[1])*(point[0]-a[0]);});
  assert(crosses.every(n=>n>=-1e-8)||crosses.every(n=>n<=1e-8),'padded label box stays inside the perspective face');
 }

}
const end=projectPlate(1);const far=end.vertices[1][0]-end.vertices[0][0],close=end.vertices[2][0]-end.vertices[3][0];assert(far<close);near(end.vertices[3][1],end.vertices[2][1]);near(end.frontMidpoint[0],plateCenter[0]);assert.equal(end.sideVisible,false);
assert(cameraProject([100,0,300]).scale<cameraProject([100,0,-300]).scale);
console.log({poses:101,side:plateSide,thickness:plateThickness,farEdge:far,nearEdge:close,farNearRatio:far/close,center:plateCenter});
console.log('PASS: square proportions, rigidity, correct depth denominator, fixed pivot, shared camera, centered edge anchor and horizontal final label.');
