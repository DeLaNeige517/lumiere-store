"use client";

import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";

type Variant = "primary" | "glass" | "solid" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "text-ink-900 bg-[linear-gradient(135deg,#FFF7F9_0%,#FBDDE8_34%,#E7DDFA_68%,#D9EAF8_100%)] shadow-[0_14px_34px_-14px_rgba(150,116,170,0.55)] hover:shadow-[0_20px_46px_-16px_rgba(150,116,170,0.65)]",
  glass:
    "text-ink-800 glass hover:bg-white/75 shadow-[0_10px_28px_-16px_rgba(120,100,150,0.4)]",
  solid:
    "text-cream-50 bg-ink-900 hover:bg-ink-800 shadow-[0_14px_30px_-16px_rgba(36,33,44,0.7)]",
  ghost:
    "text-ink-700 hover:text-ink-900 hover:bg-white/60",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-full gap-1.5",
  md: "h-11 px-6 text-sm rounded-full gap-2",
  lg: "h-[52px] px-8 text-[15px] rounded-full gap-2.5",
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: EASE_SILK }}
      className={cn(
        "group relative inline-flex select-none items-center justify-center overflow-hidden border border-white/60 font-medium tracking-[0.01em] transition-colors duration-300",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {/* 高光扫过 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.75),transparent)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export interface LinkButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: EASE_SILK }}
      className={cn(
        "group relative inline-flex select-none items-center justify-center overflow-hidden border border-white/60 font-medium tracking-[0.01em] transition-colors duration-300",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.a>)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.75),transparent)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
