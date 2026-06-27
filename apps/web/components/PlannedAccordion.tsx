"use client";

import { useState, useRef, useEffect } from "react";
import type { Project } from "@/types";

const colorVar: Record<string, string> = {
  purple: "var(--color-purple)",
  amber: "var(--color-amber)",
  teal: "var(--color-teal)",
  pink: "var(--color-pink)",
};

export default function PlannedAccordion({ items }: { items: Project[] }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    } else {
      setMaxHeight(0);
    }
  }, [open, items]);

  if (items.length === 0) return null;

  return (
    <div className="relative z-[1] mt-2 border border-border rounded-[14px] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between bg-surface-2 border-none px-4 py-3.5 cursor-pointer text-text-secondary text-xs font-sans hover:text-text-primary transition-colors"
      >
        <span>Planned — {items.length} ideas not started yet</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-muted transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="transition-all duration-200 overflow-hidden"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {items.map((p) => (
          <a
            key={p.id}
            href={p.links.github || "#"}
            target={p.links.github ? "_blank" : undefined}
            rel={p.links.github ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2.5 px-4 py-2.5 border-t border-border text-xs text-text-muted no-underline hover:bg-surface-2/50 transition-colors"
          >
            <span className="text-text-secondary font-medium flex-none">{p.title}</span>
            <span
              className="font-mono text-[11px] flex-none opacity-80"
              style={{ color: colorVar[p.color] || "var(--color-text-muted)" }}
            >
              {p.tech}
            </span>
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap opacity-70">
              {p.description}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
