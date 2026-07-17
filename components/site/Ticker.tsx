const PIXELS_PER_SECOND = 60;

function TickerGroup({ items, groupKey }: { items: string[]; groupKey: string }) {
  return (
    <div className="flex items-center shrink-0" aria-hidden={groupKey === "b"}>
      {items.map((item, i) => (
        <span key={`${groupKey}-${i}`} className="flex items-center shrink-0">
          <span className="text-white text-sm sm:text-base font-medium uppercase tracking-[0.15em] whitespace-nowrap">
            {item}
          </span>
          <span
            className="mx-6 sm:mx-10 w-1.5 h-1.5 rounded-full bg-graphite-500 shrink-0"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

export default function Ticker({ items }: { items: string[] }) {
  const cleanItems = items.map((item) => item.trim()).filter(Boolean);
  if (cleanItems.length === 0) return null;

  // Roughly scale duration to content length so the perceived scroll speed
  // stays consistent whether there are a few items or many.
  const approxCharWidth = 11;
  const groupWidth = cleanItems.join("").length * approxCharWidth + cleanItems.length * 80;
  const duration = Math.max(groupWidth / PIXELS_PER_SECOND, 12);

  return (
    <div className="bg-accent-600 overflow-hidden py-4" role="marquee">
      <div
        className="flex w-max animate-ticker"
        style={{ animationDuration: `${duration}s` }}
      >
        <TickerGroup items={cleanItems} groupKey="a" />
        <TickerGroup items={cleanItems} groupKey="b" />
      </div>
    </div>
  );
}
