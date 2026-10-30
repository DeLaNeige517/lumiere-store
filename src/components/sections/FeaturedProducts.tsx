"use client";

import { AnimatePresence, motion } from "motion/react";
import { LayoutGrid, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useStore } from "@/components/providers/StoreProvider";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/commerce/ProductCard";

const VISIBLE_LIMIT = 6;

export function FeaturedProducts() {
  const { activeCategory, setCategory, query, setQuery } = useStore();
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const byCategory =
        activeCategory === "all"
          ? true
          : activeCategory === "inspiration"
            ? Boolean(p.editorial)
            : p.category === activeCategory;
      if (!byCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, query]);

  const visible = expanded ? filtered : filtered.slice(0, VISIBLE_LIMIT);
  const hiddenCount = Math.max(0, filtered.length - VISIBLE_LIMIT);

  return (
    <section id="products" className="relative z-10 scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="Best Sellers"
          title={
            <>
              人气单品
              <span className="text-ink-300"> · </span>
              <span className="font-serif text-ink-400">Best Sellers</span>
            </>
          }
          description="被反复选择的口碑好物，每一件都经过材质、体验与耐用度的反复推敲。"
          action={
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-[12.5px] text-ink-500 backdrop-blur-xl">
              <LayoutGrid size={14} strokeWidth={1.8} />
              共 {filtered.length} 件商品
            </span>
          }
        />

        {/* 筛选条 */}
        <div className="mt-9 flex flex-wrap items-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? PRODUCTS.length
                : cat.id === "inspiration"
                  ? PRODUCTS.filter((p) => p.editorial).length
                  : PRODUCTS.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
                  active
                    ? "border-transparent bg-ink-900 text-cream-50 shadow-[0_12px_26px_-14px_rgba(36,33,44,0.8)]"
                    : "border-white/70 bg-white/50 text-ink-500 backdrop-blur-xl hover:bg-white/80 hover:text-ink-800",
                )}
              >
                {cat.name}
                <span
                  className={cn(
                    "ml-1.5 text-[11px] tabular-nums",
                    active ? "text-cream-50/60" : "text-ink-300",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {query && (
            <button
              onClick={() => setQuery("")}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-3.5 py-2 text-[12.5px] text-ink-500 transition-colors hover:text-ink-800"
            >
              清除搜索「{query}」
              <SearchX size={13} strokeWidth={1.9} />
            </button>
          )}
        </div>

        {/* 商品网格 */}
        {visible.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/80 bg-white/35 px-6 py-20 text-center backdrop-blur-xl">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] text-ink-300">
              <SearchX size={22} strokeWidth={1.6} />
            </span>
            <p className="mt-5 text-[15px] font-medium text-ink-800">
              没有找到匹配的商品
            </p>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink-400">
              试试更换分类或关键词，例如「耳机」「手表」「降噪」。
            </p>
            <button
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              className="mt-6 rounded-full border border-white/70 bg-white/70 px-5 py-2.5 text-[13px] font-medium text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
            >
              重置筛选
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {hiddenCount > 0 && (
          <div className="mt-11 flex justify-center">
            <motion.button
              onClick={() => setExpanded((v) => !v)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE_SILK }}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-6 py-3 text-[13.5px] font-medium text-ink-700 backdrop-blur-xl transition-colors duration-300 hover:bg-ink-900 hover:text-cream-50"
            >
              {expanded ? "收起" : `查看全部 ${filtered.length} 件商品`}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.35, ease: EASE_SILK }}
                className="inline-block"
              >
                ↓
              </motion.span>
            </motion.button>
          </div>
        )}

        {expanded && hiddenCount > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setExpanded(false)}
              className="text-[12.5px] text-ink-400 underline-offset-4 transition-colors hover:text-ink-700 hover:underline"
            >
              收起商品
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
