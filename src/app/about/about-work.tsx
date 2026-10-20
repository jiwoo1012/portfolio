"use client";

import { useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./about-work.module.scss";

type Work = { id: string; title: string; image: StaticImageData };

export default function AboutWork({ projects }: { projects: Work[] }) {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((index) => (index + direction + projects.length) % projects.length);
  const selected = projects[active];

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  }

  return (
    <section className={styles.work} aria-labelledby="work-title" aria-roledescription="캐러셀" onKeyDown={onKeyDown}>
      <h2 id="work-title">SEE MY WORK</h2>
      <div className={styles.carousel}>
        <div className={styles.deck}>
          {projects.map((project, index) => {
            const relative = (index - active + projects.length) % projects.length;
            const position = relative === 0 ? "center" : relative === 1 ? "right" : "left";
            return (
              <button key={project.id} type="button" className={styles.card} data-position={position}
                onClick={() => setActive(index)} aria-label={`${project.title} 선택`} aria-pressed={index === active}
                tabIndex={index === active ? 0 : -1}>
                <Image src={project.image} alt="" fill sizes="(max-width: 600px) 55vw, 440px" />
                <span>{project.title}</span>
              </button>
            );
          })}
        </div>
        <button type="button" className={`${styles.arrow} ${styles.previous}`} onClick={() => move(-1)} aria-label="이전 프로젝트">
          <svg viewBox="0 0 24 40" aria-hidden="true"><path d="M21 3 4 20l17 17" /></svg>
        </button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => move(1)} aria-label="다음 프로젝트">
          <svg viewBox="0 0 24 40" aria-hidden="true"><path d="m3 3 17 17L3 37" /></svg>
        </button>
      </div>
      <div className={styles.dots} aria-label="프로젝트 선택">
        {projects.map((project, index) => (
          <button key={project.id} type="button" aria-label={`${project.title} 보기`} aria-pressed={index === active}
            onClick={() => setActive(index)} />
        ))}
      </div>
      <p className={styles.srOnly} role="status">{selected.title}, {active + 1} / {projects.length}</p>
      <Link href={`/project/${selected.id}`} className={styles.projectLink} aria-label={`${selected.title} 프로젝트 보러가기`}>PROJECT 보러가기</Link>
    </section>
  );
}
