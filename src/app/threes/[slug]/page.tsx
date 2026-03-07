"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useParams } from "next/navigation";

type SceneComponent = ComponentType | null;

export default function ThreeWorkPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [Scene, setScene] = useState<SceneComponent>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setScene(null);
      setError("No three.js work specified.");
      return;
    }

    let cancelled = false;

    setError(null);
    setScene(null);

    import(`@/components/threes/three${slug}`)
      .then((module) => {
        if (cancelled) return;
        const Loaded = (module.default ?? null) as ComponentType | null;
        setScene(() => Loaded);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Work not found");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) {
    return (
      <div>
        <h1>Work: {slug ?? "—"}</h1>
        No three.js work specified.
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-2">Three.js work: {slug}</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!Scene) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-2">Three.js work: {slug}</h1>
        <p>Loading work...</p>
      </div>
    );
  }

  return (
    <div className="h-dvh w-dvw overflow-hidden">
      <Scene />
    </div>
  );
}

