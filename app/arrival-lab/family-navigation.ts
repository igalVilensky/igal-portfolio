/** Auditable circulation graph. No independent worlds, roofs or arbitrary coordinates. */
export const familyNodes = [
 [70,6],[82,6],[96,6],[73,32],[94,32],
 [70,19],[82,19],[96,19],[73,19],[94,19],
 [62,19],[56,19],[56,17],[35,17],[35,19],[20,19],[5,19],
 [-20,19],[-28,19],[-32,19],[-48,19],[-57,19],[-32,24],[-32,27],[-48,24],[-48,28],[-48,14],[-48,10],[46,17],[78,23.15],[91,23.15],[-32,31.5],[79.15,6],[93,7],[-35,27],[-35,31.5],[5,8],
 [12,19],[12,38],[65,50],[35,50],[35,62],[12,62],[-35,62],[-35,90],[12,115],[35,90],[65,58],
 [80,20.5],[84,20.5],[73,21],[94,21],
 [-58,92],[-82,62],[-84.45,60],[-45,72],[-82,72],
] as const;
export const familyEdges = [[0,5],[1,6],[2,7],[3,8],[4,9],[5,8],[8,6],[6,9],[9,7],[5,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[19,22],[22,23],[20,24],[24,25],[20,26],[26,27],[12,28],[5,29],[7,30],[23,34],[34,35],[35,31],[1,32],[2,33],[16,36],[16,37],[37,38],[38,42],[39,40],[40,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,41],[39,47],[6,48],[48,49],[49,9],[8,50],[50,48],[9,51],[51,49],[44,52],[43,55],[55,56],[56,53],[53,54]] as const;
export function familyRoute(from:number,to:number){
 return circulationRoute(from,to,familyEdges);
}

export type ActivitySpot={node:number;room:string;activity:'observing'|'sitting';facing:number;stay:number;owner?:string;seatHeight?:number;seatAnchor?:readonly [number,number,number];capacity:number};
/** Nodes remain approach positions. Seat anchors mark hip support near the front
 * of the existing cushions (18 cm behind the front edge), leaving knees and shins beyond the slab. */
export const familySpots:ActivitySpot[]=[
 {node:45,room:'cloud-whale-overlook',activity:'observing',facing:.43,stay:28,capacity:1},
 {node:52,room:'coaster',activity:'observing',facing:Math.PI,stay:8,capacity:1},
 {node:54,room:'skytube',activity:'observing',facing:Math.PI,stay:8,capacity:1},
 {node:48,room:'living-quarters',activity:'observing',facing:Math.PI/2,stay:16,capacity:1},
 {node:49,room:'living-quarters',activity:'observing',facing:-Math.PI/2,stay:18,capacity:1},
 {node:50,room:'living-quarters',activity:'observing',facing:1.2,stay:7,capacity:1},
 {node:51,room:'living-quarters',activity:'observing',facing:-1.2,stay:8,capacity:1},
 ...['igal','anastasia','amelia','nataniel','adriel'].map((owner,node)=>({node,owner,room:owner,activity:'observing' as const,facing:node<3?Math.PI:0,stay:20+node*4,capacity:1})),
 {node:6,room:'living-quarters',activity:'observing',facing:2.55,stay:17,capacity:1},
 {node:8,room:'living-quarters',activity:'observing',facing:1.8,stay:14,capacity:1},
 {node:36,room:'arrival',activity:'observing',facing:Math.PI,stay:24,capacity:1},
 {node:21,room:'work-wing',activity:'observing',facing:-Math.PI/2,stay:12,capacity:1},
 {node:16,room:'arrival',activity:'observing',facing:Math.PI,stay:18,capacity:1},
 {node:23,room:'commons',activity:'observing',facing:0,stay:24,capacity:1},
 {node:25,room:'ai-tools',activity:'observing',facing:0,stay:22,capacity:1},
 {node:27,room:'experiments',activity:'observing',facing:Math.PI,stay:20,capacity:1},
 {node:28,room:'little-explorer',activity:'observing',facing:Math.PI,stay:16,capacity:1},
 {node:29,room:'living-quarters',activity:'sitting',facing:Math.PI,seatHeight:.48,seatAnchor:[78,.48,23.68],stay:38,capacity:1},
 {node:30,room:'living-quarters',activity:'sitting',facing:Math.PI,seatHeight:.48,seatAnchor:[91,.48,23.68],stay:36,capacity:1},
 {node:31,room:'commons',activity:'sitting',facing:Math.PI,seatHeight:.51,seatAnchor:[-32,.51,32.205],stay:40,capacity:1},
 {node:32,room:'anastasia',owner:'anastasia',activity:'sitting',facing:Math.PI/2,seatHeight:.48,seatAnchor:[78.62,.48,6],stay:40,capacity:1},
 {node:33,room:'amelia',owner:'amelia',activity:'sitting',facing:Math.PI/2,seatHeight:.48,seatAnchor:[92.47,.48,7],stay:38,capacity:1},
 ...[39,40,42,43,44,46,47].map((node,i)=>({node,room:'origin',activity:'observing' as const,facing:i*.8,stay:18+i*3,capacity:1})),
];
/** Shared bounded breadth-first search for the established circulation graphs. */
export function circulationRoute(from:number,to:number,edges:readonly (readonly number[])[]){
 const queue=[from],previous=new Map<number,number>([[from,-1]]);
 for(let i=0;i<queue.length;i++){const current=queue[i]!;if(current===to)break;for(const [a,b] of edges){const next=a===current?b:b===current?a:undefined;if(next!==undefined&&!previous.has(next)){previous.set(next,current);queue.push(next);}}}
 if(!previous.has(to))return [];
 const route:number[]=[];for(let n=to;n!==from;n=previous.get(n)!){route.unshift(n);}return route;
}

/** Top of the existing Cloudbreaker boarding slab; other audited routes are ground level. */
export function familyGroundHeight(x:number,z:number){return x>=-68&&x<=-48&&z>=90&&z<=94?.18:0;}
