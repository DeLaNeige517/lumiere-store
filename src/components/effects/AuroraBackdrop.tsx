"use client";

import { useReducedMotion } from "motion/react";

/** 柔和的动态渐变光晕背景 */
export function AuroraBackdrop({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const blobs = [
    {
      cls: "animate-aurora-a",
      style: {
        background:
          "radial-gradient(closest-side, rgba(248,213,225,0.95), rgba(248,213,225,0))",
        width: "58vw",
        height: "58vw",
        top: "-14%",
        left: "-8%",
      },
    },
    {
      cls: "animate-aurora-b",
      style: {
        background:
          "radial-gradient(closest-side, rgba(225,216,247,0.9), rgba(225,216,247,0))",
        width: "52vw",
        height: "52vw",
        top: "4%",
        right: "-10%",
      },
    },
    {
      cls: "animate-aurora-c",
      style: {
        background:
          "radial-gradient(closest-side, rgba(208,227,243,0.88), rgba(208,227,243,0))",
        width: "62vw",
        height: "62vw",
        bottom: "-26%",
        left: "22%",
      },
    },
    {
      cls: "animate-aurora-b",
      style: {
        background:
          "radial-gradient(closest-side, rgba(240,224,189,0.75), rgba(240,224,189,0))",
        width: "38vw",
        height: "38vw",
        bottom: "-6%",
        right: "6%",
      },
    },
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF7F4_38%,#F6F1FA_72%,#EFF4F9_100%)]" />
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[60px] ${reduce ? "" : b.cls}`}
          style={b.style}
        />
      ))}
    </div>
  );
}
