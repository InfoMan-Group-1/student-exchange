import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden pt-24 pb-32 px-container-padding">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container mb-8 animate-in fade-in duration-700">
          <GraduationCap className="h-[18px] w-[18px]" />
          <span className="font-label-md text-label-md">Empowering Global Scholars</span>
        </div>
        <h2 className="font-display-lg text-display-lg text-on-surface mb-stack-md leading-tight tracking-tight">
          Student Exchange Program
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg leading-relaxed">
          Expand your academic horizons and cultural understanding through our
          world-class exchange initiatives. Connect with prestigious partner
          institutions across the globe.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/login"
            className="bg-primary-container text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
          >
            Student Login
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="border-2 border-primary-container text-primary-container px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-primary-container/5 transition-all duration-300"
          >
            Staff Login
          </Link>
        </div>
      </div>
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
