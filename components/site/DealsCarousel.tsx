"use client";

import { useEffect, useRef, useState } from "react";
import { DealItem } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";
import DealModal from "./DealModal";

const AUTO_ADVANCE_MS = 5000;

export default function DealsCarousel({ deals }: { deals: DealItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDeal, setActiveDeal] = useState<DealItem | null>(null);

  function scrollToCard(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }

  function goTo(index: number) {
    const wrapped = ((index % deals.length) + deals.length) % deals.length;
    setActiveIndex(wrapped);
    scrollToCard(wrapped);
  }

  // Pause only when the carousel is scrolled off-screen or a deal's
  // detail modal is open -- never on mouse position/hover.
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
    if (!isVisible || activeDeal || deals.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % deals.length;
        scrollToCard(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, activeDeal, deals.length]);

  // Keep activeIndex (and dots) in sync with manual swipe/scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame: number;

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!track) return;
        let closest = 0;
        let closestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const dist = Math.abs((child as HTMLElement).offsetLeft - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (deals.length === 0) return null;

  return (
    <div ref={containerRef}>
      {deals.length > 1 && (
        <div className="flex justify-end gap-2 mb-6">
          <button
            type="button"
            aria-label="Previous deal"
            onClick={() => goTo(activeIndex - 1)}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next deal"
            onClick={() => goTo(activeIndex + 1)}
            className="w-10 h-10 flex items-center justify-center border border-slate-300 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors"
          >
            →
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {deals.map((deal) => (
          <button
            key={deal.id}
            type="button"
            onClick={() => setActiveDeal(deal)}
            className="group snap-start shrink-0 basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-1.125rem)] border border-slate-200 bg-white overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-accent-600"
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

      {deals.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {deals.map((deal, i) => (
            <button
              key={deal.id}
              type="button"
              aria-label={`Go to deal ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIndex ? "bg-accent-600" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}

      <DealModal deal={activeDeal} onClose={() => setActiveDeal(null)} />
    </div>
  );
}
