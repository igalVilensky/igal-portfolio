import * as T from 'three';
import { createRingSkyfall,skyfall } from './ring-skyfall';

/** Shared-centre orbital toy. Only the stationary plinth participates in body collision. */
export function createOrbitalSculpture(scene: T.Scene, solids: T.Mesh[]) {
  const root = new T.Group(); root.name = 'orbital-toy'; root.position.set(-49, 0, 0); scene.add(root);
  const geometries: T.BufferGeometry[] = [], materials: T.Material[] = [];
  function material(color: string, metalness = .45, glow = 0) {
    const m = new T.MeshStandardMaterial({ color, metalness, roughness: .32, emissive: color, emissiveIntensity: glow });
    materials.push(m); return m;
  }
  const bronze = material('#725b36'), ivory = material('#fff0c5', .5, .12), gold = material('#e9b94f', .65, .14), blue = material('#8ac5c7', .45, .16);
  function mesh(g: T.BufferGeometry, m: T.Material, parent: T.Object3D = root) {
    geometries.push(g); const object = new T.Mesh(g, m); parent.add(object); return object;
  }
  const plinth = mesh(new T.CylinderGeometry(2.3, 2.5, .42, 64), bronze); plinth.position.y = .21;
  plinth.userData.sculpture = true; solids.push(plinth);
  const stem = mesh(new T.CylinderGeometry(.16, .26, 1.2, 24), bronze); stem.position.y = 1;
  const orbit = new T.Group(); orbit.position.y = 4.65; root.add(orbit);
  const sequence=createRingSkyfall();
  const ringMaterials=[gold,ivory,blue,gold].map(m=>{const copy=m.clone();materials.push(copy);return copy;});
  const rings = [3.05, 2.46, 1.87, 1.28].map((radius, i) => {
    const pivot = new T.Group(); orbit.add(pivot);
    const ring = mesh(new T.TorusGeometry(radius, .065 + i * .008, 12, 96), ringMaterials[i]!, pivot);
    ring.userData.sculpture = true;ring.userData.ringIndex=i; ring.userData.noCollision = true; solids.push(ring);
    // One restrained bead makes the motion legible even along a ring's edge.
    const bead = mesh(new T.SphereGeometry(.13, 16, 12), ivory, pivot); bead.position.x = radius;
    return pivot;
  });
  const core = mesh(new T.IcosahedronGeometry(.42, 1), ivory, orbit); core.userData.sculpture = true; core.userData.noCollision = true; solids.push(core);
  const light = new T.PointLight('#ffe2a1', 28, 14, 1.5); light.position.set(0, 7.5, 2); root.add(light);
  const portalMaterial=new T.ShaderMaterial({transparent:true,side:T.DoubleSide,depthWrite:false,uniforms:{time:{value:0},strength:{value:0}},vertexShader:`varying vec2 v;void main(){v=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 v;uniform float time;uniform float strength;void main(){float r=length(v);float swirl=sin(atan(v.y,v.x)*5.-r*12.+time*1.2)*.5+.5;vec3 color=mix(vec3(.05,.32,.45),vec3(.45,.93,.91),swirl*.45+pow(r,3.)*.5);gl_FragColor=vec4(color,strength*(.40+.40*pow(r,3.)));
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`});materials.push(portalMaterial);
  const gate=new T.Group();gate.name='Ring Portal · walk-through gate';gate.position.set(0,2.05,4.5);root.add(gate);
  mesh(new T.CircleGeometry(1.8,64),portalMaterial,gate);
  const rimMaterial=material('#80e9e3',.3,1.2);mesh(new T.TorusGeometry(1.85,.055,8,64),rimMaterial,gate);gate.visible=false;
  for(const x of [-1.8,1.8]){const foot=mesh(new T.CylinderGeometry(.10,.16,1.7,8),bronze);foot.position.set(x,.85,4.5);}
  const beam=mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(0,4.65,0),new T.Vector3(0,5,2),new T.Vector3(0,2.05,4.5)]),24,.025,5,false),rimMaterial);beam.visible=false;
  const pad=new T.Group();pad.name='Skyfall · landing assist';pad.position.set(skyfall.x,.06,skyfall.z);scene.add(pad);
  const padMaterial=new T.MeshBasicMaterial({color:'#87e7d8',transparent:true,opacity:.0,depthWrite:false});materials.push(padMaterial);
  const padRing=mesh(new T.TorusGeometry(3,.04,6,64),padMaterial,pad);padRing.rotation.x=-Math.PI/2;
  const skyHalo=mesh(new T.TorusGeometry(2.8,.035,6,48),padMaterial,pad);skyHalo.rotation.x=-Math.PI/2;
  let spin=0,visualTime=0,reducedSignature='',hasEntryPosition=false;const previousEntryPosition=new T.Vector3();const target=new T.Quaternion(),euler=new T.Euler();
  return {
    root,sequence,get ownsMotion(){return sequence.ownsMotion;},
    activate(now:number,ring?:number){return sequence.activate(now,ring);},
    cancel(camera:T.PerspectiveCamera){return sequence.cancel(camera.position);},
    update(_now:number,dt:number,reduced:boolean,camera?:T.PerspectiveCamera,canEnter=false){
      const before=sequence.phase;
      if(canEnter&&camera){sequence.enter(camera.position,hasEntryPosition?previousEntryPosition:undefined);previousEntryPosition.copy(camera.position);hasEntryPosition=true;}else hasEntryPosition=false;
      const changed=sequence.update(dt,camera?.position);
      if(before!==sequence.phase&&sequence.phase==='reveal'&&camera)camera.rotation.set(-.90,0,0,'YXZ');
      if(!reduced){spin+=Math.min(dt,.05)*.22;visualTime+=Math.min(dt,.2);}
      const active=sequence.phase==='aligning'||sequence.phase==='open'||sequence.ownsMotion;
      const signature=sequence.phase+sequence.charges;
      rings.forEach((ring,i)=>{
        const charged=!!(sequence.charges&(1<<i));
        euler.set(active?0:.4+i*.52+spin*[1,-.63,.47,-.82][i]!,active?0:i*.67+spin*[.28,.48,-.34,.6][i]!,active?0:i*.32);
        target.setFromEuler(euler);if(reduced){if(signature!==reducedSignature)ring.quaternion.copy(target);}else ring.quaternion.slerp(target,1-Math.exp(-dt*(active?2:charged?5:1.5)));
        ringMaterials[i]!.emissiveIntensity=T.MathUtils.damp(ringMaterials[i]!.emissiveIntensity,charged?.8:.14,5,dt);
      });
      reducedSignature=signature;beam.visible=active&&!sequence.ownsMotion;
      gate.visible=sequence.phase==='open'||sequence.phase==='launching';
      portalMaterial.uniforms.time!.value=visualTime;portalMaterial.uniforms.strength!.value=gate.visible?1:0;
      core.scale.setScalar(1+(reduced?0:Math.sin(visualTime*2)*.05)*(sequence.count/4));
      light.intensity=T.MathUtils.damp(light.intensity,active?65:28,4,dt);
      const landing=sequence.phase==='braking'||sequence.phase==='landed';pad.visible=sequence.ownsMotion;padMaterial.opacity=landing?.55:.18;
      skyHalo.position.y=landing&&camera?Math.max(.2,camera.position.y-1.7):0;skyHalo.scale.setScalar(landing?1.2:1);
      root.updateMatrixWorld(true);
      return changed||!reduced;
    },
    dispose() { for(const o of [...solids])if(o===plinth||o===core||o.userData.sculpture&&o.parent?.parent===orbit){const i=solids.indexOf(o);if(i>=0)solids.splice(i,1);}pad.removeFromParent();root.removeFromParent(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); },
  };
}
