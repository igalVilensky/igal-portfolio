import * as T from 'three';
export type InteractionState='idle'|'focused'|'actionable'|'busy'|'disabled';
export function interactionId(mesh:T.Object3D):string|undefined {
 const d=mesh.userData;
 return d.sculpture?'sculpture':d.works?'works:'+d.works+(d.criterion!==undefined?':'+d.criterion:''):d.radio?'radio':d.terminal?'terminal':d.key?'key':d.facet!==undefined?'facet':d.passage&&mesh instanceof T.Mesh&&(mesh.material as T.Material).visible===false?'passage':undefined;
}
/** Physical object clicks may request existing guided travel; contextual use stays nearby. */
export function interactionIntent(id:string|false, inRange:boolean, direct:boolean):'activate'|'approach'|'none' {
 if(!id)return 'none';
 if(inRange)return 'activate';
 return direct?'approach':'none';
}
/** Actual registered meshes only. Occlusion continues to use the world's solid geometry. */
export function createInteractables(solids:T.Mesh[]) {
 const entries=solids.flatMap(mesh=>{const id=interactionId(mesh);return id?[{id,mesh,range:id==='facet'||id==='key'||id==='passage'?12:9,state:'idle' as InteractionState}]:[];});
 const materials=new Map<T.Mesh,{original:T.Material|T.Material[];owned:T.MeshStandardMaterial}>();
 for(const entry of entries){const original=entry.mesh.material;if(original instanceof T.MeshStandardMaterial && entry.id!=='facet' && entry.id!=='key'){const owned=original.clone();entry.mesh.material=owned;materials.set(entry.mesh,{original,owned});}}
 return {entries,
 update(now:number,focused:string|false,actionable:boolean,busy:boolean,reduced:boolean){let changed=false;for(const entry of entries){entry.state=busy?'busy':entry.id===focused?actionable?'actionable':'focused':'idle';const pair=materials.get(entry.mesh);const material=pair?.owned;if(!material)continue;const original=pair!.original as T.MeshStandardMaterial;material.color.copy(original.color);material.emissive.copy(original.emissive);if(material.emissive.getHex()===0)material.emissive.setHex(0x879b83);const intensity=original.emissiveIntensity+(busy?.025:entry.id===focused?actionable?.27:.16:.035+(reduced?0:.018*(1+Math.sin(now/520+entry.mesh.id))));if(Math.abs(material.emissiveIntensity-intensity)>.0001){material.emissiveIntensity=intensity;changed=true;}}return changed;},
 dispose(){for(const [mesh,{original,owned}] of materials){mesh.material=original;owned.dispose();}},
 };
}
