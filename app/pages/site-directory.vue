<script setup lang="ts">
import { directoryGroups, discoverPages } from "~/utils/siteDirectory";

const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

/* ---------- data (unchanged contract) ---------- */
const pages = computed(() => discoverPages(router.getRoutes()));
const allGroups = computed(() =>
  directoryGroups
    .map((category) => ({
      category,
      pages: pages.value.filter((page) => page.category === category),
    }))
    .filter((group) => group.pages.length),
);

/* ---------- filtering ---------- */
const query = ref("");
const active = ref<string>("all");
const searchEl = ref<HTMLInputElement | null>(null);

const needle = computed(() => query.value.trim().toLowerCase());
const matches = (page: any) =>
  !needle.value ||
  [page.path, page.title, page.name].some((v) =>
    String(v ?? "")
      .toLowerCase()
      .includes(needle.value),
  );

const groups = computed(() =>
  allGroups.value
    .filter((g) => active.value === "all" || g.category === active.value)
    .map((g) => ({ ...g, pages: g.pages.filter(matches) }))
    .filter((g) => g.pages.length),
);
const visibleCount = computed(() =>
  groups.value.reduce((n, g) => n + g.pages.length, 0),
);
const isFiltered = computed(() => !!needle.value || active.value !== "all");
const reset = () => {
  query.value = "";
  active.value = "all";
  searchEl.value?.focus();
};

/* ---------- presentation helpers ---------- */
// "/projects/atlas" -> dimmed "/projects" + emphasised "/atlas"
const segments = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) return [{ text: "/", last: true }];
  return parts.map((p, i) => ({ text: "/" + p, last: i === parts.length - 1 }));
};
// split text around the query so matches can be wrapped in <mark>
const highlight = (text: string) => {
  const s = String(text ?? "");
  const q = needle.value;
  if (!q) return [{ text: s, hit: false }];
  const out: { text: string; hit: boolean }[] = [];
  const lower = s.toLowerCase();
  let i = 0;
  while (i < s.length) {
    const j = lower.indexOf(q, i);
    if (j === -1) {
      out.push({ text: s.slice(i), hit: false });
      break;
    }
    if (j > i) out.push({ text: s.slice(i, j), hit: false });
    out.push({ text: s.slice(j, j + q.length), hit: true });
    i = j + q.length;
  }
  return out;
};
const kindOf = (page: any) =>
  page.catchAll
    ? "catchAll"
    : page.parameters
      ? "parameters"
      : page.redirect
        ? "redirect"
        : "static";
const canOpen = (page: any) => !page.parameters && !page.catchAll;

/* "/" jumps to search, Esc clears it */
const onKey = (e: KeyboardEvent) => {
  const el = e.target as HTMLElement | null;
  const typing =
    el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable);
  if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    searchEl.value?.focus();
  }
};
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

useHead(() => ({
  title: `${t("gateway.directory")} — Igal Vilensky`,
  meta: [{ name: "description", content: t("gateway.directoryIntro") }],
}));
</script>

<template>
  <div class="directory container-wide">
    <header class="hero">
      <NuxtLink :to="localePath('/')" class="back">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        {{ t("gateway.back") }}
      </NuxtLink>

      <div class="hero-main">
        <div class="hero-text">
          <h1>{{ t("gateway.directory") }}</h1>
          <p>{{ t("gateway.directoryIntro") }}</p>
        </div>
        <!-- the one memorable element: the whole site as a single number -->
        <p class="count" :aria-label="`${pages.length} ${t('gateway.routes')}`">
          <strong aria-hidden="true">{{ pages.length }}</strong>
          <span>{{ t("gateway.routes") }}</span>
        </p>
      </div>
    </header>

    <!-- sticky filter bar -->
    <div class="toolbar" role="search">
      <label class="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <span class="sr-only">{{ t("gateway.search", "Filter pages") }}</span>
        <input
          ref="searchEl"
          v-model="query"
          type="search"
          autocomplete="off"
          spellcheck="false"
          :placeholder="
            t('gateway.searchPlaceholder', 'Filter by path or title')
          "
          @keydown.esc="query = ''"
        />
        <kbd aria-hidden="true">/</kbd>
      </label>

      <div
        class="chips"
        role="group"
        :aria-label="t('gateway.categories', 'Categories')"
      >
        <button
          type="button"
          class="chip"
          :aria-pressed="active === 'all'"
          @click="active = 'all'"
        >
          {{ t("gateway.all", "All") }}<span>{{ pages.length }}</span>
        </button>
        <button
          v-for="g in allGroups"
          :key="g.category"
          type="button"
          class="chip"
          :aria-pressed="active === g.category"
          @click="active = g.category"
        >
          {{ t(`gateway.${g.category}`) }}<span>{{ g.pages.length }}</span>
        </button>
      </div>
    </div>

    <p class="sr-only" aria-live="polite">
      {{ visibleCount }} {{ t("gateway.routes") }}
    </p>

    <!-- ledger -->
    <section
      v-for="group in groups"
      :key="group.category"
      class="group"
      :aria-labelledby="`group-${group.category}`"
    >
      <h2 :id="`group-${group.category}`">
        {{ t(`gateway.${group.category}`) }}
        <span>{{ group.pages.length }}</span>
      </h2>

      <ul>
        <li
          v-for="(page, i) in group.pages"
          :key="page.path"
          class="row"
          :class="{ linkable: canOpen(page) }"
          :style="{ '--i': Math.min(i, 10) }"
        >
          <div class="route">
            <code>
              <span
                v-for="(seg, s) in segments(page.path)"
                :key="s"
                :class="seg.last ? 'seg-last' : 'seg'"
              >
                <template v-for="(part, k) in highlight(seg.text)" :key="k">
                  <mark v-if="part.hit">{{ part.text }}</mark
                  ><template v-else>{{ part.text }}</template>
                </template>
              </span>
            </code>
            <span class="title">
              <template
                v-for="(part, k) in highlight(page.title || page.name)"
                :key="k"
              >
                <mark v-if="part.hit">{{ part.text }}</mark
                ><template v-else>{{ part.text }}</template>
              </template>
            </span>
          </div>

          <div class="tags">
            <span class="tag status" :data-status="page.status">{{
              t(`gateway.${page.status}`)
            }}</span>
            <span class="tag kind" :data-kind="kindOf(page)">{{
              t(`gateway.${kindOf(page)}`)
            }}</span>
            <span v-if="page.redirect && page.parameters" class="tag kind">{{
              t("gateway.redirect")
            }}</span>
            <span v-if="page.excluded" class="tag excluded">{{
              t("gateway.excluded")
            }}</span>
          </div>

          <NuxtLink
            v-if="canOpen(page)"
            class="open"
            :to="localePath(page.path)"
            :prefetch="false"
            :aria-label="`${t('gateway.open')}: ${page.path}`"
          >
            <span>{{ t("gateway.open") }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- empty state -->
    <div v-if="!groups.length" class="empty">
      <p>{{ t("gateway.noResults", "No pages match this filter.") }}</p>
      <button v-if="isFiltered" type="button" @click="reset">
        {{ t("gateway.clear", "Clear filter") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.directory {
  --line: var(
    --color-border,
    color-mix(in srgb, currentColor 16%, transparent)
  );
  --muted: var(
    --color-text-muted,
    color-mix(in srgb, currentColor 62%, transparent)
  );
  --soft: color-mix(in srgb, currentColor 6%, transparent);
  --accent: var(--color-primary, #7c6cf0);
  max-width: 1180px;
  padding-top: clamp(28px, 5vw, 56px);
  padding-bottom: 96px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex: none;
}

/* ---- hero ---- */
.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--muted);
  text-decoration: none;
  padding: 10px 0;
  transition:
    color 0.25s,
    gap 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.back:hover,
.back:focus-visible {
  color: inherit;
  gap: 12px;
}
.hero-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin: 28px 0 44px;
  animation: reveal 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.hero-text {
  max-width: 640px;
}
h1 {
  font-family: "Instrument Serif", Georgia, serif;
  font-weight: 400;
  font-size: clamp(48px, 9vw, 112px);
  line-height: 0.92;
  letter-spacing: -0.035em;
  margin: 0 0 22px;
}
.hero-text p {
  font-size: 17px;
  line-height: 1.7;
  color: var(--muted);
  max-width: 52ch;
  margin: 0;
}
.count {
  margin: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1;
}
.count strong {
  font-family: "Instrument Serif", Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(88px, 16vw, 200px);
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
  color: transparent;
  -webkit-text-stroke: 1.5px currentColor;
}
.count span {
  font-size: 14px;
  color: var(--muted);
  margin-top: 4px;
}

/* ---- toolbar ---- */
.toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 20px;
  padding: 14px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--color-bg, Canvas) 84%, transparent);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}
.search {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 260px;
  max-width: 380px;
  color: var(--muted);
}
.search svg {
  position: absolute;
  left: 14px;
  pointer-events: none;
}
.search input {
  width: 100%;
  height: 46px;
  padding: 0 44px 0 42px;
  font: inherit;
  font-size: 15px;
  color: inherit;
  background: var(--soft);
  border: 1px solid var(--line);
  border-radius: 999px;
  outline: none;
  transition:
    border-color 0.25s,
    background 0.25s,
    box-shadow 0.25s;
}
.search input::placeholder {
  color: var(--muted);
}
.search input:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent);
}
.search kbd {
  position: absolute;
  right: 12px;
  font:
    12px ui-monospace,
    monospace;
  padding: 2px 7px;
  border: 1px solid var(--line);
  border-radius: 6px;
}
.search:focus-within kbd {
  opacity: 0;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 16px;
  font: inherit;
  font-size: 14px;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s;
}
.chip span {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
}
.chip:hover {
  color: inherit;
  border-color: color-mix(in srgb, currentColor 40%, transparent);
}
.chip[aria-pressed="true"] {
  color: var(--color-bg, Canvas);
  background: currentColor;
  border-color: transparent;
}
.chip[aria-pressed="true"] {
  background: var(--color-text, CanvasText);
  color: var(--color-bg, Canvas);
}
.chip:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ---- groups: label column + ledger ---- */
.group {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 0 40px;
  padding-top: 44px;
}
.group h2 {
  position: sticky;
  top: 96px;
  align-self: start;
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: "Instrument Serif", Georgia, serif;
  font-weight: 400;
  font-size: 34px;
  letter-spacing: -0.02em;
}
.group h2 span {
  font:
    14px ui-monospace,
    monospace;
  color: var(--muted);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px 24px;
  padding: 22px 0;
  border-top: 1px solid var(--line);
  animation: reveal 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: calc(var(--i) * 45ms + 150ms);
  transition: padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.row::before {
  /* accent rail that slides in on hover */
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.row.linkable:hover,
.row.linkable:focus-within {
  padding-left: 14px;
}
.row.linkable:hover::before,
.row.linkable:focus-within::before {
  transform: scaleX(1);
}

.route {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  overflow-wrap: anywhere;
}
.route code {
  font:
    500 clamp(17px, 2vw, 21px) ui-monospace,
    "SFMono-Regular",
    Menlo,
    monospace;
  letter-spacing: -0.01em;
}
.seg {
  color: var(--muted);
}
.seg-last {
  color: inherit;
}
.title {
  font-size: 14px;
  color: var(--muted);
}
mark {
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  color: inherit;
  border-radius: 3px;
  padding: 0 1px;
}

/* ---- tags ---- */
.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  color: var(--muted);
}
.status {
  padding: 4px 11px 4px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
}
.status::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--muted);
}
.status[data-status="live"]::before,
.status[data-status="ready"]::before,
.status[data-status="active"]::before {
  background: #3fb87f;
  box-shadow: 0 0 0 3px color-mix(in srgb, #3fb87f 25%, transparent);
}
.status[data-status="placeholder"]::before,
.status[data-status="planned"]::before,
.status[data-status="draft"]::before {
  background: #e0a43a;
}
.kind {
  font-family: ui-monospace, monospace;
}
.kind[data-kind="parameters"],
.kind[data-kind="catchAll"] {
  color: var(--accent);
}
.excluded {
  text-decoration: line-through;
  text-decoration-color: var(--muted);
}

/* ---- open link: whole row is the target ---- */
.open {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: inherit;
  text-decoration: none;
  padding: 12px 0;
  min-height: 44px;
}
.open::after {
  content: "";
  position: absolute;
  inset: 0;
} /* stretched hit area */
.open svg {
  width: 36px;
  height: 36px;
  padding: 9px;
  border: 1px solid var(--line);
  border-radius: 50%;
  transition:
    transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
    background 0.3s,
    color 0.3s,
    border-color 0.3s;
}
.row:hover .open svg,
.open:focus-visible svg {
  background: var(--color-text, CanvasText);
  color: var(--color-bg, Canvas);
  border-color: transparent;
  transform: translateX(3px);
}
.open:focus-visible {
  outline: none;
}
.open:focus-visible::after {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 6px;
}
.row:not(.linkable) {
  grid-template-columns: minmax(0, 1fr) auto;
}

/* ---- empty ---- */
.empty {
  padding: 90px 0;
  text-align: center;
  color: var(--muted);
}
.empty p {
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 30px;
  margin: 0 0 18px;
  color: inherit;
}
.empty button {
  font: inherit;
  font-size: 14px;
  padding: 12px 22px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.empty button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---- tablet / mobile ---- */
@media (max-width: 900px) {
  .group {
    grid-template-columns: 1fr;
    padding-top: 34px;
  }
  .group h2 {
    position: static;
    margin-bottom: 14px;
  }
}
@media (max-width: 650px) {
  .hero-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .count {
    text-align: left;
    align-items: flex-start;
    flex-direction: row;
    align-items: baseline;
    gap: 14px;
  }
  .count strong {
    font-size: 84px;
  }
  .toolbar {
    gap: 12px;
  }
  .search {
    max-width: none;
    flex-basis: 100%;
  }
  .chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 -20px;
    padding: 0 20px 2px;
    scrollbar-width: none;
  }
  .chip {
    flex: none;
  }
  .row,
  .row:not(.linkable) {
    grid-template-columns: 1fr auto;
  }
  .tags {
    grid-column: 1;
    justify-content: flex-start;
  }
  .open {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
  .open span {
    display: none;
  }
  .row.linkable:hover,
  .row.linkable:focus-within {
    padding-left: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-main,
  .row {
    animation: none;
  }
  .row,
  .row::before,
  .open svg,
  .back {
    transition: none;
  }
}
</style>
