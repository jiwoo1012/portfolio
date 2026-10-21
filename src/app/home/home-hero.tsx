"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./hero.module.scss";

const keywords = ["OBSERVATION", "PRINCIPLE", "CONNECTION", "EXECUTION", "INITIATIVE"];
const alphabet = keywords.join("").split("");
const roleTitle = "WEB PUBLISH";
const scatteredLetters = Array.from({ length: 20 }, (_, index) => {
  const sourceIndex = Math.floor(index * alphabet.length / 20);
  return { letter: alphabet[sourceIndex], sourceIndex };
});
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const logo = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = root.current!;
    const mark = logo.current!;
    const stage = section.querySelector<HTMLElement>("[data-stage]")!;
    const track = section.querySelector<HTMLElement>("[data-track]")!;
    const mask = section.querySelector<HTMLElement>("[data-mask]")!;
    const statements = Array.from(section.querySelectorAll<HTMLElement>("[data-statement]"));
    const introduction = section.querySelector<HTMLElement>("[data-introduction]")!;
    const emphasis = section.querySelector<HTMLElement>("[data-emphasis]")!;
    const role = section.querySelector<HTMLElement>("[data-role]")!;
    const targets = Array.from(role.querySelectorAll<HTMLElement>("[data-target]"));
    const bounce = gsap.parseEase("elastic.out(1.15, 0.38)");
    const particles = Array.from(section.querySelectorAll<HTMLElement>("[data-particle]"));
    const sources = Array.from(section.querySelectorAll<HTMLElement>("[data-source]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reactions = new Map<Element, gsap.core.Timeline>();
    let starts: { x: number; y: number }[] | null = null;
    let progress = 0;
    let assembly = 0;
    let frame = 0;
    let alive = true;
    let lastPointer: { x: number; y: number } | null = null;
    let bounceTimer: ReturnType<typeof setTimeout> | undefined;

    function stopBounce() {
      clearTimeout(bounceTimer);
      emphasis.removeAttribute("data-bouncing");
    }

    function queueBounce() {
      stopBounce();
      bounceTimer = setTimeout(() => {
        const bounds = section.getBoundingClientRect();
        if (alive && assembly === 1 && bounds.bottom >= stage.clientHeight && !reduced.matches) {
          emphasis.dataset.bouncing = "true";
        }
      }, 220);
    }

    function capture() {
      track.style.animationPlayState = "paused";
      const bounds = stage.getBoundingClientRect();
      starts = particles.map((_, index) => {
        const sourceIndex = scatteredLetters[index].sourceIndex;
        const copies = [sources[sourceIndex], sources[sourceIndex + alphabet.length]];
        const rect = copies.map((letter) => letter.getBoundingClientRect())
          .sort((a, b) => Math.abs(a.left + a.width / 2 - bounds.width / 2) - Math.abs(b.left + b.width / 2 - bounds.width / 2))[0];
        return { x: rect.left - bounds.left, y: rect.top - bounds.top };
      });
    }

    function render() {
      frame = 0;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const scrollDistance = Math.max(0, -section.getBoundingClientRect().top) / height;
      const sceneProgress = clamp(scrollDistance / 2.2);
      assembly = clamp((scrollDistance - 2.5) / 1.5);
      const merge = assembly * assembly * (3 - 2 * assembly);
      progress = clamp(sceneProgress / .4);
      const eased = progress * progress * (3 - 2 * progress);
      const mobile = width <= 600;
      const dockWidth = mobile ? 88 : 120;
      const dockX = width * (mobile ? .05 : .04) + dockWidth / 2;
      const dockY = mobile ? 37 : 45;
      const initialWidth = Math.min(width * .4, 480);
      mark.style.width = `${initialWidth + (dockWidth - initialWidth) * eased}px`;
      mark.style.left = `${width / 2 + (dockX - width / 2) * eased}px`;
      mark.style.top = `${height / 2 + (dockY - height / 2) * eased}px`;
      mask.style.opacity = String(1 - clamp(progress * 5));
      statements.forEach((line, index) => {
        const entrance = clamp((sceneProgress - .52 - index * .035) / .23);
        const slide = 1 - Math.pow(1 - entrance, 3);
        line.style.visibility = entrance > 0 && assembly < .4 ? "visible" : "hidden";
        line.style.opacity = String((reduced.matches ? Number(entrance > 0) : clamp(entrance * 4)) * (1 - clamp(assembly / .4)));
        line.style.transform = reduced.matches ? "none" : `translateX(${(index === 0 ? -1 : 1) * width * (1 - slide)}px)`;
      });
      const reveal = clamp((assembly - .4) / .6);
      introduction.style.visibility = reveal > 0 ? "visible" : "hidden";
      introduction.style.opacity = String(reduced.matches ? Number(reveal > 0) : clamp(reveal * 3));
      introduction.style.transform = reduced.matches ? "none" : `translateY(${100 * Math.pow(1 - reveal, 3)}px)`;
      const pop = clamp((assembly - .3) / .7);
      emphasis.style.transform = reduced.matches ? "none" : `translateY(${55 * (1 - bounce(pop))}px) scale(${.8 + .2 * bounce(pop)})`;
      if (assembly < 1 || reduced.matches) stopBounce();
      role.style.visibility = assembly > 0 ? "visible" : "hidden";
      role.style.opacity = String(reduced.matches ? Number(assembly > .5) : clamp((assembly - .86) / .14));
      if (assembly > 0) {
        reactions.forEach((timeline) => timeline.kill());
        reactions.clear();
        particles.forEach((letter) => gsap.set(letter.firstElementChild, { x: 0, y: 0, rotation: 0 }));
      }

      if (reduced.matches) {
        track.style.visibility = sceneProgress > .5 ? "hidden" : "visible";
        particles.forEach((letter) => { letter.style.visibility = "hidden"; });
        return;
      }
      if (progress === 0) {
        starts = null;
        track.style.animationPlayState = "running";
        track.style.visibility = "visible";
        particles.forEach((letter) => { letter.style.visibility = "hidden"; });
        return;
      }
      if (!starts) capture();
      track.style.visibility = "hidden";
      const fontSize = parseFloat(getComputedStyle(particles[0]).fontSize);
      const columns = Math.min(10, Math.max(1, Math.floor((width - 40) / (fontSize * 1.15))));
      const stageBounds = stage.getBoundingClientRect();
      const targetBounds = targets.map((target) => target.getBoundingClientRect());
      const targetScale = parseFloat(getComputedStyle(role).fontSize) / fontSize;
      particles.forEach((letter, index) => {
        const start = starts![index];
        const slot = index * 17 % scatteredLetters.length;
        const row = Math.floor(slot / columns);
        const column = slot % columns;
        const x = 20 + column * ((width - 40 - fontSize) / Math.max(1, columns - 1)) + (row % 2) * fontSize * .18;
        const y = height - 28 - fontSize * 1.2 - row * fontSize * 1.05 - (index % 4) * fontSize * .13;
        const delay = (index % 7) * .025;
        const fall = clamp((progress - delay) / (1 - delay));
        const gravity = fall * fall;
        const drift = fall * (2 - fall);
        const target = targetBounds[index];
        const glyph = letter.firstElementChild as HTMLElement;
        const finalLetter = roleTitle[index];
        glyph.textContent = assembly > .45 ? (finalLetter === " " ? "\u00a0" : finalLetter ?? "") : scatteredLetters[index].letter;
        const baseX = start.x + (x - start.x) * drift;
        const baseY = start.y + (y - start.y) * gravity;
        const endX = target ? target.left - stageBounds.left : width / 2;
        const endY = target ? target.top - stageBounds.top : height * .8;
        letter.style.visibility = assembly === 1 ? "hidden" : "visible";
        letter.style.opacity = String((1 - clamp((assembly - .86) / .14)) * (target ? 1 : 1 - merge));
        const gray = Math.round(8 + 154 * merge);
        letter.style.color = `rgb(${gray}, ${gray}, ${gray})`;
        letter.style.transform = `translate3d(${baseX + (endX - baseX) * merge}px, ${baseY + (endY - baseY) * merge}px, 0) rotate(${((index * 43 % 121) - 60) * fall * (1 - merge)}deg) scale(${(1 - .2 * fall) * (1 - merge) + targetScale * merge})`;
      });
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(render); }
    function onScroll() { schedule(); queueBounce(); }
    function resize() { starts = null; schedule(); queueBounce(); }
    function pointerMove(event: PointerEvent) {
      if (progress < .85 || assembly > 0 || reduced.matches || event.pointerType === "touch") return;
      const previous = lastPointer ?? { x: event.clientX, y: event.clientY };
      const dx = Math.max(-60, Math.min(60, (event.clientX - previous.x) * 2.4));
      const dy = Math.max(-48, Math.min(48, (event.clientY - previous.y) * 2.4));
      lastPointer = { x: event.clientX, y: event.clientY };
      particles.forEach((letter) => {
        const bounds = letter.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2));
        if (distance > 180) return;
        const strength = 1 - distance / 180;
        const glyph = letter.firstElementChild!;
        reactions.get(glyph)?.kill();
        reactions.set(glyph, gsap.timeline().to(glyph, { x: dx * strength, y: dy * strength, rotation: dx * strength * .7, duration: .16, ease: "power2.out" })
          .to(glyph, { x: 0, y: 0, rotation: 0, duration: 1.25, ease: "elastic.out(1.2, 0.4)" }));
      });
    }
    function pointerLeave() { lastPointer = null; }
    render();
    queueBounce();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", resize);
    stage.addEventListener("pointermove", pointerMove);
    stage.addEventListener("pointerleave", pointerLeave);
    void document.fonts.ready.then(() => { if (alive) resize(); });
    return () => {
      alive = false;
      stopBounce();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", resize);
      stage.removeEventListener("pointermove", pointerMove);
      stage.removeEventListener("pointerleave", pointerLeave);
      reactions.forEach((timeline) => timeline.kill());
    };
  }, []);

  return <>
    <section ref={root} className={styles.scrollScene} aria-labelledby="home-title">
      <div data-stage className={styles.hero}>
        <h1 id="home-title" className={styles.srOnly}>김지우 — 웹 퍼블리셔 포트폴리오</h1>
        <div className={styles.marquee} aria-hidden="true">
          <div data-track className={styles.track}>
            {[0, 1].map((copy) => <div className={styles.keywords} key={copy}>
              {keywords.map((word) => <span key={word}>{word.split("").map((letter, index) => <span data-source key={index}>{letter}</span>)}</span>)}
            </div>)}
          </div>
        </div>
        <div className={styles.particles} aria-hidden="true">
          {scatteredLetters.map(({ letter }, index) => <span data-particle className={styles.particle} key={index}><span>{letter}</span></span>)}
        </div>
        <div className={styles.statement}>
          <p data-statement>사용자의 불편으로부터</p>
          <p data-statement>개발의 문제까지</p>
        </div>
        <div data-introduction className={styles.introduction}>
          <p><span className={styles.accent}>해결의 <span data-emphasis className={styles.emphasis}><span>기준</span></span></span>을 만드는 개발자</p>
          <p>김지우입니다.</p>
        </div>
        <p data-role className={styles.roleTitle} aria-label={roleTitle}>
          {roleTitle.split("").map((letter, index) => <span data-target key={index} aria-hidden="true">{letter === " " ? "\u00a0" : letter}</span>)}
        </p>
        <div data-mask className={styles.logoMask} aria-hidden="true" />
        <p className={styles.srOnly}>{keywords.join(", ")}</p>
      </div>
    </section>
    <a ref={logo} className={styles.floatingLogo} href="#top" aria-label="홈 맨 위로">
      <Image src="/jiwooLOGO.svg" alt="JW" width={627} height={404} sizes="(max-width: 1200px) 40vw, 480px" preload />
    </a>
  </>;
}
