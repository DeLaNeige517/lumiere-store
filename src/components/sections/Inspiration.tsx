"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import { useStore } from "@/components/providers/StoreProvider";
import { EASE_SILK } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Inspiration() {
  const { notify } = useStore();

  return (
    <section id="inspiration" className="relative z-10 scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="Journal"
          title={
            <>
              灵感生活
              <span className="text-ink-300"> · </span>
              <span className="font-serif text-ink-400">Journal</span>
            </>
          }
          description="关于城市、效率与身心状态的观察记录，读一点，再回到自己的日常。"
          action={
            <button
              onClick={() =>
                notify("灵感专栏", "演示站点暂未开放文章详情", "info")
              }
              className="group inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-5 py-2.5 text-[13.5px] font-medium text-ink-700 backdrop-blur-xl transition-all duration-300 hover:bg-ink-900 hover:text-cream-50"
            >
              查看全部文章
              <ArrowRight
                size={15}
                strokeWidth={1.9}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_SILK, delay: i * 0.12 }}
              className="group"
            >
              <button
                onClick={() =>
                  notify(`《${a.title}》`, "演示站点暂未开放文章详情", "info")
                }
                className="block h-full w-full text-left"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/70 bg-cream-100 shadow-[0_22px_54px_-34px_rgba(120,96,150,0.55)] transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_34px_74px_-30px_rgba(120,96,150,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(52,44,64,0.42)_100%)]" />

                  <span className="absolute left-3.5 top-3.5 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[10.5px] font-medium tracking-[0.12em] text-ink-700 backdrop-blur-xl">
                    {a.category}
                  </span>
                </div>

                <div className="mt-5 px-1">
                  <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-ink-900 transition-colors duration-300 group-hover:text-blush-600">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[13.5px] leading-[1.85] text-ink-500">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-[12px] text-ink-400">
                    <span>{a.date}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12.5} strokeWidth={1.8} />
                      {a.readTime}
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
