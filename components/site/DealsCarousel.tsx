"use client";

import { useEffect, useRef, useState } from "react";
import { DealItem } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";
import DealModal from "./DealModal";

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_MS = 400;

// Mirrors the sm/lg breakpoints on the per-page grid below (grid-cols-1
// sm:grid-cols-2 lg:grid-cols-4) so pagination math always matches what's
// actually rendered on screen.
function getVisibleCount(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages.length > 0 ? pages : [[]];
}

export default function DealsCarousel({ deals }: { deals: DealItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Defaults to the mobile (1-per-page) count so server and first client
  // render match exactly; corrected immediately on mount via effect below.
  const [visibleCount, setVisibleCount] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [activeDeal, setActiveDeal] = useState<DealItem | null>(null);

  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(getVisibleCount(window.innerWidth));
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const pages = chunk(deals, visibleCount);
  const pageCount = pages.length;

  // Re-clamp whenever the deal count or cards-per-page (breakpoint) changes,
  // so an out-of-range page from a previous layout can't get stuck.
  useEffect(() => {
    setActivePage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  function goTo(page: number) {
    const wrapped = ((page % pageCount) + pageCount) % pageCount;
    setActivePage(wrapped);
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
    if (!isVisible || activeDeal || pageCount <= 1) return;
    const id = setInterval(() => {
      setActivePage((p) => (p + 1) % pageCount);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isVisible, activeDeal, pageCount]);

  if (deals.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      {pageCount > 1 && (
        // Positioned in the section's existing header-to-content gap (the
        // mt-16 above this component) instead of adding a second row of
        // vertical space, which was leaving an oversized gap above the cards.
        <div className="absolute -top-[52px] right-0 flex gap-2">
          <button
            type="button"
            aria-label="Previous deal"
            onClick={() => goTo(activePage - 1)}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors bg-slate-50"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next deal"
            onClick={() => goTo(activePage + 1)}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors bg-slate-50"
          >
            →
          </button>
        </div>
      )}

      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${activePage * 100}%)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
        >
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {page.map((deal) => (
                <button
                  key={deal.id}
                  type="button"
                  onClick={() => setActiveDeal(deal)}
                  className="group border border-slate-200 bg-white overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-accent-600"
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
                    <div className="mt-1 text-graphite-500 text-sm">{deal.location}</div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activePage ? "bg-accent-600" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}

      <DealModal deal={activeDeal} onClose={() => setActiveDeal(null)} />
    </div>
  );
}
