import * as T from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
export function createReceiver(scene:T.Scene,solids:T.Mesh[],surface:HTMLElement,host:HTMLElement){
 const group=new T.Group();group.position.set(-12,0,3);scene.add(group);
 const metal=new T.MeshStandardMaterial({color:'#575c5b',metalness:.65,roughness:.4});const rim=new T.MeshStandardMaterial({color:'#b7b7a7',metalness:.5,roughness:.5});const geometries:T.BufferGeometry[]=[];
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material){const g=new T.BoxGeometry(w,h,d);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.radio=true;group.add(mesh);solids.push(mesh);}
 box(2.8,.18,1.3,0,.09,0,metal);box(.5,1.15,.6,0,.7,0,metal);box(3.6,4.8,.7,0,2.65,0,metal);box(3.75,.12,.8,0,5.1,0,rim);
 for(const x of [-1.25,1.25])box(.2,.25,.22,x,1.25,.45,rim);
 const overlay=new CSS3DRenderer();overlay.domElement.className='receiver-world-layer';host.appendChild(overlay.domElement);const cssScene=new T.Scene();const object=new CSS3DObject(surface);object.position.set(-12,2.65,3.365);object.scale.setScalar(.006);cssScene.add(object);
 const near=new T.Vector3(-12,1.65,9.8);
 function resizeApproach(){const fov=innerWidth<650?72:65;const factor=Math.min(.62,(innerWidth-24)/560,(innerHeight-140)/900);near.z=3.365+innerHeight*.006/(2*Math.tan(T.MathUtils.degToRad(fov/2))*Math.max(.2,factor));}
 resizeApproach();
 return {near,resizeApproach,render(camera:T.Camera,w:number,h:number){overlay.setSize(w,h);overlay.render(cssScene,camera);},dispose(){surface.remove();overlay.domElement.remove();group.removeFromParent();geometries.forEach(g=>g.dispose());metal.dispose();rim.dispose();}};
}
