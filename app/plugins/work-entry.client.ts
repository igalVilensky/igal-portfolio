import { gsap } from 'gsap';

// App-owned: the surface must survive SpatialHome's route unmount.
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  let cancel: (() => void) | undefined;

  async function enter(source: SVGSVGElement, to: string, keyboard: boolean) {
    cancel?.();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try {
        const failure = await router.push(to);
        if (!failure && keyboard) {
          await nextTick();
          document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
        }
        return !failure;
      } catch { return false; }
    }
    const home = source.closest<HTMLElement>('.spatial-home')!;
    const bounds = source.getBoundingClientRect();
    const face = source.querySelector<SVGPathElement>('.plane-face')!.getBoundingClientRect();
    const clone = source.cloneNode(true) as SVGSVGElement;
    // Scoped artwork/face CSS and inline geometry stay on this exact SVG.
    // Carry only inherited material/font values out of the scene hierarchy.
    const sourceStyle = getComputedStyle(source);
    for (const key of Array.from(sourceStyle)) {
      if (key.startsWith('--')) clone.style.setProperty(key, sourceStyle.getPropertyValue(key));
    }
    for (const key of ['color', 'font-family', 'font-size', 'font-weight', 'line-height', 'filter']) {
      clone.style.setProperty(key, sourceStyle.getPropertyValue(key));
    }
    // Computed SVG paint URLs can be absolute to the old route. Give the
    // handoff its own local IDs so gradients/clips survive that route unmount.
    const ids = new Map(Array.from(clone.querySelectorAll('[id]'), element => [element.id, `work-entry-${element.id}`]));
    [clone, ...clone.querySelectorAll('*')].forEach(element => {
      for (const attribute of Array.from(element.attributes)) {
        element.setAttribute(attribute.name, attribute.value.replace(/url\(["']?[^#)]*#([^"')]+)["']?\)/g,
          (_match, id: string) => `url(#${ids.get(id) ?? id})`));
      }
      if (ids.has(element.id)) element.id = ids.get(element.id)!;
    });
    const surface = document.createElement('div');
    surface.dataset.workEntry = '';
    surface.setAttribute('aria-hidden', 'true');
    surface.style.cssText = 'position:fixed;inset:0;z-index:10000;overflow:hidden;pointer-events:none';
    const backdrop = home.cloneNode(true) as HTMLElement;
    // Keep responsive layout CSS live; only freeze the idle translations.
    home.querySelectorAll<HTMLElement>('.stack-stage, .plane-art').forEach((element, i) => {
      const copy = backdrop.querySelectorAll<HTMLElement>('.stack-stage, .plane-art')[i]!;
      copy.style.animation = 'none';
      copy.style.translate = getComputedStyle(element).translate;
    });
    backdrop.inert = true;
    backdrop.querySelector<HTMLElement>('.work-plane')!.style.display = 'none';
    backdrop.style.cssText += ';position:absolute;inset:0;margin:0;width:100%;height:100%;pointer-events:none';
    clone.style.cssText += `;position:absolute;left:${bounds.left}px;top:${bounds.top}px;width:${bounds.width}px;height:${bounds.height}px;margin:0;animation:none;transition:none;translate:none;transform:none;overflow:visible;transform-origin:${face.left + face.width / 2 - bounds.left}px ${face.top + face.height / 2 - bounds.top}px`;
    surface.append(backdrop, clone);
    document.body.append(surface);
    const oldVisibility = source.style.visibility;
    const oldHomeVisibility = home.style.visibility;
    source.style.visibility = 'hidden';
    home.style.visibility = 'hidden';
    const oldInert = home.inert;
    home.inert = true;
    let finished = false;
    let ready = false;
    let approached = false;
    let revealing = false;
    let timeline: gsap.core.Timeline;
    let reveal: gsap.core.Timeline | undefined;
    let timeout: ReturnType<typeof setTimeout>;
    let unhook = () => {};
    let removeAfter = () => {};
    let removeError = () => {};
    return await new Promise<boolean>((resolve) => {
      const cleanup = (success = false) => {
        if (finished) return;
        finished = true;
        timeline?.kill();
        reveal?.kill();
        clearTimeout(timeout);
        unhook();
        removeAfter();
        removeError();
        window.removeEventListener('popstate', abort);
        window.removeEventListener('resize', abort);
        surface.remove();
        source.style.visibility = oldVisibility;
        home.style.visibility = oldHomeVisibility;
        home.inert = oldInert;
        cancel = undefined;
        if (keyboard) {
          if (success) document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
          else if (source.isConnected) source.closest<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
        }
        resolve(success);
      };
      const abort = () => cleanup();
      cancel = abort;
      const handoff = () => {
        if (!ready || !approached || revealing || finished) return;
        revealing = true;
        // The page is mounted beneath the original material; no destination mockup.
        reveal = gsap.timeline({ onComplete: () => cleanup(true) })
          .to(backdrop, { opacity: 0, duration: .22, ease: 'power2.out' }, 0)
          .to(clone, { opacity: 0, duration: .28, ease: 'power2.inOut' }, .02);
      };
      unhook = nuxtApp.hook('page:finish', () => {
        if (router.currentRoute.value.path !== router.resolve(to).path) return;
        requestAnimationFrame(() => { ready = true; handoff(); });
      });
      removeAfter = router.afterEach((route, _from, failure) => {
        if (failure || route.path !== router.resolve(to).path) cleanup();
      });
      removeError = nuxtApp.hook('app:error', abort);
      window.addEventListener('popstate', abort, { once: true });
      window.addEventListener('resize', abort, { once: true });
      // Safety release for exceptional page lifecycle failures; never retain a blocker.
      timeout = setTimeout(abort, 8000);
      const rim = clone.querySelector('.plane-rim');
      timeline = gsap.timeline({ onComplete: () => { approached = true; handoff(); } });
      if (rim) timeline.to(rim, { strokeWidth: 4, duration: .08 }, 0).to(rim, { strokeWidth: 2.5, duration: .2 }, .08);
      timeline.to(backdrop, { opacity: .72, duration: .36, ease: 'power2.inOut' }, .06);
      timeline.to(clone, { scale: 1.12, y: -Math.min(18, face.height * .04), duration: .36, ease: 'power2.inOut' }, .06)
        .to(clone.querySelectorAll('foreignObject'), { opacity: 0, duration: .24, ease: 'power1.inOut' }, .14);
      // Push now: route loading and the approach run concurrently.
      router.push(to).then((failure) => { if (failure) cleanup(); }).catch(() => cleanup());
    });
  }
  return { provide: { workEntry: { enter } } };
});
