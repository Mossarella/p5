"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getSketch } from "./sketchRegistry";

function SketchPageContent() {
  const params = useParams();
  const slug = params?.sketch as string | undefined;
  const Sketch = getSketch(slug);

  if (!slug || !Sketch) {
    return (
      <div>
        <h1>Slug is: {slug ?? "—"}</h1>
        Sketch not found
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <h1 className="w-full h-[24px]">Slug is: {slug}</h1>
      <Sketch />
    </div>
  );
}

export default dynamic(() => Promise.resolve(SketchPageContent), {
  ssr: false,
  loading: () => (
    <div className="h-dvh flex flex-col overflow-hidden">
      <h1 className="w-full h-[24px]">Loading...</h1>
      <div className="flex-1" />
    </div>
  ),
});
