import Link from "next/link";
import { LoginCard } from "@/features/auth/components/LoginCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background w-full">
      <main className="w-full max-w-[400px]">
        {/* Brand Identity Header */}
        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">
            PUP Exchange
          </h1>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Academic Excellence Portal
          </p>
        </div>

        {/* Level 2 Card */}
        <LoginCard>
          {/* Card Content & Form */}
          <LoginForm />
        </LoginCard>

        {/* Footer / Support */}
        <footer className="mt-8 text-center space-y-4">
          <p className="font-label-sm text-label-sm text-on-tertiary-container">
            Don't have an account? <Link href="/register" className="text-primary hover:underline font-bold">Register here</Link>
          </p>
          <div className="pt-4 border-t border-outline-variant/30 text-on-tertiary-container font-label-sm text-label-sm">
            Polytechnic University of the Philippines
          </div>
          <div className="flex justify-center gap-4">
            <a
              className="font-label-sm text-label-sm text-on-tertiary-container hover:text-primary transition-colors"
              href="#"
            >
              Help Center
            </a>
            <span className="text-surface-container-highest">•</span>
            <a
              className="font-label-sm text-label-sm text-on-tertiary-container hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
