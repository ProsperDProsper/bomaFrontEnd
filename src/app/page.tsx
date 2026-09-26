import { Hero } from "@/components/sections/Hero";
import { Workspace } from "@/components/sections/Workspace";
import { Audience } from "@/components/sections/Audience";
import { Product } from "@/components/sections/Product";
import { Reports } from "@/components/sections/Reports";
import { Faq, faqJsonLd } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Workspace />
      <Audience />
      <Product />
      <Reports />
      <Faq />
      <Cta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
