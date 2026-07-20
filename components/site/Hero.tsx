import { HeroContent } from "@/lib/types";
import StatCounter from "./StatCounter";
import PlaceholderImage from "./PlaceholderImage";

export default function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200"
    >
      <div className="absolute inset-0">
        <PlaceholderImage
          src={hero.backgroundImage}
          alt=""
          label=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white" />
      </div>

      <div className="relative max-w-content mx-auto px-6 sm:px-10 pt-40 pb-24 sm:pt-48 sm:pb-32">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-accent-600 leading-[1.05] max-w-4xl text-balance">
          {hero.companyName}
        </h1>
        <p className="mt-5 max-w-2xl text-graphite-700 text-lg sm:text-xl font-medium leading-snug text-balance">
          {hero.tagline}
        </p>
        <p className="mt-8 max-w-2xl text-slate-600 text-base sm:text-lg leading-relaxed">
          {hero.subheading}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/start-your-deal" className="btn-primary">
            {hero.ctaPrimaryText}
          </a>
          <a href={hero.ctaSecondaryHref} className="btn-outline">
            {hero.ctaSecondaryText}
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-slate-200 pt-10">
          {hero.stats.map((stat, i) => (
            <StatCounter
              key={stat.id}
              prefix={stat.prefix}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              // The 3rd stat is always "Year Founded" -- the admin can edit
              // its value but never reorders/adds/removes hero stats (see
              // HeroEditor.tsx), so a year should never get a thousands
              // separator regardless of what value is stored.
              noSeparator={i === 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
