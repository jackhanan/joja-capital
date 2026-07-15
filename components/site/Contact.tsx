import { ContactContent } from "@/lib/types";

export default function Contact({ contact }: { contact: ContactContent }) {
  return (
    <section id="contact" className="bg-navy-900">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{contact.eyebrow}</p>
          <h2 className="section-headline">{contact.headline}</h2>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-slate-800/60 pt-10">
          <div>
            <div className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-3">
              Address
            </div>
            <p className="text-slate-300">{contact.address}</p>
          </div>
          <div>
            <div className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-3">
              Phone
            </div>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="text-slate-300 hover:text-slate-100 transition-colors"
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="text-gold-400 text-xs uppercase tracking-[0.2em] mb-3">
              Email
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-300 hover:text-slate-100 transition-colors"
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
            className="text-slate-400 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            Instagram
          </a>
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href={contact.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-gold-400 transition-colors text-sm uppercase tracking-widest"
          >
            Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
