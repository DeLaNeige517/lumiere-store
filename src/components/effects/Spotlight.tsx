"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

/** 让容器跟随鼠标位置更新 --mx / --my 变量，用于玻璃高光 */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: React.MouseEvent<T>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}

export function SpotlightLayer({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className,
      )}
      style={{
        background:
          "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(255,255,255,0.8), transparent 64%)",
      }}
    />
  );
}
