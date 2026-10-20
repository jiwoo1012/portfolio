"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function AboutExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-introduction]",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        intro.fromTo("[data-intro-line]", { "--fill": "0%" }, {
          "--fill": "100%",
          duration: 1,
          stagger: 1,
          ease: "none",
        }).to({}, { duration: .5 });
        const track = root.current?.querySelector<HTMLElement>("[data-journey-track]");
        const paths = gsap.utils.toArray<SVGPathElement>("[data-journey-path]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-journey-dot]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-journey-card]");
        if (track) {
          // Use SVG pathLength units throughout. Non-scaling strokes change dash
          // distances under the responsive viewBox and leave visible gaps.
          gsap.set(paths, { attr: { "stroke-dasharray": "1 1", "stroke-dashoffset": 1 } });
          gsap.set(dots, { scale: 0, opacity: 0 });
          gsap.set(cards, { opacity: 0, x: -24 });
          const journey = gsap.timeline({
            scrollTrigger: {
              trigger: "[data-journey]",
              start: "top top",
              end: "bottom bottom",
              scrub: .3,
              invalidateOnRefresh: true,
            },
          });
          journey.fromTo("[data-journey-title]",
            { clipPath: "inset(0 100% 0 0)", x: -60 },
            { clipPath: "inset(0 0% 0 0)", x: 0, duration: .8, ease: "power2.out" })
            .to(paths[0], { attr: { "stroke-dashoffset": 0 }, duration: .6, ease: "none" })
            .to(dots[0], { scale: 1, opacity: 1, duration: .2 })
            .to(cards[0], { opacity: 1, x: 0, duration: .4 })
            .addLabel("pan")
            .to(track, {
              x: () => -(track.scrollWidth - (track.parentElement?.clientWidth ?? 0)),
              duration: 4.7, ease: "none",
            }, "pan")
            .to(paths[1], { attr: { "stroke-dashoffset": 0 }, duration: 1.3, ease: "none" }, "pan")
            .to(dots[1], { scale: 1, opacity: 1, duration: .2 }, "pan+=1.3")
            .to(cards[1], { opacity: 1, x: 0, duration: .4 }, "pan+=1.5")
            .addLabel("travel", "pan+=1.9")
            .to(paths[2], { attr: { "stroke-dashoffset": 0 }, duration: 2, ease: "none" }, "travel")
            .to(dots[2], { scale: 1, opacity: 1, duration: .2 }, "travel+=2")
            .to(cards[2], { opacity: 1, x: 0, duration: .4 }, "travel+=2.2")
            .to(paths[3], { attr: { "stroke-dashoffset": 0 }, duration: .6, ease: "none" })
            .to({}, { duration: .6 });
        }
      }, root);
      return () => context.revert();
    });
    let active = true;
    void document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => { active = false; media.revert(); };
  }, []);

  return <div ref={root} className={styles.page} id="top">{children}</div>;
}

