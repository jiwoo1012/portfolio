export const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

export function validateContact(email: string, message: string) {
  const local = email.split("@")[0];
  return {
    email: !email ? "답변받을 이메일을 입력해 주세요." : email.length > 254 || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..") || !EMAIL_PATTERN.test(email) ? "올바른 이메일 주소를 입력해 주세요." : "",
    message: !message.trim() ? "궁금한 내용을 입력해 주세요." : message.length > 5000 ? "메시지는 5,000자 이내로 입력해 주세요." : "",
  };
}
