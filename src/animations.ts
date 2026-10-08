import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(1000, 16);
ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });

export function useCinematicMotion(root: RefObject<HTMLDivElement>, paused: boolean) {
  useLayoutEffect(() => {
    if (!root.current || paused) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add({ motion: '(prefers-reduced-motion: no-preference)', compact: '(max-width: 760px)' }, ({ conditions }) => {
        if (!conditions?.motion) return;
        const compact = Boolean(conditions.compact);
        const scrub = compact ? 0.7 : 0.95;
        const hero = gsap.timeline({ scrollTrigger: { trigger: '.video-hero', start: 'top top', end: compact ? '+=68%' : '+=88%', scrub, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
        hero
          .to('.hero-content', { y: compact ? -35 : -65, autoAlpha: 0, ease: 'power2.in' }, 0.08)
          .to('.hero-food', { scale: compact ? 1.24 : 1.45, x: compact ? 0 : 75, y: compact ? -24 : -75, rotation: compact ? 2 : 6, ease: 'power2.inOut' }, 0)
          .to('.hero-ingredients', { y: compact ? -25 : -45, autoAlpha: 0, ease: 'power1.in' }, 0.1)
          .to('.hero-scroll', { autoAlpha: 0, ease: 'power1.in' }, 0.1);

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element, index) => {
          if (element.classList.contains('hero-content') || element.classList.contains('hero-food')) return;
          gsap.from(element, { y: compact ? 22 : 38, autoAlpha: 0, duration: compact ? .55 : .8, delay: index % 2 ? .04 : 0, ease: 'power2.out', scrollTrigger: { trigger: element, start: compact ? 'top 92%' : 'top 86%', once: true, fastScrollEnd: true } });
        });
        gsap.to('.plate-card:nth-child(1)', { y: compact ? -15 : -34, ease: 'none', scrollTrigger: { trigger: '.plate-grid', start: 'top bottom', end: 'bottom top', scrub: .8 } });
        gsap.to('.plate-card:nth-child(2)', { y: compact ? 12 : 30, ease: 'none', scrollTrigger: { trigger: '.plate-grid', start: 'top bottom', end: 'bottom top', scrub: .9 } });
        gsap.to('.plate-card:nth-child(3)', { y: compact ? -8 : -24, ease: 'none', scrollTrigger: { trigger: '.plate-grid', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.to('.story-food', { y: compact ? -18 : -48, rotation: compact ? 1 : 4, ease: 'none', scrollTrigger: { trigger: '.story-section', start: 'top bottom', end: 'bottom top', scrub } });
        gsap.to('.story-copy', { y: compact ? 10 : -24, ease: 'none', scrollTrigger: { trigger: '.story-section', start: 'top bottom', end: 'bottom top', scrub: scrub + .1 } });
        gsap.to('.newsletter-bowl', { y: compact ? -18 : -34, rotation: 5, ease: 'none', scrollTrigger: { trigger: '.newsletter', start: 'top bottom', end: 'bottom top', scrub: .85 } });
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const observer = new ResizeObserver(() => requestAnimationFrame(refresh));
    observer.observe(root.current);
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => { window.removeEventListener('load', refresh); observer.disconnect(); media.revert(); context.revert(); };
  }, [root, paused]);
}
