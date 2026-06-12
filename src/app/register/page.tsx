import Link from "next/link";
import { LoginCard } from "@/features/auth/components/LoginCard";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background w-full">
      <main className="w-full max-w-[500px]">
        {/* Brand Identity Header */}
        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">
            PUP Exchange
          </h1>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Student Registration Portal
          </p>
        </div>

        <LoginCard>
          <RegisterForm />
        </LoginCard>

        {/* Footer / Support */}
        <footer className="mt-8 text-center space-y-4">
          <p className="font-label-sm text-label-sm text-on-tertiary-container">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Log in here</Link>
          </p>
          <div className="pt-4 border-t border-outline-variant/30 text-on-tertiary-container font-label-sm text-label-sm">
            Polytechnic University of the Philippines
          </div>
        </footer>
      </main>
    </div>
  );
}
