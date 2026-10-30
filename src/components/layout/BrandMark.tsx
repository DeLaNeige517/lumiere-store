"use client";

export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <span
      className="relative grid place-items-center rounded-[10px] border border-white/70 bg-[linear-gradient(140deg,#FCE8EF_0%,#EFE9FC_52%,#E6F1F9_100%)] shadow-[0_8px_20px_-12px_rgba(120,100,150,0.7)]"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2.6c1.9 3.1 4.6 4.7 4.6 8.2 0 2.6-2 4.6-4.6 4.6s-4.6-2-4.6-4.6c0-3.5 2.7-5.1 4.6-8.2Z"
          fill="url(#lm-grad)"
        />
        <circle
          cx="12"
          cy="19.2"
          r="2.2"
          fill="url(#lm-grad)"
          opacity="0.55"
        />
        <defs>
          <linearGradient
            id="lm-grad"
            x1="6"
            y1="2"
            x2="19"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E8A2BA" />
            <stop offset="0.52" stopColor="#B3A0E6" />
            <stop offset="1" stopColor="#83AAD2" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
