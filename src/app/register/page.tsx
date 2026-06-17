import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Landmark, ArrowLeft } from "lucide-react";
import { RedirectIfAuthenticated } from "@/components/auth/RedirectIfAuthenticated";

export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex w-full bg-surface">
        {/* Left Pane - Brand / Context */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-primary p-12 text-on-primary relative overflow-hidden shrink-0">
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-16 font-label-md">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 mb-8 shadow-sm">
            <Landmark className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display-md text-display-md font-bold mb-6 text-white leading-tight tracking-tight">
            Begin Your Academic <br /> Exchange Journey
          </h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-md leading-relaxed">
            Join a global community of scholars. Create your official student dossier to apply for international exchange programs and broaden your academic horizons.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 text-white/60 font-label-sm">
          &copy; {new Date().getFullYear()} Polytechnic University of the Philippines
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex-1 flex flex-col min-h-screen h-screen overflow-y-auto bg-surface">
        <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-24 max-w-4xl mx-auto w-full">
          {/* Mobile Header */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 font-label-md">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Landmark className="w-8 h-8 text-primary" />
              <h1 className="font-headline-md text-headline-md font-bold text-primary">SintaLink</h1>
            </div>
            <p className="font-body-md text-on-surface-variant">Create your student account.</p>
          </div>

          <div className="mb-10 lg:mb-14">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2 hidden lg:block tracking-tight">
              Create an Account
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Please provide your official university details below to register your dossier.
            </p>
          </div>

          <RegisterForm />

          <footer className="mt-16 pt-8 border-t border-outline-variant/30 text-center lg:text-left pb-8">
            <p className="font-label-md text-on-surface-variant">
              Already have an account? <Link href="/login" className="text-primary hover:underline font-bold ml-1">Log in here</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
    </RedirectIfAuthenticated>
  );
}
