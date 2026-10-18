import assert from 'node:assert/strict';
import {plateSide,plateThickness,plateCenter,cameraProject,projectPlate,projectWorkPlate,restingPlate} from '../app/spatial-home/plateGeometry.ts';
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

for (let step=0;step<=100;step++) {
 const p=projectWorkPlate(step/100), v=p.world;
 for(let a=0;a<8;a++)for(let b=a+1;b<8;b++)near(Math.hypot(...sub(v[a],v[b])),Math.hypot(...sub(restingPlate.world[a],restingPlate.world[b])));
 if(step / 100 <= 1 / 3) {
  near(p.angle,restingPlate.angle);
  for(let i=1;i<8;i++)for(let j=0;j<3;j++)near(v[i][j]-v[0][j],restingPlate.world[i][j]-restingPlate.world[0][j]);
 }
 assert(Math.min(...p.vertices.slice(0,4).map(point=>point[1])) >= Math.min(...restingPlate.vertices.map(point=>point[1])) - 1e-8, 'Work stays within upper clearance');
 for(const [i,uv] of [[0,[0,0]],[1,[360,0]],[2,[360,280]],[3,[0,280]]])for(let j=0;j<2;j++)near(p.surfacePoint(uv)[j],p.vertices[i][j]);
}
assert.deepEqual(projectWorkPlate(0).vertices,restingPlate.vertices);
const screen=projectWorkPlate(1), q=screen.vertices;
near(q[0][1],q[1][1]);near(q[2][1],q[3][1]);near(q[0][0],q[3][0]);near(q[1][0],q[2][0]);
near(q[1][0]-q[0][0],q[3][1]-q[0][1]);
for(let i=1;i<4;i++)near(screen.projected[i].depth,screen.projected[0].depth);
assert.equal(screen.frontVisible,false,'front label is occluded by the front-facing top');
// The center trunnion stays on the extraction / clearance rails.
for(let step=0;step<=100;step++) {
 const p=projectWorkPlate(step/100);
 near(p.world.slice(0,4).reduce((s,v)=>s+v[0],0)/4,0);
}
console.log('PASS: 101 Work poses preserve rigidity, extraction-only orientation, attached texture corners, hinge X, upper clearance and exact camera-facing square.');

// Viewport rails must move one rigid body and preserve the extraction phase.
for (const rail of [0, plateSide * .2, plateSide * .6]) {
 for (let step = 0; step <= 100; step++) {
  const t = step / 100, p = projectWorkPlate(t, rail), baseline = projectWorkPlate(t);
  for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) {
   near(Math.hypot(...sub(p.world[a], p.world[b])), Math.hypot(...sub(restingPlate.world[a], restingPlate.world[b])));
  }
  if (t <= 1 / 3) assert.deepEqual(p.vertices, baseline.vertices, 'viewport rails cannot change the extraction origin or orientation');
 }
 const q = projectWorkPlate(1, rail).vertices;
 near(q[0][1], q[1][1]); near(q[0][0], q[3][0]);
 near(q[1][0] - q[0][0], q[3][1] - q[0][1]);
}
console.log('PASS: viewport rails preserve all prism distances, exact extraction origins and camera-facing squares.');
