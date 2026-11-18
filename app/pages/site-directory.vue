<script setup lang="ts">
import { directoryGroups, discoverPages, directoryDestination } from '~/utils/siteDirectory';

definePageMeta({ layout: false });
const { t, te } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
type Page = ReturnType<typeof discoverPages>[number];
const pages = computed(() => discoverPages(router.getRoutes()));
const query = ref('');
const needle = computed(() => query.value.trim().toLowerCase());
const active = ref('');
const selected = ref<Page | null>(null);
const values = ref<Record<string, string>>({});
const stage = ref<HTMLElement>();
const search = ref<HTMLInputElement>();
const inspector = ref<HTMLElement>();
let lastRow: HTMLElement | null = null;
let animation: Animation | undefined;
const label = (category: string) => te(`gateway.${category}`) ? t(`gateway.${category}`) : category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, c => c.toUpperCase());
const categories = computed(() => [...new Set(pages.value.map(p => p.category))].sort((a, b) => {
  const rank = (c: string) => directoryGroups.indexOf(c as typeof directoryGroups[number]);
  return (rank(a) < 0 ? 999 : rank(a)) - (rank(b) < 0 ? 999 : rank(b)) || a.localeCompare(b);
}));
const hue = (c: string) => Math.round((categories.value.indexOf(c) * 137.5 + 205) % 360);
const groups = computed(() => categories.value.map(category => {
  const all = pages.value.filter(p => p.category === category);
  return { category, all, pages: all.filter(p => !needle.value || [p.path, p.title, p.name].some(v => v.toLowerCase().includes(needle.value))) };
}).sort((a, b) => needle.value ? Number(!a.pages.length) - Number(!b.pages.length) : 0));
const count = computed(() => groups.value.reduce((sum, g) => sum + g.pages.length, 0));
const index = computed(() => Math.max(0, groups.value.findIndex(g => g.category === active.value)));
watch(groups, () => {
  if (!groups.value.some(g => g.category === active.value)) active.value = groups.value[0]?.category ?? '';
}, { immediate: true });
watch(needle, q => { if (q) active.value = groups.value[0]?.category ?? ''; });
const kind = (p: Page) => p.catchAll ? 'catchAll' : p.parameters ? 'parameters' : p.redirect ? 'redirect' : 'static';
const destination = computed(() => selected.value ? directoryDestination(selected.value, values.value) : null);
const segments = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  return parts.length ? parts.map((part, i) => ({ text: '/' + part, muted: i < parts.length - 1 })) : [{ text: '/', muted: false }];
};
const highlight = (text: string) => {
  if (!needle.value) return [{ text, hit: false }];
  const result: { text: string; hit: boolean }[] = [];
  let start = 0;
  for (;;) {
    const at = text.toLowerCase().indexOf(needle.value, start);
    if (at < 0) { result.push({ text: text.slice(start), hit: false }); break; }
    result.push({ text: text.slice(start, at), hit: false }, { text: text.slice(at, at + needle.value.length), hit: true });
    start = at + needle.value.length;
  }
  return result;
};
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function go(category: string) {
  if (selected.value) return;
  const focusInLayer = document.activeElement?.closest('.layer');
  active.value = category;
  if (focusInLayer) nextTick(() => stage.value?.querySelector<HTMLElement>('.layer.active .ttl')?.focus({ preventScroll: true }));
}
function step(delta: number) { const group = groups.value[index.value + delta]; if (group) go(group.category); }
function resultFocus() { stage.value?.querySelector<HTMLElement>('.layer.active .row')?.focus(); }
async function select(page: Page, event: MouseEvent) {
  lastRow = event.currentTarget as HTMLElement;
  const from = lastRow.getBoundingClientRect();
  selected.value = page;
  values.value = {};
  await nextTick();
  const el = inspector.value;
  if (!el) return;
  animation?.cancel();
  if (!reduced()) {
    const to = el.getBoundingClientRect();
    animation = el.animate([{ transform: `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${from.width / to.width},${Math.min(from.height / to.height, 1)})`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
  el.focus({ preventScroll: true });
}
function close() {
  animation?.cancel();
  selected.value = null;
  nextTick(() => (lastRow?.isConnected && !lastRow.closest('[inert]') ? lastRow : search.value)?.focus({ preventScroll: true }));
}
function searchKey(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.preventDefault(); query.value = ''; }
  if (e.key === 'ArrowDown') { e.preventDefault(); resultFocus(); }
  if (e.key === 'Enter') stage.value?.querySelector<HTMLButtonElement>('.layer.active .row')?.click();
}
function onKey(e: KeyboardEvent) {
  if (e.defaultPrevented) return;
  const target = e.target as HTMLElement;
  if (selected.value) {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') {
      const controls = Array.from(inspector.value?.querySelectorAll<HTMLElement>('button:not(:disabled), input, a[href]') ?? []);
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === inspector.value)) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || document.activeElement === inspector.value)) { e.preventDefault(); first?.focus(); }
    }
    return;
  }
  if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if ((e.key === '/' && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); search.value?.focus(); return; }
  if (e.key === 'Escape' && query.value) { query.value = ''; return; }
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (['ArrowRight', 'PageDown', '.', 'ArrowLeft', 'PageUp', ','].includes(e.key)) { e.preventDefault(); step(['ArrowRight', 'PageDown', '.'].includes(e.key) ? 1 : -1); }
  if (target.closest('.row') && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
    e.preventDefault();
    const rows = Array.from(stage.value?.querySelectorAll<HTMLElement>('.layer.active .row') ?? []);
    const next = rows[rows.indexOf(target.closest('.row') as HTMLElement) + (e.key === 'ArrowDown' ? 1 : -1)];
    (next ?? search.value)?.focus();
  }
}
let wheelAt = 0;
function wheel(e: WheelEvent) {
  if (selected.value || (e.target as HTMLElement).closest('.body, input, select, button') || e.ctrlKey || Math.abs(e.deltaY) < 8 || Math.abs(e.deltaX) > Math.abs(e.deltaY) || Date.now() - wheelAt < 420) return;
  wheelAt = Date.now(); step(e.deltaY > 0 ? 1 : -1);
}
function pointer(e: PointerEvent) {
  if (e.pointerType === 'touch' || reduced() || !stage.value) return;
  stage.value.style.setProperty('--px', `${(e.clientX / innerWidth - .5) * 80}px`);
  stage.value.style.setProperty('--py', `${(e.clientY / innerHeight - .5) * 40}px`);
  const layer = (e.target as HTMLElement).closest<HTMLElement>('.layer');
  if (layer) { const b = layer.getBoundingClientRect(); layer.style.setProperty('--mx', `${e.clientX - b.left}px`); layer.style.setProperty('--my', `${e.clientY - b.top}px`); }
}
onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); animation?.cancel(); });
useHead(() => ({ title: `${t('gateway.directory')} — Igal Vilensky`, meta: [{ name: 'description', content: t('gateway.directoryIntro') }], link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap' }] }));
</script>

<template>
  <main class="living-index" @pointermove="pointer">
    <h1 class="sr-only">{{ t('gateway.directory') }}</h1>
    <div id="stage" ref="stage" :class="{ insp: selected }" :style="{ '--hue': hue(active) }" @wheel.passive="wheel">
      <section v-for="(group, i) in groups" :key="group.category" class="layer" :class="{ active: i === index, past: i < index, nm: needle && !group.pages.length && count }" :style="{ '--h': hue(group.category), '--d': Math.max(i - index, 0), zIndex: groups.length - i }" :inert="i !== index || !!selected" :aria-hidden="i !== index" :aria-label="label(group.category)">
        <div class="lh">
          <h2><button type="button" class="ttl">{{ label(group.category) }}</button></h2>
          <span class="n">{{ needle ? `${group.pages.length} / ${group.all.length}` : `${group.all.length} ${t('gateway.routes')}` }}</span>
          <button type="button" class="step" aria-label="Previous layer" :disabled="index === 0" @click="step(-1)">‹</button>
          <button type="button" class="step" aria-label="Next layer" :disabled="index === groups.length - 1" @click="step(1)">›</button>
        </div>
        <div class="body">
          <ul>
            <li v-for="page in group.pages" :key="page.path">
              <button type="button" class="row" :aria-current="selected?.path === page.path" @click="select(page, $event)">
                <span class="p"><span v-for="(segment, si) in segments(page.path)" :key="si" :class="{ muted: segment.muted }"><template v-for="(part, k) in highlight(segment.text)" :key="k"><mark v-if="part.hit">{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></span></span>
                <span class="m"><span class="dot" :class="{ ring: page.status !== 'mainStatus' }" :style="{ '--c': page.status === 'mainStatus' ? '#7fd1a8' : page.status === 'experimental' ? '#e8c36a' : '#8aa0c4' }" aria-hidden="true" /><span><template v-for="(part, k) in highlight(page.title || page.name)" :key="k"><mark v-if="part.hit">{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></span><span>{{ t(`gateway.${page.status}`) }}</span><span v-if="kind(page) !== 'static'" class="k">{{ t(`gateway.${kind(page)}`) }}</span></span>
              </button>
            </li>
          </ul>
          <p v-if="!group.pages.length" class="none">No routes here match “{{ query }}”.</p>
        </div>
        <div class="ghost" aria-hidden="true">{{ group.pages.length }}</div>
      </section>
    </div>
    <nav id="rail" aria-label="Categories" :inert="!!selected"><button v-for="group in groups" :key="group.category" type="button" :class="{ z: !group.pages.length }" :style="{ '--h': hue(group.category) }" :aria-current="active === group.category" @click="go(group.category)">{{ label(group.category) }}<sup>{{ group.pages.length }}</sup></button></nav>
    <header id="top" :inert="!!selected"><NuxtLink :to="localePath('/')">{{ t('gateway.back') }}</NuxtLink><span>{{ groups.length }} layers, {{ pages.length }} {{ t('gateway.routes') }}</span></header>
    <label class="mobile-categories" :inert="!!selected"><span class="sr-only">Categories</span><select :value="active" @change="go(($event.target as HTMLSelectElement).value)"><option v-for="group in groups" :key="group.category" :value="group.category">{{ label(group.category) }} · {{ group.pages.length }}</option></select></label>
    <div id="dock" role="search" :inert="!!selected"><input ref="search" v-model="query" type="search" placeholder="Find a route, title or name" aria-label="Search routes" autocomplete="off" spellcheck="false" @keydown="searchKey"><span aria-live="polite">{{ needle ? `${count} / ${pages.length}` : `${pages.length} ${t('gateway.routes')}` }}</span><kbd aria-hidden="true">/</kbd></div>
    <Transition name="inspector">
      <aside v-if="selected" id="insp" ref="inspector" role="dialog" aria-modal="true" aria-labelledby="route-title" tabindex="-1" :style="{ '--h': hue(selected.category) }">
        <button type="button" class="x" aria-label="Close details" @click="close">Close</button>
        <h3 id="route-title">{{ selected.title || selected.name || selected.path }}</h3><div class="path">{{ selected.path }}</div>
        <dl><dt>Name</dt><dd>{{ selected.name || '—' }}</dd><dt>Layer</dt><dd>{{ label(selected.category) }}</dd><dt>Status</dt><dd>{{ t(`gateway.${selected.status}`) }}</dd><dt>Type</dt><dd>{{ t(`gateway.${kind(selected)}`) }}</dd><template v-if="selected.redirect"><dt>{{ t('gateway.redirect') }}</dt><dd>{{ selected.redirectDescription }}</dd></template><template v-if="selected.excluded"><dt>Visibility</dt><dd>{{ t('gateway.excluded') }}</dd></template></dl>
        <template v-if="!selected.catchAll"><label v-for="param in selected.parameterDetails" :key="param.name">{{ param.name }}{{ param.optional ? ' (optional)' : ' (required)' }}<input v-model="values[param.name]" :required="!param.optional" :placeholder="param.repeatable ? 'Values separated by /' : `Enter ${param.name}`" autocomplete="off"></label></template>
        <p v-if="selected.catchAll" class="note">This catch-all describes a pattern of URLs. There is no single page to open.</p>
        <template v-else><NuxtLink v-if="destination" class="go" :to="localePath(destination)" :prefetch="false">{{ t('gateway.open') }}</NuxtLink><button v-else type="button" class="go" disabled aria-disabled="true">{{ t('gateway.open') }}</button><p class="note">{{ destination ? `Opens ${destination}` : 'Provide valid required parameters to open this route.' }}</p></template>
      </aside>
    </Transition>
  </main>
</template>

<style scoped>

@property --hue{syntax:"<number>";inherits:true;initial-value:210}
.living-index{--ink:#f1e9d6;--dim:#8d93a0;--void:#090b0f;--focus:#ffd98a}
*{box-sizing:border-box}

.living-index{background:var(--void);color:var(--ink);font:14px/1.4 "Instrument Sans",system-ui,sans-serif}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;text-align:left;padding:0}
a{color:inherit}
:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
mark{background:var(--focus);color:#111;border-radius:2px}
#stage{position:fixed;inset:0;--hue:210;transition:--hue .8s;perspective:1200px;perspective-origin:calc(50% + var(--px,0px)) calc(30% + var(--py,0px));
 background:radial-gradient(ellipse 60% 45% at 50% 38%,hsl(var(--hue) 45% 22% / .55),transparent 70%),radial-gradient(ellipse 120% 80% at 50% 120%,hsl(var(--hue) 30% 14%),transparent 60%),var(--void)}
#stage::after{content:"";position:absolute;left:50%;top:0;width:2px;height:60%;background:linear-gradient(hsl(var(--hue) 70% 80% / .0),hsl(var(--hue) 70% 80% / .35),transparent);transform:translateX(-50%);pointer-events:none;filter:blur(1px)}
.layer{position:absolute;left:50%;top:170px;width:min(1080px,94vw);height:calc(100dvh - 266px);transform-origin:50% 0;
 --k:1;
 transform:translate3d(calc(-50% + var(--sx)),calc(var(--d)*-56px),calc(var(--d)*-240px));
 opacity:calc(max(0,1 - var(--d)*.3)*var(--k));filter:blur(calc(var(--d)*1.3px));
 transition:transform .6s cubic-bezier(.2,.8,.2,1),opacity .5s,filter .5s;
 display:flex;flex-direction:column;border-radius:3px 3px 0 0;
 background:linear-gradient(180deg,hsl(var(--h) 16% 17%),hsl(var(--h) 14% 9%) 70%);
 border-top:1px solid hsl(var(--h) 55% 72% / .75);box-shadow:0 -1px 40px hsl(var(--h) 60% 60% / .12),0 40px 80px #000a;overflow:hidden}
.layer.nm{--k:.3}
.layer.past{transform:translate3d(calc(-50% + var(--sx)),110px,520px);opacity:0;pointer-events:none}
.layer::before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,0%),hsl(var(--h) 60% 70% / .13),transparent 70%);pointer-events:none}
.lh{display:flex;align-items:center;gap:16px;padding:10px 24px 6px;position:relative;z-index:2}
.lh h2{margin:0;font:400 34px/1 "Instrument Serif",serif;letter-spacing:-.02em;flex:1}
.lh h2 button{color:hsl(var(--h) 55% 82%)}
.lh .n{font:12px "JetBrains Mono",monospace;color:var(--dim)}
.step{width:40px;height:40px;border:1px solid #ffffff26;border-radius:50%;display:grid;place-items:center;font-size:18px;text-align:center}
.step:hover{background:#ffffff14}
.step[disabled]{opacity:.25;cursor:default}
..living-index{position:relative;z-index:1;flex:1;overflow:auto;padding:14px 24px 30px;column-width:290px;column-gap:36px;scrollbar-width:thin;scrollbar-color:#ffffff30 transparent}
.ghost{position:absolute;right:20px;bottom:-30px;font:italic 400 200px/1 "Instrument Serif",serif;color:transparent;-webkit-text-stroke:1px hsl(var(--h) 40% 70% / .22);pointer-events:none;z-index:0}
.row{display:block;width:100%;break-inside:avoid;padding:10px 12px 10px 14px;margin:0 0 4px;border-left:2px solid hsl(var(--h) 30% 40% / .5);opacity:.78;transition:opacity .2s,background .2s,border-color .2s,transform .3s cubic-bezier(.2,.8,.2,1)}
.row:hover,.row:focus-visible{opacity:1;background:#ffffff0d;border-color:hsl(var(--h) 70% 75%);transform:translateX(6px)}
.row[aria-current=true]{opacity:1;background:hsl(var(--h) 40% 30% / .35);border-color:hsl(var(--h) 80% 80%)}
.row .p{font:500 15px "JetBrains Mono",monospace;overflow-wrap:anywhere}
.row .p i{font-style:normal;color:var(--dim)}
.row .m{display:flex;gap:10px;align-items:center;margin-top:3px;font-size:12px;color:var(--dim)}
.dot{width:7px;height:7px;border-radius:50%;background:var(--c);flex:none}
.dot.ring{background:none;border:1.5px solid var(--c)}
.k{color:hsl(var(--h) 60% 78%)}
.none{padding:40px 6px;color:var(--dim);column-span:all}
#rail{position:fixed;left:22px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:2px;z-index:5;max-height:70vh;overflow:auto}
#rail button{display:flex;gap:10px;align-items:center;padding:6px 8px;min-height:32px;color:var(--dim);font-size:13px}
#rail button::before{content:"";width:14px;height:1px;background:currentColor;transition:width .3s}
#rail button:hover{color:var(--ink)}
#rail button[aria-current=true]{color:hsl(var(--h) 60% 82%)}
#rail button[aria-current=true]::before{width:30px}
#rail button.z{opacity:.35}
#rail sup{font-size:10px}
#top{position:fixed;left:20px;right:20px;top:14px;display:flex;justify-content:space-between;z-index:6;font-size:13px;color:var(--dim)}
#top a{text-decoration:none;border-bottom:1px solid #ffffff30;padding:6px 0}
#top a:hover{color:var(--ink)}
#dock{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);width:min(600px,92vw);z-index:8;display:flex;align-items:center;gap:12px;background:#10141cf0;border:1px solid #ffffff26;border-radius:4px;padding:0 14px;box-shadow:0 10px 40px #000a}
#dock:focus-within{border-color:var(--focus)}
#dock input{flex:1;min-width:0;height:50px;background:none;border:0;color:var(--ink);font:15px "JetBrains Mono",monospace;outline:none}
#dock input::placeholder{color:#6d7482}
#dock span{font-size:12.5px;color:var(--dim);white-space:nowrap}
#dock kbd{font:11px "JetBrains Mono",monospace;border:1px solid #ffffff2a;border-radius:3px;padding:0 5px;color:var(--dim)}
#insp{position:fixed;right:28px;top:120px;width:340px;max-height:calc(100dvh - 210px);overflow:auto;z-index:9;padding:20px;background:hsl(var(--h) 22% 12% / .97);border:1px solid hsl(var(--h) 60% 72% / .6);border-radius:3px;box-shadow:0 30px 80px #000c}
#insp[hidden]{display:none}
#insp h3{margin:0;font:400 28px/1.05 "Instrument Serif",serif;padding-right:60px}
#insp .path{font:500 13px "JetBrains Mono",monospace;margin:8px 0 12px;color:hsl(var(--h) 70% 82%);overflow-wrap:anywhere}
#insp dl{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin:0 0 12px;font-size:13px}
#insp dt{color:var(--dim)}#insp dd{margin:0}
#insp label{display:grid;gap:3px;font-size:12px;color:var(--dim);margin-bottom:8px}
#insp input{background:#00000040;border:1px solid #ffffff2a;color:var(--ink);padding:9px;border-radius:3px;font:13px "JetBrains Mono",monospace}
#insp .x{position:absolute;right:12px;top:12px;padding:8px 10px;color:var(--dim)}
.go{display:inline-block;margin-top:4px;padding:11px 18px;background:hsl(var(--h) 65% 80%);color:#0c0f14;font-weight:600;text-decoration:none;border-radius:3px}
.go[aria-disabled=true]{background:#2b3140;color:var(--dim);pointer-events:none}
.note{color:var(--dim);font-size:12.5px;margin:6px 0 0}
#toast{position:fixed;left:50%;top:60px;transform:translateX(-50%);background:var(--ink);color:#111;padding:10px 16px;border-radius:3px;opacity:0;pointer-events:none;transition:opacity .2s;z-index:30;max-width:90vw}
#toast.on{opacity:1}
#stage{--sx:0px}#stage.insp{--sx:-190px}
@media (max-width:1180px){#stage.insp{--sx:0px}}
@media (max-width:760px){
 #rail{display:none}
 .layer{top:150px;height:calc(100dvh - 240px)}
 .lh h2{font-size:28px}.ghost{font-size:120px}
 ..living-index{column-width:auto;padding:10px 16px 30px}
 #insp{left:0;right:0;top:auto;bottom:0;width:auto;max-height:72dvh;border-radius:12px 12px 0 0}
 #dock{bottom:12px}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}

.living-index{position:fixed;inset:0;isolation:isolate;z-index:50;overflow:hidden}
#stage{z-index:0;isolation:isolate}
ul,li{list-style:none;margin:0;padding:0}
.body{column-width:auto;overflow-x:hidden}.body ul{column-width:290px;column-gap:36px}.body li{break-inside:avoid}.muted{color:var(--dim)}
.row .p{display:block}.row .m{flex-wrap:wrap}.lh h2{min-width:0}.lh .n{white-space:nowrap}
#insp dd{overflow-wrap:anywhere;min-width:0}
.mobile-categories{display:none}
.inspector-leave-active{transition:opacity .18s,transform .18s}.inspector-leave-to{opacity:0;transform:translateY(10px)}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:760px){.body ul{column-width:auto}.mobile-categories{display:block;position:fixed;top:62px;left:20px;right:20px;z-index:7}.mobile-categories select{width:100%;padding:9px 12px;color:var(--ink);background:#10141c;border:1px solid #ffffff26;font:inherit;border-radius:3px}#top{gap:16px}#top span{text-align:right}.lh{padding:10px 16px;gap:8px}.lh h2{font-size:25px}.lh .n{font-size:10px}.step{width:36px;height:36px;flex:none}#dock input{font-size:12px}#dock{gap:6px}#dock kbd{display:none}#insp{padding-bottom:max(20px,env(safe-area-inset-bottom))}}
@media(prefers-reduced-motion:reduce){.row:hover{transform:none}}

</style>
