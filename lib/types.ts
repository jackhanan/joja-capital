export interface HeroStat {
  id: string;
  label: string;
  prefix: string;
  value: number;
  suffix: string;
}

export interface HeroContent {
  companyName: string;
  tagline: string;
  subheading: string;
  // Also doubles as the "Start Your Deal" nav bar button text -- both
  // always link to /start-your-deal (see Hero.tsx and Nav.tsx).
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  backgroundImage: string;
  stats: HeroStat[];
}

export interface AboutContent {
  eyebrow: string;
  headline: string;
  paragraph1: string;
  paragraph2: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  eyebrow: string;
  headline: string;
  subheading: string;
  items: ServiceItem[];
  // Rendered by Ticker.tsx as a continuous scrolling band directly above
  // this section, with a dot separator auto-inserted between each item.
  tickerItems: string[];
}

export interface DealItem {
  id: string;
  image: string;
  amount: string;
  dealType: string;
  location: string;
  assetType?: string;
  units?: string;
  rate?: string;
  transactionDetails?: string;
}

export interface DealsContent {
  eyebrow: string;
  headline: string;
  subheading: string;
  bannerPrefix: string;
  bannerValue: string;
  bannerSuffix: string;
  bannerText: string;
  items: DealItem[];
}

export interface TeamMember {
  id: string;
  photo: string;
  name: string;
  title: string;
  email: string;
  phone: string;
}

export interface TeamContent {
  eyebrow: string;
  headline: string;
  subheading: string;
  items: TeamMember[];
}

export interface ContactContent {
  eyebrow: string;
  headline: string;
  address: string;
  phone: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
  adminEmail: string;
  loanTypeOptions: string[];
  propertyTypeOptions: string[];
}

export interface DealLeadInput {
  firstName: string;
  lastName: string;
  countryCode: string;
  mobile: string;
  email: string;
  loanType: string;
  propertyType: string;
  loanSize: string;
  details: string;
}

export interface FooterNavLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterContent {
  blurb: string;
  navLinks: FooterNavLink[];
  copyrightText: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  deals: DealsContent;
  team: TeamContent;
  contact: ContactContent;
  footer: FooterContent;
}

export type ContentKey = keyof SiteContent;
