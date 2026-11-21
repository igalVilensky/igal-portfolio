/** Authoritative outdoor clock and weather. Seconds are supplied by Arrival's loop. */
export type Weather='auto'|'clear'|'cloudy'|'rain'|'storm'|'snow';
export type Period='auto'|'morning'|'midday'|'sunset'|'night';
export const hours={morning:8,midday:12,sunset:18,night:23};
export function createClimateState(){
 let hour=12,weather:Weather='auto',period:Period='auto',paused=false,wind=.35,age=0,wet=0,snow=0;
 const cycle:Exclude<Weather,'auto'>[]=['clear','cloudy','rain','clear','snow','cloudy','storm'];
 return {get hour(){return hour;},get weather(){return weather;},get period(){return period;},get paused(){return paused;},get wind(){return wind;},get wet(){return wet;},get snow(){return snow;},get actual(){return weather==='auto'?cycle[Math.floor(age/150)%cycle.length]!:weather;},
 setWeather(v:Weather){if(['auto','clear','cloudy','rain','storm','snow'].includes(v))weather=v;},
 setPeriod(v:Period){if(v==='auto'||v in hours){period=v;if(v!=='auto')hour=hours[v];}},setPaused(v:boolean){paused=v;},setWind(v:number){wind=Math.max(0,Math.min(1,Number.isFinite(v)?v:.35));},
 update(delta:number){const dt=Math.max(0,Math.min(Number.isFinite(delta)?delta:0,.1));age+=dt;if(period==='auto'&&!paused)hour=(hour+dt/45)%24;const actual=this.actual;wet=Math.max(0,Math.min(1,wet+dt*(actual==='rain'||actual==='storm'?.055:-.008)));snow=Math.max(0,Math.min(1,snow+dt*(actual==='snow'?.025:hour>6&&hour<20?-.006:-.001)));}
 };
}
export const climateCopy={
 en:{title:'Sky & weather',weather:'Weather',time:'Time of day',wind:'Wind',pause:'Pause clock',modes:['Automatic','Clear','Cloudy','Rain','Storm','Snow'],periods:['Automatic','Morning','Midday','Sunset','Night'],local:'Coast and Arctic keep their local climate.'},
 de:{title:'Himmel & Wetter',weather:'Wetter',time:'Tageszeit',wind:'Wind',pause:'Uhr anhalten',modes:['Automatisch','Klar','Bewölkt','Regen','Sturm','Schnee'],periods:['Automatisch','Morgen','Mittag','Sonnenuntergang','Nacht'],local:'Küste und Arktis behalten ihr lokales Klima.'},
 ru:{title:'Небо и погода',weather:'Погода',time:'Время суток',wind:'Ветер',pause:'Остановить часы',modes:['Автоматически','Ясно','Облачно','Дождь','Гроза','Снег'],periods:['Автоматически','Утро','Полдень','Закат','Ночь'],local:'На побережье и в Арктике сохраняется местный климат.'}
};
