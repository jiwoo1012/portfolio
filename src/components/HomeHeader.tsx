import Link from "next/link";
import type { PageName } from "./Gnb";
import styles from "./HomeHeader.module.scss";

export default function HomeHeader({ active, reserveSpace = true }: { active: PageName; reserveSpace?: boolean }) {
  const contact = active === "home" ? "#contact" : "/home#contact";
  return <>
    <header className={styles.header}>
      <Link href="/home" className={styles.logo} aria-label="김지우 홈">JIWOO</Link>
      <nav aria-label="메인 메뉴">
        {([['home', 'HOME'], ['about', 'ABOUT'], ['project', 'PROJECT']] as const).map(([path, label]) =>
          <Link href={`/${path}`} aria-current={active === path ? "page" : undefined} key={path}>{label}</Link>)}
        <Link href={contact}>CONTACT</Link>
      </nav>
      <Link href={contact} className={styles.availability}><i aria-hidden="true" />Open to Work</Link>
    </header>
    {reserveSpace && <div className={styles.spacer} aria-hidden="true" />}
  </>;
}
