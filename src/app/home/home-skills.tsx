import Image from "next/image";
import styles from "./home-skills.module.scss";

const groups = [
  { title: "FRONTEND", items: [
    ["HTML", "HTML.png", "의미 있는 태그로 웹 페이지의 구조를 설계합니다."],
    ["CSS", "CSS.png", "레이아웃과 반응형 스타일로 화면을 구성합니다."],
    ["JavaScript", "JavaScript.png", "사용자 입력과 데이터에 반응하는 동작을 구현합니다."],
    ["jQuery", "jQuery.png", "DOM 조작과 이벤트 처리를 간결하게 구현합니다."],
    ["Canvas", "Canvas.png", "캔버스 위에 그래픽과 인터랙션을 그립니다."],
    ["React", "React.png", "컴포넌트와 상태를 중심으로 사용자 인터페이스를 만듭니다."],
    ["TypeScript", "TypeScript.png", "타입으로 데이터 구조와 코드의 의도를 명확히 합니다."],
    ["Next.js", "Next.js.png", "React 기반의 라우팅과 서버 렌더링을 구성합니다."],
    ["Zustand", "zustand.png", "여러 컴포넌트가 공유하는 상태를 관리합니다."],
    ["SCSS", "SCSS.png", "변수와 믹스인으로 스타일을 체계적으로 관리합니다."],
    ["GSAP", "GSAP.png", "타임라인과 스크롤에 연결된 애니메이션을 만듭니다."],
    ["Swiper.js", "Swiper.png", "터치와 드래그에 반응하는 슬라이더를 구현합니다."],
    ["Three.js", "Threejs.png", "웹에서 입체적인 3D 장면을 표현합니다."],
    ["Chart.js", "Chartjs.png", "데이터를 이해하기 쉬운 차트로 시각화합니다."],
  ] },
  { title: "BACKEND", items: [
    ["Node.js", "Node.js.png", "JavaScript로 서버 로직과 API를 구현합니다."],
    ["Express", "Express.png", "라우팅과 미들웨어로 웹 서버를 구성합니다."],
    ["MySQL", "MySQL.png", "관계형 데이터의 구조를 설계하고 조회합니다."],
    ["Firebase Authentication", "firebase.png", "로그인과 사용자 인증 흐름을 구성합니다."],
    ["Cloud Firestore", "firebase.png", "문서형 데이터를 저장하고 실시간으로 동기화합니다."],
    ["Functions", "firebase.png", "이벤트와 요청에 반응하는 서버 함수를 실행합니다."],
    ["WebSocket", "WebSocket.png", "클라이언트와 서버 사이의 실시간 양방향 통신을 연결합니다."],
  ] },
  { title: "DEPLOYMENT", items: [
    ["Git", "Git.png", "변경 이력을 기록하고 브랜치로 작업을 관리합니다."],
    ["GitHub", "GitHub.png", "코드를 공유하고 리뷰하며 협업합니다."],
    ["Vercel", "vercel.png", "웹 프로젝트를 배포하고 변경 사항을 반영합니다."],
  ] },
  { title: "AI", items: [
    ["OpenAI API", "OpenAI.png", "생성형 AI 기능을 서비스의 흐름에 연결합니다."],
    ["Codex", "Codex.png", "코드 작성과 수정, 검증 작업을 보조합니다."],
    ["Midjourney", "Midjourney.png", "텍스트로 시각적 콘셉트와 이미지를 탐색합니다."],
    ["Kling AI", "KlingAI.png", "이미지와 텍스트를 바탕으로 영상을 생성합니다."],
    ["ChatGPT", "OpenAI.png", "아이디어를 정리하고 문제 해결 과정을 보조합니다."],
    ["Gemini", "Gemini.png", "텍스트와 이미지 등 다양한 자료를 분석합니다."],
    ["Claude", "Claude.png", "문서와 코드를 분석하고 내용을 구조화합니다."],
  ] },
  { title: "DESIGN & VIDEO", items: [
    ["Figma", "Figma.png", "화면을 설계하고 인터랙티브 프로토타입을 만듭니다."],
    ["Photoshop", "Photoshop.png", "이미지를 보정하고 합성해 시각 요소를 제작합니다."],
    ["Illustrator", "Illustrator.png", "벡터 기반의 그래픽과 아이콘을 제작합니다."],
    ["Premiere Pro", "Premiere Pro.png", "영상과 사운드를 편집해 콘텐츠를 완성합니다."],
    ["After Effects", "AfterEffect.png", "모션 그래픽과 영상 효과를 제작합니다."],
  ] },
];

export default function HomeSkills() {
  return <section id="skills" className={styles.skills} aria-labelledby="skills-title">
    <div className={styles.inner}>
      <h2 id="skills-title" className={styles.title}>SKILLS</h2>
      {groups.map((group, groupIndex) => <div data-skill-group className={styles.group} key={group.title}>
        <h3>{group.title}</h3>
        <ul className={styles.grid}>{group.items.map(([name, file, description], index) => {
          const descriptionId = `skill-description-${groupIndex}-${index}`;
          return <li key={name}>
            <button type="button" className={styles.skill} aria-describedby={descriptionId}>
              <span className={styles.icon}><Image src={`/about/skill/${file}`} alt="" width={64} height={64} sizes="(max-width: 600px) 48px, 64px" /></span>
              <span data-skill-name className={styles.name}>{name}</span>
              <span id={descriptionId} role="tooltip" className={styles.description}><strong>{name}</strong><span>{description}</span></span>
            </button>
          </li>;
        })}</ul>
      </div>)}
    </div>
  </section>;
}
