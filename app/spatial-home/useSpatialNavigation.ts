import { destinations } from './content';

// One owner survives the journey from the stationary hit face to its preview.
// A new plate, leaving the object, outside input, or Escape transfers ownership.
export function useSpatialNavigation() {
  const localePath = useLocalePath();
  const active = ref<number | null>(null);
  const opening = ref<number | null>(null);
  const links = ref<HTMLAnchorElement[]>([]);
  const nuxtApp = useNuxtApp();
  let touch = false;
  function activate(event: MouseEvent | KeyboardEvent, i: number, previewReady = true) {
    event.preventDefault();
    if (opening.value !== null) return;
    if (active.value !== i || !previewReady) { active.value = i; return; }
    opening.value = i;
    const source = links.value[i]?.querySelector<SVGSVGElement>('.plane-art');
    if (i === 0 && source && nuxtApp.$workEntry) {
      nuxtApp.$workEntry.enter(source, localePath(destinations[i]!), event.detail === 0)
        .catch(() => false).finally(() => { opening.value = null; });
    } else {
      Promise.resolve(navigateTo(localePath(destinations[i]!))).finally(() => { opening.value = null; });
    }
  }
  function pointerDown(event: PointerEvent) { if (opening.value === 0) return; touch = event.pointerType !== 'mouse'; }
  function keyboard(event: KeyboardEvent, i: number) { if (opening.value === 0) return;
    touch = false;
    let next = i;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (i + 1) % 5;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (i + 4) % 5;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = 4;
    else if (event.key === 'Escape') { event.preventDefault(); active.value = null; links.value[i]?.blur(); return; }
    else return;
    event.preventDefault(); links.value[next]?.focus();
  }
  function enter(event: PointerEvent, i: number) { if (opening.value === 0) return; if (event.pointerType === 'mouse') { touch = false; active.value = i; } }
  function leave() { if (opening.value === 0) return; if (!touch) active.value = null; }
  function focus(i: number) { if (opening.value === 0) return; if (!touch) active.value = i; }
  function blur() { if (opening.value === 0) return; queueMicrotask(() => { if (opening.value === 0) return; if (!touch && !links.value.includes(document.activeElement as HTMLAnchorElement)) active.value = null; }); }
  function dismissTouch(event: PointerEvent) { if (opening.value === 0) return;
    if (!(event.target as Element).closest('.spatial-plane')) {
      active.value = null;
      links.value.forEach(link => link.blur());
    }
  }
  function escape(event: KeyboardEvent) { if (opening.value === 0) return;
    touch = false;
    if (event.key !== 'Escape') return;
    active.value = null;
    links.value.forEach(link => link.blur());
  }
  onMounted(() => window.addEventListener('keydown', escape));
  onBeforeUnmount(() => window.removeEventListener('keydown', escape));
  return { active, opening, links, activate, pointerDown, keyboard, enter, leave, focus, blur, dismissTouch };
}
