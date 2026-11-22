/** Authored metres: northeast star arm, outside all existing attraction footprints. */
export const towerSite={x:60,z:-225,halfWidth:14,halfDepth:16,height:108,roof:96} as const;
export const towerLevels=[0,16,32,48,64,80,96] as const;
export const towerEntrance=[65,1.65,-206] as const;
export const towerCopy={
 en:{name:'The Sky Tower',elevator:'Elevator',floors:['Arrival Lobby','The Gallery','Living Lounge','Vertical Garden','Observation Library','Sky Deck','The Summit · Rooftop'],call:'Call elevator',enter:'Enter cabin',exit:'Exit',up:'Go up',down:'Go down',select:'Choose a floor',current:'Current floor',closing:'Doors closing',moving:'Travelling',opening:'Doors opening',arrived:'Arrived',secret:'Follow the amber seam · slide the shelf',exhibit:'Touch · set the installation in motion',stairs:'Stairs · all levels',clue:'A shelf without books. Light escapes along its edge.',view:'Observation deck',return:'Return to the lobby to use guided navigation'},
 de:{name:'Der Himmelsturm',elevator:'Aufzug',floors:['Ankunftshalle','Die Galerie','Wohnlounge','Vertikaler Garten','Aussichtsbibliothek','Aussichtsdeck','Der Gipfel · Dachterrasse'],call:'Aufzug rufen',enter:'Kabine betreten',exit:'Aussteigen',up:'Nach oben',down:'Nach unten',select:'Etage wählen',current:'Aktuelle Etage',closing:'Türen schließen',moving:'Unterwegs',opening:'Türen öffnen',arrived:'Angekommen',secret:'Der Bernsteinkante folgen · Regal verschieben',exhibit:'Berühren · Installation bewegen',stairs:'Treppe · alle Etagen',clue:'Ein Regal ohne Bücher. Licht fällt durch die Kante.',view:'Aussichtsdeck',return:'Für die geführte Navigation zur Lobby zurückkehren'},
 ru:{name:'Небесная башня',elevator:'Лифт',floors:['Вестибюль прибытия','Галерея','Гостиная','Вертикальный сад','Библиотека с видом','Смотровая площадка','Вершина · Крыша'],call:'Вызвать лифт',enter:'Войти в кабину',exit:'Выйти',up:'Наверх',down:'Вниз',select:'Выберите этаж',current:'Текущий этаж',closing:'Двери закрываются',moving:'В пути',opening:'Двери открываются',arrived:'Прибытие',secret:'Следуйте янтарному шву · сдвиньте стеллаж',exhibit:'Коснитесь · оживите инсталляцию',stairs:'Лестница · все этажи',clue:'Полка без книг. По краю пробивается свет.',view:'Смотровая площадка',return:'Вернитесь в вестибюль для навигации'}
};
export type TowerLocale=keyof typeof towerCopy;
export const towerLanguage=(locale:string):TowerLocale=>locale==='de'||locale==='ru'?locale:'en';
export function towerContains(x:number,z:number,margin=0){return Math.abs(x-60)<=14+margin&&Math.abs(z+225)<=16+margin;}
export function towerRoof(x:number,z:number){return Math.abs(x-60)<12.8&&Math.abs(z+225)<14.8&&x>55&&!(x<63&&z< -233)?96:undefined;}
export function towerFloor(y:number){return Math.max(0,Math.min(6,Math.round((y-1.65)/16)));}
export function towerDetailVisible(index:number,p:{x:number;y:number;z:number}){return Math.hypot(p.x-60,p.z+225)<85&&Math.abs(p.y-1.65-towerLevels[index]!)<24;}
/** Independent deterministic lift state; ownership starts only with an actual cabin passenger. */
export function createTowerLift(){
 let y=0,target=0,phase:'idle'|'closing'|'moving'|'opening'='idle',age=0,passenger=false,door=1,disposed=false;
 return {get y(){return y;},get target(){return target;},get phase(){return phase;},get door(){return door;},get ownsPassenger(){return passenger&&phase!=='idle';},
 request(level:number,inside:boolean){if(disposed||phase!=='idle'||!Number.isInteger(level)||level<0||level>=towerLevels.length)return false;target=level;if(y===towerLevels[level])return true;passenger=inside;phase='closing';age=0;return true;},
 update(dt:number){if(disposed)return;dt=Number.isFinite(dt)?Math.max(0,Math.min(.05,dt)):0;age+=dt;
 if(phase==='closing'){door=Math.max(0,1-age/1.1);if(age>=1.1){phase='moving';age=0;}}
 else if(phase==='moving'){const dest=towerLevels[target]!,d=dest-y;y+=Math.sign(d)*Math.min(Math.abs(d),dt*Math.min(10,Math.max(1.2,Math.abs(d)*1.7)));if(Math.abs(dest-y)<.001){y=dest;phase='opening';age=0;}}
 else if(phase==='opening'){door=Math.min(1,age/1.1);if(age>=1.1){door=1;phase='idle';passenger=false;}}
 },dispose(){disposed=true;passenger=false;phase='idle';}};
}
/** Two 8m flights per 16m level. Wide end landings connect lanes and rooms. */
export function towerWalkingHeight(x:number,z:number,previousEye:number){
 const localX=x-60,localZ=z+225,old=previousEye-1.65;
 if(localX> -5.5)return towerLevels[towerFloor(previousEye)]!;
 if(Math.abs(localZ)>=12){const landing=localZ>0?Math.round(old/16)*16:Math.round((old-8)/16)*16+8;return Math.max(0,Math.min(96,landing));}
 const rise=localX< -10?(12-localZ)/3:(localZ+12)/3;
 const base=Math.round((old-rise-(localX< -10?0:8))/16)*16;
 return Math.max(0,Math.min(96,base+rise+(localX< -10?0:8)));
}
