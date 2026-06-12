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
      <nav className="hidden md:flex items-center gap-8">
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
          href="#"
        >
          Programs
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
          href="#"
        >
          Eligibility
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
          href="#"
        >
          Partners
        </Link>
        <Link
          href="/login"
          className="bg-surface-container-low hover:bg-surface-container-high text-primary px-6 py-2 rounded-lg font-label-md text-label-md transition-all duration-200 active:scale-95 border border-outline inline-block"
        >
          Login
        </Link>
      </nav>
      <button className="md:hidden p-2 text-primary" type="button" aria-label="Menu">
        <Menu className="h-6 w-6" />
      </button>
    </header>
  );
}
