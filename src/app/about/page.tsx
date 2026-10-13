import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VintageHeader from "@/components/VintageHeader";
import { skillIcons } from "./skill-icons";
import { profile, resumeSections } from "./profile";
import { homeContact } from "../home/home-data";
import ResumeSection from "./resume-section";
import vintage from "../home/page.module.scss";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "About — 김지우",
  description: "김지우의 개발 경험, 기술 스택, 학력 및 활동·수상 이력입니다.",
};

const sections = [
  { id: "engineering-experience", label: "Engineering Experience", number: "01" },
  { id: "skills", label: "Toolbox", number: "02" },
  { id: "education", label: "Education", number: "03" },
  { id: "activities-leadership", label: "Activities", number: "04" },
  { id: "awards-certificates", label: "Awards", number: "05" },
];

export default function AboutPage() {
  return <div className={`${vintage.home} ${styles.page}`} id="top">
    <a className={vintage.skip} href="#engineering-experience">개발 경험으로 건너뛰기</a>
    <VintageHeader active="about" />
    <main>
      <section id="introduction" className={styles.introduction} aria-labelledby="intro-title">
        <p className={styles.eyebrow}>EXPERIENCE, TOOLS & BACKGROUND</p>
        <h1 id="intro-title"><span>About</span> <em>my work.</em></h1>
        <div className={styles.profileRow}>
          <div><h2>{profile.name}<span>{profile.englishName}</span></h2><p className={styles.role}>{profile.role}</p></div>
          <p className={styles.summary}>웹 서비스의 화면과 데이터 흐름을 구현합니다.<br />JAJAK 팀장·프론트엔드 개발 경험을 바탕으로,<br />개발에 기획·디자인 협업 경험을 더합니다.</p>
          <div className={styles.contacts}><a href={`mailto:${homeContact.email}`}>{homeContact.email} ↗</a><a href={homeContact.githubUrl} target="_blank" rel="noopener noreferrer">GitHub / jiwoo1012 ↗</a></div>
        </div>
      </section>
      <div className={styles.resumeBody}>
        <nav className={styles.sectionNav} aria-label="About 이력 바로가기">{sections.map((section) => <a href={`#${section.id}`} key={section.id}><span>{section.number}</span>{section.label} <span aria-hidden="true">↘</span></a>)}</nav>
        {sections.map((item) => {
          if (item.id === "skills") return <section id="skills" key={item.id} className={styles.resumeSection} aria-labelledby="skills-title">
            <div className={styles.sectionTitle}><p className={styles.eyebrow}>02 / TOOLS & TECHNOLOGIES</p><h2 id="skills-title">Toolbox<span>.</span></h2><p>개발 · 협업 · 디자인 도구</p></div>
            <div className={styles.skills}>{profile.skills.map((group) => <div key={group.title} className={styles.skillGroup}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((skill) => <li key={skill}>{skillIcons[skill] ? <Image src={skillIcons[skill]} alt="" width={30} height={30} sizes="30px" /> : <span className={styles.monogram} aria-hidden="true">{skill === "Git" ? "git" : "DB"}</span>}<span>{skill}</span></li>)}</ul>
            </div>)}</div>
          </section>;
          const section = resumeSections.find((section) => section.id === item.id);
          return section ? <ResumeSection key={item.id} section={{ ...section, number: item.number, title: item.label }} /> : null;
        })}
        <div className={styles.endnote}><span>EXPLORE THE IMPLEMENTATION</span><Link href="/project">프로젝트에서 작업 보기 <span>↗</span></Link></div>
      </div>
    </main>
    <footer className={vintage.footer}><Link href="/home">jiwoo’s <em>folio.</em></Link><span>DESIGNED & BUILT BY KIM JIWOO</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}
