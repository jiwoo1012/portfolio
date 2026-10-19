"use client";

import { emailComposeUrl } from "@/lib/email-link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { homeContact } from "@/app/home/home-data";
import { validateContact } from "@/lib/contact";
import styles from "./ContactDrawer.module.scss";

export default function ContactDrawer({ href, children }: { href: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const busy = useRef(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [flying, setFlying] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({ email: "", message: "" });
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const openInvitation = () => {
      setClosing(false);
      setFlying(false);
      setOpen(true);
    };
    window.addEventListener("open-contact-invitation", openInvitation);
    return () => window.removeEventListener("open-contact-invitation", openInvitation);
  }, []);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
      setClosing(false);
    } else setClosing(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || flying) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const validation = validateContact(email, message);
    setErrors(validation);
    setFeedback("");
    if (validation.email || validation.message) {
      (validation.email ? emailInput.current : messageInput.current)?.focus();
      return;
    }
    busy.current = true;
    setSending(true);
    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (serviceID || templateID || publicKey) {
        if (!serviceID || !templateID || !publicKey) throw new Error("이메일 전송 설정을 확인 중입니다. 이메일 주소를 눌러 직접 연락해 주세요.");
        if (data.get("website")) throw new Error("입력 내용을 확인해 주세요.");
        const { default: emailjs } = await import("@emailjs/browser");
        try {
          await emailjs.send(serviceID, templateID, {
            reply_email: email, message,
            to_name: "김지우", subject: "[포트폴리오] 새로운 문의",
          }, { publicKey });
        } catch {
          throw new Error("편지를 전송하지 못했습니다. 잠시 후 다시 시도하거나 이메일 주소를 눌러 직접 연락해 주세요.");
        }
      } else {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, website: data.get("website") }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "전송하지 못했습니다. 다시 시도해 주세요.");
      }
      setFeedback("질문이 전송되었습니다. 이메일로 답변드릴게요.");
      form.reset();
      if (dialog.current?.open && dialog.current.dataset.closing !== "true") setFlying(true);
    } catch (error) {
      setFeedback(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "연결을 확인하고 다시 시도해 주세요. 입력 내용은 그대로 남아 있습니다.");
    } finally {
      busy.current = false;
      setSending(false);
    }
  }

  return <>
    <a href={href} aria-haspopup="dialog" aria-expanded={open} onClick={(event) => { event.preventDefault(); setClosing(false); setFlying(false); setOpen(true); }}>{children}</a>
    <dialog ref={dialog} className={styles.dialog} data-closing={closing} aria-labelledby="contact-invitation" onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => { setOpen(false); setClosing(false); setFlying(false); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.letter} onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && closing) { setOpen(false); setClosing(false); setFlying(false); }
      }}>
        <Image className={styles.paper} src="/contact.png" alt="" width={682} height={981} sizes="(max-width: 600px) 94vw, 520px" />
        <button className={styles.close} type="button" onClick={close} autoFocus aria-label="연락 편지 닫기">×</button>
        <div className={styles.content}>
          <h2 id="contact-invitation">AN INVITATION TO CONNECT</h2>
          <p className={styles.greeting}>더 나은 코드를 위한 시작은<br /><mark>올바른 질문</mark>이라고 믿습니다.</p>
          <address>
            <a href={emailComposeUrl(homeContact.email)}>EMAIL_ <mark>{homeContact.email}</mark></a>
            <a href={`tel:${homeContact.phone.replaceAll("-", "")}`}>TEL_ <mark>{homeContact.phone}</mark></a>
          </address>
          <p className={styles.question}>궁금한 점도<br />편하게 물어봐주세요!</p>
          <form onSubmit={submit} noValidate aria-label="질문 보내기" aria-busy={sending}>
            <label className={styles.srOnly} htmlFor="drawer-email">답변받을 이메일</label>
            <input ref={emailInput} id="drawer-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="답변 받을 이메일을 입력하세요." readOnly={sending} aria-invalid={!!errors.email} aria-describedby={errors.email ? "drawer-email-error" : undefined} />
            {errors.email && <p className={styles.error} id="drawer-email-error">{errors.email}</p>}
            <label className={styles.srOnly} htmlFor="drawer-message">질문 내용</label>
            <textarea ref={messageInput} id="drawer-message" name="message" required maxLength={5000} rows={1} placeholder="질문을 남겨주세요!" readOnly={sending} aria-invalid={!!errors.message} aria-describedby={errors.message ? "drawer-message-error" : undefined} />
            {errors.message && <p className={styles.error} id="drawer-message-error">{errors.message}</p>}
            <div className={styles.srOnly} aria-hidden="true"><label htmlFor="drawer-website">Website</label><input id="drawer-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <button className={styles.send} data-flying={flying} type="submit" disabled={sending || flying} aria-label={sending ? "편지 보내는 중" : flying ? "편지 전송 완료" : "편지 보내기"}>
              <span className={styles.sendLabel}>{sending ? "보내는 중…" : "편지 보내기"}</span>
              <svg className={styles.plane} viewBox="0 0 64 64" aria-hidden="true" onAnimationEnd={() => setFlying(false)}>
                <path d="M4 27 59 6 43 58 29 37Z" fill="#fff3dc" stroke="#760d0e" strokeWidth="2" strokeLinejoin="round" />
                <path d="M4 27 59 6 29 37 43 58" fill="none" stroke="#760d0e" strokeWidth="2" strokeLinejoin="round" />
                <path d="m29 37-3 15 11-8" fill="#dfbfa3" stroke="#760d0e" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </button>
            <p className={styles.feedback} role="status">{feedback}</p>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}
