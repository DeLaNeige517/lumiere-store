"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, Mail, MessageCircle, Music2, Video } from "lucide-react";
import { useState } from "react";
import { BRAND, FOOTER_COLUMNS, SOCIALS } from "@/lib/data";
import { useStore } from "@/components/providers/StoreProvider";
import { BrandMark } from "@/components/layout/BrandMark";
import { EASE_SILK } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = [MessageCircle, Video, Music2, MessageCircle];

export function Footer() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      notify("请输入有效的邮箱地址", "我们需要一个可以送达的邮箱", "info");
      return;
    }
    setSubscribed(true);
    notify("订阅成功", "欢迎来到 Lumière 灵感邮件", "success");
  };

  return (
    <footer className="relative z-10 mt-6 overflow-hidden border-t border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(252,240,246,0.5))] backdrop-blur-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(225,216,247,0.5),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        {/* 邮件订阅 */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE_SILK }}
          className="glass mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl px-7 py-9 text-center md:px-10"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,#FCE8EF,#E6F1F9)] text-lilac-600">
            <Mail size={19} strokeWidth={1.7} />
          </span>
          <div>
            <h3 className="text-[20px] font-semibold tracking-[-0.015em] text-ink-900">
              订阅 Lumière 灵感邮件
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
              每月一封，分享新品、灵感与生活提案。不打扰，只在值得的时候出现。
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2.5 rounded-full border border-white/75 bg-white/70 px-5 py-3 text-[13.5px] text-ink-700">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-blush-100 text-blush-600">
                <Check size={13} strokeWidth={2.4} />
              </span>
              已订阅成功，期待与你在下一封邮件里见面
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="邮箱地址"
                className="h-12 flex-1 rounded-full border border-white/75 bg-white/70 px-5 text-[13.5px] text-ink-800 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-ink-300 focus:bg-white/90 focus:shadow-[0_12px_28px_-16px_rgba(96,78,118,0.7)]"
              />
              <button
                type="submit"
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink-900 px-7 text-[13.5px] font-medium text-cream-50 transition-all duration-300 hover:bg-ink-800"
              >
                订阅
                <ArrowRight
                  size={15}
                  strokeWidth={1.9}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          )}
        </motion.div>

        {/* 主体 */}
        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
          {/* 品牌 */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <BrandMark size={34} />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[24px] text-ink-900">Lumière</span>
                <span className="mt-1 text-[10px] font-medium tracking-[0.3em] text-ink-400">
                  露弥尔
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.95] text-ink-500">
              {BRAND.description}
            </p>
            <p className="mt-4 font-serif text-[17px] italic text-ink-400">
              {BRAND.taglineEn}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {SOCIALS.map((s, i) => {
                const Icon = SOCIAL_ICONS[i];
                return (
                  <button
                    key={s.label}
                    onClick={() =>
                      notify(s.label, `演示站点暂未开放 ${s.handle}`, "info")
                    }
                    aria-label={s.label}
                    title={`${s.label} ${s.handle}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/55 text-ink-500 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/85 hover:text-ink-900"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 链接列 */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13.5px] font-semibold text-ink-900">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() =>
                        notify(link, "演示站点暂未开放该页面", "info")
                      }
                      className={cn(
                        "group inline-flex items-center gap-1.5 text-[13px] text-ink-500 transition-colors duration-300 hover:text-ink-900",
                      )}
                    >
                      <span className="h-px w-0 bg-blush-300 transition-all duration-300 group-hover:w-3" />
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/70 pt-7 md:flex-row">
          <p className="text-[12px] text-ink-400">
            © 2026 Lumière 露弥尔 · 保留所有权利
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["隐私政策", "服务条款", "Cookie 设置", "网站地图"].map((l) => (
              <button
                key={l}
                onClick={() => notify(l, "演示站点暂未开放该页面", "info")}
                className="text-[12px] text-ink-400 transition-colors hover:text-ink-700"
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-[11.5px] text-ink-300">
            本站为演示站点，所有商品与评价均为模拟数据
          </p>
        </div>
      </div>
    </footer>
  );
}
