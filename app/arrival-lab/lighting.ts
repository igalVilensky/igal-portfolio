import * as T from 'three';

export function illuminate(scene: T.Scene) {
  const fill = new T.HemisphereLight(); scene.add(fill);
  const sun = new T.DirectionalLight();
  sun.position.set(-12, 56, -31); sun.target.position.set(8, 0, -8);
  sun.castShadow = true; sun.shadow.mapSize.set(1536, 1536);
  Object.assign(sun.shadow.camera, { left: -54, right: 54, top: 72, bottom: -60, near: 1, far: 160 });
  sun.shadow.bias = -.00015; sun.shadow.normalBias = .07;
  scene.add(sun, sun.target);
  const portal = new T.PointLight('', 40, 30, 2); portal.position.set(0, 6, -67); scene.add(portal);
  const atrium = new T.PointLight('', 250, 60, 2); atrium.position.set(0, 18, -96); scene.add(atrium);
  const bounce = new T.DirectionalLight(); bounce.position.set(14, 18, 22); scene.add(bounce);
  // Broad grazing pools reveal the shell and gallery; no emissive outline network.
  const grazes = [-7,-39,-64].map((z,i)=>{
    const light=new T.PointLight('#a5d7f2',180,55,1.5);light.position.set(i===1?20:-20,20,z);scene.add(light);return light;
  });
  function setTheme(dark:boolean) {
    const fog=dark?'#131d2b':'#d3d7d6';
    scene.background=new T.Color(fog);scene.fog=new T.FogExp2(fog,dark?.006:.0035);
    fill.color.set(dark?'#91aecb':'#e6edf1');fill.groundColor.set(dark?'#282337':'#b9ad98');fill.intensity=dark?.85:1.25;
    sun.color.set(dark?'#9abce5':'#fff0d4');sun.intensity=dark?1.25:2.6;
    bounce.color.set(dark?'#8c83b8':'#d5e6f4');bounce.intensity=dark?.45:.7;
    portal.color.set(dark?'#65d3f3':'#ffe6bc');atrium.color.set(dark?'#94a6f4':'#edf5ff');
    grazes.forEach(l=>{l.color.set(dark?'#80bfe6':'#fff1d8');l.intensity=dark?240:100;});
  }
  setTheme(false);
  return { portal, sun, setTheme, dispose() { sun.shadow.dispose(); } };
}
