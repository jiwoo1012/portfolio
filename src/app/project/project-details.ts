export type ProjectDetail = {
  serviceName?: string;
  siteUrl?: string;
  githubUrl?: string;
  presentationUrl?: string;
  proposalUrl?: string;
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
    images: { src: string; alt: string; title: string; caption: string; width: number; height: number }[];
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
    siteUrl: "https://jajak-ten.vercel.app/",
    githubUrl: "https://github.com/jiwoo1012/TeamProject2",
    presentationUrl: "",
    proposalUrl: "",
    scaffold: true,
    team: "5명 (팀 프로젝트)",
    stack: ["React", "Firebase", "OpenAI API", "Zustand", "Vercel"],
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
      { title: "개발 기여", items: [
        { title: "AI 큐레이션", anchor: "ai-curation", description: "사용자 설문 및 추천 로직 구현, 결과 페이지 개발, 추천 기록 저장" },
        { title: "막동이 주막", anchor: "makdong-game", description: "게임 페이지 구현" },
        { title: "마이페이지", anchor: "user-commerce", description: "찜 목록·AI 추천 기록 조회, UI 설계 및 디자인" },
        { title: "커머스", anchor: "user-commerce", description: "찜·장바구니 기능 및 Zustand 상태 관리" },
        { title: "공통 컴포넌트", description: "Header, Footer, 검색 모달 개발" },
        { title: "관리자", anchor: "admin-support", description: "관리자 공통 레이아웃·헤더 개발, 대시보드 UI 설계 및 디자인" },
        { title: "라우팅", anchor: "admin-support", description: "고객센터 페이지 라우팅 및 화면 연결" },
      ] },
      { title: "팀 리딩 및 협업", items: [
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
  "02": { ...emptyProjectDetail },
  "03": { ...emptyProjectDetail },
  "04": { ...emptyProjectDetail },
  "05": { ...emptyProjectDetail },
  "06": { ...emptyProjectDetail },
  "07": { ...emptyProjectDetail },
  "08": { ...emptyProjectDetail },
  "18": { ...emptyProjectDetail },
};
