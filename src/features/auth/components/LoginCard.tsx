import { ReactNode } from "react";

interface LoginCardProps {
  children: ReactNode;
}

export function LoginCard({ children }: LoginCardProps) {
  return (
    <div className="bg-surface rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300">
      {children}
    </div>
  );
}
