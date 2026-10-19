"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./selected-work.module.scss";

const title = "Selected Work";
type Phase = "drawing" | "opening" | "open" | "closing" | "closed";

export default function SelectedWork() {
  const button = useRef<HTMLButtonElement>(null);
  const toggle = useRef<() => void>(() => {});
  const [phase, setPhase] = useState<Phase>("drawing");

  useEffect(() => {
    const root = button.current!;
    const folder = root.querySelector("svg")!;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
    const paths = Array.from(root.querySelectorAll<SVGPathElement>("path"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let alive = true;
    let busy = true;
    let opened = false;
    let repeatTimer: ReturnType<typeof setInterval> | undefined;

    async function animate(element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
      const animation = element.animate(frames, { ...options, fill: "both" });
      animations.add(animation);
      try { await animation.finished; } catch { /* Unmount cancels pending animations. */ }
      animations.delete(animation);
      if (alive) {
        const last = frames[frames.length - 1];
        const style = (element as HTMLElement | SVGElement).style;
        for (const property of ["opacity", "transform", "strokeDashoffset"] as const) {
          if (last[property] !== undefined) style[property] = String(last[property]);
        }
      }
      animation.cancel();
    }

    async function fly(open: boolean) {
      busy = true;
      setPhase(open ? "opening" : "closing");
      const origin = folder.getBoundingClientRect();
      const ordered = open ? [...letters].reverse() : letters;
      await Promise.all(ordered.map((letter, index) => {
        // Layout stays in place; only the painted letter travels to/from the folder.
        const rect = letter.getBoundingClientRect();
        const x = origin.left + origin.width * .46 - (rect.left + rect.width / 2);
        const y = origin.top + origin.height * .6 - (rect.top + rect.height / 2);
        const height = Math.max(35, Math.min(75, Math.abs(x) * .36));
        const frames = Array.from({ length: 41 }, (_, frame) => {
          const t = frame / 40;
          const progress = open ? t : 1 - t;
          const lift = -4 * height * t * (1 - t);
          return {
            offset: t,
            transform: `translate(${x * (1 - progress)}px, ${y * (1 - progress) + lift}px) rotate(${(open ? -1 : 1) * 12 * Math.sin(Math.PI * t)}deg) scale(${.4 + .6 * progress})`,
            opacity: Math.min(1, progress * 7),
          };
        });
        if (reduced.matches) {
          letter.style.opacity = open ? "1" : "0";
          return Promise.resolve();
        }
        return animate(letter, frames, { duration: 680, delay: index * 85, easing: "linear" });
      }));
      if (!alive) return;
      // Clear transforms so the next flight uses the current font/layout coordinates.
      letters.forEach((letter) => { letter.style.transform = "none"; });
      opened = open;
      busy = false;
      setPhase(open ? "open" : "closed");
    }

    toggle.current = () => { if (!busy) void fly(!opened); };
    const finishMotion = () => { if (reduced.matches) animations.forEach((animation) => animation.finish()); };
    reduced.addEventListener("change", finishMotion);
    void (async () => {
      await document.fonts.ready;
      if (!alive) return;
      if (reduced.matches) paths.forEach((path) => { path.style.strokeDashoffset = "0"; });
      else await Promise.all(paths.map((path, index) => animate(path, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 520, delay: index * 200, easing: "ease-in-out" })));
      if (alive) await fly(true);
      if (alive) repeatTimer = setInterval(() => {
        if (!busy && !reduced.matches && !document.hidden) void fly(!opened);
      }, 4000);
    })();
    return () => {
      alive = false;
      clearInterval(repeatTimer);
      animations.forEach((animation) => animation.cancel());
      reduced.removeEventListener("change", finishMotion);
      toggle.current = () => {};
    };
  }, []);

  const busy = phase === "drawing" || phase === "opening" || phase === "closing";
  return <h1 className={styles.heading}>
    <button ref={button} type="button" className={styles.button} data-phase={phase} onClick={() => toggle.current()}
      aria-label={phase === "closed" ? "Selected Work 펼치기" : "Selected Work 접기"} aria-expanded={phase === "open" || phase === "opening"} aria-disabled={busy}>
      <svg className={styles.folder} viewBox="0 0 30 24" aria-hidden="true">
        <path pathLength="1" d="M3 20V5a2 2 0 0 1 2-2h7l3 3h10a2 2 0 0 1 2 2v2" />
        <path className={styles.folderFront} pathLength="1" d="M3 20 7 10h21l-5 10H3Z" />
      </svg>
      <span className={styles.letters} aria-hidden="true">{Array.from(title).map((letter, index) => <span key={index} data-letter={letter !== " " ? "" : undefined} className={letter === " " ? styles.space : styles.letter}>{letter === " " ? "\u00a0" : letter}</span>)}</span>
    </button>
  </h1>;
}
