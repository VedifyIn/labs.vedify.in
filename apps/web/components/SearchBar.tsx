"use client";

import { useId } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputId = useId();

  return (
    <div className="relative z-[1] mb-[18px]">
      <label htmlFor={inputId} className="sr-only">
        Search experiments
      </label>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="absolute left-[13px] top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        aria-hidden="true"
      >
        <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <input
        id={inputId}
        type="search"
        role="searchbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search experiments..."
        aria-label="Search experiments"
        className="w-full bg-surface-2 border border-border rounded-xl py-2.5 pl-[38px] pr-3.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-border-hover transition-colors font-sans"
      />
    </div>
  );
}
