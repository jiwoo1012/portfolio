import type { StaticImageData } from "next/image";
import { videos } from "./videos";
import site01 from "../../../public/intro/site/site01.png";
import site02 from "../../../public/intro/site/site02.png";
import site03 from "../../../public/intro/site/site03.png";
import site04 from "../../../public/intro/site/site04.png";
import site05 from "../../../public/intro/site/site05.png";
import site06 from "../../../public/intro/site/site06.png";
import site07 from "../../../public/intro/site/site07.png";
import site08 from "../../../public/intro/site/site08.png";
import site09 from "../../../public/intro/site/site09.png";
import night01 from "../../../public/design/2025 문과인의 밤 카뉴 01.png";
import night02 from "../../../public/design/2025 문과인의 밤 카뉴 02.png";
import night03 from "../../../public/design/2025 문과인의 밤 카뉴 03.png";
import night04 from "../../../public/design/2025 문과인의 밤 카뉴 04.png";
import night05 from "../../../public/design/2025 문과인의 밤 카뉴 05.png";
import night06 from "../../../public/design/2025 문과인의 밤 카뉴 06.png";
import night07 from "../../../public/design/2025 문과인의 밤 카뉴 07.png";
import voh01 from "../../../public/design/voh 01.png";
import voh02 from "../../../public/design/voh 02.png";
import voh03 from "../../../public/design/voh 03.png";
import voh04 from "../../../public/design/voh 04.png";

﻿export type Category = "frontend" | "backend" | "design";
export type Project = {
  id: string;
  title: string;
  description: string;
  category: Category;
  label: string;
  image: StaticImageData;
  gallery?: StaticImageData[];
  youtube?: { id: string; title: string; url: string; start: number };
  color: string;
  siteUrl?: string;
  githubUrl?: string;
};

// 화면 구성을 위한 임시 이름·분류입니다. 실제 프로젝트 정보와 배포 주소를 이곳에서 수정하세요.
export const projects: Project[] = [
  { id: "09", title: "단과대 연합 행사 홍보 포스터 디자인", description: "콘셉트 기획 · 타이포그래피 및 그래픽 디자인", category: "design", label: "CARD NEWS / EVENT", image: night01, gallery: [night01, night02, night03, night04, night05, night06, night07], color: "#e7ded9" },
  { id: "10", title: "SNS 카드뉴스 디자인", description: "콘텐츠 레이아웃 구성 · 정보 시각화", category: "design", label: "CARD NEWS / VOH", image: voh01, gallery: [voh01, voh02, voh03, voh04], color: "#e7e2f1" },
  { id: "01", title: "JAJAK", description: "전통의 분위기를 담은 브랜드 & 스토어 웹사이트", category: "frontend", label: "BRAND / COMMERCE", image: site01, color: "#eae3d8" },
  { id: "02", title: "CHAMVERSE", description: "좋아하는 애니메이션을 발견하는 콘텐츠 플랫폼", category: "frontend", label: "CONTENT PLATFORM", image: site02, color: "#f3e1e3", siteUrl: "https://kimhyeonso.github.io/CHAMVERSE/html/intro.html" },
  { id: "03", title: "onvé", description: "나에게 맞는 뷰티 루틴을 찾는 쇼핑 경험", category: "frontend", label: "BEAUTY / COMMERCE", image: site03, color: "#e8e5df", siteUrl: "https://onve-five.vercel.app/" },
  { id: "04", title: "Bookly", description: "출판 서비스의 현황을 한눈에 보는 대시보드", category: "frontend", label: "ADMIN DASHBOARD", image: site04, color: "#e5e6f0", siteUrl: "https://dashboard-tau-eight-12.vercel.app/" },
  { id: "05", title: "NODE", description: "오디오 제품을 탐색하고 비교하는 스토어", category: "frontend", label: "PRODUCT / COMMERCE", image: site05, color: "#e4e5e1", siteUrl: "https://kimhyeonso.github.io/NODE/" },
  { id: "06", title: "Bikini Bottom 방명록", description: "스폰지밥의 세계에서 추억을 나누는 방명록", category: "backend", label: "INTERACTIVE / GUESTBOOK", image: site06, color: "#e4ecd9", siteUrl: "https://guestbook-fawn-eight.vercel.app/" },
  { id: "07", title: "Drawing Board", description: "자유롭게 그리고 저장하는 나만의 캔버스", category: "frontend", label: "INTERACTIVE WEB", image: site07, color: "#dfeae1", siteUrl: "https://jiwoo1012.github.io/canvas_drawing/canvas0609_01.html" },
  { id: "08", title: "React CRUD Board", description: "글을 작성하고 나누는 심플한 게시판", category: "backend", label: "COMMUNITY / CRUD", image: site08, color: "#f1e4de", siteUrl: "https://bulletin-board-plum.vercel.app/" },
  { id: "18", title: "React Lab", description: "AI 학습과 외부 API를 활용한 날씨·채팅 기능을 담은 React 학습 프로젝트", category: "backend", label: "AI STUDY / API", image: site09, color: "#e5e3ed", siteUrl: "https://reactlab-nu.vercel.app/" },
  ...videos,
];
