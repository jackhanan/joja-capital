import { DealsContent } from "@/lib/types";
import DealsCarousel from "./DealsCarousel";

export default function Results({ deals }: { deals: DealsContent }) {
  return (
    <section id="results" className="border-b border-slate-200 bg-slate-50">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{deals.eyebrow}</p>
          <h2 className="section-headline">{deals.headline}</h2>
          <p className="mt-6 text-slate-500 leading-relaxed">
            {deals.subheading}
          </p>
        </div>

        <div className="mt-16">
          <DealsCarousel deals={deals.items} />
        </div>

        <div className="mt-20 border border-accent-800 bg-gradient-to-r from-accent-900 to-accent-700 px-8 py-14 sm:px-16 sm:py-16 text-center">
          <div className="font-serif text-4xl sm:text-6xl text-white">
            {deals.bannerPrefix}
            {deals.bannerValue}
            {deals.bannerSuffix}
          </div>
          <p className="mt-4 text-graphite-200 uppercase tracking-[0.2em] text-xs sm:text-sm">
            {deals.bannerText}
          </p>
        </div>
      </div>
    </section>
  );
}
