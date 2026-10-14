import type { StaticImageData } from "next/image";
import { skillIcons } from "../about/skill-icons";

// Project stacks confirmed by the portfolio owner.
export const projectTools: Record<string, string[]> = {
  "01": ["React", "Sass", "OpenAI", "Firebase", "GitHub", "Vercel"],
  "02": ["HTML", "CSS", "JavaScript"],
  "03": ["React", "Vite", "SCSS", "Zustand", "Firebase", "Chart.js"],
  "04": ["React", "JavaScript", "SCSS", "Chart.js", "GSAP", "Vite"],
  "05": ["HTML", "CSS", "JavaScript", "Kakao API", "GitHub"],
  "06": ["React", "SCSS", "Vercel"],
  "07": ["Canvas API", "HTML", "CSS", "JavaScript"],
  "09": ["Photoshop", "Illustrator"],
  "10": ["Photoshop", "Illustrator"],
  "11": ["Premiere Pro", "Illustrator", "Photoshop"],
  "12": ["Premiere Pro", "Illustrator", "Photoshop", "After Effects"],
  "13": ["Premiere Pro", "Illustrator", "Photoshop"],
  "14": ["Premiere Pro", "Illustrator", "Photoshop"],
  "15": ["Premiere Pro", "Illustrator", "Photoshop", "After Effects"],
  "16": ["Premiere Pro", "Illustrator", "Photoshop"],
  "17": ["Premiere Pro", "Illustrator", "Photoshop"],
  "18": ["Node.js", "Next.js (App Router)", "React", "TypeScript", "JavaScript", "SCSS Modules (Sass)", "MySQL", "OpenAI API", "OpenWeatherMap API", "Three.js", "GSAP"],
};

export const projectToolIcons: Partial<Record<string, StaticImageData | string>> = {
  ...skillIcons,
  Sass: skillIcons.SCSS,
  OpenAI: "/about/skill/openai.svg",
  Firebase: "/about/skill/firebase.svg",
  Vercel: "/about/skill/vercel.svg",
  Vite: "/about/skill/vite.svg",
  Zustand: "/about/skill/zustand.svg",
  "Chart.js": "/about/skill/chartjs.svg",
  "Kakao API": "/about/skill/kakao.svg",
  "Canvas API": "/about/skill/canvas.svg",
  "Next.js (App Router)": skillIcons["Next.js"],
  "SCSS Modules (Sass)": skillIcons.SCSS,
  "OpenAI API": "/about/skill/openai.svg",
  "OpenWeatherMap API": "/about/skill/openweathermap.svg",
  "Three.js": "/about/skill/threejs.svg",
  GSAP: "/about/skill/gsap.svg",
};

export const backendProjectOrder = ["18", "04", "08"];
