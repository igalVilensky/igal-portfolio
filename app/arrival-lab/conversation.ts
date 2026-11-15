import { computed, ref } from 'vue';
import type { PortfolioAgentRequest, PortfolioAgentResponse, PortfolioConversationMessage } from '~/types/portfolio-agent';
export type EntityId=NonNullable<PortfolioAgentRequest['entityId']>;
export const entityOrder:EntityId[]=['archivist','engineer','wanderer','igal','anastasia','amelia','nataniel','adriel'];
export const conversationCopy={
 en:{talk:'Talk',close:'Return to exploring',send:'Ask',placeholder:'Ask a question…',thinking:'Thinking…',retry:'Retry',applicationError:'The conversation request failed. Please retry.',error:'The AI service is unavailable. Please try again.',disclosure:'Fictional AI interpretation · not the real person',guide:'AI guide · answers grounded in public knowledge',sources:'Sources',you:'You',title:'The Intelligence Chamber',names:['The Archivist','The Engineer','The Wanderer','Igal','Anastasia','Amelia','Nataniel','Adriel'],roles:['Public knowledge · a life in context','Systems · code · considered decisions','Paths · places · discoveries','Projects and curious ideas','Architecture and exploration','Creativity and discoveries','Flags, bridges and discoveries','Colors, shapes and adventures'],questions:['Who is Igal?','How does Nuxt work?','Where can I explore?','What did Igal build?','What can we explore?','Any creative adventure ideas?','Where are the flags?','What colors can we find?']},
 de:{talk:'Sprechen',close:'Weiter erkunden',send:'Fragen',placeholder:'Stelle eine Frage…',thinking:'Denkt nach…',retry:'Erneut versuchen',applicationError:'Die Gesprächsanfrage ist fehlgeschlagen. Bitte erneut versuchen.',error:'Der KI-Dienst ist nicht verfügbar. Bitte versuche es erneut.',disclosure:'Fiktive KI-Interpretation · nicht die echte Person',guide:'KI-Guide · Antworten aus öffentlichem Wissen',sources:'Quellen',you:'Du',title:'Die Intelligenzkammer',names:['Der Archivar','Der Ingenieur','Der Wanderer','Igal','Anastasia','Amelia','Nataniel','Adriel'],roles:['Öffentliches Wissen · ein Lebensweg','Systeme · Code · bewusste Entscheidungen','Wege · Orte · Entdeckungen','Projekte und neugierige Ideen','Architektur und Erkundung','Kreativität und Entdeckungen','Flaggen, Brücken und Entdeckungen','Farben, Formen und Abenteuer'],questions:['Wer ist Igal?','Wie funktioniert Nuxt?','Was kann ich erkunden?','Was hat Igal entwickelt?','Was können wir erkunden?','Ideen für kreative Abenteuer?','Wo sind die Flaggen?','Welche Farben finden wir?']},
 ru:{talk:'Поговорить',close:'Вернуться к исследованию',send:'Спросить',placeholder:'Задайте вопрос…',thinking:'Размышляет…',retry:'Повторить',applicationError:'Ошибка запроса разговора. Повторите попытку.',error:'ИИ-сервис недоступно. Попробуйте ещё раз.',disclosure:'Вымышленная ИИ-интерпретация · не настоящий человек',guide:'ИИ-гид · ответы на основе публичных знаний',sources:'Источники',you:'Вы',title:'Палата разума',names:['Архивариус','Инженер','Странник','Игаль','Анастасия','Амелия','Натаниэль','Адриэль'],roles:['Публичные знания · жизненный путь','Системы · код · обдуманные решения','Пути · места · открытия','Проекты и любопытные идеи','Архитектура и исследование','Творчество и открытия','Флаги, мосты и открытия','Цвета, формы и приключения'],questions:['Кто такой Игаль?','Как работает Nuxt?','Что можно исследовать?','Что создал Игаль?','Что мы можем исследовать?','Идеи творческих приключений?','Где флаги?','Какие цвета мы найдём?']},
};
export interface EncounterMessage extends PortfolioConversationMessage { response?:PortfolioAgentResponse }
export function useWorldConversation(){
 const request=usePortfolioAgent();
 const active=ref<EntityId|null>(null),phase=ref<'listening'|'thinking'|'responding'>('listening');
 const histories=ref<Partial<Record<EntityId,EncounterMessage[]>>>({}),pendingById=ref<Partial<Record<EntityId,boolean>>>({}),error=ref<false|'provider'|'application'>(false);
 const pending=computed(()=>!!active.value&&!!pendingById.value[active.value]);
 let responseTimer:ReturnType<typeof setTimeout>|undefined,disposed=false;
 const messages=computed(()=>active.value?histories.value[active.value]||[]:[]);
 function open(id:EntityId){clearTimeout(responseTimer);active.value=id;phase.value=pendingById.value[id]?'thinking':'listening';error.value=false;}
 function close(){active.value=null;clearTimeout(responseTimer);phase.value='listening';}
 async function ask(question:string,locale:string){
  const id=active.value;if(!id||pending.value||!question.trim())return;
  pendingById.value[id]=true;error.value=false;phase.value='thinking';clearTimeout(responseTimer);
  const history=histories.value[id]||[];
  const conversation=history.slice(-6).map(({role,content})=>({role,content:content.slice(0,900)}));
  histories.value[id]=[...history,{role:'user' as const,content:question.trim().slice(0,500)}].slice(-12);
  try{
   const response=await request({entityId:id,question:question.trim().slice(0,500),locale:locale==='de'||locale==='ru'?locale:'en',mode:'conversational',conversation});
   if(disposed)return;
   histories.value[id]=[...(histories.value[id]||[]),{role:'assistant' as const,content:response.answer,response}].slice(-12);
   if(active.value===id){phase.value='responding';responseTimer=setTimeout(()=>{if(active.value===id)phase.value='listening';},Math.min(8000,Math.max(1800,response.answer.length*22)));}
  }catch(cause){
   // Keep failed turns out of follow-up history; retry resubmits the same question.
   histories.value[id]=history;
   const status=(cause as {statusCode?:number}).statusCode;
   if(import.meta.dev)console.error('World conversation request failed',{entityId:id,status,category:status===502||status===503?'provider':status?'application':'network'});
   if(active.value===id){error.value=status&&status!==502&&status!==503?'application':'provider';phase.value='listening';}
  }
  finally{pendingById.value[id]=false;}
 }
 onBeforeUnmount(()=>{clearTimeout(responseTimer);disposed=true;});
 return {active,phase,messages,pending,error,open,close,ask};
}
