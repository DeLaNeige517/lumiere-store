"use client";

import { motion } from "motion/react";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { EASE_SILK } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
  const { setCategory, notify } = useStore();

  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE_SILK }}
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(120deg,rgba(255,255,255,0.78)_0%,rgba(252,232,239,0.72)_32%,rgba(239,233,252,0.74)_66%,rgba(230,241,249,0.76)_100%)] shadow-[0_44px_100px_-44px_rgba(120,96,150,0.55)] backdrop-blur-xl"
        >
          {/* 光斑 */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(232,162,186,0.5),transparent)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-16 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(169,201,230,0.5),transparent)] blur-2xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
            {/* 文案 */}
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_SILK, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/70 px-3.5 py-1.5 text-[11.5px] font-medium tracking-[0.16em] text-ink-600 backdrop-blur-xl"
              >
                <Gift size={13} strokeWidth={1.8} />
                LUMIÈRE GIFT SET
              </motion.span>

              <h2 className="mt-6 text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-ink-900">
                专属礼遇，
                <br />
                开启你的灵感生活
              </h2>

              <p className="mt-5 max-w-lg text-[15px] leading-[1.9] text-ink-500">
                任选两件心仪好物组合成礼盒，即享礼遇价与专属刻字服务。礼盒采用可回收
                材质制作，随订单附赠手写卡片。
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "任选两件 享 85 折",
                  "免费刻字与礼卡",
                  "顺丰包邮 7 天无理由",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-[13.5px] text-ink-600"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/80 text-blush-600 shadow-[0_4px_10px_-5px_rgba(201,111,143,0.9)]">
                      <Sparkles size={11} strokeWidth={2} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Button
                  size="lg"
                  onClick={() => {
                    setCategory("all");
                    notify("已为你精选礼遇商品", "前往人气单品查看组合推荐", "info");
                    window.setTimeout(
                      () =>
                        document
                          .getElementById("products")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
                      60,
                    );
                  }}
                >
                  立即选购
                  <ArrowRight
                    size={17}
                    strokeWidth={1.9}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
                <span className="text-[12.5px] text-ink-400">
                  礼遇活动截止至 2026 年 11 月 30 日
                </span>
              </div>
            </div>

            {/* 图 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE_SILK, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/75 bg-white/45 p-2 shadow-[0_30px_70px_-34px_rgba(120,96,150,0.55)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/promo/promo.jpg"
                  alt="Lumière 精选礼盒组合"
                  loading="lazy"
                  className="aspect-[2/1] w-full rounded-xl object-cover"
                />
              </div>

              {/* 小卡片 */}
              <div className="absolute -bottom-5 -left-3 flex items-center gap-2.5 rounded-xl border border-white/75 bg-white/75 px-4 py-3 backdrop-blur-2xl shadow-[0_18px_40px_-22px_rgba(96,78,118,0.6)] md:-left-8">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,#F9F0DC,#FCE8EF)] text-champagne-700">
                  <Gift size={15} strokeWidth={1.8} />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-ink-900">免费礼盒包装</p>
                  <p className="text-[11.5px] text-ink-400">可回收材质 · 附手写卡片</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
