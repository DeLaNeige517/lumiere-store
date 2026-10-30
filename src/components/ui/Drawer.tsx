"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { EASE_SILK } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: "right" | "left";
  width?: "md" | "lg";
}

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  side = "right",
  width = "md",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true">
          <motion.button
            aria-label="关闭"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink-900/25 backdrop-blur-[6px]"
          />
          <motion.aside
            initial={side === "right" ? { x: "100%" } : { x: "-100%" }}
            animate={side === "right" ? { x: 0 } : { x: 0 }}
            exit={side === "right" ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 0.55, ease: EASE_SILK }}
            className={cn(
              "absolute top-0 flex h-full w-full flex-col border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(253,248,243,0.94))] shadow-[0_0_80px_-20px_rgba(96,78,118,0.4)] backdrop-blur-2xl",
              side === "right" ? "right-0 border-l" : "left-0 border-r",
              width === "lg" ? "max-w-[26rem]" : "max-w-[22rem]",
            )}
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/70 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink-900">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-[13px] text-ink-400">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="关闭面板"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/70 bg-white/70 text-ink-500 transition-all duration-300 hover:rotate-90 hover:text-ink-900"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer && (
              <footer className="border-t border-white/70 px-6 py-5">{footer}</footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
