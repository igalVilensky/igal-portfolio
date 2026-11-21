import * as T from 'three';
import {createWeaverState,weaverTargets} from './destination-state';
export function createSkyWeaver(parent:T.Group,solids:T.Mesh[]){
 const root=new T.Group();root.name='Sky Weaver';root.position.set(960,0,-727);parent.add(root);const state=createWeaverState();
 const gs:T.BufferGeometry[]=[],ms:T.Material[]=[],owned:T.Mesh[]=[];
 const stone=new T.MeshStandardMaterial({color:'#526879',roughness:.75}),gold=new T.MeshStandardMaterial({color:'#bea16c',metalness:.7,roughness:.35}),energy=new T.MeshBasicMaterial({color:'#9de6df'});ms.push(stone,gold,energy);
 function mesh(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number){gs.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);root.add(o);return o;}
 const rings:T.Mesh[]=[],channels:T.Mesh[]=[];
 // Three enormous articulated square meridians, unlike either small observatory or Ring Portal.
 for(let i=0;i<3;i++){const r=5+i*2;const curve=new T.CatmullRomCurve3([new T.Vector3(-r,0,-r),new T.Vector3(r,0,-r),new T.Vector3(r,0,r),new T.Vector3(-r,0,r)],true,'catmullrom',.15);const o=mesh(new T.TubeGeometry(curve,72,.13,6,true),gold,0,13+i*2,0);o.rotation.z=.3+i*.3;rings.push(o);
 const a=weaverTargets[i]!*Math.PI/2;mesh(new T.OctahedronGeometry(.45),gold,Math.cos(a)*r,7+i*1.4,Math.sin(a)*r);
 const c=mesh(new T.OctahedronGeometry(.55),energy,0,7+i*1.4,r);channels.push(c);
 const path=mesh(new T.BoxGeometry(.06,.025,20),gold,-8+i*4,.03,10);path.rotation.y=.2*(i-1);
 }
 for(const s of [-1,1]){const p=mesh(new T.BoxGeometry(1.2,20,1.8),stone,s*11,10,0);p.rotation.z=-s*.13;p.userData.room='sky-weaver';solids.push(p);owned.push(p);mesh(new T.BoxGeometry(5,.35,3),gold,s*9,20,0);}
 const core=mesh(new T.IcosahedronGeometry(1.8,2),energy,0,12,0);
 const cage=mesh(new T.IcosahedronGeometry(2.6,1),new T.MeshBasicMaterial({color:'#bbdce1',wireframe:true}),0,12,0);ms.push(cage.material as T.Material);
 // One ribbon mesh spans the sky locally; opacity follows the bounded climax, no global sky ownership.
 const verts:number[]=[],indices:number[]=[];for(let i=0;i<=160;i++){const a=i/160*Math.PI*2,r=90+Math.sin(a*5)*12;for(const y of [0,1])verts.push(Math.cos(a)*r,45+Math.sin(a*3)*12+y*(14+Math.sin(a*7)*5),Math.sin(a)*r);if(i<160){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
 const ribbonG=new T.BufferGeometry();ribbonG.setAttribute('position',new T.Float32BufferAttribute(verts,3));ribbonG.setIndex(indices);ribbonG.computeVertexNormals();
 const ribbonM=new T.ShaderMaterial({transparent:true,side:T.DoubleSide,depthWrite:false,uniforms:{strength:{value:0},time:{value:0}},vertexShader:`varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 p;uniform float strength,time;void main(){float bands=.45+.55*sin(p.x*.11+p.z*.07+time*.25);vec3 c=mix(vec3(.2,.75,.65),vec3(.55,.37,.94),bands);gl_FragColor=vec4(c,strength*(.2+bands*.35));}`});ms.push(ribbonM);const ribbon=mesh(ribbonG,ribbonM,0,0,0);ribbon.visible=false;
 const orbital=mesh(new T.TorusGeometry(72,.12,5,160),energy,0,52,0);orbital.rotation.x=1.15;orbital.visible=false;
 let clock=0;
 return {state,update(dt:number,reduced:boolean,near:boolean){if(!near&&state.charge===0)return false;state.update(dt);clock+=dt;const values=state.alignments;rings.forEach((r,i)=>{r.rotation.y=T.MathUtils.damp(r.rotation.y,values[i]!*Math.PI/2,4,dt);r.rotation.x=.22+i*.32;const a=values[i]!*Math.PI/2;channels[i]!.position.set(Math.cos(a)*(5+i*2),7+i*1.4,Math.sin(a)*(5+i*2));});core.scale.setScalar(state.awake?.65+state.charge*.9:.35);cage.rotation.y=reduced?0:clock*.1;ribbon.visible=orbital.visible=state.event>0;ribbonM.uniforms.strength!.value=Math.min(1,state.event/3);ribbonM.uniforms.time!.value=reduced?0:clock;if(!reduced)orbital.rotation.z=clock*.025;return near||state.event>0;},dispose(){owned.forEach(o=>{const i=solids.indexOf(o);if(i>=0)solids.splice(i,1);});root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
