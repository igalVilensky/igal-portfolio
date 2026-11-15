<script setup lang="ts">
import { conversationCopy,entityOrder,type EntityId,type EncounterMessage } from './conversation';
const props=defineProps<{entity:EntityId;locale:string;messages:EncounterMessage[];pending:boolean;error:false|'provider'|'application'}>();
const emit=defineEmits<{close:[];ask:[question:string]}>();
const copy=computed(()=>conversationCopy[props.locale==='de'||props.locale==='ru'?props.locale:'en']);
const index=computed(()=>entityOrder.indexOf(props.entity));
const family=computed(()=>index.value>=3);
const lastQuestion=ref('');
const question=ref(''),input=ref<HTMLInputElement>(),panel=ref<HTMLElement>(),log=ref<HTMLElement>();
function submit(){if(!question.value.trim()||props.pending)return;lastQuestion.value=question.value;emit('ask',question.value);question.value='';nextTick(()=>input.value?.focus());}
function key(event:KeyboardEvent){
 if(event.key==='Escape'){event.preventDefault();emit('close');}
 if(event.key==='Tab'){
  const nodes=panel.value?.querySelectorAll<HTMLElement>('button:not(:disabled),input,a[href]');if(!nodes?.length)return;
  const first=nodes[0]!,last=nodes[nodes.length-1]!;
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 }
}
onMounted(()=>nextTick(()=>input.value?.focus()));
watch(()=>props.messages.length,()=>nextTick(()=>{log.value?.scrollTo({top:log.value.scrollHeight,behavior:'smooth'});}));
</script>
<template>
 <section ref="panel" class="entity-conversation" :class="{'entity-conversation-family':family}" role="dialog" aria-modal="true" aria-labelledby="encounter-title" @keydown.stop="key" @pointerdown.stop>
  <header><div><span class="encounter-eyebrow">{{ family ? copy.talk : copy.title }}</span><h2 id="encounter-title">{{ copy.names[index] }}</h2><p>{{ copy.roles[index] }}</p></div><button type="button" class="encounter-close" :aria-label="copy.close" @click="emit('close')">×</button></header>
  <p class="encounter-disclosure">{{ family?copy.disclosure:copy.guide }}</p>
  <div ref="log" class="encounter-log" role="log" aria-live="polite" :aria-busy="pending" tabindex="0">
   <button v-if="!messages.length" class="encounter-suggestion" @click="question=copy.questions[index]!;input?.focus()">{{ copy.questions[index] }} ↗</button>
   <article v-for="(message,i) in messages" :key="i" :class="message.role"><span>{{ message.role==='user'?copy.you:copy.names[index] }}</span><p>{{ message.content }}</p><div v-if="message.response?.sources.length" class="encounter-sources"><span>{{ copy.sources }}</span><template v-for="source in message.response.sources" :key="source.id"><a v-if="source.href" :href="source.href" target="_blank" rel="noopener">{{ source.label }} ↗</a><span v-else>{{ source.label }}</span></template></div></article>
   <p v-if="pending" class="encounter-thinking" role="status">{{ copy.thinking }}</p>
   <div v-if="error" role="alert"><p>{{ error==='application'?copy.applicationError:copy.error }}</p><button type="button" :disabled="pending" @click="emit('ask',lastQuestion)">{{ copy.retry }}</button></div>
  </div>
  <form @submit.prevent="submit"><input ref="input" v-model="question" :aria-label="copy.placeholder" :placeholder="copy.placeholder" maxlength="500" autocomplete="off"><button :disabled="pending||!question.trim()" type="submit">{{ copy.send }} ↗</button></form>
  <button type="button" class="encounter-return" @click="emit('close')">← {{ copy.close }} <kbd>Esc</kbd></button>
 </section>
</template>
<style scoped>
.entity-conversation{position:absolute;z-index:35;right:clamp(16px,4vw,64px);top:50%;transform:translateY(-50%);width:min(430px,calc(100% - 32px));max-height:min(720px,calc(100dvh - 36px));display:flex;flex-direction:column;color:#e9e4d5;background:linear-gradient(140deg,rgba(32,42,44,.98),rgba(15,24,29,.97));border:1px solid #a99d7959;border-top:2px solid #c7b58c;box-shadow:0 24px 100px #0007;backdrop-filter:blur(18px);padding:24px;font:14px/1.55 system-ui,sans-serif;border-radius:3px}
.entity-conversation-family{border-top-color:#b4c5ad;border-radius:18px;width:min(380px,calc(100% - 32px))}.entity-conversation header{display:flex;justify-content:space-between;gap:12px}.encounter-eyebrow{font-size:9px;text-transform:uppercase;letter-spacing:.22em;color:#c4b793}.entity-conversation h2{font-family:Georgia,serif;font-weight:400;font-size:30px;margin:6px 0}.entity-conversation header p{color:#afbcbb;font-size:12px;margin:0}.entity-conversation button{cursor:pointer;color:inherit;font:inherit}.encounter-close{background:none;border:1px solid #bcc2b844;border-radius:50%;width:32px;height:32px;font-size:24px!important;flex-shrink:0}.encounter-disclosure{font-size:10px;color:#b4bcb7;border-bottom:1px solid #d1d5c51c;padding-bottom:14px;margin:14px 0}.encounter-log{overflow-y:auto;overscroll-behavior:contain;min-height:80px;max-height:42dvh;flex:1}.encounter-log article{margin:0 0 22px}.encounter-log article>span{font-size:9px;text-transform:uppercase;letter-spacing:.15em;color:#cbbb94}.encounter-log article p{white-space:pre-wrap;margin:7px 0}.encounter-log .user{padding-left:16px;border-left:1px solid #8eaaaa55;color:#bacdcc}.encounter-sources{display:flex;gap:6px;flex-wrap:wrap;font-size:10px}.encounter-sources a,.encounter-sources>span{color:#b6c6bf}.encounter-sources a{border-bottom:1px solid #a3b3a455}.encounter-suggestion{background:#a8b7a513;border:1px solid #bcbfa333;padding:12px;text-align:left;width:100%}.encounter-thinking{color:#cfbd95;animation:breathe 1.8s ease-in-out infinite}.entity-conversation form{display:flex;gap:8px;padding-top:16px;margin-top:10px;border-top:1px solid #c4c4a32b}.entity-conversation input{width:0;min-width:0;flex:1;background:#0003;border:1px solid #b4bda14d;color:#fff;padding:12px;font:16px system-ui;border-radius:3px}.entity-conversation form button{background:#d0c3a3;color:#1b292c;padding:10px;border:0;border-radius:3px}.entity-conversation button:disabled{opacity:.4;cursor:default}.encounter-return{background:none;border:0;text-align:left;color:#aebbb5!important;margin-top:15px;font-size:11px!important;display:flex;justify-content:space-between}.entity-conversation :focus-visible{outline:2px solid #e5d6ad;outline-offset:3px}@keyframes breathe{50%{opacity:.5}}@media(prefers-reduced-motion:reduce){.encounter-thinking{animation:none}}@media(max-width:650px){.entity-conversation{top:auto;bottom:12px;right:12px;width:calc(100% - 24px);transform:none;padding:18px;max-height:calc(100dvh - 24px)}.entity-conversation h2{font-size:25px}.encounter-log{max-height:35dvh}}@media(max-height:540px){.entity-conversation{top:8px;bottom:8px;transform:none;max-height:calc(100dvh - 16px)}.encounter-disclosure{margin:6px 0;padding-bottom:6px}.encounter-log{max-height:none}.entity-conversation h2{font-size:23px;margin:2px 0}}
</style>
