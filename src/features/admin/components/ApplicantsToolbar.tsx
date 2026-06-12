"use client";

import { Download, Search, ChevronDown, ListFilter } from "lucide-react";

interface ApplicantsToolbarProps {
  search: string;
  filterStatus: string;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
}

export function ApplicantsToolbar({
  search,
  filterStatus,
  onSearchChange,
  onStatusChange,
}: ApplicantsToolbarProps) {
  return (
    <section className="bg-surface p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, student number, or program..."
          className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
        />
      </div>

      <div className="flex gap-4 w-full md:w-auto">
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none bg-surface-container-low border border-outline rounded-lg py-2 pl-4 pr-10 font-label-md text-on-surface-variant focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer w-full md:w-40"
          >
            <option>All Status</option>
            <option>Complete</option>
            <option>Pending</option>
          </select>
          <ListFilter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none text-on-surface-variant" />
        </div>
      </div>
    </section>
  );
}
