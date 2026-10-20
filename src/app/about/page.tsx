import type { Metadata } from "next";
import Image from "next/image";
import HomeHeader from "@/components/HomeHeader";
import AboutExperience from "./about-experience";
import styles from "./page.module.scss";
import AboutWork from "./about-work";
import AboutContact from "./about-contact";
import { projects } from "../project/projects";

export const metadata: Metadata = {
  title: "About — 김지우",
  description: "안녕하세요. 풀스택 개발자 김지우입니다.",
};

export default function AboutPage() {
  return (
    <AboutExperience>
      <a href="#introduction" className={styles.skip}>본문으로 건너뛰기</a>
      <HomeHeader active="about" reserveSpace={false} />
      <main className={styles.foreground}>
        <section className={styles.hero} aria-labelledby="about-title">
          <h1 id="about-title"><span>MEET</span><span>JIWOO</span></h1>
        </section>
        <section id="introduction" className={styles.introduction} data-introduction aria-labelledby="intro-title">
          <div className={styles.introStage}>
            <div className={styles.greeting}>
              <h2 id="intro-title">
                {["안녕하세요.", "풀스택 개발자 김지우입니다."].map((line) => (
                  <span className={styles.line} data-intro-line key={line}>
                    <span>{line}</span>
                    <span className={styles.ink} aria-hidden="true">{line}</span>
                  </span>
                ))}
              </h2>
              <Image className={styles.hand} src="/about/hand.png" alt="" width={100} height={120} sizes="(max-width: 600px) 48px, 80px" />
            </div>
          </div>
        </section>
        <section className={styles.journey} data-journey aria-labelledby="journey-title">
          <div className={styles.journeyStage}>
            <div className={styles.journeyTrack} data-journey-track>
              <h2 id="journey-title" className={styles.journeyTitle} data-journey-title>WHO AM I?</h2>
              <svg className={styles.journeyLine} viewBox="0 0 2000 700" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} data-journey-path d="M 280 215 C 325 240 345 285 360 330" />
                <path pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} data-journey-path d="M 360 330 C 390 470 445 525 570 525 C 750 525 755 365 675 390 C 530 435 610 620 880 475" />
                <path pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} data-journey-path d="M 880 475 C 1010 390 1040 105 975 120 C 875 145 1035 520 1190 540 C 1375 595 1250 270 1450 200" />
                <path pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} data-journey-path d="M 1450 200 C 1610 120 1850 135 2000 200" />
              </svg>
              <span className={`${styles.journeyDot} ${styles.dotOne}`} data-journey-dot aria-hidden="true" />
              <article className={`${styles.journeyCard} ${styles.cardOne}`} data-journey-card>
                <span className={styles.journeyNumber}>01.</span>
                <h3>서로 다른 분야를 연결하는 시선</h3>
                <p>한국언어문학과와 디자인테크놀로지를 공부하며<br />사람에 대한 이해를 사용자 경험과 기술로 확장했습니다.</p>
              </article>
              <span className={`${styles.journeyDot} ${styles.dotTwo}`} data-journey-dot aria-hidden="true" />
              <article className={`${styles.journeyCard} ${styles.cardTwo}`} data-journey-card>
                <span className={styles.journeyNumber}>02.</span>
                <h3>함께 일하는 기준을 배운 경험</h3>
                <p>학생회와 팀 프로젝트를 이끌며 소통과 협업의 중요성을 배우고 공동의 목표를 위한 작업 세웠습니다.</p>
              </article>
              <span className={`${styles.journeyDot} ${styles.dotThree}`} data-journey-dot aria-hidden="true" />
              <article className={`${styles.journeyCard} ${styles.cardThree}`} data-journey-card>
                <span className={styles.journeyNumber}>03.</span>
                <h3>아이디어를 실제 서비스로 완성하는 과정</h3>
                <p>사용자 관점에서 문제를 정의하고, 기획부터 개발 기능 통합까지 참여하며<br />아이디어를 실제 서비스로 구현했습니다.</p>
              </article>
            </div>
          </div>
        </section>
        <AboutWork projects={["01", "18", "02"].map((id) => {
          const project = projects.find((item) => item.id === id)!;
          return { id, title: id === "01" ? "자작" : project.title, image: project.image };
        })} />
      </main>
      <AboutContact />
    </AboutExperience>
  );
}

