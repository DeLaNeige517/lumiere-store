"use client";

import { motion } from "motion/react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function WishlistDrawer() {
  const {
    wishlistOpen,
    setWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setCartOpen,
  } = useStore();

  const items = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <Drawer
      open={wishlistOpen}
      onClose={() => setWishlistOpen(false)}
      title="我的收藏"
      subtitle={items.length > 0 ? `已收藏 ${items.length} 件商品` : "收藏你喜欢的商品"}
      footer={
        items.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[13.5px] text-ink-500">
              <span>收藏商品合计</span>
              <span className="font-semibold tabular-nums text-ink-900">
                {formatPrice(total)}
              </span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                items.forEach((p) => addToCart(p));
                setWishlistOpen(false);
                setCartOpen(true);
              }}
            >
              <ShoppingBag size={16} strokeWidth={1.9} />
              全部加入购物车
            </Button>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#FCE8EF,#EFE9FC)] text-ink-300">
            <Heart size={24} strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[15px] font-medium text-ink-800">
            还没有收藏商品
          </p>
          <p className="mt-2 max-w-[15rem] text-[13px] leading-relaxed text-ink-400">
            在商品卡片右上角点一下心形，就能把它留在这里慢慢考虑。
          </p>
          <Button
            variant="glass"
            className="mt-6"
            onClick={() => {
              setWishlistOpen(false);
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            去挑点好物
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-3.5 rounded-xl border border-white/70 bg-white/60 p-3"
            >
              <span className="h-[74px] w-[74px] shrink-0 overflow-hidden rounded-lg bg-cream-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </span>

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-[13.5px] font-medium text-ink-900">
                  {p.name}
                </p>
                <p className="mt-0.5 truncate text-[11.5px] text-ink-400">
                  {p.subtitle}
                </p>
                <span className="mt-1 text-[13.5px] font-semibold tabular-nums text-ink-900">
                  {formatPrice(p.price)}
                </span>

                <div className="mt-auto flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      addToCart(p);
                      toggleWishlist(p.id);
                    }}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink-900 px-3.5 text-[12px] font-medium text-cream-50 transition-colors duration-300 hover:bg-ink-800"
                  >
                    <ShoppingBag size={13} strokeWidth={1.9} />
                    加入购物车
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    aria-label={`取消收藏 ${p.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full text-ink-300 transition-colors hover:bg-blush-100 hover:text-blush-600"
                  >
                    <Trash2 size={14} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
