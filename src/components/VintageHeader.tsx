import Link from "next/link";
import Gnb, { type PageName } from "./Gnb";
import styles from "./VintageHeader.module.scss";

export default function VintageHeader({ active }: { active: PageName }) {
  return <header className={styles.header}>
    <Link href="/home" className={styles.wordmark} aria-label="김지우 포트폴리오 홈">j<span>✳</span></Link>
    <Gnb active={active} />
    <span className={styles.headerNote}>A PERSONAL COLLECTION, 2026</span>
  </header>;
}
