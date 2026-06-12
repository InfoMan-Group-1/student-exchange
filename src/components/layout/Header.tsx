"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Landmark, Menu } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-surface sticky top-0 z-40 flex justify-between items-center w-full h-20 px-8 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-outline-variant"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
          <Landmark className="h-6 w-6" />
        </div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-primary-container hidden sm:block">
          PUP Student Exchange
        </h1>
      </div>
      <nav className="hidden md:flex items-center">
        <div className="inline-flex items-center p-1 bg-surface-container-low border border-outline-variant rounded-full shadow-sm">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full font-label-md text-on-surface-variant hover:text-primary hover:bg-surface transition-all duration-200"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md hover:brightness-110 transition-all duration-200 active:scale-95 shadow-sm"
          >
            Register
          </Link>
        </div>
      </nav>
      <button className="md:hidden p-2 text-primary" type="button" aria-label="Menu">
        <Menu className="h-6 w-6" />
      </button>
    </header>
  );
}
