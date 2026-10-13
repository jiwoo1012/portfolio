import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VintageHeader from "@/components/VintageHeader";
import { projects } from "../project/projects";
import computer from "../../../public/home/vintage-computer.png";
import HomeExperience from "./home-experience";
import ContactActions from "./contact-actions";
import { homeContact, selectedWorkDetails, stackSnapshot } from "./home-data";
import { skillIcons } from "../about/skill-icons";
import { resumeSections } from "../about/profile";
import styles from "./page.module.scss";

export const metadata: Metadata = { title: "Jiwoo's folio — 김지우", description: "작은 디테일에서 더 좋은 경험으로. 풀스택 개발자 김지우의 작업실." };
export default function HomePage() {
  const featured = selectedWorkDetails.flatMap((detail) => {
    const project = projects.find((item) => item.id === detail.id);
    return project ? [{ ...project, ...detail }] : [];
  });
  const engineering = resumeSections.find((section) => section.id === "engineering-experience")?.entries[0];
  const activities = resumeSections.find((section) => section.id === "activities-leadership")?.entries ?? [];
  const experience = [engineering, activities[0], activities[2]].filter((entry) => entry !== undefined);
  return (
    <HomeExperience>
      <a className={styles.skip} href="#selected-work">작업 목록으로 건너뛰기</a>
      <VintageHeader active="home" />
      <main>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.titleWrap}><p>THE PERSONAL PORTFOLIO OF KIM JIWOO</p><h1 id="home-title"><span>Details</span><em>matter.</em></h1></div>
          <div className={styles.heroIntro}><h2>작은 디테일로, 더 나은 사용자 경험을.</h2><p>풀스택 개발자 김지우 · 화면부터 데이터 흐름까지 연결합니다.</p><ContactActions hero /></div>
          <div className={styles.desk}>
            <div className={styles.sideLabel}><b>01</b><span>HELLO,<br />WORLD.</span></div>
            <Link href="/project" className={styles.computer} aria-label="전체 프로젝트 둘러보기" data-desk-object>
              <Image src={computer} alt="hello, world.가 화면에 표시된 빈티지 데스크톱 컴퓨터" sizes="(max-width: 600px) 85vw, 560px" preload />
              <span className={styles.screenLink}>OPEN MY WORKS ↗</span>
            </Link>
            <Link href="/project?category=frontend" className={styles.projectSlip} data-desk-object>
              <span className={styles.slipBar}><i /> <i /> <i /> <span>selected work / 01</span></span>
              <Image src={featured[0].image} alt={`${featured[0].title} 프로젝트 미리보기`} sizes="(max-width: 600px) 140px, 220px" />
              <span className={styles.slipCaption}>Made with care. <b>↗</b></span>
            </Link>
            <Link href="/about" className={styles.paperNote} data-desk-object>
              <span className={styles.noteTop}>A NOTE TO MYSELF</span>
              <p>작은 디테일이<br />좋은 경험을<br /><em>만듭니다.</em></p>
              <span className={styles.noteBottom}>MEET THE MAKER ↗</span>
            </Link>
            <div className={styles.rightLabel}><span>FULL-STACK</span><b>Dev.</b><span>& A CURIOUS MIND</span></div>
          </div>
          <div className={styles.posterFooter}><span>THINK IN DETAIL.</span><span>jiwoo’s <em>creative desk</em></span><span>BUILD WITH PURPOSE.</span></div>
        </section>

        <section id="stack" className={styles.stackSection} aria-labelledby="stack-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>01 / THE TOOLS I WORK WITH</p><h2 id="stack-title">Stack <em>snapshot.</em></h2></div><Link href="/about#skills">전체 기술 스택 ↗</Link></div>
          <div className={styles.stackGroups}>{stackSnapshot.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skillIcons[skill] && <Image src={skillIcons[skill]} alt="" width={32} height={32} sizes="32px" />}<span>{skill}</span></li>)}</ul></div>)}</div>
        </section>
        <section id="selected-work" className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>02 / THINGS I HAVE MADE</p><h2 id="work-title">Selected <em>works.</em></h2></div><Link href="/project">VIEW ALL {String(projects.filter((project) => project.category !== "design").length).padStart(2, "0")} WORKS ↗</Link></div>
          <div className={styles.workGrid}>{featured.map((project, index) => <article key={project.id}>
            <Link className={styles.workPhoto} href={`/project/${project.id}`} aria-label={`${project.title} 상세 보기`} data-photo>
              <span className={styles.photoTop}>FIG. 0{index + 1}<span>↗</span></span>
              <Image src={project.image} alt={`${project.title} 사이트 화면`} sizes="(max-width: 650px) 85vw, 30vw" />
              <span className={styles.photoBottom}>{project.label}</span>
            </Link>
            <h3>{project.name}</h3><p className={styles.workRole}>{project.role}</p>
            <ul className={styles.techTags} aria-label="기술 및 분야">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <p className={styles.workOutcome}><span>RESULT</span>{project.outcome}</p>
          </article>)}</div>
        </section>

        <section id="experience" className={styles.experienceSection} aria-labelledby="experience-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>03 / BUILDING TOGETHER</p><h2 id="experience-title">Experience<em>.</em></h2></div><Link href="/about#engineering-experience">전체 이력 보기 ↗</Link></div>
          <ol className={styles.experienceList}>{experience.map((entry) => <li key={entry.title}><span className={styles.experiencePeriod}>{entry.period}</span><div><h3>{entry.title}</h3><p>{entry.organization}{entry.highlights ? ` · ${entry.highlights.join(" · ")}` : entry.description ? `${entry.organization ? " · " : ""}${entry.description}` : ""}</p></div><span aria-hidden="true">↗</span></li>)}</ol>
        </section>
        <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
          <div className={styles.aboutHeading}><p className={styles.eyebrow}>04 / ABOUT NOTE</p><h2 id="about-title">A curious mind,<br /><em>a careful maker.</em></h2><span className={styles.signature}>Kim Jiwoo</span></div>
          <div className={styles.aboutLetter}><span className={styles.letterDate}>FROM MY DESK, WITH CARE.</span><h3>화면 너머의 흐름까지.</h3><p>새로운 도구는 기민하게 활용하되, 결과 그대로를 수용하기보다 이유를 검증합니다. 프론트와 백엔드를 잇고, 작은 디테일을 차근차근 쌓아갑니다.</p><p>작동하는 결과에서 한 걸음 더.<br />이해하고, 연결하고, 완성하는 개발자가 되고 싶습니다.</p><Link href="/about">MORE ABOUT ME <span>↗</span></Link></div>
        </section>
        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title"><p className={styles.eyebrow}>05 / LET’S MAKE SOMETHING GOOD</p><h2 id="contact-title">Next chapter,<br /><em>together.</em></h2><p>함께 만들 더 좋은 경험을 기다립니다.<br />협업과 새로운 기회에 대해 편하게 이야기해 주세요.</p><ContactActions /><a className={styles.phoneLink} href={`tel:${homeContact.phone.replaceAll("-", "")}`}>TEL. {homeContact.phone}</a></section>
      </main>
      <footer className={styles.footer}><Link href="/home">jiwoo’s <em>folio.</em></Link><span>DESIGNED & BUILT BY KIM JIWOO</span><a href="#top">BACK TO TOP ↑</a></footer>
    </HomeExperience>
  );
}



