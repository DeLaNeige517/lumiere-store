"use client";

import { motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartCount,
    cartTotal,
    increment,
    decrement,
    removeFromCart,
    notify,
  } = useStore();

  const freeShippingGap = Math.max(0, 999 - cartTotal);
  const progress = Math.min(100, (cartTotal / 999) * 100);

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title="购物车"
      subtitle={cartCount > 0 ? `共 ${cartCount} 件商品` : "购物车还是空的"}
      footer={
        cart.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[13.5px] text-ink-500">
                <span>商品小计</span>
                <span className="font-semibold tabular-nums text-ink-900">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[13.5px] text-ink-500">
                <span>配送</span>
                <span className="text-ink-700">顺丰包邮</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/70 pt-3 text-[15px] font-semibold text-ink-900">
                <span>合计</span>
                <span className="tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() =>
                notify("演示环境", "支付系统未接入，购物车交互到此为止", "info")
              }
            >
              去结算
            </Button>
            <p className="text-center text-[11.5px] text-ink-400">
              演示站点 · 无真实交易
            </p>
          </div>
        ) : null
      }
    >
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] text-ink-300">
            <ShoppingBag size={24} strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-[15px] font-medium text-ink-800">
            购物车还是空的
          </p>
          <p className="mt-2 max-w-[15rem] text-[13px] leading-relaxed text-ink-400">
            去「人气单品」看看，也许会遇见让你心动的科技好物。
          </p>
          <Button
            variant="glass"
            className="mt-6"
            onClick={() => {
              setCartOpen(false);
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            去逛逛
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 免运提示 */}
          <div className="rounded-xl border border-white/70 bg-white/55 p-4">
            <p className="text-[12.5px] text-ink-600">
              {freeShippingGap > 0 ? (
                <>
                  再选购{" "}
                  <span className="font-semibold tabular-nums text-ink-900">
                    {formatPrice(freeShippingGap)}
                  </span>{" "}
                  即可免运费
                </>
              ) : (
                "已满足免运费条件，放心选购"
              )}
            </p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/80">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#F1BCCD,#CABCF0,#A9C9E6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* 商品列表 */}
          <ul className="space-y-3">
            {cart.map((item) => (
              <motion.li
                key={item.product.id}
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
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </span>

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-[13.5px] font-medium text-ink-900">
                    {item.product.name}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-ink-400">
                    {item.product.subtitle}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/70 p-0.5">
                      <button
                        onClick={() => decrement(item.product.id)}
                        aria-label="减少数量"
                        className="grid h-6 w-6 place-items-center rounded-full text-ink-500 transition-colors hover:bg-white hover:text-ink-900"
                      >
                        <Minus size={12} strokeWidth={2.2} />
                      </button>
                      <span className="w-5 text-center text-[12.5px] font-medium tabular-nums text-ink-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.product.id)}
                        aria-label="增加数量"
                        className="grid h-6 w-6 place-items-center rounded-full text-ink-500 transition-colors hover:bg-white hover:text-ink-900"
                      >
                        <Plus size={12} strokeWidth={2.2} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold tabular-nums text-ink-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`移除 ${item.product.name}`}
                        className="grid h-7 w-7 place-items-center rounded-full text-ink-300 transition-colors hover:bg-blush-100 hover:text-blush-600"
                      >
                        <Trash2 size={14} strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
