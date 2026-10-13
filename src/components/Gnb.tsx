import Link from "next/link";
import styles from "./Gnb.module.scss";

export type PageName = "home" | "project" | "about";

export default function Gnb({ active }: { active?: PageName }) {
  return (
    <nav className={styles.nav} aria-label="메인 메뉴">
      {([['home', 'Home'], ['project', 'Projects'], ['about', 'About']] as const).map(([path, label], index) => (
        <Link key={path} href={`/${path}`} aria-current={active === path ? "page" : undefined}>
          <span className={styles.index}>0{index + 1}</span>{label}<span className={styles.indicator} aria-hidden="true">▪</span>
        </Link>
      ))}
    </nav>
  );
}
