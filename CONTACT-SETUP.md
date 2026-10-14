# 프로젝트 문의 메일 설정

문의 폼은 `POST /api/contact`에서 이메일과 메시지를 다시 검증한 뒤 Resend API로 발송합니다.
수신자는 서버 환경변수 `CONTACT_TO_EMAIL`로 설정하며 Gmail도 가능합니다. 값이 없으면 기존 `wldn041012@naver.com`으로 받습니다. 방문자가 입력한 이메일은 Reply-To로 사용합니다.

Gmail로 받으려면 프로젝트 루트의 `.env` 또는 `.env.local`에 `CONTACT_TO_EMAIL=본인_Gmail_주소`를 추가하세요. `CONTACT_FROM_EMAIL`은 발신 주소이므로 Gmail 수신 주소와 구분합니다. `onboarding@resend.dev`로 테스트할 때는 수신 주소가 Resend 가입 이메일과 같아야 합니다. 파일을 저장한 다음 개발 서버를 다시 시작하세요.

## 계정과 도메인이 아직 없는 경우: 본인 수신함으로 먼저 테스트

1. [Resend 가입](https://resend.com/signup)에서 **wldn041012@naver.com**을 계정 이메일로 사용하고 인증합니다.
2. [API Keys](https://resend.com/api-keys)에서 **Create API Key**를 눌러 **Sending access** 권한으로 키를 만듭니다.
3. `.env.example`을 `.env.local`로 복사하고 아래와 같이 설정합니다. 키는 본인이 발급받은 실제 값으로 바꿉니다.

   ```dotenv
   RESEND_API_KEY=발급받은_API_키
   CONTACT_FROM_EMAIL="JIWOO <onboarding@resend.dev>"
   ```

4. 개발 서버를 다시 시작하고 프로젝트 페이지의 문의 폼을 제출하여 네이버 수신함에서 확인합니다.

이 방식은 **테스트 전용**입니다. `resend.dev` 발신자는 Resend 가입 이메일로만 보낼 수 있으므로 위 계정 이메일이 수신 주소와 정확히 같아야 합니다.
[공식 테스트 발신 제한 안내](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)

## 실제 운영용 도메인 연결

1. 본인이 DNS를 관리할 수 있는 도메인을 준비합니다. [Resend Domains](https://resend.com/domains)에서 **Add Domain**을 누르고 도메인 또는 발신용 서브도메인을 추가합니다. `naver.com`이나 공유 `vercel.app` 주소는 본인 소유 발신 도메인으로 사용할 수 없습니다.
2. Resend가 표시하는 DNS 레코드의 종류·이름·값을 도메인 관리 업체의 DNS 설정에 그대로 등록하고 Resend에서 인증 완료를 확인합니다.
3. 메일 발송 권한이 있는 API 키를 만듭니다.
4. 루트의 `.env.example`을 `.env.local`로 복사하고 두 값을 입력합니다. 테스트 설정을 했다면 발신 주소를 인증한 도메인으로 변경합니다.

   ```dotenv
   RESEND_API_KEY=발급받은_API_키
   CONTACT_FROM_EMAIL="JIWOO <인증한_도메인의_발신주소>"
   ```

   `CONTACT_FROM_EMAIL`에는 임의의 네이버 주소를 쓰지 않습니다. 인증된 본인 도메인의 발신 주소를 사용하고, 실제 문의는 네이버 수신함으로 전달됩니다.

5. 개발 서버를 다시 시작합니다. 배포 환경에도 동일한 두 환경변수를 등록하고 다시 배포합니다.
6. 폼에 회신받을 이메일과 메시지를 입력하여 발송하고 네이버 받은메일함·스팸함에서 수신을 확인합니다.

API 키는 채팅, 저장소, 클라이언트 코드에 넣지 않습니다. `.env.local`은 Git에서 제외됩니다.
설정이 없거나 서비스가 실패하면 폼은 성공으로 표시하지 않으며 입력값을 보존합니다.
발송 API의 성공은 메일 서비스 접수 확인이며, 실제 수신 여부는 받은메일함에서 확인해야 합니다.

API: https://resend.com/docs/api-reference/emails/send-email
도메인: https://resend.com/docs/dashboard/domains/introduction
