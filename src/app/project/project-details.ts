export type ProjectDetail = {
  serviceName?: string;
  siteUrl?: string;
  githubUrl?: string;
  presentationUrl?: string;
  wireframeUrl?: string;
  characterProposalUrl?: string;
  demoAccount?: { username: string; password: string };
  contributionGroups?: { title: string; items: { title: string; description: string; anchor?: string }[] }[];
  implementations?: {
    id: string;
    title: string;
    summary: string;
    tagline?: string;
    closing?: string;
    highlights?: { title: string; description: string }[];
    personalizationFlow?: { title: string; description: string }[];
    analyticsFlow?: { title: string; description: string }[];
    comparison?: { src: string; alt: string; title: string; caption: string; width: number; height: number; additionalImages?: { src: string; alt: string; width: number; height: number }[] }[];
    userFlow?: { title: string; description: string; icon: "game" | "click" | "sparkles" }[];
    responsibilities: string[];
    steps: string[];
    video?: string;
    implementationDetails?: string;
    flowchart?: { src: string; alt: string; width: number; height: number };
    codeExamples?: { summary?: string; title: string; filename?: string; code: string; rationale: string }[];
    images: { src: string; alt: string; title: string; caption: string; width: number; height: number; autoScroll?: boolean }[];
  }[];
  scaffold?: boolean;
  background?: string;
  target?: string;
  features?: { title: string; description: string; image?: { src: string; alt: string; caption: string } }[];
  designIntegration?: string;
  architecture?: { title: string; structure: string; dataFlow: string }[];
  improvements?: string;
  period?: string;
  team?: string;
  role?: string;
  stack: string[];
  overview: string;
  contributions: { title: string; description: string }[];
  challenges: { title: string; subtitle?: string; problem: string; cause?: string; solution: string; result: string; note?: string; before?: string; after?: string; language?: string; codeAnchor?: string; validation?: { input: string; result: string }[] }[];
  outcomes: string[];
  retrospective: string;
  screenshots: { src: string; alt: string; caption: string }[];
};

// 아래 빈 양식을 복사하여 projects.ts의 id를 키로 추가하세요.
// 비어 있는 주요 내용은 페이지에 작성 안내로 표시됩니다.
export const emptyProjectDetail: ProjectDetail = {
  period: "", team: "", role: "", stack: [], overview: "",
  contributions: [], challenges: [], outcomes: [], retrospective: "", screenshots: [],
};

export const projectDetails: Record<string, ProjectDetail> = {
  "01": {
    ...emptyProjectDetail,
    period: "2026.08.10 ~ 2026.09.09",
    role: "팀장 · 핵심 서비스 기능 개발 · AI/Firebase 연동 · UI/UX 설계 및 프로젝트 통합",
    serviceName: "자작 (JAJAK)",
    demoAccount: { username: "jajak-admin01@jajak-admin.com", password: "Jajak!Admin01" },
    siteUrl: "https://jajak-ten.vercel.app/",
    githubUrl: "https://github.com/jiwoo1012/TeamProject2",
    presentationUrl: "https://drive.google.com/file/d/1nf2LojauKwL6H0yjc9x6jfAqVmFXsfjH/view?usp=drive_link",
    wireframeUrl: "https://www.figma.com/design/yLeM4521hKoDcxwNPyr4b6/%EC%9E%90%EC%9E%91-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84-%EC%B5%9C%EC%A2%85%EB%B3%B8?node-id=0-1&t=TidjJf4tEKyOYtH5-1",
    characterProposalUrl: "https://drive.google.com/file/d/1L3mmjmFX0dA0azi-fpyiNDGI3z58EuJA/view?usp=drive_link",
    scaffold: true,
    team: "5명 (팀 프로젝트)",
    stack: ["React", "Sass", "OpenAI", "Firebase", "GitHub", "Vercel"],
    overview: "자작(JAJAK)은 사용자의 술 취향과 그날의 기분·상황을 반영해 전통주, 안주, 술잔으로 구성된 맞춤형 주안상을 추천하는 AI 기반 커머스 플랫폼입니다.\n\n마스코트 '막둥이'를 통해 전통주를 친근하게 소개하고, AI 큐레이션으로 개인에게 어울리는 주안상을 제안합니다. 상품 탐색부터 찜·장바구니, 추천 기록 관리까지 하나의 서비스로 구현했습니다.",
    background: "",
    target: "",
    features: [
      { title: "AI 맞춤형 주안상 큐레이션", description: "사용자의 술 취향과 그날의 기분·상황을 반영해 전통주, 안주, 술잔으로 구성된 맞춤형 주안상을 추천합니다." },
      { title: "상품 탐색 · 찜 · 장바구니", description: "상품 탐색부터 찜·장바구니까지 하나의 서비스로 구현하고, Zustand로 상태를 관리합니다." },
      { title: "마이페이지 · 추천 기록 관리", description: "찜 목록과 AI 추천 기록을 조회하고 관리할 수 있습니다." },
    ],
    architecture: [
      { title: "AI 큐레이션 · OpenAI API", structure: "", dataFlow: "" },
      { title: "Firebase · 인증 및 데이터 저장", structure: "", dataFlow: "" },
      { title: "Zustand · 상태 관리", structure: "", dataFlow: "" },
    ],
    designIntegration: "",
    implementations: [
      {
        id: "ai-curation",
        title: "AI Curation",
        summary: "취향과 기분을 입력하면 전통주·안주·술잔을 하나의 주안상으로 추천하는 핵심 서비스입니다.",
        responsibilities: ["사용자 설문 및 추천 로직 구현", "추천 결과 페이지 개발", "AI 추천 기록 저장"],
        steps: ["추천 시작", "취향·기분 설문", "맞춤 주안상 확인", "추천 결과 저장"],
        video: "/project/jajak/AI%20Curation.mp4",
        implementationDetails: "AI가 반환한 조합 ID는 서버의 후보 목록과 대조해 존재하지 않거나 중복된 추천을 제외하고, 실제 상품 정보는 검증된 후보에서 가져오도록 했습니다. 추천 기록은 Firebase 인증 정보를 기준으로 접근하며, 회원 상태 확인과 저장 여부 변경을 Firestore 트랜잭션으로 처리했습니다.",
        flowchart: { src: "/project/jajak/jajak%20FlowChart.png", width: 1920, height: 1080, alt: "회원 여부에 따른 취향 조회와 설문 입력, 안전 정보 가공, 상품 필터링, 페어링 후보 생성, 추천 엔진 실행, 결과 검증과 화면 출력, 회원 추천 기록 저장으로 이어지는 AI 큐레이션 흐름도" },
        codeExamples: [
          {
            title: "AI 응답 검증",
            summary: "추천 후보 포함 여부와 중복 ID 검증",
            filename: "recommendation.js",
            code: `const candidateMap = new Map(
  candidateTables.map((table) => [table.tableId, table])
);
const usedTableIds = new Set();
const finalRecommendations = [];

aiRecommendations.forEach((recommendation) => {
  const table = candidateMap.get(recommendation.tableId);

  // 후보에 없는 조합과 중복 추천 제외
  if (!table) return;
  if (usedTableIds.has(recommendation.tableId)) return;

  usedTableIds.add(recommendation.tableId);

  finalRecommendations.push({
    tableId: recommendation.tableId,
    liquorId: table.liquor.productId,
    foodId: table.food.productId,
    glassId: table.glass.productId,
    reason: recommendation.reason,
    // 나머지 추천 설명 필드 생략
  });
});`,
            rationale: "AI가 반환한 조합 ID를 서버에서 구성한 후보 목록과 대조하고, 존재하지 않거나 중복된 추천을 제외했습니다. 실제 상품 ID는 검증된 후보 데이터에서 가져와 AI 응답을 그대로 신뢰하지 않도록 설계했습니다.",
          },
          {
            title: "추천 저장 트랜잭션",
            summary: "인증 기반 소유권 확인 및 저장 상태 변경",
            filename: "index.js",
            code: `// 앞단에서 로그인·익명 계정·요청 값 검증 수행
const userRef = db.collection('users').doc(request.auth.uid);
const recommendationRef = userRef
  .collection('recommendations')
  .doc(recommendationId);

await db.runTransaction(async (transaction) => {
  const user = await transaction.get(userRef);

  if (!user.exists || user.data().status !== 'active') {
    throw new HttpsError(
      'permission-denied',
      '추천 결과를 저장할 수 없는 회원 상태입니다.'
    );
  }

  const snapshot = await transaction.get(recommendationRef);

  if (!snapshot.exists) {
    throw new HttpsError('not-found', '추천 기록을 찾을 수 없습니다.');
  }

  if (snapshot.data().isSaved !== isSaved) {
    transaction.update(recommendationRef, { isSaved });
  }
});`,
            rationale: "Firebase 인증 정보를 기반으로 사용자별 추천 기록에 접근하고, 회원 상태 확인과 저장 여부 변경을 Firestore 트랜잭션으로 처리했습니다. 이미 동일한 저장 상태라면 업데이트를 생략해 중복 요청에도 일관된 결과를 유지하도록 구현했습니다.",
          },
        ],
        images: [
          { src: "/project/jajak/AI%20Curation02.png", width: 1536, height: 1277, title: "맞춤 주안상 결과", alt: "추천 전통주, 안주, 술잔의 설명과 추천 결과 저장 버튼이 있는 화면", caption: "전통주·안주·술잔과 추천 설명을 함께 확인하고 결과를 저장합니다." },
        ],
      },
      {
        id: "makdong-game", title: "Makdong's Tavern | 막동이 주막",
        tagline: "게임으로 경험하고, AI로 완성하는 나만의 주안상",
        summary: "손님의 취향과 요청을 바탕으로 전통주·안주·술잔을 선택해 주안상을 완성하는 체험형 미니게임을 React로 구현했습니다.\n\n손님별 대사·선택지·점수 데이터를 화면 로직과 분리하고, 선택 결과에 따른 만족도 및 단계별 피드백을 제공하도록 구성했습니다. 또한 requestAnimationFrame 기반 캐릭터 이동과 PC 키보드·모바일 터치 조작을 구현했습니다.",
        closing: "게임 완료 후에는 '내 주안상 추천받기' 버튼을 통해 AI 큐레이션으로 자연스럽게 연결되도록 설계하여, 게임에서 경험한 추천 과정을 사용자의 실제 취향 기반 추천으로 확장했습니다.",
        userFlow: [
          { title: "막동이 주막", description: "손님 취향에 맞는 주안상 선택", icon: "game" },
          { title: "게임 완료", description: "내 주안상 추천받기", icon: "click" },
          { title: "AI 큐레이션", description: "사용자 맞춤형 주안상 추천", icon: "sparkles" },
        ],
        responsibilities: [], steps: [], images: [], video: "/project/jajak/game.mp4",
        codeExamples: [
          {
            title: "선택지별 점수 계산 및 단계 전환",
            summary: "공통 선택 처리와 피드백 확인 후 단계 전환",
            code: `const handleSelectChoice = (option) => {
  if (!activeChoice) return;

  const score =
    currentCustomer.scores[activeChoice][option.id] ?? 0;

  setSelections((prev) => ({
    ...prev,
    [activeChoice]: option,
  }));

  setCurrentScore((prev) => prev + score);

  setChoiceFeedback({
    option,
    score,
    ...getScoreFeedback(score),
  });
};

const handleChoiceContinue = () => {
  if (!choiceFeedback || !activeChoice) return;

  const nextStage = {
    liquor: 'food',
    food: 'glass',
    glass: 'serve',
  };

  setGameStage(nextStage[activeChoice]);
  setChoiceFeedback(null);
  setActiveChoice(null);
  setIsNearTarget(false);
};`,
            rationale: "손님별 선택지와 점수 기준을 별도 데이터로 관리하고, 공통 선택 처리 로직을 재사용하도록 구성했습니다. 선택 직후 피드백을 제공하고 사용자가 확인한 뒤 다음 단계로 전환하도록 하여 게임 진행 흐름을 명확하게 분리했습니다.",
          },
          {
            title: "프레임 독립적인 캐릭터 이동",
            summary: "경과 시간에 비례한 이동과 프레임 지연 보정",
            code: `const deltaTime = Math.min(
  (currentTime - lastTimeRef.current) / 1000,
  0.05
);
lastTimeRef.current = currentTime;

if (moving) {
  const nextX =
    positionRef.current +
    moveDirection * MOVE_SPEED * deltaTime;

  const clampedX = clampCharacterX(nextX, CHARACTER_WIDTH);

  positionRef.current = clampedX;
  setCharacterX(clampedX);
}

animationFrameRef.current =
  requestAnimationFrame(updateCharacter);`,
            rationale: "프레임당 고정 거리가 아닌 경과 시간에 비례해 캐릭터의 이동량을 계산하여 화면 주사율에 따른 속도 차이를 줄였습니다. deltaTime의 최대값을 제한해 프레임 지연 시 발생할 수 있는 급격한 이동을 완화하고, useRef와 React 상태를 함께 사용해 좌표 관리와 화면 갱신을 처리했습니다.",
          },
        ],
      },
      {
        id: "user-commerce", title: "My Page | 개인화 취향 및 추천 기록 관리",
        tagline: "사용자의 취향을 기억하고, 추천 경험을 이어가는 마이페이지",
        summary: "회원가입 후 진행하는 취향 설문을 통해 사용자의 기본 주류 선호 정보를 저장하고, AI 큐레이션 이용 시 해당 정보에 그날의 기분과 상황을 결합하여 개인화된 주안상을 추천하도록 구현했습니다.\n\n마이페이지에서는 저장된 취향 정보를 시각적으로 확인하고, 이전 AI 추천 기록을 다시 조회할 수 있도록 구성했습니다. 또한 기존 화면의 레이아웃과 컴포넌트를 전면 재설계하고, 사용자별 데이터 조회·저장 기능을 직접 구현했습니다.",
        responsibilities: [], steps: [],
        highlights: [
          { title: "취향 데이터 관리", description: "회원별 기본 주류 취향 설문 결과 저장 및 조회" },
          { title: "개인화 추천 연동", description: "저장된 취향 정보와 당일 설문 응답을 결합하는 추천 데이터 흐름 구현" },
          { title: "추천 이력 관리", description: "사용자별 AI 추천 결과 조회 및 저장된 주안상 재확인" },
          { title: "UI 재설계", description: "마이페이지 레이아웃·컴포넌트 구조 재구현 및 취향 시각화 UI 개발" },
        ],
        images: [
          { src: "/project/jajak/mypage_main.png", width: 1536, height: 1733, title: "내 술 취향 대시보드", alt: "취향 지표와 선호 전통주 스타일, 기피 재료를 시각화한 마이페이지", caption: "저장된 취향을 지표와 키워드로 확인하고 취향 재설정과 AI 추천으로 연결합니다." },
          { src: "/project/jajak/mypage_01.png", width: 1536, height: 1580, title: "회원 정보와 활동 요약", alt: "회원 정보 메뉴와 취향 분석, 최근 주문, AI 추천을 모아 보여주는 마이페이지", caption: "회원 정보 관리 메뉴와 취향·주문·추천 요약을 한 화면에 배치했습니다." },
          { src: "/project/jajak/mypage_02.png", width: 1536, height: 1251, title: "AI 추천 기록", alt: "추천 통계, 저장한 추천과 주안상 목록을 보여주는 화면", caption: "사용자별 추천 기록과 저장한 주안상을 다시 확인할 수 있습니다." },
        ],
        personalizationFlow: [
          { title: "회원가입 후 기본 취향 설문", description: "사용자의 평소 주류 선호 정보 수집" },
          { title: "Firestore 사용자별 취향 저장", description: "이후 추천에서 다시 활용할 기본 정보" },
          { title: "AI 큐레이션", description: "저장된 기본 취향 + 오늘의 기분·상황 반영" },
          { title: "마이페이지", description: "나의 술 취향 시각화 및 추천 기록 조회" },
        ],
        codeExamples: [
          {
            title: "사용자별 취향 데이터 저장 및 조회",
            filename: "PreferenceSafety.jsx · AiPreference.jsx",
            summary: "취향과 기피 원료를 사용자 문서에 통합 저장하고 정규화하여 조회",
            code: `const userPreference = {
  sweetness: SWEETNESS_MAP[sweetnessValue] ?? null,
  acidity: ACIDITY_MAP[acidityValue] ?? null,
  bodyWeight: BODY_MAP[bodyValue] ?? null,
  scentIntensity: SCENT_MAP[scentValue] ?? null,
  alcoholRange: ABV_MAP[abvValue] ?? null,
  safety: {
    noAllergy,
    avoidIngredients: noAllergy ? [] : avoidIngredients,
    plantIngredients: noAllergy ? [] : selectedPlants,
    customIngredient: noAllergy ? '' : customInput.trim(),
  },
};

await updateDoc(doc(db, 'users', user.uid), {
  userPreference,
  updatedAt: serverTimestamp(),
});

// 마이페이지에서 저장된 취향 조회
const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
const rawPreference = userSnap.data()?.userPreference || null;
setPreference(normalizePreference(rawPreference));`,
            rationale: "사용자의 기본 취향과 기피 원료 정보를 users/{uid}.userPreference에 통합 저장하여 마이페이지와 AI 추천에서 동일한 데이터를 활용하도록 설계했습니다. 마이페이지에서는 정규화 과정을 거쳐 데이터를 시각화하며, 취향 정보를 변경하면 저장된 값을 갱신하도록 구성했습니다.",
          },
          {
            title: "서버 기반 개인화 추천 데이터 연계",
            filename: "functions/src/index.js",
            summary: "인증된 UID로 기본 취향을 조회하고 당일 설문과 결합",
            code: `const userSnap = await db
  .collection('users')
  .doc(request.auth.uid)
  .get();

const userPreference = userSnap.data().userPreference || null;

if (!userPreference) {
  throw new HttpsError(
    'failed-precondition',
    '먼저 취향 정보를 등록해주세요.'
  );
}

const result = await createRecommendation({
  userType: surveyType,
  userPreference,
  todaySurvey,
  liquors,
  foods,
  glasses,
  pairings,
  openaiApiKey,
  recommendationCount: 3,
});`,
            rationale: "AI 추천 서버에서 인증된 사용자 UID를 기반으로 저장된 취향 데이터를 직접 조회하도록 구성했습니다. 평소 취향인 userPreference와 당일 설문인 todaySurvey를 분리하여 저장된 선호도를 유지하면서도 그날의 기분과 상황을 반영한 추천이 가능하도록 구현했습니다.",
          },
        ],
        comparison: [
          { src: "/project/jajak/mypage_old.png", width: 3476, height: 3634, title: "Before · 기존 와이어프레임", alt: "개선 전 마이페이지 AI 추천 기록 와이어프레임", caption: "추천 요약과 기록 목록 중심의 기존 구성" },
          { src: "/project/jajak/mypage_02.png", width: 1536, height: 1251, title: "After · 개선 화면", alt: "추천 통계와 저장한 추천, 필터를 구분한 개선 후 화면", caption: "추천 통계·저장한 추천·목록을 구분하고 필터와 상세 보기 배치" },
        ],
      },
      {
        id: "admin-support", title: "Admin Dashboard | 관리자 시스템 및 데이터 시각화",
        tagline: "실제 운영 데이터를 기반으로 서비스 이용 현황을 시각화한 관리자 대시보드",
        summary: "기존 관리자 페이지의 레이아웃과 컴포넌트 구조를 전면 재설계하고, 각 관리 기능의 데이터 처리 로직을 통합하여 관리자 시스템을 구현했습니다.\n\nCloud Functions에서 수집한 AI 추천 실행 기록을 Firestore와 연동하고, Chart.js를 활용해 최근 7일간의 회원·비회원 AI 이용 추이와 주요 운영 지표를 시각화했습니다.",
        responsibilities: [], steps: [],
        highlights: [
          { title: "관리자 UI 재설계", description: "사이드바, 헤더, 공통 레이아웃 및 관리 화면의 컴포넌트 구조 전면 재구현" },
          { title: "운영 데이터 연동", description: "Firestore에 저장된 AI 추천 실행 로그 조회 및 데이터 정규화" },
          { title: "데이터 집계·시각화", description: "회원·비회원별 일간 이용 횟수 집계 및 Chart.js 기반 추이 그래프 구현" },
          { title: "관리 기능 통합", description: "팀원별로 개발한 데이터 처리 기능을 화면에 연결하고 테이블·입력 폼 등 공통 UI 통일" },
        ],
        images: [
          { src: "/project/jajak/admin02.png", width: 1536, height: 1314, title: "AI 추천 기록 관리", alt: "추천 지표, 검색 필터, 추천 기록 테이블과 취향 분석을 배치한 관리자 화면", caption: "AI 추천 실행 기록과 주요 지표를 한 화면에서 확인하도록 구성했습니다." },
        ],
        analyticsFlow: [
          { title: "Cloud Functions", description: "AI 추천 실행 상태 기록" },
          { title: "Firestore", description: "aiRecommendationLogs 컬렉션" },
          { title: "React", description: "날짜별·회원 유형별 데이터 집계" },
          { title: "Chart.js", description: "최근 7일 AI 이용 추이 시각화" },
        ],
        codeExamples: [
          {
            title: "AI 이용 데이터 집계 및 시각화",
            filename: "Dashboard.jsx",
            code: `const aiLogDocuments = await getCollection('aiRecommendationLogs');
setAiLogs(aiLogDocuments.map(normalizeAiLog));

const aiTrend = useMemo(
  () => recentDates.map((date) => {
    const dayLogs = aiLogs.filter(
      (log) =>
        log.createdAtKey === date.key &&
        log.status !== 'pending'
    );

    return {
      date: date.label,
      member: dayLogs.filter(
        (log) => log.userType === 'member'
      ).length,
      guest: dayLogs.filter(
        (log) => log.userType === 'guest'
      ).length,
    };
  }),
  [aiLogs, recentDates]
);

const chart = new Chart(context, {
  type: 'line',
  data: {
    labels: aiTrend.map((item) => item.date),
    datasets: [
      { label: '회원', data: aiTrend.map((item) => item.member) },
      { label: '비회원', data: aiTrend.map((item) => item.guest) },
    ],
  },
});`,
            rationale: "Firestore에 저장된 AI 추천 실행 로그를 날짜별로 가공하고, 회원·비회원 기준으로 분류하여 Chart.js에 전달했습니다. 최근 7일의 날짜 목록을 기준으로 집계해 이용 기록이 없는 날도 0으로 표시하고, 차트와 요약 지표가 동일한 집계 데이터를 사용하도록 구성했습니다.",
          },
        ],
        comparison: [
          { src: "/project/jajak/admin_old.png", width: 6600, height: 5282, title: "Before · 기존 관리자 와이어프레임", alt: "개선 전 대시보드와 각 관리 화면의 와이어프레임", caption: "기존 관리자 페이지의 레이아웃과 관리 화면 구성" },
          { src: "/project/jajak/admin_wireframe.png", width: 2195, height: 1457, title: "After · 재설계 와이어프레임", alt: "공통 사이드바, 운영 지표, 필터와 테이블을 재배치한 관리자 와이어프레임", caption: "공통 UI를 통일하고 운영 지표·검색 필터·테이블의 정보 구조를 재설계했습니다.", additionalImages: [{ src: "/project/jajak/admin01.png", width: 573, height: 541, alt: "재설계한 관리자 대시보드의 운영 지표와 서비스 이용 추이" }] },
        ],
      },
    ],
    contributionGroups: [
      { title: "01. 개발 기여", items: [
        { title: "AI 큐레이션", anchor: "ai-curation", description: "사용자 설문 및 추천 로직 구현, 결과 페이지 개발, 추천 기록 저장" },
        { title: "막동이 주막", anchor: "makdong-game", description: "게임 페이지 구현" },
        { title: "마이페이지", anchor: "user-commerce", description: "찜 목록·AI 추천 기록 조회, UI 설계 및 디자인" },
        { title: "커머스", anchor: "user-commerce", description: "찜·장바구니 기능 및 Zustand 상태 관리" },
        { title: "공통 컴포넌트", description: "Header, Footer, 검색 모달 개발" },
        { title: "관리자", anchor: "admin-support", description: "관리자 공통 레이아웃·헤더 개발, 대시보드 UI 설계 및 디자인" },
        { title: "라우팅", anchor: "admin-support", description: "고객센터 페이지 라우팅 및 화면 연결" },
      ] },
      { title: "02. 팀 리딩 및 협업", items: [
        { title: "프로젝트 관리", description: "개발 일정 수립, 팀원별 역할 분담 및 작업 진행 상황 관리" },
        { title: "UI/UX 통합", description: "전체 디자인 방향 조율, 공통 UI 기준 정립 및 페이지별 디자인 일관성 관리" },
        { title: "Git 협업", description: "브랜치 및 PR 관리, 코드 리뷰·병합, 충돌 해결" },
        { title: "기능 통합", description: "팀원별 구현 기능 연결 및 통합 과정의 오류 대응" },
        { title: "결과물 제작", description: "프로젝트 발표 자료 제작, 시연 영상 편집 및 최종 발표" },
      ] },
    ],
    challenges: [
      {
        title: "배포 환경별 API 호출 정책 개선",
        subtitle: "Vercel Preview 환경과 Firebase Callable Functions의 CORS 설정",
        problem: "Firebase Callable Functions의 CORS 허용 목록이 고정된 Production 및 로컬 개발 주소로 구성되어 있어, 주소가 달라지는 Vercel Preview 환경을 지원하지 못하는 문제가 있었습니다.",
        cause: "배포 환경마다 요청 Origin이 달라지지만, 기존 설정에서는 사전에 지정한 주소만 허용하도록 구성되어 있었습니다.",
        solution: "Firebase Callable Functions의 CORS 설정을 cors: true로 변경하여 Preview와 Production 환경의 Origin을 모두 허용하도록 수정했습니다.",
        result: "고정된 Origin 목록에 대한 의존성을 제거하고, 배포 주소가 변경되어도 CORS 허용 목록을 수정할 필요가 없도록 개선했습니다.",
        note: "cors: true는 모든 Origin을 허용하는 설정이며, 요청 인증을 대체하지 않습니다.",
        language: "JavaScript",
        before: `const CORS_ORIGINS = [
  'https://jajak-ten.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

{ cors: CORS_ORIGINS }`,
        after: `const recommendationOptions =
  USE_MOCK_AI
    ? { cors: true }
    : {
        cors: true,
        secrets: [OPENAI_API_KEY],
      };`,
      },
      {
        title: "AI 추천 결과의 데이터 신뢰성 확보",
        subtitle: "후보 ID·중복·추천 개수 검증을 통한 방어적 설계",
        problem: "OpenAI API의 응답 형식이 올바르더라도 실제 추천 후보에 없는 상품 조합이나 중복된 조합이 포함될 가능성이 있었습니다.",
        cause: "JSON 구조 검증만으로는 반환된 조합 ID가 서비스에서 생성한 후보에 실제로 존재하는지 보장할 수 없었습니다.",
        solution: "Map을 활용해 AI 응답의 조합 ID를 서버 후보 목록과 대조하고, Set으로 중복을 제거했습니다. 이후 최종 추천 개수를 검증하여 유효하지 않은 결과가 정상 응답으로 반환되지 않도록 처리했습니다.",
        result: "검증된 후보 데이터에서 최종 상품 ID를 확정하고, 유효한 추천 개수가 부족한 경우 오류로 처리하는 방어적 검증 구조를 구현했습니다.",
        codeAnchor: "ai-curation-code-1",
        validation: [
          { input: "유효한 후보 3개", result: "정상 처리" },
          { input: "후보에 없는 ID 포함", result: "해당 후보 제외" },
          { input: "동일한 조합 ID 반복", result: "중복 제외" },
          { input: "최종 추천 개수 부족", result: "오류 처리" },
        ],
        note: "구현 로직에 따른 예상 동작이며, 각 조건을 실행한 테스트 결과는 아닙니다. 앞의 코드 발췌는 후보 ID·중복 검증을 보여주며, 최종 추천 개수 검증은 생략되어 있습니다.",
      },
      {
        title: "관리자 페이지 공통 컴포넌트 리팩터링",
        subtitle: "반복 UI 분리 및 페이지별 데이터 처리 로직 유지",
        problem: "팀원별로 개발한 관리자 페이지에서 제목, 새로고침 버튼, 상태 표시 등의 UI가 개별적으로 구현되어 화면 간 일관성이 부족하고 반복 코드가 발생했습니다.",
        cause: "페이지별 기능 구현을 우선하면서 공통 UI와 페이지별 데이터 처리 로직이 명확하게 분리되지 않았습니다.",
        solution: "반복되는 화면 요소를 AdminPageHeader, AdminPanel, AdminStatusBadge 등의 공통 컴포넌트로 분리했습니다. 페이지별 데이터 처리 함수와 상태는 props로 전달하도록 구조를 변경했습니다.",
        result: "여러 관리자 페이지에서 동일한 UI 컴포넌트를 재사용하도록 개선했습니다. 공통 디자인의 수정 범위를 줄이면서 각 페이지의 고유 기능은 유지했습니다.",
        language: "JSX",
        before: `<header
  className={styles.pageToolbar}
>
  <h1>주문 관리</h1>
  <button onClick={handleRefresh}>
    새로고침
  </button>
</header>`,
        after: `<AdminPageHeader
  title="주문 관리"
  onRefresh={handleRefresh}
  isRefreshing={
    isRefreshing || isLoading
  }
/>`,
        note: "원본의 핵심 구조를 간결하게 표현한 발췌 예시입니다. 비교에 필요한 속성만 표시했으며 나머지 속성은 생략했습니다.",
      },
    ],
    outcomes: ["사용자별 취향 데이터와 당일 설문을 결합한 AI 주안상 추천 서비스를 구현하고, 추천 기록 관리·미니게임·커머스·관리자 기능을 하나의 플랫폼으로 완성했습니다. 팀장으로서 주요 기능 개발과 화면 재구현, 기능 통합까지 담당하며 서비스의 전체적인 완성도를 높였습니다."],
    retrospective: "AI 추천 후보 검증과 Firebase 인증·트랜잭션 구현을 통해 데이터의 유효성과 일관성을 고려하는 경험을 쌓았습니다. 또한 React 기반 게임 인터랙션과 Chart.js 데이터 시각화를 구현하며, 화면 개발을 넘어 비즈니스 로직과 서버 데이터 흐름을 함께 고려하는 역량을 키웠습니다.",
    improvements: "초기 공통 컴포넌트 및 UI 구현 기준이 충분히 정립되지 않아 통합 과정에서 재작업이 발생했습니다. 이를 해결하며 팀장에게는 기능 분담뿐 아니라 개발 기준 수립과 지속적인 통합 관리가 중요하다는 것을 배웠고, 향후 정기적인 코드 리뷰와 통합 테스트를 통해 협업 효율을 높이고자 합니다.",
    // team: "팀 구성과 인원",
    // stack: ["실제로 사용한 기술"],
    // contributions: [{ title: "담당 기능", description: "직접 구현한 범위와 방법" }],
    // challenges: [{ title: "문제 해결 제목", problem: "문제와 원인", solution: "선택한 해결 방법과 이유", result: "검증 결과" }],
    // outcomes: ["확인 가능한 결과 또는 성과"],
    // retrospective: "배운 점과 다음 개선 방향",
    // screenshots: [{ src: "/project/jajak/example.png", alt: "화면 설명", caption: "기능 설명" }],
  },
"02": {
    ...emptyProjectDetail,
    presentationUrl: "https://drive.google.com/file/d/1K_lMoqQjgvJ4LTUZ7BrEPr-yYvmk10Rv/view?usp=drive_link",
    wireframeUrl: "https://www.figma.com/design/76zc3GTDywQgEaAyWTi3Jr/1.5%EC%B0%A8-%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8---%EC%B1%94%EB%B2%84%EC%8A%A4?node-id=0-1&t=LJWXH9TjVJb3gIZJ-1",
    serviceName: "CHAMVERSE",
    siteUrl: "https://kimhyeonso.github.io/CHAMVERSE/html/intro.html",
    githubUrl: "https://github.com/kimhyeonso/NODE",
    period: "2026.07.22 - 2026.07.24",
    team: "4명 (팀 프로젝트)",
    role: "기획/디자인: 콘텐츠 이용 영역 UI/UX 화면 설계\n화면 구현: 캐릭터 투표, 랭킹 이미지, 마이페이지 구현",
    stack: ["HTML5", "CSS3", "JavaScript"],
    overview: "CHAMVERSE는 캐릭터를 중심으로 다양한 콘텐츠를 탐색하고, 최애 캐릭터 투표와 랭킹을 통해 사용자들이 직접 참여할 수 있도록 제작한 웹사이트입니다. 이벤트 소개부터 캐릭터 선택, 투표 결과 확인, 마이페이지까지 이어지는 사용자 경험을 구현했으며, 직관적인 UI와 인터랙션을 통해 팬덤 콘텐츠를 즐길 수 있도록 구성했습니다.",
    
    contributionGroups: [
      {
        title: "담당 주요 기능",
        items: [
          { title: "캐릭터 투표", anchor: "vote-character", description: "캐릭터 선택·해제 및 투표 버튼 상태 연동" },
          { title: "랭킹 페이지", anchor: "vote-ranking", description: "캐릭터별 순위 정보를 보여주는 랭킹 UI 구현" },
          { title: "마이페이지", anchor: "mypage", description: "사용자 정보 및 콘텐츠 이용을 위한 마이페이지 UI 구현" },
          { title: "UI/UX 화면 설계", anchor: "event-intro", description: "콘텐츠 탐색과 이용 흐름을 고려한 와이어프레임 설계" },
        ],
      },
    ],

    implementations: [
      {
        id: "event-intro",
        title: "01. 이벤트 진입 페이지",
        summary: "이벤트 콘텐츠를 소개하고, 사용자가 투표 페이지로 진입할 수 있도록 구성한 안내 페이지입니다.",
        responsibilities: [
          "- 이벤트 진입 화면 구현",
          "- 이벤트 안내 콘텐츠 및 UI 구성",
          "- 투표 페이지 이동 기능 구현"
        ],
        steps: ["이벤트 소개 확인", "투표 참여 버튼 클릭", "투표 페이지 진입"],
        implementationDetails: "이벤트의 주요 정보를 한눈에 확인할 수 있도록 화면을 구성하고, 사용자가 투표 기능으로 자연스럽게 이동할 수 있도록 페이지 간 이동 흐름을 구현했습니다.",
        images: [{
          src: "/project/chamverse/vote-event.png", width: 1466, height: 6847,
          title: "이벤트 진입 페이지", alt: "CHAMVERSE 캐릭터 투표 이벤트 소개부터 TOP 3와 전체 순위까지의 전체 화면",
          caption: "캐릭터 투표 이벤트 페이지", autoScroll: true,
        }],
      },
      {
        id: "vote-character",
        title: "02. 최애 캐릭터 투표",
        summary: "좋아하는 캐릭터를 선택하고 투표할 수 있는 사용자 참여형 기능입니다.",
        responsibilities: [
          "- 캐릭터 선택 및 선택 해제 기능",
          "- 선택 캐릭터 정보와 하단 투표 UI 연동",
          "- 투표 버튼 활성화 상태 관리"
        ],
        steps: ["캐릭터 카드 선택", "플로팅 선택 정보 확인", "투표 제출"],
        implementationDetails: "selectedCharacter를 기준으로 캐릭터 선택 상태를 관리하고, 카드의 선택 표시와 하단 캐릭터 정보 및 투표 버튼이 함께 변경되도록 구현했습니다. 이벤트 위임과 closest()를 활용해 카드 내부 어느 영역을 클릭해도 동일한 선택 동작이 실행되도록 처리했습니다.",
        video: "/project/chamverse/mobile.mp4",
        codeExamples: [
          {
            title: "선택 상태와 투표 UI 동기화",
            summary: "selectedCharacter 상태에 따라 하단 플로팅 UI와 제출 버튼 상태를 갱신하는 함수 구현",
            filename: "vote.js",
            code: `const updateFloating = () => {
  if (!selectedCharacter) {
    clearSelection();
    return;
  }

  selectedName.textContent =
    \`\${selectedCharacter.name}을(를) 선택했어요!\`;

  selectedThumb.innerHTML = \`
    <img
      src="\${selectedCharacter.image}"
      alt="\${selectedCharacter.name}"
    >
  \`;

  selectedThumb.style.background = selectedCharacter.color;
  voteSubmit.disabled = false;
  voteFloating.classList.add('is-visible');
};

const clearSelection = () => {
  document.querySelectorAll('.vote-character').forEach(item => {
    item.classList.remove('is-selected');
  });

  voteSubmit.disabled = true;
  voteFloating.classList.remove('is-visible');
  selectedThumb.innerHTML = '';
  selectedName.textContent = '캐릭터를 선택해주세요';
};`,
            rationale: "selectedCharacter를 단일 상태 기준으로 설정하고 updateFloating()과 clearSelection()으로 UI 갱신을 분리하여 캐릭터 선택/해제 시 연관된 UI들이 일관되게 동작하도록 구현했습니다.",
          },
          {
            title: "카드 내부 클릭 위치와 관계없는 선택 처리",
            summary: "이벤트 위임과 closest()를 활용해 카드 내 어디를 눌러도 정상 동작하도록 처리",
            filename: "vote.js",
            code: `characterGrid.addEventListener('click', event => {
  const card = event.target.closest('.vote-character');

  if (!card) return;

  const characterId = card.dataset.characterId;
  const character = characters.find(
    item => item.id === characterId
  );

  if (!character) return;

  // 캐릭터 선택 및 UI 갱신
});`,
            rationale: "개별 자식 요소에 이벤트 리스너를 일일이 걸지 않고 characterGrid 부모 요소에 이벤트 위임을 적용한 후, closest('.vote-character')를 사용해 이미지나 텍스트 어디를 클릭하든 정확하게 해당 카드의 dataset 값을 조회할 수 있도록 최적화했습니다.",
          },
        ],
        images: [{
          src: "/project/chamverse/vote.png", width: 1466, height: 2508,
          title: "최애 캐릭터 투표", alt: "CHAMVERSE 최애 캐릭터 선택 및 투표 화면",
          caption: "캐릭터 선택과 투표 참여", autoScroll: true,
        }],
      },
      {
        id: "vote-ranking",
        title: "03. 투표 랭킹",
        summary: "캐릭터별 투표 순위를 확인할 수 있도록 구성한 랭킹 페이지입니다.",
        responsibilities: [
          "- 캐릭터별 랭킹 화면 구현",
          "- 순위 및 캐릭터 정보 UI 구성",
          "- 랭킹 페이지 레이아웃 및 스타일링"
        ],
        steps: ["TOP 랭킹 확인", "전체 캐릭터 순위 조회"],
        implementationDetails: "캐릭터별 순위와 관련 정보를 사용자가 쉽게 비교할 수 있도록 랭킹 화면을 구성하고, 주요 정보를 시각적으로 구분해 확인할 수 있는 UI를 구현했습니다.",
        images: [{
          src: "/project/chamverse/rank.png", width: 1466, height: 3287,
          title: "투표 랭킹", alt: "CHAMVERSE 캐릭터별 투표 순위와 전체 랭킹 화면",
          caption: "캐릭터 투표 랭킹", autoScroll: true,
        }],
      },
      {
        id: "mypage",
        title: "04. 마이페이지",
        summary: "사용자와 관련된 정보 및 콘텐츠 이용 기능을 확인할 수 있도록 구성한 개인화 페이지입니다.",
        responsibilities: [
          "- 마이페이지 화면 및 레이아웃 구현",
          "- 사용자 정보 표시 영역 구성",
          "- 콘텐츠 이용 관련 UI 구현"
        ],
        steps: ["마이페이지 진입", "이용 현황 및 정보 확인"],
        implementationDetails: "사용자 정보와 콘텐츠 이용 영역을 구분하여 마이페이지를 구성하고, 각 기능을 쉽게 찾고 이용할 수 있도록 화면 구조와 UI를 구현했습니다.",
        images: [{
          src: "/project/chamverse/mypage.png", width: 1466, height: 1763,
          title: "마이페이지", alt: "CHAMVERSE 회원 정보, 계속 시청하기, 찜한 콘텐츠 및 설정을 보여주는 마이페이지",
          caption: "회원 정보와 콘텐츠 이용 영역", autoScroll: true,
        }],
      },
    ],

    challenges: [
      {
        title: "선택 상태와 투표 UI 동기화",
        subtitle: "상태 변경에 따른 하단 플로팅 바 및 버튼 활성화 제어",
        problem: "카드 선택 표시, 하단 캐릭터 정보, 투표 버튼의 상태를 일관되게 관리하는 과정에서 상태 불일치가 발생할 수 있었습니다.",
        cause: "여러 DOM 요소를 개별적으로 제어할 경우 상태 변경 타이밍에 따라 일부 UI만 업데이트되거나 누락되는 상황이 발생했습니다.",
        solution: "초기 개별 제어 방식에서 벗어나, updateFloating()과 clearSelection() 함수를 도입하여 selectedCharacter 상태 변화에 따라 하단 플로팅 정보와 투표 제출 버튼의 활성화 여부가 한 번에 연동되도록 수정했습니다.",
        result: "캐릭터 변경 및 선택 해제 시 관련 UI가 빠짐없이 함께 변경되도록 구현했습니다.",
        language: "JavaScript",
        before: `let selectedCharacter = null;

if (selectedCharacter?.id === character.id) {
  selectedCharacter = null;
  clearSelection();
  return;
}

selectedCharacter = character;

document.querySelectorAll('.vote-character').forEach(item => {
  item.classList.remove('is-selected');
});

card.classList.add('is-selected');
updateFloating();`,
        after: `const updateFloating = () => {
  if (!selectedCharacter) {
    clearSelection();
    return;
  }

  selectedName.textContent =
    \`\${selectedCharacter.name}을(를) 선택했어요!\`;

  selectedThumb.innerHTML = \`
    <img
      src="\${selectedCharacter.image}"
      alt="\${selectedCharacter.name}"
    >
  \`;

  selectedThumb.style.background = selectedCharacter.color;
  voteSubmit.disabled = false;
  voteFloating.classList.add('is-visible');
};

const clearSelection = () => {
  document.querySelectorAll('.vote-character').forEach(item => {
    item.classList.remove('is-selected');
  });

  voteSubmit.disabled = true;
  voteFloating.classList.remove('is-visible');
  selectedThumb.innerHTML = '';
  selectedName.textContent = '캐릭터를 선택해주세요';
};`,
      },
      {
        title: "카드 내부 클릭 위치와 관계없는 선택 처리",
        subtitle: "이벤트 위임과 closest() 및 data-attribute 활용",
        problem: "이미지·텍스트 등 카드 내부의 어느 요소를 클릭해도 동일한 선택 로직이 실행되어야 하는 요구사항이 있었습니다.",
        cause: "자식 요소(이미지나 텍스트)를 직접 클릭할 때 target이 카드 버튼이 아닌 내부 태그를 가리키게 되어 데이터 조회가 실패하는 문제가 있었습니다.",
        solution: "기존의 개별 요소 타깃 참조 방식에서 벗어나, 부모 그리드에 이벤트 위임을 적용하고 closest('.vote-character')와 dataset.characterId를 활용하여 카드 내부 어느 영역을 클릭하든 정확한 캐릭터 데이터를 판별하도록 개선했습니다.",
        result: "클릭 위치와 관계없이 정확한 캐릭터 데이터를 조회하고 선택 상태를 처리했습니다.",
        language: "JavaScript",
        before: `<button
  type="button"
  class="vote-character"
  data-character-id="\${character.id}"
>
  <!-- 캐릭터 이미지와 이름 -->
</button>`,
        after: `characterGrid.addEventListener('click', event => {
  const card = event.target.closest('.vote-character');

  if (!card) return;

  const characterId = card.dataset.characterId;
  const character = characters.find(
    item => item.id === characterId
  );

  if (!character) return;

  // 캐릭터 선택 및 UI 갱신
});`,
      },
    ],

    outcomes: [
      "콘텐츠 이용 영역의 UI/UX 설계와 캐릭터 투표·랭킹·마이페이지 구현을 담당하며, 애니메이션 콘텐츠를 탐색하고 참여할 수 있는 OTT 플랫폼 제작에 기여했습니다.",
    ],
    retrospective: "JavaScript를 활용한 DOM 조작과 이벤트 처리, 선택 상태 관리 등을 경험하며 사용자 인터랙션을 구현하는 역량을 키웠습니다.",
    improvements: "짧은 개발 기간 동안 팀원 간 작업 범위와 구현 기준을 사전에 명확히 정하는 것이 중요하다는 점을 배웠습니다. 이후에는 공통 UI 규칙과 기능 연결 방식을 먼저 정리해 통합 과정의 재작업을 줄이고자 합니다.",
  },
  "03": {
    ...emptyProjectDetail,
    serviceName: "onvé",
    siteUrl: "https://onve-five.vercel.app/",
    githubUrl: "https://github.com/jiwoo1012/onve", // 필요시 실제 깃허브 주소로 수정하세요
    demoAccount: { username: "qwer@asd.com", password: "12345678" },
    period: "2026.07 - 2026.08",
    team: "1명 (개인 프로젝트)",
    role: "기획/디자인, 프론트엔드 개발, 인증/데이터 연동, 관리자/운영 전 과정 단독 수행",
    stack: ["React", "Vite", "Zustand", "Firebase", "SCSS", "GSAP", "Recharts", "Vercel"],
    overview: "onvé는 상품 탐색부터 장바구니, 주문, 사용자 정보 관리까지 온라인 쇼핑의 주요 흐름을 구현한 패션 이커머스 웹 서비스입니다.\n\n사용자가 상품을 편리하게 탐색하고 구매할 수 있도록 화면을 구성했으며, React 기반의 프론트엔드 개발과 Firebase를 활용한 인증 및 데이터 연동 기능을 구현했습니다.\n서비스 기획, UI/UX 디자인, 프론트엔드 개발, 데이터베이스 연동 및 배포까지 전 과정을 단독으로 진행한 개인 프로젝트입니다.",
    
    contributionGroups: [
      {
        title: "담당 역할 & 구현 내용",
        items: [
          { title: "기획·디자인", description: "서비스 구조 설계, 사용자 흐름 기 기획, UI/UX 디자인" },
          { title: "프론트엔드", description: "공통 레이아웃, 상품 탐색, 상세 페이지 및 커머스 기능 구현" },
          { title: "인증·데이터", description: "Firebase 기반 사용자 인증, 데이터 저장 및 연동" },
          { title: "관리자·운영", description: "관리자 기능 구현, 서비스 배포 및 테스트" },
        ],
      },
      {
        title: "기술 스택",
        items: [
          { title: "Frontend", description: "React, JavaScript, React Router" },
          { title: "Styling", description: "SCSS, GSAP" },
          { title: "State Management", description: "Zustand" },
          { title: "Backend / Database", description: "Firebase" },
          { title: "Data Visualization", description: "Recharts" },
          { title: "Build / Deployment", description: "Vite, Vercel" },
        ],
      },
    ],

    implementations: [
      {
        id: "auth",
        video: "/project/onve/login.mp4",
        title: "01. 회원가입 및 사용자 인증",
        summary: "Firebase Authentication을 기반으로 안전한 회원가입, 로그인, 로그아웃 및 권한별 접근 제어를 구현했습니다.",
        responsibilities: [
          "- Firebase Authentication 기반 회원가입·로그인·로그아웃 구현",
          "- Zustand를 활용한 인증 상태 및 사용자 프로필 관리",
          "- 로그인 여부와 관리자 권한에 따른 페이지 접근 제어"
        ],
        steps: ["회원가입/로그인 요청", "Firebase 인증 처리", "Zustand 상태 반영 및 권한 제어"],
        implementationDetails: "Firebase Authentication과 연동하여 사용자의 세션을 안전하게 관리하고, Zustand 스토어를 통해 전역에서 인증 상태와 프로필을 참조할 수 있도록 구성했습니다.",
        images: [],
      },
      {
        id: "product-search",
        video: "/project/onve/product.mp4",
        title: "02. 상품 조회 및 검색·정렬",
        summary: "Firestore에 저장된 상품 데이터를 기반으로 세밀한 필터링과 정렬 기능을 제공합니다.",
        responsibilities: [
          "- Firestore 기반 상품 목록 조회 및 카테고리별 필터링",
          "- 상품명 검색 및 인기순·최신순·가격순·이름순 정렬",
          "- 할인율을 반영한 가격 정렬 및 검색 결과 상태 처리"
        ],
        steps: ["카테고리 선택 및 검색어 입력", "Firestore 쿼리 필터링", "정렬 조건 반영 결과 출력"],
        implementationDetails: "사용자의 검색어와 카테고리, 정렬 조건을 동적으로 결합하여 Firestore 상품 데이터를 조회하고, 할인율이 적용된 최종 가격을 기준으로 정확한 정렬이 이루어지도록 구현했습니다.",
        images: [],
      },
      {
        id: "cart-order",
        title: "03. 장바구니 및 주문·재고 관리",
        summary: "LocalStorage와 Firestore 트랜잭션을 연동하여 안정적인 장바구니 및 주문 처리 프로세스를 구축했습니다.",
        responsibilities: [
          "- 상품 수량 변경·삭제 및 localStorage 기반 장바구니 유지",
          "- 할인 금액과 배송비를 반영한 주문 예정 금액 계산",
          "- Firebase Cloud Functions와 Firestore 트랜잭션을 활용한 주문 생성 및 재고 차감"
        ],
        steps: ["장바구니 상품 및 수량 관리", "최종 결제 금액 계산", "트랜잭션 기반 주문 생성 및 재고 차감"],
        implementationDetails: "클라이언트 측에서는 localStorage로 장바구니 상태를 유지하고, 주문 단계에서는 Cloud Functions와 Firestore 트랜잭션을 결합하여 동시성 문제를 방지하며 재고가 안전하게 차감되도록 구현했습니다.",
        images: [{
          src: "/project/onve/cart.png",
          alt: "onvé 장바구니 상품과 주문 예정 금액 화면",
          title: "장바구니",
          caption: "장바구니 상품 및 주문 예정 금액 확인",
          width: 1897,
          height: 904,
        }],
      },
      {
        id: "admin-dashboard",
        video: "/project/onve/admin.mp4",
        title: "04. 관리자 페이지 및 대시보드",
        summary: "운영 데이터를 시각화하고 상품 및 회원 정보를 효율적으로 관리할 수 있는 관리자 대시보드입니다.",
        responsibilities: [
          "- 상품 등록·수정·삭제 및 재고 관리 기능 구현",
          "- 회원·상품·리뷰 데이터 집계 및 운영 현황 조회",
          "- Recharts 기반 카테고리별 재고 시각화 및 재고 부족 상품 표시"
        ],
        steps: ["관리자 계정 로그인", "운영 지표 및 대시보드 확인", "상품 및 재고 관리 수행"],
        implementationDetails: "관리자 전용 권한을 통해 상품 관리(CRUD)와 회원/리뷰 데이터를 조회할 수 있으며, Recharts를 도입해 카테고리별 재고 분포와 부족 상품 현황을 직관적인 차트로 시각화했습니다.",
        images: [],
      },
    ],

    challenges: [
      {
        title: "비동기 인증 상태 확인에 따른 페이지 이동 오류",
        subtitle: "Firebase 인증 상태 복원 전 로그인 페이지 강제 이동 방지",
        problem: "로그인한 사용자가 마이페이지에 직접 접근하거나 새로고침할 때, Firebase 인증 상태가 복원되기 전에 로그인 페이지로 이동하는 문제를 해결해야 했습니다.",
        cause: "초기 렌더링 시 인증 정보가 아직 로드되지 않아 user 상태가 null로 판별되면서 비로그인 사용자로 오인하는 현상이 발생했습니다.",
        solution: "인증 확인 전의 null 상태가 비로그인으로 처리되는 문제를 방지하기 위해 사용자 정보와 인증 확인 여부를 별도로 관리했습니다. Firebase 인증 콜백이 실행되기 전에는 로딩 화면을 표시하고, 확인 완료 후에만 페이지 이동을 처리하도록 변경했습니다. 이를 통해 비동기 인증 과정에서 발생하는 잘못된 페이지 이동을 방지하고, 컴포넌트 해제 시 인증 구독도 정리했습니다.",
        result: "새로고침 시 인증 정보가 안정적으로 복원된 후 페이지가 렌더링되도록 개선하여 불필요한 리다이렉트 오류를 해결했습니다.",
        language: "JavaScript",
        after: `const [user, setUser] = useState(null);
const [isAuthChecked, setIsAuthChecked] = useState(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setIsAuthChecked(true);

    if (!currentUser) navigate('/login');
  });

  return () => unsubscribe();
}, [navigate]);

if (!isAuthChecked) {
  return <p>인증 정보를 확인하는 중입니다.</p>;
}

if (!user) return null;`,
      },
      {
        title: "Firebase 인증 계정과 회원 데이터 불일치",
        subtitle: "Authentication 계정 존재 시 Firestore 누락 프로필 자동 복구",
        problem: "Firebase Authentication에는 계정이 존재하지만 Firestore에 회원 문서가 없는 경우에도 마이페이지에서 사용자 정보를 조회할 수 있도록 개선해야 했습니다.",
        cause: "비정상적인 가입 중단이나 데이터 손실로 인해 Auth와 Firestore 간 데이터 동기화가 깨지는 예외 상황이 존재했습니다.",
        solution: "회원 정보 조회 시 user-not-found 오류를 구분하고, 해당 경우에만 기본 프로필을 생성하도록 복구 로직을 추가했습니다. 기존 문서가 존재하면 이를 재사용하고 다른 오류는 별도로 처리하여, 회원 데이터 누락 상황에서도 마이페이지 정보를 복구할 수 있도록 개선했습니다.",
        result: "데이터 누락으로 인한 앱 크래시나 조회 실패를 예방하고 무결성을 높였습니다.",
        language: "JavaScript",
        after: `let userProfile;

try {
  userProfile = await getUserProfile(user.uid);
} catch (error) {
  if (error.message !== 'user-not-found') throw error;

  userProfile = await createUserProfile(user);
}

setProfile(userProfile);
setNickname(userProfile.nickname || '');`,
      },
      {
        title: "화면별 데이터 저장소 불일치 및 상태 동기화",
        subtitle: "LocalStorage와 React 상태 동시 갱신을 통한 장바구니 일관성 확보",
        problem: "상품 상세·장바구니와 마이페이지에서 서로 다른 저장소를 사용하여, 장바구니 데이터가 화면마다 일치하지 않을 수 있는 구조를 개선해야 했습니다.",
        cause: "화면마다 데이터를 다루는 기준과 저장 위치가 분리되어 있어 컴포넌트 간 실시간 동기화가 이루어지지 않았습니다.",
        solution: "두 화면이 동일한 cart 키를 사용하도록 저장소를 통일하고, 상품 삭제 시 localStorage와 React 상태를 함께 갱신하도록 수정했습니다. 이를 통해 동일 브라우저 내 화면 간 데이터 조회 기준을 일치시키고 장바구니 관리 로직의 일관성을 개선했습니다.",
        result: "어떤 화면에서 장바구니를 수정하더라도 즉시 UI와 저장소에 동일하게 반영되도록 정합성을 맞췄습니다.",
        language: "JavaScript",
        after: `// 동일한 localStorage 데이터 조회
setCartItems(loadLocal('cart', []));

// 삭제 시 저장 데이터와 React 상태 동시 갱신
const nextItems = cartItems.filter(
  (item) => item.id !== itemId
);

saveLocal('cart', nextItems);
setCartItems(nextItems);`,
      },
      {
        title: "Vercel 배포 환경에서 SPA 라우팅 처리",
        subtitle: "Client-side Routing 404 오류 해결을 위한 Vercel Rewrite 설정",
        problem: "React Router 기반 SPA에서 하위 경로로 직접 접근하거나 새로고침할 때 발생할 수 있는 404 오류를 방지해야 했습니다.",
        cause: "React Router는 클라이언트에서 경로를 처리하지만, 하위 주소로 직접 접근하면 배포 서버가 먼저 요청을 처리한다는 점을 확인했습니다.",
        solution: "이에 Vercel의 rewrite 규칙을 추가하여 요청 주소를 유지하면서 index.html을 제공하도록 구성했습니다. 이를 통해 하위 경로 요청을 React Router에서 처리할 수 있도록 배포 환경을 개선했습니다.",
        result: "새로고침이나 직접 URL 입력 시에도 404 에러 없이 정상적으로 라우팅되도록 설정했습니다.",
        language: "JSON",
        after: `vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`,
      },
    ],

    outcomes: [
      "서비스 기획부터 UI/UX 디자인, 프론트엔드 개발, Firebase 연동 및 배포까지 전 과정을 단독으로 진행했습니다.",
      "사용자 인증, 상품 탐색, 장바구니·주문, 관리자 대시보드 등 이커머스의 주요 기능을 구현하며 하나의 웹 서비스를 완성했습니다.",
      "기여도: 100% / 개인 프로젝트"
    ],

    retrospective: "Firebase Authentication과 Firestore를 연동하며 인증 상태 관리와 회원 데이터 처리 경험을 쌓았습니다. 또한 Cloud Functions와 Firestore 트랜잭션을 활용한 주문·재고 처리, Zustand 기반 상태 관리 및 배포 환경의 라우팅 문제를 해결하며 데이터 흐름과 일관성을 고려하는 역량을 키웠습니다.",

    improvements: "장바구니 데이터를 localStorage로 관리해 브라우저나 기기 간 데이터 공유에 한계가 있었습니다. 향후 사용자별 장바구니 데이터를 서버에 저장하고, 주문 처리 로직의 예외 상황과 데이터 검증을 보완하여 서비스의 안정성과 확장성을 높이고자 합니다.",
  },
"04": {
    ...emptyProjectDetail,
    serviceName: "Bookly",
    siteUrl: "https://dashboard-tau-eight-12.vercel.app/",
    githubUrl: "https://github.com/jiwoo1012/bookly", // 예시 주소, 필요시 수정하세요
    period: "2026.08.24 - 2026.09.01",
    team: "1명 (개인 프로젝트)",
    role: "대시보드 및 데이터 시각화, 도서·회원·게시판·계정 관리 기능 개발, 인터랙션 구현 단독 수행",
    stack: ["React", "SCSS", "GSAP", "Chart.js", "Vite", "Vercel"],
    overview: "BOOKLY는 도서 서비스의 운영 데이터를 효율적으로 관리하고 시각화하기 위해 제작한 도서 관리 관리자 대시보드입니다.\n\n회원 현황과 독서 통계, 도서 정보, 리뷰, 공지사항, 이벤트, 문의 및 관리자 계정을 하나의 시스템에서 관리할 수 있도록 구성했습니다. Chart.js를 활용해 주요 통계 데이터를 시각화하고, 검색·필터링·상세 조회 기능을 통해 필요한 정보를 빠르게 확인할 수 있도록 구현했습니다.\n또한 드래그 스크롤, 슬라이딩 탭, 모달, 토스트 알림 등 다양한 인터랙션을 적용해 관리자의 업무 효율성과 사용 편의성을 고려한 관리 환경을 구현했습니다.",
    
    contributionGroups: [
      {
        title: "담당 역할 & 구현 내용",
        items: [
          { title: "대시보드 및 데이터 시각화", anchor: "stats", description: "Chart.js 기반 통계 차트 구현, 회원 추이 및 도서 장르별 데이터 시각화" },
          { title: "도서·회원 관리", anchor: "books", description: "도서 검색 및 카테고리 필터링, 인기 도서 조회, 회원 검색 및 상태별 조회 기능 구현" },
          { title: "게시판 및 콘텐츠 관리", anchor: "board", description: "리뷰·이벤트·공지사항 관리, 베스트 리뷰 설정 및 문의 상태별 조회 기능 구현" },
          { title: "관리자 계정 관리", anchor: "admins", description: "관리자 등록·수정·삭제, 역할 및 활성 상태 변경, 상세 정보 모달 구현" },
          { title: "UI 및 사용자 인터랙션", anchor: "interaction", description: "드래그 스크롤, 슬라이딩 탭, 모달, 토스트 알림 등 관리자 화면의 인터랙션 구현" },
        ],
      },
    ],

    implementations: [
      {
        id: "stats",
        video: "/project/dashboard/one.mp4",
        title: "01. 통계 데이터 시각화",
        summary: "Chart.js를 활용하여 회원 추이 및 도서 장르별 독서 지표를 직관적으로 시각화했습니다.",
        responsibilities: [
          "- Chart.js 기반 통계 차트 구현",
          "- 회원 추이 및 도서 장르별 데이터 시각화"
        ],
        steps: ["데이터 수집 및 가공", "Chart.js 인스턴스 생성", "반응형 통계 차트 렌더링"],
        implementationDetails: "Chart.js를 활용해 회원 추이 및 도서 장르별 독서 지표 차트를 구현하여 서비스 운영 핵심 지표를 한눈에 파악할 수 있도록 구성했습니다.",
        images: [],
      },
      {
        id: "books",
        video: "/project/dashboard/two.mp4",
        title: "02. 도서 관리 기능",
        summary: "도서명·저자 검색, 카테고리 및 기간별 인기 도서 조회와 상세 정보를 제공합니다.",
        responsibilities: [
          "- 도서 검색 및 카테고리 필터링",
          "- 인기 도서 조회",
          "- 도서 상세 정보 제공"
        ],
        steps: ["도서 검색어 입력 및 필터 선택", "조건별 도서 목록 조회", "상세 정보 모달 확인"],
        implementationDetails: "도서명 및 저자 검색 기능을 제공하고, 카테고리별·기간별 인기 도서 조회와 상세 정보 모달을 통해 방대한 도서 데이터를 효율적으로 관리할 수 있도록 구현했습니다.",
        images: [],
      },
      {
        id: "members",
        video: "/project/dashboard/three.mp4",
        title: "03. 회원 관리 기능",
        summary: "아이디·이름·닉네임 검색과 회원 상태별 필터링, 상세 정보 모달을 통한 관리 기능을 제공합니다.",
        responsibilities: [
          "- 아이디·이름·닉네임 검색",
          "- 회원 상태별 필터링",
          "- 상세 정보 모달 구현"
        ],
        steps: ["회원 검색어 입력", "상태별 필터 적용", "상세 정보 확인"],
        implementationDetails: "아이디, 이름, 닉네임 기반의 빠른 회원 검색과 상태별 필터링을 지원하며, 상세 모달을 통해 개별 회원의 정보를 정확하게 조회하고 관리할 수 있습니다.",
        images: [],
      },
      {
        id: "board",
        video: "/project/dashboard/four.mp4",
        title: "04. 게시판 관리 기능",
        summary: "리뷰, 이벤트, 공지사항, 문의 게시판의 통합 관리 및 상태별 조회 기능을 구현했습니다.",
        responsibilities: [
          "- 리뷰 노출 및 베스트 리뷰 설정",
          "- 이벤트·공지사항 CRUD",
          "- 문의 상태별 조회 구현"
        ],
        steps: ["게시판 유형 선택", "콘텐츠 등록·수정·삭제 및 베스트 선정", "문의 상태별 필터 조회"],
        implementationDetails: "리뷰 관리와 베스트 리뷰 설정, 이벤트 및 공지사항의 CRUD 기능을 제공하며, 고객 문의를 상태별로 분류하여 신속하게 응대할 수 있는 관리 프로세스를 구축했습니다.",
        images: [],
      },
      {
        id: "admins",
        video: "/project/dashboard/five.mp4",
        title: "05. 관리자 계정 관리",
        summary: "관리자 등록·수정·삭제 및 역할 설정, 활성·비활성 상태를 제어하는 계정 관리 기능입니다.",
        responsibilities: [
          "- 관리자 등록·수정·삭제",
          "- 역할 설정 및 활성·비활성 상태 관리",
          "- 상세 정보 모달 구현"
        ],
        steps: ["관리자 목록 조회", "계정 정보 수정 및 상태 토글", "권한 및 역할 관리"],
        implementationDetails: "관리자 계정의 생성, 수정, 삭제뿐만 아니라 역할(Role) 및 활성·비활성 상태를 직관적으로 변경할 수 있으며, 상세 모달을 통해 계정별 세부 권한을 관리합니다.",
        images: [],
      },
      {
        id: "interaction",
        video: "/project/dashboard/six.mp4",
        title: "06. 사용자 인터랙션",
        summary: "드래그 기반 카테고리 스크롤, 슬라이딩 탭, 모달 및 토스트 알림을 구현했습니다.",
        responsibilities: [
          "- 드래그 기반 카테고리 스크롤",
          "- 슬라이딩 탭 및 모달 구현",
          "- 토스트 알림을 통한 피드백 제공"
        ],
        steps: ["마우스 드래그 및 탭 조작", "모달 및 토스트 인터랙션 실행"],
        implementationDetails: "드래그 스크롤과 슬라이딩 탭을 적용해 넓은 데이터 영역을 부드럽게 탐색할 수 있게 하였고, 모달과 토스트 알림으로 관리자 작업에 즉각적인 피드백을 제공합니다.",
        images: [],
      },
    ],

    challenges: [
      {
        title: "이벤트 전파로 인한 관리자 상태 변경 충돌",
        subtitle: "stopPropagation을 활용한 행 클릭과 상태 버튼 이벤트 분리",
        problem: "관리자 목록에서 행을 클릭하면 상세 모달이 열리고, 행 내부의 상태 버튼을 클릭하면 활성·비활성 상태만 변경되도록 구현했습니다.",
        cause: "상태 버튼의 클릭 이벤트가 상위 행까지 전파되면서, 관리자 상태 변경과 상세 모달 열기가 동시에 실행될 수 있었습니다. 이는 이벤트 버블링으로 인해 하위 요소의 클릭 이벤트가 상위 요소의 이벤트 핸들러까지 전달되기 때문입니다.",
        solution: "stopPropagation()을 적용해 상태 버튼의 클릭 이벤트가 상위 행으로 전달되지 않도록 처리했습니다. 이를 통해 상태 변경과 상세 모달 열기의 동작을 분리하고, 의도하지 않은 모달 실행을 방지했습니다.",
        result: "버블링 현상을 차단하여 버튼 클릭 시 상태만 정확히 토글되도록 인터랙션을 개선했습니다.",
        language: "JavaScript",
        before: `const toggleAdminStatus = (id) => {
  setAdmins(
    admins.map((a) =>
      a.id === id
        ? { ...a, status: a.status === '활성' ? '비활성' : '활성' }
        : a
    )
  );
};
<td>
  <button onClick={() => toggleAdminStatus(adm.id)}>
    {adm.status}
  </button>
</td>`,
        after: `const toggleAdminStatus = (e, id) => {
  e.stopPropagation();

  setAdmins(
    admins.map((a) =>
      a.id === id
        ? {
            ...a,
            status: a.status === '활성'
              ? '비활성'
              : '활성'
          }
        : a
    )
  );
};
<td onClick={(e) => e.stopPropagation()}>
  <button onClick={(e) => toggleAdminStatus(e, adm.id)}>
    {adm.status}
  </button>
</td>`,
      },
      {
        title: "드래그와 클릭 이벤트 충돌로 인한 카테고리 오선택",
        subtitle: "마우스 이동 거리(Threshold) 계산을 통한 드래그와 클릭 판정 분리",
        problem: "도서 카테고리 목록에서 마우스 드래그를 통한 가로 스크롤과 클릭을 통한 카테고리 필터링을 함께 지원하도록 구현했습니다.",
        cause: "드래그를 종료하는 과정에서 클릭 이벤트가 함께 발생할 수 있어, 사용자가 목록을 스크롤하려는 동작이 의도하지 않은 카테고리 선택으로 이어질 수 있었습니다. 드래그와 일반 클릭을 구분하는 기준이 필요했습니다.",
        solution: "마우스 이동 거리가 3px를 초과하면 드래그로 판단하도록 처리했습니다. 드래그 이후 발생하는 클릭 이벤트를 무시하여 가로 스크롤과 카테고리 선택을 구분하고, 의도하지 않은 필터 변경을 방지했습니다.",
        result: "스크롤 동작과 필터 선택 클릭이 독립적으로 부드럽게 작동하도록 수정했습니다.",
        language: "JavaScript",
        before: `const handleDragMove = (e) => {
  if (!dragState.current.isDown) return;
  const el = filterRowRef.current;
  if (!el) return;
  e.preventDefault();
  const x = e.pageX - el.offsetLeft;
  const walk = x - dragState.current.startX;
  el.scrollLeft = dragState.current.startScrollLeft - walk;
};

const handleCategoryClick = (item) => {
  setCategory(item);
};`,
        after: `const handleDragMove = (e) => {
  if (!dragState.current.isDown) return;

  const el = filterRowRef.current;
  if (!el) return;

  e.preventDefault();

  const x = e.pageX - el.offsetLeft;
  const walk = x - dragState.current.startX;

  if (Math.abs(walk) > 3) {
    dragState.current.moved = true;
  }

  el.scrollLeft =
    dragState.current.startScrollLeft - walk;
};

const handleCategoryClick = (item) => {
  if (dragState.current.moved) return;
  setCategory(item);
};`,
      },
      {
        title: "이미지 로딩 실패에 대응하는 대체 이미지 처리",
        subtitle: "onError 이벤트 핸들러와 동적 SVG Placeholder 적용",
        problem: "도서 목록과 상세 페이지에서 표지 이미지의 로딩에 실패하더라도 화면이 깨지지 않도록 예외 처리를 구현했습니다.",
        cause: "이미지 경로가 잘못되거나 외부 이미지 요청이 실패하면 브라우저에 깨진 이미지가 표시될 수 있었습니다. 이미지 로딩 실패에 대한 별도의 대응 로직이 없어 사용자에게 불완전한 화면이 노출되는 문제가 있었습니다.",
        solution: "이미지 로딩 실패 시 onError 이벤트를 통해 SVG 대체 이미지로 전환하도록 처리했습니다. 별도의 외부 이미지 요청 없이 대체 표지를 표시하며, 오류 상황에서도 일관된 UI를 유지할 수 있도록 개선했습니다.",
        result: "이미지 에러 발생 시 레이아웃 깨짐 없이 직관적인 대체 그래픽이 노출되도록 안정성을 높였습니다.",
        language: "JavaScript",
        after: `const BOOK_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    \`<svg xmlns="http://www.w3.org/2000/svg"
      width="110" height="150">
      <rect width="100%" height="100%"
        rx="8" fill="#f1f0f8"/>
      <text x="50%" y="52%"
        font-size="34"
        text-anchor="middle"
        dominant-baseline="middle">📕</text>
    </svg>\`
  );

const handleImgError = (e) => {
  e.target.onerror = null;
  e.target.src = BOOK_PLACEHOLDER;
};
<img
  src={item.image}
  alt={item.title}
  onError={handleImgError}
/>`,
      },
    ],

    outcomes: [
      "Chart.js를 활용한 통계 시각화부터 도서·회원·게시판·관리자 계정 관리까지 다양한 기능을 하나의 대시보드로 구성했습니다.",
      "검색·필터링·상세 조회 및 다양한 인터랙션을 구현하며 관리자가 필요한 정보를 효율적으로 확인할 수 있는 UI를 제작했습니다."
    ],

    retrospective: "React의 상태 관리를 활용해 관리자 정보 변경과 화면 갱신을 연결하고, 여러 UI 요소의 상태를 일관되게 유지하는 방법을 익혔습니다.\n\n이벤트 버블링 제어, 드래그와 클릭 이벤트 구분, 이미지 로딩 실패 처리 등을 구현하며 사용자 인터랙션과 예외 처리에 대한 이해를 높였습니다.",

    improvements: "여러 관리 기능을 구현할 때 데이터 구조와 공통 컴포넌트의 기준을 초기에 명확히 정하면 중복 작업을 줄일 수 있다는 점을 배웠습니다.\n\n향후에는 기능별 구현 기준과 테스트 항목을 사전에 정리해 개발 과정의 일관성과 유지보수성을 높이고자 합니다.",
  },
  "05": {
    ...emptyProjectDetail,
    presentationUrl: "https://drive.google.com/file/d/1BFYVyuTL-1zsb3pl1ZdLDes4s2ZUMQFi/view?usp=drive_link",
    wireframeUrl: "https://www.figma.com/design/3vAQpERYs37RoL4CBtH7iQ/1%EC%B0%A8-%ED%8C%80%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8--node?node-id=0-1&t=AYoDREmt1UmvQAjt-1",
    serviceName: "NODE",
    siteUrl: "https://kimhyeonso.github.io/NODE/",
    githubUrl: "https://github.com/kimhyeonso/NODE",
    period: "2026.06.15 - 2026.06.30",
    team: "3명 (팀 프로젝트)",
    role: "사용자 인증·커머스 기능 개발 · 카카오맵 API 연동 · 서비스 기획 및 디자인",
    stack: ["HTML5", "CSS3", "JavaScript", "GitHub"],
    overview: "NODE는 프리미엄 오디오 제품을 소개하고, 사용자가 자신의 취향과 환경에 맞는 제품을 탐색할 수 있도록 기획한 오디오 브랜드 웹사이트입니다.\n\n블랙과 골드를 활용한 고급스러운 비주얼을 바탕으로 브랜드의 정체성을 표현했으며, 제품별 상세 정보와 스펙 비교 기능을 통해 합리적인 제품 선택을 돕고자 했습니다. 또한 회원 관리, 장바구니, 매장 위치 안내 기능을 구현하여 상품 탐색부터 구매 준비까지 이어지는 사용자 경험을 구성했습니다.",
    
    contributionGroups: [
      {
        title: "1. 개발 기여",
        items: [
          { title: "사용자 인증", anchor: "auth", description: "로그인·회원가입·비밀번호 찾기 및 변경 기능 구현" },
          { title: "장바구니", anchor: "cart", description: "상품 담기·삭제 및 수량 변경 기능 구현" },
          { title: "상품 비교", anchor: "compare", description: "선택 상품 데이터 연동 및 스펙 비교표 구현" },
          { title: "Location", anchor: "location", description: "매장 안내 페이지 제작 및 카카오맵 API 연동" },
          { title: "데이터 관리", description: "LocalStorage 기반 사용자·상품 데이터 저장 및 연동" },
          { title: "기획·디자인", description: "시장 조사·경쟁사 SWOT 분석, 로고 디자인 및 발표 PPT 제작" },
        ],
      },
    ],

    implementations: [
      {
        id: "auth",
        title: "01. 로그인/회원가입",
        video: "/project/node/one.mp4",
        summary: "사용자가 회원가입부터 로그인, 비밀번호 찾기 및 변경까지 계정 관련 기능을 이용할 수 있도록 구현했습니다.",
        responsibilities: [
          "- 로그인 및 회원가입 페이지 개발",
          "- 비밀번호 찾기·변경 기능 구현",
          "- LocalStorage 기반 사용자 인증 로직 구현"
        ],
        steps: ["회원가입 정보 입력", "LocalStorage 저장", "로그인 및 계정 인증"],
        implementationDetails: "JavaScript를 활용해 회원가입 및 로그인 과정의 입력값을 검증하고, LocalStorage에 저장된 사용자 데이터와 입력 정보를 비교하는 인증 로직을 구현했습니다. 비밀번호 찾기 및 변경 기능도 연결하여 계정 관리 흐름을 구성했습니다.",
        images: [],
      },
      {
        id: "cart",
        title: "02. 장바구니",
        video: "/project/node/two.mp4",
        summary: "사용자가 선택한 상품을 장바구니에 담고, 원하는 수량과 상품 목록을 관리할 수 있도록 구현했습니다.",
        responsibilities: [
          "- 상품 장바구니 추가 및 삭제",
          "- 상품 수량 변경과 장바구니 정보 갱신",
          "- LocalStorage 기반 장바구니 데이터 유지"
        ],
        steps: ["상품 장바구니 담기", "수량 조절 및 항목 삭제", "LocalStorage 데이터 동기화"],
        implementationDetails: "JavaScript로 장바구니 상품 데이터를 관리하고, 사용자의 상품 추가·삭제 및 수량 변경에 따라 화면에 표시되는 정보를 갱신하도록 구현했습니다. LocalStorage와 연동해 페이지 이동 및 새로고침 이후에도 저장된 장바구니 정보를 활용할 수 있도록 구성했습니다.",
        images: [],
      },
      {
        id: "compare",
        title: "03. 비교하기",
        summary: "여러 상품의 주요 스펙을 하나의 비교표에서 확인할 수 있도록 구현한 상품 비교 기능입니다.",
        responsibilities: [
          "- 선택한 상품 정보 비교 페이지 연동",
          "- 제품 유형·주파수 응답·출력 등 스펙 비교",
          "- 상품별 스펙 항목명 차이 처리"
        ],
        steps: ["비교할 상품 선택", "스펙 비교 페이지 진입", "상세 스펙 비교 확인"],
        implementationDetails: "선택한 상품의 데이터를 비교 페이지로 전달하고, JavaScript 배열 탐색을 통해 각 상품의 스펙을 조회하도록 구현했습니다. 상품마다 서로 다른 출력 항목명을 고려해 복수의 검색 키를 적용했으며, 화면 표시용 항목명과 실제 데이터 조회용 키를 분리하여 비교표의 정확성을 개선했습니다.",
        video: "/project/node/three.mp4",
        codeExamples: [
          {
            title: "스펙 데이터 복수 키 검색 및 조회",
            summary: "화면 표시용 label과 실제 데이터 조회용 keys를 분리하여 다중 키로 스펙을 탐색",
            filename: "compare.js",
            code: `const productSpecRows = [
  { label: "제품 유형", keys: ["Product Type"] },
  { label: "주파수 응답", keys: ["Frequency Response"] },
  {
    label: "출력",
    keys: ["Amp Power", "Rated Power", "Power Handling"]
  },
];

function getSpecMulti(specs, keys) {
  if (!specs) return "-";

  for (var i = 0; i < keys.length; i++) {
    var found = specs.find(function(s) {
      return s[0] === keys[i];
    });

    if (found) return found[1];
  }

  return "-";
}`,
            rationale: "상품마다 스펙 데이터의 영문 표기 항목명이 다를 수 있다는 점을 고려하여 여러 개의 검색 키(keys)를 배열로 순회하며 일치하는 값을 유연하게 찾아내도록 설계했습니다.",
          },
        ],
        images: [],
      },
      {
        id: "location",
        title: "04. 매장 위치 안내",
        video: "/project/node/four.mp4",
        summary: "카카오맵 API를 활용하여 매장 위치를 지도에 표시하고, 선택한 지점을 직관적으로 확인할 수 있도록 구현했습니다.",
        responsibilities: [
          "- 카카오맵 API 연동 및 지도 출력",
          "- 지점별 버튼과 매장 데이터 연결",
          "- 선택 지점 마커 표시 및 지도 중심 이동"
        ],
        steps: ["매장 안내 페이지 진입", "특정 지점 버튼 선택", "해당 마커 표시 및 지도 중심 이동"],
        implementationDetails: "카카오맵 API를 연동하여 매장 위치를 시각화하고, JavaScript 이벤트 처리로 지점 선택 기능을 구현했습니다. 선택한 지점에 해당하는 마커만 표시하고 map.setCenter()로 지도 중심을 이동시켜 원하는 매장의 위치를 쉽게 확인할 수 있도록 개선했습니다.",
        codeExamples: [
          {
            title: "매장 선택에 따른 마커 갱신 및 지도 중심 이동",
            summary: "버튼 클릭 시 기존 마커를 제거하고 선택된 지점의 마커 생성 및 지도 중심 이동",
            filename: "location.js",
            code: `$('.branch-btn').on('click', function () {
  var index = $(this).data('index');

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    removeMarker();
    activeFilter = null;
  } else {
    $('#btn-parking, .branch-btn').removeClass('active');
    $(this).addClass('active');
    activeFilter = 'branch';

    removeMarker();
    showSingleBranch(index);
  }
});

function showSingleBranch(index) {
  var b = branchData[index];

  var marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(b.lat, b.lng),
    title: b.name
  });

  markers.push(marker);
  map.setCenter(new kakao.maps.LatLng(b.lat, b.lng));
}`,
            rationale: "지점 선택 버튼의 토글 상태와 data-index를 연결하여 불필요한 마커를 지우고 선택한 지점에 집중할 수 있도록 직관적인 인터랙션을 구현했습니다.",
          },
        ],
        images: [],
      },
    ],

    challenges: [
      {
        title: "비교표의 스펙 데이터 조회 오류",
        subtitle: "영문 JSON 스펙 키값과 한글 검색어 불일치 해결",
        problem: "선택한 상품들의 주요 스펙을 비교표에 표시하는 과정에서, 데이터가 존재함에도 일부 항목이 '-'로 출력되는 문제가 발생했습니다.",
        cause: "실제 JSON 데이터의 스펙 항목명은 영문으로 저장되어 있었지만, 비교 코드에서는 한글 항목명으로 검색하고 있었습니다. 데이터 조회 시 문자열이 정확하게 일치해야 하는 구조였기 때문에, 항목을 찾지 못하고 기본값인 '-'가 반환되었습니다.",
        solution: "화면 표시용 label과 데이터 조회용 keys를 분리하고, 실제 JSON 데이터의 영문 항목명과 일치하도록 수정했습니다. 또한 상품마다 출력 스펙의 항목명이 다른 점을 고려해 복수의 검색 키를 적용하여, 일치하는 스펙 값을 가져올 수 있도록 개선했습니다.",
        result: "다양한 영문 스펙 키값을 안전하게 탐색하여 비교표에 정확한 데이터가 정상적으로 출력되도록 해결했습니다.",
        codeAnchor: "compare-code-1",
      },
      {
        title: "매장 선택에 따른 지도 표시 및 위치 이동 개선",
        subtitle: "카카오맵 API 마커 제어 및 지도 중심 이동 기능 추가",
        problem: "카카오 지도 API를 활용한 매장 안내 페이지에서 사용자가 특정 지점을 선택해도 해당 매장의 위치를 바로 확인하기 어려운 문제가 있었습니다.",
        cause: "초기에는 모든 가맹점의 마커를 한 번에 표시했으며, 지점 선택에 따라 지도 중심을 이동하는 기능이 없었습니다. 이로 인해 초기 화면에서 멀리 떨어진 매장은 사용자가 직접 지도를 이동해야 확인할 수 있었습니다.",
        solution: "각 지점 버튼의 data-index를 매장 데이터와 연결하여 선택한 지점의 마커만 표시하도록 변경했습니다. 기존 마커를 제거하고 map.setCenter()로 지도 중심을 이동시켜 선택한 매장의 위치를 즉시 확인할 수 있도록 개선했습니다. 동일한 버튼을 다시 클릭하면 선택이 해제되도록 처리해 UI 상태도 일관되게 관리했습니다.",
        result: "사용자가 원하는 매장 위치를 지도 중심과 마커를 통해 즉각적으로 파악할 수 있어 탐색 편의성이 크게 향상되었습니다.",
        codeAnchor: "location-code-1",
      },
    ],

    outcomes: [
      "HTML, CSS, JavaScript를 활용해 로그인·회원가입, 장바구니, 상품 비교, 매장 위치 안내 등 주요 기능을 구현했습니다.",
      "LocalStorage 기반 데이터 연동과 카카오맵 API를 적용하여 사용자 계정 관리부터 상품 탐색까지 이어지는 기능을 구성했습니다.",
      "시장 조사와 경쟁사 분석, 로고 디자인에도 참여해 서비스의 완성도를 높였습니다."
    ],

    retrospective: "JavaScript를 활용한 사용자 인증 로직과 LocalStorage 데이터 관리 기능을 구현하며 데이터 저장과 조회, 화면 갱신의 흐름을 이해했습니다. 또한 상품 비교표의 데이터 조회 오류를 해결하고 카카오맵 API의 마커 및 지도 중심 이동 기능을 개선하면서, 데이터 구조를 정확히 파악하고 사용자 경험을 고려해 기능을 구현하는 역량을 키웠습니다.",

    improvements: "여러 페이지에서 사용자 정보와 상품 데이터를 함께 활용하는 과정에서 데이터 구조와 기능 간 연결 기준을 사전에 정하는 것이 중요하다는 점을 배웠습니다. 향후 팀 프로젝트에서는 공통 데이터 형식과 페이지 간 연동 방식을 초기 단계에서 명확히 정의하고, 기능별 통합 테스트를 통해 오류와 재작업을 줄이고자 합니다.",
  },
  "06": {
    ...emptyProjectDetail,
    serviceName: "Bikini Bottom 방명록",
    siteUrl: "https://guestbook-fawn-eight.vercel.app/",
    githubUrl: "https://github.com/jiwoo1012/Guestbook",
    period: "2026.07.13 - 2026.07.15",
    team: "1명 (개인 프로젝트)",
    role: "기획/디자인, 프론트엔드 개발, 실시간 연동 및 미니게임 구현 단독 수행",
    stack: ["React", "SCSS", "Firebase Authentication", "Cloud Firestore", "Zustand", "Vite"],
    overview: "Guestbook은 사용자들이 자유롭게 메시지를 남기고 소통할 수 있는 실시간 방명록 웹사이트입니다.\n\nFirebase Authentication을 활용한 회원 인증과 Firestore 기반 방명록 등록·조회·수정·삭제 기능을 구현했습니다. 실시간 데이터 동기화를 통해 새로고침 없이 게시글 변경 사항을 확인할 수 있으며, 작성자별 접근 권한을 적용해 안전하게 데이터를 관리하도록 구성했습니다.\n또한 캐릭터 선택을 통한 방명록 작성과 미니게임, 사용자별 최고 기록 저장 기능을 더해 단순한 메시지 기록을 넘어 다양한 상호작용을 경험할 수 있도록 제작했습니다.",
    
    contributionGroups: [
      {
        title: "담당 역할 & 구현 내용",
        items: [
          { title: "기획 및 UI/UX 디자인", description: "스폰지밥 콘셉트의 방명록 서비스 기획, 캐릭터 기반 인터페이스 및 반응형 레이아웃 구현[cite: 9]" },
          { title: "회원 인증 및 상태 관리", description: "Firebase Authentication 기반 회원가입·로그인·로그아웃, Zustand를 활용한 인증 상태 전역 관리[cite: 9]" },
          { title: "방명록 CRUD 및 실시간 연동", description: "Cloud Firestore 기반 게시글 등록·조회·수정·삭제, onSnapshot 을 활용한 실시간 데이터 동기화[cite: 9]" },
          { title: "접근 권한 및 데이터 검증", description: "Firestore Security Rules를 활용한 작성자별 수정·삭제 권한 제어, 데이터 생성·수정 시 유효성 검증[cite: 9]" },
          { title: "미니게임 및 기록 관리", description: "캐릭터·음식 인터랙션, 충돌 판정과 점수 계산, localStorage 기반 사용자별 최고 기록 관리[cite: 9]" },
          { title: "사용자 경험 및 오류 처리", description: "비동기 저장 실패 시 입력 데이터 유지, 오류 메시지 표시, 모바일 환경의 스크롤 및 반응형 화면 최적화[cite: 9]" },
        ],
      },
      {
        title: "사용 기술",
        items: [
          { title: "Frontend", description: "React, JavaScript, React Router" },
          { title: "State Management", description: "Zustand" },
          { title: "Styling", description: "SCSS, CSS Modules" },
          { title: "Backend / BaaS", description: "Firebase Authentication, Cloud Firestore, Firestore Security Rules" },
          { title: "Storage", description: "localStorage" },
          { title: "Development", description: "Vite, Oxlint" },
        ],
      },
    ],

    implementations: [
      {
        id: "auth",
        title: "01. 회원 인증 및 로그인 상태 관리",
        video: "/project/guestbook/one.mp4",
        summary: "Firebase Authentication을 활용해 이메일 기반 회원가입·로그인·로그아웃 기능을 구현했습니다.",
        responsibilities: [
          "- Firebase Authentication 기반 이메일 회원가입·로그인·로그아웃 구현",
          "- onAuthStateChanged와 Zustand 연동을 통한 인증 상태 전역 관리",
          "- 로그인 여부에 따른 방명록 작성 권한 제어"
        ],
        steps: ["로그인/회원가입 요청", "Firebase 인증 처리", "Zustand 전역 상태 동기화"],
        implementationDetails: "Firebase Authentication을 활용해 이메일 기반 회원가입·로그인·로그아웃 기능을 구현했습니다. onAuthStateChanged와 Zustand를 연동해 인증 상태를 전역 관리하고, 로그인 여부에 따라 방명록 작성 권한을 제어했습니다.",
        images: [],
      },
      {
        id: "crud",
        title: "02. 실시간 방명록 관리",
        video: "/project/guestbook/two.mp4",
        summary: "Firestore를 활용해 방명록 등록·조회·수정·삭제(CRUD) 기능과 실시간 동기화를 구현했습니다.",
        responsibilities: [
          "- Firestore 기반 방명록 등록·조회·수정·삭제(CRUD) 구현",
          "- onSnapshot을 활용한 실시간 데이터 동기화",
          "- 최신순 정렬, 페이지네이션 및 저장 실패 시 입력값 유지 예외 처리"
        ],
        steps: ["방명록 작성 및 Firestore 전송", "onSnapshot 실시간 반영", "목록 갱신 및 페이징"],
        implementationDetails: "Firestore를 활용해 방명록 등록·조회·수정·삭제(CRUD) 기능을 구현했습니다. onSnapshot으로 데이터 변경 사항을 실시간 반영하고, 최신순 정렬과 페이지네이션을 적용했습니다. 저장 실패 시에는 입력 내용을 유지하도록 예외 처리를 구현했습니다.",
        images: [],
      },
      {
        id: "auth-rules",
        title: "03. 작성자 권한 및 데이터 검증",
        summary: "게시글 작성자 UID 기준 접근 제어와 Firestore Security Rules를 통한 데이터 유효성 검증을 구현했습니다.",
        responsibilities: [
          "- 작성자 UID 기준 수정·삭제 접근 제어",
          "- Firestore Security Rules를 통한 데이터 보안 적용",
          "- 데이터 생성·수정 시 필수 필드 및 작성자 정보 유효성 검증"
        ],
        steps: ["작성자 권한 확인", "Security Rules 검증", "데이터 수정/삭제 처리"],
        implementationDetails: "게시글 작성자의 UID를 기준으로 수정·삭제 기능의 접근을 제어했습니다. Firestore Security Rules를 적용해 작성자 본인만 데이터를 변경할 수 있도록 제한하고, 데이터 생성·수정 과정에서 필수 필드와 작성자 정보의 유효성을 검증했습니다.",
        images: [],
      },
      {
        id: "minigame",
        title: "04. 미니게임 및 사용자별 기록 관리",
        video: "/project/guestbook/four.mp4",
        summary: "키보드·마우스 인터랙션과 충돌 판정, localStorage 기반 최고 기록 저장 기능을 갖춘 미니게임을 구현했습니다.",
        responsibilities: [
          "- 키보드·마우스 조작 및 충돌 판정 구현",
          "- 제한 시간 및 점수 계산 로직 개발",
          "- localStorage 기반 사용자별 최고 기록 저장 및 갱신"
        ],
        steps: ["미니게임 플레이 및 점수 획득", "제한 시간 종료 및 점수 산정", "localStorage 최고 기록 비교 및 갱신"],
        implementationDetails: "키보드·마우스 조작과 충돌 판정, 제한 시간 및 점수 계산 기능을 갖춘 미니게임을 구현했습니다. localStorage를 활용해 사용자별 최고 점수를 저장하고, 게임 종료 시 기존 기록과 비교해 최고 기록을 갱신하도록 구성했습니다.",
        images: [],
      },
    ],

    challenges: [
      {
        title: "실시간 데이터 변경 사항과 화면 상태 동기화",
        subtitle: "Firestore onSnapshot과 Zustand를 활용한 실시간 구독 및 정리",
        problem: "방명록 등록·수정·삭제 시 페이지를 새로고침하지 않아도 최신 데이터가 화면에 반영되도록 구현했습니다.",
        cause: "최초 진입 시 데이터를 한 번만 조회하는 방식으로는 이후 Firestore에서 발생한 변경 사항을 자동으로 반영할 수 없었습니다. 또한 실시간 구독을 해제하지 않으면 페이지 재진입 시 불필요한 구독이 남을 수 있었습니다.",
        solution: "Firestore의 onSnapshot을 활용해 데이터 변경을 실시간으로 구독하고, 변경된 목록을 Zustand 상태에 반영했습니다. 또한 컴포넌트 해제 시 구독을 종료하여 불필요한 리스너가 남지 않도록 관리했습니다.",
        result: "새로고침 없이 데이터가 실시간으로 동기화되며, 컴포넌트 언마운트 시 메모리 누수 없이 구독이 안전하게 해제되도록 구현했습니다.",
        language: "JavaScript",
        after: `const unsubscribe = onSnapshot(q, (snapshot) => {
  const posts = snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));

  set({ posts, loading: false, error: null });
});

return unsubscribe;
useEffect(() => {
  const unsubscribe = subscribeToPosts();
  return () => unsubscribe();
}, [subscribeToPosts]);`,
      },
      {
        title: "비동기 저장 실패 시 입력 데이터 유실 방지",
        subtitle: "async/await 완료 시점 제어를 통한 입력값 보존 및 오류 처리",
        problem: "방명록 저장에 성공한 경우에만 입력창을 초기화하고, 실패 시 작성 내용을 유지하도록 구현했습니다.",
        cause: "비동기 저장이 완료되기 전에 입력값을 초기화하면 저장 실패 시에도 사용자가 작성한 내용이 사라질 수 있었습니다. 또한 부모 컴포넌트에서 오류를 처리한 뒤 전달하지 않으면 자식 폼이 저장 성공으로 판단할 가능성이 있었습니다.",
        solution: "async/await로 저장 완료를 확인한 뒤 입력값을 초기화하도록 변경했습니다. 저장 오류는 부모에서 처리한 후 다시 전달하여 초기화를 방지했습니다. 이를 통해 저장 실패 시 작성 내용을 유지하고 오류 메시지를 표시하도록 구현했습니다.",
        result: "네트워크 오류 등 저장 실패 시에도 사용자가 작성한 텍스트와 선택 값이 유실되지 않고 유지되도록 개선했습니다.",
        language: "JavaScript",
        before: `try {
  onAddPost(newPost);
  setNickname('');
  setMessage('');
} catch (e) { ... }`,
        after: `// 부모 컴포넌트
catch (error) {
  setSubmitError(
    error.message || '방명록 저장에 실패했습니다.'
  );
  throw error;
}
// 자식 폼 컴포넌트
try {
  await onAddPost(newPost);

  setNickname('');
  setMessage('');
  setCharacter('');
} catch (error) {
  console.error('방명록 저장 실패:', error);
}`,
      },
      {
        title: "모바일 환경에서 페이지 스크롤 차단 문제 해결",
        subtitle: "경로 및 뷰포트 너비 조건 분기를 통한 동적 body overflow 제어",
        problem: "페이지별 레이아웃을 유지하면서 모바일 방명록과 소개 페이지에서는 콘텐츠 길이에 따라 스크롤이 가능하도록 구현했습니다.",
        cause: "전체 페이지에 overflow: hidden이 적용되어 화면 높이를 초과하는 콘텐츠까지 스크롤이 차단되었습니다. 특히 모바일에서는 입력 폼과 게시글 목록이 길어질 경우 하단 콘텐츠에 접근하기 어려웠습니다.",
        solution: "현재 페이지 경로와 화면 너비를 기준으로 스크롤 허용 여부를 분기했습니다. resize 이벤트를 통해 화면 크기 변경에도 대응하고, 이벤트 리스너 정리와 스타일 초기화를 적용하여 페이지 간 스크롤 동작이 충돌하지 않도록 했습니다.",
        result: "모바일 및 특정 페이지에서 세로 스크롤이 정상적으로 동작하여 모든 콘텐츠에 원활하게 접근할 수 있게 되었습니다.",
        language: "JavaScript",
        after: `const updateOverflow = () => {
  const isAboutPage = location.pathname === '/about';
  const isGuestbookPage = location.pathname === '/guestbook';
  const isMobile = window.innerWidth <= 576;

  document.body.style.overflow =
    isAboutPage || (isGuestbookPage && isMobile)
      ? 'unset'
      : 'hidden';
};

updateOverflow();
window.addEventListener('resize', updateOverflow);

return () => {
  document.body.style.overflow = 'unset';
  window.removeEventListener('resize', updateOverflow);
};`,
      },
    ],

    outcomes: [
      "Firebase Authentication과 Firestore를 활용해 회원 인증부터 방명록 CRUD, 실시간 데이터 동기화, 작성자별 접근 제어까지 구현했습니다.",
      "스폰지밥 콘셉트의 인터페이스와 미니게임을 결합해 사용자 간 소통과 참여가 가능한 웹사이트를 완성했습니다."
    ],

    retrospective: "Zustand와 Firestore 실시간 구독을 연동하며 데이터 변경과 화면 상태를 동기화하는 방법을 익혔습니다.\n\n또한 비동기 저장 실패 시 입력값을 보존하고, Security Rules로 데이터 접근 권한을 검증하며 상태 관리와 데이터 무결성의 중요성을 이해했습니다.",

    improvements: "현재 방명록은 전체 데이터를 구독한 뒤 클라이언트에서 페이지네이션을 처리하는 구조입니다.\n\n향후에는 게시글 증가에 대비해 Firestore 커서 기반 페이지네이션과 조회 범위 최적화를 적용하고, 데이터 요청 및 오류 처리 로직에 대한 테스트를 보강하고자 합니다.",
  },
  "07": {
    ...emptyProjectDetail,
    serviceName: "Interactive Drawing App",
    siteUrl: "", // 실제 배포 주소가 있다면 입력하세요
    githubUrl: "https://github.com/jiwoo1012/canvas_drawing", // 예시 주소, 필요시 수정하세요
    period: "2026.04", // 적절한 진행 기간으로 수정 가능합니다
    team: "1명 (개인 프로젝트)",
    role: "HTML5 Canvas API 활용 드로잉 툴 및 UI/UX 구현 단독 수행",
    stack: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    overview: "HTML5 Canvas API와 JavaScript를 활용하여 브라우저에서 직접 그림을 그리고 파일을 다운로드할 수 있도록 구현한 인터랙티브 드로잉 웹 애플리케이션입니다.\n\n사용자 편의를 고려한 툴바를 구성하여 브러시 색상, 굵기, 배경색을 실시간으로 변경할 수 있으며, 마우스 이벤트와 좌표 보정을 통해 매끄러운 드로잉 경험을 제공합니다. 또한 캔버스 데이터를 이미지 파일로 변환하는 다운로드 기능과 전체 초기화 기능을 구현했습니다.",
    
    contributionGroups: [
      {
        title: "담당 역할 & 구현 내용",
        items: [
          { title: "Canvas 드로잉 로직", anchor: "drawing", description: "mousedown, mousemove, mouseup 이벤트를 활용한 드로잉 경로 및 선 스타일 제어" },
          { title: "툴바 인터랙션", anchor: "toolbar", description: "color, number input을 활용한 브러시 및 배경색 실시간 변경 기능 구현" },
          { title: "캔버스 유틸리티", anchor: "utility", description: "캔버스 전체 초기화(clear) 및 toDataURL 기반 이미지 다운로드 기능 구현" },
        ],
      },
    ],

    implementations: [
      {
        id: "drawing",
        video: "/project/canvas/one.mp4",
        title: "01. 마우스 기반 드로잉 및 좌표 보정",
        summary: "mousedown, mousemove, mouseup 이벤트를 조합하여 사용자의 마우스 움직임에 따라 부드럽게 선이 그려지도록 구현했습니다.",
        responsibilities: [
          "- 마우스 입력 상태(isDrawing) 관리",
          "- 툴바 높이를 고려한 마우스 Y축 좌표 보정",
          "- lineCap을 활용한 선 끝단 디자인 처리"
        ],
        steps: ["마우스 클릭(mousedown)으로 드로잉 시작", "마우스 이동(mousemove)에 따른 선 연결 및 렌더링", "마우스 해제(mouseup) 시 경로 분리"],
        implementationDetails: "window 크기와 툴바 높이를 동적으로 계산하여 캔버스 크기를 설정하고, clientY 좌표에서 툴바 오프셋을 보정하여 마우스 커서와 그려지는 선의 위치 오차를 해결했습니다.",
        images: [],
      },
      {
        id: "toolbar",
        video: "/project/canvas/one.mp4",
        title: "02. 실시간 툴바 및 스타일 제어",
        summary: "change 이벤트 위임을 활용해 브러시 색상, 두께, 캔버스 배경색을 실시간으로 변경할 수 있는 커스텀 툴바를 구현했습니다.",
        responsibilities: [
          "- 이벤트 위임을 통한 툴바 입력 감지",
          "- ctx.strokeStyle 및 lineWidth 동적 변경",
          "- 캔버스 및 body 배경색 실시간 동기화"
        ],
        steps: ["툴바 옵션 변경", "change 이벤트 타겟 감지", "Canvas context 및 스타일 즉시 반영"],
        implementationDetails: "toolbar 요소에 change 이벤트를 위임하여 사용자가 색상이나 브러시 두께를 바꿀 때마다 캔버스 설정(ctx.strokeStyle, lineWidth)이 실시간으로 반영되도록 처리했습니다.",
        images: [],
      },
      {
        id: "utility",
        video: "/project/canvas/one.mp4",
        title: "03. 화면 초기화 및 이미지 다운로드",
        summary: "clearRect와 a 태그의 download 속성을 활용해 그림 초기화 및 파일 저장 기능을 구현했습니다.",
        responsibilities: [
          "- clearRect를 이용한 캔버스 전체 지우기",
          "- toDataURL을 활용한 캔버스 데이터를 이미지로 변환",
          "- 가공된 데이터 URL을 가진 a 태그 동적 생성 및 다운로드 실행"
        ],
        steps: ["버튼 클릭 이벤트 감지", "데이터 URL 변환 또는 clearRect 실행", "파일 다운로드 트리거"],
        implementationDetails: "clearRect(0, 0, canvas.width, canvas.height)를 통해 캔버스를 초기화하고, canvas.toDataURL('image/png')를 동적으로 생성한 a 태그의 href에 주입하여 사용자가 그린 그림을 PNG 파일로 즉시 다운로드할 수 있게 구현했습니다.",
        images: [],
      },
    ],

    challenges: [
      {
        title: "마우스 좌표 오차 및 선 끊김 현상 해결",
        subtitle: "canvas offset 위치 계산 및 beginPath를 통한 경로 분리",
        problem: "초기 구현 시 화면 전체 크기 기준의 clientY 좌표를 그대로 사용하거나 마우스를 뗄 때 경로가 이어지는 현상이 발생했습니다.",
        cause: "상단에 위치한 툴바의 높이만큼 캔버스 내부 좌표계와 마우스 좌표계 간의 오차가 발생했으며, mouseup 시 beginPath()를 호출하지 않아 다음 드로잉 시작점과 이전 선이 의도치 않게 연결되었습니다.",
        solution: "clientY - canvasOffsetY를 통해 Y축 좌표를 정확히 보정하고, mouseup 이벤트 발생 시 ctx.beginPath()를 호출하여 새로운 경로(Path)를 강제로 분리하도록 수정했습니다.",
        result: "커서 위치와 정확히 일치하는 지점에 선이 그려지며, 마우스를 뗄 때마다 독립된 선 객체로 깔끔하게 처리되도록 개선했습니다.",
        language: "JavaScript",
        after: `canvas.addEventListener("mousemove", function(e){
  if(!isDrawing) return;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(e.clientX, e.clientY - canvasOffsetY); // Y축 좌표 보정
  ctx.stroke();
});

canvas.addEventListener("mouseup", function(){
  isDrawing = false;
  ctx.beginPath(); // 경로 분리
});`,
      },
    ],

    outcomes: [
      "HTML5 Canvas API와 순수 JavaScript를 활용해 별도의 외부 라이브러리 없이 커스텀 드로잉 앱을 완성했습니다.",
      "마우스 좌표 제어, 이벤트 위임, 동적 파일 다운로드 기능을 구현하며 프론트엔드 인터랙션 개발 역량을 높였습니다."
    ],

    retrospective: "Canvas API의 기본 개념과 2D Context의 선 스타일, 경로 관리 방식을 깊이 있게 이해할 수 있었습니다. 특히 UI 이벤트와 캔버스 내부 좌표를 일치시키는 과정에서 DOM과 그래픽 렌더링 간의 관계를 학습했습니다.",

    improvements: "현재는 자유로운 선 긋기 기능 중심으로 구현되어 있으나, 향후 사각형·원 등 도형 그리기 도구나 지우개 모드, 실행 취소(Undo/Redo) 기능을 추가하여 사용성를 더욱 확장하고자 합니다.",
  },
  "08": {
    ...emptyProjectDetail,
    serviceName: "React CRUD Board",
    siteUrl: "https://react-crud-board-zeta.vercel.app/", // 예시 주소, 필요시 수정하세요
    githubUrl: "https://github.com/jiwoo1012/bulletin-board",
    period: "2026.06.29 - 2026.07.07",
    team: "1명 (개인 프로젝트)",
    role: "프론트엔드 개발, 사용자 인증 구현, 데이터베이스 연동 및 예외 처리 단독 수행",
    stack: ["React", "JavaScript", "Zustand", "Firebase", "SCSS", "Vite"],
    overview: "React CRUD Board는 React와 Firebase를 활용해 구현한 게시판 웹 애플리케이션입니다. 회원가입 및 로그인 기능을 기반으로 게시글 작성·조회·수정·삭제(CRUD) 기능을 제공하며, Cloud Firestore를 통해 게시글 데이터를 저장하고 관리합니다.\n\nZustand를 활용한 전역 상태 관리와 Firebase Authentication을 통한 사용자 인증을 구현했으며, 비동기 데이터 처리 과정에서 발생하는 오류와 상태 불일치를 해결하는 데 중점을 두었습니다. 이를 통해 프론트엔드와 데이터베이스 간의 데이터 흐름 및 인증 구조를 학습한 프로젝트입니다.",
    
    contributionGroups: [
      {
        title: "담당 역할 & 구현 내용",
        items: [
          { title: "프론트엔드 개발", description: "React 기반 게시판 UI 및 회원가입·로그인·게시글 목록·상세·작성·수정 화면 구현[cite: 10]" },
          { title: "사용자 인증", description: "Firebase Authentication을 활용한 회원가입·로그인·로그아웃 및 인증 상태 복원[cite: 10]" },
          { title: "데이터베이스 연동", description: "Cloud Firestore를 활용한 게시글 등록·조회·수정·삭제(CRUD) 구현[cite: 10]" },
          { title: "라우팅 및 상태 관리", description: "React Router 기반 페이지 이동 및 Zustand를 활용한 인증·게시글 전역 상태 관리[cite: 10]" },
          { title: "입력 검증 및 예외 처리", description: "필수 입력값 검증, 비동기 요청 상태 관리, 저장 실패 시 오류 처리 및 입력 데이터 유지[cite: 10]" },
        ],
      },
      {
        title: "사용 기술",
        items: [
          { title: "프론트엔드", description: "React, JavaScript(JSX) — 컴포넌트 기반 UI 및 기능 구현[cite: 11]" },
          { title: "라우팅", description: "React Router — 게시판 목록·상세 페이지 이동[cite: 11]" },
          { title: "상태 관리", description: "Zustand — 사용자 인증 정보와 게시글 전역 상태 관리[cite: 11]" },
          { title: "스타일링", description: "SCSS(Sass), CSS Modules — 스타일 작성 및 컴포넌트별 스타일 분리[cite: 11]" },
          { title: "인증", description: "Firebase Authentication — 이메일 기반 회원가입·로그인·로그아웃[cite: 11]" },
          { title: "데이터베이스", description: "Cloud Firestore — 게시글 저장·조회·수정·삭제[cite: 11]" },
          { title: "개발·빌드", description: "Vite — 개발 서버 실행 및 배포용 빌드[cite: 11]" },
          { title: "코드 검사", description: "Oxlint — 코드 오류 및 품질 검사[cite: 11]" },
        ],
      },
    ],

    implementations: [
      {
        id: "auth",
        title: "01. 사용자 인증 및 로그인 상태 관리",
        summary: "Firebase Authentication을 활용해 이메일 기반 회원가입·로그인·로그아웃 및 인증 상태 복원을 구현했습니다.",
        responsibilities: [
          "- Firebase Authentication을 활용한 이메일 기반 회원가입·로그인·로그아웃 구현",
          "- 인증 상태 구독과 Zustand 연동을 통한 새로고침 후 로그인 상태 복원",
          "- 인증 처리 결과에 따른 사용자 정보 갱신 및 오류 메시지 표시"
        ],
        steps: ["회원가입/로그인 요청", "Firebase 인증 처리", "Zustand 전역 상태 및 인증 복원"],
        implementationDetails: "Firebase Authentication을 활용해 이메일 기반 회원가입·로그인·로그아웃 기능을 구현했습니다. 인증 상태 구독과 Zustand 연동을 통해 새로고침 후 로그인 상태를 복원하고, 인증 처리 결과에 따라 사용자 정보를 갱신하도록 구성했습니다.",
        images: [],
      },
      {
        id: "crud",
        title: "02. 게시글 CRUD 및 데이터베이스 연동",
        summary: "Cloud Firestore를 활용한 게시글 등록·조회·수정·삭제 기능과 최신순 정렬, 상세 조회를 구현했습니다.",
        responsibilities: [
          "- Cloud Firestore를 활용한 게시글 등록·조회·수정·삭제 기능 구현",
          "- 생성 시각을 기준으로 게시글 목록을 최신순 정렬",
          "- React Router의 URL 파라미터를 활용한 게시글 상세 조회 구현"
        ],
        steps: ["게시글 작성 및 Firestore 저장", "생성 시각 기준 최신순 정렬 조회", "URL 파라미터 기반 상세 페이지 이동"],
        implementationDetails: "Cloud Firestore를 활용한 게시글 등록·조회·수정·삭제 기능 구현했습니다. 생성 시각을 기준으로 게시글 목록을 최신순 정렬하고, React Router의 URL 파라미터를 활용한 게시글 상세 조회를 제공합니다.",
        images: [],
      },
      {
        id: "state",
        title: "03. 전역 상태 관리 및 데이터 동기화",
        summary: "Zustand를 활용해 전역 상태를 관리하고, Firestore 성공 여부에 따라 화면과 데이터를 동기화했습니다.",
        responsibilities: [
          "- Zustand를 활용한 사용자 인증 정보와 게시글 데이터의 전역 상태 관리",
          "- Firestore 저장 성공 후 게시글 목록을 갱신해 화면과 데이터 상태 동기화",
          "- 비동기 요청의 로딩·성공·실패 상태에 따른 화면 업데이트"
        ],
        steps: ["Zustand 스토어 상태 변경", "Firestore 연동 및 결과 처리", "로딩 및 성공/실패 상태 화면 반영"],
        implementationDetails: "Zustand를 활용한 사용자 인증 정보와 게시글 데이터의 전역 상태 관리를 수행했습니다. Firestore 저장 성공 후 게시글 목록을 갱신해 화면과 데이터 상태를 동기화하고, 비동기 요청의 로딩·성공·실패 상태에 따라 화면을 업데이트합니다.",
        images: [],
      },
      {
        id: "validation",
        title: "04. 입력 검증 및 예외 처리",
        summary: "필수 입력값 검증과 등록 버튼 비활성화를 통한 중복 요청 방지, 저장 실패 시 예외 처리를 구현했습니다.",
        responsibilities: [
          "- 게시글 작성 시 로그인 여부 및 제목·내용 필수 입력값 검증",
          "- 데이터 저장 중 등록 버튼 비활성화를 통한 중복 요청 방지",
          "- 저장 실패 시 오류 메시지 표시 및 작성 중인 입력값 유지"
        ],
        steps: ["입력값 및 로그인 검증", "비동기 저장 중 버튼 비활성화", "실패 시 에러 출력 및 입력값 보존"],
        implementationDetails: "게시글 작성 시 로그인 여부 및 제목·내용 필수 입력값 검증을 수행하고, 데이터 저장 중 등록 버튼 비활성화를 통해 중복 요청을 방지합니다. 저장 실패 시 오류 메시지를 표시하고 작성 중인 입력값을 유지하도록 예외 처리했습니다.",
        images: [],
      },
    ],

    challenges: [
      {
        title: "Firestore 전환에 따른 게시글 상세 조회 오류",
        subtitle: "URL 파라미터와 Firestore 문서 ID 간 데이터 타입 일치화",
        problem: "게시글 목록에서 제목을 클릭하면 URL의 ID에 해당하는 게시글을 찾아 상세 페이지에 표시해야 했습니다. 기존 데이터 구조에서 Firestore로 전환한 이후에도 정상적으로 게시글을 조회할 수 있도록 식별자 비교 로직을 수정해야 했습니다.",
        cause: "기존 게시글은 숫자형 ID를 사용했지만, Firestore의 문서 ID는 문자열로 관리됩니다. URL에서 전달받은 ID를 Number()로 변환하면서 Firestore 문서 ID와 데이터 타입이 일치하지 않아 게시글을 찾지 못하는 문제가 발생했습니다.",
        solution: "URL 파라미터와 Firestore 문서 ID를 동일한 문자열 타입으로 비교하도록 수정해 게시글 상세 조회 오류를 해결했습니다. 이를 통해 데이터베이스의 식별자 구조가 변경될 때 프론트엔드의 라우팅 및 조회 로직도 함께 고려해야 한다는 점을 배웠습니다.",
        result: "문자열 기반의 문서 ID로 정확하게 매칭되어 상세 페이지 정보가 정상적으로 렌더링되도록 수정했습니다.",
        language: "JavaScript",
        before: `// 숫자형 변환으로 인해 Firestore 문자열 ID와 불일치하던 비교 로직 (예시)
const { id } = useParams();
const post = posts.find((item) => item.id === Number(id));`,
        after: `Detail.jsx
const { id } = useParams();
const posts = usePostStore((state) => state.posts);

const post = posts.find((item) => item.id === id);`,
      },
      {
        title: "새로고침 시 로그인 상태 초기화 문제",
        subtitle: "Firebase 인증 상태 변경 구독 및 인증 확인 완료 전 조건부 렌더링",
        problem: "로그인한 사용자가 페이지를 새로고침하더라도 인증 상태가 유지되어야 했습니다. 또한 Firebase 인증 정보를 복원하는 동안 사용자가 일시적으로 비로그인 상태로 표시되는 문제를 방지해야 했습니다.",
        cause: "Zustand의 전역 상태는 메모리에 저장되기 때문에 페이지를 새로고침하면 초기화됩니다. Firebase가 기존 인증 정보를 복원하기 전에 user: null 상태를 기준으로 화면을 렌더링하면서 로그인한 사용자도 일시적으로 비로그인 상태로 표시되는 문제가 발생했습니다.",
        solution: "Firebase의 인증 상태 변경을 구독해 복원된 사용자 정보를 Zustand에 반영하고, 인증 확인이 완료될 때까지 대기 화면을 표시하도록 구현했습니다. 이를 통해 인증 상태와 초기화 완료 여부를 분리해 관리하고, 비동기 인증 처리 과정에서 발생할 수 있는 화면 상태 불일치를 방지했습니다.",
        result: "새로고침 직후 인증 상태가 복원될 때까지 로딩 화면을 거치므로 깜빡임이나 비로그인 오인 현상이 사라졌습니다.",
        language: "JavaScript",
        after: `firebaseAuth.js / authStore.js / App.jsx
// Firebase 인증 상태 유지 및 구독
setPersistence(auth, browserLocalPersistence);

export const subscribeAuthState = (callback) =>
  onAuthStateChanged(auth, callback);

// 인증 상태 복원 후 전역 상태 업데이트
listenAuthState: () => {
  return subscribeAuthState((user) => {
    set({
      user: mapUser(user),
      initialized: true,
    });
  });
},

// 인증 상태 구독 및 해제
useEffect(() => {
  const unsubscribe = listenAuthState();
  return unsubscribe;
}, [listenAuthState]);

// 인증 확인 완료 여부에 따른 조건부 렌더링
{initialized ? <AuthForm /> : <p>로그인 상태 확인 중</p>}`,
      },
      {
        title: "게시글 저장 실패 시 화면과 DB 상태 불일치 문제",
        subtitle: "비동기 DB 저장 완료 시점 보장 및 로딩 중 중복 요청 방지",
        problem: "게시글 작성 시 Firestore 저장이 완료된 후에만 목록에 데이터를 반영하고 입력값을 초기화해야 했습니다. 저장 요청에 실패하더라도 사용자가 작성한 내용은 유지되도록 처리해야 했습니다.",
        cause: "비동기 DB 저장이 완료되기 전에 화면 상태를 변경하면, 저장 실패 시 실제 DB에는 존재하지 않는 게시글이 목록에 표시되거나 작성 중인 내용이 사라질 수 있습니다. 또한 저장 요청 중 등록 버튼을 반복 클릭하면 중복 요청이 발생할 가능성이 있었습니다.",
        solution: "Firestore 저장이 성공한 경우에만 게시글 목록을 갱신하고 입력값을 초기화하도록 처리했습니다. 저장 실패 시에는 오류 메시지를 표시하면서 작성 내용을 유지하고, 요청 중에는 등록 버튼을 비활성화해 반복 요청을 방지했습니다. 이를 통해 비동기 데이터 처리에서 성공·실패 상태를 명확하게 구분하고, 화면과 DB 간 데이터 일관성을 고려하는 방법을 익혔습니다.",
        result: "네트워크 통신 중 버튼이 잠겨 중복 생성이 차단되며, 저장 성공 시에만 폼이 초기화되어 데이터 정합성이 확보되었습니다.",
        language: "JavaScript",
        after: `postStore.js
addPost: async (newPost) => {
  set({ loading: true, error: '' });

  try {
    const savedPost = await addPostToFirestore(newPost);

    set((state) => ({
      posts: [savedPost, ...state.posts],
      loading: false,
    }));
  } catch (error) {
    set({
      error: getPostErrorMessage(error),
      loading: false,
    });
    throw error;
  }
},
PostForm.jsx
try {
  await addPost(newPost);
  setTitle('');
  setContent('');
} catch (error) {
  alert(error.message);
}

<button onClick={submitB} disabled={loading}>
  {loading ? '등록 중' : '등록'}
</button>`,
      },
    ],

    outcomes: [
      "React와 Firebase를 연동해 회원가입·로그인부터 게시글 CRUD까지 제공하는 인증 기반 게시판을 구현했습니다.",
      "Zustand를 활용한 전역 상태 관리와 Firestore 데이터 연동을 통해 사용자 인증, 게시글 조회·저장, 화면 갱신으로 이어지는 기능을 완성했습니다."
    ],

    retrospective: "Firebase Authentication의 비동기 인증 상태 복원과 Firestore 문서 ID 기반 조회 로직을 구현하며 인증 및 데이터 처리 흐름에 대한 이해를 높였습니다.\n\n또한 DB 저장 결과에 따라 화면 상태를 갱신하고 오류를 처리하며 데이터 일관성과 예외 처리의 중요성을 배웠습니다.",

    improvements: "현재 게시글 상세 조회는 전역 상태에 저장된 데이터를 기준으로 동작해 새로고침 시 데이터가 정상적으로 표시되지 않을 수 있습니다.\n\n향후에는 Firestore 문서 ID를 활용한 개별 조회 기능과 작성자 기반 수정·삭제 권한 검증을 추가해 데이터 접근의 안정성과 보안성을 개선하고자 합니다.",
  },
  
"18": {
    ...emptyProjectDetail,
    serviceName: "React Lab",
    siteUrl: "https://reactlab-nu.vercel.app/",
    githubUrl: "https://github.com/jiwoo1012/reactlab",
    period: "2026.09.03 - 2026.10.16",
    team: "1명 (개인 프로젝트)",
    role: "프론트엔드 · 백엔드 개발 및 API 연동",
    stack: ["Next.js", "WebSocket", "Node.js", "MySQL", "TypeScript", "Express", "OpenAI API", "Vercel", "Render"],
    overview: "ReactLab은 React 학습을 지원하는 AI 기반 웹 플랫폼입니다.\n\n사용자의 학습 목적에 따라 개념 설명, 문제 생성, 힌트를 제공하는 AI 학습 기능과 학습 문서 검색 기반 챗봇을 구현했습니다. 또한 회원가입 및 로그인, 네이버·카카오 소셜 로그인, WebSocket 기반 실시간 채팅, 날씨 조회 기능을 통합했습니다.\nNext.js와 Node.js·Express를 기반으로 프론트엔드와 백엔드를 구성하고, MySQL을 활용한 사용자 데이터 관리와 외부 API 연동을 구현하며 클라이언트부터 서버까지 이어지는 데이터 처리 흐름을 학습한 프로젝트입니다.",
    
    contributionGroups: [
      {
        title: "담당 역할 & 구현 내용",
        items: [
          { title: "AI 학습 기능 개발", anchor: "ai-study", description: "OpenAI API를 활용한 개념 설명·문제 생성·힌트 제공 기능 구현, 학습 모드별 요청 처리 및 응답 데이터 검증" },
          { title: "AI 챗봇 구현", anchor: "ai-chatbot", description: "키워드 기반 학습 문서 검색, 관련도 점수 계산 및 검색 결과 기반 AI 응답 생성" },
          { title: "회원 인증 시스템 구현", anchor: "auth", description: "Express·MySQL 기반 회원가입 및 로그인 API, bcrypt 비밀번호 암호화(해싱) 및 검증 로직 구현" },
          { title: "소셜 로그인 연동", anchor: "social-login", description: "OAuth 2.0 기반 네이버·카카오 로그인, 사용자 정보 조회 및 회원 데이터 저장" },
          { title: "실시간 통신 기능 구현", anchor: "chat", description: "WebSocket을 활용한 실시간 채팅 및 메시지 브로드캐스트 처리" },
          { title: "외부 API 연동", anchor: "weather", description: "날씨 및 도시 검색 API 구현, 검색 결과 정렬·중복 제거 및 오류 처리" },
          { title: "프론트엔드 개발 및 배포", anchor: "deployment", description: "Next.js 기반 학습·인증·채팅·날씨 화면 구현, Vercel·Render 배포 및 CORS 문제 해결" },
        ],
      },
      {
        title: "사용 기술",
        items: [
          { title: "언어", description: "TypeScript, JavaScript" },
          { title: "프론트엔드", description: "React, Next.js, SCSS Modules" },
          { title: "백엔드", description: "Node.js, Express, Next.js Route Handlers" },
          { title: "데이터베이스", description: "MySQL" },
          { title: "AI", description: "OpenAI API" },
          { title: "인증", description: "bcrypt, OAuth 2.0" },
          { title: "실시간 통신", description: "WebSocket" },
          { title: "외부 API", description: "OpenWeather API, Open-Meteo API" },
          { title: "배포", description: "Vercel, Render" },
        ],
      },
    ],

    implementations: [
      {
        id: "ai-study",
        video: "/project/reactLab/one.mp4",
        title: "01. AI 기반 React 학습 API",
        summary: "사용자의 학습 목적에 따라 개념 설명·문제 생성·힌트를 제공하는 API를 구현했습니다.",
        responsibilities: [
          "- OpenAI API 활용 개념 설명·문제 생성·힌트 제공 기능 구현",
          "- 학습 모드별 요청 처리 및 응답 데이터 검증"
        ],
        steps: ["학습 모드 선택 및 요청", "OpenAI API 구조화된 응답 생성", "JSON Schema 기반 데이터 검증 및 출력"],
        implementationDetails: "사용자의 학습 목적에 따라 개념 설명·문제 생성·힌트를 제공하는 API를 구현했습니다. 학습 모드별로 요청 데이터를 구성하고, JSON Schema를 활용해 문제와 정답·해설을 구조화했습니다. 입력값 및 API 응답 검증을 적용해 안정적인 학습 흐름을 구성했습니다.",
        images: [],
      },
      {
        id: "ai-chatbot",
        video: "/project/reactLab/two.mp4",
        title: "02. 학습 문서 검색 기반 AI 챗봇",
        summary: "학습 문서를 단원별로 분리하고, 키워드 일치도를 계산하는 RAG 방식의 챗봇을 구현했습니다.",
        responsibilities: [
          "- 키워드 기반 학습 문서 검색",
          "- 관련도 점수 계산 및 검색 결과 기반 AI 응답 생성"
        ],
        steps: ["사용자 질문 키워드 추출", "단원별 문서 검색 및 점수화", "관련 문서 기반 AI 응답 생성"],
        implementationDetails: "학습 문서를 단원별로 분리하고, 사용자 질문과 키워드의 일치도를 계산하는 검색 로직을 구현했습니다. 관련도가 높은 문서 최대 3개를 AI에 전달하는 키워드 기반 RAG 방식을 적용하고, 검색 결과가 없으면 불필요한 API 호출을 방지했습니다.",
        images: [],
      },
      {
        id: "auth",
        title: "03. MySQL 기반 회원 인증",
        summary: "Express와 MySQL을 연동해 비밀번호 암호화와 세션/토큰 기반 인증 API를 구현했습니다.",
        responsibilities: [
          "- Express·MySQL 기반 회원가입 및 로그인 API 개발",
          "- bcrypt 비밀번호 암호화(해싱) 및 검증 로직 구현"
        ],
        steps: ["회원가입 정보 입력 및 해싱", "로그인 검증 및 데이터베이스 조회", "데이터베이스 연결 풀 관리"],
        implementationDetails: "Express와 MySQL을 연동해 회원가입 및 로그인 API를 구현했습니다. bcrypt를 이용한 비밀번호 해싱 및 검증, 아이디 중복 확인, SQL 파라미터 바인딩을 적용했습니다. 데이터베이스 연결 풀을 사용해 회원 데이터를 관리했습니다.",
        images: [],
      },
      {
        id: "social-login",
        video: "/project/reactLab/four.mp4",
        title: "04. 네이버·카카오 소셜 로그인",
        summary: "OAuth 2.0 인가 코드 흐름을 활용하여 네이버 및 카카오 소셜 로그인을 연동했습니다.",
        responsibilities: [
          "- OAuth 2.0 기반 네이버·카카오 로그인 연동",
          "- 사용자 정보 조회 및 회원 데이터 저장"
        ],
        steps: ["소셜 인가 코드 발급", "액세스 토큰 교환 및 유저 정보 조회", "기존 회원 확인 및 신규 회원 등록"],
        implementationDetails: "OAuth 2.0 인가 코드 흐름을 활용해 네이버·카카오 로그인을 연동했습니다. 서버에서 액세스 토큰 교환 및 사용자 정보 조회를 처리하고, 공급자와 소셜 ID를 기준으로 기존 회원 조회와 신규 회원 등록 로직을 구현했습니다.",
        images: [],
      },
      {
        id: "chat",
        video: "/project/reactLab/five.mp4",
        title: "05. WebSocket 기반 실시간 채팅",
        summary: "WebSocket을 활용하여 클라이언트 간 실시간 메시지 송수신 및 브로드캐스트를 구현했습니다.",
        responsibilities: [
          "- WebSocket을 활용한 실시간 채팅 구현",
          "- 메시지 브로드캐스트 처리 및 연결 상태 관리"
        ],
        steps: ["WebSocket 서버 연결", "실시간 메시지 수신", "접속 중인 클라이언트 브로드캐스트"],
        implementationDetails: "Express HTTP 서버에 WebSocket 서버를 연결해 실시간 메시지 송수신 기능을 구현했습니다. 메시지 수신 시 연결 상태를 확인한 후 접속 중인 클라이언트에 브로드캐스트하고, 환경변수로 서버 접속 주소를 관리했습니다.",
        images: [],
      },
      {
        id: "weather",
        video: "/project/reactLab/six.mp4",
        title: "06. 외부 날씨 API 및 도시 검색",
        summary: "Next.js Route Handler를 통해 외부 날씨 API를 호출하고 예외 처리를 적용했습니다.",
        responsibilities: [
          "- 날씨 및 도시 검색 API 구현",
          "- 검색 결과 정렬·중복 제거 및 오류 처리"
        ],
        steps: ["도시명·좌표 기반 날씨 조회", "검색 결과 정렬 및 중복 제거", "외부 API 오류 예외 처리"],
        implementationDetails: "Next.js Route Handler를 활용해 외부 날씨 API를 서버에서 호출하고, API 키를 환경변수로 관리했습니다. 도시명·좌표 기반 날씨 조회와 검색 결과의 정렬·중복 제거를 구현하고, 입력 오류 및 외부 API 요청 실패에 대한 예외 처리를 적용했습니다.",
        images: [],
      },
    ],

    challenges: [
      {
        title: "AI 학습 모드에서 문제와 힌트가 덮어써지는 현상",
        subtitle: "상태 분리 및 현재 문제 데이터(currentQuiz) 서버 전달을 통한 힌트 유지",
        problem: "OpenAI API를 활용해 사용자가 학습 방식을 선택하면 AI가 설명, 문제, 힌트를 제공하는 React 학습 기능을 구현했습니다.",
        cause: "문제 풀이 모드에서 힌트를 요청하면 기존에 생성된 문제가 사라지거나, 힌트 응답이 문제 영역에 표시되는 현상이 발생했습니다. 문제와 힌트를 동일한 응답 상태로 관리하고 있어 새로운 API 응답이 이전 문제 데이터를 덮어쓰는 것이 원인이었습니다.",
        solution: "문제와 힌트의 상태를 분리하고, 힌트를 요청할 때 현재 문제 정보인 currentQuiz를 서버에 전달하도록 수정했습니다. 또한 API 응답 형식을 구분하여 힌트 응답이 기존 문제를 변경하지 않도록 개선했습니다. 이를 통해 사용자가 기존 문제를 유지한 상태에서 힌트를 확인할 수 있도록 학습 흐름을 개선했습니다.",
        result: "힌트 조회 시 기존 문제가 덮어써지지 않고 독립적으로 출력되도록 UI 상태를 안정화했습니다.",
        language: "JavaScript",
        before: `// 문제와 힌트를 동일한 상태로 처리하던 방식 (예시)
const [content, setContent] = useState("");

const requestHint = async () => {
  const res = await fetch("/api/study", { method: "POST", body: JSON.stringify({ mode: "hint" }) });
  const data = await res.json();
  setContent(data.hint); // 기존 문제 내용이 힌트로 덮어써짐
};`,
        after: `// 문제와 힌트를 별도 상태로 관리
const [currentQuiz, setCurrentQuiz] = useState("");
const [hint, setHint] = useState("");

// 힌트 요청 시 기존 문제 정보를 함께 전달
const response = await fetch("/api/study", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    mode: "hint",
    currentQuiz,
  }),
});

const data = await response.json();

// 기존 문제를 유지하고 힌트만 갱신
setHint(data.hint);`,
      },
      {
        title: "비동기 API 요청으로 이전 응답이 화면에 표시되는 문제",
        subtitle: "AbortController를 활용한 비동기 요청 경쟁 상태(Race Condition) 해결",
        problem: "AI 학습 기능에서 사용자가 학습 모드를 변경하거나 새로운 질문을 입력하면 해당 요청에 맞는 AI 응답을 화면에 표시하도록 구현했습니다.",
        cause: "API 응답이 완료되기 전에 사용자가 다른 학습 모드를 선택하거나 새로운 요청을 보내면, 이전 요청의 응답이 나중에 도착해 현재 화면의 내용을 덮어쓸 가능성이 있었습니다. 이는 비동기 요청의 완료 순서가 요청 순서와 항상 일치하지 않아 발생하는 경쟁 상태(Race Condition) 문제였습니다.",
        solution: "AbortController를 도입해 새로운 요청이 발생하면 이전 요청을 취소하도록 변경했습니다. 또한 API 요청 중에는 로딩 상태를 표시하고 관련 버튼을 비활성화해 중복 요청을 방지했습니다. 이를 통해 이전 요청의 응답이 현재 학습 결과를 덮어쓰는 문제를 방지하고, 사용자에게 일관된 학습 화면을 제공하도록 개선했습니다.",
        result: "빠른 연속 요청 시 발생하던 응답 뒤바뀜(Race Condition) 현상을 완벽히 차단했습니다.",
        language: "TypeScript",
        after: `const abortControllerRef =
  useRef<AbortController | null>(null);

const requestStudy = async () => {
  // 이전 요청 취소
  abortControllerRef.current?.abort();

  const controller = new AbortController();
  abortControllerRef.current = controller;

  setLoading(true);

  try {
    const response = await fetch("/api/study", {
      method: "POST",
      signal: controller.signal,
    });

    const data = await response.json();

    if (!controller.signal.aborted) {
      setAnswer(data.answer);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.name !== "AbortError"
    ) {
      console.error(error);
    }
  } finally {
    if (abortControllerRef.current === controller) {
      setLoading(false);
    }
  }
};`,
      },
    ],

    outcomes: [
      "Next.js와 Express를 활용해 AI 학습, 회원 인증, 실시간 채팅, 날씨 조회 기능을 하나의 웹 플랫폼으로 구현했습니다.",
      "MySQL 데이터 연동과 외부 API 호출, 소셜 로그인 처리까지 경험하며 프론트엔드와 백엔드가 연결되는 서비스 구조를 학습했습니다."
    ],

    retrospective: "학습 모드별 API 요청과 응답 검증, bcrypt 기반 비밀번호 해싱, SQL 파라미터 바인딩 등을 구현하며 서버 측 데이터 처리와 보안의 기초를 익혔습니다. 또한 비동기 요청 간 경쟁 상태와 CORS 문제를 해결하면서 클라이언트와 서버 사이의 데이터 흐름을 이해할 수 있었습니다.",

    improvements: "현재 회원 인증은 비밀번호 검증과 사용자 정보 조회 중심으로 구현되어 있어, JWT 또는 세션 기반 인증과 보호 API의 접근 제어를 추가할 필요가 있습니다. 향후에는 API 로직의 모듈화, 예외 처리 및 자동화 테스트를 보완해 유지보수성과 안정성을 높이고자 합니다.",
  },
};
