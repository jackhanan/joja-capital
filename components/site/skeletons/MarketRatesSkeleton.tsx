function RowSkeleton() {
  return (
    <div className="flex items-baseline justify-between py-3.5 border-b border-white/10 last:border-0">
      <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
      <div className="h-5 w-12 bg-white/20 rounded animate-pulse" />
    </div>
  );
}

export default function MarketRatesSkeleton() {
  return (
    <section className="border-b border-slate-200 bg-white" aria-hidden="true">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl animate-pulse">
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="mt-4 h-10 w-2/3 bg-slate-200 rounded" />
          <div className="mt-6 h-4 w-full max-w-lg bg-slate-200 rounded" />
        </div>

        {/* Card chrome stays real (it's static, not data-driven) -- only the
            rate values themselves pulse, matching how the loaded card looks. */}
        <div className="mt-16 border border-accent-800 bg-gradient-to-br from-accent-900 to-accent-800 px-8 pt-12 pb-8 sm:px-16 sm:pt-16 sm:pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16">
            <div>
              <div className="h-3 w-28 bg-white/20 rounded mb-2 animate-pulse" />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </div>
            <div className="mt-8 sm:mt-0">
              <div className="h-3 w-28 bg-white/20 rounded mb-2 animate-pulse" />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
              <RowSkeleton />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <div className="h-3 w-40 bg-white/20 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
