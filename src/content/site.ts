/** Brand, navigation and contact details. No component hardcodes user-facing text. */

const phone = "+255 673 639 788";
const whatsappText =
  "Hello BomaPM, I would like to arrange a demo and discuss managing my properties.";

export const site = {
  brand: {
    name: "BomaPM",
    logoSrc: "/brand/bomapm-logo.png",
    tagline: "Property management for Tanzania",
    homeLinkLabel: "BomaPM, back to the top",
  },
  nav: {
    label: "Main",
    items: [
      { label: "Overview", href: "#overview" },
      { label: "What it does", href: "#product" },
      { label: "Reports", href: "#reports" },
      { label: "Questions", href: "#questions" },
    ],
    cta: { label: "Ask for a demo" },
    signIn: { label: "Sign in" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  contact: {
    phone,
    phoneHref: "tel:+255673639788",
    whatsappHref: `https://wa.me/255673639788?text=${encodeURIComponent(whatsappText)}`,
    whatsappLabel: "WhatsApp",
  },
  footer: {
    statement: "Rent, guest stays and building costs, kept in order.",
    columnsLabel: "Sections",
    legal: "Property management for Tanzania.",
    copyright: "© {year} BomaPM",
    links: [
      { label: "Overview", href: "#overview" },
      { label: "What it does", href: "#product" },
      { label: "Reports", href: "#reports" },
      { label: "Questions", href: "#questions" },
      { label: "Getting started", href: "#start" },
    ],
  },
  microcopy: {
    illustrative: "Illustrative records",
    illustrativeFigures: "Illustrative figures",
    skipToContent: "Skip to content",
    demoNotice: "Demonstration screen. No live account data is shown.",
  },
} as const;
