import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../project/projects";
import { skillIcons } from "../about/skill-icons";
import { resumeSections } from "../about/profile";
import { homeContact } from "./home-data";
import HomeExperience from "./home-experience";
import HomeHeader from "@/components/HomeHeader";
import styles from "./page.module.scss";

export const metadata: Metadata = { title: "김지우 | Full-stack Developer", description: "AI 닿지 않는 디테일까지 코드로 완성합니다. 풀스택 개발자 김지우의 포트폴리오." };
const stacks = [
  { title: "FRONTEND", skills: ["HTML", "CSS", "JavaScript", "React", "SCSS", "Next.js", "TypeScript"] },
  { title: "BACKEND", skills: ["Node.js", "MySQL", "Firestore"] },
  { title: "Workflow", skills: ["GitHub", "Vercel"] },
  { title: "DESIGN & VIDEO", skills: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects"] },
];
const featured = ["01", "18", "02"].map(id => projects.find(project => project.id === id)!);
const resumes = [resumeSections[0], resumeSections[2]];
export default function HomePage() {
  return <HomeExperience>
    <a className={styles.skip} href="#main-content">본문으로 건너뛰기</a>
    <HomeHeader active="home" />
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="home-title">
        <span className={styles.badge}><i />풀스택 개발자</span>
        <h1 id="home-title">AI 닿지 않는<br />디테일까지<br /><mark>코드로 완성합니다.</mark></h1>
        <p>안녕하세요. 풀스택 개발자 김지우입니다.</p>
        <ul className={styles.heroTags}>{["Next.js", "React", "TypeScript", "SCSS", "Node.js"].map(tag => <li key={tag}>{tag}</li>)}</ul>
        <div className={styles.actions}><Link href="/project">프로젝트 보기 <span>→</span></Link><a href="#contact">연락하기</a></div>
        <a href="#about" className={styles.scroll}>SCROLL DOWN<span>↓</span></a>
      </section>
      <section id="about" className={styles.about} aria-labelledby="about-title">
        <div className={styles.inner}>
          <h2 id="about-title" className={styles.smallHeading}>ABOUT ME</h2>
          <div className={styles.aboutIntro}><div><h3>디테일로 완성하는<br />풀스택 개발자 김지우입니다.</h3><p>작은 차이가 결과물의 완성도를 바꾼다고 생각합니다.<br />화면의 디테일부터 기능의 흐름까지, 하나씩 직접 고민하고 구현합니다.</p></div><Link className={styles.darkButton} href="/about">ABOUT 더 보기 <span>→</span></Link></div>
          <div className={styles.resumeGrid}>{resumes.map((section, index) => <article className={styles.windowCard} key={section.id}><div className={styles.cardBar}><span className={styles.code}>&lt;/&gt;</span>{index === 0 ? "Education" : "Leadership & Experience"}<span className={styles.dots}>···</span></div><div className={styles.resumeBody}>{section.entries.filter((_, i) => index === 0 || i !== 1).map(entry => <div key={entry.title}><span className={styles.period}>{entry.period}{entry.planned ? " (예정)" : ""}</span><h4>{entry.title}</h4>{entry.organization && <p>{entry.organization}</p>}{entry.highlights?.map(highlight => <p key={highlight}>{highlight}</p>)}{entry.description && <p>{entry.description}</p>}</div>)}</div></article>)}</div>
        </div>
      </section>
      <section className={styles.stack} aria-labelledby="stack-title"><div className={styles.inner}><h2 id="stack-title">STACK & TOOL</h2><div className={styles.stackGroups}>{stacks.map(group => <div className={styles.stackGroup} key={group.title}><h3><span>{group.title}</span></h3><ul>{group.skills.map(skill => <li key={skill}><div className={styles.iconTile}><Image src={skillIcons[skill]!} width={64} height={64} alt="" sizes="64px" /></div><span>{skill}</span></li>)}</ul></div>)}</div></div></section>
      <section id="selected-work" className={styles.projects} aria-labelledby="projects-title"><div className={styles.browserBar}><i /><i /><i /></div><div className={styles.projectsBody}><div className={styles.sectionHeader}><h2 id="projects-title">PROJECTS</h2><Link href="/project">전체 프로젝트 보기 <span>↗</span></Link></div><div className={styles.projectGrid}>{featured.map((project, index) => <Link href={`/project/${project.id}`} className={styles.projectCard} key={project.id} data-photo><div className={styles.cardBar}><span className={styles.code}>&lt;/&gt;</span>{project.category === "backend" ? "개인 프로젝트" : "반응형 웹 프로젝트"}<span className={styles.dots}>···</span></div><div className={styles.projectImage}><Image src={project.image} alt={`${index === 0 ? "JAJAK" : project.title} 프로젝트 화면`} sizes="(max-width: 600px) 85vw, 30vw" /></div><div className={styles.projectInfo}><h3>{index === 0 ? "JAJAK" : project.title}</h3><p>{project.description}</p><div className={styles.projectBottom}><div className={styles.projectTech}>{(index === 0 ? ["React", "JavaScript", "SCSS"] : index === 1 ? ["Next.js", "React", "Node.js"] : ["HTML", "CSS", "JavaScript"]).map(skill => <Image key={skill} src={skillIcons[skill]!} width={24} height={24} alt={skill} title={skill} />)}</div><span>VIEW MORE ↗</span></div></div></Link>)}</div></div></section>
      <section id="contact" className={styles.contact} aria-labelledby="contact-title"><h2 id="contact-title">GET IN TOUCH</h2><p>함께 일할 개발자를 찾고 계신다면!</p><a className={styles.email} href={`mailto:${homeContact.email}`}>{homeContact.email}</a><a className={styles.phone} href={`tel:${homeContact.phone.replaceAll("-", "")}`}>{homeContact.phone}</a><p className={styles.contactNote}>좋은 결과물은 좋은 관심에서 시작된다고 생각합니다.<br />함께 고민하고 만들어갈 기회를 기다립니다.</p></section>
    </main>
  </HomeExperience>;
}
