"use client";

import { useEffect, useRef } from "react";
import { homeContact } from "../../home/home-data";
import styles from "./page.module.scss";

export default function DetailContact() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
      element.style.setProperty("--contact-shift", `${reduced.matches ? 0 : (1 - progress) * 110}%`);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return <footer ref={root} className={styles.contactReveal} id="contact">
    <div className={styles.contactTop}><span>함께 만들 다음 이야기를 기다립니다. ↔</span><a href="/project">다른 프로젝트 보기 ↗</a><a href="#top">BACK TO TOP ↑</a></div>
    <div className={styles.contactWindow}><a className={styles.contactWord} href={`mailto:${homeContact.email}`}>CONTACT</a></div>
    <div className={styles.contactBottom}><address><strong>LET’S WORK TOGETHER.</strong><a href={`mailto:${homeContact.email}`}>{homeContact.email}</a><a href={`tel:${homeContact.phone.replaceAll("-", "")}`}>{homeContact.phone}</a></address><a href={homeContact.githubUrl} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><span>© KIM JIWOO · DESIGNED &amp; BUILT WITH CARE</span></div>
  </footer>;
}
