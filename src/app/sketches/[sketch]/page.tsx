"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useParams } from "next/navigation";

type SketchComponent = ComponentType | null;

export default function SketchPage() {
  const params = useParams();
  const slug = params?.sketch as string | undefined;

  const [Sketch, setSketch] = useState<SketchComponent>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setSketch(null);
      setError("No sketch specified.");
      return;
    }

    let cancelled = false;

    setError(null);
    setSketch(null);

    import(`@/components/pages/sketches${slug}`)
      .then((module) => {
        if (cancelled) return;
        const Loaded = (module.default ?? null) as ComponentType | null;
        setSketch(() => Loaded);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Sketch not found");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) {
    return (
      <div>
        <h1>Slug is: {slug ?? "—"}</h1>
        No sketch specified.
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Slug is: {slug}</h1>
        {error}
      </div>
    );
  }

  if (!Sketch) {
    return (
      <div className="h-dvh flex flex-col overflow-hidden">
        <h1 className="w-full h-[24px]">Slug is: {slug}</h1>
        <p>Loading sketch...</p>
        <div className="flex-1" />
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
