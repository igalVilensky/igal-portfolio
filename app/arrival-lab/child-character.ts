import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { CharacterIdentity, CharacterVisual } from './character-assets';

/** Purpose-built child silhouettes. No adult face, musculature or imported bind-pose deformation. */
export function createChildCharacter(spec:CharacterIdentity):CharacterVisual & {dispose:()=>void}{
 const root=new T.Group();root.name=spec.id+' · stylized child';const h=spec.height,toddler=spec.age<5;
 root.userData={identity:spec.id,ageCategory:toddler?'toddler':'child',purposeBuiltChild:true};
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>();
 const mat=(color:string)=>{const m=new T.MeshStandardMaterial({color,roughness:.84});materials.add(m);return m;};
 const skin=mat(spec.skin),shirt=mat(spec.shirt),pants=mat(spec.pants),hair=mat(spec.hair),ivory=mat('#f4efe6'),shoes=mat('#516072'),iris=mat('#718da0'),pupil=mat('#273b48'),smile=mat('#b87773');
 const sphere=new T.SphereGeometry(1,18,12);geometries.add(sphere);
 function ellipsoid(parent:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const o=new T.Mesh(sphere,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);parent.add(o);return o;}
 function capsule(parent:T.Object3D,m:T.Material,r:number,length:number,y:number){const g=new T.CapsuleGeometry(r,Math.max(0,length-2*r),5,12);geometries.add(g);const o=new T.Mesh(g,m);o.position.y=y;parent.add(o);return o;}
 const legLength=h*(toddler?.34:.40),hipY=legLength+.055*h,torsoLength=h*(toddler?.29:.285),shoulderY=hipY+torsoLength*.83;
 const torso=new T.Group();torso.name='Child · soft sweater';torso.position.y=hipY+torsoLength*.44;root.add(torso);
 ellipsoid(torso,shirt,0,0,0,h*.115,torsoLength*.58,h*.085);
 if(!toddler){for(let i=0;i<4;i++){const g=new T.TorusGeometry(1,.06,4,24);g.rotateX(Math.PI/2);geometries.add(g);const stripe=new T.Mesh(g,ivory);stripe.position.y=(i-1.5)*h*.045;stripe.scale.set(h*.112,h*.080,h*.084);torso.add(stripe);}}
 capsule(root,skin,h*.046,h*.10,shoulderY+h*.075);
 const head=new T.Group();head.name='Child · rounded face';head.position.y=h*(toddler?.845:.865);root.add(head);
 const rx=h*(toddler?.137:.117),ry=h*(toddler?.137:.118),rz=h*(toddler?.116:.103);
 ellipsoid(head,skin,0,0,0,rx,ry,rz);
 for(const side of [-1,1]){
  ellipsoid(head,skin,side*rx*.96,-ry*.08,0,rx*.18,ry*.25,rz*.38);
  const eyeX=side*rx*.39,eyeY=ry*.10,eyeZ=rz*.92;
  ellipsoid(head,ivory,eyeX,eyeY,eyeZ,rx*.17,ry*.115,rz*.07);
  ellipsoid(head,iris,eyeX,eyeY,eyeZ+rz*.065,rx*.085,ry*.09,rz*.025);
  ellipsoid(head,pupil,eyeX,eyeY,eyeZ+rz*.09,rx*.043,ry*.062,rz*.016);
  ellipsoid(head,hair,eyeX,eyeY+ry*.24,eyeZ-rz*.02,rx*.19,ry*.035,rz*.035);
 }
 ellipsoid(head,skin,0,-ry*.10,rz*.96,rx*.11,ry*.14,rz*.14);
 const mouthCurve=new T.QuadraticBezierCurve3(new T.Vector3(-rx*.25,-ry*.36,rz*.90),new T.Vector3(0,-ry*.47,rz*.99),new T.Vector3(rx*.25,-ry*.36,rz*.90));
 const mouthGeometry=new T.TubeGeometry(mouthCurve,12,h*.003,4,false);geometries.add(mouthGeometry);head.add(new T.Mesh(mouthGeometry,smile));
 // Soft hair cap and overlapping locks form a single draw. Nataniel has a tousled fringe;
 // Adriel has a shorter, neater blond fringe. Neither uses an adult parted-hair mesh.
 const hairParts:T.BufferGeometry[]=[];
 const cap=new T.SphereGeometry(1,20,12,0,Math.PI*2,0,Math.PI*.48);cap.scale(rx*1.04,ry*1.04,rz*1.04);cap.translate(0,ry*.12,-rz*.03);hairParts.push(cap);
 for(let i=0;i<9;i++){
  const a=(i/8-.5)*2.5,g=new T.SphereGeometry(1,10,7),length=toddler?.31:.43;
  g.scale(rx*.27,ry*length,rz*.25);g.rotateZ((i%3-1)*(toddler?.12:.38));g.translate(Math.sin(a)*rx*.82,ry*(toddler?.56:.61)+(toddler?0:Math.sin(i*4)*ry*.12),Math.cos(a)*rz*.84);hairParts.push(g);
 }
 const hairGeometry=mergeGeometries(hairParts)!;hairParts.forEach(g=>g.dispose());geometries.add(hairGeometry);head.add(new T.Mesh(hairGeometry,hair));
 const arms=[-1,1].map(side=>{
  const upper=new T.Group(),elbow=new T.Group();upper.name=side<0?'Child · right arm':'Child · left arm';upper.position.set(side*h*.113,shoulderY,0);root.add(upper);
  const upperLength=h*(toddler?.125:.145),lowerLength=h*(toddler?.12:.14);
  capsule(upper,shirt,h*.037,upperLength+h*.03,-upperLength*.48);elbow.position.y=-upperLength;upper.add(elbow);
  capsule(elbow,skin,h*.027,lowerLength,-lowerLength*.48);ellipsoid(elbow,skin,0,-lowerLength,0,h*.032,h*.039,h*.028);
  return {upper,elbow,side};
 });
 const feet:T.Mesh[]=[];
 const legs=[-1,1].map(side=>{
  const thigh=new T.Group(),knee=new T.Group();thigh.position.set(side*h*.059,hipY,0);root.add(thigh);
  capsule(thigh,pants,h*.047,legLength*.54,-legLength*.24);knee.position.y=-legLength*.48;thigh.add(knee);
  capsule(knee,pants,h*.038,legLength*.52,-legLength*.25);
  feet.push(ellipsoid(knee,shoes,0,-legLength*.46,h*.027,h*.046,h*.042,h*.073));
  return {thigh,knee,side};
 });
 // Batch facial details and sweater stripes per material within their moving parent.
 for(const parent of [head,torso])for(const m of materials){const meshes=parent.children.filter(o=>o instanceof T.Mesh&&o.material===m) as T.Mesh[];if(meshes.length<2)continue;
  parent.updateMatrix();const parts=meshes.map(o=>{o.updateMatrix();const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.deleteAttribute('uv');g.applyMatrix4(o.matrix);return g;});
  const g=mergeGeometries(parts)!;parts.forEach(g=>g.dispose());geometries.add(g);parent.add(new T.Mesh(g,m));meshes.forEach(o=>o.removeFromParent());
 }
 // Fit the complete authored model once, retaining its intended proportions.
 root.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(root),scale=h/(bounds.max.y-bounds.min.y);const model=new T.Group();for(const o of [...root.children])model.add(o);root.add(model);model.scale.setScalar(scale);model.position.y=-bounds.min.y*scale;
 sphere.computeBoundingBox();const footBounds=new T.Box3(),worldPosition=new T.Vector3(),worldScale=new T.Vector3();
 const baseY=model.position.y,mixer=new T.AnimationMixer(root);let phase=spec.id==='nataniel'?.7:2.1,time=0,gait=0,waveTime=3,waving=false,seat=0,talk=0;
 return {root,mixer,height:h,update(dt,walking,greeting,reduced,seated=0,_seatHeight=0,pace=1,activity='observing'){
  dt=Math.min(.2,Math.max(0,dt));time+=dt;mixer.update(dt);
  gait=T.MathUtils.damp(gait,walking?1:0,10,dt);seat=T.MathUtils.damp(seat,seated,8,dt);talk=T.MathUtils.damp(talk,activity==='responding'?1:0,8,dt);
  phase+=dt*(toddler?9.5:8.2)*Math.max(.15,pace);if(greeting&&!waving)waveTime=0;waving=greeting;waveTime+=dt;
  const wave=T.MathUtils.smoothstep(waveTime,0,.45)*(1-T.MathUtils.smoothstep(waveTime,1.75,2.4))*(reduced?.45:1);
  const run=T.MathUtils.smoothstep(pace,1.25,1.8),s=Math.sin(phase);
  for(const leg of legs){leg.thigh.rotation.x=s*leg.side*(.33+run*.23)*gait-seat*1.05;leg.knee.rotation.x=Math.max(0,-s*leg.side)*(.50+run*.30)*gait+seat*1.1;}
  for(const arm of arms){arm.upper.rotation.set(-s*arm.side*(.28+run*.20)*gait,0,arm.side*(.10+(toddler?.06:0)));arm.elbow.rotation.set(-.12-run*.45*gait,0,0);
   if(arm.side<0){arm.upper.rotation.z-=wave*2.25;arm.upper.rotation.x-=wave*.14;arm.elbow.rotation.z=-wave*(.55+Math.sin(waveTime*10)*.18);arm.elbow.rotation.x-=talk*(.25+Math.sin(time*2.2)*.2);}
  }
  head.rotation.set(reduced?0:Math.sin(time*1.5)*.025,Math.sin(time*.7)*(walking?.035:.09),wave*.035);
  torso.rotation.z=reduced?0:Math.sin(time*1.7)*.012;
  model.position.y=baseY+Math.abs(Math.sin(phase))*h*(reduced?.002:.008)*gait-seat*h*.14;
  model.updateWorldMatrix(true,true);let low=Infinity;for(const foot of feet)low=Math.min(low,footBounds.copy(sphere.boundingBox!).applyMatrix4(foot.matrixWorld).min.y);root.getWorldPosition(worldPosition);root.getWorldScale(worldScale);model.position.y+=(worldPosition.y-low)/worldScale.y;
 },dispose(){mixer.stopAllAction();mixer.uncacheRoot(root);root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
