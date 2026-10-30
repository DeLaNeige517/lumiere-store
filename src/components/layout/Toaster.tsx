"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Info, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { EASE_SILK } from "@/lib/motion";

export function Toaster() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[120] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2.5 sm:left-6 sm:translate-x-0">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 22, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE_SILK }}
            className="glass-strong pointer-events-auto flex items-start gap-3 rounded-xl px-4 py-3.5"
          >
            <span
              className={
                t.tone === "success"
                  ? "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush-100 text-blush-600"
                  : "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lilac-100 text-lilac-600"
              }
            >
              {t.tone === "success" ? (
                <Check size={15} strokeWidth={2.2} />
              ) : (
                <Info size={15} strokeWidth={2.2} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-ink-900">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 truncate text-[12.5px] text-ink-500">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="关闭提示"
              className="mt-0.5 text-ink-300 transition-colors hover:text-ink-600"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
