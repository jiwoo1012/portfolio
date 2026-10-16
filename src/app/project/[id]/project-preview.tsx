
"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { desktopCaptures, mobileCaptures } from "../project-captures";
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

  // JAJAK 모바일 미리보기 영상
  const isJajakMobile = id === "01" && device === "mobile";

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
          {isJajakMobile ? (
            <video
              key="jajak-mobile"
              src="/project/jajak/jajak_Mobile.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className={styles.mobileVideo}
              aria-label="JAJAK 모바일 서비스 시연 영상"
            />
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
