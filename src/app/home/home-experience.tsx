"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((photo) => {
          gsap.from(photo, { y: 25, duration: .8, ease: "power2.out", scrollTrigger: { trigger: photo, start: "top 94%", once: true } });
        });
      }, root);
      return () => context.revert();
    });
    media.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-desk-object]").forEach((element, index) => {
          gsap.to(element, { y: index === 0 ? 25 : -45, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top 15%", end: "bottom top", scrub: 1 } });
        });
      }, root);
      return () => context.revert();
    });
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.revert(); };
  }, []);
  return <div className={styles.home} id="top" ref={root}>{children}</div>;
}
