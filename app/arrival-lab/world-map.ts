import * as T from 'three';
import {horizonCopy} from './horizon-copy';
import {horizonExits} from './horizon-transit';
import {worldSpaces,type Point} from './spaces';
import {worksModules} from './works/registry';
import {skyStations} from './skytube';
import {navigationCopy,type NavigationLocale} from './navigation-copy';
export interface MapDestination {id:string;names:Record<NavigationLocale,string>;point:Point;lookAt:Point;arrival?:Point;kind:'room'|'station'|'door'|'project';}
const named=(key:keyof typeof navigationCopy.en)=>Object.fromEntries(Object.entries(navigationCopy).map(([l,c])=>[l,c[key]])) as Record<NavigationLocale,string>;
export const mapRooms=worldSpaces.filter(s=>s.id!=='loop-vault');
const horizonNames=(key:'outpost'|'express'|'return')=>Object.fromEntries(Object.entries(horizonCopy).map(([l,c])=>[l,c[key]])) as Record<NavigationLocale,string>;
export const mapDestinations:MapDestination[]=[
 {id:'horizon-terminal',names:horizonNames('express'),point:[-4,1.65,140],lookAt:[0,2,140],kind:'station'},
 {id:'horizon-outpost',names:horizonNames('outpost'),point:[950,1.65,-720],arrival:[-4,1.65,140],lookAt:[0,2,140],kind:'station'},
 {id:'horizon-return',names:horizonNames('return'),point:[926,1.65,-716],lookAt:[930,2,-720],kind:'station'},
 ...worldSpaces.filter(s=>!['loop-vault','skybridge'].includes(s.id)).map(s=>({id:s.id,names:s.names,point:s.anchor,lookAt:s.lookAt,arrival:['atmosphere','intelligence-chamber'].includes(s.id)?s.entry:undefined,kind:'room' as const})),
 ...worksModules.map(s=>({id:s.id,names:named(s.id as 'flowforge'|'matrix'|'archive'),point:s.destination,lookAt:s.lookAt,kind:'project' as const})),
 {id:'rooftop',names:named('rooftop'),point:[-39,16.05,50],lookAt:[-39,14.4,90],kind:'room'},
 {id:'sky-explorer',names:named('sky'),point:[-8,1.65,91],lookAt:[-8,2,89.8],kind:'station'},
 {id:'skytube',names:named('tube'),point:[skyStations.origin.point[0]-3,1.65,skyStations.origin.point[2]-3],lookAt:skyStations.origin.point,kind:'station'},
 {id:'coaster',names:named('coaster'),point:[-58,1.65,92],arrival:[-58,1.65,88],lookAt:[-53,2,96],kind:'station'},
 {id:'north',names:named('north'),point:[-12,1.65,-67],lookAt:[-12,1.65,-70],kind:'door'},
 {id:'israel',names:named('israel'),point:[12,1.65,-67],lookAt:[12,1.65,-70],kind:'door'},
 {id:'loop-vault',names:named('vault'),point:[249,1.65,43],lookAt:[249,2,40],kind:'door'}
];
/** Orthographic atlas projection in metres; no decorative marker offsets or clamping. */
export const atlasBounds={minX:-220,maxX:285,minZ:-135,maxZ:160};
export const starAtlasBounds={minX:-220,maxX:285,minZ:-315,maxZ:315};
export const horizonAtlasBounds={minX:-240,maxX:1040,minZ:-800,maxZ:340};
export function projectWorld(x:number,z:number,bounds=atlasBounds){return {x:(x-bounds.minX)/(bounds.maxX-bounds.minX)*100,y:(z-bounds.minZ)/(bounds.maxZ-bounds.minZ)*100};}
export function selectMapDestination(id:string){return mapDestinations.find(d=>d.id===id);}
export function destinationPoint(id:string,device?:T.Vector3){const d=selectMapDestination(id);if(!d)return;return id==='horizon-outpost'?horizonExits[0].clone():id==='sky-explorer'&&device?device.clone().add(new T.Vector3(0,0,2)):new T.Vector3(...(d.arrival||d.point));}
