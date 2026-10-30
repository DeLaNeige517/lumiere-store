"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/data";
import { useStore } from "@/components/providers/StoreProvider";
import { EASE_SILK } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Collections() {
  const { setCategory, notify } = useStore();

  return (
    <section id="collections" className="relative z-10 scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="Curated Collections"
          title={
            <>
              精选系列
              <span className="text-ink-300"> · </span>
              <span className="font-serif text-ink-400">Collections</span>
            </>
          }
          description="四个被精心策划的生活场景，为不同的日常时刻准备好合适的科技伙伴。"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {COLLECTIONS.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_SILK, delay: i * 0.1 }}
              className="group relative"
            >
              <button
                onClick={() => {
                  setCategory("inspiration");
                  notify("已打开系列", `正在浏览「${c.title}」`, "info");
                  window.setTimeout(
                    () =>
                      document
                        .getElementById("products")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
                    60,
                  );
                }}
                className="block w-full text-left"
                aria-label={`查看${c.title}系列`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/70 bg-cream-100 shadow-[0_24px_60px_-34px_rgba(120,96,150,0.55)] transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_36px_80px_-32px_rgba(120,96,150,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_46%,rgba(48,40,60,0.52)_100%)]" />

                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-white/45 bg-white/30 p-3.5 backdrop-blur-2xl">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/85">
                        {c.subtitle}
                      </p>
                      <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.01em] text-white">
                        {c.title}
                      </h3>
                    </div>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/55 bg-white/25 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-white/45">
                      <ArrowUpRight size={15} strokeWidth={1.9} />
                    </span>
                  </div>
                </div>
              </button>

              <div className="mt-4 px-1">
                <p className="text-[13px] leading-[1.85] text-ink-500">
                  {c.description}
                </p>
                <p className="mt-2 text-[11.5px] text-ink-400">
                  {c.count} 件精选单品
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
