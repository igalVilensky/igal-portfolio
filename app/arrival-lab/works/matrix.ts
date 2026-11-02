/** A local illustrative comparison, not product results or an AI recommendation.
 * Relationship verified in decision-matrix-ai/src/services/scoring.ts: Σ(weight × score).
 */
export const sampleScores = [[5,2,3],[2,5,4]] as const;
export const initialWeights=[3,3,3];
export function weightedResults(weights:readonly number[]){
 const safe=weights.map(n=>Math.max(1,Math.min(5,Math.round(n))));
 const maximum=safe.reduce((sum,n)=>sum+n*5,0);
 return sampleScores.map(scores=>{
  const contributions=scores.map((score,i)=>score*safe[i]!);
  const total=contributions.reduce((sum,n)=>sum+n,0);
  return {contributions,total,percent:Math.round(total/maximum*100)};
 });
}
