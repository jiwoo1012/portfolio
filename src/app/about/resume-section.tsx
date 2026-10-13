import type { ResumeSection as ResumeSectionData } from "./profile";
import Link from "next/link";
import Image from "next/image";
import universityLogo from "../../../public/about/education/education01.png";
import trainingLogo from "../../../public/about/education/education02.png";
import styles from "./page.module.scss";

export default function ResumeSection({ section }: { section: ResumeSectionData }) {
  return (
    <section id={section.id} className={styles.resumeSection} aria-labelledby={`${section.id}-title`}>
      <div className={styles.sectionTitle}>
        <p className={styles.eyebrow}>{section.number} / BACKGROUND & PRACTICE</p>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
        <p>{section.subtitle}</p>
      </div>
      {section.entries.length ? <ol className={styles.timeline}>
        {section.entries.map((entry) => <li key={`${entry.period}-${entry.title}`} className={styles.timelineEntry}>
          <div className={styles.entryHeading}>
            {entry.logo && <div className={styles.educationLogo}>
              <Image src={entry.logo === "university" ? universityLogo : trainingLogo} alt="" width={72} height={70} sizes="72px" />
            </div>}
            <div className={styles.entryHeadingText}>
              <div className={styles.entryMeta}>
                <p className={styles.period}>{entry.period}</p>
                {entry.badge && <span className={`${styles.entryBadge} ${entry.planned ? styles.plannedBadge : ""}`}>{entry.badge}</span>}
              </div>
              <h3>{entry.title}</h3>
            </div>
          </div>
          {entry.organization && <p className={styles.organization}>{entry.organization}</p>}
          {entry.description && <p className={styles.entryDescription}>{entry.description}</p>}
          {!!entry.highlights?.length && <ul className={styles.highlights}>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
          {section.id === "engineering-experience" && <Link className={styles.projectLink} href="/project?category=frontend">JAJAK 포함 프론트엔드 작업 보기 ↗</Link>}
        </li>)}
      </ol> : <div className={styles.resumeEmpty}><span aria-hidden="true">＋</span><p>내용을 준비하고 있습니다.</p></div>}
    </section>
  );
}
