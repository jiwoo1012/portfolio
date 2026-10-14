import type { Metadata } from "next";
import Link from "next/link";
import { profile, resumeSections } from "./profile";
import { homeContact } from "../home/home-data";
import AboutExperience from "./about-experience";
import PixelEmail from "./pixel-email";
import HomeHeader from "@/components/HomeHeader";
import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "About — 김지우",
  description: "작은 차이, 디테일, 큰 완성도. 풀스택 개발자 김지우의 경험과 코드를 대하는 태도입니다.",
};

const backgrounds = [
  { id: "education", title: "Education" },
  { id: "activities-leadership", title: "Activities" },
  { id: "awards-certificates", title: "Awards" },
];

const details = [
  { number: "01", title: "사용자의 흐름부터 읽습니다.", keyword: "USER FLOW", description: "화면의 작은 요소부터 사용자의 다음 행동까지. 자연스럽게 이어지는 경험을 먼저 고민합니다.", closing: <>작은 디테일이 만드는<br />더 나은 경험.</> },
  { number: "02", title: "보이는 화면 너머를 연결합니다.", keyword: "CONNECTED THINKING", description: "화면의 동작과 그 뒤의 데이터 흐름을 함께 살피며, 서비스 전체를 이해하고 구현합니다.", closing: <>화면과 로직을 잇는,<br />끊김 없는 흐름.</> },
  { number: "03", title: "작동하는 이유까지 확인합니다.", keyword: "QUESTION & REFINE", description: "새로운 도구는 기민하게 활용하되, 결과를 그대로 받아들이지 않습니다. 이유를 검증하고 더 단단한 답을 찾습니다.", closing: <>한 번 더 묻고,<br />한 단계 더 단단하게.</> },
];

export default function AboutPage() {
  return <AboutExperience>
    <a href="#introduction" className={styles.skip}>본문으로 건너뛰기</a>
    <HomeHeader active="about" reserveSpace={false} />
    <main>
      <section className={styles.hero} aria-labelledby="about-title">
        <h1 id="about-title">작은 차이 <span>[ 디테일 ]</span> 큰 완성도</h1>
        <p>작은 차이를 더 나은 경험으로 만드는 개발자, 김지우입니다.</p>
        <div className={styles.heroBottom} aria-hidden="true"><span>ABOUT ME / 2026</span><span>SCROLL TO DISCOVER ↓</span></div>
      </section>

      <section id="introduction" className={styles.introduction} aria-labelledby="intro-title">
        <div className={styles.inner}>
          <h2 className={styles.greeting} id="intro-title">김지우입니다;</h2>
          <p className={styles.fillText} data-intro-copy>
            {[
              "작은 차이를 그냥 지나치지 않는 사람.",
              "화면의 디테일부터 데이터의 흐름까지,",
              "자연스럽게 이어지는 경험을 만듭니다.",
            ].map((line) => <span className={styles.introLine} data-intro-line key={line}>
              <span>{line}</span>
              <span className={styles.introInk} aria-hidden="true">{line}</span>
            </span>)}
          </p>
          <p className={styles.introNote}>새로운 도구를 활용하고, 그 결과를 다시 고민합니다.<br />눈에 보이지 않는 부분까지 이해하며 코드를 완성합니다.</p>
        </div>
      </section>

      <section className={styles.background} aria-label="학력, 활동 및 수상 이력">
        <div className={styles.inner}>
          <div className={styles.resumeGrid}>
            {backgrounds.map(({ id, title }) => {
              const section = resumeSections.find((item) => item.id === id)!;
              return <section key={id} id={id} className={styles.resumeColumn} aria-labelledby={`${id}-title`}>
                <h2 id={`${id}-title`}>{title}</h2>
                <ol>{section.entries.map((entry) => <li key={`${entry.period}-${entry.title}`}>
                  <p className={styles.period}>{entry.period}{entry.badge && <span className={styles.badge}>{entry.badge}</span>}</p>
                  <h3>{entry.title}</h3>
                  {entry.organization && <p>{entry.organization}</p>}
                  {entry.description && <p>{entry.description}</p>}
                  {entry.highlights?.map((highlight) => <p key={highlight}>{highlight}</p>)}
                </li>)}</ol>
              </section>;
            })}
          </div>
          <div className={styles.toolbox} aria-label="기술 및 개발 경험">
            {profile.skills.map((group) => <div key={group.title}><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></div>)}
            <div id="engineering-experience"><h3>Engineering</h3><p>JAJAK · Team Leader & Frontend Developer<br /><Link href="/project/01">프로젝트 자세히 보기 ↗</Link></p></div>
          </div>
        </div>
      </section>

      <section className={styles.stackSection} data-card-stack aria-labelledby="detail-title">
        <div className={styles.stackStage}>
          <h2 className={styles.stackTitle} id="detail-title"><span>Detail</span><span>Code</span></h2>
          <div className={styles.cardDeck}>
            {details.map((detail) => <article className={styles.detailCard} data-detail-card key={detail.number}>
              <div className={styles.cardHeading}><span>{detail.number}</span><h3>{detail.title}</h3></div>
              <div className={styles.cardBody}><span>{detail.keyword}</span><p>{detail.description}</p><strong>{detail.closing}</strong></div>
            </article>)}
          </div>
          <div className={styles.stackCaption}><span>ONE DETAIL AT A TIME ↓</span><p>코드 한 줄에도 이유를 담고,<br />작은 디테일을 쌓아 하나의 경험을 완성합니다.</p></div>
        </div>
      </section>

      <section className={styles.statement} data-statement aria-labelledby="statement-title">
        <div className={styles.statementStage}>
          <h2 id="statement-title">
            {[
              <>작은 차이를 놓치지 않는 태도로,</>,
              <>앞으로 더 많은 영역을 이해하고</>,
              <>직접 구현하는 <em>개발자</em>가 되겠습니다.</>,
            ].map((line, index) => <span className={styles.statementLine} data-fill-line key={index}>
              <span>{line}</span>
              <span className={styles.statementInk} aria-hidden="true">{line}</span>
            </span>)}
          </h2>
        </div>
      </section>

      <section className={styles.contact} data-contact aria-labelledby="contact-title">
        <div className={styles.contactStage}>
          <h2 id="contact-title">GET IN TOUCH</h2>
          <PixelEmail email={homeContact.email} />
          <footer className={styles.footer}><span>© 2026 KIM JIWOO</span><a href={homeContact.githubUrl} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></footer>
        </div>
      </section>
    </main>
  </AboutExperience>;
}
