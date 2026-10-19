import Image from "next/image";
import Link from "next/link";
import { projects } from "../project/projects";
import styles from "./home-projects.module.scss";

const featured = [
  { id: "01", name: "JAJAK", team: "5인 팀 프로젝트", description: "전통주 AI 주안상 큐레이션" },
  { id: "18", name: "React Lab", team: "개인 프로젝트", description: "AI 챗봇과 함께하는 학습 사이트" },
  { id: "02", name: "Chamverse", team: "4인 팀 프로젝트", description: "추억의 애니메이션 OTT 사이트" },
];

export default function HomeProjects() {
  return <section id="selected-work" className={styles.projects} aria-labelledby="projects-title">
    <div className={styles.intro}>
      <span className={styles.label}>PROJECTS</span>
      <h2 id="projects-title" className={styles.title}>BEYOND<br />THE CODE</h2>
      <Link href="/project" className={styles.allProjects}>모든 프로젝트 보기</Link>
    </div>
    <div className={styles.cards}>
      {featured.map((item) => {
        const project = projects.find((project) => project.id === item.id)!;
        return <article className={styles.row} key={item.id}>
          <Link href={`/project/${item.id}`} className={styles.card} aria-label={`${item.name} 상세 보기`}>
            <div className={styles.image}>
              <Image src={project.image} alt={`${item.name} 사이트 화면`} sizes="(max-width: 600px) 84vw, 60vw" />
            </div>
            <div className={styles.caption}>
              <div className={styles.name}><h3>{item.name}</h3><span>{item.team}</span></div>
              <p>{item.description}</p>
            </div>
          </Link>
        </article>;
      })}
    </div>
  </section>;
}
