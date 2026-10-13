import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VintageHeader from "@/components/VintageHeader";
import { projects } from "../projects";
import { emptyProjectDetail, projectDetails } from "../project-details";
import vintage from "../../home/page.module.scss";
import styles from "./page.module.scss";

type Props = { params: Promise<{ id: string }> };
function FlowIcon({ kind }: { kind: "game" | "click" | "sparkles" }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "game" ? <><path d="M7 6h10c2 0 3 2 3.5 5l1 6c.3 2-2 3-3.3 1.5L15 15H9l-3.2 3.5C4.5 20 2.2 19 2.5 17l1-6C4 8 5 6 7 6Z" /><path d="M7 9v5M4.5 11.5h5M16 10h.01M18 13h.01" /></> : kind === "click" ? <><path d="m9 8 11 6-5 1-2 5-4-12ZM4 3l2 2M10 2v3M2 9h3M16 4l-2 2" /></> : <><path d="m10 3 2.5 6.5L19 12l-6.5 2.5L10 21l-2.5-6.5L1 12l6.5-2.5L10 3ZM19 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /></>}
  </svg>;
}
function LinkIcon({ kind }: { kind: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "demo" ? <><path d="M14 3h7v7M21 3 11 13" /><path d="M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /></> : kind === "github" ? <><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.4 6-1.5 6-6a5 5 0 0 0-1.5-3.5A4.5 4.5 0 0 0 18.4 2S17.2 1.6 15 3a13 13 0 0 0-6 0C6.8 1.6 5.6 2 5.6 2a4.5 4.5 0 0 0-.1 3.5A5 5 0 0 0 4 9c0 4.5 3 5.6 6 6a3.5 3.5 0 0 0-1 3v4" /></> : <><rect x="5" y="3" width="14" height="18" rx="3" /><path d="M9 8h6M9 12h6M9 16h3" /></>}
  </svg>;
}
const development = projects.filter((project) => project.category !== "design");
export function generateStaticParams() { return development.map(({ id }) => ({ id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = development.find((project) => project.id === id);
  return { title: project ? `${project.title} — 김지우` : "프로젝트를 찾을 수 없습니다", description: project?.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = development.find((project) => project.id === id);
  if (!project) notFound();
  const detail = projectDetails[id] ?? emptyProjectDetail;
  const siteUrl = detail.siteUrl || project.siteUrl;
  const githubUrl = detail.githubUrl || project.githubUrl;
  const facts = [["PERIOD", detail.period], ["TEAM", detail.team], ["ROLE", detail.role]];
  return <div className={vintage.home} id="top">
    <a className={vintage.skip} href="#overview">프로젝트 개요로 건너뛰기</a>
    <VintageHeader active="project" />
    <main>
      <header className={styles.hero}>
        <Link className={styles.back} href={`/project?category=${project.category}`}>← 프로젝트 목록</Link>
        <p className={styles.eyebrow}>PROJECT {project.id} / {project.label}</p>
        <h1>{detail.serviceName || project.title}</h1><p className={styles.summary}>{project.description}</p>
        <div className={styles.links}>
          {siteUrl && <a href={siteUrl} target="_blank" rel="noopener noreferrer">사이트 방문 ↗</a>}
          {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
        </div>
      </header>
      <div className={styles.content}>
        <figure className={styles.cover}><Image src={project.image} alt={`${project.title} 대표 화면`} sizes="(max-width: 700px) 90vw, 1120px" preload /><figcaption>PROJECT {project.id} — {project.title}</figcaption></figure>
        <nav className={styles.sectionNav} aria-label="프로젝트 상세 목차">
          {[["overview", "01 Overview"], ["contribution", "02 My Contribution & Implementation"], ["troubleshooting", "05 Troubleshooting & Improvements"], ["retrospective", "06 Retrospective"]].map(([anchor, label]) => <a key={anchor} href={`#${anchor}`}>{label}</a>)}
        </nav>
        <section id="overview" className={styles.section}>
          <h2><small className={styles.sectionNumber}>01</small>Overview<span>.</span></h2>
          <div>
            {detail.serviceName && <h3>{detail.serviceName}</h3>}
            <p>{detail.overview || project.description}</p>
            {facts.some(([, value]) => value) && <dl className={styles.facts}>{facts.map(([label, value]) => value ? <div key={label}><dt>{label}</dt><dd>{value}</dd></div> : null)}</dl>}
            {!!detail.stack.length && <ul className={styles.tags} aria-label="기술 스택">{detail.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
            {detail.background && <article><h3>기획 의도 및 배경</h3><p>{detail.background}</p></article>}
            {detail.target && <article><h3>타겟 사용자</h3><p>{detail.target}</p></article>}
            <div className={styles.projectLinks}>
              <p className={styles.linkHeading}>PROJECT LINKS</p>
              <div className={styles.linkButtons}>
                {[
                  { label: "Live Demo", url: siteUrl, kind: "demo" },
                  { label: "GitHub", url: githubUrl, kind: "github" },
                  { label: "발표 자료 PDF", url: detail.presentationUrl, kind: "document" },
                  { label: "기획서 PDF", url: detail.proposalUrl, kind: "document" },
                ].map(({ label, url, kind }) => url ? <a key={label} className={kind === "demo" ? styles.primaryLink : undefined} href={url} target="_blank" rel="noopener noreferrer"><LinkIcon kind={kind} />{label}</a> : <button key={label} type="button" disabled title="자료 준비 중"><LinkIcon kind={kind} />{label}</button>)}
              </div>
              {(!detail.presentationUrl || !detail.proposalUrl) && <p className={styles.linkNote}>발표 자료와 기획서는 준비 중입니다.</p>}
            </div>
          </div>
        </section>
        <section id="contribution" className={styles.section}>
          <h2><small className={styles.sectionNumber}>02</small>My Contribution &amp; Implementation<span>.</span></h2>
          <div>
            {!!detail.implementations?.length && <div className={styles.implementationJump}><span>구현 화면 바로 보기</span>{detail.implementations.map((item) => <a key={item.id} href={`#${item.id}`}>{item.title} ↓</a>)}</div>}
            {detail.contributionGroups?.length ? detail.contributionGroups.map((group) => <article key={group.title}>
              <h3>{group.title}</h3>
              <table className={styles.contributionTable}>
                <caption className={styles.tableCaption}>{group.title} 담당 내용</caption>
                <thead><tr><th scope="col">영역</th><th scope="col">담당 내용</th></tr></thead>
                <tbody>{group.items.map((item) => <tr key={item.title}><th scope="row">{item.anchor && detail.implementations?.some((implementation) => implementation.id === item.anchor) ? <a href={`#${item.anchor}`}>{item.title} ↓</a> : item.title}</th><td>{item.description}</td></tr>)}</tbody>
              </table>
            </article>) : detail.contributions.length ? detail.contributions.map((item, index) => <article key={index}><h3>{item.title}</h3><p>{item.description}</p></article>) : <p className={styles.placeholder}>작성 예정 · 담당 기능과 직접 구현한 범위</p>}
            {(detail.designIntegration || (detail.scaffold && !detail.contributionGroups?.length)) && <article><h3>디자인 통합</h3><p className={!detail.designIntegration ? styles.placeholder : undefined}>{detail.designIntegration || "작성 예정 · 팀원별 화면의 디자인을 통합한 기준과 직접 조율한 내용"}</p></article>}
            {(!detail.implementations?.length || !!detail.screenshots.length || detail.features?.some((feature) => feature.image)) && <article>
              <h3>실제 구현 화면</h3>
              {detail.screenshots.map((shot, index) => <figure className={styles.screenshot} key={index}><Image src={shot.src} alt={shot.alt} width={1440} height={900} sizes="(max-width: 700px) 90vw, 760px" unoptimized={shot.src.toLowerCase().endsWith(".gif")} />{shot.caption && <figcaption>{shot.caption}</figcaption>}</figure>)}
              {detail.features?.filter((feature) => feature.image).map((feature, index) => feature.image && <figure className={styles.screenshot} key={index}><Image src={feature.image.src} alt={feature.image.alt} width={1440} height={900} sizes="(max-width: 700px) 90vw, 760px" unoptimized={feature.image.src.toLowerCase().endsWith(".gif")} /><figcaption>{feature.image.caption}</figcaption></figure>)}
              {!detail.screenshots.length && !detail.features?.some((feature) => feature.image) && <div className={styles.mockupSlot}><span>IMPLEMENTATION</span><strong>담당 기능 구현 화면</strong><p>직접 구현한 화면의 스크린샷 또는 GIF를 추가할 자리입니다.</p></div>}
            </article>}
          </div>
          {!!detail.implementations?.length && <div className={styles.implementations}>
            {detail.implementations.map((item, index) => <article id={item.id} key={item.id} className={styles.implementation}>
              <div className={styles.implementationIntro}>
                <div><p className={styles.eyebrow}>IMPLEMENTATION {String(index + 1).padStart(2, "0")}</p><h3>{item.title}</h3>{item.tagline && <p className={styles.implementationTagline}><strong>{item.tagline}</strong></p>}<p>{item.summary}</p>{item.closing && <p className={styles.implementationClosing}><strong>{item.closing}</strong></p>}</div>
              </div>
              {!!item.highlights?.length && <div className={styles.implementationHighlights}><h4>핵심 구현</h4><ul>{item.highlights.map((highlight) => <li key={highlight.title}><strong>{highlight.title}:</strong> {highlight.description}</li>)}</ul></div>}
              {!!item.userFlow?.length && <div className={styles.tavernFlow}><p className={styles.eyebrow}>USER FLOW</p><ol aria-label={`${item.title} 사용자 흐름`}>{item.userFlow.map((step) => <li key={step.title}><FlowIcon kind={step.icon} /><h4>{step.title}</h4><p>{step.description}</p></li>)}</ol></div>}
              <div className={`${styles.implementationImages} ${item.images.length > 1 ? styles.imageGallery : ""}`}>
                {item.images.map((shot, shotIndex) => <figure key={shot.src}>
                  <figcaption><span>SCREEN {String(shotIndex + 1).padStart(2, "0")}</span><h4>{shot.title}</h4><p>{shot.caption}</p></figcaption>
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`${shot.title} 원본 이미지 새 탭에서 보기`}><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 700px) 90vw, 820px" /><span className={styles.imageExpand}>원본 크게 보기 ↗</span></a>
                </figure>)}
              </div>
              {!!item.personalizationFlow?.length && <div className={styles.personalizationFlow}>
                <p className={styles.eyebrow}>PERSONALIZATION DATA FLOW</p>
                <ol aria-label="개인화 추천 데이터 흐름">{item.personalizationFlow.map((step, stepIndex) => <li key={step.title}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {stepIndex === 0 ? <><rect x="5" y="4" width="14" height="17" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M9 11h6M9 15h6" /></> : stepIndex === 1 ? <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v14c0 4 14 4 14 0V5M5 12c0 4 14 4 14 0" /></> : stepIndex === 2 ? <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" /> : <><path d="M3 11a9 9 0 1 1 2 7M3 5v6h6M12 7v5l3 2" /></>}
                  </svg><h4>{step.title}</h4><p>{step.description}</p>
                </li>)}</ol>
              </div>}
              {!!item.analyticsFlow?.length && <div className={styles.personalizationFlow}>
                <p className={styles.eyebrow}>ADMIN ANALYTICS DATA FLOW</p>
                <ol aria-label="관리자 운영 데이터 흐름">{item.analyticsFlow.map((step) => <li key={step.title}><h4>{step.title}</h4><p>{step.description}</p></li>)}</ol>
              </div>}
              {item.video && <figure className={styles.implementationVideo}>
                <figcaption><div><h4>{item.title} 시연 영상</h4><p>실제 서비스의 동작 흐름을 영상으로 확인할 수 있습니다.</p></div><a href={item.video} target="_blank" rel="noopener noreferrer">영상 새 탭에서 보기 ↗</a></figcaption>
                <video controls playsInline preload="none" poster={item.images[0]?.src} aria-label={`${item.title} 서비스 시연`}><source src={item.video} type="video/mp4" />동영상을 재생할 수 없습니다. <a href={item.video}>시연 영상 열기</a></video>
              </figure>}
              {item.implementationDetails && <div className={styles.implementationDetails}><h4>주요 구현 내용</h4><p>{item.implementationDetails}</p></div>}
              {item.flowchart && <figure className={styles.flowchart}>
                <figcaption><h4>추천 데이터 흐름도</h4><a href={item.flowchart.src} target="_blank" rel="noopener noreferrer">흐름도 원본 크게 보기 ↗</a></figcaption>
                <a href={item.flowchart.src} target="_blank" rel="noopener noreferrer" aria-label="AI 큐레이션 흐름도 원본 새 탭에서 보기"><Image src={item.flowchart.src} alt={item.flowchart.alt} width={item.flowchart.width} height={item.flowchart.height} sizes="(max-width: 1244px) 90vw, 1120px" /></a>
              </figure>}
              {!!item.codeExamples?.length && <div className={styles.codeExamples}><h4>핵심 코드와 설계 이유</h4>{item.codeExamples.map((example, codeIndex) => <div id={`${item.id}-code-${codeIndex + 1}`} className={styles.codeExample} key={example.title}>
                <h5><span>Core Implementation{item.codeExamples!.length > 1 ? ` ${String(codeIndex + 1).padStart(2, "0")}` : ""}</span>{example.title}</h5>
                {example.summary && <p className={styles.codeSummary}>{example.summary}</p>}
                <details className={styles.codeDisclosure} open={codeIndex === 0}><summary>핵심 코드 <span className={styles.showCode}>보기</span><span className={styles.hideCode}>접기</span></summary>
                <div className={styles.codeFilename}>{example.filename || "핵심 코드"}<span>JavaScript</span></div>
                <pre tabIndex={0} aria-label={`${example.title} 코드`}><code>{example.code}</code></pre>
                </details>
                <div className={styles.codeRationale}><h6>설계 의도</h6><p>{example.rationale}</p></div>
              </div>)}</div>}
              {!!item.comparison?.length && <div className={styles.uiComparison}><h4>UI 개선 비교</h4><div className={styles.comparisonGrid}>
                {item.comparison.map((shot) => <figure key={shot.src}><figcaption><h5>{shot.title}</h5><p>{shot.caption}</p></figcaption>{[shot, ...(shot.additionalImages ?? [])].map((image) => <a key={image.src} href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${image.alt} 원본 새 탭에서 보기`}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 90vw, 545px" /><span className={styles.imageExpand}>원본 크게 보기 ↗</span></a>)}</figure>)}
              </div></div>}
            </article>)}
          </div>}
        </section>
        <section id="troubleshooting" className={styles.section}>
          <h2><small className={styles.sectionNumber}>05</small>Troubleshooting &amp; Improvements<span>.</span></h2>
          <div><h3>문제 해결 및 설계 개선</h3><p>서비스 개발과 통합 과정에서 발견한 문제를 분석하고, 안정성과 코드 재사용성을 고려해 개선했습니다.</p>
            <nav className={styles.challengeNav} aria-label="문제 해결 사례">{detail.challenges.map((item, index) => <a key={item.title} href={`#challenge-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong>{item.subtitle && <p>{item.subtitle}</p>}</div></a>)}</nav>
          </div>
          <div className={styles.challengeCases}>{detail.challenges.length ? detail.challenges.map((item, index) => <article id={`challenge-${index + 1}`} key={item.title}>
            <p className={styles.eyebrow}>CASE {String(index + 1).padStart(2, "0")}</p><h3>{item.title}</h3>
            <dl className={`${styles.challenge} ${styles.challengeGrid}`}>{[["Problem", item.problem], ["Cause", item.cause], ["Solution", item.solution], ["Result", item.result]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd className={!value ? styles.placeholder : undefined}>{value || "작성 예정"}</dd></div>)}</dl>
            {item.before && item.after && <div className={styles.codeComparison}>{[["BEFORE", item.before], ["AFTER", item.after]].map(([label, code]) => <div className={styles.codeExample} key={label}><div className={styles.codeFilename}>{label}<span>{item.language}</span></div><pre tabIndex={0} aria-label={`${item.title} ${label} 코드`}><code>{code}</code></pre></div>)}</div>}
            {item.codeAnchor && <a className={styles.relatedCode} href={`#${item.codeAnchor}`}>AI 큐레이션 — 추천 후보 검증 코드 보기 ↑</a>}
            {!!item.validation?.length && <table className={styles.contributionTable}><caption className={styles.validationCaption}>입력 조건별 예상 검증 동작</caption><thead><tr><th scope="col">입력 조건</th><th scope="col">검증 결과</th></tr></thead><tbody>{item.validation.map((row) => <tr key={row.input}><th scope="row">{row.input}</th><td>{row.result}</td></tr>)}</tbody></table>}
            {item.note && <p className={styles.caseNote}>{item.note}</p>}
          </article>) : <p className={styles.placeholder}>작성 예정 · 핵심 문제 해결 사례</p>}</div>
        </section>
        <section id="retrospective" className={styles.section}>
          <h2><small className={styles.sectionNumber}>06</small>Retrospective<span>.</span></h2>
          <div>
            <article><h3>프로젝트 성과</h3>{detail.outcomes.length ? <ul className={styles.outcomes}>{detail.outcomes.map((result, index) => <li key={index}>{result}</li>)}</ul> : <p className={styles.placeholder}>작성 예정 · 완성한 결과와 확인 가능한 성과</p>}</article>
            <article><h3>기술적 성장</h3><p className={!detail.retrospective ? styles.placeholder : undefined}>{detail.retrospective || "작성 예정 · 구현 과정에서 깊어진 기술 이해와 적용 경험"}</p></article>
            <article><h3>협업 개선점</h3><p className={!detail.improvements ? styles.placeholder : undefined}>{detail.improvements || "작성 예정 · 역할 분담, 코드 리뷰, 기능 통합 과정에서 개선할 점"}</p></article>
          </div>
        </section>
        <div className={styles.bottom}><span>THANK YOU FOR READING</span><Link href={`/project?category=${project.category}`}>다른 프로젝트 보기 ↗</Link></div>
      </div>
    </main>
    <footer className={vintage.footer}><Link href="/home">jiwoo’s <em>folio.</em></Link><span>DESIGNED & BUILT BY KIM JIWOO</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}

