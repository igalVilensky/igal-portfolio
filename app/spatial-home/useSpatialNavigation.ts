import { destinations } from './content';

// Input sources resolve to one active layer; presentation never owns selection.
export function useSpatialNavigation() {
  const localePath = useLocalePath();
  const active = computed(() => opening.value ?? focused.value ?? hovered.value ?? (touched.value !== null && touched.value >= 0 ? touched.value : null));
  const hovered = ref<number | null>(null);
  const focused = ref<number | null>(null);
  const opening = ref<number | null>(null);
  const touched = ref<number | null>(null);
  const links = ref<HTMLAnchorElement[]>([]);
  let timer: ReturnType<typeof setTimeout> | undefined;
  function activate(event: MouseEvent, i: number) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (touched.value !== null && touched.value !== i) {
      event.preventDefault(); touched.value = i; return;
    }
    event.preventDefault();
    if (opening.value !== null) return;
    opening.value = i;
    const target = localePath(destinations[i]!);
    timer = setTimeout(async () => {
      try { await navigateTo(target); } finally { opening.value = null; }
    }, i === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420);
  }
  function pointerDown(event: PointerEvent) {
    if (event.pointerType !== 'mouse') {
      // Focus events must not turn a first tap into immediate navigation.
      if (touched.value === null) touched.value = -1;
    } else touched.value = null;
  }
  function keyboard(event: KeyboardEvent, i: number) {
    touched.value = null;
    let next = i;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (i + 1) % 5;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (i + 4) % 5;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = 4;
    else if (event.key === 'Escape') { hovered.value = null; touched.value = null; links.value[i]?.blur(); return; }
    else return;
    event.preventDefault(); links.value[next]?.focus();
  }
  onBeforeUnmount(() => clearTimeout(timer));
  function enter(event: PointerEvent, i: number) { if (event.pointerType === 'mouse') hovered.value = i; }
  function leave() { hovered.value = null; }
  function focus(i: number) { focused.value = i; }
  function blur() { focused.value = null; }
  function dismissTouch(event: PointerEvent) {
    if (!(event.target as Element).closest('.spatial-plane')) { touched.value = null; focused.value = null; links.value.forEach(link => link.blur()); }
  }
  return { active, opening, links, activate, pointerDown, keyboard, enter, leave, focus, blur, dismissTouch };
}
