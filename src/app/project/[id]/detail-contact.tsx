"use client";

import { useRef, useState, type FormEvent } from "react";
import { homeContact } from "../../home/home-data";
import { validateContact } from "@/lib/contact";
import styles from "./page.module.scss";

export default function DetailContact() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const validation = validateContact(email.trim(), question);
    if (validation.email || validation.message) {
      setStatus("error");
      setFeedback(validation.email || validation.message);
      return;
    }

    setStatus("sending");
    setFeedback("메일을 전송하고 있어요...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: question.trim(), website: "" }),
      });
      const data: { success?: boolean; error?: string } = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "전송에 실패했습니다.");
      }

      setStatus("success");
      setFeedback("질문이 정상적으로 전송되었어요! 감사합니다.");
      setEmail("");
      setQuestion("");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "전송에 실패했어요. 다시 시도해 주세요.");
    }
  };

  return (
    <footer ref={root} className={styles.contactReveal} id="contact">
      <div className={styles.contactWindow}>
        <a className={styles.contactWord} href={`mailto:${homeContact.email}`} aria-label="이메일로 연락하기">
          CONTACT
        </a>
      </div>
      <div className={styles.contactBottom}>
        <div className={styles.contactQuestion}>
          <h2>HAVE YOU QUESTION?</h2>
          <form onSubmit={handleSubmit}>
            <label className={styles.contactField}>
              <span className={styles.contactSrOnly}>답변받을 이메일</span>
              <input
                type="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); if (status !== "sending") setStatus("idle"); }}
                placeholder="답변받을 이메일을 입력하세요."
                maxLength={254}
                required
              />
            </label>
            <label className={`${styles.contactField} ${styles.contactMessage}`}>
              <span className={styles.contactSrOnly}>질문 내용</span>
              <textarea
                value={question}
                onChange={(event) => { setQuestion(event.target.value); if (status !== "sending") setStatus("idle"); }}
                placeholder="질문을 남겨주세요!"
                maxLength={5000}
                rows={1}
                required
              />
              <button type="submit" disabled={status === "sending"} aria-label="문의 메일 전송하기" title="문의 메일 전송하기">
                <svg viewBox="0 0 32 24" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="30" height="22" rx="3" fill="currentColor" />
                  <path d="m2 4 14 10L30 4" stroke="#171717" strokeWidth="1.5" />
                </svg>
              </button>
            </label>
            <p className={`${styles.contactFeedback} ${status === "error" ? styles.contactFeedbackError : ""}`} role="status" aria-live="polite">{feedback}</p>
          </form>
        </div>

        <address className={styles.contactDetails}>
          <div><strong>EMAIL</strong><span aria-hidden="true">|</span><a href={`mailto:${homeContact.email}`}>{homeContact.email}</a></div>
          <div><strong>TEL</strong><span aria-hidden="true">|</span><a href={`tel:${homeContact.phone.replaceAll("-", "")}`}>{homeContact.phone}</a></div>
        </address>
      </div>
    </footer>
  );
}
