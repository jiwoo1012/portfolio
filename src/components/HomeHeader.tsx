import Link from "next/link";
import Image from "next/image";
import type { PageName } from "./Gnb";
import TopNavigationLink from "./TopNavigationLink";
import styles from "./HomeHeader.module.scss";

function Underline() {
  return <svg className={styles.underline} viewBox="0 0 90 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 7C21 4 48 2 67 4C79 5 61 11 53 8C47 5 64 2 87 6" /></svg>;
}

export default function HomeHeader({ active, reserveSpace = true, showLogo = true, contactHref }: { active: PageName; reserveSpace?: boolean; showLogo?: boolean; contactHref?: string }) {
  const contact = contactHref ?? (active === "home" ? "#contact" : "/home#contact");
  return <>
    <header className={styles.header} style={{ viewTransitionName: "site-header", justifyContent: showLogo ? undefined : "flex-end" }}>
      {showLogo && <TopNavigationLink href="/home" className={styles.logo} aria-label="김지우 홈"><Image src="/jiwooLOGO.png" alt="" width={775} height={620} sizes="100px" preload /></TopNavigationLink>}
      <nav aria-label="메인 메뉴">
        {([['home', 'HOME'], ['about', 'ABOUT'], ['project', 'WORK']] as const).map(([path, label]) =>
          <TopNavigationLink href={`/${path}`} aria-current={active === path ? "page" : undefined} key={path}>{label}<Underline /></TopNavigationLink>)}
        <Link href={contact}>CONTACT<Underline /></Link>
      </nav>
    </header>
    {reserveSpace && <div className={styles.spacer} aria-hidden="true" />}
  </>;
}
