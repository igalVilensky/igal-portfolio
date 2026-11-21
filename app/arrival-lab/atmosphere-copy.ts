export const atmosphereCopy={
 en:{name:'Atmosphere Engine',select:'Set atmosphere',states:['Calm','Storm','Aurora','Vortex']},
 de:{name:'Atmosphärenmaschine',select:'Atmosphäre wählen',states:['Ruhe','Sturm','Polarlicht','Wirbel']},
 ru:{name:'Двигатель атмосферы',select:'Выбрать атмосферу',states:['Штиль','Буря','Сияние','Вихрь']}
};
export const weatherModes=[
 {color:'#97c9c4',gather:0,orbit:0,lift:0,energy:.05},
 {color:'#8a9ebf',gather:1,orbit:0,lift:1,energy:.8},
 {color:'#86dfbb',gather:0,orbit:0,lift:1.7,energy:.35},
 {color:'#c1a1d4',gather:.3,orbit:1,lift:.5,energy:.65}
] as const;
