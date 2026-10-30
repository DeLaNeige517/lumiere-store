"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, BatteryCharging, Sparkles, Waves } from "lucide-react";
import { useRef } from "react";
import { AuroraBackdrop } from "@/components/effects/AuroraBackdrop";
import { Particles } from "@/components/effects/Particles";
import { LinkButton } from "@/components/ui/Button";
import { STATS } from "@/lib/data";
import { EASE_SILK } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.96]);
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const haloY = useTransform(spring, [0, 1], [0, -40]);
  const visualY = useTransform(spring, [0, 1], [0, -60]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-24 md:pb-28 md:pt-32"
    >
      <AuroraBackdrop />
      <Particles density={0.000075} maxDots={80} className="opacity-90" />

      {/* 柔光晕 */}
      <motion.div
        aria-hidden
        style={{ y: haloY }}
        className="pointer-events-none absolute left-1/2 top-[12%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),transparent)] blur-[40px]"
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10"
      >
        {/* ---------------- 左侧文案 ---------------- */}
        <div className="relative z-10 max-w-[36rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_SILK, delay: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 backdrop-blur-xl"
          >
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-blush-400" />
              <span className="animate-pulse-ring absolute h-1.5 w-1.5 rounded-full bg-blush-400" />
            </span>
            <span className="text-[11.5px] font-medium tracking-[0.18em] text-ink-500">
              2026 秋季系列 · 全新上市
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: EASE_SILK, delay: 0.36 }}
            className="mt-6 text-[clamp(2.6rem,7.4vw,4.9rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink-900"
          >
            <span className="text-aurora">科技点亮</span>
            <br />
            更好的日常
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_SILK, delay: 0.48 }}
            className="mt-5 max-w-[30rem] text-[15.5px] leading-[1.9] text-ink-500 md:text-[17px]"
          >
            Lumière 以克制的设计与温柔的科技，为你的日常挑选值得长久陪伴的好物。
            从通勤降噪到居家光影，让每一次使用都成为恰如其分的惊喜。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE_SILK, delay: 0.6 }}
            className="mt-7 flex flex-wrap items-center gap-3.5 md:mt-9"
          >
            <LinkButton href="#products" size="lg">
              立即选购
              <ArrowRight size={17} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton href="#collections" variant="glass" size="lg">
              探索精选系列
            </LinkButton>
          </motion.div>

          {/* 数据 */}
          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_SILK, delay: 0.72 }}
            className="mt-8 grid max-w-[30rem] grid-cols-3 gap-3 md:mt-12"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/60 bg-white/45 px-3.5 py-3 backdrop-blur-xl"
              >
                <dt className="text-[19px] font-semibold tabular-nums tracking-[-0.02em] text-ink-900">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-[11.5px] leading-tight text-ink-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------------- 右侧主视觉 ---------------- */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_SILK, delay: 0.4 }}
            style={{ y: visualY }}
            className="relative"
          >
            {/* 光晕 */}
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(232,162,186,0.35),transparent_72%)] blur-2xl"
            />

            {/* 产品图 */}
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(252,240,246,0.62))] shadow-[0_50px_110px_-40px_rgba(120,96,150,0.5)] backdrop-blur-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero/hero.jpg"
                alt="Lumière Air Pro 无线耳机"
                className="aspect-[4/3.4] w-full scale-[1.02] object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.07]"
                width={1536}
                height={1152}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,rgba(255,255,255,0.28)_0%,transparent_42%,rgba(255,255,255,0.12)_100%)]" />

              {/* 图内标签 */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/70 py-1.5 pl-2.5 pr-4 backdrop-blur-xl md:left-5 md:top-5">
                <span className="rounded-full bg-[linear-gradient(135deg,#FCE8EF,#EFE9FC)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-ink-700">
                  本季主打
                </span>
                <span className="text-[12.5px] font-medium text-ink-800">
                  Air Pro 无线耳机
                </span>
              </div>

              <div className="absolute right-4 top-4 md:right-5 md:top-5">
                <LinkButton
                  href="#products"
                  size="sm"
                  className="h-9 w-9 px-0"
                  aria-label="查看 Air Pro 无线耳机"
                >
                  <ArrowRight size={15} strokeWidth={2} />
                </LinkButton>
              </div>
            </div>

            {/* 浮动玻璃卡片 */}
            <motion.div
              initial={{ opacity: 0, x: -26, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, ease: EASE_SILK, delay: 0.95 }}
              className="absolute -left-4 top-[16%] hidden md:block lg:-left-10"
            >
              <FloatingChip icon={<Waves size={15} strokeWidth={1.8} />} label="降噪" value="-42dB" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 26, y: -14 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, ease: EASE_SILK, delay: 1.1 }}
              className="absolute -right-4 top-[30%] hidden md:block lg:-right-8"
            >
              <FloatingChip
                icon={<BatteryCharging size={15} strokeWidth={1.8} />}
                label="续航"
                value="32h"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_SILK, delay: 1.24 }}
              className="absolute -bottom-7 left-4 right-4 md:-bottom-8 md:left-8 md:right-8"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-white/75 bg-white/72 px-4 py-3 backdrop-blur-2xl shadow-[0_26px_56px_-26px_rgba(96,78,118,0.6)]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] text-lilac-600">
                  <Sparkles size={16} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink-900">
                    Air Pro · 月白限定
                  </p>
                  <p className="truncate text-[12px] text-ink-400">
                    现已可预订 · 预计 3 个工作日内发出
                  </p>
                </div>
                <span className="shrink-0 text-[15px] font-semibold tabular-nums tracking-[-0.02em] text-ink-900">
                  ¥1,299
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.a
        href="#collections"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-300 transition-colors duration-300 hover:text-ink-500 md:flex"
        aria-label="向下滚动"
      >
        <span className="text-[10px] font-medium tracking-[0.3em]">SCROLL</span>
        <span className="relative h-9 w-[22px] rounded-full border border-ink-300/50">
          <motion.span
            animate={{ y: [5, 18, 5], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink-300"
          />
        </span>
      </motion.a>
    </section>
  );
}

function FloatingChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/75 bg-white/70 px-4 py-3 backdrop-blur-2xl shadow-[0_20px_44px_-22px_rgba(96,78,118,0.6)]">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] text-lilac-600">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-[10.5px] tracking-[0.12em] text-ink-400">{label}</p>
        <p className="text-[15px] font-semibold tabular-nums tracking-[-0.01em] text-ink-900">
          {value}
        </p>
      </div>
    </div>
  );
}
