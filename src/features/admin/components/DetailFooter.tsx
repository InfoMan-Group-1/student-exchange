"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function DetailFooter() {
  const router = useRouter();

  return (
    <footer className="mt-12 flex items-center py-6 border-t border-outline-variant">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-label-md">Back to list</span>
      </button>
    </footer>
  );
}
