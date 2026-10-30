import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchPanel } from "@/components/layout/SearchPanel";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { Toaster } from "@/components/layout/Toaster";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Collections } from "@/components/sections/Collections";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Inspiration } from "@/components/sections/Inspiration";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* 全局柔和背景 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF7F4_45%,#F7F3FB_78%,#F1F5F9_100%)]" />
        <div className="absolute -left-40 top-[12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(248,213,225,0.5),transparent)] blur-3xl" />
        <div className="absolute -right-32 top-[38%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(208,227,243,0.45),transparent)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(225,216,247,0.45),transparent)] blur-3xl" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <Categories />
        <Collections />
        <FeaturedProducts />
        <PromoBanner />
        <Inspiration />
        <Testimonials />
      </main>

      <Footer />

      <CartDrawer />
      <WishlistDrawer />
      <SearchPanel />
      <Toaster />
    </div>
  );
}
