import type { Metadata } from "next";
import ProjectGallery from "./project-gallery";

export const metadata: Metadata = {
  title: "Projects — JIWOO",
  description: "작은 디테일을 모아 완성한 웹 프로젝트 아카이브.",
};

export default async function ProjectPage({ searchParams }: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  return <ProjectGallery category={typeof category === "string" ? category : "all"} />;
}
