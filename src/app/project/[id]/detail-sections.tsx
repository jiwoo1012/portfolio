"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectDetail } from "../project-details";
import styles from "./page.module.scss";

type Implementation = NonNullable<ProjectDetail["implementations"]>[number];
gsap.registerPlugin(ScrollTrigger);

function tabKeys(event: KeyboardEvent<HTMLButtonElement>) {
  const buttons = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
  const index = buttons.indexOf(event.currentTarget);
  let next = index;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % buttons.length;
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = buttons.length - 1;
  else return;
  event.preventDefault();
  buttons[next]?.focus();
  buttons[next]?.click();
}

export function RoleStack({ groups }: { groups: NonNullable<ProjectDetail["contributionGroups"]> }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!track.current || !stage.current || groups.length < 2) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = track.current!;
      const sticky = stage.current!;
      const cards = Array.from(sticky.querySelectorAll<HTMLElement>("[data-role-card]"));
      const first = cards[0];
      const heading = sticky.querySelector("h2")!;
      const spacing = 85;
      const measure = () => {
        const cardHeight = Math.max(...cards.map((card, index) => card.offsetHeight + index * spacing));
        sticky.style.height = `${heading.offsetHeight + 24 + cardHeight}px`;
        root.style.height = `${sticky.offsetHeight + window.innerHeight * .9 * (cards.length - 1)}px`;
      };
      measure();
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: root, start: () => `top ${parseFloat(getComputedStyle(sticky).top)}px`,
        end: () => `+=${window.innerHeight * .9 * (cards.length - 1)}`,
        scrub: true, invalidateOnRefresh: true, onRefreshInit: measure,
      } });
      cards.slice(1).forEach((card, index) => {
        timeline.fromTo(card, { y: () => Math.max(first.offsetHeight + 100, window.innerHeight - 120) }, { y: spacing * (index + 1), duration: 1, ease: "none" });
      });
      const observer = new ResizeObserver(() => ScrollTrigger.refresh());
      cards.forEach((card) => observer.observe(card));
      return () => { observer.disconnect(); root.style.height = ""; sticky.style.height = ""; };
    });
    return () => media.revert();
  }, [groups]);
  return <section id="contribution" className={styles.roleSection}>
    <div ref={track} className={styles.roleTrack}><div ref={stage} className={styles.roleStage}>
      <h2>담당 역할 &amp; 구현 내용</h2>
      <div className={styles.roleCards}>{groups.length ? groups.map((group, index) => <article data-role-card key={group.title} className={styles.roleCard} style={{ zIndex: index + 1 }}>
        <h3>{group.title}</h3><table><tbody>{group.items.map((item) => <tr key={item.title}><th scope="row">{item.anchor ? <a href={`#${item.anchor}`}>{item.title} ↗</a> : item.title}</th><td>{item.description}</td></tr>)}</tbody></table>
      </article>) : <p className={styles.empty}>담당 역할을 정리하고 있습니다.</p>}</div>
    </div></div>
  </section>;
}
function CodeBlock({ title, code }: { title: string; code: string }) {
  return <div className={styles.codeBlock}><p>{title}</p><pre tabIndex={0} aria-label={`${title} 코드`}><code>{code}</code></pre></div>;
}

export function FeatureViewer({ items, screenshots }: { items: Implementation[]; screenshots: ProjectDetail["screenshots"] }) {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState("screen");
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const selectHash = () => {
      const index = items.findIndex((item) => `#${item.id}` === window.location.hash);
      if (index >= 0) {
        setSelected(index); setView("screen");
        section.current?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };
    selectHash();
    window.addEventListener("hashchange", selectHash);
    return () => window.removeEventListener("hashchange", selectHash);
  }, [items]);
  const item = items[selected];
  const views = item ? [
    { id: "screen", label: "구현 화면", show: item.images.length > 0 || !!item.video },
    { id: "video", label: "시연 영상", show: !!item.video && item.images.length > 0 },
    { id: "flow", label: "흐름도", show: !!item.flowchart || !!item.userFlow?.length || !!item.personalizationFlow?.length || !!item.analyticsFlow?.length },
    { id: "code", label: "핵심 코드", show: !!item.codeExamples?.length },
    { id: "compare", label: "개선 비교", show: !!item.comparison?.length },
  ].filter((entry) => entry.show) : [];
  const activeView = views.some((entry) => entry.id === view) ? view : views[0]?.id;
  return <section ref={section} id="features" className={styles.featureSection}>
    <h2>주요 구현 기능</h2>
    {item ? <>
      <div role="tablist" aria-label="주요 구현 기능" className={styles.featureTabs}>{items.map((feature, index) => <button key={feature.id} id={feature.id} type="button" role="tab" aria-selected={selected === index} aria-controls="feature-panel" tabIndex={selected === index ? 0 : -1} onKeyDown={tabKeys} onClick={() => { setSelected(index); setView("screen"); }}>{feature.title.split("|")[0].trim()}</button>)}</div>
      <div id="feature-panel" role="tabpanel" aria-labelledby={item.id} className={styles.featurePanel}>
        <div role="tablist" aria-label="구현 자료" aria-orientation="vertical" className={styles.viewTabs}>{views.map((entry) => <button key={entry.id} id={`view-${entry.id}`} role="tab" type="button" aria-selected={activeView === entry.id} aria-controls="feature-media" tabIndex={activeView === entry.id ? 0 : -1} onKeyDown={tabKeys} onClick={() => setView(entry.id)}>{entry.label}</button>)}</div>
        <div key={`${item.id}-${activeView}`} id="feature-media" role="tabpanel" aria-labelledby={`view-${activeView}`} className={styles.featureMedia} tabIndex={0}>
          {activeView === "screen" && (item.images.length ? item.images.map((shot) => <figure key={shot.src}><a href={shot.src} target="_blank" rel="noopener noreferrer"><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 700px) 90vw, 55vw" /></a><figcaption>{shot.caption}</figcaption></figure>) : item.video && <video key={item.video} controls playsInline preload="metadata" aria-label={`${item.title} 시연`}><source src={item.video} type="video/mp4" /></video>)}
          {activeView === "video" && <video key={item.video} controls playsInline preload="metadata" poster={item.images[0]?.src} aria-label={`${item.title} 시연`}><source src={item.video} type="video/mp4" /></video>}
          {activeView === "flow" && <>{item.flowchart && <Image src={item.flowchart.src} alt={item.flowchart.alt} width={item.flowchart.width} height={item.flowchart.height} sizes="(max-width: 700px) 90vw, 55vw" />}<ol className={styles.flowSteps}>{(item.userFlow ?? item.personalizationFlow ?? item.analyticsFlow ?? []).map((step) => <li key={step.title}><strong>{step.title}</strong><p>{step.description}</p></li>)}</ol></>}
          {activeView === "code" && item.codeExamples?.map((example) => <div key={example.title}><CodeBlock title={example.filename || example.title} code={example.code} /><p className={styles.codeReason}>{example.rationale}</p></div>)}
          {activeView === "compare" && item.comparison?.map((shot) => <figure key={shot.src}><figcaption>{shot.title} — {shot.caption}</figcaption>{[shot, ...(shot.additionalImages ?? [])].map((image) => <Image key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 90vw, 55vw" />)}</figure>)}
        </div>
        <div key={item.id} className={styles.featureDescription} tabIndex={0} aria-label="기능 설명"><p className={styles.eyebrow}>FEATURE 0{selected + 1}</p><h3>{item.title}</h3><p>{item.summary}</p>
          {!!item.responsibilities.length && <><h4>담당 구현</h4><ul>{item.responsibilities.map((text) => <li key={text}>{text}</li>)}</ul></>}
          {!!item.highlights?.length && <><h4>핵심 구현</h4><ul>{item.highlights.map((text) => <li key={text.title}><strong>{text.title}</strong> — {text.description}</li>)}</ul></>}
          {item.implementationDetails && <><h4>구현 내용</h4><p>{item.implementationDetails}</p></>}
          {item.closing && <><h4>서비스 연결</h4><p>{item.closing}</p></>}
        </div>
      </div>
    </> : screenshots.length ? <div className={styles.featureMedia}>{screenshots.map((shot) => <Image key={shot.src} src={shot.src} alt={shot.alt} width={1440} height={900} sizes="90vw" />)}</div> : <p className={styles.empty}>구현 화면을 준비하고 있습니다.</p>}
  </section>;
}

export function Troubleshooting({ challenges, implementations }: { challenges: ProjectDetail["challenges"]; implementations: Implementation[] }) {
  const [selected, setSelected] = useState(0);
  const item = challenges[selected];
  const related = item?.codeAnchor ? implementations.flatMap((implementation) => (implementation.codeExamples ?? []).map((code, index) => ({ ...code, anchor: `${implementation.id}-code-${index + 1}` }))).find((code) => code.anchor === item.codeAnchor) : undefined;
  return <section id="troubleshooting" className={styles.troubleSection}>
    <h2>TROUBLE SHOOTING</h2>
    {item ? <><div role="tablist" aria-label="트러블 슈팅 사례" className={styles.challengeTabs}>{challenges.map((challenge, index) => <button type="button" role="tab" id={`case-tab-${index}`} key={challenge.title} tabIndex={selected === index ? 0 : -1} aria-selected={selected === index} aria-controls="challenge-panel" onKeyDown={tabKeys} onClick={() => setSelected(index)}>0{index + 1} {challenge.title}</button>)}</div>
      <div key={selected} id="challenge-panel" role="tabpanel" aria-labelledby={`case-tab-${selected}`} className={styles.challengePanel}>
        <div className={styles.challengeExplanation} tabIndex={0} aria-label="문제 해결 설명"><p className={styles.eyebrow}>CASE 0{selected + 1}</p><h3>{item.title}</h3><dl>{[["PROBLEM", item.problem], ["CAUSE", item.cause], ["SOLUTION", item.solution], ["RESULT", item.result]].map(([label, value]) => value && <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{item.note && <p className={styles.caseNote}>{item.note}</p>}</div>
        <div className={styles.challengeCode} tabIndex={0} aria-label="문제 해결 코드">{item.before && <CodeBlock title="BEFORE" code={item.before} />}{item.after && <CodeBlock title="AFTER" code={item.after} />}{related && <CodeBlock title={related.filename || related.title} code={related.code} />}{!item.before && !item.after && !related && <p className={styles.empty}>코드 예시를 준비하고 있습니다.</p>}{!!item.validation?.length && <div className={styles.validation}>{item.validation.map((row) => <p key={row.input}><strong>{row.input}</strong> → {row.result}</p>)}</div>}</div>
      </div></> : <p className={styles.empty}>문제 해결 사례를 정리하고 있습니다.</p>}
  </section>;
}

export function Retrospective({
  outcomes,
  growth,
  improvements,
  previousProject,
  nextProject,
}: {
  outcomes: string[];
  growth: string;
  improvements?: string;
  previousProject?: string;
  nextProject?: string;
}) {
   const [selected, setSelected] = useState(0);
  const titles = ["프로젝트 성과", "기술적 성장", "협업 개선점"];

  return (
    <section id="retrospective" className={styles.retrospectiveSection}>
      <h2>프로젝트 회고</h2>
      <div className={styles.accordion}>
        {titles.map((title, index) => {
          const isOpen = selected === index;
          return (
            <article
              key={title}
              className={`${styles.reflection} ${isOpen ? styles.reflectionOpen : ""}`}
              onClick={() => setSelected(index)}
            >
              <h3>
                <button
                  type="button"
                  id={`reflection-button-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`reflection-${index}`}
                  onClick={() => setSelected(index)}
                >
                  {title}
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              <div
                id={`reflection-${index}`}
                role="region"
                aria-labelledby={`reflection-button-${index}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={styles.reflectionBody}
              >
                <div className={styles.reflectionContent}>
                  {index === 0 ? (
                    outcomes.length ? (
                      <ul>{outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
                    ) : (
                      <p>프로젝트 성과를 정리하고 있습니다.</p>
                    )
                  ) : (
                    <p>{(index === 1 ? growth : improvements) || "회고 내용을 정리하고 있습니다."}</p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <nav className={styles.retrospectiveNav} aria-label="프로젝트 탐색">
        <div className={styles.retrospectiveNavPrev}>
          {previousProject ? (
            <Link href={`/project/${previousProject}`} className={styles.projectNavOutline}>← 이전</Link>
          ) : <span className={styles.projectNavDisabled}>← 이전</span>}
        </div>
        <div className={styles.retrospectiveNavNext}>
          {nextProject ? (
            <Link href={`/project/${nextProject}`} className={styles.projectNavSolid}>다음 →</Link>
          ) : <span className={styles.projectNavDisabled}>다음 →</span>}
        </div>
        <Link href="/project" className={styles.workListLink}>
          WORK 목록으로 <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </section>
  );
}
