/** Soft density layers and a contrasting thin membrane, without postprocessing. */
export const matterVertexShader = `varying vec3 vN; varying vec3 vP; uniform float time; uniform float energy;
 void main(){vec3 p=position;float n=sin(p.x*4.1+time*.37)*sin(p.y*3.3-time*.23)*cos(p.z*4.7+time*.19);p*=1.+n*(.12+energy*.14);vN=normalize(normalMatrix*normal);vP=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
export const matterFragmentShader = `varying vec3 vN;varying vec3 vP;uniform vec3 tint;uniform float energy;uniform float dark;uniform float membrane;
 void main(){float rim=pow(1.-abs(vN.z),1.7);float veins=.5+.5*sin(vP.y*12.+sin(vP.x*7.)+vP.z*5.);float density=pow(abs(vN.z),1.6);float grain=.65+.35*sin(vP.x*8.+sin(vP.y*9.))*sin(vP.z*7.+vP.y*4.);float a=mix(density*.16*grain,.035+rim*.16,membrane);vec3 c=tint*(.88+dark*.22+rim*.12+energy*.2);gl_FragColor=vec4(c,a);}`;
