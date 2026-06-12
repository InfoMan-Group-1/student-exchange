import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { FeaturesGrid } from "@/features/landing/components/FeaturesGrid";
import { CtaSection } from "@/features/landing/components/CtaSection";

export default function Home() {
  return (
    <div className="bg-background font-body-md text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesGrid />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
