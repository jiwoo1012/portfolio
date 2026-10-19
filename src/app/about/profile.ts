// 홈의 기존 소개를 바탕으로 정리한 자기소개 문구입니다.
// 개인 이력, 학력, 경력 등은 확인된 정보가 생기면 이 파일에 추가하세요.
export const profile = {
  name: "김지우",
  englishName: "KIM JIWOO",
  role: "FULL-STACK DEVELOPER",
  introduction: [
    "안녕하세요. 화면부터 데이터 흐름까지, 서비스 전체를 이해하며 구현하는 풀스택 개발자 김지우입니다.",
    "눈에 보이는 인터페이스와 그 뒤에서 움직이는 로직을 함께 고민합니다. 작은 디테일을 차근차근 쌓아, 자연스럽게 사용할 수 있는 경험을 만들고자 합니다.",
    "새로운 도구는 기민하게 활용하되, 결과를 그대로 받아들이기보다 이유를 검증합니다. 문제가 생기면 원인을 끝까지 따라가며 더 단단한 답을 찾아갑니다.",
  ],
  values: [
    { number: "01", keyword: "DETAIL", title: "작은 차이를 놓치지 않기", description: "화면의 작은 요소부터 사용자의 다음 행동까지. 사용 흐름을 살피며 디테일을 채워갑니다." },
    { number: "02", keyword: "CONNECTION", title: "전체 흐름을 이해하기", description: "프론트엔드와 백엔드를 따로 보지 않고, 화면의 동작이 데이터와 어떻게 이어지는지 함께 고민합니다." },
    { number: "03", keyword: "CURIOSITY", title: "이유를 끝까지 묻기", description: "동작하는 결과에서 한 걸음 더 나아가, 왜 그렇게 동작하는지 이해하고 문제의 원인을 추적합니다." },
  ],
  skills: [
    { title: "Frontend", description: "사용자와 만나는 화면", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "SCSS"] },
    { title: "Backend", description: "화면을 움직이는 데이터", items: ["Node.js", "MySQL", "Firestore"] },
    { title: "Workflow", description: "변화를 기록하는 도구", items: ["Git", "GitHub"] },
    { title: "Design & Video", description: "아이디어를 시각적으로 표현하는 도구", items: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects"] },
  ],
};

export type ResumeEntry = {
  period: string;
  title: string;
  organization?: string;
  description?: string;
  highlights?: string[];
  logo?: "university" | "training";
  badge?: string;
  planned?: boolean;
};

export type ResumeSection = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  entries: ResumeEntry[];
};

// 각 entries에 실제 이력을 추가하세요.
// { period: "기간", title: "학교·경험·활동·수상명", organization: "전공·소속·발급기관",
//   description: "소개", highlights: ["담당 역할 또는 주요 성과"] }
export const resumeSections: ResumeSection[] = [
  { id: "education", number: "04", title: "Education", subtitle: "학력 · 교육 과정", entries: [
    {
      period: "2023.03 — 2028.02",
      title: "한양대학교 ERICA",
      logo: "university", badge: "졸업 예정", planned: true,
      highlights: ["주전공 · 한국언어문학과", "제2전공 · ICT 융합학부 디자인테크놀로지"],
    },
    {
      period: "2026.04 — 2026.10",
      title: "생성형 AI 기반 UIUX 디자인 & 프론트엔드 개발 과정",
      logo: "training",
      description: "React, JavaScript, ChatGPT, Illustrator, Photoshop, Figma 기반 웹 아키텍처 협업 프로젝트 수행",
    },
  ] },
  { id: "engineering-experience", number: "05", title: "Engineering Experience", subtitle: "개발 경험 · 기술적 기여", entries: [
    {
      period: "2026.08.10 — 2026.09.11",
      title: "AI 전통주 큐레이션 서비스 ‘JAJAK’",
      organization: "Team Leader & Frontend Developer",
    },
  ] },
  { id: "activities-leadership", number: "06", title: "Activities & Leadership", subtitle: "대외 활동 · 리더십 경험", entries: [
    {
      period: "2025", title: "제44대 한국언어문학과 부학생회장",
      organization: "한양대학교 ERICA",
      highlights: ["학과 행사 기획·운영 및 학생회 조직 관리 ", "재학생 의견 수렴 및 학생회 임원 간 소통·업무 조율"],
    },
    {
      period: "2025", title: "학생회 [끌림] 디자인팀 / 문과인의 밤 Design TF",
      organization: "단과대학 학생회",
      description: "3개 단과대 연합 행사 브랜딩 및 홍보 인터페이스 디자인 기획·제작",
    },
    {
      period: "2023 — 2024", title: "한대방송국 VOH 제44기 기술부원",
      description: "방송 미디어 시스템 운용 및 영상·모션 그래픽 제작",
    },
  ] },
  { id: "awards-certificates", number: "07", title: "Awards & Certificates", subtitle: "수상 내역 · 자격증", entries: [
    { period: "2026", title: "웹디자인개발기능사", organization: "한국산업인력공단"},
    { period: "2026", title: "SQLD", organization: "한국데이터산업진흥원(K-DATA)", badge: "취득 예정", planned: true },
    { period: "2027", title: "정보처리기사", organization: "한국산업인력공단", badge: "취득 예정", planned: true },
    { period: "2026", title: "독한원정대 교내 공모전", organization: "사회문제 탐구 미디어 콘텐츠 기획 부문", badge: "금상" },
    { period: "2025", title: "무형서재 교내 공모전", organization: "메시지 전달 및 서비스 기획 부문", badge: "우수상" },
  ] },
];
