<script setup lang="ts">
definePageMeta({ layout: false });
const { t } = useI18n();
const localePath = useLocalePath();
const gate = ref<HTMLElement | null>(null);
const active = ref<number | null>(null);
let hovered: number | null = null;
let focused: number | null = null;
let reduce: MediaQueryList | undefined;
let finePointer: MediaQueryList | undefined;
let raf = 0;
let previousTime = 0;
type MotionState = { el: HTMLElement; x: number; y: number; tx: number; ty: number };
let states: MotionState[] = [];

useHead(() => ({
  title: 'Igal Vilensky',
  meta: [{ name: 'description', content: t('gateway.gatewayDescription') }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600&family=Syne:wght@600;800&display=swap' },
  ],
}));

function tick(time: number) {
  const damping = 1 - Math.pow(.91, Math.min(previousTime ? time - previousTime : 1000 / 60, 64) / (1000 / 60));
  previousTime = time;
  let moving = false;
  for (const state of states) {
    state.x += (state.tx - state.x) * damping;
    state.y += (state.ty - state.y) * damping;
    const unsettled = Math.abs(state.tx - state.x) > .002 || Math.abs(state.ty - state.y) > .002;
    if (!unsettled) { state.x = state.tx; state.y = state.ty; }
    moving ||= unsettled;
    state.el.style.setProperty('--mx', state.x.toFixed(3));
    state.el.style.setProperty('--my', state.y.toFixed(3));
  }
  raf = moving ? requestAnimationFrame(tick) : 0;
  if (!moving) previousTime = 0;
}
function kick() {
  if (!raf && !reduce?.matches) raf = requestAnimationFrame(tick);
}
function neutralize(immediate = false) {
  for (const state of states) {
    state.tx = state.ty = 0;
    state.el.style.removeProperty('--lx');
    state.el.style.removeProperty('--ly');
    if (immediate) {
      state.x = state.y = 0;
      state.el.style.setProperty('--mx', '0');
      state.el.style.setProperty('--my', '0');
    }
  }
  if (immediate) { cancelAnimationFrame(raf); raf = 0; previousTime = 0; }
  else kick();
}
function pointerEnter(event: PointerEvent, index: number) {
  if (event.pointerType === 'touch' || !finePointer?.matches) return;
  hovered = index;
  active.value = index;
}
function pointerMove(event: PointerEvent, index: number) {
  if (event.pointerType === 'touch' || !finePointer?.matches) return;
  hovered = index;
  active.value = index;
  if (reduce?.matches) return;
  for (const [i, state] of states.entries()) {
    if (i !== index) { state.tx = state.ty = 0; continue; }
    const rect = state.el.getBoundingClientRect();
    state.tx = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    state.ty = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    state.el.style.setProperty('--lx', `${event.clientX - rect.left}px`);
    state.el.style.setProperty('--ly', `${event.clientY - rect.top}px`);
  }
  kick();
}
function leave() { hovered = null; active.value = focused; neutralize(); }
function focusPortal(index: number) { focused = index; active.value = index; neutralize(); }
function focusOut(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && gate.value?.contains(event.relatedTarget)) return;
  focused = null;
  active.value = hovered;
}
function reset() { hovered = focused = null; active.value = null; neutralize(true); }
function motionPreferenceChanged() { neutralize(true); }
function pointerPreferenceChanged() { reset(); }
onMounted(() => {
  states = Array.from(gate.value?.querySelectorAll<HTMLElement>('.portal') ?? [], el => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));
  reduce = matchMedia('(prefers-reduced-motion: reduce)');
  finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  reduce.addEventListener('change', motionPreferenceChanged);
  finePointer.addEventListener('change', pointerPreferenceChanged);
  window.addEventListener('blur', reset);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  reduce?.removeEventListener('change', motionPreferenceChanged);
  finePointer?.removeEventListener('change', pointerPreferenceChanged);
  window.removeEventListener('blur', reset);
});
</script>

<template>
<div class="gateway">
<main ref="gate" class="gate" :data-active="active ?? undefined" @pointerleave="leave" @focusout="focusOut">

  <!-- CLASSIC -->
  <NuxtLink class="portal classic" :class="{ on: active === 0 }" :to="localePath('/portfolio')" :prefetch="false"
    :aria-label="`${t('gateway.classic')} — ${t('gateway.classicDescription')}`"
    @pointerenter="pointerEnter($event, 0)" @pointermove="pointerMove($event, 0)" @focus="focusPortal(0)">
    <div class="scene" aria-hidden="true">
      <div class="l" style="--d:6"><div class="sun"></div></div>
      <div class="l" style="--d:10"><div class="arch"></div></div>
      <div class="l" style="--d:22">
        <div class="cols">
          <i class="col" style="--h:62%"></i><i class="col" style="--h:80%"></i>
          <i class="col" style="--h:100%"></i><i class="col" style="--h:80%"></i><i class="col" style="--h:62%"></i>
        </div>
      </div>
      <div class="glow"></div>
    </div>
    <div class="label"><div><div class="name">{{ t('gateway.classic') }}</div><div class="tag">{{ t('gateway.classicDescription') }}</div></div>
      <span class="go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
  </NuxtLink>

  <!-- SPATIAL -->
  <NuxtLink class="portal spatial" :class="{ on: active === 1 }" :to="localePath('/spatial-home')" :prefetch="false"
    :aria-label="`${t('gateway.spatial')} — ${t('gateway.spatialDescription')}`"
    @pointerenter="pointerEnter($event, 1)" @pointermove="pointerMove($event, 1)" @focus="focusPortal(1)">
    <div class="scene" aria-hidden="true">
      <div class="stage"><div class="planes">
        <i class="plane" style="--i:0"></i><i class="plane" style="--i:1"></i>
        <i class="plane" style="--i:2"></i><i class="plane" style="--i:3"></i>
      </div></div>
      <div class="orb"></div>
      <div class="glow"></div>
    </div>
    <div class="label"><div><div class="name">{{ t('gateway.spatial') }}</div><div class="tag">{{ t('gateway.spatialDescription') }}</div></div>
      <span class="go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
  </NuxtLink>

  <!-- ARRIVAL -->
  <NuxtLink class="portal arrival" :class="{ on: active === 2 }" :to="localePath('/arrival-lab')" :prefetch="false"
    :aria-label="`${t('gateway.arrival')} — ${t('gateway.arrivalDescription')}`"
    @pointerenter="pointerEnter($event, 2)" @pointermove="pointerMove($event, 2)" @focus="focusPortal(2)">
    <div class="scene" aria-hidden="true">
      <div class="l" style="--d:4"><div class="stars" style="position:absolute;inset:0"></div></div>

      <!-- distant monoliths -->
      <div class="l" style="--d:10"><svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMax slice">
        <g fill="#0d4a52" opacity=".75">
          <rect x="30" y="300" width="22" height="120"/><polygon points="30,300 52,300 41,285"/>
          <rect x="330" y="280" width="30" height="170"/><rect x="300" y="340" width="18" height="90"/>
          <polygon points="40,430 130,430 85,500"/><polygon points="290,450 370,450 330,515"/>
        </g></svg></div>

      <!-- back clouds -->
      <div class="l" style="--d:16"><div class="drift" style="position:absolute;inset:0"><svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMax slice">
        <g fill="#cdeee6" opacity=".35"><ellipse cx="90" cy="250" rx="90" ry="14"/><ellipse cx="320" cy="200" rx="70" ry="10"/><ellipse cx="260" cy="480" rx="100" ry="14"/></g></svg></div></div>

      <!-- main island + gate -->
      <div class="l" style="--d:30"><div class="bob" style="position:absolute;inset:0"><svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="rock" x1="0" x2="1"><stop offset="0" stop-color="#2d6f6e"/><stop offset="1" stop-color="#0f3d44"/></linearGradient>
          <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff1d6" stop-opacity=".9"/><stop offset="1" stop-color="#bff1d6" stop-opacity="0"/></linearGradient>
          <linearGradient id="door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#8fe8c0"/></linearGradient>
        </defs>
        <polygon class="beam" opacity=".45" points="190,400 210,400 290,600 110,600" fill="url(#beam)"/>
        <polygon points="90,360 200,400 310,360 200,570" fill="url(#rock)"/>
        <polygon points="90,360 200,320 310,360 200,400" fill="#9fe3c7"/>
        <polygon points="200,400 310,360 200,570" fill="#0b2f36" opacity=".55"/>
        <rect x="184" y="240" width="32" height="110" fill="url(#door)" opacity=".95"/>
        <rect x="168" y="222" width="14" height="128" fill="#f3f1e2"/><rect x="218" y="222" width="14" height="128" fill="#d9d6c4"/>
        <rect x="162" y="210" width="76" height="16" fill="#fbfaf0"/>
      </svg></div></div>

      <!-- small floating islands -->
      <div class="l" style="--d:44"><div class="bob2" style="position:absolute;inset:0"><svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        <g><polygon points="300,430 340,420 380,430 340,460" fill="#8fd9c0"/><polygon points="300,430 340,460 380,430 340,490" fill="#14505a"/>
        <polygon points="40,480 70,472 100,480 70,500" fill="#8fd9c0"/><polygon points="40,480 70,500 100,480 70,520" fill="#14505a"/></g></svg></div></div>

      <!-- foreground clouds -->
      <div class="l" style="--d:60"><div class="drift" style="position:absolute;inset:0;animation-duration:30s;animation-direction:alternate-reverse"><svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMax slice">
        <g fill="#f0fff9" opacity=".5"><ellipse cx="60" cy="560" rx="120" ry="26"/><ellipse cx="350" cy="590" rx="130" ry="30"/></g></svg></div></div>
      <div class="glow"></div>
    </div>
    <div class="label"><div><div class="name">{{ t('gateway.arrival') }}</div><div class="tag">{{ t('gateway.arrivalDescription') }}</div></div>
      <span class="go" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
  </NuxtLink>
</main>
<NuxtLink class="all" :to="localePath('/site-directory')">{{ t('gateway.allPages') }}</NuxtLink>
</div>
</template>

<style scoped>

/* ===== Tokens ===== */
.gateway{
  --ease:cubic-bezier(.2,.8,.2,1);
  --paper:#ebe6da; --ink:#1d1b17; --stone:#cfc7b6;
  --void:#0f0b24; --violet:#7c6cf0; --ice:#bfe6ff;
  --abyss:#06232b; --lagoon:#2f8a86; --mint:#bff1d6;
}
.gateway,.gateway *{box-sizing:border-box;margin:0}
.gateway{position:fixed;inset:0;background:#0b0b0e;overflow:hidden;font-family:"Space Grotesk",system-ui,sans-serif;line-height:normal;-webkit-font-smoothing:antialiased}

/* ===== Gate layout ===== */
.gate{position:fixed;inset:0;display:flex;height:100dvh}
.portal{position:relative;flex:1 1 0;min-width:0;overflow:hidden;display:block;color:inherit;text-decoration:none;
  isolation:isolate;transition:flex-grow .9s var(--ease);-webkit-tap-highlight-color:transparent;outline:none}
.gate[data-active="0"] .portal:nth-child(1),
.gate[data-active="1"] .portal:nth-child(2),
.gate[data-active="2"] .portal:nth-child(3){flex-grow:1.9}
.portal+.portal{box-shadow:-30px 0 60px -20px rgba(0,0,0,.45)}
.portal:focus-visible::after{content:"";position:absolute;inset:10px;border:2px solid #fff;mix-blend-mode:difference;z-index:9;pointer-events:none}

.scene{position:absolute;inset:0;animation:rise 1.1s var(--ease) both}
.portal:nth-child(2) .scene{animation-delay:.08s}.portal:nth-child(3) .scene{animation-delay:.16s}
@keyframes rise{from{transform:translateY(2.5%) scale(1.05);filter:brightness(.7)}to{transform:none;filter:none}}

/* parallax layer: --mx/--my (-1..1) set by JS, --d = depth in px */
.l{position:absolute;inset:-5%;transform:translate3d(calc(var(--mx,0)*var(--d,0)*1px),calc(var(--my,0)*var(--d,0)*.7px),0);will-change:transform}
.l svg{width:100%;height:100%;display:block}
.glow{position:absolute;inset:0;opacity:0;transition:opacity .6s;pointer-events:none;z-index:3}
.portal.on .glow{opacity:1}

/* ===== Label ===== */
.label{position:absolute;left:clamp(20px,3vw,44px);right:clamp(20px,3vw,44px);bottom:clamp(22px,4.5vh,48px);z-index:6;display:flex;align-items:flex-end;justify-content:space-between;gap:16px}
.name{font-size:clamp(2.6rem,6vw,6.4rem);line-height:.9;white-space:nowrap}
.tag{margin-top:12px;font-size:.95rem;max-width:22ch;opacity:0;transform:translateY(8px);transition:.5s var(--ease)}
.portal.on .tag,.portal:focus-visible .tag{opacity:.85;transform:none}
.go{flex:none;width:52px;height:52px;border-radius:50%;border:1.5px solid currentColor;display:grid;place-items:center;transition:.5s var(--ease)}
.go svg{width:20px;height:20px;transition:transform .5s var(--ease)}
.portal.on .go{background:currentColor}
.portal.on .go svg{transform:translateX(2px);color:var(--bg)}

/* ===== 1 CLASSIC: stone, light, shadow ===== */
.classic{background:linear-gradient(180deg,#f4f0e6,var(--paper) 60%,#d9d2c2);color:var(--ink);--bg:#ebe6da}
.classic .name{font-family:"Instrument Serif",Georgia,serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.classic .sun{position:absolute;left:50%;top:14%;width:min(46vw,420px);aspect-ratio:1;border-radius:50%;translate:-50% 0;
  background:radial-gradient(circle,#fff 0,#fbf6e8 55%,transparent 71%)}
.classic .arch{position:absolute;left:50%;bottom:0;width:78%;height:78%;translate:-50% 0;border:1px solid rgba(29,27,23,.18);border-bottom:0;border-radius:999px 999px 0 0}
.cols{position:absolute;inset:auto 8% 0 8%;height:72%;display:flex;align-items:flex-end;justify-content:space-between}
.col{position:relative;width:15%;height:var(--h);
  background:repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 2px,transparent 2px 9%),linear-gradient(90deg,#fffdf7,#efe9db 45%,#bdb4a0);
  box-shadow:inset -10px 0 18px rgba(0,0,0,.08)}
.col::before{content:"";position:absolute;left:-8%;right:-8%;top:-14px;height:14px;background:linear-gradient(#fff,#e2dbc9)}
.col::after{content:"";position:absolute;left:100%;bottom:0;width:90%;height:100%;transform-origin:0 100%;transform:skewX(calc(-38deg + var(--mx,0)*-8deg)) scaleY(.3);
  background:linear-gradient(90deg,rgba(40,30,10,.28),transparent);filter:blur(5px);margin-left:2px}
.classic .glow{background:radial-gradient(420px circle at var(--lx,50%) var(--ly,30%),rgba(255,248,225,.75),transparent 70%);mix-blend-mode:soft-light}

/* ===== 2 SPATIAL: stacked planes ===== */
.spatial{background:radial-gradient(120% 90% at 50% 40%,#2a2068,var(--void) 70%);color:#eef0ff;--bg:#0f0b24}
.spatial .name{font-weight:500;letter-spacing:.08em;font-size:clamp(2.2rem,4.6vw,5rem);text-transform:lowercase}
.stage{position:absolute;inset:0;perspective:1000px;perspective-origin:50% 40%}
.planes{position:absolute;left:50%;top:38%;width:0;height:0;transform-style:preserve-3d;
  transform:rotateX(calc(58deg + var(--my,0)*-9deg)) rotateZ(calc(-34deg + var(--mx,0)*14deg));--gap:30px;transition:--gap .6s}
.plane{position:absolute;width:min(34vw,360px);aspect-ratio:1;translate:-50% -50%;
  transform:translateZ(calc(var(--i)*var(--gap)));transition:transform .8s var(--ease);
  border:1px solid rgba(190,200,255,.55);background:linear-gradient(135deg,rgba(124,108,240,.28),rgba(120,200,255,.1));
  box-shadow:0 0 40px rgba(124,108,240,.25)}
.plane:first-child{background:repeating-linear-gradient(0deg,rgba(190,200,255,.18) 0 1px,transparent 1px 10%),repeating-linear-gradient(90deg,rgba(190,200,255,.18) 0 1px,transparent 1px 10%),rgba(40,30,110,.5)}
.spatial.on .plane{transform:translateZ(calc(var(--i)*70px))}
.orb{position:absolute;left:50%;top:38%;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 30px 10px rgba(150,190,255,.7);
  transform:translate(calc(-50% + var(--mx,0)*60px),calc(-50% + var(--my,0)*40px - 40px))}
.spatial .glow{background:radial-gradient(380px circle at var(--lx,50%) var(--ly,40%),rgba(150,160,255,.4),transparent 70%)}

/* ===== 3 ARRIVAL: floating world ===== */
.arrival{background:linear-gradient(180deg,#0a3a44 0,#176168 45%,#79b9ad 100%);color:#eafff4;--bg:#06232b}
.arrival .name{font-family:Syne,sans-serif;font-weight:800;letter-spacing:-.03em;font-size:clamp(2.4rem,5.2vw,5.6rem)}
.stars{position:absolute;inset:0;opacity:.8;background:
  radial-gradient(1.5px 1.5px at 20% 12%,#fff,transparent),radial-gradient(1px 1px at 70% 8%,#fff,transparent),
  radial-gradient(1.5px 1.5px at 85% 25%,#fff,transparent),radial-gradient(1px 1px at 40% 22%,#fff,transparent),
  radial-gradient(1px 1px at 8% 30%,#fff,transparent),radial-gradient(1.5px 1.5px at 58% 15%,#fff,transparent)}
.bob{animation:bob 7s ease-in-out infinite}
.bob2{animation:bob 9s ease-in-out -3s infinite}
@keyframes bob{50%{transform:translateY(-14px)}}
.drift{animation:drift 40s linear infinite alternate}
@keyframes drift{to{transform:translateX(7%)}}
.arrival .beam{transition:opacity .7s}
.arrival.on .beam{opacity:1!important}
.arrival .glow{background:radial-gradient(420px circle at var(--lx,50%) var(--ly,45%),rgba(191,241,214,.45),transparent 70%)}

/* ===== discreet directory link ===== */
.all{position:fixed;top:max(14px,env(safe-area-inset-top));right:16px;z-index:20;color:#fff;mix-blend-mode:difference;
  font-size:.8rem;letter-spacing:.04em;text-decoration:none;padding:10px 4px;border-bottom:1px solid transparent;transition:border-color .3s}
.all:hover,.all:focus-visible{border-bottom-color:#fff;outline:none}

/* ===== Mobile: stacked bands, labels always visible ===== */
@media (max-width:760px){
  .gate{flex-direction:column}
  .portal,.gate[data-active] .portal{flex-grow:1}
  .portal+.portal{box-shadow:0 -24px 40px -20px rgba(0,0,0,.5)}
  .label{bottom:auto;top:50%;translate:0 -50%;align-items:center}
  .name,.spatial .name,.arrival .name{font-size:clamp(2.4rem,13vw,3.6rem)}
  .tag{opacity:.85;transform:none}
  .go{width:48px;height:48px}
  .portal:active .go{background:currentColor}.portal:active .go svg{color:var(--bg)}
  /* push art to the right half so type stays readable */
  .scene>.l,.stage,.cols,.classic .sun,.classic .arch{translate:28% 0}
  .classic .sun{translate:-20% 0}.cols{inset:auto 0 0 40%;height:90%}
  .planes{top:50%}.orb{top:50%}
  .plane{width:48vw}
}
@media (prefers-reduced-motion:reduce){
  .gateway *,.gateway *::before,.gateway *::after{animation:none!important;transition-duration:.01ms!important}
}

/* Fit localized names within the reference composition at narrower desktop widths. */
.label>div{min-width:0}
.name{font-size:min(clamp(2.6rem,6vw,6.4rem),16cqw)}
.spatial .name{font-size:min(clamp(2.2rem,4.6vw,5rem),16cqw)}
.arrival .name{font-size:min(clamp(2.4rem,5.2vw,5.6rem),17cqw)}
.portal{container-type:inline-size;min-height:0}
@media (min-width:761px){
  .classic .name:lang(de){font-size:min(clamp(2.6rem,6vw,6.4rem),14cqw)}
  .classic .name:lang(ru){font-size:min(clamp(2.6rem,6vw,6.4rem),12cqw)}
}
.all{min-height:44px}
@media (hover:none){.gate[data-active] .portal{flex-grow:1}.tag{opacity:.85;transform:none}}
@media (max-width:760px){
  .name,.spatial .name,.arrival .name{font-size:clamp(2.4rem,13vw,3.6rem)}
  .tag{max-width:24ch}
  .label{gap:12px}
}
@media (max-width:380px){.name,.spatial .name,.arrival .name{font-size:clamp(2rem,11vw,2.6rem)}.tag{font-size:.85rem;max-width:23ch}}

</style>
