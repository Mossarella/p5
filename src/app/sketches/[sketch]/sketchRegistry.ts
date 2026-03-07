"use client";

import dynamic from "next/dynamic";

const TOTAL_SKETCHES = 100;
const sketchNumbers = Array.from({ length: TOTAL_SKETCHES }, (_, i) => i + 1);

export const sketchMap: Record<string, React.ComponentType> = Object.fromEntries(
  sketchNumbers.map((num) => [
    `sketch${num}`,
    dynamic(
      () => import(`@/components/pages/sketches${num}`).then((m) => m.default),
      { ssr: false }
    ),
  ])
);

export function getSketch(slug: string | undefined): React.ComponentType | null {
  return slug ? sketchMap[`sketch${slug}`] ?? null : null;
}
