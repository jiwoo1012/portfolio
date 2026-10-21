"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ContactDrawer from "./ContactDrawer";
import Image from "next/image";
import type { PageName } from "./Gnb";
import TopNavigationLink from "./TopNavigationLink";
import styles from "./HomeHeader.module.scss";

function Underline() {
  return <svg className={styles.underline} viewBox="0 0 90 12" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 7C21 4 48 2 67 4C79 5 61 11 53 8C47 5 64 2 87 6" /></svg>;
}

export default function HomeHeader({ active, reserveSpace = true, showLogo = true, contactHref }: { active: PageName; reserveSpace?: boolean; showLogo?: boolean; contactHref?: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;

    const updateContrast = () => {
      frame = 0;
      header.querySelectorAll<HTMLAnchorElement>("nav a").forEach((link) => {
        const rect = link.getBoundingClientRect();
        const layers = document.elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        let remaining = 1;
        let brightness = 0;
        for (const layer of layers) {
          if (header.contains(layer)) continue;
          const color = getComputedStyle(layer).backgroundColor;
          const channels = color.match(/[\d.]+/g)?.map(Number);
          if (!channels || !color.startsWith("rgb")) continue;
          const [red, green, blue, alpha = 1] = channels;
          brightness += (red * .2126 + green * .7152 + blue * .0722) * alpha * remaining;
          remaining *= 1 - alpha;
          if (remaining < .01) break;
        }
        brightness += 255 * remaining;
        link.style.setProperty("--nav-link-ink", brightness < 140 ? "#fff" : "#090909");
      });
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateContrast);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, [pathname]);

  const contact = contactHref ?? (active === "home" ? "#contact" : "/home#contact");
  return <>
    <header ref={headerRef} className={styles.header} style={{ viewTransitionName: "site-header", justifyContent: showLogo ? undefined : "flex-end" }}>
      {showLogo && <TopNavigationLink href="/home" className={styles.logo} aria-label="김지우 홈"><Image src="/jiwooLOGO.png" alt="" width={775} height={620} sizes="100px" preload /></TopNavigationLink>}
      <nav aria-label="메인 메뉴">
        {([['home', 'HOME'], ['about', 'ABOUT'], ['project', 'WORK']] as const).map(([path, label]) =>
          <TopNavigationLink href={`/${path}`} aria-current={active === path ? "page" : undefined} key={path}>{label}<Underline /></TopNavigationLink>)}
        <ContactDrawer href={contact}>CONTACT<Underline /></ContactDrawer>
      </nav>
    </header>
    {reserveSpace && <div className={styles.spacer} aria-hidden="true" />}
  </>;
}
