"use client";
import P5CDNLoader from "@/components/commons/p5CDNLoader";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const TOTAL_SKETCHES = 100; // only adjust this
const sketchNumbers = Array.from({ length: TOTAL_SKETCHES }, (_, i) => i + 1);

const sketchMap: Record<string, any> = Object.fromEntries(
  sketchNumbers.map((num) => [
    `sketch${num}`,
    dynamic(() => import(`@/components/pages/sketches${num}`), { ssr: false }),
  ])
);

export default function SketchPage() {
  const params = useParams();
  const slug = params.sketch as string;

  const Sketch = sketchMap[`sketch${slug}`];

  if (!Sketch) {
    return (
      <div>
        <h1>Slug is: {slug}</h1>
        Sketch not found
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden ">
      <h1 className="w-full h-[24px] ">Slug is: {slug}</h1>
      <Sketch />
    </div>
  );
}
