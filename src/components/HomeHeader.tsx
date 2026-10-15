import Link from "next/link";
import type { PageName } from "./Gnb";
import TopNavigationLink from "./TopNavigationLink";
import styles from "./HomeHeader.module.scss";

export default function HomeHeader({ active, reserveSpace = true }: { active: PageName; reserveSpace?: boolean }) {
  const contact = active === "home" ? "#contact" : "/home#contact";
  return <>
    <header className={styles.header}>
      <TopNavigationLink href="/home" className={styles.logo} aria-label="김지우 홈">JIWOO</TopNavigationLink>
      <nav aria-label="메인 메뉴">
        {([['home', 'HOME'], ['about', 'ABOUT'], ['project', 'PROJECT']] as const).map(([path, label]) =>
          <TopNavigationLink href={`/${path}`} aria-current={active === path ? "page" : undefined} key={path}>{label}</TopNavigationLink>)}
        <Link href={contact}>CONTACT</Link>
      </nav>
      <Link href={contact} className={styles.availability}><i aria-hidden="true" />Open to Work</Link>
    </header>
    {reserveSpace && <div className={styles.spacer} aria-hidden="true" />}
  </>;
}
