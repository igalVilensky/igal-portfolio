import * as T from 'three';
export const presets = ['rocket', 'robot', 'house', 'planet'] as const;
export const bases = ['cube', 'sphere', 'capsule', 'cylinder'] as const;
export const addons = ['ears', 'antenna', 'cone', 'ring'] as const;
export const colors = ['#fa795f', '#66d8cb', '#ac92ed', '#ffd36b'] as const;
export type PrintDesign = { type: typeof presets[number] | 'custom'; base: typeof bases[number]; addon: typeof addons[number]; color: string };
export const defaultDesign: PrintDesign = { type: 'rocket', base: 'sphere', addon: 'ears', color: colors[0] };
export const storageKey = 'arrival-print-lab-v1';
export function validDesign(value: unknown): value is PrintDesign {
 const d = value as PrintDesign;
 return !!d && [...presets, 'custom'].includes(d.type) && bases.includes(d.base) && addons.includes(d.addon) && (colors as readonly string[]).includes(d.color);
}
export function readPrints(raw: string | null): { selected: PrintDesign; collection: PrintDesign[] } {
 try { const data = JSON.parse(raw || '{}'); return { selected: validDesign(data.selected) ? data.selected : {...defaultDesign}, collection: Array.isArray(data.collection) ? data.collection.filter(validDesign) : [] }; }
 catch { return { selected: {...defaultDesign}, collection: [] }; }
}
export function figurine(d: PrintDesign) {
 const root = new T.Group();root.userData.printDesign={...d};
 const primary = new T.MeshStandardMaterial({color:d.color, roughness:.4});
 const cream = new T.MeshStandardMaterial({color:'#fff2d8',roughness:.5});
 const ink = new T.MeshStandardMaterial({color:'#253850',roughness:.4});
 const part = (g:T.BufferGeometry,x:number,y:number,z:number,m=primary) => {const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;root.add(o);return o;};
 const ball=(r:number,x:number,y:number,z:number,m=primary)=>part(new T.SphereGeometry(r,20,12),x,y,z,m);
 const box=(w:number,h:number,l:number,x:number,y:number,z:number,m=primary)=>part(new T.BoxGeometry(w,h,l),x,y,z,m);
 if(d.type==='rocket') {part(new T.CylinderGeometry(.32,.4,1.15,24),0,.8,0);part(new T.ConeGeometry(.4,.6,24),0,1.67,0,cream);ball(.18,0,1,.34,ink);for(const x of [-.5,.5])part(new T.ConeGeometry(.24,.7,3),x,.35,0,cream);}
 else if(d.type==='robot'){box(.85,.8,.5,0,.7,0);box(.7,.5,.55,0,1.4,0,cream);for(const x of [-.22,.22]){box(.22,.35,.3,x,.15,0,ink);ball(.07,x,1.44,.29,ink);}for(const x of [-.6,.6])box(.22,.65,.25,x,.72,0);ball(.1,0,1.86,0);}
 else if(d.type==='house'){box(1.1,.85,.85,0,.43,0,cream);const roof=part(new T.ConeGeometry(.9,.7,4),0,1.19,0);roof.rotation.y=Math.PI/4;box(.25,.5,.04,0,.25,.45,ink);for(const x of [-.36,.36])box(.2,.22,.04,x,.58,.45);}
 else if(d.type==='planet'){ball(.58,0,.9,0);const ring=part(new T.TorusGeometry(.84,.09,8,40),0,.9,0,cream);ring.rotation.x=1.1;part(new T.CylinderGeometry(.4,.5,.12,24),0,.06,0,ink);part(new T.CylinderGeometry(.06,.06,.4,12),0,.3,0,cream);}
 else {if(d.base==='sphere')ball(.52,0,.65,0);else if(d.base==='cube')box(.95,.95,.95,0,.6,0);else if(d.base==='capsule')part(new T.CapsuleGeometry(.38,.55,6,16),0,.8,0);else part(new T.CylinderGeometry(.48,.48,1,24),0,.65,0);
 if(d.addon==='ears')for(const x of [-.34,.34])part(new T.ConeGeometry(.2,.6,16),x,1.4,0,cream);
 if(d.addon==='antenna'){part(new T.CylinderGeometry(.045,.045,.5,12),0,1.4,0,cream);ball(.17,0,1.7,0,cream);}
 if(d.addon==='cone')part(new T.ConeGeometry(.45,.65,24),0,1.4,0,cream);
 if(d.addon==='ring'){const ring=part(new T.TorusGeometry(.7,.08,8,32),0,.75,0,cream);ring.rotation.x=1.2;}
 for(const x of [-.18,.18])ball(.065,x,.82,.48,ink);
 }
 return root;
}
export function disposeObject(root:T.Object3D){const materials=new Set<T.Material>();root.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);}});materials.forEach(m=>m.dispose());root.removeFromParent();}
