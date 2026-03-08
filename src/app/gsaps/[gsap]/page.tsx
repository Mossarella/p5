"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useParams } from "next/navigation";

type GsapWorkComponent = ComponentType | null;

export default function GsapWorkPage() {
  const params = useParams();
  const slug = params?.gsap as string | undefined;

  const [Work, setWork] = useState<GsapWorkComponent>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setWork(null);
      setError("No GSAP work specified.");
      return;
    }

    let cancelled = false;

    setError(null);
    setWork(null);

    import(`@/components/gsaps/gsap${slug}`)
      .then((module) => {
        if (cancelled) return;
        const Loaded = (module.default ?? null) as ComponentType | null;
        setWork(() => Loaded);
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
        <h1>GSAP work: {slug ?? "—"}</h1>
        No GSAP work specified.
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>GSAP work: {slug}</h1>
        {error}
      </div>
    );
  }

  if (!Work) {
    return (
      <div>
        <h1>GSAP work: {slug}</h1>
        <p>Loading work...</p>
      </div>
    );
  }

  return <Work />;
}
