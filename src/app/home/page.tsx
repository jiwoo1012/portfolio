import type { Metadata } from "next";

import HomeAbout from "./home-about";
import HomeSkills from "./home-skills";
import HomeProjects from "./home-projects";
import { homeContact } from "./home-data";
import HomeExperience from "./home-experience";
import HomeHeader from "@/components/HomeHeader";
import styles from "./page.module.scss";
import HomeHero from "./home-hero";
import footerStyles from "./home-footer.module.scss";

export const metadata: Metadata = { title: "김지우 | Full-stack Developer", description: "AI 닿지 않는 디테일까지 코드로 완성합니다. 풀스택 개발자 김지우의 포트폴리오." };

export default function HomePage() {
  return <HomeExperience>
    <a className={styles.skip} href="#main-content">본문으로 건너뛰기</a>
    <HomeHeader active="home" reserveSpace={false} showLogo={false} />
    <main id="main-content" className={footerStyles.foreground}>
      <HomeHero />
      <HomeAbout />
      <HomeSkills />
      <HomeProjects />
      <div id="contact" aria-hidden="true" />
    </main>
    <footer className={footerStyles.footer} aria-labelledby="contact-title">
      <h2 id="contact-title" className={footerStyles.word}>CONTACT</h2>
      <address className={footerStyles.details}>
        <a href={`mailto:${homeContact.email}`}>{homeContact.email}</a>
        <a href={`tel:${homeContact.phone.replaceAll("-", "")}`}>{homeContact.phone}</a>
      </address>
    </footer>
  </HomeExperience>;
}
