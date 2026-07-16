import { TeamContent } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";

export default function Team({ team }: { team: TeamContent }) {
  return (
    <section id="team" className="border-b border-slate-200">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="section-eyebrow mb-4">{team.eyebrow}</p>
          <h2 className="section-headline">{team.headline}</h2>
          <p className="mt-6 text-slate-500 leading-relaxed">
            {team.subheading}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.items.map((member) => (
            <div key={member.id} className="text-left">
              <PlaceholderImage
                src={member.photo}
                alt={member.name}
                label="Headshot Placeholder"
                className="w-full aspect-[3/4] object-cover"
              />
              <h3 className="mt-5 font-serif text-lg text-slate-900">
                {member.name}
              </h3>
              <p className="mt-1 text-accent-600 text-xs uppercase tracking-[0.15em]">
                {member.title}
              </p>
              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <a
                  href={`mailto:${member.email}`}
                  className="block hover:text-slate-900 transition-colors"
                >
                  {member.email}
                </a>
                <a
                  href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
                  className="block hover:text-slate-900 transition-colors"
                >
                  {member.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
