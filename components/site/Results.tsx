import { DealsContent } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";

export default function Results({ deals }: { deals: DealsContent }) {
  return (
    <section id="results" className="border-b border-slate-800/60 bg-navy-900">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{deals.eyebrow}</p>
          <h2 className="section-headline">{deals.headline}</h2>
          <p className="mt-6 text-slate-400 leading-relaxed">
            {deals.subheading}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.items.map((deal) => (
            <div
              key={deal.id}
              className="group border border-slate-800/60 bg-navy-950 overflow-hidden"
            >
              <PlaceholderImage
                src={deal.image}
                alt={`${deal.dealType} — ${deal.location}`}
                label="Deal Photo Placeholder"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <div className="font-serif text-2xl text-slate-50">
                  {deal.amount}
                </div>
                <div className="mt-2 text-gold-400 text-xs uppercase tracking-[0.2em]">
                  {deal.dealType}
                </div>
                <div className="mt-1 text-slate-400 text-sm">
                  {deal.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border border-slate-800/60 bg-gradient-to-r from-navy-800 to-navy-900 px-8 py-14 sm:px-16 sm:py-16 text-center">
          <div className="font-serif text-4xl sm:text-6xl text-slate-50">
            {deals.bannerPrefix}
            {deals.bannerValue}
            {deals.bannerSuffix}
          </div>
          <p className="mt-4 text-slate-400 uppercase tracking-[0.2em] text-xs sm:text-sm">
            {deals.bannerText}
          </p>
        </div>
      </div>
    </section>
  );
}
