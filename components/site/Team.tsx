"use client";

import { useState } from "react";
import { TeamContent, TeamMember } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";
import TeamMemberModal from "./TeamMemberModal";

export default function Team({ team }: { team: TeamContent }) {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

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
            <button
              key={member.id}
              type="button"
              onClick={() => setActiveMember(member)}
              className="group text-left focus:outline-none focus:ring-2 focus:ring-accent-600 transition-all duration-200 hoverable:-translate-y-1 hoverable:shadow-xl"
            >
              <PlaceholderImage
                src={member.photo}
                alt={member.name}
                label="Headshot Placeholder"
                className="w-full aspect-[3/4] object-cover group-hover:opacity-90 transition-opacity"
              />
              <h3 className="mt-5 font-serif text-lg text-slate-900">
                {member.name}
              </h3>
              <p className="mt-1 text-accent-600 text-xs uppercase tracking-[0.15em]">
                {member.title}
              </p>
              <div className="mt-3 space-y-1 text-sm text-graphite-500">
                <span className="block hover:text-slate-900 transition-colors">
                  {member.email}
                </span>
                <span className="block hover:text-slate-900 transition-colors">
                  {member.phone}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <TeamMemberModal member={activeMember} onClose={() => setActiveMember(null)} />
    </section>
  );
}
