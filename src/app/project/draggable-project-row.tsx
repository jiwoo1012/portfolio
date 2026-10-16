"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import styles from "./archive.module.scss";

export default function DraggableProjectRow({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const gesture = useRef({ pointer: -1, x: 0, scroll: 0, dragging: false, suppressClick: false });

  function hideCursor() { cursor.current?.removeAttribute("data-visible"); }
  function finish() {
    const element = row.current;
    const current = gesture.current;
    const pointer = current.pointer;
    current.pointer = -1;
    current.dragging = false;
    element?.removeAttribute("data-dragging");
    cursor.current?.removeAttribute("data-dragging");
    if (element?.hasPointerCapture(pointer)) element.releasePointerCapture(pointer);
  }

  useEffect(() => {
    const onBlur = () => { finish(); hideCursor(); };
    const onScroll = () => { if (!gesture.current.dragging) hideCursor(); };
    window.addEventListener("blur", onBlur);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  function moveCursor(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !cursor.current) return;
    const element = event.currentTarget;
    if (element.scrollWidth <= element.clientWidth + 1) { hideCursor(); return; }
    cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    cursor.current.dataset.visible = "true";
  }

  return <>
    <div ref={row} id={id} className={styles.row} tabIndex={0} role="region" aria-label={`${label} 프로젝트 목록, 좌우로 드래그하거나 방향키로 이동`}
      onPointerEnter={moveCursor}
      onPointerLeave={() => { if (!gesture.current.dragging) { hideCursor(); finish(); } }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0 || event.currentTarget.scrollWidth <= event.currentTarget.clientWidth + 1) return;
        gesture.current = { pointer: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft, dragging: false, suppressClick: false };
      }}
      onPointerMove={(event) => {
        moveCursor(event);
        const current = gesture.current;
        if (current.pointer !== event.pointerId) return;
        const distance = event.clientX - current.x;
        if (!current.dragging && Math.abs(distance) > 6) {
          current.dragging = true;
          current.suppressClick = true;
          // Keep the released position; restoring snap would jump back to the pressed card.
          event.currentTarget.style.scrollSnapType = "none";
          event.currentTarget.dataset.dragging = "true";
          if (cursor.current) cursor.current.dataset.dragging = "true";
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        if (current.dragging) {
          event.preventDefault();
          event.currentTarget.scrollLeft = current.scroll - distance;
        }
      }}
      onPointerUp={(event) => {
        if (gesture.current.pointer !== event.pointerId) return;
        finish();
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) hideCursor();
      }}
      onPointerCancel={() => { finish(); hideCursor(); }}
      onLostPointerCapture={finish}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (event.detail > 0 && gesture.current.suppressClick) {
          event.preventDefault(); event.stopPropagation();
          gesture.current.suppressClick = false;
        }
        hideCursor();
      }}>
      {children}
    </div>
    <span ref={cursor} className={styles.dragCursor} aria-hidden="true"><span>↔<small>DRAG</small></span></span>
  </>;
}
