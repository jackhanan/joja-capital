"use client";

import { useEffect } from "react";
import { TeamMember } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";

export default function TeamMemberModal({
  member,
  onClose,
}: {
  member: TeamMember | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!member) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-navy-950/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} — team member details`}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/90 border border-slate-200 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
          <PlaceholderImage
            src={member.photo}
            alt={member.name}
            label="Headshot Placeholder"
            className="w-full aspect-[3/4] object-cover sm:self-start"
          />

          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">{member.name}</h2>
            <p className="mt-3 text-accent-600 text-sm uppercase tracking-[0.2em]">
              {member.title}
            </p>

            <div className="mt-8 space-y-2 text-base">
              <a
                href={`mailto:${member.email}`}
                className="block text-graphite-500 hover:text-slate-900 transition-colors"
              >
                {member.email}
              </a>
              <a
                href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
                className="block text-graphite-500 hover:text-slate-900 transition-colors"
              >
                {member.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 border-t border-slate-200">
          <div className="text-graphite-500 text-xs uppercase tracking-[0.2em] mb-3">
            Bio
          </div>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
            {member.bio || "No biography has been added for this team member yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
