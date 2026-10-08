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
          desktop: '(min-width: 1200px)',
          tablet: '(min-width: 800px) and (max-width: 1199px)',
          compact: '(max-width: 520px)',
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;
          const desktop = conditions.desktop;
          const compact = conditions.compact;
          const scrollEase = desktop ? 1.05 : compact ? 0.72 : 0.9;
          const exteriorScale = desktop ? 2.8 : compact ? 1.72 : 1.95;
          const interiorScale = desktop ? 1.23 : compact ? 1.13 : 1.17;
          const entrance = gsap.timeline({
            scrollTrigger: {
              trigger: '.entrance',
              start: 'top top',
              end: 'bottom bottom',
              scrub: scrollEase,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
          entrance
            .to('.hero-copy', { y: -55, autoAlpha: 0, duration: 0.2, ease: 'power1.in' }, 0)
            .to('.hero-bottom', { autoAlpha: 0, duration: 0.12 }, 0)
            .to(
              '.exterior-layer',
              { scale: exteriorScale, duration: 0.48, ease: 'power2.inOut' },
              0,
            )
            .to('.door-shadow', { opacity: 0.95, duration: 0.14 }, 0.29)
            .to('.exterior-layer', { opacity: 0, duration: 0.1 }, 0.37)
            .fromTo(
              '.interior-layer',
              { opacity: 0, scale: compact ? 1.08 : 1.13 },
              { opacity: 1, scale: 1, duration: 0.25 },
              0.38,
            )
            .to('.door-shadow', { opacity: 0, duration: 0.17 }, 0.43)
            .fromTo(
              '.inside-copy',
              { y: 36, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.18 },
              0.48,
            )
            .to(
              '.interior-layer',
              { scale: interiorScale, duration: 0.33, ease: 'power1.inOut' },
              0.66,
            )
            .to('.inside-copy', { opacity: 0, y: -30, duration: 0.15 }, 0.78)
            .fromTo(
              '.plate-portal',
              { scale: 0 },
              { scale: 1, duration: 0.25, ease: 'power2.inOut' },
              0.75,
            )
            .fromTo(
              '.transition-platter',
              { opacity: 0, scale: 0.35, rotation: -15, yPercent: 30 },
              { opacity: 1, scale: 1.12, rotation: -4, yPercent: 0, duration: 0.18 },
              0.8,
            )
            .to('.transition-platter', { opacity: 0, scale: 1.45, duration: 0.12 }, 0.99);

          gsap.fromTo(
            '.taste-platter',
            { y: 65, rotation: -13 },
            {
              y: -25,
              rotation: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: '.taste',
                start: 'top bottom',
                end: 'bottom top',
                scrub: scrollEase,
                invalidateOnRefresh: true,
              },
            },
          );
          gsap.utils.toArray<HTMLElement>('.botanical').forEach((leaf, i) => {
            gsap.to(leaf, {
              y: i % 2 ? -65 : 60,
              rotation: i % 2 ? 23 : -18,
              ease: 'none',
              scrollTrigger: {
                trigger: '.taste',
                start: 'top bottom',
                end: 'bottom top',
                scrub: desktop ? 1.15 : 0.9,
                invalidateOnRefresh: true,
              },
            });
          });
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
            gsap.from(element, {
              y: 32,
              autoAlpha: 0,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 93%',
                once: true,
                fastScrollEnd: true,
              },
            });
          });
          gsap.fromTo(
            '.kitchen-inner',
            { clipPath: compact ? 'circle(18% at 50% 0%)' : 'circle(12% at 50% 0%)' },
            {
              clipPath: compact ? 'circle(125% at 50% 0%)' : 'circle(150% at 50% 0%)',
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: '.kitchen',
                start: 'top 90%',
                end: 'top 10%',
                scrub: desktop ? 0.72 : 0.55,
                invalidateOnRefresh: true,
              },
            },
          );
          gsap.fromTo(
            '.kitchen-background',
            { scale: 1.04, yPercent: -4 },
            {
              scale: 1.16,
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: '.kitchen',
                start: 'top bottom',
                end: 'bottom top',
                scrub: scrollEase,
                invalidateOnRefresh: true,
              },
            },
          );
          if (desktop) {
            gsap.to('.gallery-item:nth-child(even)', {
              y: -45,
              ease: 'none',
              scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top bottom',
                end: 'bottom top',
                scrub: desktop ? 1 : 0.8,
                invalidateOnRefresh: true,
              },
            });
          }
          gsap.to('.page-progress', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.18, invalidateOnRefresh: true },
          });
        },
      );
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(refresh));
    const menu = root.current.querySelector('.menu-list');
    if (menu) resizeObserver.observe(menu);
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      resizeObserver.disconnect();
      media.revert();
      context.revert();
    };
  }, [root, paused]);
}
