import * as T from 'three';
import { createBuilderStore,parseCreation,builderKey,pieceSize,pieceBounds,validPlacement,type Piece, type PieceType } from './builder-model';

export function createCreationYard(scene:T.Scene){
 const root=new T.Group();root.name='Saved creations';scene.add(root);
 let initial:Piece[]=[];try{initial=parseCreation(localStorage.getItem(builderKey));}catch{}
 const store=createBuilderStore(initial,raw=>{if(raw===null)localStorage.removeItem(builderKey);else localStorage.setItem(builderKey,raw);});
 const ramp=new T.BufferGeometry();ramp.setAttribute('position',new T.Float32BufferAttribute([
 -1,-.5,-1,1,-.5,1,1,-.5,-1,-1,-.5,-1,-1,-.5,1,1,-.5,1,
 -1,-.5,-1,1,-.5,-1,1,.5,1,-1,-.5,-1,1,.5,1,-1,.5,1,
 -1,-.5,1,-1,.5,1,1,.5,1,-1,-.5,1,1,.5,1,1,-.5,1,
 -1,-.5,-1,-1,.5,1,-1,-.5,1,1,-.5,-1,1,-.5,1,1,.5,1
 ],3));
 // The wedge is authored as closed inward triangles; reverse winding for outward faces.
 const vertices=ramp.getAttribute('position') as T.BufferAttribute;
 for(let i=0;i<vertices.count;i+=3){const x=vertices.getX(i+1),y=vertices.getY(i+1),z=vertices.getZ(i+1);vertices.setXYZ(i+1,vertices.getX(i+2),vertices.getY(i+2),vertices.getZ(i+2));vertices.setXYZ(i+2,x,y,z);}
 ramp.computeVertexNormals();
 const geometries:Record<PieceType,T.BufferGeometry>={cube:new T.BoxGeometry(1,1,1),block:new T.BoxGeometry(2,1,1),cylinder:new T.CylinderGeometry(.5,.5,2,16),sphere:new T.SphereGeometry(.5,16,10),ramp,platform:new T.BoxGeometry(2,.5,2),wall:new T.BoxGeometry(2,2,.5)};
 const materials=new Map<string,T.MeshStandardMaterial>();
 const material=(color:string)=>{if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.55}));return materials.get(color)!;};
 const meshes=new Map<number,T.Mesh>();
 let collisionBounds:ReturnType<typeof pieceBounds>[]=[];
 const previewMat=new T.MeshStandardMaterial({color:'#78efc2',transparent:true,opacity:.48,depthWrite:false,roughness:.5});
 const preview=new T.Mesh(geometries.cube,previewMat);preview.visible=false;preview.renderOrder=4;root.add(preview);
 const selection=new T.BoxHelper(preview,'#fff2ad');selection.material.depthTest=false;selection.renderOrder=5;selection.visible=false;root.add(selection);
 const ray=new T.Raycaster(),pointer=new T.Vector2(),plane=new T.Plane(new T.Vector3(0,1,0),-.09),point=new T.Vector3(),normal=new T.Vector3();
 let type:PieceType='cube',color='#ed896a',rotation=0,selected:number|null=null,moving:number|null=null,draft:Piece|null=null,selecting=false;
 let lastCamera:T.PerspectiveCamera|null=null,lastX=0,lastY=0,editBlocked=false;
 function refresh(){if(lastCamera)api.update(lastCamera,lastX,lastY);}
 function invalidate(){draft=null;preview.visible=false;}
 function sync(){
  collisionBounds=store.pieces.map(pieceBounds);
  for(const [id,m] of meshes){if(!store.pieces.some(p=>p.id===id)){m.removeFromParent();meshes.delete(id);}}
  for(const p of store.pieces){let m=meshes.get(p.id);if(!m){m=new T.Mesh(geometries[p.type],material(p.color));m.userData.piece=p.id;root.add(m);meshes.set(p.id,m);}m.geometry=geometries[p.type];m.material=material(p.color);m.position.set(p.x,p.y+.09,p.z);m.rotation.y=p.rotation*Math.PI/2;m.visible=moving!==p.id;}
  const m=selected===null?undefined:meshes.get(selected);selection.visible=!!m&&moving===null;if(m)selection.setFromObject(m);
 }
 function cast(camera:T.Camera,x=0,y=0){root.updateMatrixWorld(true);pointer.set(x,y);ray.setFromCamera(pointer,camera);return ray.intersectObjects([...meshes.values()].filter(m=>m.visible),false)[0];}
 function commandDone(){editBlocked=false;sync();}
 sync();
 const api={store,get editBlocked(){return editBlocked;},get draft(){return draft?{...draft}:null;},get selecting(){return selecting;},get selected(){return selected;},get type(){return type;},get color(){return color;},get valid(){return !selecting&&!!draft&&validPlacement(draft,store.pieces);},get moving(){return moving!==null;},
 constrain(from:T.Vector3,to:T.Vector3){
  let floor=0;const feet=from.y-1.65,r=.32;
  const overlap=(x:number,z:number,b:ReturnType<typeof pieceBounds>)=>x>b.minX-r&&x<b.maxX+r&&z>b.minZ-r&&z<b.maxZ+r;
  for(const b of collisionBounds){
   if(feet>=b.maxY-.2){if(overlap(to.x,to.z,b))floor=Math.max(floor,b.maxY);continue;}
   if(from.y+.25<b.minY||feet>=b.maxY)continue;
   if(overlap(to.x,from.z,b))to.x=from.x;
   if(overlap(to.x,to.z,b))to.z=from.z;
  }
  return floor;
 },
 choose(next:PieceType){editBlocked=false;type=next;selected=moving=null;rotation=0;selecting=false;sync();refresh();},
 setColor(next:string){color=next;const p=store.pieces.find(p=>p.id===selected);if(p&&moving===null){store.put({...p,color});commandDone();}refresh();},
 rotate(){const p=store.pieces.find(p=>p.id===selected);if(p&&moving===null){if(store.put({...p,rotation:(p.rotation+1)%4}))commandDone();else editBlocked=true;}else rotation=(rotation+1)%4;refresh();},
 move(){const p=store.pieces.find(p=>p.id===selected);if(p){moving=p.id;type=p.type;color=p.color;rotation=p.rotation;selecting=false;sync();refresh();}},
 remove(){if(selected!==null){store.remove(selected);selected=moving=null;selecting=true;invalidate();commandDone();}},
 undo(){store.undo();selected=moving=null;commandDone();refresh();},reset(){store.reset();selected=moving=null;commandDone();refresh();},
 select(){editBlocked=false;moving=null;selected=null;selecting=true;invalidate();sync();},
 cancel(){if(moving!==null||selected!==null||selecting){moving=selected=null;selecting=false;sync();refresh();return true;}return false;},
 close(){moving=null;selecting=false;lastCamera=null;draft=null;preview.visible=false;selection.visible=false;sync();selection.visible=false;},
 update(camera:T.PerspectiveCamera,x=0,y=0){
  lastCamera=camera;lastX=x;lastY=y;
  if(selecting||(selected!==null&&moving===null)){invalidate();const object=selected===null?undefined:meshes.get(selected);selection.visible=!!object;if(object)selection.setFromObject(object);return;}
  const hit=cast(camera,x,y);const d=pieceSize({type,rotation});
  if(hit){point.copy(hit.point);normal.copy(hit.face?.normal||new T.Vector3(0,1,0)).transformDirection(hit.object.matrixWorld);
   const p=store.pieces.find(p=>p.id===hit.object.userData.piece)!;const b=pieceBounds(p);
   // Axis-aligned support bounds keep stacking predictable for rounded and sloping shapes too.
   if(Math.abs(normal.y)>.55){point.y=normal.y>0?b.maxY+d[1]!/2:b.minY-d[1]!/2;point.x=Math.round(point.x*2)/2;point.z=Math.round(point.z*2)/2;}
   else if(Math.abs(normal.x)>Math.abs(normal.z)){point.x=normal.x>0?b.maxX+d[0]!/2:b.minX-d[0]!/2;point.y=Math.round((point.y-.09)*2)/2;point.z=Math.round(point.z*2)/2;}
   else {point.z=normal.z>0?b.maxZ+d[2]!/2:b.minZ-d[2]!/2;point.y=Math.round((point.y-.09)*2)/2;point.x=Math.round(point.x*2)/2;}
  }else if(ray.ray.intersectPlane(plane,point)){point.x=Math.round(point.x*2)/2;point.z=Math.round(point.z*2)/2;point.y=d[1]!/2;}
  else {draft=null;preview.visible=false;return;}
  if(camera.position.distanceTo(point)>48){draft=null;preview.visible=false;return;}
  draft={id:moving??store.nextId,type,color,rotation,x:point.x,y:point.y,z:point.z};preview.geometry=geometries[type];preview.position.set(point.x,point.y+.09,point.z);preview.rotation.y=rotation*Math.PI/2;previewMat.color.set(validPlacement(draft,store.pieces)?moving!==null?'#85baff':'#76efbf':'#f36678');previewMat.opacity=moving!==null?.65:.48;preview.visible=true;
 },
 activate(camera:T.PerspectiveCamera,x=0,y=0){
  // Selection is an explicit tool. Confirmation never computes a second placement.
  if(selecting){const hit=cast(camera,x,y);selected=hit?Number(hit.object.userData.piece):null;invalidate();sync();return;}
  this.place();
 },
 place(){if(draft&&!selecting&&store.put(draft)){selected=null;moving=null;commandDone();invalidate();refresh();}},
 dispose(){root.removeFromParent();Object.values(geometries).forEach(g=>g.dispose());materials.forEach(m=>m.dispose());previewMat.dispose();selection.geometry.dispose();(selection.material as T.Material).dispose();}
 };
 return api;
}
