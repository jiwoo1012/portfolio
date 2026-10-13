import type { ReactNode } from "react";
import PixelArt from "./PixelArt";
import styles from "./Portfolio.module.scss";

export default function PageHero({ number, eyebrow, title, description, kind, caption, href, action }: {
  number: string; eyebrow: string; title: ReactNode; description: ReactNode;
  kind: "computer" | "folder" | "smile"; caption: string; href: string; action: string;
}) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><span />{number} / {eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className={styles.heroDescription}>{description}</p>
        <a className={styles.textLink} href={href}>{action}<span>↓</span></a>
      </div>
      <div className={styles.artboard}>
        <div className={styles.artTop}><span>JIWOO / PIXEL STUDY {number}</span><span>+ + +</span></div>
        <div className={styles.artObject} data-parallax><PixelArt kind={kind} /></div>
        <span className={styles.floatingTag} data-parallax>{caption}</span>
        <span className={styles.artCross} aria-hidden="true">+</span>
        <div className={styles.artBottom}><span>IDEAS → PIXELS → EXPERIENCES</span><span>↗</span></div>
      </div>
      <div className={styles.heroFoot}><span>FULL-STACK DEVELOPER / KIM JIWOO</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
  );
}
