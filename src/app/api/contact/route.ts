import { validateContact } from "@/lib/contact";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "허용되지 않은 요청입니다." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "잘못된 요청입니다." }, { status: 415 });
  let data: unknown;
  try {
    const body = await request.text();
    if (body.length > 20000) return Response.json({ error: "입력 내용이 너무 깁니다." }, { status: 413 });
    data = JSON.parse(body);
  } catch { return Response.json({ error: "입력 내용을 확인해 주세요." }, { status: 400 }); }
  if (!data || typeof data !== "object" || !("email" in data) || !("message" in data) || typeof data.email !== "string" || typeof data.message !== "string") {
    return Response.json({ error: "이메일과 메시지를 모두 입력해 주세요." }, { status: 400 });
  }
  if ("website" in data && data.website) return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  const email = data.email.trim();
  const message = data.message.trim();
  const errors = validateContact(email, message);
  if (errors.email || errors.message) return Response.json({ error: errors.email || errors.message }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "wldn041012@naver.com";
  if (validateContact(to, "configuration").email) return Response.json({ error: "문의 수신 설정을 확인 중입니다. 잠시 후 다시 시도해 주세요." }, { status: 503 });
  if (!apiKey || !from) return Response.json({ error: "현재 문의 전송을 준비 중입니다. wldn041012@naver.com으로 직접 메일을 보내주세요." }, { status: 503 });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: "[포트폴리오] 새로운 문의", text: `답변받을 이메일: ${email}\n\n${message}` }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok && /only send testing emails|own email address/i.test(String(result.message ?? ""))) {
      return Response.json({ error: "현재 테스트 발송 모드입니다. 수신 주소(CONTACT_TO_EMAIL)를 Resend 가입 이메일과 같게 설정하거나, 인증된 도메인의 발신 주소를 사용해 주세요." }, { status: 503 });
    }
    if (!response.ok || !result.id) return Response.json({ error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
    return Response.json({ success: true });
  } catch { return Response.json({ error: "메일 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 }); }
}
