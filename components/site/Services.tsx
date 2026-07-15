import { ServicesContent } from "@/lib/types";

export default function Services({ services }: { services: ServicesContent }) {
  return (
    <section id="services" className="border-b border-slate-800/60">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{services.eyebrow}</p>
          <h2 className="section-headline">{services.headline}</h2>
          <p className="mt-6 text-slate-400 leading-relaxed">
            {services.subheading}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/60 border border-slate-800/60">
          {services.items.map((item) => (
            <div
              key={item.id}
              className="bg-navy-950 p-8 sm:p-10 hover:bg-navy-900 transition-colors duration-200"
            >
              <div className="font-serif text-gold-400 text-2xl mb-6">
                {item.number}
              </div>
              <h3 className="font-serif text-xl text-slate-50 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
