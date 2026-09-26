import { Hero } from "@/components/sections/Hero";
import { Workspace } from "@/components/sections/Workspace";
import { Audience } from "@/components/sections/Audience";
import { Product } from "@/components/sections/Product";
import { Reports } from "@/components/sections/Reports";
import { Faq, faqJsonLd } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/layout/Footer";
import { PageBackground, ClosingBand } from "@/components/ui/PageBackground";

export default function Home() {
  return (
    <>
      {/* Everything from the hero to the questions shares one backdrop. */}
      <div className="relative">
        <PageBackground />
        <div className="relative">
          <Hero />
          <Workspace />
          <Audience />
          <Product />
          <Reports />
          <Faq />
        </div>
      </div>

      {/* …then the closing band, which the footer shares. */}
      <ClosingBand>
        <Cta />
        <Footer />
      </ClosingBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
