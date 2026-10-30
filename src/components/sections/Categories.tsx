"use client";

import { motion } from "motion/react";
import {
  Grid2x2,
  Headphones,
  Lamp,
  Plane,
  Sparkles,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useStore } from "@/components/providers/StoreProvider";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";

const ICONS: Record<string, LucideIcon> = {
  grid: Grid2x2,
  watch: Watch,
  headphones: Headphones,
  lamp: Lamp,
  plane: Plane,
  sparkles: Sparkles,
};

export function Categories() {
  const { activeCategory, setCategory, notify } = useStore();

  const handleSelect = (id: (typeof CATEGORIES)[number]["id"]) => {
    setCategory(id);
    const label = CATEGORIES.find((c) => c.id === id)?.name ?? "";
    notify("已切换分类", `正在浏览「${label}」`, "info");
    window.setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <section className="relative z-10 mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(232,162,186,0.5),rgba(179,160,230,0.5),transparent)]" />
        <span className="text-[11px] font-medium tracking-[0.34em] text-ink-400">
          按分类探索
        </span>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(232,162,186,0.5),rgba(179,160,230,0.5),transparent)]" />
      </div>

      <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.icon];
          const active = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: EASE_SILK, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "group relative w-[168px] shrink-0 snap-start overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-500 md:w-auto",
                active
                  ? "border-white bg-white/80 shadow-[0_22px_50px_-26px_rgba(120,96,150,0.55)]"
                  : "border-white/60 bg-white/45 shadow-[0_14px_34px_-26px_rgba(120,96,150,0.45)] hover:bg-white/70",
              )}
            >
              {/* 背景色块 */}
              <span
                aria-hidden
                className={cn(
                  "absolute -right-8 -top-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-55 blur-2xl transition-opacity duration-500",
                  cat.accent,
                  active ? "opacity-90" : "group-hover:opacity-85",
                )}
              />

              <span
                className={cn(
                  "relative grid h-11 w-11 place-items-center rounded-xl border border-white/75 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                  cat.accent,
                )}
              >
                <Icon size={19} strokeWidth={1.7} className="text-ink-800/80" />
              </span>

              <p className="relative mt-4 text-[14.5px] font-semibold tracking-[-0.01em] text-ink-900">
                {cat.name}
              </p>
              <p className="relative mt-1 text-[11.5px] text-ink-400">{cat.caption}</p>

              <span
                className={cn(
                  "absolute inset-x-4 bottom-3 h-px origin-left transition-transform duration-500",
                  active
                    ? "scale-x-100 bg-[linear-gradient(90deg,rgba(232,162,186,0.9),rgba(179,160,230,0.9))]"
                    : "scale-x-0 bg-[linear-gradient(90deg,rgba(232,162,186,0.9),rgba(179,160,230,0.9))] group-hover:scale-x-100",
                )}
              />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
