"use client";

import { useRef, useState, type FormEvent } from "react";
import { homeContact } from "../home/home-data";
import { validateContact } from "@/lib/contact";
import styles from "./about-contact.module.scss";

export default function AboutContact() {
  const busy = useRef(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    const errors = validateContact(email, message);
    if (errors.email || errors.message) {
      setFeedback(errors.email || errors.message);
      form.querySelector<HTMLElement>(errors.email ? "input" : "textarea")?.focus();
      return;
    }
    busy.current = true;
    setSending(true);
    setFeedback("메일을 전송하고 있어요.");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, website: String(fields.get("website") ?? "") }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "전송에 실패했습니다. 다시 시도해 주세요.");
      form.reset();
      setFeedback("질문이 전송되었습니다. 이메일로 답변드릴게요.");
    } catch {
      setFeedback("전송하지 못했습니다. 다시 시도하거나 오른쪽 이메일로 연락해 주세요.");
    } finally { busy.current = false; setSending(false); }
  }

  return (
    <footer id="about-contact" className={styles.footer} aria-labelledby="about-contact-title">
      <h2 id="about-contact-title">CONTACT</h2>
      <div className={styles.bottom}>
        <form onSubmit={submit} aria-labelledby="about-question-title" aria-busy={sending}>
          <h3 id="about-question-title">HAVE YOU QUESTION?</h3>
          <label><span className={styles.srOnly}>답변받을 이메일</span>
            <input name="email" type="email" autoComplete="email" placeholder="답변받을 이메일" required maxLength={254} readOnly={sending} />
          </label>
          <label className={styles.message}><span className={styles.srOnly}>질문 내용</span>
            <textarea name="message" placeholder="질문을 남겨주세요" required maxLength={5000} rows={1} readOnly={sending} />
            <button type="submit" disabled={sending} aria-label="문의 메일 보내기">
              <svg viewBox="0 0 32 24" aria-hidden="true"><rect x="1" y="1" width="30" height="22" rx="3" fill="currentColor" /><path d="m2 4 14 10L30 4" fill="none" stroke="#ece5db" strokeWidth="1.5" /></svg>
            </button>
          </label>
          <div className={styles.srOnly} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <p role="status">{feedback}</p>
        </form>
        <address>
          <div><strong>EMAIL</strong><span aria-hidden="true">|</span><a href={`mailto:${homeContact.email}`}>{homeContact.email}</a></div>
          <div><strong>TEL</strong><span aria-hidden="true">|</span><a href={`tel:${homeContact.phone.replaceAll("-", "")}`}>{homeContact.phone}</a></div>
        </address>
      </div>
    </footer>
  );
}
