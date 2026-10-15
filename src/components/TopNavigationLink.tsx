"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, type ComponentProps } from "react";

let pendingPath: string | null = null;

function scrollToTop() {
  // Override smooth scrolling so navigation cannot stop mid-page.
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export default function TopNavigationLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href" | "scroll" | "onNavigate"> & { href: string }) {
  return <Link {...props} href={href} scroll={false} onNavigate={() => {
    const destination = new URL(href, window.location.href).pathname;
    pendingPath = destination === window.location.pathname ? null : destination;
    scrollToTop();
  }} />;
}

export function NavigationScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pendingPath !== pathname) return;
    pendingPath = null;
    scrollToTop();
    // Finish after the destination's layout effects and animation setup.
    const frame = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
