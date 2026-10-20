"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectDetail } from "../project-details";
import styles from "./scrolling-capture.module.scss";

type Capture = NonNullable<ProjectDetail["implementations"]>[number]["images"][number];

export default function ScrollingCapture({ shot }: { shot: Capture }) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return <figure ref={root} className={styles.capture}>
    <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`${shot.title} 원본 이미지 열기`}>
      <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 700px) 90vw, 55vw"
        onLoad={() => setLoaded(true)}
        style={{
          animationDuration: `${Math.max(16, shot.height / shot.width * 10)}s`,
          animationPlayState: visible && loaded && !paused ? "running" : "paused",
        }} />
    </a>
    <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
      {paused ? "자동 스크롤 재생" : "자동 스크롤 일시정지"}
    </button>
  </figure>;
}
