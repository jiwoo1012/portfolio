"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gnb, { type PageName } from "./Gnb";
import styles from "./Portfolio.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioShell({ active, children }: { active: PageName; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.to(progress.current, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: .2 } });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { y: 28, duration: .65, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-pixel-line]").forEach((element) => {
          gsap.from(element, { scaleX: 0, transformOrigin: "left", ease: "steps(12)", scrollTrigger: { trigger: element, start: "top 95%", end: "top 55%", scrub: .6 } });
        });
      }, root);
      return () => context.revert();
    });
    media.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
          gsap.to(element, { y: index % 2 ? -35 : 45, rotation: index % 2 ? 5 : -5, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top top", end: "bottom top", scrub: 1 } });
        });
        gsap.utils.toArray<HTMLElement>("[data-scroll-strip]").forEach((element) => {
          gsap.fromTo(element, { xPercent: 0 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
      }, root);
      return () => context.revert();
    });
    // Image loading or filter changes can change section positions.
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.revert(); };
  }, []);

  return (
    <div ref={root} className={styles.site} id="top">
      <a className={styles.skip} href="#main-content">본문으로 건너뛰기</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/home" className={styles.logo} aria-label="김지우 포트폴리오 홈"><span aria-hidden="true">✳</span>jiwoo<span className={styles.logoDot}>■</span></Link>
          <Gnb active={active} />
          <span className={styles.headerCaption}>THINK IN DETAIL.<br />BUILD WITH PURPOSE.</span>
        </div>
        <div className={styles.progress} ref={progress} aria-hidden="true" />
      </header>
      <main id="main-content" className={styles.container}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerMain}><Link href="/home" className={styles.logo}>jiwoo<span className={styles.logoDot}>■</span></Link><p>작은 디테일이 만드는, 더 나은 경험.</p><a href="#top">BACK TO TOP <span>↑</span></a></div>
        <div className={styles.footerBottom}><span>DESIGNED & BUILT BY KIM JIWOO</span><span>ONE PIXEL AT A TIME. <b>■ ■ ■</b></span></div>
      </footer>
    </div>
  );
}
