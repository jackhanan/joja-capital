"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({
  prefix = "",
  value,
  suffix = "",
  label,
}: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1600;
            const start = performance.now();

            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(value * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-serif text-4xl sm:text-5xl text-slate-50">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}
