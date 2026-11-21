import * as T from 'three';
import { atmosphereCopy, weatherModes } from './atmosphere-copy';
import { atmosphereSpace } from './spaces';
import { matterVertexShader, matterFragmentShader } from './atmosphere-materials';
/** Finite procedural matter; shared scene, no postprocessing or independent clock. */
export function createAtmosphere(scene: T.Scene, solids: T.Mesh[]) {
    const root = new T.Group();
    root.name = 'living-atmosphere';
    scene.add(root);
    const geometries: T.BufferGeometry[] = [], materials: T.Material[] = [];
    const stone = new T.MeshStandardMaterial({ color: '#344249', roughness: .86 });
    const frame = new T.MeshStandardMaterial({ color: '#536d70', metalness: .25, roughness: .55 });
    const inlay = new T.MeshBasicMaterial({ color: '#dfbe82' });
    materials.push(stone, frame, inlay);
    function box(w: number, h: number, d: number, x: number, y: number, z: number, m: T.Material = stone) {
        const g = new T.BoxGeometry(w, h, d);
        geometries.push(g);
        const mesh = new T.Mesh(g, m);
        mesh.position.set(x, y, z);
        mesh.userData.room = 'atmosphere';
        root.add(mesh);
        solids.push(mesh);
        return mesh;
    }
    box(24, 1, 28, -10, -.5, 40);
    box(4, 1, 4, -24, -.5, 29);
    box(24, 12, .5, -10, 6, 26);
    box(24, 12, .5, -10, 6, 54);
    box(.5, 12, 28, 2, 6, 40);
    box(.5, 12, 1, -22, 6, 26.5);
    box(.5, 12, 23, -22, 6, 42.5);
    box(.5, 7, 4, -22, 8.5, 29);
    box(4, 5, .35, -24, 2.5, 27, frame);
    box(4, 5, .35, -24, 2.5, 31, frame);
    box(4, .4, 4, -24, 5.2, 29, frame);
    box(24, .5, 28, -10, 12, 40);
    for (let z = 27; z < 54; z += 4) {
        box(23, .35, .18, -10, 11.45, z, frame);
        box(.18, 10, .35, 1.6, 5, z, frame);
    }
    for (const z of [32, 42, 51]) {
        box(.12, 5, 4, 1.68, 4, z, frame);
        box(.05, .07, 3.7, 1.58, 6.6, z, inlay);
    }
    // Low observation ledge: clearly solid, outside the circulation path.
    box(1.5, .5, 18, .8, .25, 42, frame);
    for (const x of [-19, -10, -1])
        box(.035, .025, 23, x, .015, 40, inlay);
    const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : undefined;
    const ctx = canvas?.getContext('2d');
    let texture: T.CanvasTexture | undefined;
    if (canvas && ctx) {
        canvas.width = 768;
        canvas.height = 128;
        texture = new T.CanvasTexture(canvas);
        texture.colorSpace = T.SRGBColorSpace;
        const g = new T.PlaneGeometry(3, .5), m = new T.MeshBasicMaterial({ map: texture });
        geometries.push(g);
        materials.push(m);
        const plaque = new T.Mesh(g, m);
        plaque.position.set(-25.6, 3.5, 29);
        plaque.rotation.y = -Math.PI / 2;
        root.add(plaque);
    }
    const controlLabels:{canvas:HTMLCanvasElement;texture:T.CanvasTexture;index:number}[]=[];
    function setLocale(locale: string) {
        const c=atmosphereCopy[locale==='de'||locale==='ru'?locale:'en'];
        for(const label of controlLabels){const cx=label.canvas.getContext('2d')!;cx.fillStyle='#243338';cx.fillRect(0,0,512,128);cx.fillStyle='#e5dfc8';cx.font='40px sans-serif';cx.textAlign='center';cx.fillText(c.states[label.index]!,256,80);label.texture.needsUpdate=true;} if (!canvas || !ctx)
        return; ctx.fillStyle = '#344b50'; ctx.fillRect(0, 0, 768, 128); ctx.fillStyle = '#e9dec4'; ctx.font = '34px sans-serif'; ctx.fillText(atmosphereSpace.names[locale as 'en'] || atmosphereSpace.names.en, 24, 78); texture!.needsUpdate = true; }
    setLocale('en');
    const light = new T.PointLight('#bce9dd', 110, 33, 1.3);
    light.position.set(-11, 7, 39);
    root.add(light);
    const warm = new T.PointLight('#ffda9b', 65, 22, 1.3);
    warm.position.set(-5, 5, 48);
    root.add(warm);
    const mobile = matchMedia('(pointer: coarse)').matches;
    const sphere = new T.SphereGeometry(1, mobile ? 16 : 24, mobile ? 12 : 18);
    geometries.push(sphere);
    const homes = [[-13, 3.3, 37], [-6, 4.7, 45], [-17, 5.4, 48]];
    const forms = homes.map((home, i) => {
        const group = new T.Group();
        group.position.fromArray(home);
        root.add(group);
        const lobes: {
            mesh: T.Mesh;
            home: T.Vector3;
        }[] = [];
        const mat = new T.ShaderMaterial({ vertexShader: matterVertexShader, fragmentShader: matterFragmentShader, uniforms: { time: { value: 0 }, energy: { value: 0 }, dark: { value: 0 }, membrane: { value: i === 1 ? 1 : 0 }, tint: { value: new T.Color(i === 1 ? '#e6bc86' : i === 2 ? '#a4c9cb' : '#63cbb8') } }, transparent: true, depthWrite: false, side: T.DoubleSide });
        materials.push(mat);
        const count = i === 0 ? (mobile ? 13 : 21) : i === 1 ? 3 : 7;
        for (let j = 0; j < count; j++) {
            const mesh = new T.Mesh(sphere, mat);
            const angle = j * 2.39996;
            const r = i === 0 ? Math.sqrt(j / count) * 2.3 : .7;
            mesh.position.set(Math.cos(angle) * r, Math.sin(j * 1.7) * .65, Math.sin(angle) * r * .7);
            mesh.scale.set(i === 1 ? 2.7 : 1.1 + (j % 3) * .2, i === 1 ? .5 : .75 + (j % 4) * .12, i === 1 ? 1.5 : 1.05);
            lobes.push({ mesh, home: mesh.position.clone() });
            mesh.rotation.set(j * .21, angle, j * .13);
            mesh.userData.atmosphere = i;
            mesh.userData.noCollision = true;
            group.add(mesh);
            solids.push(mesh);
        }
        return { group, mat, lobes, home: new T.Vector3().fromArray(home) };
    });
    const count = mobile ? 96 : 200, positions = new Float32Array(count * 3), base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const f = forms[i % 3]!;
        const a = i * 2.39996, r = 1.5 + (i % 19) / 19 * 3.7;
        base[i * 3] = f.home.x + Math.cos(a) * r;
        base[i * 3 + 1] = f.home.y + Math.sin(i * 1.37) * 2;
        base[i * 3 + 2] = f.home.z + Math.sin(a) * r;
    }
    const pg = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(positions, 3));
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++)
        seeds[i] = (i % 17) / 17;
    pg.setAttribute('seed', new T.BufferAttribute(seeds, 1));
    geometries.push(pg);
    const pm = new T.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { tint: { value: new T.Color('#9bd4c0') } }, vertexShader: `attribute float seed;varying float strength;void main(){strength=.55+seed*.45;vec4 p=modelViewMatrix*vec4(position,1.);gl_PointSize=min(8.,(28.+seed*20.)/max(1.,-p.z));gl_Position=projectionMatrix*p;}`, fragmentShader: `uniform vec3 tint;varying float strength;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;gl_FragColor=vec4(tint,(1.-d*d)*.65*strength);}` });
    materials.push(pm);
    root.add(new T.Points(pg, pm));
    const controls:T.MeshStandardMaterial[]=[];
    for(let i=0;i<4;i++){
        const x=-18+i*4,z=33;
        box(.7,1,.7,x,.5,z,frame);
        const material=new T.MeshStandardMaterial({color:weatherModes[i]!.color,emissive:weatherModes[i]!.color,emissiveIntensity:.25,metalness:.5,roughness:.4});materials.push(material);controls.push(material);
        const g=new T.OctahedronGeometry(.43);geometries.push(g);const selector=new T.Mesh(g,material);selector.position.set(x,1.4,z);selector.userData={atmosphere:i,noCollision:true};root.add(selector);solids.push(selector);
        if(typeof document!=='undefined'){
            const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
            const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;
            const g=new T.PlaneGeometry(2.5,.625),m=new T.MeshBasicMaterial({map:tex,side:T.DoubleSide});geometries.push(g);materials.push(m);
            const plaque=new T.Mesh(g,m);plaque.position.set(x,2.2,z);plaque.rotation.y=Math.PI;root.add(plaque);controlLabels.push({canvas,texture:tex,index:i});
        }
    }
    // Elevated mineral frames define the experimental volume without blocking circulation.
    for(const x of [-19,-2]){box(.3,7,.4,x,3.5,46,frame);box(.05,6,.06,x,3.5,45.76,inlay);}
    box(17,.3,.4,-10.5,7,46,frame);
    const bands:T.Mesh[]=[];
    const bandGeometry=new T.TorusGeometry(4,.045,4,64);geometries.push(bandGeometry);
    const bandMaterial=new T.MeshBasicMaterial({color:'#86dfbb',transparent:true,opacity:0,depthWrite:false});materials.push(bandMaterial);
    for(let i=0;i<3;i++){const band=new T.Mesh(bandGeometry,bandMaterial);band.position.set(-10,7+i*.6,44);band.rotation.set(Math.PI/2,.15*i,.18*i);root.add(band);bands.push(band);}
    const boltGeometry=new T.BufferGeometry().setFromPoints([new T.Vector3(-11,7,44),new T.Vector3(-10,6,44),new T.Vector3(-10.5,5.5,44),new T.Vector3(-9.8,4.5,44)]);geometries.push(boltGeometry);
    const boltMaterial=new T.LineBasicMaterial({color:'#d4e7ff'});materials.push(boltMaterial);const bolt=new T.Line(boltGeometry,boltMaterial);root.add(bolt);bolt.visible=false;
    let clock=0,mode=0,gather=0,orbit=0,lift=0,energy=.05,stormAge=0;
    const tint=new T.Color(weatherModes[0].color),targetColor=new T.Color();
    setLocale('en');
    return {
        setLocale,
        get mode(){return mode;},
        activate(index:number){if(Number.isInteger(index)&&index>=0&&index<4){if(index!==mode)stormAge=0;mode=index;}},
        update(_now:number,delta:number,reduced:boolean,player:T.Vector3){
            const dt=Math.min(.05,Math.max(0,delta)),blend=1-Math.exp(-dt*3),target=weatherModes[mode]!;
            if(!reduced)clock+=dt;
            gather=T.MathUtils.lerp(gather,target.gather,blend);orbit=T.MathUtils.lerp(orbit,target.orbit,blend);lift=T.MathUtils.lerp(lift,target.lift,blend);energy=T.MathUtils.lerp(energy,target.energy,blend);
            targetColor.set(target.color);tint.lerp(targetColor,blend);light.color.copy(tint);light.intensity=90+energy*35;warm.intensity=T.MathUtils.lerp(warm.intensity,mode===0?45:12,blend);
            if(mode===1)stormAge+=dt;else stormAge=0;
            // Local geometry only: a single brief discharge no more than once per eight seconds.
            bolt.visible=!reduced&&mode===1&&stormAge>2&&stormAge%8<.12;
            for(let i=0;i<forms.length;i++){
                const f=forms[i]!,angle=(reduced?i*2.094:clock*.35+i*2.094);
                const x=T.MathUtils.lerp(f.home.x,-10+(f.home.x+10)*.35,gather),z=T.MathUtils.lerp(f.home.z,44+(f.home.z-44)*.35,gather);
                f.group.position.set(T.MathUtils.lerp(x,-10+Math.cos(angle)*5,orbit),f.home.y+lift+(reduced?0:Math.sin(clock*.4+i)*.2),T.MathUtils.lerp(z,44+Math.sin(angle)*5,orbit));
                f.group.rotation.y=reduced?0:clock*(.03+orbit*.18);
                f.group.scale.set(1+gather*.3,1+orbit*.5,1+gather*.3);
                f.mat.uniforms.time!.value=clock;f.mat.uniforms.energy!.value=energy;f.mat.uniforms.tint!.value.copy(tint);
            }
            bandMaterial.opacity=T.MathUtils.lerp(bandMaterial.opacity,mode===2||mode===3?.8:0,blend);
            bands.forEach((band,i)=>{band.visible=bandMaterial.opacity>.005;band.scale.set(1+i*.15,mode===2?.45+i*.12:1,1);band.rotation.z=reduced?i*.2:Math.sin(clock*.3+i)*.2;});
            bandMaterial.color.copy(tint);
            controls.forEach((m,i)=>m.emissiveIntensity=i===mode?1.2:.2);
            for(let i=0;i<count;i++){
                const k=i*3,a=i*2.39996+(reduced?0:clock*.4*orbit),r=2+(i%19)/19*5;
                positions[k]=T.MathUtils.lerp(base[k]!,-10+Math.cos(a)*r,orbit);
                positions[k+1]=base[k+1]!+lift+Math.sin(i)*orbit*1.5;
                positions[k+2]=T.MathUtils.lerp(base[k+2]!,44+Math.sin(a)*r,orbit);
            }
            pm.uniforms.tint!.value.copy(tint);pg.attributes.position!.needsUpdate=true;
            return player.x>-29&&player.x<4&&player.z>24&&player.z<56;
        },
        setTheme(dark:boolean){stone.color.set(dark?'#26333b':'#344249');frame.color.set(dark?'#647c7c':'#536d70');forms.forEach(f=>f.mat.uniforms.dark!.value=dark?1:0);},
        dispose(){texture?.dispose();controlLabels.forEach(l=>l.texture.dispose());root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},
    };
}
