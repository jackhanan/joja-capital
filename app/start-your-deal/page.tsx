import { getAllContent } from "@/lib/content";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import StartYourDealForm from "@/components/site/StartYourDealForm";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function StartYourDealPage() {
  const content = await getAllContent();

  return (
    <>
      <Nav
        companyName={content.hero.companyName}
        navLinks={content.footer.navLinks}
        ctaText={content.hero.ctaPrimaryText}
      />
      <main>
        <section className="pt-40 pb-24 sm:pt-48 sm:pb-32">
          <div className="max-w-content mx-auto px-6 sm:px-10">
            <div className="max-w-2xl mb-16">
              <p className="section-eyebrow mb-4">{content.contact.eyebrow}</p>
              <h1 className="section-headline">{content.contact.headline}</h1>
            </div>

            <div className="max-w-2xl">
              <StartYourDealForm
                loanTypeOptions={content.contact.loanTypeOptions}
                propertyTypeOptions={content.contact.propertyTypeOptions}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer footer={content.footer} companyName={content.hero.companyName} />
    </>
  );
}
