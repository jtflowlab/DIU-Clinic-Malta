export interface Clinician {
  id: string;
  name: string;
  category: 'specialists' | 'general' | 'support';
  role: string;
  qualifications: string;
  badge: string;
  photo: string;
  bio: string;
  treatmentDefault?: string;
}

export interface ServiceItem {
  num: string;
  id: string;
  title: string;
  tagline: string;
  image: string;
  bgClass: string;
  accentColor: string;
  isGold?: boolean;
  summary: string;
  bullets: string[];
  desc: string;
  clinicians?: string[];
}

export interface FeeItem {
  name: string;
  price: string;
  features: string[];
}

export interface FeeCategory {
  title: string;
  description: string;
  items: FeeItem[];
}

export interface PatientReview {
  author: string;
  photo: string;
  treatment: string;
  clinic: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  num: string;
  q: string;
  a: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  content: string[];
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactPreference: 'WhatsApp' | 'Call Back' | 'Email';
  clinic: string;
  treatment: string;
  doctor: string;
  urgency: string;
  notes: string;
}
