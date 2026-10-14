"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "./projects";
import styles from "./page.module.scss";
import { projectDetails } from "./project-details";
import { backendProjectOrder, projectToolIcons, projectTools } from "./project-tools";
import VintageHeader from "@/components/VintageHeader";
import vintage from "../home/page.module.scss";
import ProjectIntro from "./project-intro";
import ProjectContact from "./project-contact";
import jajakHover from "../../../public/project/jajak/hover.webp";
import chamverseHover from "../../../public/project/chamverse/hover.webp";
import nodeHover from "../../../public/project/node/hover.webp";
import onveHover from "../../../public/project/onve/hover.webp";
import guestbookHover from "../../../public/project/guestbook/hover.webp";
import dashboardHover from "../../../public/project/dashboard/hover.webp";

const hoverCaptures: Partial<Record<string, StaticImageData>> = {
  "01": jajakHover,
  "02": chamverseHover,
  "03": onveHover,
  "04": dashboardHover,
  "05": nodeHover,
  "06": guestbookHover,
};

const categories = [
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "design", label: "DESIGN & VIDEO" },
];

export default function ProjectGallery({ category }: { category: string }) {
  const active = categories.some((item) => item.id === category) ? category : "frontend";
  const visible = projects.filter((project) => project.category === active);
  if (active === "backend") visible.sort((a, b) => {
    const rank = (id: string) => { const index = backendProjectOrder.indexOf(id); return index < 0 ? backendProjectOrder.length : index; };
    return rank(a.id) - rank(b.id);
  });
  const [pagination, setPagination] = useState({ category: active, page: 1 });
  const pageCount = Math.max(1, Math.ceil(visible.length / 6));
  const page = pagination.category === active ? Math.min(pagination.page, pageCount) : 1;
  const pageProjects = visible.slice((page - 1) * 6, page * 6);
  function changePage(next: number) {
    setPagination({ category: active, page: next });
    document.getElementById("works")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const [selected, setSelected] = useState<Project | null>(null);
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
    <div className={styles.page} id="top">
      <a className={vintage.skip} href="#works">작업 목록으로 건너뛰기</a>
      <VintageHeader active="project" />
      <main>
        <ProjectIntro />
        <section id="works" className={styles.collection} aria-labelledby="works-title">
          <div className={styles.categoryBand}>
            <h2 id="works-title">{categories.find((item) => item.id === active)?.label}</h2>
            <nav aria-label="프로젝트 카테고리" className={styles.categoryTabs}>
              {categories.map((item) => <Link key={item.id} href={`/project?category=${item.id}#works`} scroll={false} aria-current={active === item.id ? "page" : undefined}>{item.label}</Link>)}
            </nav>
          </div>
          <p className={styles.collectionCount} aria-live="polite">{visible.length} PROJECTS / {page} OF {pageCount}</p>
          <div className={styles.grid} key={active}>
            {pageProjects.map((project) => project.category !== "design" ? (
              <article key={project.id} className={styles.card}>
                <Link className={styles.cardLink} href={`/project/${project.id}`} aria-label={`${project.title} 상세 보기`}>
                  <div className={styles.cardBar}><span aria-hidden="true">&lt;/&gt;</span> {project.label}</div>
                  <div className={styles.thumbnail}>
                    <Image src={project.image} alt={`${project.title} 웹사이트 화면`} fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 44vw, 360px" />
                    {hoverCaptures[project.id] && <Image className={styles.hoverCapture} src={hoverCaptures[project.id] ?? project.image} alt="" aria-hidden="true" fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 44vw, 360px" />}
                  </div>
                  <div className={styles.cardMeta}><span>{project.youtube ? "VIDEO" : project.category.toUpperCase()}</span></div>
                  <div className={styles.titleButton}><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
                  <p className={styles.cardDescription}>{project.description}</p><ProjectTags project={project} />
                </Link>
              </article>
            ) : (
              <article key={project.id} className={`${styles.card} ${project.youtube ? styles.videoCard : ""}`}>
                <div className={styles.cardBar}><span aria-hidden="true">✳</span> {project.youtube ? "VIDEO PROJECT" : "DESIGN PROJECT"}</div>
                <button type="button" className={styles.thumbnail}
                  onClick={() => openPreview(project)} aria-label={`${project.title} ${project.youtube ? "영상 재생" : "카드뉴스 보기"}`} aria-haspopup="dialog">
                  <Image src={project.image} alt={`${project.title} 표지`} fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 44vw, 360px" />
                  {project.youtube && <span className={styles.playIcon} aria-hidden="true">▶</span>}
                </button>
                <div className={styles.cardMeta}><span>{project.youtube ? "VIDEO" : project.category.toUpperCase()}</span></div>
                <button className={styles.titleButton} onClick={() => openPreview(project)} aria-haspopup="dialog">
                  <h3>{project.title}</h3><span aria-hidden="true">↗</span>
                </button>
                <p className={styles.cardDescription}>{project.description}</p><ProjectTags project={project} />
              </article>
            ))}
          </div>
          <nav className={styles.pagination} aria-label="프로젝트 목록 페이지">
            <button onClick={() => changePage(page - 1)} disabled={page === 1} aria-label="이전 페이지">‹</button>
            {Array.from({ length: pageCount }, (_, index) => <button key={index} aria-current={page === index + 1 ? "page" : undefined} onClick={() => changePage(index + 1)}>{index + 1}</button>)}
            <button onClick={() => changePage(page + 1)} disabled={page === pageCount} aria-label="다음 페이지">›</button>
          </nav>
        </section>
      </main>
      <ProjectContact />

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
  const tools = stack.filter((tool) => projectToolIcons[tool]);
  if (!tools.length) return null;
  return <ul className={styles.technologyLogos} aria-label="사용한 기술 및 도구">
    {tools.map((tool) => <li key={tool} title={tool}>
      <Image src={projectToolIcons[tool]!} alt={tool} width={28} height={28} sizes="28px" />
    </li>)}
  </ul>;
}


