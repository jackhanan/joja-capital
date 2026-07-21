"use client";

import { useEffect, useRef, useState } from "react";
import { DealItem } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";
import DealModal from "./DealModal";

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_MS = 400;

// Mirrors the sm/lg breakpoints on each card's inline width below (25% at
// lg, 50% at sm, 100% below that) so the one-at-a-time slide math always
// matches what's actually rendered on screen.
function getVisibleCount(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

export default function DealsCarousel({ deals }: { deals: DealItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Defaults to the mobile (1-visible) count so server and first client
  // render match exactly; corrected immediately on mount via effect below.
  const [visibleCount, setVisibleCount] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [activeDeal, setActiveDeal] = useState<DealItem | null>(null);

  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(getVisibleCount(window.innerWidth));
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Nothing to slide if everything already fits on screen at once.
  const canSlide = deals.length > visibleCount;

  // Number of valid starting positions == dot count: total - visible + 1.
  // e.g. 6 deals, 4 visible -> starts at 0 ([1-4]), 1 ([2-5]), 2 ([3-6]) -> 3.
  const stepCount = canSlide ? deals.length - visibleCount + 1 : 1;

  // Re-clamp whenever the deal count or visible-at-once (breakpoint) count
  // changes, so an out-of-range start index from a previous layout can't
  // get stuck.
  useEffect(() => {
    setStartIndex((i) => Math.min(i, stepCount - 1));
  }, [stepCount]);

  function goTo(index: number) {
    const wrapped = ((index % stepCount) + stepCount) % stepCount;
    setStartIndex(wrapped);
  }

  // Delta-based updates (arrows) must read the PREVIOUS state via the
  // functional setState form, not a closed-over `startIndex` -- otherwise
  // rapid clicks dispatched before a re-render all see the same stale
  // value and desync from the actual position.
  function step(delta: number) {
    setStartIndex((i) => ((i + delta) % stepCount + stepCount) % stepCount);
  }

  // Pause only when the carousel is scrolled off-screen or a deal's detail
  // modal is open -- never on mouse position/hover.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || activeDeal || !canSlide) return;
    const id = setInterval(() => {
      // One card at a time, looping back to the start once the last valid
      // starting position has been shown.
      setStartIndex((i) => (i + 1) % stepCount);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isVisible, activeDeal, canSlide, stepCount]);

  if (deals.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      {canSlide && (
        // Positioned in the section's existing header-to-content gap (the
        // mt-16 above this component) instead of adding a second row of
        // vertical space, which was leaving an oversized gap above the cards.
        <div className="absolute -top-[52px] right-0 flex gap-2">
          <button
            type="button"
            aria-label="Previous deal"
            onClick={() => step(-1)}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors bg-slate-50"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next deal"
            onClick={() => step(1)}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors bg-slate-50"
          >
            →
          </button>
        </div>
      )}

      <div className="overflow-hidden -mx-3">
        <div
          className="flex"
          style={{
            transform: `translateX(-${(startIndex * 100) / visibleCount}%)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
        >
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="shrink-0 px-3"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <button
                type="button"
                onClick={() => setActiveDeal(deal)}
                className="group w-full flex flex-col border border-slate-200 bg-white overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-accent-600"
              >
                <PlaceholderImage
                  src={deal.image}
                  alt={`${deal.dealType} — ${deal.location}`}
                  label="Deal Photo Placeholder"
                  className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-6">
                  <div className="font-serif text-2xl text-slate-900">{deal.amount}</div>
                  <div className="mt-2 text-accent-600 text-xs uppercase tracking-[0.2em]">
                    {deal.dealType}
                  </div>
                  {deal.assetType && (
                    <div className="mt-1 text-graphite-500 text-sm">{deal.assetType}</div>
                  )}
                  {deal.transactionType && (
                    <div className="mt-1 text-graphite-600 text-xs uppercase tracking-[0.15em]">
                      {deal.transactionType}
                    </div>
                  )}
                  <div className="mt-1 text-graphite-500 text-sm">{deal.location}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {canSlide && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: stepCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === startIndex ? "bg-accent-600" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}

      <DealModal deal={activeDeal} onClose={() => setActiveDeal(null)} />
    </div>
  );
}
