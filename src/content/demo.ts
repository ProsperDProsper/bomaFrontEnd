/**
 * The records shown inside the product screens. Invented, and labelled as such
 * wherever they appear — no real tenant, guest or figure is on this site.
 */

export type Tone = "due" | "ready" | "moved" | "neutral";

export const workspace = {
  brandLine: "3 properties · 14 July 2026",
  /** Cycles in the mock search field so the screen looks like someone is using it. */
  searchQueries: [
    "Asha M., Apartment A2",
    "rent overdue this week",
    "Twiga Room, July",
    "cement, annex expenses",
  ],
  nav: ["Dashboard", "Properties", "Bomas", "Finance", "Reports"],
  tabs: [
    {
      id: "today",
      label: "Today",
      summary: "What needs attention this morning.",
      metrics: [
        { label: "Rent due this week", value: 4_200_000, note: "2 units overdue", tone: "due" as Tone },
        { label: "Rent collected in July", value: 8_400_000, note: "67% of expected", tone: "ready" as Tone },
        { label: "Lodge check-ins", value: 3, unit: "rooms", note: "2 ready, 1 cleaning", tone: "neutral" as Tone },
        { label: "Project spend to date", value: 18_400_000, note: "Recorded building costs", tone: "neutral" as Tone },
      ],
      rows: [
        { title: "Unit B4, Mlimani Court", meta: "Juma K., overdue 4 days", tag: "Rent overdue", tone: "due" as Tone },
        { title: "Room 08, Coast Lodge", meta: "Arriving 14:00, balance paid in full", tag: "Ready", tone: "ready" as Tone },
        { title: "Annex, Mlimani Court", meta: "Units 1 and 2 completed", tag: "Moved to rental", tone: "moved" as Tone },
      ],
    },
    {
      id: "rent",
      label: "Rent",
      summary: "Collection against what was expected.",
      metrics: [
        { label: "Expected in July", value: 12_600_000, note: "Across 14 let units", tone: "neutral" as Tone },
        { label: "Collected", value: 8_400_000, note: "11 units paid", tone: "ready" as Tone },
        { label: "Still due", value: 4_200_000, note: "3 units outstanding", tone: "due" as Tone },
        { label: "Reminders sent", value: 9, unit: "SMS", note: "Before the rent date", tone: "neutral" as Tone },
      ],
      rows: [
        { title: "Apartment A2, Mlimani Court", meta: "Asha M., paid until 12 Jun", tag: "Rent due", tone: "due" as Tone },
        { title: "Apartment A1, Mlimani Court", meta: "Paid 2 months in advance", tag: "Paid", tone: "ready" as Tone },
        { title: "Unit B3, Mlimani Court", meta: "Reminder scheduled for 5 Aug", tag: "Reminder set", tone: "neutral" as Tone },
      ],
    },
    {
      id: "lodge",
      label: "Lodge",
      summary: "Tonight's arrivals and room readiness.",
      metrics: [
        { label: "Arriving today", value: 3, unit: "guests", note: "Twiga, Simba, Room 08", tone: "neutral" as Tone },
        { label: "Occupied tonight", value: 7, unit: "of 9", note: "78% of rooms", tone: "ready" as Tone },
        { label: "Guest balances", value: 150_000, note: "One stay part-paid", tone: "due" as Tone },
        { label: "Rooms cleaning", value: 1, unit: "room", note: "Kifaru, ready by 13:00", tone: "neutral" as Tone },
      ],
      rows: [
        { title: "Twiga Room, Coast Lodge", meta: "Neema K., 2 guests, 3 nights", tag: "Reserved", tone: "neutral" as Tone },
        { title: "Room 08, Coast Lodge", meta: "Arriving 14:00, paid in full", tag: "Ready", tone: "ready" as Tone },
        { title: "Kifaru Room, Coast Lodge", meta: "Checked out 10:20", tag: "Cleaning", tone: "due" as Tone },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      summary: "What the annex has cost, and what it has returned.",
      metrics: [
        { label: "Invested to date", value: 64_800_000, note: "Materials, labour and site", tone: "neutral" as Tone },
        { label: "Units in rental use", value: 2, unit: "of 4", note: "Annex, ground floor", tone: "ready" as Tone },
        { label: "Rent from the annex", value: 1_200_000, note: "Since units were let", tone: "ready" as Tone },
        { label: "Spend this month", value: 3_400_000, note: "Roofing and fittings", tone: "due" as Tone },
      ],
      rows: [
        { title: "Units 01–02, Mlimani annex", meta: "Completed, let from 1 July", tag: "Earning", tone: "ready" as Tone },
        { title: "Units 03–04, Mlimani annex", meta: "Block work and plaster", tag: "Under construction", tone: "neutral" as Tone },
        { title: "Lodge wing", meta: "Foundations, awaiting drawings", tag: "Planned", tone: "neutral" as Tone },
      ],
    },
  ],
  chart: {
    heading: "Rent collection, July",
    collectedLabel: "Collected",
    expectedLabel: "Expected",
    dueLabel: "Still due",
    collected: 8_400_000,
    expected: 12_600_000,
    due: 4_200_000,
  },
} as const;

/** Monthly rentals screen: pick a unit, see the tenancy behind it. */
export const rentals = {
  property: "Mlimani Court",
  action: "Record payment",
  listLabel: "Units",
  units: [
    {
      id: "a1",
      name: "Apartment A1",
      tenant: "Baraka N.",
      initials: "BN",
      status: "Paid",
      tone: "ready" as Tone,
      rent: 650_000,
      paidUntil: "30 Sep 2026",
      balance: 0,
      activity: [
        { title: "Rent recorded", meta: "1 Jul – 30 Sep, 3 months", amount: 1_950_000 },
        { title: "Lease agreement", meta: "Signed PDF stored", amount: null },
        { title: "SMS reminder", meta: "Sent 26 Jun", amount: null },
      ],
    },
    {
      id: "a2",
      name: "Apartment A2",
      tenant: "Asha M.",
      initials: "AM",
      status: "Rent due",
      tone: "due" as Tone,
      rent: 600_000,
      paidUntil: "12 Jun 2026",
      balance: 1_200_000,
      activity: [
        { title: "Rent recorded", meta: "13 Apr – 12 Jun, 2 months", amount: 1_200_000 },
        { title: "Lease agreement", meta: "Signed PDF stored", amount: null },
        { title: "SMS reminder", meta: "Scheduled for 5 Aug", amount: null },
      ],
    },
    {
      id: "b3",
      name: "Apartment B3",
      tenant: "Sophia L.",
      initials: "SL",
      status: "Paid",
      tone: "ready" as Tone,
      rent: 580_000,
      paidUntil: "31 Aug 2026",
      balance: 0,
      activity: [
        { title: "Rent recorded", meta: "1 Jul – 31 Aug, 2 months", amount: 1_160_000 },
        { title: "Deposit held", meta: "One month, refundable", amount: 580_000 },
        { title: "Lease agreement", meta: "Signed PDF stored", amount: null },
      ],
    },
    {
      id: "b4",
      name: "Unit B4",
      tenant: "Juma K.",
      initials: "JK",
      status: "Overdue",
      tone: "due" as Tone,
      rent: 500_000,
      paidUntil: "10 Jul 2026",
      balance: 500_000,
      activity: [
        { title: "Rent recorded", meta: "11 Jun – 10 Jul, 1 month", amount: 500_000 },
        { title: "SMS reminder", meta: "Sent 6 Jul, unanswered", amount: null },
        { title: "Note", meta: "Promised payment on 18 Jul", amount: null },
      ],
    },
  ],
  labels: {
    monthlyRent: "Monthly rent",
    paidUntil: "Paid until",
    balance: "Balance",
    activity: "Recent activity",
    tenant: "Tenant",
  },
} as const;

/** Short stays screen: pick a room, see the booking. */
export const stays = {
  property: "Coast Lodge",
  action: "New booking",
  listLabel: "Rooms",
  nightsLabel: "nights",
  calendarLabel: "July",
  rooms: [
    {
      id: "twiga",
      name: "Twiga Room",
      guest: "Neema K.",
      guests: "2 guests",
      status: "Reserved",
      tone: "neutral" as Tone,
      nights: 3,
      from: 16,
      to: 19,
      charges: 450_000,
      paid: 300_000,
      readiness: "Cleaning",
    },
    {
      id: "simba",
      name: "Simba Room",
      guest: "Peter O.",
      guests: "1 guest",
      status: "In house",
      tone: "ready" as Tone,
      nights: 2,
      from: 14,
      to: 16,
      charges: 320_000,
      paid: 320_000,
      readiness: "Occupied",
    },
    {
      id: "tembo",
      name: "Tembo Room",
      guest: "Available",
      guests: "Sleeps 3",
      status: "Open",
      tone: "ready" as Tone,
      nights: 0,
      from: 0,
      to: 0,
      charges: 0,
      paid: 0,
      readiness: "Ready",
    },
    {
      id: "kifaru",
      name: "Kifaru Room",
      guest: "Checked out 10:20",
      guests: "Turnaround",
      status: "Cleaning",
      tone: "due" as Tone,
      nights: 0,
      from: 0,
      to: 0,
      charges: 0,
      paid: 0,
      readiness: "Cleaning",
    },
  ],
  labels: {
    charges: "Stay charges",
    paid: "Payment received",
    balance: "Balance due",
    readiness: "Room readiness",
    dates: "Stay dates",
  },
} as const;

/** Building projects screen: pick a building, see cost against return. */
export const projects = {
  screenTitle: "Projects",
  action: "Add expense",
  listLabel: "Buildings",
  buildings: [
    {
      id: "annex",
      name: "Mlimani Court annex",
      subtitle: "New building, 4 units",
      inUse: 2,
      unitTotal: 4,
      recovered: 1.9,
      costs: 64_800_000,
      collected: 1_200_000,
      payback: "Earning from 2 units",
      units: [
        { name: "Units 01–02", state: "Completed, let from 1 July", done: true },
        { name: "Units 03–04", state: "Block work and plaster", done: false },
      ],
    },
    {
      id: "wing",
      name: "Lodge wing",
      subtitle: "6 rooms, planned",
      inUse: 0,
      unitTotal: 6,
      recovered: 0,
      costs: 11_500_000,
      collected: 0,
      payback: "Not yet earning",
      units: [
        { name: "Foundations", state: "Excavation complete", done: true },
        { name: "Rooms 01–06", state: "Awaiting drawings", done: false },
      ],
    },
  ],
  labels: {
    inUse: "In rental use",
    recovered: "Investment recovered",
    costs: "Project costs",
    collected: "Rent collected",
    payback: "Estimated payback",
  },
} as const;

/** Reports screen. */
export const reportData = {
  period: "Monthly report · all properties · July 2026",
  profit: 10_700_000,
  income: [
    { label: "Rentals", value: 7_200_000 },
    { label: "Short stays", value: 2_300_000 },
    { label: "Lodges", value: 1_200_000 },
  ],
  runningCosts: 2_100_000,
  vacancy: {
    total: 772_000,
    rows: [
      { label: "Apartment A2", value: 0, occupied: 30 },
      { label: "Unit B4", value: 232_000, occupied: 18 },
      { label: "Twiga Room", value: 300_000, occupied: 12 },
      { label: "Room 08", value: 240_000, occupied: 21 },
    ],
    legendLet: "Let or booked",
    legendEmpty: "Empty",
    daysLabel: "days of 30",
  },
  investment: {
    thisMonth: 3_400_000,
    toDate: 64_800_000,
    unitsInUse: "2 of 4",
    runningCosts: 2_100_000,
    labels: {
      investment: "Building investment",
      running: "Running costs",
      toDate: "Invested to date",
      units: "Units in rental use",
    },
  },
  incomeLabel: "Income",
  costsLabel: "Running costs",
} as const;
