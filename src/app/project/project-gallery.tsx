"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "./projects";
import styles from "./page.module.scss";
import archive from "./archive.module.scss";
import contactStyles from "./archive-contact.module.scss";
import HomeHeader from "@/components/HomeHeader";
import SelectedWork from "./selected-work";
import DraggableProjectRow from "./draggable-project-row";
import ProjectImageTransition from "./project-image-transition";
import { projectDetails } from "./project-details";
import { backendProjectOrder, projectToolIcons, projectTools } from "./project-tools";
import vintage from "../home/page.module.scss";
import { desktopCaptures as hoverCaptures } from "./project-captures";

const categories = [
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "design", label: "DESIGN & VIDEO" },
];

export default function ProjectGallery({ category }: { category: string }) {
  useEffect(() => {
    if (categories.some((item) => item.id === category)) {
      document.getElementById(category)?.scrollIntoView({ behavior: "instant" });
    }
  }, [category]);
  function scrollRow(id: string, direction: number) {
    const row = document.getElementById(`${id}-row`);
    row?.scrollBy({ left: direction * row.clientWidth * .8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const [selected, setSelected] = useState<Project | null>(null);
  const [contactClicked, setContactClicked] = useState(false);
  const [slide, setSlide] = useState(0);
  const slides = selected ? selected.gallery ?? [selected.image] : [];
  const currentImage = slides[slide];
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openPreview(project: Project) {
    setSlide(0);
    setSelected(project);
  }

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <div className={archive.page} id="top">
      <a className={vintage.skip} href="#works">작업 목록으로 건너뛰기</a>
      <HomeHeader active="project" contactHref="#project-contact" />
      <main id="works" className={archive.main}>
        <SelectedWork />
        {categories.map((category, categoryIndex) => {
          const items = projects.filter((project) => project.category === category.id);
          if (category.id === "backend") items.sort((a, b) => {
            const rank = (id: string) => { const index = backendProjectOrder.indexOf(id); return index < 0 ? backendProjectOrder.length : index; };
            return rank(a.id) - rank(b.id);
          });
          return <section id={category.id} className={archive.collection} key={category.id} aria-labelledby={`${category.id}-title`}>
            <div className={archive.sectionHeading}><h2 id={`${category.id}-title`}>{category.label}</h2><div className={archive.rowControls}>{categoryIndex === 0 && <p>이미지를 누르면 프로젝트를 자세히 볼 수 있어요.</p>}<button type="button" onClick={() => scrollRow(category.id, -1)} aria-label={`${category.label} 이전 작업`} aria-controls={`${category.id}-row`}>←</button><button type="button" onClick={() => scrollRow(category.id, 1)} aria-label={`${category.label} 다음 작업`} aria-controls={`${category.id}-row`}>→</button></div></div>
            <DraggableProjectRow id={`${category.id}-row`} label={category.label}>
              {items.map((project) => {
                const siteUrl = projectDetails[project.id]?.siteUrl || project.siteUrl || project.youtube?.url;
                const content = <><ProjectImageTransition id={project.id}><div className={archive.thumbnail}>
                  <Image src={project.image} alt={`${project.title} 대표 화면`} fill sizes="(max-width: 700px) 68vw, 27vw" />
                  {hoverCaptures[project.id] && <Image className={archive.hoverCapture} src={hoverCaptures[project.id]!} alt="" aria-hidden="true" fill sizes="(max-width: 700px) 68vw, 27vw" />}
                  {project.youtube && <span className={archive.playIcon} aria-hidden="true">▶</span>}
                  <ProjectTags project={project} />
                </div></ProjectImageTransition><div className={archive.cardInfo}><div><h3>{project.id === "01" ? "JAJAK" : project.title}</h3><p>{project.description}</p></div></div></>;
                return <article key={project.id} className={archive.card}>{project.category === "design" ? <button type="button" className={archive.cardLink} onClick={() => openPreview(project)} aria-label={`${project.title} ${project.youtube ? "영상 재생" : "카드뉴스 보기"}`} aria-haspopup="dialog">{content}</button> : <Link className={archive.cardLink} href={`/project/${project.id}`} aria-label={`${project.title} 상세 보기`}>{content}</Link>}{siteUrl ? <a className={archive.arrow} href={siteUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} 사이트 바로가기 (새 탭)`} title="사이트 바로가기">↗</a> : null}</article>;
              })}
            </DraggableProjectRow>
          </section>;
        })}
      </main>
      <footer className={contactStyles.footer} id="project-contact">
        <div className={contactStyles.inner}>
          <p className={contactStyles.heading}><span>Let’s Build</span><span>What’s Next</span></p>
          <a className={contactStyles.link} href="#project-contact" aria-haspopup="dialog" data-clicked={contactClicked}
            onClick={(event) => { event.preventDefault(); setContactClicked(true); window.dispatchEvent(new Event("open-contact-invitation")); }} onMouseLeave={() => setContactClicked(false)} onBlur={() => setContactClicked(false)}>
            <span className={contactStyles.arrow} aria-hidden="true"><svg viewBox="0 0 80 64" fill="none"><path d="M72 32H8m24-24L8 32l24 24" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <span className={contactStyles.text}>Let’s <em>Contact!</em></span>
          </a>
        </div>
      </footer>

      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="preview-title" onClose={() => setSelected(null)}
        onKeyDown={(event) => {
          if (selected?.gallery && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
            event.preventDefault();
            setSlide((index) => Math.max(0, Math.min(slides.length - 1, index + (event.key === "ArrowRight" ? 1 : -1))));
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        {selected && <div className={styles.dialogContent}>
          <div className={styles.dialogHeader}><span>PROJECT / {selected.id}</span><button autoFocus onClick={() => dialogRef.current?.close()} aria-label="미리보기 닫기">닫기 ×</button></div>
          {selected.youtube ? <div className={styles.videoPlayer}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selected.youtube.id}?start=${selected.youtube.start}&rel=0`}
              title={selected.youtube.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div> : <div className={`${styles.dialogImage} ${selected.gallery ? styles.galleryImage : ""}`}>
            <Image src={currentImage} alt={`${selected.title}${selected.gallery ? ` 카드뉴스 ${slide + 1} / ${slides.length}` : " 전체 미리보기"}`} width={currentImage.width} height={currentImage.height} sizes={selected.gallery ? "(max-width: 600px) 85vw, 600px" : "90vw"} />
          </div>}
          {selected.gallery && <div className={styles.galleryControls}>
            <div className={styles.galleryPagination}>
              <button type="button" onClick={() => setSlide((index) => index - 1)} disabled={slide === 0} aria-label="이전 카드">← 이전</button>
              <span aria-live="polite">{String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSlide((index) => index + 1)} disabled={slide === slides.length - 1} aria-label="다음 카드">다음 →</button>
            </div>
            <div className={styles.thumbnails} aria-label="카드 선택">
              {slides.map((image, index) => <button key={image.src} type="button" aria-label={`${index + 1}번 카드 보기`} aria-pressed={slide === index} onClick={() => setSlide(index)}>
                <Image src={image} alt="" width={56} height={70} sizes="56px" />
              </button>)}
            </div>
            <a href={currentImage.src} target="_blank" rel="noopener noreferrer">현재 카드 원본 크게 보기 ↗</a>
          </div>}
          <div className={styles.dialogDetails}><p className={styles.eyebrow}>{selected.label}</p><h2 id="preview-title">{selected.title}</h2><p>{selected.description}</p>
            <div className={styles.dialogLinks}>
              {selected.youtube && <a href={selected.youtube.url} target="_blank" rel="noopener noreferrer">YouTube에서 보기 ↗</a>}
              {selected.youtube && selected.youtube.start > 0 && <span>02:21:37부터 재생</span>}
              {selected.siteUrl && <a href={selected.siteUrl} target="_blank" rel="noopener noreferrer">사이트 방문 ↗</a>}
              {selected.githubUrl && <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
              {!selected.siteUrl && !selected.gallery && !selected.youtube && <span>사이트 링크 준비 중</span>}
            </div>
          </div>
        </div>}
      </dialog>
    </div>
  );
}

function ProjectTags({ project }: { project: Project }) {
  const stack = projectTools[project.id] ?? projectDetails[project.id]?.stack ?? [];
  const tools = stack;
  if (!tools.length) return null;
  return <ul className={archive.technologyLogos} aria-label="사용한 기술 및 도구">
    {tools.map((tool) => <li key={tool} title={tool}>
      {projectToolIcons[tool] ? <Image src={projectToolIcons[tool]!} alt={tool} width={30} height={30} sizes="30px" /> : <span aria-label={tool}>{tool === "Canvas API" ? "CAN" : tool.slice(0, 3)}</span>}
    </li>)}
  </ul>;
}


