"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { EASE_SILK } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";

export function Testimonials() {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="Reviews"
          align="center"
          title={
            <>
              用户评价
              <span className="text-ink-300"> · </span>
              <span className="font-serif text-ink-400">Reviews</span>
            </>
          }
          description="来自真实购物的体验反馈，也是我们下一次迭代的方向。"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_SILK, delay: i * 0.12 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-7 shadow-[0_22px_54px_-34px_rgba(120,96,150,0.55)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/72"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,rgba(202,188,240,0.55),transparent)] blur-xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <Quote
                size={30}
                strokeWidth={1.4}
                className="relative text-lilac-300"
                aria-hidden
              />

              <blockquote className="relative mt-5 flex-1 text-[14.5px] leading-[1.95] text-ink-700">
                {t.content}
              </blockquote>

              <figcaption className="relative mt-7 flex items-center gap-3.5 border-t border-white/70 pt-5">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-ink-800 shadow-[0_8px_18px_-10px_rgba(96,78,118,0.8)]"
                  style={{ background: t.accent }}
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-ink-900">{t.name}</p>
                  <p className="mt-0.5 truncate text-[12px] text-ink-400">{t.role}</p>
                </div>
                <StarRating value={t.rating} />
              </figcaption>

              <p className="relative mt-4 text-[11.5px] text-ink-300">
                已购 · {t.purchased}
              </p>
            </motion.figure>
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-ink-300">
          以上评价为演示数据，仅用于展示页面效果，不代表真实用户反馈。
        </p>
      </div>
    </section>
  );
}
