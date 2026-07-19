import { ContactContent } from "@/lib/types";

export default function Contact({ contact }: { contact: ContactContent }) {
  const addresses = contact.addresses ?? [];
  const singleAddress = addresses.length === 1;

  return (
    <section id="contact" className="bg-slate-50">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{contact.eyebrow}</p>
          <h2 className="section-headline">{contact.headline}</h2>
        </div>

        {addresses.length > 1 && (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 border-t border-slate-200 pt-10">
            {addresses.map((addr) => (
              <div key={addr.id}>
                <div className="text-accent-600 text-xs uppercase tracking-[0.2em] mb-3">
                  {addr.label || "Address"}
                </div>
                <p className="text-slate-600 whitespace-pre-line">{addr.address}</p>
              </div>
            ))}
          </div>
        )}

        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-10 ${
            addresses.length > 1 ? "mt-10" : "mt-14 border-t border-slate-200 pt-10"
          }`}
        >
          {singleAddress && (
            <div>
              <div className="text-accent-600 text-xs uppercase tracking-[0.2em] mb-3">
                {addresses[0].label || "Address"}
              </div>
              <p className="text-slate-600 whitespace-pre-line">{addresses[0].address}</p>
            </div>
          )}
          <div>
            <div className="text-accent-600 text-xs uppercase tracking-[0.2em] mb-3">
              Phone
            </div>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="text-accent-600 text-xs uppercase tracking-[0.2em] mb-3">
              Email
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-10 flex gap-6">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite-500 hover:text-accent-600 transition-colors text-sm uppercase tracking-widest"
          >
            Instagram
          </a>
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite-500 hover:text-accent-600 transition-colors text-sm uppercase tracking-widest"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
