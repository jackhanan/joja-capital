import { AboutContent } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";

export default function About({ about }: { about: AboutContent }) {
  return (
    <section id="about" className="border-b border-slate-200 bg-slate-50">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-eyebrow mb-4">{about.eyebrow}</p>
          <h2 className="section-headline">{about.headline}</h2>
          <p className="mt-6 text-slate-600 leading-relaxed">
            {about.paragraph1}
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {about.paragraph2}
          </p>
          <a href={about.ctaHref} className="btn-outline mt-8">
            {about.ctaText}
          </a>
        </div>
        <PlaceholderImage
          src={about.image}
          alt={about.headline}
          label="About Image Placeholder"
          className="w-full aspect-[4/5] object-cover"
        />
      </div>
    </section>
  );
}
