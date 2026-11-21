import type * as T from 'three';
/** Snapshot only state mutated by portal passes, including nested aperture visibility. */
export function capturePortalRenderState(renderer:T.WebGLRenderer,scene:T.Scene,apertures:T.Object3D[]){
 const visibility=new Map([...scene.children,...apertures].map(object=>[object,object.visible] as const));
 const target=renderer.getRenderTarget(),face=renderer.getActiveCubeFace(),mip=renderer.getActiveMipmapLevel();
 const background=scene.background,fog=scene.fog,clip=renderer.clippingPlanes;
 const auto=renderer.shadowMap.autoUpdate,needs=renderer.shadowMap.needsUpdate;
 return ()=>{
  visibility.forEach((visible,object)=>object.visible=visible);
  scene.background=background;scene.fog=fog;renderer.clippingPlanes=clip;
  renderer.setRenderTarget(target,face,mip);renderer.shadowMap.autoUpdate=auto;renderer.shadowMap.needsUpdate=needs;
 };
}
