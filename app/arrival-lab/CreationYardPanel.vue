<script setup lang="ts">
import {pieceTypes,pieceColors,pieceLimit,type PieceType} from './builder-model';
import {expansionCopy} from './lagoon-copy';
const props=defineProps<{locale:string;count:number;saved:boolean;valid:boolean;selected:boolean;type:PieceType;color:string;canUndo:boolean;selecting:boolean;moving:boolean}>();
const emit=defineEmits<{close:[];cancel:[];aim:[];select:[];choose:[type:PieceType];color:[color:string];rotate:[];move:[];remove:[];undo:[];reset:[];place:[]}>();
const c=computed(()=>expansionCopy[props.locale==='de'||props.locale==='ru'?props.locale:'en']);
const confirming=ref(false);
const selectLabel=computed(()=>({en:'Select piece',de:'Bauteil auswählen',ru:'Выбрать деталь'}[props.locale]||'Select piece'));
const icons={cube:'▣',block:'▬',cylinder:'▥',sphere:'●',ramp:'◩',platform:'▱',wall:'▤'};
</script>
<template>
 <section class="creation-dock" :aria-label="c.yard" @keydown.esc.prevent.stop="emit('cancel')" @keydown.stop @pointerdown.stop @pointerup.stop @click.stop @focusin="()=>{if(document.pointerLockElement)document.exitPointerLock()}">
  <header><button class="creation-aim" @click="emit('aim')">{{({en:'Aim · Esc',de:'Zielen · Esc',ru:'Прицел · Esc'} as Record<string,string>)[locale]||'Aim · Esc'}}</button><strong>{{c.yard}}</strong><button @click="emit('close')">{{c.exit}} ×</button></header>

  <div class="creation-shapes"><button v-for="p in pieceTypes" :key="p" :aria-pressed="type===p&&!selected" @click="emit('choose',p)"><b aria-hidden="true">{{icons[p]}}</b>{{c.shapes[p]}}</button></div>
  <div class="creation-colors"><button v-for="(v,i) in pieceColors" :key="v" :style="{background:v}" :aria-label="c.colors[i]" :title="c.colors[i]" :aria-pressed="color===v" @click="emit('color',v)"/></div>
  <p role="status">{{moving?c.move:selecting?selectLabel:selected?c.selected:c.newPiece}} · {{count}} / {{pieceLimit}} {{c.count}} · {{saved?c.saved:c.unsaved}}</p>
  <p class="creation-status" role="status">{{count>=pieceLimit&&!selected?c.limit:valid?c.ready:c.invalid}}</p>
  <div class="creation-actions"><button :aria-pressed="selecting" @click="emit('select')">{{selectLabel}}</button><button :disabled="!valid" @click="emit('place')">{{c.place}}</button><button @click="emit('rotate')">{{c.rotate}}</button><button :disabled="!selected" @click="emit('move')">{{c.move}}</button><button :disabled="!selected" @click="emit('remove')">{{c.remove}}</button><button :disabled="!canUndo" @click="emit('undo')">{{c.undo}}</button><button @click="confirming=true">{{c.reset}}</button></div>
  <div v-if="confirming" role="alertdialog" :aria-label="c.confirm"><p>{{c.confirm}}</p><button @click="emit('reset');confirming=false">{{c.resetConfirm}}</button><button @click="confirming=false">{{c.cancel}}</button></div>
 </section>
</template>
<style scoped>
.creation-dock{position:absolute;z-index:32;bottom:18px;left:50%;transform:translateX(-50%);width:min(650px,94vw);max-height:44vh;overflow:auto;background:#143c43f2;border:1px solid #8ac9bc;border-radius:18px;padding:16px;color:#eff6e7;font:16px/1.4 sans-serif;box-shadow:0 12px 50px #082e4660}.creation-dock header,.creation-actions,.creation-colors,.creation-shapes{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.creation-dock header{justify-content:space-between}.creation-dock p{margin:7px 0}.creation-dock button{font:inherit;cursor:pointer;padding:8px 10px;color:inherit;background:#28535a;border:1px solid #729c96;border-radius:9px;min-height:44px}.creation-dock button:disabled{opacity:.4;cursor:default}.creation-dock button[aria-pressed=true]{outline:2px solid #f2d48b;outline-offset:2px}.creation-shapes button{display:grid;justify-items:center;flex:1}.creation-shapes b{font-size:22px}.creation-colors{margin:12px 0}.creation-colors button{width:38px;border-radius:50%}.creation-actions button:first-child{background:#417c65}@media(max-width:650px){.creation-dock{padding:10px;bottom:10px;max-height:42vh}.creation-shapes{gap:5px}.creation-shapes button{font-size:12px;padding:5px}.creation-dock header strong{font-size:16px}}
@media(pointer:coarse){.creation-dock{top:max(70px,env(safe-area-inset-top));bottom:auto;max-height:42vh}.creation-aim{display:none}}
@media(pointer:coarse) and (max-height:500px){.creation-dock{top:10px;right:10px;left:auto;transform:none;width:calc(100vw - 270px);max-height:calc(100vh - 20px)}}
</style>
