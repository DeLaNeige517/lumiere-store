"use client";

import { motion } from "motion/react";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";
import { StarRating } from "@/components/ui/StarRating";
import { useStore } from "@/components/providers/StoreProvider";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, toggleWishlist, isWishlisted, setCategory } = useStore();
  const saved = isWishlisted(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_SILK, delay: Math.min(index, 5) * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-[0_20px_52px_-32px_rgba(120,96,150,0.55)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white hover:bg-white/70 hover:shadow-[0_34px_76px_-32px_rgba(120,96,150,0.6)]"
    >
      {/* 高光 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), rgba(255,255,255,0.72), transparent 60%)",
        }}
        onMouseMove={(e) => {
          const el = e.currentTarget;
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }}
      />

      {/* 图片区 */}
      <div className="relative aspect-[4/3.4] overflow-hidden bg-[linear-gradient(150deg,#FDF6F8,#F4F0FB)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.08]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,transparent_45%,rgba(255,255,255,0.5)_100%)]" />

        {/* 标签 */}
        <div className="absolute left-3.5 top-3.5 z-20 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[10.5px] font-medium tracking-[0.06em] text-ink-700 shadow-[0_6px_16px_-8px_rgba(96,78,118,0.6)] backdrop-blur-xl"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 收藏 */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `取消收藏 ${product.name}` : `收藏 ${product.name}`}
          aria-pressed={saved}
          className={cn(
            "absolute right-3.5 top-3.5 z-20 grid h-9 w-9 place-items-center rounded-full border transition-all duration-300",
            saved
              ? "border-white/80 bg-blush-200/90 text-blush-600 shadow-[0_8px_20px_-8px_rgba(201,111,143,0.8)]"
              : "border-white/70 bg-white/70 text-ink-400 backdrop-blur-xl hover:scale-110 hover:text-blush-600",
          )}
        >
          <Heart
            size={16}
            strokeWidth={1.8}
            className={cn("transition-transform", saved && "fill-blush-500")}
          />
        </button>

        {/* 快捷加入 —— 仅淡入，不位移，避免点击热区漂移 */}
        <div className="pointer-events-none absolute inset-x-3.5 bottom-3.5 z-20 scale-[0.98] opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 focus-within:pointer-events-auto focus-within:scale-100 focus-within:opacity-100 max-md:pointer-events-auto max-md:scale-100 max-md:opacity-100">
          <button
            onClick={() => addToCart(product)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/70 bg-white/85 text-[13px] font-medium text-ink-900 shadow-[0_14px_30px_-14px_rgba(96,78,118,0.6)] backdrop-blur-xl transition-colors duration-300 hover:bg-ink-900 hover:text-cream-50"
          >
            <ShoppingBag size={15} strokeWidth={1.9} />
            加入购物车
          </button>
        </div>
      </div>

      {/* 信息区 */}
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCategory(product.category)}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400 transition-colors hover:text-ink-700"
          >
            {product.subtitle}
          </button>
          <StarRating value={product.rating} showValue />
        </div>

        <h3 className="mt-2 text-[16.5px] font-semibold leading-snug tracking-[-0.012em] text-ink-900">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.75] text-ink-500">
          {product.description}
        </p>

        {/* 颜色 */}
        <div className="mt-4 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3.5 w-3.5 rounded-full border border-white shadow-[0_1px_4px_rgba(96,78,118,0.35)]"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/70 pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-semibold tabular-nums tracking-[-0.02em] text-ink-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[12.5px] tabular-nums text-ink-300 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[11.5px] text-ink-400">
              {product.reviews.toLocaleString("zh-CN")} 条评价
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            aria-label={`将 ${product.name} 加入购物车`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/70 bg-white/70 text-ink-700 transition-all duration-300 hover:border-transparent hover:bg-ink-900 hover:text-cream-50"
          >
            <Plus size={17} strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
