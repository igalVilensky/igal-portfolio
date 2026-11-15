import * as T from 'three';
/** Perspective-correct aperture. The texture is sampled in screen space, not stretched UVs. */
export function createThresholdView(parent:T.Object3D,width:number,height:number){
 const target=new T.WebGLRenderTarget(640,640);target.texture.colorSpace=T.SRGBColorSpace;
 const material=new T.ShaderMaterial({uniforms:{view:{value:target.texture}},vertexShader:'varying vec4 projected;void main(){projected=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_Position=projected;gl_Position.z=max(gl_Position.z,-gl_Position.w+.00001);}',fragmentShader:'uniform sampler2D view;varying vec4 projected;void main(){gl_FragColor=texture2D(view,projected.xy/projected.w*.5+.5);\n#include <colorspace_fragment>\n}',side:T.DoubleSide,toneMapped:false});
 const geometry=new T.PlaneGeometry(width,height),mesh=new T.Mesh(geometry,material);mesh.position.set(0,height/2,-.015);mesh.userData.noCollision=true;parent.add(mesh);
 return {mesh,target,dispose(){mesh.removeFromParent();target.dispose();geometry.dispose();material.dispose();}};
}
