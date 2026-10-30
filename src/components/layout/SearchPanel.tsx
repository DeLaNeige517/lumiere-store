"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useStore } from "@/components/providers/StoreProvider";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

export function SearchPanel() {
  const { searchOpen, setSearchOpen, query, setQuery, setCategory, notify } =
    useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  const goTo = (id: string) => {
    setSearchOpen(false);
    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-ink-900/20 p-4 backdrop-blur-md md:p-10"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_SILK }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong mx-auto max-w-3xl overflow-hidden rounded-2xl"
          >
            {/* 输入区 */}
            <div className="flex items-center gap-3 border-b border-white/70 px-5 py-4">
              <Search size={18} strokeWidth={1.8} className="text-ink-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) goTo("products");
                }}
                placeholder="搜索耳机、手表、智能家居…"
                aria-label="搜索商品"
                className="h-9 flex-1 bg-transparent text-[15px] text-ink-900 outline-none placeholder:text-ink-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="清空"
                  className="grid h-7 w-7 place-items-center rounded-full text-ink-300 transition-colors hover:bg-white/70 hover:text-ink-700"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="关闭搜索"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/70 bg-white/70 text-ink-500 transition-all duration-300 hover:rotate-90 hover:text-ink-900"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>

            {/* 分类快捷 */}
            <div className="flex flex-wrap gap-2 px-5 pt-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    goTo("products");
                  }}
                  className="rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-[12.5px] text-ink-600 transition-colors hover:bg-white/90 hover:text-ink-900"
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* 结果 */}
            <div className="px-5 py-5">
              {!query.trim() ? (
                <div className="py-6 text-center">
                  <p className="text-[13.5px] text-ink-400">
                    输入关键词，或直接选择一个分类开始探索
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {["降噪", "耳机", "手表", "充电", "氛围灯"].map((k) => (
                      <button
                        key={k}
                        onClick={() => setQuery(k)}
                        className="rounded-full bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] px-4 py-2 text-[13px] text-ink-700 transition-transform duration-300 hover:scale-105"
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] text-ink-300">
                    <SearchX size={22} strokeWidth={1.6} />
                  </span>
                  <p className="mt-4 text-[14.5px] font-medium text-ink-800">
                    没有找到「{query}」
                  </p>
                  <p className="mt-1.5 text-[13px] text-ink-400">
                    换一个关键词试试，例如「降噪」或「手表」
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-3 text-[12.5px] text-ink-400">
                    找到 {results.length} 件相关商品
                  </p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {results.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => {
                            setQuery(p.name);
                            goTo("products");
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl border border-white/70 bg-white/55 p-2.5 text-left transition-all duration-300 hover:bg-white/90",
                          )}
                        >
                          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13.5px] font-medium text-ink-900">
                              {p.name}
                            </span>
                            <span className="mt-0.5 flex items-center gap-2">
                              <StarRating value={p.rating} size={12} />
                              <span className="text-[11.5px] text-ink-400">
                                {p.subtitle}
                              </span>
                            </span>
                          </span>
                          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink-800">
                            {formatPrice(p.price)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      notify("搜索完成", `共 ${results.length} 件匹配商品`, "info");
                      goTo("products");
                    }}
                    className="mt-5 w-full rounded-full bg-ink-900 py-3 text-[13.5px] font-medium text-cream-50 transition-colors hover:bg-ink-800"
                  >
                    在商品列表中查看全部结果
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
