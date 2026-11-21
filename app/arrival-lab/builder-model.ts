export const builderKey='arrival-creation-yard-v1';
export const pieceLimit=200;
export const pieceTypes=['cube','block','cylinder','sphere','ramp','platform','wall'] as const;
export type PieceType=typeof pieceTypes[number];
export const pieceColors=['#ed896a','#76cbb7','#789edf','#f0cb65','#b29add','#ece8d9'] as const;
export interface Piece {id:number;type:PieceType;x:number;y:number;z:number;rotation:number;color:string}
export const dimensions:Record<PieceType,readonly [number,number,number]>={cube:[1,1,1],block:[2,1,1],cylinder:[1,2,1],sphere:[1,1,1],ramp:[2,1,2],platform:[2,.5,2],wall:[2,2,.5]};
export function pieceSize(p:Pick<Piece,'type'|'rotation'>){const d=dimensions[p.type];return p.rotation%2?[d[2],d[1],d[0]]:d;}
export function pieceBounds(p:Piece){const [w,h,d]=pieceSize(p);return {minX:p.x-w/2,maxX:p.x+w/2,minY:p.y-h/2,maxY:p.y+h/2,minZ:p.z-d/2,maxZ:p.z+d/2};}
export function validPiece(p:unknown):p is Piece{if(!p||typeof p!=='object')return false;const v=p as Piece;return Number.isSafeInteger(v.id)&&v.id>0&&v.id<1e9&&pieceTypes.includes(v.type)&&pieceColors.includes(v.color as typeof pieceColors[number])&&[v.x,v.y,v.z,v.rotation].every(Number.isFinite)&&Number.isInteger(v.rotation)&&v.rotation>=0&&v.rotation<4&&[v.x,v.y,v.z].every(n=>Math.abs(n*4-Math.round(n*4))<.001);}
export function validPlacement(p:Piece,pieces:readonly Piece[],ignore=p.id){
 if(!validPiece(p)||pieces.filter(q=>q.id!==ignore).length>=pieceLimit)return false;
 const a=pieceBounds(p),e=.01;
 if(a.minX< -186||a.maxX> -146||a.minZ<116||a.maxZ>148||a.minY<0||a.maxY>10)return false;
 return !pieces.some(q=>{if(q.id===ignore)return false;const b=pieceBounds(q);return a.minX<b.maxX-e&&a.maxX>b.minX+e&&a.minY<b.maxY-e&&a.maxY>b.minY+e&&a.minZ<b.maxZ-e&&a.maxZ>b.minZ+e;});
}
export function parseCreation(raw:string|null):Piece[]{
 try {const data=JSON.parse(raw||'null');if(data?.version!==1||!Array.isArray(data.pieces))return [];const result:Piece[]=[];
 for(const p of data.pieces.slice(0,pieceLimit)){if(validPiece(p)&&!result.some(q=>q.id===p.id)&&validPlacement(p,result))result.push({...p});}return result;
 }catch{return [];}
}
export function createBuilderStore(initial:Piece[]=[],persist:(raw:string|null)=>void=()=>{}){
 let pieces=parseCreation(JSON.stringify({version:1,pieces:initial}));const undo:Piece[][]=[];let saved=true;
 function write(){try{persist(pieces.length?JSON.stringify({version:1,pieces}):null);saved=true;}catch{saved=false;}}
 function commit(next:Piece[]){undo.push(pieces.map(p=>({...p})));if(undo.length>40)undo.shift();pieces=next;write();}
 return {get pieces(){return pieces;},get saved(){return saved;},get canUndo(){return undo.length>0;},get nextId(){return Math.max(0,...pieces.map(p=>p.id))+1;},
 put(p:Piece){if(!validPlacement(p,pieces))return false;commit([...pieces.filter(q=>q.id!==p.id),{...p}]);return true;},
 remove(id:number){if(pieces.some(p=>p.id===id))commit(pieces.filter(p=>p.id!==id));},
 undo(){const prior=undo.pop();if(prior){pieces=prior;write();}},reset(){commit([]);}
 };
}

/** One targeting convention for free pointer, touch and Pointer Lock. */
export function builderPointer(x:number,y:number,rect:{left:number;top:number;width:number;height:number},locked:boolean){
 return locked?{x:0,y:0}:{x:(x-rect.left)/rect.width*2-1,y:1-(y-rect.top)/rect.height*2};
}
export function builderSessionActive(s:{guided:boolean;passenger:boolean;otherWorld:boolean}){return !s.guided&&!s.passenger&&!s.otherWorld;}
