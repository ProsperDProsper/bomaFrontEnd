/**
 * Every line of page copy. Written to sound like a person who has chased rent
 * before: concrete nouns, Tanzanian context, no software adjectives.
 */

export const hero = {
  eyebrow: "Property management software, made in Tanzania",
  headline: ["Know who has paid,", "before you have to ask."],
  lead:
    "BomaPM keeps rent, guest stays and building costs for every property in one place. Open it on the site, in the office, or on your phone between meetings.",
  primaryCta: "Ask for a demo",
  secondaryCta: "See what it does",
  sceneLabel:
    "A compound with an apartment block, a lodge and a building under construction, marked as rentals, short stays and a project.",
  sceneHint: "Drag to look around",
  markers: [
    { id: "rentals", label: "Rentals", note: "12 units let" },
    { id: "lodge", label: "Lodge", note: "3 rooms arriving" },
    { id: "project", label: "Project", note: "4 units going up" },
  ],
} as const;

export const overview = {
  eyebrow: "Overview",
  heading: "A clearer picture of every property.",
  lead:
    "Rent payments, guest bookings, building costs and daily expenses, gathered into one view. See what needs attention this morning, and how the year is actually going.",
  tabsLabel: "Choose what the workspace shows",
} as const;

export const audience = {
  eyebrow: "Who it is for",
  headingLead: "Built for",
  /** Cycles in the heading, so the section says who it is for without a list. */
  headingWords: [
    "landlords with four units.",
    "managers running six blocks.",
    "lodges that also let long-term.",
    "a family compound in Kinondoni.",
  ],
  note: "However your records are kept today.",
  items: [
    {
      title: "Owners and managers across Tanzania",
      body: "Whether your records live in a notebook, a spreadsheet, or a folder of payment confirmations on your phone.",
    },
    {
      title: "Your team, on the properties they run",
      body: "A caretaker sees the block they look after. A receptionist sees the lodge. You keep the whole portfolio in view.",
    },
    {
      title: "Wherever you happen to be",
      body: "A browser is enough. Nothing to install, nothing to carry, and the same figures on a phone as on a laptop.",
    },
  ],
} as const;

export const product = {
  eyebrow: "What it does",
  heading: "From collecting rent to seeing a building pay for itself.",
  lead: "Four kinds of record, kept against the properties they belong to.",
  hint: "Choose a unit to see its record",
  screenCta: "See this with your own properties",
  sections: [
    {
      id: "rentals",
      kicker: "Monthly rentals",
      heading: ["Know who has paid.", "Know what is due."],
      body:
        "The agreement, the payment history and the next rent date sit together. No scrolling back through receipts or old conversations to work out where a tenant stands.",
      features: [
        { title: "Tenant and lease records", body: "Each tenancy stays attached to the right unit." },
        { title: "Signed PDF agreements", body: "Generate the lease, sign it, keep it with the tenancy." },
        { title: "Paid-until dates", body: "See how far a payment carries the rent, to the day." },
        { title: "SMS reminders", body: "Tenants hear from the system before the rent date, not after." },
      ],
    },
    {
      id: "stays",
      kicker: "Short stays and lodges",
      heading: ["Be ready", "for the next guest."],
      body:
        "Who is arriving, what they still owe, and whether the room has been cleaned. Bookings, guest payments and readiness in one place instead of three books.",
      features: [
        { title: "Availability by date", body: "Find an open room before you confirm the stay." },
        { title: "Reservations and payments", body: "Guest details, dates and money in one record." },
        { title: "Balances and extras", body: "Follow what is still owed as a stay changes." },
        { title: "Room readiness", body: "Checkout, cleaning, ready — visible to the whole team." },
      ],
    },
    {
      id: "projects",
      kicker: "Building projects",
      heading: ["Watch a building", "start paying for itself."],
      body:
        "A block can earn from its first finished units while the rest are still going up. Keep the spending against the building, then follow what comes back in rent.",
      features: [
        { title: "Project plans", body: "Scope, dates and budget kept in one place." },
        { title: "Materials, labour and site costs", body: "Record spending as the work happens." },
        { title: "Finished units into rental", body: "Let a completed unit without losing its build history." },
        { title: "Investment recovery", body: "Rent collected against what the building cost." },
      ],
    },
  ],
} as const;

export const reports = {
  eyebrow: "Reports",
  heading: "What a property earns, after what it costs.",
  lead:
    "Income, running costs and the price of empty days — for one property or the whole portfolio. Building investment is kept out of running costs, so the profit line stays honest.",
  disclaimer: "At current rents, before running costs. Not a guaranteed return.",
  cards: {
    profit: { label: "Operating profit", note: "Rent and guest payments, less everyday costs." },
    vacancy: { label: "Lost to empty days", note: "What unoccupied space cost you this month." },
    investment: { label: "Built into the annex", note: "Kept out of running costs, so profit stays clear." },
  },
} as const;

export const faq = {
  eyebrow: "Questions",
  heading: "Before you get started.",
  lead: "If your question is not here, send it on WhatsApp or call {phone}.",
  items: [
    {
      q: "Who is BomaPM for?",
      a: "Landlords with a few units, managers running several blocks, and lodge owners who also let long-term. If you collect rent or host guests in Tanzania, it fits.",
    },
    {
      q: "Can I keep different kinds of property in one account?",
      a: "Yes. Apartments, lodge rooms and a building still under construction sit in the same account. Look at one property on its own, or all of them together.",
    },
    {
      q: "Can my staff use it?",
      a: "Yes. Give each person the properties they are responsible for. A caretaker records a payment for their block without seeing the rest of your portfolio.",
    },
    {
      q: "Does it work on a phone?",
      a: "It runs in the browser, so there is nothing to install. The same account opens on a phone on site and on a laptop at the office.",
    },
    {
      q: "How do I get started?",
      a: "Ask for a demo on WhatsApp. We set up your properties and units, bring your current tenants and balances across, and show your team how to record a payment.",
    },
  ],
} as const;

export const cta = {
  heading: "See BomaPM on your own properties.",
  body:
    "Tell us what you manage and which records you want in order. We will show you the parts that matter for your properties and answer your questions.",
  primary: "Ask for a demo",
  signIn: {
    heading: "Already have an account?",
    body: "Go straight to your workspace.",
    label: "Your BomaPM address",
    placeholder: "e.g. masau",
    suffix: ".bomapm.com",
    button: "Continue to sign in",
    note: "Use the name before .bomapm.com in your account address.",
    demoNote: "This demo has no backend — sign-in is for show.",
  },
} as const;
