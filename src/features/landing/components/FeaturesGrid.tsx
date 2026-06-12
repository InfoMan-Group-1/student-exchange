import { getLandingStats } from "@/lib/mockData";
import { Globe, Award, CheckCircle, FileText, Headset } from "lucide-react";
import Image from "next/image";

export async function FeaturesGrid() {
  const stats = await getLandingStats();

  return (
    <section className="max-w-7xl mx-auto px-container-padding py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Feature Card */}
        <div className="md:col-span-2 bg-surface p-card-padding rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between overflow-hidden group">
          <div>
            <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container mb-6">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
              Global Destinations
            </h3>
            <p className="font-body-md text-body-md text-on-tertiary-container mb-6">
              Access over {stats.partnerUniversities} partner universities across
              Europe, Asia, and the Americas. Your journey to international
              excellence starts here.
            </p>
          </div>
          <div className="relative h-48 -mx-card-padding -mb-card-padding mt-4 overflow-hidden">
            <img
              alt="University Campus"
              className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyFsfKH4UrzgHtDPz6ftRX_IcxzafLzGG22sVYPaVNeWCspdZ3xkg5co0-A3u4dbyc0GOz9zOxwYVx6YR112wj_Xi3HghFa7QPg_-wCzybibxf0saILbA1W_pRAL4ZYuqdnImJK4ti3WAX3sLMEMVTjxzXWtvNjqMIfjYI-_vMAuxjm9Drh2_nZpXL5ZQ8hQdZc1CX96g3u4NMWcMqwa2oXtWECCNqT0sC73EZEf8rHGCIZpY8xQ2XvfeRLd1Q1ph52_EUqFVsLi3E"
            />
          </div>
        </div>

        {/* Vertical Card */}
        <div className="bg-primary-container text-on-primary p-card-padding rounded-xl flex flex-col">
          <Award className="h-12 w-12 mb-8" />
          <h3 className="font-headline-md text-headline-md mb-4">
            Quality Assurance
          </h3>
          <p className="font-body-md text-body-md text-white/80 mb-8">
            PUP ensures all exchange programs meet rigorous international academic
            standards and credit transfer requirements.
          </p>
          <ul className="space-y-4 mt-auto">
            <li className="flex items-center gap-3 font-label-md text-label-md">
              <CheckCircle className="text-secondary-container h-5 w-5" />
              Accredited Programs
            </li>
            <li className="flex items-center gap-3 font-label-md text-label-md">
              <CheckCircle className="text-secondary-container h-5 w-5" />
              Full Credit Transfer
            </li>
            <li className="flex items-center gap-3 font-label-md text-label-md">
              <CheckCircle className="text-secondary-container h-5 w-5" />
              Cultural Immersion
            </li>
          </ul>
        </div>

        {/* Stats/Grid Cards */}
        <div className="bg-surface-container-low p-card-padding rounded-xl border border-outline-variant flex items-center gap-6">
          <div className="text-primary font-display-lg text-display-lg">
            {stats.annualPlacements}+
          </div>
          <div className="font-label-md text-label-md text-on-surface-variant">
            Annual Student Placements
          </div>
        </div>

        <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm flex items-center gap-6 group hover:border-secondary transition-colors cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-title-lg text-title-lg text-on-surface">
              Digital Docs
            </h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Paperless Application
            </p>
          </div>
        </div>

        <div className="bg-surface p-card-padding rounded-xl border border-outline-variant shadow-sm flex items-center gap-6 group hover:border-primary-container transition-colors cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all">
            <Headset className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-title-lg text-title-lg text-on-surface">Support</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              24/7 Student Hotline
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
