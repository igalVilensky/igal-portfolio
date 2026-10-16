// A finite, reversible clock shared by the surface and its signal environment.
export function useActiveCore(active: () => boolean, paused: () => boolean) {
  const progress = ref(0);
  let frame = 0;
  let media: MediaQueryList | undefined;
  const sync = () => {
    cancelAnimationFrame(frame);
    const target = active() ? 1 : 0;
    if (media?.matches || paused()) { progress.value = target; return; }
    let previous = performance.now();
    const tick = (now: number) => {
      const step = (now - previous) / 900;
      previous = now;
      progress.value = target ? Math.min(1, progress.value + step) : Math.max(0, progress.value - step * 1.65);
      if (progress.value !== target) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };
  watch([active, paused], sync);
  onMounted(() => { media = matchMedia('(prefers-reduced-motion: reduce)'); media.addEventListener('change', sync); sync(); });
  onBeforeUnmount(() => { cancelAnimationFrame(frame); media?.removeEventListener('change', sync); });
  return progress;
}
