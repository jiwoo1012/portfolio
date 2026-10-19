import { emailComposeUrl } from "@/lib/email-link";
import { homeContact } from "./home-data";
import styles from "./page.module.scss";

export default function ContactActions({ hero = false }: { hero?: boolean }) {
  return <div className={styles.actions}>
    {hero ? <a href="#selected-work" className={styles.primaryAction}>프로젝트 보기 <span>↘</span></a>
      : homeContact.email ? <a href={emailComposeUrl(homeContact.email)} className={styles.primaryAction}>{homeContact.email}<span>↗</span></a>
      : <button type="button" disabled>이메일 · 준비 중</button>}
    <a href={homeContact.resumeUrl} target={homeContact.resumeUrl.startsWith("http") ? "_blank" : undefined} rel={homeContact.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}>이력서 <span>↗</span></a>
    {homeContact.githubUrl ? <a href={homeContact.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>
      : <button type="button" disabled>GitHub · 준비 중</button>}
  </div>;
}
