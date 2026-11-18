<script setup lang="ts">
import { directoryGroups, discoverPages } from '~/utils/siteDirectory';
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const pages = computed(() => discoverPages(router.getRoutes()));
const groups = computed(() => directoryGroups.map(category => ({ category, pages: pages.value.filter(page => page.category === category) })).filter(group => group.pages.length));
useHead(() => ({ title: `${t('gateway.directory')} — Igal Vilensky`, meta: [{ name: 'description', content: t('gateway.directoryIntro') }] }));
</script>

<template>
  <div class="directory container-wide">
    <header><NuxtLink :to="localePath('/')">{{ t('gateway.back') }}</NuxtLink><h1>{{ t('gateway.directory') }}</h1><p>{{ t('gateway.directoryIntro') }}</p><p class="directory-count">{{ pages.length }} {{ t('gateway.routes') }}</p></header>
    <section v-for="group in groups" :key="group.category" :aria-labelledby="`group-${group.category}`">
      <h2 :id="`group-${group.category}`">{{ t(`gateway.${group.category}`) }} <span>({{ group.pages.length }})</span></h2>
      <ul>
        <li v-for="page in group.pages" :key="page.path">
          <div class="directory-route"><code>{{ page.path }}</code><span>{{ page.title || page.name }}</span></div>
          <div class="directory-status"><span>{{ t(`gateway.${page.status}`) }}</span><span>{{ t(`gateway.${page.catchAll ? 'catchAll' : page.parameters ? 'parameters' : page.redirect ? 'redirect' : 'static'}`) }}</span><span v-if="page.redirect && page.parameters">{{ t('gateway.redirect') }}</span><span v-if="page.excluded">{{ t('gateway.excluded') }}</span></div>
          <NuxtLink v-if="!page.parameters && !page.catchAll" :to="localePath(page.path)" :prefetch="false" :aria-label="`${t('gateway.open')}: ${page.path}`">{{ t('gateway.open') }}</NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.directory{padding-top:50px;padding-bottom:70px;max-width:1100px}.directory header{max-width:760px;margin-bottom:46px}.directory h1{font-size:clamp(32px,5vw,56px);letter-spacing:-.04em;margin:20px 0}.directory header p{line-height:1.8;color:var(--color-text-muted)}.directory-count{margin-top:14px}.directory section{margin:34px 0}.directory h2{font-size:23px;margin-bottom:16px}.directory h2 span{color:var(--color-text-muted);font-size:16px}.directory li{display:grid;grid-template-columns:minmax(0,1fr) minmax(180px,1fr) auto;gap:20px;align-items:center;padding:20px 0;border-top:1px solid var(--color-border,#64748b55)}.directory-route,.directory-status{display:flex;flex-direction:column;gap:6px;overflow-wrap:anywhere}.directory-route code{font-size:16px}.directory-route>span,.directory-status{font-size:14px;color:var(--color-text-muted)}.directory a{text-decoration:underline;text-underline-offset:5px;display:inline-block;padding:12px 0;font-size:14px}.directory a:focus-visible{outline:2px solid currentColor;outline-offset:5px}@media(max-width:650px){.directory li{grid-template-columns:1fr;gap:10px}.directory-status{flex-direction:row;flex-wrap:wrap;gap:8px 16px}.directory li>a{justify-self:start}.directory{padding-top:28px}}
</style>
