/** Auditable circulation graph. No independent worlds, roofs or arbitrary coordinates. */
export const familyNodes = [
 [70,6],[82,6],[96,6],[73,32],[94,32],
 [70,19],[82,19],[96,19],[73,19],[94,19],
 [62,19],[56,19],[56,17],[35,17],[35,19],[20,19],[5,19],
] as const;
export const familyEdges = [[0,5],[1,6],[2,7],[3,8],[4,9],[5,8],[8,6],[6,9],[9,7],[5,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16]] as const;
export function familyRoute(from:number,to:number){
 const queue=[from],previous=new Map<number,number>([[from,-1]]);
 for(let i=0;i<queue.length;i++){const current=queue[i]!;if(current===to)break;for(const [a,b] of familyEdges){const next=a===current?b:b===current?a:undefined;if(next!==undefined&&!previous.has(next)){previous.set(next,current);queue.push(next);}}}
 if(!previous.has(to))return [];
 const route:number[]=[];for(let n=to;n!==from;n=previous.get(n)!){route.unshift(n);}return route;
}
