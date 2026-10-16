"use client";

import type {} from "react/canary";
import { ViewTransition, type ReactNode } from "react";

export default function ProjectImageTransition({ id, children }: { id: string; children: ReactNode }) {
  return <ViewTransition name={`project-image-${id}`} share="project-image-zoom" default="none">{children}</ViewTransition>;
}
