import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";

const jakarta = localFont({
  src: [
    {
      path: "../assets/fonts/PlusJakartaSans-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/PlusJakartaSans-500-latin.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/PlusJakartaSans-600-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/PlusJakartaSans-700-latin.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/PlusJakartaSans-800-latin.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
  fallback: [
    "PingFang SC",
    "HarmonyOS Sans SC",
    "Noto Sans CJK SC",
    "Microsoft YaHei",
    "system-ui",
    "sans-serif",
  ],
});

const instrument = localFont({
  src: [
    {
      path: "../assets/fonts/InstrumentSerif-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/InstrumentSerif-400i-latin.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Songti SC", "Noto Serif CJK SC", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumiere.example.com"),
  title: "Lumière 露弥尔 — 科技点亮更好的日常",
  description:
    "Lumière 以克制的设计与温柔的科技，为你的日常挑选值得长久陪伴的好物。无线耳机、智能手表、智能家居、数码配件与出行用品。",
  keywords: [
    "Lumière",
    "露弥尔",
    "无线耳机",
    "智能手表",
    "智能家居",
    "科技生活方式",
  ],
  openGraph: {
    title: "Lumière 露弥尔 — 科技点亮更好的日常",
    description:
      "以克制的设计与温柔的科技，为你的日常挑选值得长久陪伴的好物。",
    type: "website",
    locale: "zh_CN",
    images: ["/images/hero/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fffcfa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${jakarta.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-cream-50 text-ink-800">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
