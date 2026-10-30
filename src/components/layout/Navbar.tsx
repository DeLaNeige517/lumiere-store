"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_LINKS, PRODUCTS, type NavLink } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";
import { useStore } from "@/components/providers/StoreProvider";
import { BrandMark } from "@/components/layout/BrandMark";

export function Navbar() {
  const {
    cartCount,
    wishlistCount,
    setCartOpen,
    setSearchOpen,
    setWishlistOpen,
    query,
    setQuery,
    setCategory,
    notify,
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [focusSearch, setFocusSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  /* 滚动高亮当前板块 */
  useEffect(() => {
    const ids = ["home", "collections", "products", "inspiration"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0.05, 0.3, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const matches = useMemo(() => {
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

  const suggestions = useMemo(() => matches.slice(0, 4), [matches]);

  const handleNav = (href: string, category?: NavLink["category"]) => {
    if (category) setCategory(category);
    if (href === "#products") {
      window.setTimeout(() => {
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToProducts = () => {
    setFocusSearch(false);
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_SILK, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled
            ? "border-b border-white/60 bg-white/55 backdrop-blur-[26px] backdrop-saturate-[180%] shadow-[0_12px_40px_-28px_rgba(96,78,118,0.5)]"
            : "border-b border-transparent bg-white/25 backdrop-blur-[12px] backdrop-saturate-[140%]",
        )}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-4 px-5 md:h-[76px] md:px-8">
          {/* Logo */}
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
            aria-label="Lumière 首页"
          >
            <BrandMark />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[22px] tracking-[0.01em] text-ink-900 md:text-[24px]">
                Lumière
              </span>
              <span className="mt-[3px] hidden text-[9px] font-medium tracking-[0.34em] text-ink-400 sm:block">
                露弥尔
              </span>
            </span>
          </a>

          {/* 主导航 */}
          <div className="ml-4 hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href, link.category);
                  }}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                    isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-800",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ duration: 0.5, ease: EASE_SILK }}
                      className="absolute inset-0 -z-10 rounded-full border border-white/70 bg-white/70 shadow-[0_6px_18px_-10px_rgba(96,78,118,0.5)]"
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* 搜索（桌面） */}
          <div className="ml-auto hidden w-full max-w-[240px] md:block xl:max-w-[280px]">
            <div className="relative">
              <Search
                size={15}
                strokeWidth={1.9}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocusSearch(true)}
                onBlur={() => window.setTimeout(() => setFocusSearch(false), 160)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goToProducts();
                }}
                placeholder="搜索 Lumière 商品"
                aria-label="搜索商品"
                className="h-10 w-full rounded-full border border-white/70 bg-white/55 pl-9 pr-11 text-[13px] text-ink-800 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-ink-300 focus:border-white focus:bg-white/85 focus:shadow-[0_10px_26px_-16px_rgba(96,78,118,0.6)]"
              />
              {query.trim() && (
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-2 py-0.5 text-[10.5px] font-medium tabular-nums text-ink-500">
                  {matches.length} 件
                </span>
              )}
            </div>

            <AnimatePresence>
              {focusSearch && query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: EASE_SILK }}
                  className="glass-strong absolute left-0 right-0 top-12 overflow-hidden rounded-xl p-1.5"
                >
                  {suggestions.length === 0 ? (
                    <p className="px-3 py-3 text-[13px] text-ink-400">
                      没有找到「{query}」相关的商品
                    </p>
                  ) : (
                    suggestions.map((p) => (
                      <button
                        key={p.id}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setQuery(p.name);
                          setFocusSearch(false);
                          goToProducts();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-white/70"
                      >
                        <span className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium text-ink-800">
                            {p.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-ink-400">
                            {p.subtitle}
                          </span>
                        </span>
                        <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-ink-700">
                          ¥{p.price.toLocaleString("zh-CN")}
                        </span>
                      </button>
                    ))
                  )}
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={goToProducts}
                    className="mt-1 w-full rounded-lg bg-white/60 px-3 py-2 text-[12.5px] font-medium text-ink-600 transition-colors hover:bg-white/90 hover:text-ink-900"
                  >
                    查看全部搜索结果
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 操作图标 */}
          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <IconButton
              label="搜索"
              onClick={() => setSearchOpen(true)}
              className="md:hidden"
            >
              <Search size={17} strokeWidth={1.8} />
            </IconButton>

            <IconButton
              label="账户"
              onClick={() =>
                notify("账户中心", "演示环境暂未接入登录体系", "info")
              }
              className="hidden sm:grid"
            >
              <UserRound size={17} strokeWidth={1.8} />
            </IconButton>

            <IconButton
              label="收藏夹"
              onClick={() => {
                setSearchOpen(false);
                setCartOpen(false);
                setWishlistOpen(true);
              }}
              badge={wishlistCount}
            >
              <Heart size={17} strokeWidth={1.8} />
            </IconButton>

            <IconButton label="购物车" onClick={() => setCartOpen(true)} badge={cartCount}>
              <ShoppingBag size={17} strokeWidth={1.8} />
            </IconButton>

            <IconButton
              label="菜单"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu size={18} strokeWidth={1.8} />
            </IconButton>
          </div>
        </nav>
      </motion.header>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] bg-ink-900/20 backdrop-blur-md lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: EASE_SILK }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-[22rem] flex-col border-l border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(250,244,246,0.95))] p-6 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-[22px] text-ink-900">Lumière</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="关闭菜单"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/70 text-ink-500"
                >
                  <X size={16} strokeWidth={1.9} />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      handleNav(link.href, link.category);
                    }}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE_SILK }}
                    className="group flex items-center justify-between border-b border-white/60 py-4 text-[17px] font-medium text-ink-800"
                  >
                    {link.label}
                    <span className="text-ink-300 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex h-12 w-full items-center gap-3 rounded-full border border-white/70 bg-white/70 px-5 text-[14px] text-ink-400"
                >
                  <Search size={16} strokeWidth={1.9} />
                  搜索 Lumière 商品
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-[14px] font-medium text-cream-50"
                >
                  <ShoppingBag size={16} strokeWidth={1.9} />
                  查看购物车
                  {cartCount > 0 && (
                    <span className="rounded-full bg-blush-300 px-2 py-0.5 text-[11px] font-semibold text-ink-900">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */

function IconButton({
  label,
  children,
  badge,
  onClick,
  className,
}: {
  label: string;
  children: React.ReactNode;
  badge?: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full border border-transparent text-ink-600 transition-all duration-300 hover:border-white/70 hover:bg-white/70 hover:text-ink-900",
        className,
      )}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[linear-gradient(135deg,#F1BCCD,#CABCF0)] px-1 text-[10px] font-bold tabular-nums text-ink-900 shadow-[0_4px_10px_-4px_rgba(150,116,170,0.9)]">
          {badge}
        </span>
      )}
    </button>
  );
}

export function NavBrandHint() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.3em] text-ink-400">
      <Sparkles size={12} strokeWidth={1.6} />
      LUMIÈRE
    </span>
  );
}
