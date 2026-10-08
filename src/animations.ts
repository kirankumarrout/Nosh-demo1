import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(1000, 16);
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

export function useCinematicMotion(root: RefObject<HTMLDivElement>, paused: boolean) {
  useLayoutEffect(() => {
    if (!root.current || paused) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          compact: '(max-width: 600px)',
          desktop: '(min-width: 1200px)',
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;
          const compact = Boolean(conditions.compact);
          const desktop = Boolean(conditions.desktop);
          const scrub = desktop ? 1.05 : compact ? 0.72 : 0.9;
          const hero = gsap.timeline({
            scrollTrigger: {
              trigger: '.hero-pin',
              start: 'top top',
              end: compact ? '+=92%' : '+=116%',
              scrub,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          hero
            .to('.hero-copy', { y: compact ? -34 : -62, autoAlpha: 0, ease: 'power2.in' }, 0.08)
            .to('.hero-dish', { scale: compact ? 1.2 : desktop ? 1.55 : 1.38, x: compact ? 0 : 72, y: compact ? -22 : -88, rotation: compact ? 3 : 7, ease: 'power2.inOut' }, 0)
            .to('.hero-orbit', { scale: compact ? 1.18 : 1.5, rotation: 38, ease: 'power1.inOut' }, 0)
            .to('.ingredient', { y: (i) => (i % 2 ? -74 : 74), x: (i) => (i % 2 ? 24 : -24), autoAlpha: 0, stagger: 0.03, ease: 'power1.inOut' }, 0.12)
            .to('.hero-scroll, .hero-page', { autoAlpha: 0, ease: 'power1.in' }, 0.08);

          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element, index) => {
            gsap.from(element, {
              y: compact ? 20 : 34,
              autoAlpha: 0,
              duration: compact ? 0.55 : 0.8,
              delay: index % 2 ? 0.03 : 0,
              ease: 'power2.out',
              scrollTrigger: { trigger: element, start: compact ? 'top 92%' : 'top 88%', once: true, fastScrollEnd: true },
            });
          });

          gsap.to('.story-plate', {
            y: compact ? -28 : -80,
            rotation: compact ? 2 : 6,
            ease: 'none',
            scrollTrigger: { trigger: '.dish-story', start: 'top bottom', end: 'bottom top', scrub, invalidateOnRefresh: true },
          });
          gsap.to('.story-copy', {
            y: compact ? 20 : -22,
            ease: 'none',
            scrollTrigger: { trigger: '.dish-story', start: 'top bottom', end: 'bottom top', scrub: scrub + 0.1 },
          });
          gsap.utils.toArray<HTMLElement>('.space-photo').forEach((photo, index) => gsap.to(photo, {
            y: index === 1 ? -35 : 20,
            ease: 'none',
            scrollTrigger: { trigger: '.space-collage', start: 'top bottom', end: 'bottom top', scrub: compact ? 0.7 : 1 },
          }));
          gsap.to('.visit-card', {
            y: compact ? -12 : -35,
            rotation: compact ? 0 : 2,
            ease: 'none',
            scrollTrigger: { trigger: '.visit-section', start: 'top bottom', end: 'bottom top', scrub: 0.9 },
          });
          gsap.to('.page-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.18 } });
        },
      );
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const observer = new ResizeObserver(() => requestAnimationFrame(refresh));
    observer.observe(root.current);
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      observer.disconnect();
      media.revert();
      context.revert();
    };
  }, [root, paused]);
}
