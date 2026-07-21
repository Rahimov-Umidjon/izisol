"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Ranglar palitrasi — xohlagancha o'zgartirishingiz mumkin
const COLORS = [
  "rgba(55, 138, 221, 0.15)",  // moviy
  "rgba(127, 119, 221, 0.15)", // binafsha
  "rgba(29, 158, 117, 0.15)",  // yashil-moviy
  "rgba(216, 90, 48, 0.12)",   // to'q sariq
];

type ScrollGridProps = {
  columns?: number;
  rows?: number;
  cellSize?: number;
  /** true bo'lsa, ko'zdan yo'qolganda rang qaytadi (qayta-qayta effekt) */
  repeat?: boolean;
};

export default function ScrollGrid({
  columns = 20,
  rows = 20,
  cellSize = 40,
  repeat = false,
}: ScrollGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cells = container.querySelectorAll<HTMLDivElement>(".grid-cell");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            const idx = Number(el.dataset.index);
            el.style.background = COLORS[idx % COLORS.length];
          } else if (repeat) {
            el.style.background = "transparent";
          }
        });
      },
      { threshold: 0.3 }
    );

    cells.forEach((cell) => observer.observe(cell));

    return () => observer.disconnect();
  }, [repeat ,pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gap: "1px",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <div
          key={i}
          className="grid-cell"
          data-index={i}
          style={{
            width: cellSize,
            height: cellSize,
            background: "transparent",
            transition: "background 0.6s ease",
          }}
        />
      ))}
    </div>
  );
}