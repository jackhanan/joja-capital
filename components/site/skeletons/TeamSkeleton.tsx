export default function TeamSkeleton() {
  return (
    <section className="border-b border-slate-200" aria-hidden="true">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl animate-pulse">
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="mt-4 h-10 w-2/3 bg-slate-200 rounded" />
          <div className="mt-6 h-4 w-full max-w-lg bg-slate-200 rounded" />
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="w-full aspect-[3/4] bg-slate-200" />
              <div className="mt-5 h-5 w-32 bg-slate-200 rounded" />
              <div className="mt-2 h-3 w-24 bg-slate-200 rounded" />
              <div className="mt-3 space-y-1.5">
                <div className="h-3 w-36 bg-slate-200 rounded" />
                <div className="h-3 w-28 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
