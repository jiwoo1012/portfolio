"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeSections } from "../about/profile";
import styles from "./home-about.module.scss";

gsap.registerPlugin(ScrollTrigger);
const chapters = [
  { title: "Education", section: resumeSections[0] },
  { title: "Activities", section: resumeSections[2] },
  { title: "Awards", section: resumeSections[3] },
];

export default function HomeAbout() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current!;
    const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-chapter]"));
    const fill = section.querySelector<HTMLElement>("[data-progress]")!;
    const home = section.closest<HTMLElement>("#top")!;
    const media = gsap.matchMedia();
    media.add("(min-width: 701px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 60 });
        panels.forEach((panel, index) => {
          panel.inert = index !== 0;
          panel.setAttribute("aria-hidden", String(index !== 0));
        });
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: section, start: "top top", end: "bottom bottom",
          scrub: .45,
          snap: { snapTo: [0, .5, 1], directional: true, delay: .15, duration: { min: .4, max: .8 }, ease: "power3.inOut" },
          onUpdate: (trigger) => {
            const active = Math.round(trigger.progress * 2);
            panels.forEach((panel, index) => {
              panel.inert = index !== active;
              panel.setAttribute("aria-hidden", String(index !== active));
            });
          },
        } });
        timeline.to(panels[0], { autoAlpha: 0, y: -45, duration: .3 }, .1)
          .to(panels[1], { autoAlpha: 1, y: 0, duration: .5, ease: "power2.out" }, .35)
          .to(panels[1], { autoAlpha: 0, y: -45, duration: .3 }, 1.1)
          .to(panels[2], { autoAlpha: 1, y: 0, duration: .5, ease: "power2.out" }, 1.35)
          .fromTo(fill, { scaleY: 1 / 3 }, { scaleY: 1, duration: 2, ease: "none" }, 0);
      }, section);
      return () => {
        context.revert();
        panels.forEach((panel) => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
      };
    });
    const updateNavigation = () => {
      const bounds = section.getBoundingClientRect();
      home.style.setProperty("--home-nav-ink", bounds.top <= 60 && bounds.bottom > 60 ? "#ece5db" : "#090909");
    };
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    return () => {
      media.revert();
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
      home.style.removeProperty("--home-nav-ink");
    };
  }, []);

  return <section id="about" ref={root} className={styles.aboutScene} aria-labelledby="about-title">
    <div className={styles.stage}>
      <h2 id="about-title" className={styles.heading}>ABOUT ME</h2>
      <div className={styles.rail} aria-hidden="true"><span data-progress /></div>
      <div className={styles.chapters}>
        {chapters.map(({ title, section }) => <article data-chapter className={styles.chapter} key={section.id} aria-labelledby={`home-${section.id}`}>
          <h3 id={`home-${section.id}`}>{title}</h3>
          <div className={styles.entries}>{section.entries.map((entry) => <div className={styles.entry} key={entry.title}>
            <p className={styles.period}>{entry.period}</p>
            <h4>{entry.title}{entry.badge && <span className={styles.badge}>{entry.badge}</span>}</h4>
            {entry.organization && <p>{entry.organization}</p>}
            {entry.highlights && <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
            {entry.description && <p>{entry.description}</p>}
          </div>)}</div>
        </article>)}
      </div>
    </div>
  </section>;
}
