import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant py-8">
      <div className="max-w-7xl mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-primary-container rounded flex items-center justify-center text-on-primary">
            <GraduationCap className="h-4 w-4" />
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Polytechnic University of the Philippines
          </p>
        </div>
        <div className="flex gap-6">
          <Link
            href="#about-pup"
            className="text-on-surface-variant hover:text-primary transition-colors text-sm"
          >
            About PUP
          </Link>
          <Link
            href="#international-affairs"
            className="text-on-surface-variant hover:text-primary transition-colors text-sm"
          >
            International Affairs
          </Link>
          <Link
            href="#contact"
            className="text-on-surface-variant hover:text-primary transition-colors text-sm"
          >
            Contact Us
          </Link>
        </div>
        <p className="font-label-sm text-label-sm text-on-tertiary-container">
          © {new Date().getFullYear()} PUP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
