import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bomapm.com"),
  title: "BomaPM — property management software for Tanzania",
  description:
    "Rent, guest stays and building costs for every property in one place. Know who has paid, who is arriving, and what each property costs to run.",
  openGraph: {
    title: "BomaPM — property management software for Tanzania",
    description:
      "Rent, guest stays and building costs for every property in one place. Built for landlords, managers and lodge owners in Tanzania.",
    type: "website",
    locale: "en_TZ",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          // Applies the saved theme (or the system one) before the first paint.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("boma-theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-(--color-btn) focus:px-5 focus:py-3 focus:text-white"
        >
          {site.microcopy.skipToContent}
        </a>
        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
