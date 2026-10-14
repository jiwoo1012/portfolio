"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projects";
import styles from "./page.module.scss";

gsap.registerPlugin(ScrollTrigger);
const thumbnails = projects.filter((project) => project.category !== "design").slice(0, 6);

export default function ProjectIntro() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true,
        } });
        timeline.fromTo("[data-project-rail='left']", { yPercent: -22 }, { yPercent: 12, ease: "none", duration: 1 }, 0)
          .fromTo("[data-project-rail='right']", { yPercent: 12 }, { yPercent: -22, ease: "none", duration: 1 }, 0)
          .to("[data-project-rail]", { opacity: 0, duration: .12 }, .88);
      }, root);
      return () => context.revert();
    });
    let alive = true;
    void document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh(); });
    return () => { alive = false; media.revert(); };
  }, []);

  return <section ref={root} className={styles.projectIntro} aria-labelledby="project-title">
    <div className={styles.introStage}>
      {(["left", "right"] as const).map((side, column) => <div className={`${styles.thumbnailRail} ${column ? styles.rightRail : styles.leftRail}`} data-project-rail={side} key={side} aria-hidden="true">
        {thumbnails.filter((_, index) => index % 2 === column).map((project, index) => <div className={styles.floatingThumbnail} key={project.id}>
          <Image src={project.image} alt="" fill sizes="(max-width: 700px) 38vw, 30vw" priority={index === 1} />
          <span>{project.title}</span>
        </div>)}
      </div>)}
      <h1 id="project-title">PROJECTS</h1>
      <a className={styles.introScroll} href="#works">SCROLL<span aria-hidden="true">↓</span></a>
    </div>
  </section>;
}
