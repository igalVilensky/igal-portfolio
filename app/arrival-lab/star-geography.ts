/** Shared world-space geometry. Existing destinations retain their authored transforms. */
export type GroundPoint=readonly [number,number];
export const starDimensions={radiusX:175,radiusZ:340,innerRatio:1/Math.sqrt(3),rotation:0} as const;
// Alternating vertices of the union of two equilateral triangles, stretched along Z.
export const starBoundary:GroundPoint[]=Array.from({length:12},(_,i)=>{
 const a=i*Math.PI/6,r=i%2?starDimensions.innerRatio:1;
 return [Math.cos(a)*175*r,Math.sin(a)*340*r];
});
export const horizonCenter={x:950,z:-720};
export const horizonBoundary:GroundPoint[]=Array.from({length:8},(_,i)=>{
 const a=i*Math.PI/4;return [950+46*Math.cos(a),-720+36*Math.sin(a)];
});
export function containsGround(points:readonly GroundPoint[],x:number,z:number,margin=0){
 let inside=false;
 for(let i=0,j=points.length-1;i<points.length;j=i++){
  const a=points[i]!,b=points[j]!;
  if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
 }
 if(!inside||!margin)return inside;
 return points.every((a,i)=>{const b=points[(i+1)%points.length]!,dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz)>=margin;});
}
export const onHorizon=(x:number,z:number)=>containsGround(horizonBoundary,x,z,.6);
