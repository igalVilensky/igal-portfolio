export type EntityId='archivist'|'engineer'|'wanderer'|'igal'|'anastasia'|'amelia'|'nataniel'|'adriel';
export const entityIds:EntityId[];
export function resolveEntity(value:unknown):EntityId|undefined;
export function isFamily(id:string):boolean;
export function entityInstruction(id:string):string;
export const worldDestinations:{id:string;name:string;connections:string[]}[];
export const worldGuide:{id:string;type:'faq';label:string;href:string;keywords:string[];text:string};
export function entityKnowledge<T extends {type:string}>(id:string,retrieved:T[]):(T|typeof worldGuide)[];
export function familyBoundary(id:string,question:string,locale:string):string|null;
