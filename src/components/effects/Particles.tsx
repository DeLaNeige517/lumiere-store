"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface Dot {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  hue: number;
  pulse: number;
}

/** 轻柔漂浮的微粒场 —— 画布实现，低开销，移动端自动降密度 */
export function Particles({
  density = 0.00008,
  maxDots = 90,
  className = "",
}: {
  density?: number;
  maxDots?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let raf = 0;
    let running = true;

    const PALETTE = [
      "232, 162, 186", // blush
      "179, 160, 230", // lilac
      "131, 170, 210", // mist blue
      "224, 196, 143", // champagne
      "255, 255, 255",
    ];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        maxDots,
        Math.max(18, Math.floor(w * h * density * (isSmall ? 0.45 : 1))),
      );
      dots = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.9 + 0.5,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -(Math.random() * 0.18 + 0.04),
        alpha: Math.random() * 0.42 + 0.14,
        hue: Math.floor(Math.random() * PALETTE.length),
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        d.pulse += 0.012;
        if (d.y < -12) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }
        if (d.x < -12) d.x = w + 10;
        if (d.x > w + 12) d.x = -10;

        const shimmer = 0.72 + Math.sin(d.pulse) * 0.28;
        const alpha = d.alpha * shimmer;

        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 5);
        g.addColorStop(0, `rgba(${PALETTE[d.hue]}, ${alpha})`);
        g.addColorStop(1, `rgba(${PALETTE[d.hue]}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${PALETTE[d.hue]}, ${Math.min(1, alpha * 1.5)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 0.62, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => build();
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    build();

    if (reduce) {
      // 尊重系统「减少动态效果」：仅绘制一帧静态微粒
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        ctx.fillStyle = `rgba(${PALETTE[d.hue]}, ${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, maxDots, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
