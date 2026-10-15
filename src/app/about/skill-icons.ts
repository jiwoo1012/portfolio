import type { StaticImageData } from "next/image";
import html from "../../../public/about/skill/HTML.png";
import css from "../../../public/about/skill/CSS.png";
import javascript from "../../../public/about/skill/JavaScript.png";
import typescript from "../../../public/about/skill/TypeScript.png";
import react from "../../../public/about/skill/React.png";
import next from "../../../public/about/skill/Next.js.png";
import scss from "../../../public/about/skill/SCSS.png";
import node from "../../../public/about/skill/Node.js.png";
import mysql from "../../../public/about/skill/MySQL.png";
import github from "../../../public/about/skill/GitHub.png";
import figma from "../../../public/about/skill/Figma.png";
import photoshop from "../../../public/about/skill/Photoshop.png";
import illustrator from "../../../public/about/skill/Illustrator.png";
import premiere from "../../../public/about/skill/Premiere Pro.png";
import afterEffects from "../../../public/about/skill/AfterEffect.png";
import firebase from "../../../public/about/skill/firebase.png";
import vercel from "../../../public/about/skill/vercel.png";

export const skillIcons: Partial<Record<string, StaticImageData>> = {
  HTML: html, CSS: css, JavaScript: javascript, TypeScript: typescript,
  React: react, "Next.js": next, SCSS: scss, "Node.js": node, MySQL: mysql,
  GitHub: github, Figma: figma, Photoshop: photoshop, Illustrator: illustrator,
  "Premiere Pro": premiere, "After Effects": afterEffects,
  Firestore: firebase, Vercel: vercel,
};
