import { Suspense } from "react";
import { getAllContent, getContent } from "@/lib/content";
import { getMarketRates } from "@/lib/marketRates";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Ticker from "@/components/site/Ticker";
import Services from "@/components/site/Services";
import Results from "@/components/site/Results";
import MarketRates from "@/components/site/MarketRates";
import Team from "@/components/site/Team";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import DealsCarouselSkeleton from "@/components/site/skeletons/DealsCarouselSkeleton";
import TeamSkeleton from "@/components/site/skeletons/TeamSkeleton";
import MarketRatesSkeleton from "@/components/site/skeletons/MarketRatesSkeleton";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Each of these does its own D1 read and is wrapped in its own <Suspense>
// below, so it streams in independently (with a real, non-artificial
// loading placeholder) instead of blocking the whole page on every
// section's data.
async function ResultsSection() {
  const deals = await getContent("deals");
  return <Results deals={deals} />;
}

async function TeamSection() {
  const team = await getContent("team");
  return <Team team={team} />;
}

async function MarketRatesSection({ disclaimer }: { disclaimer: string }) {
  const marketRates = await getMarketRates();
  return (
    <MarketRates rates={marketRates.rates} fetchedAt={marketRates.fetchedAt} disclaimer={disclaimer} />
  );
}

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
        <Ticker items={content.services.tickerItems} />
        <Services services={content.services} />
        <Suspense fallback={<DealsCarouselSkeleton />}>
          <ResultsSection />
        </Suspense>
        {content.marketRates.enabled && (
          <Suspense fallback={<MarketRatesSkeleton />}>
            <MarketRatesSection disclaimer={content.marketRates.disclaimer} />
          </Suspense>
        )}
        <Suspense fallback={<TeamSkeleton />}>
          <TeamSection />
        </Suspense>
        <Contact contact={content.contact} />
      </main>
      <Footer footer={content.footer} companyName={content.hero.companyName} />
    </>
  );
}
