import { getAllContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Results from "@/components/site/Results";
import Team from "@/components/site/Team";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getAllContent();

  return (
    <>
      <Nav
        companyName={content.hero.companyName}
        navLinks={content.footer.navLinks}
        ctaText={content.hero.ctaPrimaryText}
      />
      <main>
        <Hero hero={content.hero} />
        <About about={content.about} />
        <Services services={content.services} />
        <Results deals={content.deals} />
        <Team team={content.team} />
        <Contact contact={content.contact} />
      </main>
      <Footer footer={content.footer} companyName={content.hero.companyName} />
    </>
  );
}
