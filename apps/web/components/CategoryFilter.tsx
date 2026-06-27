"use client";

import { useEffect, useRef, useState } from "react";

interface CategoryFilterProps {
  tags: [string, number][];
  active: string;
  onSelect: (tag: string) => void;
}

export default function CategoryFilter({ tags, active, onSelect }: CategoryFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Start with all tags visible so SSR and initial client render match,
  // then the ResizeObserver will trim to fit after mount.
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    let isObserving = false;

    const measure = () => {
      if (!container || !container.isConnected) return;

      // Safety check for DOM availability
      const containerWidth = container.offsetWidth - 16;
      if (containerWidth <= 0) return;

      const children = Array.from(container.children) as HTMLElement[];
      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < children.length; i++) {
        const w = children[i].offsetWidth + 8;
        if (totalWidth + w <= containerWidth) {
          totalWidth += w;
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(1, count));
    };

    measure();

    // Create and start observing
    const ro = new ResizeObserver((entries) => {
      // Additional safety: check if entries are valid
      if (entries && entries.length > 0 && entries[0].target.isConnected) {
        measure();
      }
    });

    try {
      ro.observe(container);
      isObserving = true;
    } catch (error) {
      console.warn("ResizeObserver failed to observe:", error);
    }

    return () => {
      if (isObserving && container.isConnected) {
        try {
          ro.unobserve(container);
        } catch (error) {
          // Element may have been removed already
        }
      }
      ro.disconnect();
    };
  }, [mounted, tags]);

  const overflowCount = tags.length - visibleCount;

  const expandAll = () => {
    setVisibleCount(tags.length);
    // Focus first newly revealed tag after expansion
    setTimeout(() => {
      const buttons = containerRef.current?.querySelectorAll("button[data-tag]");
      if (buttons && buttons.length > visibleCount) {
        (buttons[visibleCount] as HTMLElement)?.focus();
      }
    }, 0);
  };

  return (
    <div className="relative z-[1] flex flex-wrap gap-2 mb-5" ref={containerRef}>
      {tags.slice(0, visibleCount).map(([tag, count]) => {
        const isActive = tag === active;
        return (
          <button
            key={tag}
            type="button"
            data-tag={tag}
            onClick={() => onSelect(tag)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer font-sans whitespace-nowrap ${
              isActive
                ? "bg-text-primary text-surface-2 border-text-primary font-medium"
                : "bg-surface-2 text-text-secondary border-border hover:text-text-primary hover:border-border-hover"
            }`}
          >
            {tag} <span className={isActive ? "opacity-70" : "opacity-55"}>({count})</span>
          </button>
        );
      })}
      {overflowCount > 0 && (
        <button
          type="button"
          className="text-xs text-text-muted bg-none border-none cursor-pointer underline decoration-border px-1 py-1.5 hover:text-text-secondary font-sans whitespace-nowrap"
          onClick={expandAll}
        >
          +{overflowCount} more
        </button>
      )}
    </div>
  );
}
