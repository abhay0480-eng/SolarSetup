export interface Company {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  description: string;
  footerDescription: string;
  philosophyQuote: string;
  fullPhilosophyQuote: string;
  philosophyAttribution: string;
  phones: string[];
  email: string;
  address: string;
  addressShort: string;
  website: string;
  socials: string[];
  badgeText: string;
  govtBadge: { title: string; subtitle: string };
  copyrightText: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface HeroFeature {
  icon: string;
  text: string;
}

export interface HeroStat {
  value: string;
  unit: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  name: string;
  location: string;
  system: string;
  rating: number;
  text: string;
  savings: string;
}

export interface Differentiator {
  icon: string;
  title: string;
  desc: string;
  color: string;
  shadow: string;
  borderColor: string;
  bgColor: string;
}

export interface SystemTypeCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  gradient: string;
  border: string;
  glow: string;
  iconBg: string;
  features: string[];
  suitable: string;
  priceRange: string;
  path: string;
}

export interface Project {
  name: string;
  location: string;
  capacity: string;
  type: string;
  description: string;
  imageKey: string;
}

export interface GalleryCategory {
  key: string;
  label: string;
}

export interface GalleryItem {
  imageKey: string;
  alt: string;
  caption: string;
  category: string;
}
