import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

export type CharacterIdentity = {
 id:string; age:number; height:number; hair:string; shirt:string; pants:string; skin:string;
};
export type CharacterVisual = {
 root:T.Group; mixer:T.AnimationMixer; height:number;
 update:(dt:number,walking:boolean,greeting:boolean,reduced:boolean,seated?:number,seatHeight?:number,pace?:number)=>void;
};

/** CC0 Quaternius base meshes. No reference photographs enter this pipeline. */
export async function loadCharacterAssets() {
 const loader=new GLTFLoader(),base='/arrival-lab/characters/';
 const names=['base-male','base-female','Hair_SimpleParted','Hair_Buzzed','Hair_Buns','Hair_Long','Hair_Beard'];
 const loaded=await Promise.all(names.map(name=>loader.loadAsync(base+name+'.gltf')));
 const sources=new Map(names.map((name,i)=>[name,loaded[i]!.scene]));
 const skeletons=new Set<T.Skeleton>();
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>();
 for(const source of sources.values())source.traverse(o=>{if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const v of Object.values(m))if(v instanceof T.Texture)textures.add(v);}}});
 let disposed=false;
 return {
  create(spec:CharacterIdentity):CharacterVisual {
   if(disposed)throw new Error('Character assets disposed');
   const female=spec.id==='anastasia'||spec.id==='amelia',child=spec.age<10,toddler=spec.age<5;
   const root=new T.Group(),model=clone(sources.get(female?'base-female':'base-male')!);root.name=spec.id+' · rigged character';root.add(model);
   model.traverse(o=>{if(o instanceof T.SkinnedMesh){o.skeleton.boneInverses=o.skeleton.boneInverses.map(matrix=>matrix.clone());skeletons.add(o.skeleton);}});
   model.updateMatrixWorld(true);
   // Deform BOTH mesh vertices and bind-joint positions before rebinding.
   // This changes relative leg, torso and head sizes rather than scaling an adult.
   const leg=toddler?.64:child?.77:1,torso=toddler?.80:child?.88:1,head=toddler?1.35:child?1.18:1;
   const map=(p:T.Vector3)=>{
    const y=p.y;
    p.y=y<.97?y*leg:y<1.52?.97*leg+(y-.97)*torso:.97*leg+.55*torso+(y-1.52)*head;
    const h=T.MathUtils.smoothstep(y,1.48,1.62);
    p.x*=T.MathUtils.lerp(child?.76:spec.id==='amelia'?.84:female?.91:.87,child?1.12:spec.id==='amelia'?.93:1,h);
    p.z*=T.MathUtils.lerp(child?.83:.93,child?1.10:1,h);
    return p;
   };
   const bones:T.Bone[]=[],worlds=new Map<T.Bone,T.Matrix4>();
   model.traverse(o=>{if(o instanceof T.Bone){bones.push(o);worlds.set(o,o.matrixWorld.clone().setPosition(map(o.getWorldPosition(new T.Vector3()))));}});
   const skin=new T.Color(spec.skin),shirt=new T.Color(spec.shirt),pants=new T.Color(spec.pants),shoe=new T.Color('#303039');
   const v=new T.Vector3();
   model.traverse(o=>{
    if(!(o instanceof T.Mesh))return;
    o.geometry=o.geometry.clone();geometries.add(o.geometry);
    const position=o.geometry.getAttribute('position'),colors=[];
    const inverse=o.matrixWorld.clone().invert();
    const body=/SuperHero|Superhero/i.test(o.name);
    for(let i=0;i<position.count;i++){
     v.fromBufferAttribute(position,i);
     // Bake the importer's bind-pose correction before editing anatomy.
     if(o instanceof T.SkinnedMesh)o.applyBoneTransform(i,v);
     v.applyMatrix4(o.matrixWorld);const y=v.y,x=Math.abs(v.x);
     let color=skin;
     if(body){
      if(y<.12)color=shoe;
      else if(y<.90)color=pants;
      else if((y<1.49 || y<1.52 && x>.075) && x<.38)color=shirt;
      // Slight ease through the waist gives the continuous garment a relaxed silhouette.
      if(color===shirt){v.x*=1.04;v.z*=1.08;}
      if(spec.id==='nataniel'&&color===shirt&&y<1.35&&Math.floor(y*36)%3===0)color=new T.Color('#ded8cc');
     }
     colors.push(color.r,color.g,color.b);
     map(v).applyMatrix4(inverse);position.setXYZ(i,v.x,v.y,v.z);
    }
    position.needsUpdate=true;
    const old=o.material as T.MeshStandardMaterial;
    let material:T.MeshStandardMaterial;
    if(body){o.geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));material=new T.MeshStandardMaterial({vertexColors:true,roughness:.88});}
    else {material=old.clone();if(/Eyebrow/.test(o.name)){material.map=null;material.color.set(spec.hair);}}
    materials.add(material);o.material=material;o.castShadow=false;o.frustumCulled=false;
   });
   // Parent-first traversal preserves the original rest orientation and new joint spacing.
   for(const bone of bones){const parent=bone.parent;parent?.updateWorldMatrix(true,false);const local=worlds.get(bone)!.clone();if(parent)local.premultiply(parent.matrixWorld.clone().invert());local.decompose(bone.position,bone.quaternion,bone.scale);bone.updateWorldMatrix(false,false);}
   model.updateMatrixWorld(true);
   model.traverse(o=>{if(o instanceof T.SkinnedMesh){o.skeleton.calculateInverses();o.bind(o.skeleton,o.matrixWorld);}});
   const headBone=bones.find(b=>b.name==='Head')!;
   const hairName=spec.id==='anastasia'?'Hair_Buns':spec.id==='amelia'?'Hair_Long':spec.id==='igal'||spec.id==='nataniel'?'Hair_SimpleParted':'Hair_Buzzed';
   const addHair=(name:string)=>{
    const hair=sources.get(name)!.clone(true);hair.updateMatrixWorld(true);
    const inverseHead=headBone.matrixWorld.clone().invert();
    hair.traverse(o=>{if(o instanceof T.Mesh){const geometry=o.geometry.clone(),pos=geometry.getAttribute('position');
     for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i).applyMatrix4(o.matrixWorld);map(v).applyMatrix4(inverseHead);pos.setXYZ(i,v.x,v.y,v.z);}
     o.geometry=geometry;geometries.add(geometry);
     const material=new T.MeshStandardMaterial({color:spec.hair,roughness:.95,side:T.DoubleSide});materials.add(material);o.material=material;
     o.position.set(0,0,0);o.quaternion.identity();o.scale.setScalar(1);o.frustumCulled=false;
    }});
    hair.position.set(0,0,0);hair.quaternion.identity();hair.scale.setScalar(1);headBone.add(hair);
   };
   addHair(hairName);if(spec.id==='igal')addHair('Hair_Beard');
   model.updateMatrixWorld(true);
   // World-axis offsets are converted to each bone's parent space for robust rig motion.
   const rests=new Map(bones.map(b=>[b.name,b.quaternion.clone()]));
   const parentRotations=new Map(bones.map(b=>[b.name,b.parent!.getWorldQuaternion(new T.Quaternion())]));
   const rotation=(name:string,x=0,z=0)=>{
    const parent=parentRotations.get(name)!,q=new T.Quaternion().setFromEuler(new T.Euler(x,0,z));
    return parent.clone().invert().multiply(q).multiply(parent).multiply(rests.get(name)!);
   };
   const clip=(name:string,duration:number,gait:boolean,greet:boolean)=>{
    const count=17,times=Array.from({length:count},(_,i)=>duration*i/(count-1));
    const tracks:T.KeyframeTrack[]=[];
    for(const bone of ['upperarm_l','upperarm_r','lowerarm_l','lowerarm_r','thigh_l','thigh_r','calf_l','calf_r','hand_l','hand_r','Head','spine_02']){
     const values:number[]=[];
     for(let i=0;i<count;i++){
      const phase=i/(count-1)*Math.PI*2,s=Math.sin(phase),left=bone.endsWith('_l'),side=left?1:-1;
      let x=0,z=0;
      if(bone.startsWith('upperarm')){z=-side*1.35;x=gait?s*side*.23:Math.sin(phase)*.015;if(greet&&!left){z=-.75;x=-.12;}}
      if(bone.startsWith('lowerarm')){x=-.10;if(greet&&!left){x=-.15;z=-.65+Math.sin(phase*2)*.25;}}
      if(bone.startsWith('thigh')&&gait)x=s*side*.53;
      if(bone.startsWith('calf')&&gait)x=Math.max(0,-s*side)*.48;
      if(bone==='hand_r'&&greet)z=Math.sin(phase*2)*.12;
      if(bone==='Head'&&greet)x=Math.sin(phase)*.055;
      if(bone==='spine_02')x=Math.sin(phase)*.009;
      values.push(...rotation(bone,x,z).toArray());
     }
     tracks.push(new T.QuaternionKeyframeTrack(bone+'.quaternion',times,values));
    }
    return new T.AnimationClip(name,duration,tracks);
   };
   const mixer=new T.AnimationMixer(model),idle=mixer.clipAction(clip('idle',4,false,false)),walk=mixer.clipAction(clip('walk',child?.72:.95,true,false)),greet=mixer.clipAction(clip('greeting',2,false,true));
   const actions={idle,walk,greet};let state='idle';idle.play();mixer.update(0);
   model.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(model,true),scale=spec.height/(bounds.max.y-bounds.min.y);
   model.scale.setScalar(scale);model.position.y=-bounds.min.y*scale;model.updateMatrixWorld(true);
   const baseY=model.position.y,support=bones.filter(b=>/^(foot|ball)_[lr]$/.test(b.name)),supportPoint=new T.Vector3();
   const lowestSupport=()=>Math.min(...support.map(bone=>root.worldToLocal(bone.getWorldPosition(supportPoint)).y));
   const restSupport=lowestSupport();
   // Calibrate in visual-root metres, after anatomy and scale have been applied.
   const point=(bone:T.Bone)=>root.worldToLocal(bone.getWorldPosition(new T.Vector3()));
   const legs=['l','r'].map(side=>{
    const thigh=bones.find(b=>b.name===`thigh_${side}`)!,calf=bones.find(b=>b.name===`calf_${side}`)!,foot=bones.find(b=>b.name===`foot_${side}`)!;
    const hip=point(thigh),knee=point(calf),ankle=point(foot);
    return {thigh,calf,foot,hip,ankle,upper:knee.clone().sub(hip),lower:ankle.clone().sub(knee),
     thighWorld:thigh.getWorldQuaternion(new T.Quaternion()),calfWorld:calf.getWorldQuaternion(new T.Quaternion()),footWorld:foot.getWorldQuaternion(new T.Quaternion()),parentWorld:thigh.parent!.getWorldQuaternion(new T.Quaternion())};
   });
   const hipCenter=legs[0]!.hip.clone().add(legs[1]!.hip).multiplyScalar(.5);
   // Restore mixer-owned transforms before each update: constant idle tracks are cached.
   const seatedBones=legs.flatMap(leg=>[leg.thigh,leg.calf,leg.foot]).map(bone=>({bone,animated:bone.quaternion.clone(),seated:bone.quaternion.clone()}));
   let cachedSeatHeight=NaN;
   const seatPoses=new Map<number,T.Quaternion[]>(),seatMeshes:{mesh:T.SkinnedMesh;indices:number[]}[]=[];
   model.updateMatrixWorld(true);
   model.traverse(object=>{
    if(!(object instanceof T.SkinnedMesh))return;
    const indices:number[]=[];
    const toRoot=root.matrixWorld.clone().invert().multiply(object.matrixWorld);
    const kneeLevel=hipCenter.y-Math.max(...legs.map(leg=>leg.upper.length()))-.04*spec.height/1.65;
    for(let i=0;i<object.geometry.attributes.position!.count;i++){
     object.getVertexPosition(i,v).applyMatrix4(toRoot);
     // Keep the hips and upper legs, not shoes or lower legs that must hang off the edge.
     if(v.y>=kneeLevel&&v.y<=hipCenter.y+spec.height*.06)indices.push(i);
    }
    if(indices.length)seatMeshes.push({mesh:object,indices});
   });
   function configureSeat(height:number){
    if(height===cachedSeatHeight)return;
    cachedSeatHeight=height;
    const cached=seatPoses.get(height);
    if(cached){seatedBones.forEach((pose,i)=>pose.seated.copy(cached[i]!));return;}
    let hipClearance=.08*spec.height/1.65;
    // A bounded, cached fit to the actual skinned underside of the hips/thighs.
    // Socket height alone misses the volume of this stylized mesh's clothing.
    for(let pass=0;pass<6;pass++){
     for(const leg of legs){
      const upperLength=leg.upper.length(),lowerLength=leg.lower.length();
      // Solve thigh slope with a vertical shin and the ankle at its standing height.
      const drop=T.MathUtils.clamp(height+hipClearance-lowerLength-leg.ankle.y,-upperLength*.35,upperLength*.8);
      const upperDirection=new T.Vector3(0,-drop,Math.sqrt(upperLength*upperLength-drop*drop)).normalize();
      const thighWorld=new T.Quaternion().setFromUnitVectors(leg.upper.clone().normalize(),upperDirection).multiply(leg.thighWorld);
      const calfWorld=new T.Quaternion().setFromUnitVectors(leg.lower.clone().normalize(),new T.Vector3(0,-1,0)).multiply(leg.calfWorld);
      const targets=[leg.parentWorld.clone().invert().multiply(thighWorld),thighWorld.clone().invert().multiply(calfWorld),calfWorld.clone().invert().multiply(leg.footWorld)];
      for(const [i,bone] of [leg.thigh,leg.calf,leg.foot].entries())seatedBones.find(pose=>pose.bone===bone)!.seated.copy(targets[i]!);
     }
     for(const pose of seatedBones)pose.bone.quaternion.copy(pose.seated);
     model.position.set(0,baseY,-hipCenter.z);model.updateWorldMatrix(true,true);
     model.position.y+=restSupport-lowestSupport();model.updateMatrixWorld(true);
     let underside=Infinity;
     for(const {mesh,indices} of seatMeshes){
      const toRoot=root.matrixWorld.clone().invert().multiply(mesh.matrixWorld);
      for(const i of indices){
       mesh.getVertexPosition(i,v).applyMatrix4(toRoot);
       if(Math.abs(v.x)<spec.height*.35/1.65&&v.z>-spec.height*.3/1.65&&v.z<spec.height*(child?.10:.18)/1.65)underside=Math.min(underside,v.y);
      }
     }
     const correction=height+.003-underside;
     if(!Number.isFinite(correction)||Math.abs(correction)<.001)break;
     hipClearance+=correction;
    }
    seatPoses.set(height,seatedBones.map(pose=>pose.seated.clone()));
    for(const pose of seatedBones)pose.bone.quaternion.copy(pose.animated);
    model.position.set(0,baseY,0);
   }
   return {root,mixer,height:spec.height,update(dt,walking,greeting,reduced,seated=0,seatHeight=.48,pace=1){
    const next=greeting?'greet':walking?'walk':'idle';
    if(next!==state){const previous=actions[state as keyof typeof actions];const action=actions[next];action.reset().play().crossFadeFrom(previous,.22,true);state=next;}
    idle.timeScale=reduced?0:1;greet.timeScale=reduced?.4:1;walk.timeScale=pace;
    for(const pose of seatedBones)pose.bone.quaternion.copy(pose.animated);
    mixer.update(dt);
    for(const pose of seatedBones)pose.animated.copy(pose.bone.quaternion);
    model.position.set(0,baseY,0);
    if(seated>.001){
     configureSeat(seatHeight);
     for(const pose of seatedBones)pose.bone.quaternion.slerp(pose.seated,seated);
     model.position.z=-hipCenter.z*seated;
    }
    // Ground AFTER joint posing. This gives the hips their natural curved descent
    // as the knees bend, rather than lowering the whole rig through the floor.
    model.updateWorldMatrix(true,true);
    model.position.y+=restSupport-lowestSupport();
   }};
  },
  dispose(){disposed=true;skeletons.forEach(skeleton=>skeleton.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
 };
}
