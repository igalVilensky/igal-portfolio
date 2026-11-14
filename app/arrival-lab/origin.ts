import * as T from 'three';

/** Metres in Arrival's coordinates. The south entrance never changes environments. */
export const originBoundary = [[-112,-125],[62,-125],[84,-82],[84,105],[54,132],[-65,132],[-112,78]] as const;
export function originHeight(x:number,z:number) { return x>=38&&x<=70&&z>=60&&z<=112 ? Math.min(4,(z-60)/5) : 0; }
export function createOrigin(scene:T.Scene,solids:T.Mesh[]) {
 const root=new T.Group();root.name='The Origin';scene.add(root);
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>();
 const mat=(color:string,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.78,metalness});materials.add(m);return m;};
 const stone=mat('#d6cbb4'),pale=mat('#eee6d4'),basalt=mat('#535f66'),bronze=mat('#8e7550',.55),path=mat('#a6b6b6'),green=mat('#516c58');
 function mesh(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,solid=false,parent:T.Object3D=root){geometries.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;o.userData.room='origin';o.userData.noCollision=!solid;parent.add(o);solids.push(o);return o;}
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,solid=false,parent:T.Object3D=root)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,solid,parent);
 function slab(points:readonly (readonly number[])[],depth:number,y:number,m:T.Material){const shape=new T.Shape(points.map(p=>new T.Vector2(p[0]!,p[1]!)));const g=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:false});g.rotateX(Math.PI/2);return mesh(g,m,0,y,0);}
 slab(originBoundary,4,-.06,stone);
 slab(originBoundary.map(([x,z])=>[x*.975,z*.975]),6,-4,basalt);
 slab(originBoundary.map(([x,z])=>[x*.88,z*.88]),5,-10,stone);
 const keel=mesh(new T.CylinderGeometry(80,32,30,7,1),basalt,-8,-29,0);keel.rotation.y=.15;keel.scale.z=1.4;
 // Edge protection is coincident with the visible retaining edge, including angled corners.
 originBoundary.forEach((a,i)=>{const b=originBoundary[(i+1)%originBoundary.length]!;const length=Math.hypot(b[0]-a[0],b[1]-a[1]);const o=box(length,.85,.45,(a[0]+b[0])/2,.425,(a[1]+b[1])/2,pale,true);o.rotation.y=-Math.atan2(b[1]-a[1],b[0]-a[0]);});
 // South portico: deep jambs, recessed bronze doors, cantilevered canopy.
 for(const side of [-1,1]){box(1.4,14,6,12+side*5.7,7,26,pale,true);box(1,24,2.5,side*19,12,25.5,pale,true);}
 box(14,1.2,9,12,14,27,pale);box(19,.5,12,12,14.85,27,bronze);
 box(14,.22,10,12,-.11,29,path);
 const pivots=[-1,1].map(side=>{const p=new T.Group();p.position.set(12+side*4.9,0,24);root.add(p);const leaf=box(4.9,11.8,.35,-side*2.45,5.9,0,bronze,true,p);leaf.userData.originDoor=true;delete leaf.userData.room;box(.08,2,.12,-side*4.4,1.5,side*.24,pale,false,p).userData.originDoor=true;return p;});
 // A broad procession and lateral mineral courts leave the building legible from a distance.
 box(18,.025,66,12,.014,64,path);box(72,.03,18,12,.016,62,pale);
 for(const side of [-1,1]){if(side<0)box(9,.025,109,side*35,.016,-2,path);
 else {
 // Keep the exterior promenade continuous around the Little Explorer pavilion.
 box(9,.025,48.5,35,.016,-32.25,path);
 box(9,.025,18.5,35,.016,43.25,path);
 box(37,.025,7,50,.016,-8,path);box(7,.025,49,65,.016,13,path);box(37,.025,7,50,.016,34,path);
 }for(const [z,d] of [[55,8],[72,14]] as const)box(1.5,1.2,d,12+side*16,.6,z,stone,true);box(1.8,2.4,12,side*24,1.2,46,basalt,true);}
 box(55,.025,14,0,.018,115,pale);
 // Side shell: deep fins and a roof shoulder echo the existing barrel vault.
 for(const side of [-1,1])for(const z of [-58,-26,6])box(2.4,26,3.2,side*26.4,13,z,pale,true);
 box(7,30,30,29.5,15,-36,stone,true);box(9,1.5,34,30,30.5,-36,bronze);
 box(.1,18,1.2,33.06,17,-28,bronze);
 // Accessible four-metre belvedere: twenty-metre continuous incline, no jumping.
 const ramp=new T.BufferGeometry();ramp.setAttribute('position',new T.Float32BufferAttribute([38,0,60,38,4,80,70,0,60,70,0,60,38,4,80,70,4,80],3));ramp.computeVertexNormals();mesh(ramp,path,0,.02,0);
 box(32,4,32,54,2,96,stone);
 for(const x of [38,70]){const rail=box(.7,1.1,20.4,x,2.55,70,pale,true);rail.rotation.x=-Math.atan(.2);box(.7,1.1,32,x,4.55,96,pale,true);}
 box(32,1.1,.7,54,4.55,112,pale,true);
 // Ground-level side protection prevents entering raised terrain through its retaining face.
 box(.7,4,32,38,2,96,stone,true);box(.7,4,32,70,2,96,stone,true);box(32,4,.7,54,2,112,stone,true);
 // An empty threshold, with daylight on both sides. No interaction or false affordance.
 box(16,.15,16,-53,.075,82,basalt);
 for(const x of [-56,-50])box(1,8,1.8,x,4,82,pale,true);
 box(7,1,1.8,-53,8.5,82,pale);box(.55,6,.6,-52,3,82,bronze,true);
 // Three restrained gardens soften the otherwise mineral landscape.
 for(const [x,z] of [[-44,54],[48,28],[-76,100]] as const){box(9,.8,6,x,.4,z,basalt,true);const crown=mesh(new T.IcosahedronGeometry(3,1),green,x,2,z);crown.scale.set(1,.55,1);}
 function fragment(x:number,y:number,z:number,r:number,type:number){const g=new T.Group();g.position.set(x,y,z);root.add(g);const land=mesh(new T.CylinderGeometry(r,r*.45,15,6),stone,0,-8,0,false,g);land.rotation.y=.25;
 box(r*1.65,1,r*1.25,0,0,0,pale,false,g);
 if(type===0)for(const [px,h] of [[-9,15],[0,22],[9,10]] as const)box(2,h,3,px!,h!/2,0,basalt,false,g);
 if(type===1){box(1.8,10,1.8,0,5,0,bronze,false,g);const tree=mesh(new T.IcosahedronGeometry(7,1),green,0,12,0,false,g);tree.scale.set(1,.65,1);}
 if(type===2){box(8,23,4,0,11,0,basalt,false,g);box(10,1,6,2,23,0,bronze,false,g);}}
 fragment(-170,12,205,23,0);fragment(150,-15,255,18,1);fragment(225,35,-20,27,2);
 // One opaque sky and two procedural opaque cloud decks: bounded fill cost, no ray marching.
 const skyMaterial=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color()},horizon:{value:new T.Color()}},vertexShader:'varying vec3 v; void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 v;uniform vec3 top;uniform vec3 horizon;void main(){float h=normalize(v).y;gl_FragColor=vec4(mix(horizon,top,smoothstep(-.16,.75,h)),1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'});materials.add(skyMaterial);
 const sky=mesh(new T.SphereGeometry(1800,32,16),skyMaterial,0,0,0);sky.castShadow=sky.receiveShadow=false;sky.renderOrder=-10;
 const cloudMaterial=new T.ShaderMaterial({side:T.DoubleSide,uniforms:{time:{value:0},light:{value:new T.Color()},shade:{value:new T.Color()}},vertexShader:'varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec3 v;uniform float time;uniform vec3 light;uniform vec3 shade;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
 void main(){vec2 p=v.xy*.008+vec2(time*.001,0);float n=noise(p)*.55+noise(p*2.3)*.27+noise(p*5.7)*.13+noise(p*13.)*.05;gl_FragColor=vec4(mix(shade,light,smoothstep(.15,.8,n)),1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});materials.add(cloudMaterial);
 const clouds=mesh(new T.PlaneGeometry(12000,12000,1,1),cloudMaterial,0,-112,0);clouds.rotation.x=-Math.PI/2;clouds.castShadow=clouds.receiveShadow=false;
 const cloudStone=mat('#e6e6dc');
 const bankGeometry=new T.SphereGeometry(1,32,20);geometries.add(bankGeometry);
 const vertices=bankGeometry.attributes.position!;
 for(let i=0;i<vertices.count;i++){const x=vertices.getX(i),y=vertices.getY(i),z=vertices.getZ(i);const r=1+.06*Math.sin(x*5+z*3)*Math.sin(y*4-z*2)+.03*Math.cos(z*6+x*3);vertices.setXYZ(i,x*r,y*r,z*r);}bankGeometry.computeVertexNormals();
 const banks=new T.InstancedMesh(bankGeometry,cloudStone,36),transform=new T.Object3D();
 for(let i=0;i<36;i++){const a=i*2.39996,r=130+(i%9)*82;transform.position.set(Math.cos(a)*r,-99+(i%4)*4,Math.sin(a)*r);transform.scale.set(65+(i%4)*21,24+(i%3)*9,45+(i%5)*14);transform.rotation.y=i*.71;transform.updateMatrix();banks.setMatrixAt(i,transform.matrix);}
 banks.instanceMatrix.needsUpdate=true;root.add(banks);
 const moonFill=new T.DirectionalLight('#b9cde5',0);moonFill.position.set(20,35,110);moonFill.target.position.set(12,8,24);root.add(moonFill,moonFill.target);
 let opened=false,progress=0,darkTheme=false;
 const indoorFog=new T.Color(),outdoorFog=new T.Color();
 return {root,get opened(){return opened;},activate(){opened=!opened;},
 update(dt:number,reduced:boolean,position:T.Vector3,active:boolean,outside=position.z>24,navigating=false,elevated=false){if(active&&outside&&navigating)opened=true;const next=T.MathUtils.damp(progress,opened?1:0,5,dt);const changed=Math.abs(next-progress)>.00001;progress=next;pivots.forEach((p,i)=>p.rotation.y=(i===0?-1:1)*progress*Math.PI*.52);if(active){const t=elevated?1:outside?Math.max(T.MathUtils.smoothstep(position.z,24,38),T.MathUtils.smoothstep(position.x,26,38),T.MathUtils.smoothstep(-position.x,96,108),T.MathUtils.smoothstep(-position.z,108,120)):0;moonFill.intensity=darkTheme?2.4*t:0;if(scene.fog instanceof T.FogExp2){scene.fog.density=T.MathUtils.lerp(darkTheme?.006:.0035,.0009,t);scene.fog.color.copy(indoorFog).lerp(outdoorFog,t);}if(!elevated)position.y=1.65+originHeight(position.x,position.z);sky.position.copy(position);if(!reduced)cloudMaterial.uniforms.time!.value+=dt;}return changed;},
 setTheme(dark:boolean){cloudStone.color.set(dark?'#586c87':'#e6e6dc');darkTheme=dark;indoorFog.set(dark?'#131d2b':'#d3d7d6');outdoorFog.set(dark?'#657588':'#c3d6df');stone.color.set(dark?'#46566a':'#d6cbb4');pale.color.set(dark?'#738294':'#eee6d4');basalt.color.set(dark?'#273645':'#535f66');path.color.set(dark?'#475f72':'#a6b6b6');skyMaterial.uniforms.top!.value.set(dark?'#10233f':'#448abd');skyMaterial.uniforms.horizon!.value.set(dark?'#9b8794':'#e4e8df');cloudMaterial.uniforms.light!.value.set(dark?'#7c8ca5':'#fff4dd');cloudMaterial.uniforms.shade!.value.set(dark?'#263e5a':'#819fb9');},
 dispose(){banks.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());root.removeFromParent();}};
}
