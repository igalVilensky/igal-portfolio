import * as T from 'three';
import {createClimateState} from './world-climate';
/** Camera-centred sky, bounded precipitation and sampled exposed surfaces. */
export function createOutdoorSky(scene:T.Scene,solids:T.Mesh[],sun:T.DirectionalLight,fill:T.HemisphereLight,bounce:T.DirectionalLight){
 const state=createClimateState(),root=new T.Group();root.name='Outdoor climate';scene.add(root);
 const gs:T.BufferGeometry[]=[],ms:T.Material[]=[];
 function mesh(g:T.BufferGeometry,m:T.Material){gs.push(g);ms.push(m);const o=new T.Mesh(g,m);root.add(o);return o;}
 const skyMaterial=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,fog:false,uniforms:{day:{value:1},cloud:{value:0},twilight:{value:0},clock:{value:0},sunDir:{value:new T.Vector3()}},vertexShader:`varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z=gl_Position.w*.99999;}`,fragmentShader:`varying vec3 v;uniform float day,cloud,clock,twilight;uniform vec3 sunDir;float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}void main(){vec3 d=normalize(v);float h=max(0.,d.y);vec3 c=mix(mix(vec3(.08,.12,.24),vec3(.48,.72,.85),day),mix(vec3(.008,.016,.065),vec3(.10,.37,.67),day),pow(h,.45));c=mix(c,vec3(.74,.34,.24),pow(1.-h,6.)*twilight*.45*(1.-cloud*.5));float s=max(0.,dot(d,sunDir));c+=vec3(1.,.69,.32)*pow(s,550.)*day*(1.-cloud*.9);c+=vec3(1.,.7,.4)*pow(s,18.)*.18*day;vec3 cell=floor(d*650.);float star=step(.9975,hash(cell))*pow(max(0.,1.-length(fract(d*650.)-.5)*2.),2.);float milky=pow(max(0.,1.-abs(d.x*.5+d.y*.2-d.z*.6)*4.),8.);c+=(star+milky*.035)*(1.-day)*(1.-cloud);float n=sin(d.x*18.+clock*.018)+sin(d.z*24.-clock*.012)+sin(d.x*38.+d.z*15.);float clouds=smoothstep(-.6,1.4,n)*smoothstep(.02,.3,d.y)*cloud;c=mix(c,mix(vec3(.09,.12,.18),vec3(.70,.73,.75),day),clouds*.9);gl_FragColor=vec4(c,1.);}`});
 const dome=mesh(new T.SphereGeometry(4000,32,20),skyMaterial);dome.renderOrder=-10;dome.frustumCulled=false;
 const moonMat=new T.MeshBasicMaterial({color:'#e1e7ef',fog:false});const moon=mesh(new T.SphereGeometry(28,20,12),moonMat);
 const rainMat=new T.PointsMaterial({color:'#bed8ea',size:.12,transparent:true,opacity:.7,depthWrite:false});ms.push(rainMat);
 const count=480,positions=new Float32Array(count*3),g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(positions,3));gs.push(g);const rain=new T.Points(g,rainMat);rain.frustumCulled=false;root.add(rain);
 const ray=new T.Raycaster(),down=new T.Vector3(0,-1,0),up=new T.Vector3();
 const bounds:{mesh:T.Mesh;box:T.Box3}[]=[];
 const fogColor=new T.Color(),fog=new T.FogExp2(fogColor,.0003);
 // Cache roof heights only when the camera moves to another precipitation cell.
 const heights=new Float32Array(count);let cellX=Infinity,cellZ=Infinity,clock=0,day=1,cloud=0,refresh=1,lastWeather='',lastPeriod='';
 const surfaces:T.Mesh[]=[];const puddleMat=new T.MeshStandardMaterial({color:'#829eac',roughness:.15,metalness:.3,transparent:true,opacity:0,depthWrite:false});const snowMat=new T.MeshStandardMaterial({color:'#eef5fa',roughness:1,transparent:true,opacity:0,depthWrite:false});ms.push(puddleMat,snowMat);
 const patch=new T.CircleGeometry(1,12);gs.push(patch);
 function roof(x:number,z:number){up.set(x,220,z);ray.set(up,down);return ray.intersectObjects(bounds.filter(b=>x>=b.box.min.x&&x<=b.box.max.x&&z>=b.box.min.z&&z<=b.box.max.z).map(b=>b.mesh),false).find(h=>!h.object.userData.horizonVehicle)?.point.y??-100;}
 // Fixed weather patches sit on exposed outdoor floor only; no indoor snow layer.
 scene.updateMatrixWorld(true);
 for(const mesh of solids)if(!mesh.userData.horizonVehicle){const box=new T.Box3().setFromObject(mesh),size=box.getSize(new T.Vector3());const surface=size.x>2&&size.z>2&&size.y<2;if((!mesh.userData.noCollision||surface)&&box.min.y<220&&box.max.y>-.3)bounds.push({mesh,box});}
 for(const [x,z] of [[32,55],[45,58],[60,48],[-40,55],[-55,62],[75,65],[92,49],[945,-705],[955,-710]] as [number,number][]){const y=roof(x,z);if(y<-.2||y>1)continue;for(const m of [puddleMat,snowMat]){const o=new T.Mesh(patch,m);o.rotation.x=-Math.PI/2;o.position.set(x,y+.035+(m===snowMat?.008:0),z);o.scale.set(2.5,1.4,1);root.add(o);surfaces.push(o);}}
 return {root,state,update(dt:number,p:T.Vector3,active:boolean,reduced:boolean){state.update(dt);root.visible=active;if(!active)return false;clock+=dt;refresh+=dt;
 const liveWeather=state.actual==='rain'||state.actual==='storm'||state.actual==='snow';
 const interval=reduced?.5:liveWeather?1/30:.1;
 if(refresh<interval&&lastWeather===state.actual&&lastPeriod===state.period)return false;
 dt=Math.min(.5,refresh);refresh=0;lastWeather=state.actual;lastPeriod=state.period;

 const desired=Math.max(.08,Math.min(1,(Math.sin((state.hour-6)/24*Math.PI*2)+.16)*1.1));const blend=1-Math.exp(-dt*1.4);day=T.MathUtils.lerp(day,desired,blend);const mode=state.actual;cloud=T.MathUtils.lerp(cloud,mode==='clear'?.05:mode==='cloudy'?.65:mode==='storm'?1:.8,blend);
 dome.position.copy(p);skyMaterial.uniforms.day!.value=day;skyMaterial.uniforms.twilight!.value=Math.max(0,1-Math.abs(day-.35)*3);skyMaterial.uniforms.cloud!.value=cloud;skyMaterial.uniforms.clock!.value=reduced?0:clock*(.2+state.wind*2);
 const a=(state.hour-6)/24*Math.PI*2;sun.position.set(Math.cos(a)*80,Math.max(16,Math.sin(a)*100),-45);skyMaterial.uniforms.sunDir!.value.copy(sun.position).normalize();sun.intensity=(.35+day*2.25)*(1-cloud*.7);sun.color.setRGB(1,.72+day*.24,.57+day*.3);fill.intensity=.8+day*.55;fill.color.set(day>.4?'#c4ddeb':'#829ecb');bounce.intensity=.4+day*.3;
 moon.position.set(p.x-900,p.y+650,p.z-1600);moon.visible=day<.45&&cloud<.85;moonMat.color.setScalar((1-day)*(1-cloud*.8));
 fogColor.setRGB(.06+day*.62,.09+day*.65,.17+day*.58);scene.background=fogColor;fog.color.copy(fogColor);fog.density=.0003+cloud*.0008;scene.fog=fog;
 const raining=mode==='rain'||mode==='storm'||mode==='snow';rain.visible=raining;
 if(raining){const cx=Math.floor(p.x/12)*12,cz=Math.floor(p.z/12)*12;if(cx!==cellX||cz!==cellZ){cellX=cx;cellZ=cz;for(let i=0;i<count;i++){const x=cx+((i*73)%97)/97*60-30,z=cz+((i*37)%89)/89*60-30;positions[i*3]=x;positions[i*3+2]=z;heights[i]=roof(x,z);}}
 rainMat.size=mode==='snow'?.18:.085;rainMat.opacity=mode==='storm'?.9:.65;
 for(let i=0;i<count;i++){const k=i*3,fall=(i*.71+clock*(mode==='snow'?1.4:mode==='storm'?24:17))%42;positions[k+1]=p.y+32-fall; // Hide below sampled roofs; precipitation remains outside even from indoors.
 if(positions[k+1]!<=heights[i]!+.2)positions[k+1]=-1000;positions[k]=cellX+((i*73)%97)/97*60-30+Math.sin(clock+i)*state.wind*.3;}
 g.attributes.position!.needsUpdate=true;}
 puddleMat.opacity=state.wet*.6;snowMat.opacity=state.snow*.96;surfaces.forEach(o=>o.visible=(o.material===snowMat?state.snow:state.wet)>.01);
 return true;},dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
