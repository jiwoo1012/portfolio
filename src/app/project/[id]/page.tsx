import type { Metadata } from "next";
import Link from "next/link";
import HomeHeader from "@/components/HomeHeader";
import { notFound } from "next/navigation";
import { projects } from "../projects";
import { emptyProjectDetail, projectDetails } from "../project-details";
import { FeatureViewer, RoleStack, Troubleshooting, Retrospective } from "./detail-sections";
import DetailContact from "./detail-contact";
import ProjectPreview from "./project-preview";
import styles from "./page.module.scss";

type Props = { params: Promise<{ id: string }> };
const development = projects.filter((project) => project.category !== "design");
export function generateStaticParams() { return development.map(({ id }) => ({ id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = development.find((item) => item.id === id);
  return { title: project ? `${projectDetails[id]?.serviceName || project.title} — 김지우` : "프로젝트를 찾을 수 없습니다", description: project?.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projectIndex = development.findIndex((item) => item.id === id);
  const project = development[projectIndex];
  if (!project) notFound();
  const previousProject = projectIndex > 0 ? development[projectIndex - 1].id : undefined;
  const nextProject = projectIndex < development.length - 1 ? development[projectIndex + 1].id : undefined;
  const detail = projectDetails[id] ?? emptyProjectDetail;
  const links = [
    { label: "사이트 바로가기", url: detail.siteUrl || project.siteUrl },
    { label: "깃허브 주소", url: detail.githubUrl || project.githubUrl },
    { label: "발표 자료", url: detail.presentationUrl },
    { label: "기획서", url: detail.proposalUrl },
  ];
  return <div className={styles.page} id="top">
    <a className={styles.skip} href="#overview">본문으로 건너뛰기</a>
    <div className={styles.frontLayer}>
    <HomeHeader active="project" contactHref="#contact" />
    <main>
      <div className={styles.backRow}><Link href={`/project?category=${project.category}`} aria-label="프로젝트 목록으로 돌아가기">←</Link></div>
      <section className={styles.hero} aria-labelledby="project-title">
        <div className={styles.heroCopy}>
          <h1 id="project-title">{id === "01" ? "JAJAK" : detail.serviceName || project.title}</h1>
          <p className={styles.heroDescription}>{detail.overview || project.description}</p>
          <div className={styles.projectLinks}>{links.map(({ label, url }) => url ? <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a> : <span key={label} title="자료 준비 중">{label} · 준비 중</span>)}</div>
        </div>
        <ProjectPreview id={id} title={detail.serviceName || project.title} fallback={project.image} />
      </section>
      <section id="overview" className={styles.overview}>
        <h2>프로젝트 개요</h2>
        <div className={styles.overviewBody}>
          <dl>{[["프로젝트", detail.serviceName || project.title], ["진행 기간", detail.period], ["참여 인원", detail.team], ["담당 역할", detail.role]].map(([label, value]) => value && <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          {detail.background && <div><h3>기획 배경</h3><p>{detail.background}</p></div>}
          {detail.target && <div><h3>타겟 사용자</h3><p>{detail.target}</p></div>}
          {!!detail.stack.length && <div><h3>사용 기술</h3><ul className={styles.tags}>{detail.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul></div>}
        </div>
      </section>
      <RoleStack groups={detail.contributionGroups ?? (detail.contributions.length ? [{ title: "담당 구현", items: detail.contributions }] : [])} />
      <FeatureViewer items={detail.implementations ?? []} screenshots={detail.screenshots} />
      <Troubleshooting challenges={detail.challenges} implementations={detail.implementations ?? []} />
      <Retrospective outcomes={detail.outcomes} growth={detail.retrospective} improvements={detail.improvements} previousProject={previousProject} nextProject={nextProject} />
    </main>
    </div>
    <div id="contact" className={styles.contactSpacer} aria-hidden="true" />
    <DetailContact />
  </div>;
}
