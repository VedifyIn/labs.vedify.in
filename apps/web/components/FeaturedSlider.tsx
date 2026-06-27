"use client";

import { useState, useEffect, useCallback } from "react";
import FeaturedCard from "./FeaturedCard";
import type { Project } from "@/types";

export default function FeaturedSlider({ items }: { items: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const next = useCallback(() => {
    setCurrent((c) => {
      const newIndex = (c + 1) % items.length;
      setAnnouncement(
        `Showing project ${newIndex + 1} of ${items.length}: ${items[newIndex]?.title}`
      );
      return newIndex;
    });
  }, [items]);

  const prev = useCallback(() => {
    setCurrent((c) => {
      const newIndex = (c - 1 + items.length) % items.length;
      setAnnouncement(
        `Showing project ${newIndex + 1} of ${items.length}: ${items[newIndex]?.title}`
      );
      return newIndex;
    });
  }, [items]);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [items.length, paused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (items.length === 0) return null;

  return (
    <div
      className="relative z-[1]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Featured projects carousel"
    >
      <div className="overflow-hidden rounded-[18px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          aria-live="polite"
        >
          {items.map((project) => (
            <div key={project.id} className="min-w-full">
              <FeaturedCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            type="button"
            onClick={prev}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                prev();
              }
            }}
            className="bg-surface-2 border border-border rounded-full p-1.5 text-text-muted hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer"
            aria-label="Previous featured project"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </button>

          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCurrent(i);
                  setAnnouncement(
                    `Showing project ${i + 1} of ${items.length}: ${items[i]?.title}`
                  );
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === current ? "bg-text-primary w-5" : "bg-border hover:bg-text-muted"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                next();
              }
            }}
            className="bg-surface-2 border border-border rounded-full p-1.5 text-text-muted hover:text-text-primary hover:border-border-hover transition-colors cursor-pointer"
            aria-label="Next featured project"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
