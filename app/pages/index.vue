<script setup lang="ts">
import LanguageSwitcher from '~/components/LanguageSwitcher.vue';
definePageMeta({ layout: false });
const { t } = useI18n();
const localePath = useLocalePath();
const portals = [
  { id: 'classic', subtitle: 'story', path: '/portfolio' },
  { id: 'spatial', subtitle: 'perspective', path: '/spatial-home' },
  { id: 'arrival', subtitle: 'world', path: '/arrival-lab' },
] as const;
useHead(() => ({ title: `${t('gateway.title')} — Igal Vilensky`, meta: [{ name: 'description', content: t('gateway.gatewayDescription') }] }));
</script>

<template>
  <main class="gateway">
    <header class="gateway-header"><span>Igal Vilensky</span><LanguageSwitcher /></header>
    <section class="gateway-intro" aria-labelledby="gateway-title">
      <p>{{ t('gateway.intro') }}</p>
      <h1 id="gateway-title">{{ t('gateway.title') }}</h1>
      <p>{{ t('gateway.choose') }}</p>
    </section>
    <div class="portal-stage">
      <NuxtLink v-for="portal in portals" :key="portal.id" :to="localePath(portal.path)" :class="['portal', portal.id]" :prefetch="false">
        <div class="portal-scene" aria-hidden="true">
          <div v-if="portal.id === 'classic'" class="story-scene"><i/><i/><i/><span>IV.</span></div>
          <div v-else-if="portal.id === 'spatial'" class="perspective-scene"><i/><i/><i/><i/><b/></div>
          <svg v-else viewBox="0 0 360 360" class="world-scene" focusable="false">
            <defs><linearGradient id="island" x2="0" y2="1"><stop stop-color="#b2d8ca"/><stop offset="1" stop-color="#263d4b"/></linearGradient><radialGradient id="halo"><stop stop-color="#e2f4dc" stop-opacity=".6"/><stop offset="1" stop-color="#e2f4dc" stop-opacity="0"/></radialGradient></defs>
            <circle cx="180" cy="150" r="140" fill="url(#halo)"/>
            <g class="island"><path d="M65 208 176 170 294 205 182 251Z" fill="#8cbaa9"/><path d="m65 208 117 43 112-46-54 63-58 47-64-56Z" fill="url(#island)"/><path d="M146 195V98h69v101h-16v-83h-37v83Z" fill="#e5ead4"/><path d="m215 98 13 9v88l-13 4Z" fill="#99b6a6"/><path d="m165 220 17-6 17 6-17 7Z" fill="#e7e7cb"/></g>
            <g fill="#e2edf0" opacity=".55"><ellipse cx="67" cy="258" rx="65" ry="12"/><ellipse cx="290" cy="153" rx="65" ry="10"/><ellipse cx="273" cy="291" rx="76" ry="14"/></g>
          </svg>
        </div>
        <div class="portal-copy"><p class="portal-subtitle">{{ t(`gateway.${portal.subtitle}`) }}</p><h2>{{ t(`gateway.${portal.id}`) }}</h2><p class="portal-description">{{ t(`gateway.${portal.id}Description`) }}</p><span class="portal-enter">{{ t('gateway.enter') }} <span aria-hidden="true">＋</span></span></div>
      </NuxtLink>
    </div>
    <footer class="gateway-footer"><span>© {{ new Date().getFullYear() }} Igal Vilensky</span><NuxtLink :to="localePath('/site-directory')">{{ t('gateway.allPages') }}</NuxtLink></footer>
  </main>
</template>

<style scoped>
.gateway{min-height:100svh;background:#10171c;color:#edf1ef;padding:28px clamp(20px,5vw,88px);font-family:Inter,sans-serif;isolation:isolate;background-image:radial-gradient(ellipse at 55% 45%,#32464a77,transparent 65%)}
.gateway-header,.gateway-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:14px}.gateway-header>span{letter-spacing:.05em}.gateway-intro{text-align:center;padding:36px 0 30px}.gateway-intro p{color:#b5c3c5;font-size:16px}.gateway-intro h1{font-family:'Playfair Display',serif;font-weight:400;font-size:clamp(48px,7vw,92px);letter-spacing:-.045em;line-height:1.2;margin:10px 0 14px}
.portal-stage{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,3vw,46px);align-items:start;perspective:1400px;padding:12px 0 46px}.portal{display:block;position:relative;border:1px solid #9bb9ba44;border-radius:160px 160px 4px 4px;overflow:hidden;text-decoration:none;transition:transform .4s ease,border-color .4s,box-shadow .4s;background:#17272d;box-shadow:0 25px 50px #0004}.portal:hover,.portal:focus-visible{transform:translateY(-9px);border-color:#d6ece0;box-shadow:0 30px 60px #0008;outline:2px solid #d6ece0;outline-offset:6px}.portal:active{transform:translateY(-3px) scale(.985)}.portal-scene{height:clamp(210px,24vw,330px);position:relative;overflow:hidden}.portal-copy{padding:12px clamp(20px,2.4vw,36px) 28px}.portal-subtitle{text-transform:uppercase;letter-spacing:.14em;font-size:12px;opacity:.75}.portal-copy h2{font-size:clamp(28px,3vw,42px);font-weight:400;letter-spacing:-.035em;margin:5px 0 12px}.portal-description{font-size:16px;line-height:1.6;min-height:78px}.portal-enter{display:flex;justify-content:space-between;align-items:center;border-top:1px solid currentColor;padding-top:18px;margin-top:20px;font-size:14px}.portal-enter>span{font-size:22px;transition:transform .4s}.portal:hover .portal-enter>span{transform:rotate(90deg)}
.classic{background:#e8e7e0;color:#242b2c}.story-scene{height:100%;position:relative;background:linear-gradient(120deg,#fcfcf4,#b8beb8)}.story-scene i{position:absolute;top:19%;bottom:0;width:18%;background:linear-gradient(90deg,#f7f5ed,#d6d9cf);box-shadow:22px 15px 22px #303f3a38;transform:skewY(-16deg);transition:transform .6s}.story-scene i:nth-child(1){left:16%;top:40%}.story-scene i:nth-child(2){left:42%;top:28%}.story-scene i:nth-child(3){left:68%;top:16%}.story-scene span{position:absolute;bottom:12%;left:24%;font:italic 64px 'Playfair Display',serif;color:#303c38}.portal:hover .story-scene i{transform:skewY(-12deg) translateY(-6px)}
.spatial{background:#211d3a;color:#ece4ff;margin-top:28px}.perspective-scene{height:100%;position:relative;background:radial-gradient(ellipse at 50% 55%,#6955a7,transparent 67%)}.perspective-scene i{position:absolute;left:22%;top:25%;width:58%;height:46%;border:1px solid #e9c9ff99;background:linear-gradient(120deg,#c08dff33,#71dbf222);transform:rotate(-28deg) skew(22deg,12deg);box-shadow:0 18px 25px #09031f66;transition:transform .6s}.perspective-scene i:nth-child(2){translate:0 28px}.perspective-scene i:nth-child(3){translate:0 56px}.perspective-scene i:nth-child(4){translate:0 84px}.perspective-scene b{position:absolute;left:49%;top:46%;width:12px;height:12px;border-radius:50%;background:#dcfaff;box-shadow:0 0 28px 10px #9ceaff88}.portal:hover .perspective-scene i{transform:rotate(-20deg) skew(22deg,12deg) translateY(-10px)}
.arrival{background:#1d3539;color:#e2eee5}.world-scene{width:100%;height:100%;background:linear-gradient(#233e49,#4e737344)}.island{animation:float 7s ease-in-out infinite}.gateway-footer{color:#b6c5c6;max-width:1320px;margin:auto}.gateway-footer a{padding:12px 0;text-decoration:underline;text-underline-offset:5px}@keyframes float{50%{transform:translateY(-9px)}}
@media(min-width:1500px){.gateway-intro{padding-top:50px}}@media(max-width:760px){.gateway{padding:20px}.gateway-intro{padding:32px 0}.portal-stage{grid-template-columns:1fr;max-width:440px;gap:28px}.portal{border-radius:130px 130px 4px 4px}.spatial{margin-top:0}.portal-scene{height:240px}.portal-description{min-height:0}.portal-copy{padding:12px 28px 24px}.gateway-footer{flex-wrap:wrap}.portal:hover{transform:none}}
@media(prefers-reduced-motion:reduce){.gateway *, .gateway *::before{animation:none!important;transition:none!important;transform:none!important}}
</style>
