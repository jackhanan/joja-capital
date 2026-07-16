import {
  AboutContent,
  ContactContent,
  DealsContent,
  FooterContent,
  HeroContent,
  ServicesContent,
  SiteContent,
  TeamContent,
} from "./types";

export const defaultHero: HeroContent = {
  companyName: "JOJA Capital",
  tagline: "Financing the Deals That Build Cities",
  subheading:
    "JOJA Capital arranges debt and equity for commercial real estate owners and developers nationwide — bridge loans, construction financing, and permanent debt placed with precision and speed.",
  ctaPrimaryText: "Start Your Deal",
  ctaPrimaryHref: "#contact",
  ctaSecondaryText: "View Results",
  ctaSecondaryHref: "#results",
  backgroundImage: "",
  stats: [
    { id: "stat-1", label: "Total Closings", prefix: "$", value: 750, suffix: "M+" },
    { id: "stat-2", label: "Deals Closed", prefix: "", value: 120, suffix: "+" },
    {
      id: "stat-3",
      label: "Year Founded",
      prefix: "",
      value: 2015,
      suffix: "",
      noSeparator: true,
    },
  ],
};

export const defaultAbout: AboutContent = {
  eyebrow: "Who We Are",
  headline: "A Capital Markets Partner Built on Relationships and Results",
  paragraph1:
    "Placeholder copy: JOJA Capital is a commercial real estate financing and investment banking firm dedicated to helping owners, sponsors, and developers secure the capital they need to move forward. We work across asset classes and deal sizes, bringing an institutional network and a boutique level of attention to every transaction.",
  paragraph2:
    "Placeholder copy: Our team has arranged financing through every phase of the market cycle. We understand that every deal is different, and we structure each transaction around the outcome our clients actually need — not a one-size-fits-all product. Replace this paragraph with your firm's real story from the admin dashboard.",
  ctaText: "Learn More About Us",
  ctaHref: "#services",
  image: "",
};

export const defaultServices: ServicesContent = {
  eyebrow: "What We Do",
  headline: "Capital Solutions Across the Balance Sheet",
  subheading:
    "Placeholder subheading: from acquisition to disposition, JOJA Capital structures financing for every stage of the commercial real estate lifecycle.",
  items: [
    {
      id: "svc-1",
      number: "01",
      title: "Bridge Loans",
      description:
        "Placeholder: short-term financing to reposition, stabilize, or transition an asset ahead of permanent financing or sale.",
    },
    {
      id: "svc-2",
      number: "02",
      title: "Construction Financing",
      description:
        "Placeholder: ground-up and heavy rehab construction debt sourced from banks, debt funds, and private capital.",
    },
    {
      id: "svc-3",
      number: "03",
      title: "Permanent Debt Placement",
      description:
        "Placeholder: long-term fixed and floating rate financing placed with life companies, agencies, CMBS, and banks.",
    },
    {
      id: "svc-4",
      number: "04",
      title: "Mezzanine & Preferred Equity",
      description:
        "Placeholder: subordinate capital solutions to fill the gap between senior debt and sponsor equity.",
    },
    {
      id: "svc-5",
      number: "05",
      title: "Joint Venture Equity",
      description:
        "Placeholder: institutional and private equity capital introductions for value-add and ground-up developments.",
    },
    {
      id: "svc-6",
      number: "06",
      title: "Loan Sales & Advisory",
      description:
        "Placeholder: note sales, recapitalizations, and strategic advisory for owners navigating loan maturities.",
    },
  ],
};

export const defaultDeals: DealsContent = {
  eyebrow: "Track Record",
  headline: "Results That Speak for Themselves",
  subheading:
    "Placeholder subheading: a sample of recently closed transactions. Replace each card with your firm's real deal history from the admin dashboard.",
  bannerPrefix: "$",
  bannerValue: "1.2",
  bannerSuffix: " Billion+",
  bannerText: "in successful closings since 2015",
  items: [
    {
      id: "deal-1",
      image: "",
      amount: "$10.0M",
      dealType: "Bridge Loan",
      location: "Austin, TX",
    },
    {
      id: "deal-2",
      image: "",
      amount: "$24.5M",
      dealType: "Construction Financing",
      location: "Charlotte, NC",
    },
    {
      id: "deal-3",
      image: "",
      amount: "$8.2M",
      dealType: "Permanent Debt Placement",
      location: "Phoenix, AZ",
    },
    {
      id: "deal-4",
      image: "",
      amount: "$15.7M",
      dealType: "Mezzanine Financing",
      location: "Tampa, FL",
    },
    {
      id: "deal-5",
      image: "",
      amount: "$32.0M",
      dealType: "Joint Venture Equity",
      location: "Denver, CO",
    },
    {
      id: "deal-6",
      image: "",
      amount: "$6.4M",
      dealType: "Bridge Loan",
      location: "Nashville, TN",
    },
  ],
};

export const defaultTeam: TeamContent = {
  eyebrow: "Our Team",
  headline: "Meet the Team Behind the Deals",
  subheading: "Placeholder subheading: replace each profile with your real team from the admin dashboard.",
  items: [
    {
      id: "team-1",
      photo: "",
      name: "Jane Doe",
      title: "Managing Director",
      email: "jane.doe@example.com",
      phone: "(555) 010-0001",
    },
    {
      id: "team-2",
      photo: "",
      name: "John Smith",
      title: "Director, Capital Markets",
      email: "john.smith@example.com",
      phone: "(555) 010-0002",
    },
    {
      id: "team-3",
      photo: "",
      name: "Alex Johnson",
      title: "Vice President",
      email: "alex.johnson@example.com",
      phone: "(555) 010-0003",
    },
    {
      id: "team-4",
      photo: "",
      name: "Morgan Lee",
      title: "Associate",
      email: "morgan.lee@example.com",
      phone: "(555) 010-0004",
    },
  ],
};

export const defaultContact: ContactContent = {
  eyebrow: "Get In Touch",
  headline: "Let's Structure Your Next Deal",
  address: "123 Placeholder Ave, Suite 400, City, ST 00000",
  phone: "(555) 010-0000",
  email: "info@example.com",
  instagramUrl: "https://instagram.com/",
  linkedinUrl: "https://linkedin.com/",
  facebookUrl: "https://facebook.com/",
};

export const defaultFooter: FooterContent = {
  blurb: "Placeholder: JOJA Capital arranges debt and equity financing for commercial real estate owners and developers nationwide.",
  navLinks: [
    { id: "nav-1", label: "About", href: "#about" },
    { id: "nav-2", label: "Services", href: "#services" },
    { id: "nav-3", label: "Results", href: "#results" },
    { id: "nav-4", label: "Team", href: "#team" },
    { id: "nav-5", label: "Contact", href: "#contact" },
  ],
  copyrightText: `© ${new Date().getFullYear()} JOJA Capital. All rights reserved.`,
};

export const defaultContent: SiteContent = {
  hero: defaultHero,
  about: defaultAbout,
  services: defaultServices,
  deals: defaultDeals,
  team: defaultTeam,
  contact: defaultContact,
  footer: defaultFooter,
};
