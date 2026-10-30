"use client";

import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";

export interface GlassCardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  /** 鼠标跟随高光 */
  spotlight?: boolean;
  /** 悬浮上浮幅度 */
  lift?: boolean;
  tone?: "default" | "strong" | "soft";
  radius?: "md" | "lg" | "xl" | "2xl";
}

const TONES = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
} as const;

const RADII = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
} as const;

export function GlassCard({
  children,
  className,
  spotlight = true,
  lift = true,
  tone = "default",
  radius = "xl",
  onMouseMove,
  ...props
}: GlassCardProps) {
  const track = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    onMouseMove?.(e);
  };

  return (
    <motion.div
      whileHover={lift ? { y: -8 } : undefined}
      transition={{ duration: 0.55, ease: EASE_SILK }}
      onMouseMove={track}
      className={cn(
        "group relative overflow-hidden border border-white/60",
        spotlight && "glass-card",
        TONES[tone],
        RADII[radius],
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
