"use client";

import { emailComposeUrl } from "@/lib/email-link";
import { useRef, useState, type FormEvent } from "react";
import { validateContact } from "@/lib/contact";
import { homeContact } from "../home/home-data";
import styles from "./page.module.scss";

export default function ProjectContact() {
  const [errors, setErrors] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const busy = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const nextErrors = validateContact(email, message);
    setErrors(nextErrors);
    setStatus("");
    if (nextErrors.email || nextErrors.message) {
      (nextErrors.email ? emailRef.current : messageRef.current)?.focus();
      return;
    }
    busy.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, website: data.get("website") }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "전송하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setStatus("문의가 전송되었습니다. 남겨주신 이메일로 답변드릴게요.");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "연결을 확인하고 다시 시도해 주세요. 입력 내용은 그대로 남아 있어요.");
    } finally { busy.current = false; setSending(false); }
  }

  return <footer className={styles.contactFooter} id="project-contact">
    <div className={styles.contactColumns}>
      <address><strong>김지우</strong><a href={`tel:${homeContact.phone.replaceAll("-", "")}`}>{homeContact.phone}</a><a href={emailComposeUrl(homeContact.email)}>{homeContact.email}</a></address>
      <form className={styles.questionForm} onSubmit={submit} noValidate aria-labelledby="question-title" aria-busy={sending}>
        <h2 id="question-title">Have a Question?</h2>
        <label htmlFor="question-email">답변받을 이메일 <span>(필수)</span></label>
        <input ref={emailRef} id="question-email" name="email" type="email" autoComplete="email" placeholder="your@email.com" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "question-email-error" : undefined} readOnly={sending} />
        {errors.email && <p className={styles.fieldError} id="question-email-error">{errors.email}</p>}
        <label htmlFor="question-message">궁금한 내용 <span>(필수)</span></label>
        <textarea ref={messageRef} id="question-message" name="message" placeholder="궁금한 점이나 함께하고 싶은 작업을 알려주세요." required maxLength={5000} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "question-message-error" : undefined} readOnly={sending} />
        {errors.message && <p className={styles.fieldError} id="question-message-error">{errors.message}</p>}
        <div className={styles.honeypot} aria-hidden="true"><label htmlFor="question-website">Website</label><input id="question-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <div className={styles.formBottom}><p role="status">{status}</p><button type="submit" disabled={sending}>{sending ? "보내는 중…" : "물어보기"}<span aria-hidden="true">↗</span></button></div>
      </form>
    </div>
    <a className={styles.contactMe} href={emailComposeUrl(homeContact.email)}>CONTACT ME</a>
  </footer>;
}
