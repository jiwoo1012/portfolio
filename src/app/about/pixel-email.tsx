"use client";

import { emailComposeUrl } from "@/lib/email-link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./about.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function PixelEmail({ email }: { email: string }) {
  const link = useRef<HTMLAnchorElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const element = canvas.current;
    const anchor = link.current;
    const section = anchor?.closest<HTMLElement>("[data-contact]");
    const context = element?.getContext("2d");
    if (!element || !anchor || !context || !section) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const width = 1200;
      const height = 440;
      element.width = width;
      element.height = height;
      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const ink = sample.getContext("2d");
      if (!ink) return;
      ink.font = "bold 78px monospace";
      const fontSize = Math.min(78, 78 * (width - 80) / ink.measureText(email).width);
      ink.font = `bold ${fontSize}px monospace`;
      ink.textAlign = "center";
      ink.textBaseline = "middle";
      ink.fillText(email, width / 2, height / 2);
      const pixels = ink.getImageData(0, 0, width, height).data;
      const targets: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
          if (pixels[(y * width + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      // A deterministic shuffle disperses letters throughout the initial pixel field.
      let seed = 1012;
      const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [targets[i], targets[j]] = [targets[j], targets[i]];
      }
      const columns = Math.ceil(Math.sqrt(targets.length * 1.65));
      const rows = Math.ceil(targets.length / columns);
      const particles = targets.map((target, index) => ({
        ...target,
        startX: 350 + (index % columns) / columns * 500,
        startY: 65 + Math.floor(index / columns) / rows * 310,
        bend: (random() - .5) * 170,
        shade: .45 + random() * .55,
      }));
      const state = { progress: 0 };
      const draw = () => {
        const progress = state.progress;
        // Finish with real text so the address stays crisp even on narrow/high-DPI screens.
        anchor.style.setProperty("--email-opacity", String(Math.max(0, Math.min(1, (progress - .85) / .15))));
        context.clearRect(0, 0, width, height);
        particles.forEach((particle) => {
          const x = particle.startX + (particle.x - particle.startX) * progress;
          const y = particle.startY + (particle.y - particle.startY) * progress + Math.sin(progress * Math.PI) * particle.bend;
          context.fillStyle = `rgba(234,248,253,${particle.shade + (1 - particle.shade) * progress})`;
          const size = 3 + (1 - progress) * 1.2;
          context.fillRect(x, y, size, size);
        });
      };
      anchor.dataset.ready = "true";
      draw();
      const tween = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
      });
      tween.to(state, { progress: 1, duration: .75, ease: "none", onUpdate: draw })
        .to(state, { progress: 1, duration: .25, onUpdate: draw });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); delete anchor.dataset.ready; anchor.style.removeProperty("--email-opacity"); };
    });
    return () => media.revert();
  }, [email]);

  return <a ref={link} className={styles.pixelEmail} href={emailComposeUrl(email)} aria-label={`${email}로 이메일 보내기`}>
    <span className={styles.emailVisual}>
      <canvas ref={canvas} aria-hidden="true" />
      <span className={styles.emailFallback}>{email}</span>
    </span>
    <span className={styles.emailAction}>LET’S MAKE SOMETHING GOOD TOGETHER <span aria-hidden="true">↗</span></span>
  </a>;
}
