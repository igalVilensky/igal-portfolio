export interface FamilyFact {name:string;age:number;role:string;gender:string;height:number;occupation?:string;facts?:string;education?:string}
export const familyKnowledge:Record<string,FamilyFact>;
export const familyPersonality:Record<string,string>;
export function familyContext(id:string,question?:string):string;
export function familyAnswer(id:string,question:string,locale:string):string|null;
