# 프로젝트 상세 내용 작성

## 수정할 파일

- `project-details.ts`: 상세 본문. 프로젝트 ID별 객체에 내용을 적습니다.
- `projects.ts`: 목록과 상세에 공통으로 사용하는 제목, 설명, 썸네일, 사이트 주소(`siteUrl`), GitHub 주소(`githubUrl`).
- `[id]/page.tsx`: 모든 개발 프로젝트가 공유하는 템플릿입니다. 내용을 쓸 때 수정할 필요 없습니다.
- `[id]/page.module.scss`: 상세 페이지 공통 디자인입니다.

`01`은 JAJAK, `02` CHAMVERSE, `03` onvé, `04` bookly, `05` NODE,
`06` 방명록, `07` Drawing Board, `08` React CRUD Board, `18` React Lab입니다.
예: JAJAK 주소는 `/project/01`입니다. 개발 프로젝트 카드 전체를 클릭하면 상세 페이지로 바로 들어갑니다. 홈의 대표작 이미지도 상세 페이지로 연결됩니다.
디자인·영상은 기존 갤러리와 플레이어를 사용합니다.

## 작성 예시

아래는 작성 형식 예시이며 실제 경력이나 성과가 아닙니다. 해당 ID 객체의 내용을 교체하세요.

```ts
"02": {
  ...emptyProjectDetail,
  period: "실제 개발 기간",
  team: "팀 구성과 인원 또는 개인 프로젝트",
  role: "담당 역할",
  stack: ["실제로 사용한 기술"],
  overview: "누구의 어떤 문제를 해결하는 서비스인지 설명합니다.",
  contributions: [
    { title: "담당한 기능", description: "내가 직접 구현한 범위와 방법을 구체적으로 적습니다." },
  ],
  challenges: [
    {
      title: "문제 해결 사례",
      problem: "어떤 상황에서 무엇이 문제였고 원인은 무엇이었는지",
      solution: "검토한 방법과 최종 선택의 이유",
      result: "어떻게 검증했고 무엇이 달라졌는지",
    },
  ],
  screenshots: [
    { src: "/project/chamverse/search.png", alt: "검색 결과 화면", caption: "화면에서 확인할 수 있는 기능" },
  ],
  outcomes: ["검증 가능한 결과. 수치는 측정한 경우에만 작성합니다."],
  retrospective: "배운 점과 다음에 개선하고 싶은 부분",
},
```

위 이미지 예시라면 파일을 `public/project/chamverse/search.png`에 넣습니다.
`src`에는 `public`을 제외한 `/project/chamverse/search.png`를 적습니다.
스크린샷은 원본 비율로 표시됩니다. 여러 장과 여러 문제 해결 사례를 추가할 수 있습니다.
문단 내 줄바꿈은 문자열에 `\n`을 넣으세요.

상세 페이지는 항상 4개 섹션을 표시하며, 비어 있는 주요 내용은 작성 안내로 표시됩니다. Overview가 비어 있으면 목록의 설명을 사용합니다.
새 개발 프로젝트는 `projects.ts`에 고유 ID로 추가하면 상세 주소도 자동 생성됩니다.
`project-details.ts`에 같은 ID로 본문을 추가하면 됩니다.


## 프로젝트 4개 섹션 작성

`project-details.ts`의 해당 프로젝트 객체를 수정하세요. JAJAK은 `"01"`입니다.

- 01 Overview: 소개, 기간, 인원, 역할, 기술 스택, 관련 링크.
- 02 My Contribution & Implementation: `contributionGroups`에 기여도 표를 작성합니다. 항목의 `anchor`를 `implementations[].id`와 맞추면 구현 화면으로 이동합니다.
- 03 Troubleshooting: `challenges`에 핵심 문제 해결 사례 2개를 작성합니다. 각 사례는 문제·해결·결과로 구성합니다.
- 04 Retrospective: `outcomes`에 성과, `retrospective`에 기술적 성장, `improvements`에 협업 개선점을 작성합니다.

구현 순서는 AI Curation → Makdong Game → User & Commerce → Admin & Dashboard입니다.
각 `implementations` 항목에 대표 이미지, 선택적 시연 영상, `implementationDetails`, 선택적 `flowchart`, `codeExamples`를 작성합니다.
기술 설명은 각 기능 안에서 작성하며 독립적인 Architecture 섹션은 사용하지 않습니다.
`codeExamples`에는 `title`, `summary`, `filename`, `code`, `rationale`을 적습니다. 첫 코드는 기본으로 펼치고 나머지는 접으며, 설계 의도는 항상 표시합니다.
아직 제공되지 않은 구현 자료나 경험은 추측하지 않고 작성 예정으로 남깁니다.
