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
    <section id="market-rates" className="border-b border-slate-200 bg-white">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">Market Data</p>
          <h2 className="section-headline">Live Market Rates</h2>
          <p className="mt-6 text-slate-500 leading-relaxed">
            Benchmark lending rates and U.S. Treasury yields, updated daily from the
            Federal Reserve.
          </p>
        </div>

        <div className="mt-16 border border-accent-800 bg-gradient-to-br from-accent-900 to-accent-800 px-8 pt-12 pb-8 sm:px-16 sm:pt-16 sm:pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16">
            <div>
              <div className="text-graphite-300 text-xs uppercase tracking-[0.2em] mb-2">
                Benchmark Rates
              </div>
              {overnight.map((r) => (
                <Row key={r.seriesId} label={r.label} value={r.value} />
              ))}
            </div>

            <div className="mt-8 sm:mt-0">
              <div className="text-graphite-300 text-xs uppercase tracking-[0.2em] mb-2">
                U.S. Treasuries
              </div>
              {treasuries.map((r) => (
                <Row key={r.seriesId} label={r.label} value={r.value} />
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            {fetchedAt && (
              <p className="text-graphite-400 text-xs">
                Last Updated: {RATE_FORMATTER.format(new Date(fetchedAt))} ET
              </p>
            )}
            <p className="mt-1.5 text-graphite-500 text-[11px] leading-relaxed max-w-lg mx-auto">
              Source: Federal Reserve Bank of St. Louis (FRED). Updates daily at
              9:00 AM ET. Not a rate quote or commitment to lend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
