import { MarketRate } from "@/lib/types";

const RATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  dateStyle: "medium",
  timeStyle: "short",
});

function formatValue(value: number | null): string {
  return value === null ? "—" : `${value.toFixed(2)}%`;
}

function Row({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex items-baseline justify-between py-3.5 border-b border-white/10 last:border-0">
      <span className="text-slate-200 text-sm sm:text-base">{label}</span>
      <span className="font-serif text-lg sm:text-xl text-white">{formatValue(value)}</span>
    </div>
  );
}

export default function MarketRates({
  rates,
  fetchedAt,
}: {
  rates: MarketRate[];
  fetchedAt: string | null;
}) {
  const hasData = rates.some((r) => r.value !== null);
  if (!hasData) return null;

  const overnight = rates.slice(0, 3);
  const treasuries = rates.slice(3);

  return (
    <section id="market-rates" className="bg-navy-950">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-xl mx-auto border border-accent-800 bg-accent-900 px-8 py-10 sm:px-12 sm:py-14">
          <h2 className="font-serif italic text-2xl sm:text-3xl text-white text-center">
            Live Market Rates
          </h2>

          <div className="mt-8">
            {overnight.map((r) => (
              <Row key={r.seriesId} label={r.label} value={r.value} />
            ))}

            <div className="pt-6 pb-1 text-graphite-400 text-xs uppercase tracking-[0.2em]">
              U.S. Treasuries
            </div>

            {treasuries.map((r) => (
              <Row key={r.seriesId} label={r.label} value={r.value} />
            ))}
          </div>

          <div className="mt-8 text-center">
            {fetchedAt && (
              <p className="text-graphite-400 text-xs">
                Last Updated: {RATE_FORMATTER.format(new Date(fetchedAt))} ET
              </p>
            )}
            <p className="mt-2 text-graphite-500 text-[11px] leading-relaxed">
              Rates sourced from the Federal Reserve Bank of St. Louis (FRED). For
              informational purposes only — not a rate quote or commitment to lend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
