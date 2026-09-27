"use client";

import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./galaxy-utils/renderer";

/** Decorative night-sky canvas for sections below each page's hero. */
export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const renderer = createRenderer(canvas);
    void renderer.ready.then(() => {
      if (!cancelled) setIsReady(true);
    });
    return () => {
      cancelled = true;
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#03050b]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`block h-full w-full transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
