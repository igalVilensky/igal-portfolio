import * as T from 'three';
import { wallNodes } from './connectivity';
/** All panels are solid extrusions; each chevron terminates at the continuous centre joint. */
export function createWall(scene: T.Scene) {
  const root = new T.Group(); root.position.set(0, 0, -69); scene.add(root);
  const geometries = new Set<T.BufferGeometry>(), materials = new Set<T.Material>();
  const mineral = new T.MeshStandardMaterial({ color: '#c9bda6', roughness: .64, metalness: .16 });
  const frame = new T.MeshStandardMaterial({ color: '#645e50', roughness: .45, metalness: .65 });
  const channel = new T.MeshStandardMaterial({ color: '#9e8251', emissive: '#efbd75', emissiveIntensity: .08, metalness: .55, roughness: .4 });
  materials.add(mineral); materials.add(frame); materials.add(channel);
  const solids: T.Mesh[] = [], panels: T.Mesh[] = [], signals: T.MeshStandardMaterial[] = [];
  function mesh(g: T.BufferGeometry, m: T.Material, parent: T.Object3D = root) { geometries.add(g); const o = new T.Mesh(g,m); o.castShadow = true; o.receiveShadow = true; parent.add(o); solids.push(o); return o; }
  function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=frame,parent:T.Object3D=root) { const o=mesh(new T.BoxGeometry(w,h,d),m,parent);o.position.set(x,y,z);return o; }
  const carriages = [-1,1].map(() => { const g=new T.Group();root.add(g);return g; });
  for (const side of [-1,1]) {
    // Exposed rails and rear pocket liners: nothing occupies the travel envelope.
    box(7,.18,.22,side*3.5,9.8,-.65);box(7,.12,.22,side*3.5,.08,-.65);
    // Cross-slide beds carry the inward stroke; rear rails carry the lateral stroke.
    for(const y of [.08,9.8]) {
      box(7,.16,.22,side*3.5,y,-1.45);
      box(.26,.16,1.02,side*2.65,y,-1.05);
    }
    box(.2,9.8,.15,side*2.65,4.9,-.57,frame,carriages[side<0?0:1]);
    box(4,10,.22,side*5.15,5,-1.7);
    for(let row=0;row<7;row++) {
      const shape=new T.Shape([[3.15,row===0?.035:row*1.38+.59],[7.15,row===0?.035:row*1.38+.09],[7.15,row*1.38+1.42],[3.15,row*1.38+1.92]].map(([x,y])=>new T.Vector2(side*x!,y!)));
      mesh(new T.ExtrudeGeometry(shape,{depth:.5,bevelEnabled:false}),mineral);
    }
    box(.25,10,2,side*7.3,5,-.75);
  }
  wallNodes.forEach(n => {
    const side=n.side, y=n.row*1.38, parent=carriages[side<0?0:1]!;
    const pts = [[.035,y+.035],[2.98,n.row===0?.035:y+.56],[2.98,y+1.89],[.035,y+1.36]].map(([x,y])=>new T.Vector2(side*x!,y!));
    const shape=new T.Shape(pts); const panel=mesh(new T.ExtrudeGeometry(shape,{depth:.48,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.025,bevelThickness:.025}),mineral,parent);
    panel.position.z=.04*(n.row%2);panel.userData.facet=n.id;panels.push(panel);
    // Channel runs up the centre joint, then along this panel's lower chevron edge.
    const m=channel.clone();materials.add(m);signals.push(m);
    const path=new T.CurvePath<T.Vector3>();
    path.add(new T.LineCurve3(new T.Vector3(side*.06,y+.04,.54),new T.Vector3(side*.06,y+1.4,.54)));
    path.add(new T.LineCurve3(new T.Vector3(side*.06,y+.04,.54),new T.Vector3(side*2.94,y+.56,.54)));
    // Separate segments avoid a discontinuity in the tube path.
    for(const curve of path.curves) mesh(new T.TubeGeometry(curve,1,.025,5,false),m,parent).userData.facet=n.id;
    // Slider shoes fasten every slab to the carriage behind it.
    box(.22,.45,.65,side*2.65,y+.9,-.28,frame,parent);
  });
  const keyMaterial=mineral.clone(); materials.add(keyMaterial); keyMaterial.emissive.set('#e6b777');
  const key=box(.65,.65,.04,0,1.7,.69,keyMaterial,carriages[0]);key.rotation.z=Math.PI/4;key.userData.key=true;
  const bezel=box(.85,.85,.04,0,1.7,.59,frame,carriages[0]);bezel.rotation.z=Math.PI/4;bezel.userData.key=true;
  const keyTarget=box(1.2,1.2,.04,0,1.7,.74,new T.MeshBasicMaterial({visible:false}),carriages[0]); materials.add(keyTarget.material as T.Material); keyTarget.userData.key=true;
  const passage=box(5.7,8.8,.06,0,4.4,-2, new T.MeshBasicMaterial({visible:false, side:T.DoubleSide}));materials.add(passage.material as T.Material);passage.userData.passage=true;
  return {setTheme(dark:boolean){
    mineral.color.set(dark?'#414b5a':'#c9bda6'); frame.color.set(dark?'#202b3c':'#645e50');
    keyMaterial.color.copy(mineral.color);keyMaterial.emissive.set(dark?'#7bd5f5':'#e6b777');
    signals.forEach(m=>{m.color.set(dark?'#53798c':'#9e8251');m.emissive.set(dark?'#58c8f0':'#efbd75');});
  },root,solids,panels,signals,carriages,key,passage,dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());root.removeFromParent();}};
}
