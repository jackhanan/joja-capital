export default function DealsCarouselSkeleton() {
  return (
    <section className="border-b border-slate-200 bg-slate-50" aria-hidden="true">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl animate-pulse">
          <div className="h-3 w-28 bg-slate-200 rounded" />
          <div className="mt-4 h-10 w-3/4 bg-slate-200 rounded" />
          <div className="mt-6 h-4 w-full max-w-lg bg-slate-200 rounded" />
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-slate-200 bg-white overflow-hidden">
              <div className="w-full aspect-[4/3] bg-slate-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-20 bg-slate-200 rounded" />
                <div className="h-3 w-24 bg-slate-200 rounded" />
                <div className="h-3 w-16 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 h-32 bg-slate-200 animate-pulse" />
      </div>
    </section>
  );
}
