"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { desktopCaptures, mobileCaptures, mobileVideos } from "../project-captures";
import ProjectImageTransition from "../project-image-transition";
import styles from "./project-preview.module.scss";

export default function ProjectPreview({
  id,
  title,
  fallback,
}: {
  id: string;
  title: string;
  fallback: StaticImageData;
}) {
  const [device, setDevice] = useState<"pc" | "mobile">("pc");

  const capture =
    device === "pc" ? desktopCaptures[id] : mobileCaptures[id];

  const image = capture ?? (device === "pc" ? fallback : undefined);

  const mobileVideo = device === "mobile" ? mobileVideos[id] : undefined;

  return (
    <div className={styles.preview}>
      <div
        className={styles.toolbar}
        role="group"
        aria-label="프로젝트 화면 기기 선택"
      >
        <button
          type="button"
          aria-pressed={device === "pc"}
          onClick={() => setDevice("pc")}
        >
          PC
        </button>

        <button
          type="button"
          aria-pressed={device === "mobile"}
          onClick={() => setDevice("mobile")}
        >
          Mobile
        </button>
      </div>

      <ProjectImageTransition id={id}>
        <figure
          className={`${styles.frame} ${
            device === "mobile" ? styles.mobile : ""
          }`}
          aria-label={`${title} ${
            device === "pc" ? "PC" : "모바일"
          } 미리보기`}
        >
          {mobileVideo ? (
            <video
              key={mobileVideo}
              src={mobileVideo}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className={styles.mobileVideo}
              aria-label={`${title} 모바일 서비스 시연 영상`}
            >
              영상을 재생할 수 없습니다. <a href={mobileVideo}>영상 파일 열기</a>
            </video>
          ) : image ? (
            <Image
              key={device}
              src={image}
              alt={`${title} ${
                device === "pc" ? "PC" : "모바일"
              } 전체 화면`}
              fill
              sizes={
                device === "pc"
                  ? "(max-width: 700px) 90vw, 58vw"
                  : "280px"
              }
              preload
              className={capture ? styles.scrolling : undefined}
            />
          ) : (
            <figcaption className={styles.pending}>
              <span>Mobile</span>
              모바일 캡처 준비 중
            </figcaption>
          )}
        </figure>
      </ProjectImageTransition>
    </div>
  );
}

