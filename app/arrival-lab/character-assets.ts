import * as T from 'three';
import { createChildCharacter } from './child-character';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

export type CharacterIdentity = {
 id:string; age:number; height:number; hair:string; shirt:string; pants:string; skin:string;
};
export type CharacterVisual = {
 root:T.Group; mixer:T.AnimationMixer; height:number;
 update:(dt:number,walking:boolean,greeting:boolean,reduced:boolean,seated?:number,seatHeight?:number,pace?:number,activity?:string)=>void;
};

/** CC0 Quaternius base meshes. No reference photographs enter this pipeline. */
export async function loadCharacterAssets() {
 const loader=new GLTFLoader(),base='/arrival-lab/characters/';
 const names=['base-male','base-female','Hair_SimpleParted','Hair_Buns','Hair_Long','Hair_Beard'];
 // Wait for every request before releasing partial success: late completions are owned too.
 const results=await Promise.allSettled(names.map(name=>loader.loadAsync(base+name+'.gltf')));
 const failure=results.find(result=>result.status==='rejected');
 if(failure){
  const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>(),skeletons=new Set<T.Skeleton>();
  for(const result of results)if(result.status==='fulfilled')result.value.scene.traverse(o=>{
   if(o instanceof T.SkinnedMesh)skeletons.add(o.skeleton);
   if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const value of Object.values(m))if(value instanceof T.Texture)textures.add(value);}}
  });
  skeletons.forEach(s=>s.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
  throw failure.reason;
 }
 const loaded=results.map(result=>(result as PromiseFulfilledResult<Awaited<ReturnType<typeof loader.loadAsync>>>).value);
 const sources=new Map(names.map((name,i)=>[name,loaded[i]!.scene]));
 const skeletons=new Set<T.Skeleton>();
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>();
 for(const source of sources.values())source.traverse(o=>{if(o instanceof T.SkinnedMesh)skeletons.add(o.skeleton);if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const v of Object.values(m))if(v instanceof T.Texture)textures.add(v);}}});
 const mixers:T.AnimationMixer[]=[];
 const children:ReturnType<typeof createChildCharacter>[]=[];
 let disposed=false;
 return {
  create(spec:CharacterIdentity):CharacterVisual {
   if(disposed)throw new Error('Character assets disposed');
   if(spec.age<10){const visual=createChildCharacter(spec);children.push(visual);return visual;}
   const female=spec.id==='anastasia'||spec.id==='amelia',child=spec.age<10,toddler=spec.age<5;
   const root=new T.Group(),model=clone(sources.get(female?'base-female':'base-male')!);root.name=spec.id+' · rigged character';root.add(model);
   model.traverse(o=>{if(o instanceof T.SkinnedMesh){o.skeleton.boneInverses=o.skeleton.boneInverses.map(matrix=>matrix.clone());skeletons.add(o.skeleton);}});
   model.updateMatrixWorld(true);
   // Deform BOTH mesh vertices and bind-joint positions before rebinding.
   // This changes relative leg, torso and head sizes rather than scaling an adult.
   const leg=toddler?.53:child?.68:1,torso=toddler?.74:child?.84:1,head=toddler?1.62:child?1.38:1;
   const map=(p:T.Vector3)=>{
    const y=p.y;
    const neck=child?(toddler?.55:.70):1;
    p.y=y<.97?y*leg:y<1.52?.97*leg+(y-.97)*torso:y<1.60?.97*leg+.55*torso+(y-1.52)*neck:.97*leg+.55*torso+.08*neck+(y-1.60)*head;
    const h=T.MathUtils.smoothstep(y,1.48,1.62);
    p.x*=T.MathUtils.lerp(child?.76:spec.id==='amelia'?.84:female?.91:.87,child?1.12:spec.id==='amelia'?.93:1,h);
    p.z*=T.MathUtils.lerp(child?T.MathUtils.lerp(.74,.91,T.MathUtils.smoothstep(y,.88,1.06)):.93,child?1.15:1,h);
    if(child){
     // Short arms measured from the shoulder, a softer jaw and fuller upper face.
     // Apply the same continuous deformation to vertices AND bind joints.
     const arm=1-T.MathUtils.smoothstep(y,1.49,1.56);
     const reach=Math.max(0,Math.abs(p.x)-.16);
     p.x-=Math.sign(p.x)*reach*(toddler?.20:.12)*arm;
     const jaw=T.MathUtils.smoothstep(y,1.53,1.59)*(1-T.MathUtils.smoothstep(y,1.63,1.69));
     p.x*=1-jaw*.12;
     if(p.z>0){
      p.z*=1-jaw*.14;
      const nose=(1-T.MathUtils.smoothstep(Math.abs(p.x),.025,.065))*T.MathUtils.smoothstep(y,1.61,1.65)*(1-T.MathUtils.smoothstep(y,1.69,1.73));
      p.z*=1-nose*(toddler?.24:.16);
     }
    }
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
      if(color===shirt){v.x*=child?1.10:1.04;v.z*=child?1.15:1.08;}
      // Relax the adult hero chest and soften the boys' muscular V-shaped torso.
      if(y>.98&&y<1.48&&x<.23){v.x*=child?(.92+.10*(1-(y-.98)/.5)):.96;v.z*=child?.94:.97;}
      if(spec.id==='nataniel'&&color===shirt&&y<1.35&&Math.floor(y*36)%3===0)color=new T.Color('#ded8cc');
     }
     colors.push(color.r,color.g,color.b);
     map(v).applyMatrix4(inverse);position.setXYZ(i,v.x,v.y,v.z);
    }
    position.needsUpdate=true;o.geometry.computeVertexNormals();
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
   const hairName=spec.id==='anastasia'?'Hair_Buns':spec.id==='amelia'?'Hair_Long':'Hair_SimpleParted';
   const addHair=(name:string)=>{
    const hair=sources.get(name)!.clone(true);hair.updateMatrixWorld(true);
    const inverseHead=headBone.matrixWorld.clone().invert();
    hair.traverse(o=>{if(o instanceof T.Mesh){const geometry=o.geometry.clone(),pos=geometry.getAttribute('position');
     for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i).applyMatrix4(o.matrixWorld);if(name==='Hair_SimpleParted'&&child){if(toddler){v.y=1.65+(v.y-1.65)*.76;v.z+=.008;}else {v.y+=.018*Math.sin(v.x*61+v.z*47);v.x+=.014*Math.sin(v.y*55);}}map(v).applyMatrix4(inverseHead);pos.setXYZ(i,v.x,v.y,v.z);}
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
   const rotation=(name:string,x=0,z=0,y=0)=>{
    const parent=parentRotations.get(name)!,q=new T.Quaternion().setFromEuler(new T.Euler(x,y,z));
    return parent.clone().invert().multiply(q).multiply(parent).multiply(rests.get(name)!);
   };
   const clip=(name:string,duration:number,kind:'idle'|'walk'|'run'|'greet'|'talk')=>{
    const count=49,times=Array.from({length:count},(_,i)=>duration*i/(count-1)),tracks:T.KeyframeTrack[]=[];
    const gesture=kind==='greet'||kind==='talk',gait=kind==='walk'||kind==='run',run=kind==='run';
    const names=['upperarm_l','upperarm_r','lowerarm_l','lowerarm_r','thigh_l','thigh_r','calf_l','calf_r','foot_l','foot_r','hand_l','hand_r','Head','spine_02','pelvis'];
    for(const bone of names){
     if(!rests.has(bone)||(gesture&&/^(thigh|calf|foot|pelvis)/.test(bone)))continue;
     const values:number[]=[];
     for(let i=0;i<count;i++){
      const t=i/(count-1),phase=t*Math.PI*2,s=Math.sin(phase),side=bone.endsWith('_l')?1:-1;
      // Smooth lift, hold and release; the wave lives mostly at elbow and wrist.
      const envelope=T.MathUtils.smoothstep(t,0,.22)*(1-T.MathUtils.smoothstep(t,.76,1));
      let x=0,z=0,y=0;
      if(bone.startsWith('upperarm')){z=-side*(child?1.25:1.35);x=gait?s*side*(run?.48:.26):s*(child?.025:.012);}
      if(bone.startsWith('lowerarm'))x=run?-.85:-.16-(gait?Math.max(0,s*side)*.16:0);
      // Constant-speed stance sweep; the return step eases through toe-off and landing.
      const step=(t+(side<0?.5:0))%1;
      const sweep=step<.6?1-2*step/.6:-Math.cos((step-.6)/.4*Math.PI);
      if(bone.startsWith('thigh')&&gait)x=Math.asin(sweep*Math.sin(run?.60:.31));
      if(bone.startsWith('calf')&&gait)x=Math.sin(Math.PI*T.MathUtils.clamp((step-.6)/.4,0,1))*(run?1.05:.58);
      if(bone.startsWith('foot')&&gait)x=-Math.max(0,-s*side)*.14;
      if(bone==='pelvis'&&gait){y=s*.045;z=Math.cos(phase)*.018;}
      if(bone==='pelvis'&&kind==='idle'&&child)z=s*.012;
      if(bone.startsWith('calf')&&kind==='idle'&&child)x=Math.max(0,s*side)*.035;
      if(bone==='spine_02'){x=run?.08:s*.009;y=gait?-s*.055:0;if(kind==='idle'&&child)z=s*.012;}
      if(bone==='Head'){y=gait?-s*.025:Math.sin(phase)*(child?.095:.065);x=Math.sin(phase*2)*.012;}
      if(kind==='greet'){
       if(bone==='upperarm_r'){z=T.MathUtils.lerp(child?1.25:1.35,toddler?-1.12:child?-.85:-.72,envelope);x=-.18*envelope;}
       if(bone==='lowerarm_r'){x=-.16;z=envelope*((toddler?-.48:-.75)+Math.sin(phase*3)*(child?.30:.24));}
       if(bone==='hand_r'){z=Math.sin(phase*3)*.19*envelope;y=.12*envelope;}
       if(bone==='Head'){x=-.035*envelope+Math.sin(phase)*.025*envelope;y=0;}
       if(bone==='spine_02'){x=0;z=.015*envelope;}
      }
      if(kind==='talk'){
       const pulse=Math.sin(Math.PI*t)**2;
       if(bone==='upperarm_r'){z=(child?1.25:1.35)-.22*pulse;x=-.20*pulse;}
       if(bone==='lowerarm_r')x=-.16-.65*pulse;
       if(bone==='hand_r')y=.35*pulse;
       if(bone==='Head'){x=Math.sin(phase*2)*.035;y=Math.sin(phase)*.035;}
      }
      values.push(...rotation(bone,x,z,y).toArray());
     }
     tracks.push(new T.QuaternionKeyframeTrack(bone+'.quaternion',times,values));
    }
    return new T.AnimationClip(name,duration,tracks);
   };
   const mixer=new T.AnimationMixer(model),idleClip=clip('idle',4.8,'idle');
   mixers.push(mixer);
   const idle=mixer.clipAction(idleClip),walk=mixer.clipAction(clip('walk',toddler?.62:child?.70:spec.id==='amelia'?.98:spec.id==='anastasia'?1.10:1.04,'walk')),run=mixer.clipAction(clip('run',toddler?.48:.58,'run'));
   const waveClip=T.AnimationUtils.makeClipAdditive(clip('greeting',2.4,'greet'),0,idleClip);
   const talkClip=T.AnimationUtils.makeClipAdditive(clip('conversation',3.6,'talk'),0,idleClip);
   const greet=mixer.clipAction(waveClip).setLoop(T.LoopOnce,1),talk=mixer.clipAction(talkClip);
   idle.play();walk.play().setEffectiveWeight(0);run.play().setEffectiveWeight(0);talk.play().setEffectiveWeight(0);
   let gaitWeight=0,runWeight=0,talkWeight=0,wasGreeting=false,waveWeight=0;
   mixer.update(0);
   model.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(model,true),scale=spec.height/(bounds.max.y-bounds.min.y);
   model.scale.setScalar(scale);model.position.y=-bounds.min.y*scale;model.updateMatrixWorld(true);
   const baseY=model.position.y,support=bones.filter(b=>/^(foot|ball)_[lr]$/.test(b.name)),supportPoint=new T.Vector3();
   const lowestSupport=()=>{let low=Infinity;for(const bone of support)low=Math.min(low,root.worldToLocal(bone.getWorldPosition(supportPoint)).y);return low;};
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
    for(let i=0;i<object.geometry.attributes.position!.count;i++){
     object.getVertexPosition(i,v).applyMatrix4(toRoot);
     // Include the lower body: after proportion changes some near-knee vertices
     // enter the cushion footprint. The seated-space footprint below excludes hanging feet.
     if(v.y<=hipCenter.y+spec.height*.06)indices.push(i);
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
    for(let pass=0;pass<12;pass++){
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
   return {root,mixer,height:spec.height,update(dt,walking,greeting,reduced,seated=0,seatHeight=.48,pace=1,activity='observing'){
    dt=Math.min(.2,Math.max(0,dt));
    const blend=1-Math.exp(-dt*9);
    gaitWeight=T.MathUtils.lerp(gaitWeight,walking?1:0,blend);
    runWeight=T.MathUtils.lerp(runWeight,walking?T.MathUtils.smoothstep(pace,1.2,1.7):0,blend);
    talkWeight=T.MathUtils.lerp(talkWeight,activity==='responding'&&!walking?1:0,blend);
    idle.setEffectiveWeight(1-gaitWeight);walk.setEffectiveWeight(gaitWeight*(1-runWeight));run.setEffectiveWeight(gaitWeight*runWeight);
    talk.setEffectiveWeight(reduced?talkWeight*.25:talkWeight);
    if(greeting&&!wasGreeting){waveWeight=reduced?.35:1;greet.reset().play();}
    if(!greeting)waveWeight=T.MathUtils.damp(waveWeight,0,12,dt);
    greet.setEffectiveWeight(waveWeight);
    wasGreeting=greeting;
    idle.timeScale=reduced?0:1;greet.timeScale=reduced?.65:1;talk.timeScale=reduced?.5:1;
    // pace is measured displacement / .9 m/s. Calibrate cycles to leg reach,
    // after final scaling, rather than assuming every rig has the same stride.
    const velocity=pace*.9,legLength=legs[0]!.upper.length()+legs[0]!.lower.length();
    const stride=2*legLength*Math.sin(.31)/.6,runStride=2*legLength*Math.sin(.60)/.6;
    walk.timeScale=Math.max(.01,velocity/stride*walk.getClip().duration);
    run.timeScale=Math.max(.01,velocity/runStride*run.getClip().duration);
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
  dispose(){if(disposed)return;disposed=true;mixers.forEach(m=>{m.stopAllAction();m.uncacheRoot(m.getRoot());});children.forEach(child=>child.dispose());skeletons.forEach(skeleton=>skeleton.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
 };
}
