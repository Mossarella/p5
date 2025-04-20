"use client";

import { useEffect, useRef } from "react";

// ✅ Tell TypeScript about global p5
declare global {
  interface Window {
    p5: any;
  }
}

type P5WrapperProps = {
  sketch: (p: any) => void;
  resize?: boolean; // Optional prop to auto-resize
  name: string;
};

const P5Wrapper = ({ sketch, resize = true, name }: P5WrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<any>(null); // Use any for now

  useEffect(() => {
    let handleKeydown: any;
    if (!wrapperRef.current) return;

    if (typeof window !== "undefined" && window.p5) {
      console.log("✅ p5.js found, creating sketch...");
      p5Instance.current = new window.p5(sketch, wrapperRef.current);

      handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "0" && p5Instance.current) {
          p5Instance.current.saveCanvas(`sketches_${name}`, "png");
        }
        if (event.key === "1" && p5Instance.current) {
          p5Instance.current.saveGif("mySketch", 5);
        }
        if (event.key === "2" && p5Instance.current) {
          console.log(name);
        }
      };

      window.addEventListener("keydown", handleKeydown);
    } else {
      console.error("❌ p5.js not loaded yet!");
    }

    const handleResize = () => {
      if (resize && p5Instance.current) {
        p5Instance.current.resizeCanvas(window.innerWidth, window.innerHeight);
      }
    };

    if (resize) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (resize) {
        window.removeEventListener("resize", handleResize);
      }
      window.removeEventListener("keydown", handleKeydown);

      if (p5Instance.current) {
        console.log("🧹 Removing p5 instance");
        p5Instance.current.remove();
      }
    };
  }, [sketch, resize]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full "
    />
  );
};

export default P5Wrapper;
