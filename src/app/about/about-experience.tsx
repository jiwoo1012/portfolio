"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function AboutExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const introLines = gsap.utils.toArray<HTMLElement>("[data-intro-line]");
        gsap.set(introLines, { "--fill": "0%" });
        gsap.to(introLines, {
          "--fill": "100%", stagger: 1, duration: 1, ease: "none",
          scrollTrigger: { trigger: "[data-intro-copy]", start: "top 80%", end: "bottom 40%", scrub: true },
        });

        const lines = gsap.utils.toArray<HTMLElement>("[data-fill-line]");
        gsap.set(lines, { "--fill": "0%" });
        gsap.to(lines, {
          "--fill": "100%", stagger: 1, duration: 1, ease: "none",
          scrollTrigger: { trigger: "[data-statement]", start: "top top", end: "bottom bottom", scrub: true },
        });

        const cards = gsap.utils.toArray<HTMLElement>("[data-detail-card]");
        const stack = root.current?.querySelector<HTMLElement>("[data-card-stack]");
        if (stack) {
          // CSS sticky owns the stage; only the cards move, so resizing never changes document flow.
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: stack, start: "top top", end: "bottom bottom", scrub: .65, invalidateOnRefresh: true },
          });
          gsap.set(cards.slice(1), { y: () => window.innerHeight * 1.15 });
          cards.slice(1).forEach((card, index) => {
            timeline.to(cards[index], { scale: 1 - (cards.length - index - 1) * .025, duration: 1, ease: "none" }, index)
              .to(card, { y: 0, duration: 1, ease: "none" }, index);
          });
          timeline.to({}, { duration: .3 });
        }
      }, root);
      return () => context.revert();
    });
    let active = true;
    void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, []);

  return <div ref={root} className={styles.page} id="top">{children}</div>;
}
