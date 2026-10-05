import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  X, 
  ChevronDown, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Smile, 
  ChevronRight,
  ChevronLeft,
  Calendar,
  Layers,
  Award,
  CheckCheck,
  Copy,
  Check,
  User,
  MessageSquare,
  ShieldCheck,
  Send,
  Smartphone,
  Heart,
  Shield,
  Activity,
  Navigation,
  FileText,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CinematicFooter } from '@/components/ui/motion-footer';

gsap.registerPlugin(ScrollToPlugin);

// Asset URL resolver
const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

// Official Logo SVG
const LogoMark = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 34 51" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#3EA3AC"/>
    <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#3EA3AC"/>
    <path d="M0 10.0222L8.75654 0L33.4809 10.0222L27.5573 50.882L0 10.0222Z" fill="#142B4D"/>
  </svg>
);

const FullLogo = ({ className = "h-9 w-auto", light = false }: { className?: string; light?: boolean }) => {
  const primaryColor = light ? "#FFFFFF" : "#142B4D";
  return (
    <svg viewBox="0 0 128 51" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M45.328 48.8262V12.2065H57.6901C62.7123 12.2065 66.7042 12.9775 69.5372 14.3909C72.499 15.9327 74.8169 18.1171 76.491 20.9439C78.165 23.7706 79.0664 26.9829 79.0664 30.4521C79.0664 32.8934 78.5513 35.2062 77.6499 37.519C76.7485 39.7034 75.332 41.7592 73.658 43.4296C71.8551 45.2284 69.7948 46.5133 67.4769 47.4128C66.0604 47.9267 64.7726 48.3122 63.6137 48.4407C62.4547 48.8262 60.2656 48.8262 57.0463 48.8262H45.328ZM57.1751 16.9607H50.6076V44.2005H57.3038C59.8793 44.2005 61.9396 44.072 63.4849 43.6866C64.9014 43.3011 66.1891 42.9156 67.0905 42.2732C68.1207 41.7592 68.8934 40.9883 69.7948 40.2173C72.3702 37.6475 73.658 34.3068 73.658 30.1951C73.658 26.2119 72.3702 22.9997 69.666 20.5584C68.6358 19.659 67.6056 18.888 66.3179 18.2456C65.0302 17.6031 63.8712 17.2176 62.7123 17.0892C61.5533 16.9607 59.7505 16.9607 57.1751 16.9607Z" fill={primaryColor}/>
        <path d="M84.7324 19.9159H90.0121V48.9546H84.7324V19.9159Z" fill={primaryColor}/>
        <path d="M122.72 12.2065H128V33.0219C128 35.8487 127.742 38.033 127.356 39.4464C126.97 40.8598 126.455 42.0162 125.811 43.0441C125.167 43.9435 124.523 44.843 123.622 45.6139C120.66 48.0552 116.926 49.3401 112.161 49.3401C107.396 49.3401 103.533 48.0552 100.571 45.6139C99.67 44.843 98.8974 43.9435 98.3823 43.0441C97.7385 42.1447 97.2234 40.8598 96.837 39.5749C96.4507 38.1615 96.1932 35.9772 96.1932 33.0219V12.2065H101.473V33.0219C101.473 36.4911 101.859 38.9324 102.632 40.2173C103.404 41.5022 104.563 42.6586 106.237 43.4296C107.911 44.2005 109.714 44.7145 111.903 44.7145C114.994 44.7145 117.569 43.9435 119.501 42.2732C120.531 41.3737 121.304 40.3458 121.69 39.1894C122.205 38.033 122.334 35.9772 122.334 33.0219V12.2065H122.72Z" fill={primaryColor}/>
        <path d="M90.012 12.2065H84.7324V17.0892H90.012V12.2065Z" fill="#3EA3AC"/>
        <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#3EA3AC"/>
        <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#3EA3AC"/>
        <path d="M0 10.0222L8.75654 0L33.4809 10.0222L27.5573 50.882L0 10.0222Z" fill={primaryColor}/>
      </g>
    </svg>
  );
};

// Official WhatsApp Vector Icon
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16C10.66 20.16 9.3 19.8 8.1 19.09L7.81 18.92L4.7 19.73L5.53 16.7L5.34 16.39C4.55 15.14 4.13 13.55 4.13 11.91C4.13 7.37 7.82 3.67 12.05 3.67ZM9.08 7.39C8.91 7.39 8.68 7.46 8.48 7.68C8.28 7.9 7.72 8.42 7.72 9.48C7.72 10.55 8.5 11.58 8.61 11.72C8.72 11.87 10.13 14.04 12.3 14.98C12.82 15.2 13.22 15.34 13.54 15.44C14.06 15.61 14.54 15.58 14.91 15.53C15.33 15.46 16.19 15.01 16.37 14.51C16.55 14.01 16.55 13.58 16.5 13.49C16.44 13.4 16.3 13.34 16.08 13.23C15.86 13.12 14.79 12.59 14.59 12.52C14.39 12.45 14.25 12.41 14.11 12.63C13.97 12.85 13.57 13.34 13.45 13.48C13.33 13.62 13.21 13.64 12.99 13.53C12.77 13.42 12.06 13.18 11.22 12.43C10.56 11.84 10.12 11.12 9.99 10.9C9.86 10.68 9.98 10.56 10.09 10.45C10.19 10.35 10.31 10.19 10.42 10.06C10.53 9.93 10.57 9.83 10.64 9.68C10.71 9.53 10.68 9.41 10.62 9.3C10.56 9.19 10.12 8.11 9.94 7.67C9.76 7.24 9.58 7.3 9.44 7.29C9.31 7.29 9.18 7.39 9.08 7.39Z" />
  </svg>
);

// Clinicians & Team Data
interface Clinician {
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

const cliniciansList: Clinician[] = [
  // 1. Specialists & Surgeons
  {
    id: 'dr-mark',
    name: 'Dr. Mark Diacono',
    category: 'specialists',
    role: 'Principal Specialist Oral Surgeon',
    qualifications: 'RGN, BChD Hons (Leeds), FDS RCPS (Glasg)',
    badge: 'Co-Founder & Clinical Director',
    photo: 'team/dr_mark_diacono_principle_oral_surgeon.jpg',
    bio: 'Over 25 years specializing in surgical implantology, immediate All-on-4 loading, bone grafting and hospital surgeries inside St. James Hospital.',
    treatmentDefault: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)'
  },
  {
    id: 'dr-susanna',
    name: 'Dr. Susanna Diacono',
    category: 'specialists',
    role: 'Restorative Dentist & DSD Master',
    qualifications: 'DDS (Gothenburg), LDS (Sweden), M.Dent.Sci Restorative (Leeds)',
    badge: 'Co-Founder & DSD Lead',
    photo: 'team/dr._susanna_diacono_principle_restoratve_dentist_&_co-founder.jpg',
    bio: 'Pioneered Digital Smile Design in Malta. Master in Scandinavian restorative dentistry, CEREC CAD/CAM ceramics, and aesthetic veneers.',
    treatmentDefault: 'Digital Smile Design (DSD Mockup)'
  },
  {
    id: 'prof-nikolai',
    name: 'Prof. Nikolai Attard',
    category: 'specialists',
    role: 'Specialist Prosthodontist',
    qualifications: 'BChD Hons (Melit), MSc (Toronto), PhD (Toronto)',
    badge: 'Prosthodontic Consultant',
    photo: 'team/prof_nikolai_attard.jpg',
    bio: 'Internationally recognized academic and clinician specializing in complex implant prosthetics, full arch oral rehabilitation and occlusal restoration.',
    treatmentDefault: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)'
  },
  {
    id: 'dr-fokion',
    name: 'Dr. Fokion Iatridis',
    category: 'specialists',
    role: 'Specialist Prosthodontist',
    qualifications: 'DDS, CAGS',
    badge: 'Fixed & Removable Prosthetics',
    photo: 'team/dr_fokion_iatridis.jpg',
    bio: 'Specialist in full aesthetic transformations, high-precision CEREC crowns, inlays, and fixed prosthetic reconstructions.',
    treatmentDefault: 'CEREC 3D Ceramics & Veneers (60-Minute Milling)'
  },
  {
    id: 'dr-laura',
    name: 'Dr. Laura Cuschieri',
    category: 'specialists',
    role: 'Digital Dentistry & Composite Bonding',
    qualifications: 'MDS (Melit), MSc Digital Dentistry with Distinction',
    badge: 'Aesthetic & Digital Specialist',
    photo: 'team/dr_laura_cuschieri.jpg',
    bio: 'Specializing in minimally invasive smile enhancements, optical 3D digital impressions, and biomimetic cosmetic composite bonding.',
    treatmentDefault: 'Digital Smile Design (DSD Mockup)'
  },

  // 2. General & Paediatric Dentists
  {
    id: 'dr-lisa',
    name: 'Dr. Lisa Gatt',
    category: 'general',
    role: 'General & Aesthetic Dentist',
    qualifications: 'BChD, Restorative Practice',
    badge: 'Family & Preventive Care',
    photo: 'team/dr._lisa_gatt_general_dentist.jpg',
    bio: 'Dedicated to thorough clinical check-ups, aesthetic ceramic restorations, and gentle preventive dentistry for patients of all ages.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },
  {
    id: 'dr-michael',
    name: 'Dr. Michael Rafferty',
    category: 'general',
    role: 'General Dentist',
    qualifications: 'BChD, Comprehensive Dental Care',
    badge: 'General & Restorative Practice',
    photo: 'team/dr._michael_rafferty_general_dentist.jpg',
    bio: 'Committed to comprehensive family dental health, minimally invasive tooth preservation, and patient-centered clinical care.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },
  {
    id: 'dr-francesca',
    name: 'Dr. Francesca Schembri',
    category: 'general',
    role: 'General & Paediatric Dentist',
    qualifications: 'BChD, Special Interest in Children’s Dentistry',
    badge: 'Paediatric & Gentle Care',
    photo: 'team/dr.francesca_schembri_general_and_paediatric_dentist.jpg',
    bio: 'Passionate about creating positive dental experiences for infants, children, and nervous young teens in a comforting, friendly environment.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },
  {
    id: 'mrs-mary-jane',
    name: 'Mrs. Mary-Jane Galea',
    category: 'general',
    role: 'Dental Hygienist',
    qualifications: 'Registered Dental Hygienist',
    badge: 'Periodontal Prevention',
    photo: 'team/mrs_mary-jane_galea_dental_hyginist.jpg',
    bio: 'Specialist in ultrasonic periodontal hygiene, gentle stain removal, implant maintenance, and personalized oral preventive regimens.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },

  // 3. Clinical Support & Nursing Team
  {
    id: 'ms-aneta',
    name: 'Ms. Aneta Mileska',
    category: 'support',
    role: 'Dental Nurse & DSD Coordinator',
    qualifications: 'Lead DSD Digital Workflow Coordinator',
    badge: 'Smile Design Coordinator',
    photo: 'team/ms_aneta_mileska_dsd_coordinator.jpg',
    bio: 'Guides patients step-by-step through 3D facial aesthetic capture, virtual smile mockups, and coordinated clinician treatment plans.',
    treatmentDefault: 'Digital Smile Design (DSD Mockup)'
  },
  {
    id: 'mrs-sue',
    name: 'Mrs. Sue Lanzon',
    category: 'support',
    role: 'Clinic Manager',
    qualifications: 'Clinical Operations Director',
    badge: 'Hospital Operations',
    photo: 'team/mrs_sue_lanzon_clinic_manager.jpg',
    bio: 'Oversees patient coordination, clinical standards, and hospital operating theatre scheduling across our Sliema and San Pawl suites.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },
  {
    id: 'mrs-christa',
    name: 'Mrs. Christa Rudrum',
    category: 'support',
    role: 'Patient Reception Coordinator',
    qualifications: 'Front-of-House Patient Care',
    badge: 'Welcoming Team',
    photo: 'team/mrs_christa_rudrum_reception.jpg',
    bio: 'Welcomes patients to St. James Hospital, coordinates appointment logistics, and ensures a seamless, serene visit from arrival to departure.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },
  {
    id: 'mrs-diane',
    name: 'Mrs. Diane Capello',
    category: 'support',
    role: 'Patient Reception Coordinator',
    qualifications: 'Front-of-House Patient Care',
    badge: 'Welcoming Team',
    photo: 'team/mrs_diane_capello_reception.jpg',
    bio: 'Dedicated patient coordinator assisting with insurance inquiries, scheduling, and ensuring warm hospitable patient intake.',
    treatmentDefault: 'Comprehensive Consultation & 3D CBCT Scan'
  },
  {
    id: 'ms-candy',
    name: 'Ms. Candy Dowling',
    category: 'support',
    role: 'Head Nurse',
    qualifications: 'Senior Clinical Nursing Lead',
    badge: 'Clinical Lead',
    photo: 'team/ms_candy_dowling_head_nurse.jpg',
    bio: 'Oversees surgical nurse teams, sterilization compliance, and patient comfort protocols during all dental operations.',
    treatmentDefault: 'Certified IV Sedation (100% Anxiety & Pain Free)'
  },
  {
    id: 'maria-camilleri',
    name: 'Ms. Maria Camilleri',
    category: 'support',
    role: 'Surgical Dental Nurse',
    qualifications: 'Hospital Surgical Nurse',
    badge: 'Surgical Theatre',
    photo: 'team/maria_camilleri_surgical_nurse.jpg',
    bio: 'Assists senior oral surgeons during implantology and maxillofacial surgeries inside St. James Hospital sterile theatres.',
    treatmentDefault: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)'
  },
  {
    id: 'mrs-sonia',
    name: 'Mrs. Sonia Madiona',
    category: 'support',
    role: 'Restorative Dental Nurse',
    qualifications: 'Restorative Care Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/mrs_sonia_madiona_restorative_dental_nurse.jpg',
    bio: 'Assists during CEREC ceramic restorations and aesthetic chairside procedures with attentive, compassionate care.',
    treatmentDefault: 'CEREC 3D Ceramics & Veneers (60-Minute Milling)'
  },
  {
    id: 'ms-charlotte',
    name: 'Ms. Charlotte Camenzuli',
    category: 'support',
    role: 'Restorative Dental Nurse',
    qualifications: 'Restorative Care Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/ms_charlotte_camenzuli_restorative_dental_nurse.jpg',
    bio: 'Provides focused chairside nursing assistance and patient reassurance during restorative dental treatments.',
    treatmentDefault: 'CEREC 3D Ceramics & Veneers (60-Minute Milling)'
  },
  {
    id: 'ms-kelly',
    name: 'Ms. Kelly Grech',
    category: 'support',
    role: 'Restorative & Surgical Nurse',
    qualifications: 'Dual Specialty Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/ms_kelly_grech_restorative_dental_nurse.jpg',
    bio: 'Cross-trained across surgical implant suites and restorative CEREC procedures, ensuring impeccable patient safety.',
    treatmentDefault: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)'
  },
  {
    id: 'ms-rachael',
    name: 'Ms. Rachael Bornel',
    category: 'support',
    role: 'Restorative Dental Nurse',
    qualifications: 'Restorative Care Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/ms_rachael_restorative_dental_nurse.jpg',
    bio: 'Dedicated to patient comfort, gentle chairside care, and clinical efficiency in the restorative department.',
    treatmentDefault: 'CEREC 3D Ceramics & Veneers (60-Minute Milling)'
  }
];

// Services Data
const servicesData = [
  {
    num: "01",
    id: "IMPLANTS",
    title: "Dental Implants & All-on-4",
    tagline: "Same-Day Fixed Teeth",
    bgClass: "bg-white",
    accentColor: "#142B4D",
    summary: "Permanent full-arch or single tooth restoration guided by 3D CBCT digital bone mapping. Walk out with fixed, stable teeth on the very same day.",
    bullets: ["3D CBCT guided surgical placement", "All-on-4 immediate full arch loading", "Bio-compatible Swiss grade titanium", "Lifelong bone preservation"],
    desc: "Directed by senior maxillofacial surgeons and implantologists at St. James Hospital. Using high-precision 3D cone beam planning, we place implants with sub-millimeter accuracy. Patients with failing dentition or removable dentures can receive complete fixed teeth in one single visit without prolonged healing gaps."
  },
  {
    num: "02",
    id: "CADCAM",
    title: "Same-Day CEREC 3D Ceramics",
    tagline: "In-House Precision Milling",
    bgClass: "bg-white",
    accentColor: "#3EA3AC",
    summary: "Precision porcelain crowns, inlays, and veneers designed and milled in our on-site dental laboratory in just 60 minutes. Zero messy impressions.",
    bullets: ["100% finished in a single visit", "Zero temporary restorations needed", "Optical intraoral 3D camera scanning", "High-strength biocompatible feldspathic porcelain"],
    desc: "Our on-site German CEREC CAD/CAM milling suite eliminates the two-week waiting period of traditional dental work. An optical 3D scan replaces traditional gooey trays; your custom restoration is sculpted digitally and diamond-milled while you relax in our private hospital lounge."
  },
  {
    num: "03",
    id: "SEDATION",
    title: "Certified IV Sedation Unit",
    tagline: "100% Anxiety & Pain Free",
    bgClass: "bg-white",
    accentColor: "#142B4D",
    summary: "Dedicated intravenous sedation protocol directly monitored by consultant hospital anaesthetists for patients with dental anxiety or undergoing surgery.",
    bullets: ["Consultant hospital anaesthetist on-site", "Deep relaxation with peaceful wake-up", "Zero memory of procedural discomfort", "Full vital signs hemodynamic monitoring"],
    desc: "Designed specifically for nervous or phobic patients and complex surgical procedures. Intravenous sedation safely drifts you into a twilight sleep state. You remain responsive but completely calm and comfortable, with no recollection of surgical sounds or tension."
  },
  {
    num: "04",
    id: "DSD",
    title: "Digital Smile Design (DSD)",
    tagline: "★ Premier Golden Signature Service",
    bgClass: "bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20",
    accentColor: "#D4AF37",
    isGold: true,
    summary: "High-definition facial dynamic analysis. We produce a physical 3D mock-up you can test-drive in your own mouth before initiating treatment.",
    bullets: ["Facial harmony proportion mapping", "Physical mock-up test drive in mouth", "High-definition video aesthetic analysis", "Zero surprises in final aesthetic result"],
    desc: "Digital Smile Design bridges artistic facial aesthetics with dental engineering. By capturing video of your natural smile dynamics and speech patterns, we calculate ideal proportions and print a 3D preview you can wear and evaluate in real life before any tooth modification."
  },
  {
    num: "05",
    id: "SURGERY",
    title: "Maxillofacial & Hospital Surgery",
    tagline: "Sterile Hospital Theatres",
    bgClass: "bg-white",
    accentColor: "#142B4D",
    summary: "Complex wisdom teeth extractions, bone grafting, sinus lifts, and corrective surgery performed in St. James Hospital sterile surgical suites.",
    bullets: ["Operating theatre hospital sterility", "Piezoelectric ultrasonic bone cutting", "Advanced sinus lift & bone regeneration", "Specialist maxillofacial surgical team"],
    desc: "Operating within Malta's leading private healthcare facility, our surgical division provides maximum clinical safety. Procedures are conducted with piezoelectric ultrasonic instruments that cut bone without harming adjacent soft tissue or nerve bundles."
  },
  {
    num: "06",
    id: "ORTHO",
    title: "Invisalign & Clear Aligners",
    tagline: "Discreet Orthodontic Correction",
    bgClass: "bg-white",
    accentColor: "#3EA3AC",
    summary: "Virtually invisible removable aligners and cosmetic braces designed to correct overcrowding and bite misalignments with digital tracking.",
    bullets: ["Custom 3D transparent aligners", "Removable for normal eating & cleaning", "Digital weekly movement tracking", "Accelerated cosmetic orthodontic protocols"],
    desc: "Modern digital orthodontics for adults and teenagers. We digitize your entire tooth movement roadmap, allowing you to view your final aligned smile progression on-screen from day one while wearing discreet, comfortable trays."
  }
];

const treatmentOptions = [
  "Dental Implants & All-on-4 (Same-Day Fixed Teeth)",
  "CEREC 3D Ceramics & Veneers (60-Minute Milling)",
  "Certified IV Sedation (100% Anxiety & Pain Free)",
  "Digital Smile Design (DSD Mockup)",
  "Maxillofacial & Surgical Wisdom Extraction",
  "Invisalign & Clear Aligners",
  "Comprehensive Consultation & 3D CBCT Scan"
];

// Dual Hospital Clinic Locations
const clinicLocations = [
  {
    id: 'sliema',
    name: 'St. James Hospital (Sliema)',
    tag: 'Flagship Hospital Centre',
    address: 'George Borg Olivier Street, Sliema SLM 1807, Malta',
    phone: '(+356) 2329 1029',
    phoneClean: '35623291029',
    email: 'appointment@dentalunitmalta.com',
    hours: [
      { days: 'Monday, Tuesday & Thursday', time: '09:00 – 18:00' },
      { days: 'Wednesday', time: '09:00 – 17:30' },
      { days: 'Friday & Saturday', time: '09:00 – 13:30' },
      { days: 'Sunday', time: 'Closed' }
    ],
    features: [
      'Full St. James Hospital Surgical Operating Theatres',
      'Consultant Anaesthetist IV Sedation Protocol',
      'In-House CEREC CAD/CAM 3D Milling Lab',
      'Direct Private Underground Hospital Parking'
    ],
    image: 'sliema_clinic.png'
  },
  {
    id: 'burmarrad',
    name: 'St. James Clinic (San Pawl il-Baħar)',
    tag: 'North Malta Medical Centre',
    address: 'Triq Il-Wardija, San Pawl il-Baħar, Malta',
    phone: '(+356) 2329 3710',
    phoneClean: '35623293710',
    email: 'appointment@dentalunitmalta.com',
    hours: [
      { days: 'Monday, Tuesday & Thursday', time: '09:00 – 18:00' },
      { days: 'Wednesday', time: '09:00 – 17:30' },
      { days: 'Friday & Saturday', time: '09:00 – 13:30' },
      { days: 'Sunday', time: 'Closed' }
    ],
    features: [
      'Digital 3D CBCT Radiographic Bone Imaging',
      'Microscopic Endodontics & Aesthetic Suite',
      'Rapid Same-Day Consultations & Dental Care',
      'Ground Floor Accessible Reception Entrance'
    ],
    image: 'burmarrad_clinic.png'
  }
];

// 3 Real Verified Patient Testimonials with Dedicated Photos
const verifiedReviews = [
  {
    author: "Christopher M.",
    photo: "patient_christopher.jpg",
    treatment: "All-on-4 Full Arch Implants",
    clinic: "St. James Hospital, Sliema",
    text: "After years of struggling with missing teeth and dentists who only offered removable plates, Dr. Mark Diacono completely changed my life. I had surgery under IV sedation in the morning and walked out with a fixed, beautiful set of teeth by afternoon. Zero pain, zero anxiety.",
    rating: 5
  },
  {
    author: "Elena Vassallo",
    photo: "patient_elena.jpg",
    treatment: "CEREC Ceramic Crown in 1 Visit",
    clinic: "St. James Clinic, San Pawl il-Baħar",
    text: "I chipped a front tooth right before an overseas flight. The team scanned it with their 3D optical camera, milled the porcelain crown right there in their clinic lab, and bonded it in less than an hour! It matches my other teeth seamlessly. Incredible technology.",
    rating: 5
  },
  {
    author: "Mark Cassar",
    photo: "patient_mark.jpg",
    treatment: "Surgical Wisdom Extraction & IV Sedation",
    clinic: "St. James Hospital, Sliema",
    text: "As someone who suffers from severe dental phobia, having an anaesthetist administer IV sedation gave me total peace of mind. I remember lying down peacefully, and the next moment I was waking up with all 4 impacted teeth removed. The medical care was exemplary.",
    rating: 5
  }
];

// FAQs Data
const faqsData = [
  {
    num: "01",
    q: "Can I really receive a fixed set of teeth or crown in one single day?",
    a: "Yes. Using our in-house German CEREC CAD/CAM 3D milling lab and immediate-load implant protocols (All-on-4), single crowns and full arch restorations can be digitally designed, diamond-milled, and fitted in a single appointment. This avoids gooey impression trays and weeks of temporary teeth."
  },
  {
    num: "02",
    q: "How does the certified IV sedation work for nervous or anxious patients?",
    a: "IV sedation is supervised directly on-site by certified consultant hospital anaesthetists. A gentle sedative is administered through an IV line, causing you to enter a relaxed twilight sleep state. You remain responsive but feel no discomfort, hear no dental drill sounds, and will have zero recollection of pain afterwards."
  },
  {
    num: "03",
    q: "What makes being located inside St. James Hospital a decisive advantage?",
    a: "Being directly situated within Malta's premier private hospital ensures the strictest medical sterility, backup medical services, emergency hospital operating theatres, on-site 3D diagnostic imaging, and private recovery suites that typical street clinics simply cannot match."
  },
  {
    num: "04",
    q: "What is Digital Smile Design (DSD) and how does it help me before treatment?",
    a: "DSD is a 3D aesthetic simulation system. By recording your facial gestures, lip dynamics, and facial symmetry, we generate a physical mock-up you can test-drive in your mouth. You see and feel exactly how your smile will look before any procedure is started."
  },
  {
    num: "05",
    q: "How do I schedule an appointment and what are the consultation details?",
    a: "Consultations can be booked instantly through our fast WhatsApp consultation flow with live chat preview or by calling (+356) 2329 1029 (Sliema) or (+356) 2329 3710 (San Pawl). Our hospital patient coordinators will confirm a specialist slot within minutes."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroViewMode, setHeroViewMode] = useState<'reception' | 'video'>('reception');
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTeamTab, setActiveTeamTab] = useState<'all' | 'specialists' | 'general' | 'support'>('all');

  // WhatsApp Intake Modal State & Interactive Live Preview
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    clinic: 'Sliema',
    treatment: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)',
    doctor: '',
    urgency: 'This week (Monday – Friday)',
    notes: ''
  });
  const [formValidationWarning, setFormValidationWarning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Lead Desk State
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', clinic: 'Sliema', service: 'Implants' });

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Smooth Section Scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 70 },
        duration: 1.1,
        ease: 'power3.inOut'
      });
    }
    setMobileMenuOpen(false);
  };

  // Before / After Slider Drag Logic
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  // Open WhatsApp Intake Modal
  const openWhatsAppBooking = (initialDefaults?: Partial<typeof bookingForm>) => {
    if (initialDefaults) {
      setBookingForm(prev => ({ ...prev, ...initialDefaults }));
    }
    setFormValidationWarning(false);
    setCopySuccess(false);
    setWhatsappModalOpen(true);
  };

  // Formatted WhatsApp message in English
  const generateWhatsAppMessage = () => {
    const nameText = bookingForm.name.trim() || '[Patient Name]';
    const phoneText = bookingForm.phone.trim() || '[WhatsApp Phone]';
    const clinicName = bookingForm.clinic === 'Sliema' 
      ? 'St. James Hospital (Sliema Flagship)' 
      : 'St. James Medical Centre (San Pawl il-Baħar)';
    const treatmentText = bookingForm.treatment || 'Clinical Consultation';
    const doctorText = bookingForm.doctor ? `\n👨‍⚕️ *Requested Clinician:* ${bookingForm.doctor}` : '';
    const urgencyText = bookingForm.urgency || 'This week';
    const notesText = bookingForm.notes.trim() ? `\n📝 *Notes / Symptoms:* ${bookingForm.notes.trim()}` : '';

    return `👋 *CLINICAL APPOINTMENT REQUEST • DiU CLINIC MALTA*
━━━━━━━━━━━━━━━━━━
👤 *Patient:* ${nameText}
📱 *WhatsApp:* ${phoneText}
🏛️ *Preferred Clinic:* ${clinicName}
🦷 *Treatment:* ${treatmentText}${doctorText}
⏰ *Timeline / Urgency:* ${urgencyText}${notesText}
━━━━━━━━━━━━━━━━━━
_Sent via the official portal of DiU Clinic Malta (St. James Hospital Network). Please confirm appointment availability._`;
  };

  // Send WhatsApp Link
  const handleSendWhatsApp = () => {
    if (!bookingForm.name.trim() || !bookingForm.phone.trim()) {
      setFormValidationWarning(true);
      return;
    }
    const phoneTarget = bookingForm.clinic === 'San Pawl' || bookingForm.clinic.toLowerCase().includes('pawl')
      ? '35623293710'
      : '35623291029';
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyWhatsAppMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setLeadSubmitted(true);
  };

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);
      setShowBottomBar(scrollPos > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredClinicians = cliniciansList.filter(c => {
    if (activeTeamTab === 'all') return true;
    return c.category === activeTeamTab;
  });

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#3EA3AC]/20 selection:text-[#142B4D] overflow-x-clip font-body">

      {/* 1. TOP STICKY HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-sm text-slate-800' 
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-4 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <FullLogo className="h-8 sm:h-9 w-auto" light={false} />
            <div className="hidden lg:block border-l border-slate-200 pl-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#3EA3AC] block">
                St. James Hospital Network
              </span>
              <span className="text-[11px] font-semibold text-slate-600 block">
                Sliema & San Pawl il-Baħar
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-700">
            <button 
              onClick={() => scrollToSection('services-section')}
              className="hover:text-[#142B4D] transition-colors cursor-pointer bg-transparent border-none"
            >
              Treatments
            </button>
            <button 
              onClick={() => scrollToSection('digital-smile-design')}
              className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-extrabold transition-colors cursor-pointer bg-transparent border-none"
            >
              <span>Digital Smile Design</span>
              <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 text-amber-800 rounded-none sm:rounded-sm border border-amber-300">
                ✦ Gold
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('anxious-patients')}
              className="hover:text-[#142B4D] transition-colors cursor-pointer bg-transparent border-none"
            >
              Anxious Patients
            </button>
            <button 
              onClick={() => scrollToSection('our-team')}
              className="hover:text-[#142B4D] transition-colors cursor-pointer bg-transparent border-none"
            >
              Our Team
            </button>
            <button 
              onClick={() => scrollToSection('clinics')}
              className="hover:text-[#142B4D] transition-colors cursor-pointer bg-transparent border-none"
            >
              Find Us
            </button>
          </nav>

          {/* Contact & CTA Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:35623291029"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#142B4D] hover:text-[#3EA3AC] px-3 py-2 transition-colors no-underline"
            >
              <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
              <span>+356 2329 1029</span>
            </a>

            <button
              onClick={() => openWhatsAppBooking()}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer border border-[#142B4D]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#3EA3AC]" />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-none sm:rounded-sm bg-slate-100 text-slate-800 border border-slate-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-t border-slate-200 px-6 py-6 flex flex-col gap-4 text-sm font-bold text-slate-800 shadow-xl"
            >
              <button 
                onClick={() => scrollToSection('services-section')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Treatments
              </button>
              <button 
                onClick={() => scrollToSection('digital-smile-design')}
                className="text-left py-2 text-amber-700 hover:text-amber-800 font-extrabold bg-transparent border-none cursor-pointer flex items-center justify-between"
              >
                <span>Digital Smile Design</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-none sm:rounded-sm">★ Signature</span>
              </button>
              <button 
                onClick={() => scrollToSection('anxious-patients')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Anxious Patients & Sedation
              </button>
              <button 
                onClick={() => scrollToSection('our-team')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Our Experts & Team
              </button>
              <button 
                onClick={() => scrollToSection('smile-results')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Before & After Restorations
              </button>
              <button 
                onClick={() => scrollToSection('clinics')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Find Us (St. James Hospital)
              </button>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <a 
                  href="tel:35623291029"
                  className="flex items-center gap-2 py-2 text-xs font-bold text-[#142B4D] no-underline"
                >
                  <Phone className="w-4 h-4 text-[#3EA3AC]" />
                  <span>Sliema: +356 2329 1029</span>
                </a>
                <a 
                  href="tel:35623293710"
                  className="flex items-center gap-2 py-2 text-xs font-bold text-[#142B4D] no-underline"
                >
                  <Phone className="w-4 h-4 text-[#3EA3AC]" />
                  <span>San Pawl: +356 2329 3710</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppBooking();
                }}
                className="w-full mt-2 py-3.5 rounded-none sm:rounded-sm bg-[#142B4D] text-white font-black text-center text-xs uppercase tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#3EA3AC]" />
                <span>Book a Consultation</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 bg-[#F8FAFC] shadow-[0_30px_70px_rgba(15,23,42,0.06)] pt-20 sm:pt-24">

        {/* 2. HERO SECTION: CLEAN, CRISP, LIGHT MEDICAL LUXURY WITH EXACT CLIENT COPY */}
        <section 
          id="hero"
          className="relative w-full bg-[#F8FAFC] pt-8 sm:pt-12 pb-16 sm:pb-20 border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Official Client Copy & Exact Two CTA Buttons */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                
                {/* Location / Heritage Badge */}
                <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200/80 text-[#142B4D] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-6">
                  <Building2 className="w-3.5 h-3.5 text-[#3EA3AC]" />
                  <span>ST JAMES HOSPITAL, SLIEMA</span>
                </div>

                {/* Main Headline in Dark Navy & Light Cyan */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2vw] font-normal tracking-tight leading-[1.08] mb-6 font-editorial drop-shadow-xs">
                  <span className="text-[#142B4D]">Trusted by families</span> <br />
                  <span className="text-[#3EA3AC]">for over 25 years.</span>
                </h1>

                {/* Subtitle / Paragraph */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-normal leading-relaxed mb-8 font-body max-w-xl">
                  From your family's check-ups and children's dentistry to smile design, implants and full-mouth reconstruction, one team plans your care together.
                </p>

                {/* EXACTLY TWO CLEAN ACTION BUTTONS (Square Architectural Styling) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                  
                  {/* Button 1: Primary Consultation / WhatsApp Intake */}
                  <button
                    onClick={() => openWhatsAppBooking()}
                    className="px-8 py-4 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2.5 border border-[#142B4D]"
                  >
                    <span>Book a consultation</span>
                    <ArrowUpRight className="w-4 h-4 text-[#3EA3AC]" />
                  </button>

                  {/* Button 2: Secondary Golden DSD Feature Exploration */}
                  <button
                    onClick={() => scrollToSection('digital-smile-design')}
                    className="px-7 py-4 rounded-none sm:rounded-sm bg-white hover:bg-slate-50 text-[#142B4D] font-bold text-sm uppercase tracking-wider border border-slate-300 hover:border-slate-400 shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Smile design around your face</span>
                  </button>
                </div>

                {/* Sedation Hospital Reassurance Box (Square Border, Calm Face / Hospital Setting) */}
                <div className="p-4 sm:p-5 rounded-none sm:rounded-sm bg-teal-50/70 border border-[#3EA3AC]/30 flex items-start gap-3.5 shadow-xs">
                  <div className="p-2 rounded-none sm:rounded-sm bg-white border border-[#3EA3AC]/40 text-[#3EA3AC] shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 fill-[#3EA3AC]/20 text-[#3EA3AC]" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-body">
                    <strong className="text-[#142B4D] font-bold">Nervous about the dentist?</strong> All our treatments are available under sedation, with a consultant anaesthetist, in a hospital setting.
                  </div>
                </div>

              </div>

              {/* Right Column: Real Reception Showcase & 4K Tour View */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-none sm:rounded-sm overflow-hidden border border-slate-200/90 bg-white shadow-xl relative aspect-[4/3] sm:aspect-[16/11]">
                  
                  {heroViewMode === 'reception' ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={getAssetUrl('clinic/reception_background_image.jpg')} 
                        alt="DiU Dental & Implantology Unit - St. James Hospital Reception Desk"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Image Details Caption */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#3EA3AC] bg-slate-950/70 px-2.5 py-1 rounded-none sm:rounded-sm">
                            Executive Reception • St. James Hospital
                          </span>
                          <div className="text-sm sm:text-base font-bold text-white mt-1 drop-shadow-sm font-editorial">
                            Dental & Implantology Unit (DiU Malta)
                          </div>
                        </div>

                        <button
                          onClick={() => setHeroViewMode('video')}
                          className="px-3.5 py-2 rounded-none sm:rounded-sm bg-white/95 hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer border-none shrink-0"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#3EA3AC] text-[#3EA3AC]" />
                          <span>Watch 4K Tour</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-slate-950">
                      <video
                        src={getAssetUrl('video_hero_4k.mp4')}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => setHeroViewMode('reception')}
                          className="px-3 py-1.5 rounded-none sm:rounded-sm bg-white/90 hover:bg-white text-slate-900 text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer border border-slate-200"
                        >
                          View Reception Photo
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-slate-900/70 px-3 py-1.5 rounded-none sm:rounded-sm">
                        4K Clinical Suites • St. James Hospital
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

          {/* Under-Hero Dark Blue Quick Info Banner (Matching Client Artifact Frame 01s) */}
          <div className="mt-12 sm:mt-16 bg-[#142B4D] text-white py-6 border-y border-[#0c1c33]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Item 1: Get an appointment */}
              <div 
                onClick={() => openWhatsAppBooking()}
                className="flex items-center gap-4 p-3 rounded-none sm:rounded-sm hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <div className="w-11 h-11 rounded-none sm:rounded-sm border border-[#3EA3AC]/40 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[#3EA3AC] transition-colors">
                  <Calendar className="w-5 h-5 text-[#3EA3AC]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#3EA3AC] transition-colors font-heading">
                    Get an appointment
                  </div>
                  <div className="text-xs text-slate-300 font-body">
                    Quick online booking form
                  </div>
                </div>
              </div>

              {/* Item 2: Emergency contact */}
              <div className="flex items-center gap-4 p-3 rounded-none sm:rounded-sm md:border-x md:border-white/10 md:px-6">
                <div className="w-11 h-11 rounded-none sm:rounded-sm border border-[#3EA3AC]/40 bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#3EA3AC]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-heading">
                    Emergency contact
                  </div>
                  <div className="text-xs text-slate-300 font-body">
                    Opening hours <strong className="text-white">2329 1029</strong> · Out of hours <strong className="text-white">2329 1000</strong>
                  </div>
                </div>
              </div>

              {/* Item 3: Clinic hours */}
              <div className="flex items-center gap-4 p-3 rounded-none sm:rounded-sm">
                <div className="w-11 h-11 rounded-none sm:rounded-sm border border-[#3EA3AC]/40 bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#3EA3AC]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-heading">
                    Clinic hours
                  </div>
                  <div className="text-xs text-slate-300 font-body">
                    Mon, Tue, Thu 9:00–18:00 · Wed 9:00–17:30 · Fri, Sat 9:00–13:30
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. FOR ANXIOUS PATIENTS: SAFE, GENTLE HANDS & HOSPITAL SEDATION (From Client Recording Frame 08s) */}
        <section 
          id="anxious-patients"
          className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Image: The Actual Clinic Waiting Lounge (waiting_room_2.jpg) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6"
              >
                <div className="rounded-none sm:rounded-sm overflow-hidden border border-slate-200/90 shadow-xl bg-white relative aspect-[4/3] sm:aspect-[16/11]">
                  <img 
                    src={getAssetUrl('clinic/waiting_room_2.jpg')} 
                    alt="DiU Clinic Malta Private Patient Waiting Lounge"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-white/95 backdrop-blur-md text-[#142B4D] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-xs">
                    Private Hospital Lounge
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/75 backdrop-blur-md text-white p-3 rounded-none sm:rounded-sm text-xs font-medium">
                    Designed for serenity: relax away from clinical equipment before your appointment.
                  </div>
                </div>
              </motion.div>

              {/* Right Content: Exact Client Wording */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#3EA3AC]" />
                  <span>FOR ANXIOUS PATIENTS</span>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight mb-6 font-editorial text-slate-950">
                  You’re in safe, <span className="text-[#3EA3AC]">gentle hands</span>
                </h2>

                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-5 font-body">
                  Dental anxiety is common, and you are not alone. We’re known for our calm, patient approach with nervous patients, and we offer sedation with a consultant anaesthetist, so you can receive the care you need feeling completely supported.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-body">
                  Prefer to start with a relaxed chat away from the dental chair? We offer an informal pre-treatment consultation to ease you in, at your pace.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => openWhatsAppBooking({
                      treatment: 'Certified IV Sedation (100% Anxiety & Pain Free)'
                    })}
                    className="px-8 py-4 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer border border-[#142B4D]"
                  >
                    Learn about sedation options
                  </button>
                  <a
                    href="tel:35623291029"
                    className="px-6 py-4 rounded-none sm:rounded-sm bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all no-underline flex items-center gap-2 shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
                    <span>Speak with our team</span>
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. MODERN TECHNOLOGY & CLINICAL EXCELLENCE (4 PILLARS + 3D SCANNER SHOWCASE) */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-blue-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
                <Sparkles className="w-4 h-4 text-[#3EA3AC]" />
                <span>Hospital Standards & Digital Accuracy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
                Advanced Technology. Human Care.
              </h2>
            </div>

            {/* 4 Pillar Cards (Square Borders, Exact Copy from Client Artifact Frame 12s) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-none sm:rounded-sm bg-teal-50 text-[#3EA3AC] border border-teal-200 flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3 font-heading">
                    Modern technology
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    3D dental scanner, crowns in a single visit with CAD/CAM technology, and 3D X-ray (CBCT).
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#3EA3AC]">
                  German CEREC Milling Lab
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-none sm:rounded-sm bg-teal-50 text-[#3EA3AC] border border-teal-200 flex items-center justify-center mb-6">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3 font-heading">
                    Anxious–patient care
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    Sedation with a consultant anaesthetist for nervous patients in a calm hospital environment.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#3EA3AC]">
                  Zero Memory Of Discomfort
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.19 }}
                className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-none sm:rounded-sm bg-teal-50 text-[#3EA3AC] border border-teal-200 flex items-center justify-center mb-6">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3 font-heading">
                    Multidisciplinary team
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    Complex cases planned as a specialist team, all under one roof at St. James Hospital.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#3EA3AC]">
                  Oral Surgeons & Specialists
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-none sm:rounded-sm bg-teal-50 text-[#3EA3AC] border border-teal-200 flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-3 font-heading">
                    Hospital–level safety
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    Based inside St James Hospital, Sliema, trusted since 1999 with sterile operating suites.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#3EA3AC]">
                  Full Medical Hospital Backup
                </div>
              </motion.div>

            </div>

            {/* High-Tech In-Surgery Scanning Visual Showcase */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-none sm:rounded-sm overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
                <img 
                  src={getAssetUrl('clinic/md_3d_scanner_and_pt.jpg')} 
                  alt="Dr. Mark Diacono with 3D Scanner and Patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-none sm:rounded-sm text-xs font-bold text-slate-900 border border-slate-200 shadow-2xs">
                  Intraoral 3D Digital Scanning with Dr. Mark Diacono
                </div>
              </div>
              <div className="relative rounded-none sm:rounded-sm overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
                <img 
                  src={getAssetUrl('clinic/scanning_in_surgery.jpg')} 
                  alt="Digital 3D Optical Scanning in Operating Surgery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-none sm:rounded-sm text-xs font-bold text-slate-900 border border-slate-200 shadow-2xs">
                  Zero Impressions: Sub-millimeter Optical Mapping
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. SIGNATURE GOLDEN FEATURE: DIGITAL SMILE DESIGN (DSD) — REQUESTED TOP SERVICE */}
        <section 
          id="digital-smile-design"
          className="py-24 md:py-32 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border-b border-amber-200/80 relative overflow-hidden"
        >
          {/* Subtle Golden Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[400px] bg-gradient-to-r from-amber-300/15 via-yellow-200/15 to-transparent blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Golden Ribbon Spotlight */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none sm:rounded-sm bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>★ PREMIER SIGNATURE SERVICE • DIGITAL SMILE DESIGN (DSD)</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight font-editorial text-slate-950 leading-tight">
                Architecting Your Smile <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 font-medium">
                  Before Any Treatment Begins.
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg mt-4 font-body max-w-2xl mx-auto">
                Led by <strong className="text-slate-900">Dr. Susanna Diacono</strong> (DSD Master & Co-Founder) and <strong className="text-slate-900">Ms. Aneta Mileska</strong> (DSD Coordinator). We evaluate your facial proportions, lips, and natural speech dynamics to design a tailored smile you can test-drive in real life.
              </p>
            </div>

            {/* DSD 3-Step Interactive Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              
              <div className="p-8 rounded-none sm:rounded-sm bg-white border-2 border-amber-300/80 shadow-md flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 to-transparent pointer-events-none" />
                <div>
                  <div className="text-xs font-black tracking-widest uppercase text-amber-700 mb-2 font-heading">
                    [ Step 01 • Facial Capture ]
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 mb-4 font-editorial">
                    3D Facial Dynamic Analysis
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    High-definition video and 3D intraoral scans capture your facial midline, lip curves, and natural expressions. Teeth are never designed in isolation — they are framed specifically to your face.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>Sub-Millimeter Facial Proportion</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
              </div>

              <div className="p-8 rounded-none sm:rounded-sm bg-white border-2 border-amber-400 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all relative overflow-hidden group scale-[1.02]">
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Top Patient Highlight
                </div>
                <div>
                  <div className="text-xs font-black tracking-widest uppercase text-amber-700 mb-2 font-heading">
                    [ Step 02 • Physical Mockup ]
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 mb-4 font-editorial">
                    The Trial Smile "Test Drive"
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    We fabricate a temporary, non-invasive physical resin mockup that clips directly over your natural teeth. You look in the mirror, smile, speak, and preview your future smile with zero permanent alterations.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>Zero Drilling • Zero Surprises</span>
                  <Smile className="w-4 h-4 text-amber-600" />
                </div>
              </div>

              <div className="p-8 rounded-none sm:rounded-sm bg-white border-2 border-amber-300/80 shadow-md flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 to-transparent pointer-events-none" />
                <div>
                  <div className="text-xs font-black tracking-widest uppercase text-amber-700 mb-2 font-heading">
                    [ Step 03 • Precision Delivery ]
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 mb-4 font-editorial">
                    CEREC Same-Day Milling
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-body">
                    Once you approve your test-drive smile, the digital blueprint transfers directly to our in-house CEREC CAD/CAM milling suite for custom porcelain veneers or crowns diamond-milled on-site.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800">
                  <span>Biomimetic Ceramic Precision</span>
                  <Layers className="w-4 h-4 text-amber-500" />
                </div>
              </div>

            </div>

            {/* CTA Box for DSD */}
            <div className="p-6 sm:p-8 rounded-none sm:rounded-sm bg-gradient-to-r from-amber-100/80 via-white to-amber-100/80 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <div className="text-lg font-bold text-slate-950 font-heading">
                  Ready to Preview Your New Smile in Real Life?
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-body">
                  Schedule your comprehensive 3D Digital Smile Design consultation with Dr. Susanna Diacono.
                </div>
              </div>

              <button
                onClick={() => openWhatsAppBooking({
                  treatment: 'Digital Smile Design (DSD Mockup)',
                  doctor: 'Dr. Susanna Diacono'
                })}
                className="px-8 py-4 rounded-none sm:rounded-sm bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-600 shrink-0 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Smile Design Session</span>
              </button>
            </div>

          </div>
        </section>

        {/* 6. OUR CLINICIANS & MEDICAL TEAM ("OUR EXPERTS IN ORAL HEALTH") */}
        <section 
          id="our-team"
          className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header: Exact Client Wording from Video Frame 16s & Screenshot */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-3">
                  <User className="w-4 h-4 text-[#3EA3AC]" />
                  <span>OUR CLINICIANS • ST. JAMES HOSPITAL</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-slate-950 tracking-tight font-editorial">
                  Our Experts in Oral Health
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-md font-body">
                Specialists and general dentists working side by side, so every treatment is planned by the right person.
              </p>
            </div>

            {/* Filter Tabs (Square Borders) */}
            <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200 pb-4">
              <button
                onClick={() => setActiveTeamTab('all')}
                className={`px-5 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTeamTab === 'all'
                    ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                All Team ({cliniciansList.length})
              </button>
              <button
                onClick={() => setActiveTeamTab('specialists')}
                className={`px-5 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTeamTab === 'specialists'
                    ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                Specialist Surgeons & Dentists (5)
              </button>
              <button
                onClick={() => setActiveTeamTab('general')}
                className={`px-5 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTeamTab === 'general'
                    ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                General & Paediatric Dentists (4)
              </button>
              <button
                onClick={() => setActiveTeamTab('support')}
                className={`px-5 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTeamTab === 'support'
                    ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                Clinical Care & Nursing Team (10)
              </button>
            </div>

            {/* Clinicians Pop-Out Card Grid (Matching WhatsApp Reference Screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filteredClinicians.map((person) => (
                <motion.div
                  key={person.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-none sm:rounded-sm bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Portrait Photo Container */}
                    <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-100">
                      <img
                        src={getAssetUrl(person.photo)}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-none sm:rounded-sm bg-white/95 backdrop-blur-md text-[#142B4D] text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-2xs">
                        {person.badge}
                      </div>
                    </div>

                    {/* Information */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-950 mb-1 font-heading group-hover:text-[#3EA3AC] transition-colors">
                        {person.name}
                      </h3>
                      
                      <div className="text-xs font-bold text-[#142B4D] uppercase tracking-wider mb-2 font-heading">
                        {person.role}
                      </div>

                      <div className="text-[11px] text-[#3EA3AC] font-semibold mb-3">
                        {person.qualifications}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-body line-clamp-3">
                        {person.bio}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => openWhatsAppBooking({
                        doctor: person.name,
                        treatment: person.treatmentDefault
                      })}
                      className="w-full py-2.5 rounded-none sm:rounded-sm bg-slate-50 hover:bg-[#142B4D] text-slate-800 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 hover:border-[#142B4D] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire with {person.name.split(' ')[0]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. AWARD-WINNING RESTORATIONS: 3-TOOTH ABSENCE VS FIXED CERAMIC IMPLANTS */}
        <section 
          id="smile-results" 
          className="bg-[#F8FAFC] text-slate-950 pt-20 pb-28 border-b border-slate-200/90 relative z-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-3">
                <Smile className="w-4 h-4 text-[#3EA3AC]" />
                <span>Verified Clinical Cases [ Before vs After ]</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight font-editorial text-slate-950 mb-4 leading-tight">
                Award-Winning Restorations
              </h2>
              <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto font-body">
                Drag the interactive slider below to inspect full clinical restoration: from severe 3-tooth absence to permanent Swiss implants & CEREC 3D ceramic crowns.
              </p>
            </motion.div>

            {/* Interactive Before & After Slider */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white p-4 sm:p-8 rounded-none sm:rounded-sm border border-slate-200/90 shadow-xl backdrop-blur-md">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#3EA3AC] font-heading">
                      Multiple Tooth Absence & Swiss Dental Implants
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-950 font-editorial">
                      3-Tooth Absence Restored to Fixed Perfection
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 text-[#142B4D] text-xs font-bold border border-teal-200 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-[#3EA3AC] animate-pulse" />
                    <span>Immediate Ceramic Integration</span>
                  </div>
                </div>

                {/* Slider Box */}
                <div
                  ref={sliderContainerRef}
                  onMouseMove={(e) => handleSliderMove(e.clientX)}
                  onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
                  onTouchStart={(e) => handleSliderMove(e.touches[0].clientX)}
                  className="relative rounded-none sm:rounded-sm overflow-hidden aspect-[4/3] sm:aspect-[16/9] border-2 border-slate-200 shadow-xl cursor-ew-resize select-none bg-slate-100 touch-none"
                >
                  {/* AFTER: Full Base */}
                  <img
                    src={getAssetUrl('dental_case_after.jpg')}
                    alt="After: Permanent Ceramic Dental Implant Restoration"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* BEFORE: Clipped Left Layer */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={getAssetUrl('dental_case_before.jpg')}
                      alt="Before: 3-Tooth Absence Case"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : '100%' }}
                    />
                  </div>

                  {/* Center Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center z-20"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-10 h-10 rounded-none sm:rounded-sm bg-[#142B4D] text-white flex items-center justify-center shadow-xl border-2 border-white text-xs font-black">
                      ⇄
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-white/95 text-slate-900 text-[10px] sm:text-xs font-bold border border-slate-200 shadow-md">
                    BEFORE: 3-Tooth Absence
                  </div>
                  <div className="absolute top-3 right-3 z-10 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-[#142B4D] text-white text-[10px] sm:text-xs font-bold border border-blue-400/40 shadow-md">
                    AFTER: Fixed Ceramic Implants
                  </div>
                </div>

                {/* Footer trigger */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-200 text-slate-800">
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-slate-950">Clinical Protocol:</strong> 3D CBCT guided implantology • German CEREC single-visit milling • St. James Hospital
                  </div>
                  <button
                    onClick={() => openWhatsAppBooking({
                      treatment: "Dental Implants & All-on-4 (Same-Day Fixed Teeth)"
                    })}
                    className="flex items-center gap-2 px-7 py-3 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer border border-[#142B4D] shadow-sm"
                  >
                    <span>Inquire About This Case</span>
                    <ArrowUpRight className="w-4 h-4 text-[#3EA3AC]" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 8. COMPREHENSIVE CLINICAL SPECIALTIES (01 - 06) */}
        <section id="services-section" className="py-24 md:py-32 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4 text-[#3EA3AC]" />
                <span>Advanced Clinical Specialties [ 01 – 06 ]</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
                Comprehensive Care For <span className="text-[#142B4D]">Every Patient</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-2 font-body">
                Explore our six flagship surgical and restorative procedures.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                className={`rounded-none sm:rounded-sm p-8 border ${svc.isGold ? 'border-amber-400 shadow-md ring-1 ring-amber-300' : 'border-slate-200/90 shadow-2xs'} flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer ${svc.bgClass}`}
                onClick={() => setSelectedService(svc)}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-extrabold text-slate-400 tracking-wider font-heading">
                      [ {svc.num} ]
                    </span>
                    <span 
                      className={`text-[11px] font-bold px-3 py-1 rounded-none sm:rounded-sm uppercase tracking-wider ${svc.isGold ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}
                    >
                      {svc.tagline}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight font-heading">
                    {svc.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                    {svc.summary}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {svc.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3EA3AC] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsAppBooking({ treatment: svc.title });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-2xs transition-transform hover:scale-[1.02]"
                  >
                    <span>Book Procedure</span>
                  </button>

                  <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <span>Details</span>
                    <ArrowUpRight className="w-4 h-4 text-[#3EA3AC]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. THE 2 CLINICS & HOSPITAL NAVIGATION (SLIEMA & SAN PAWL + 3 PHOTO STEPS FROM VIDEO FRAME 28S) */}
        <section id="clinics" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-blue-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
                <Building2 className="w-4 h-4 text-[#3EA3AC]" />
                <span>Two Flagship Hospital Centres</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight font-heading">
                St. James Hospital Network
              </h2>
              <p className="text-slate-600 text-base sm:text-xl mt-3 font-body">
                Two accredited facilities in Malta, equipped with full sterile operating theatres and advanced 3D diagnostics.
              </p>
            </div>

            {/* Both Clinics Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {clinicLocations.map((clinic) => (
                <div
                  key={clinic.id}
                  className="rounded-none sm:rounded-sm bg-white border border-slate-200/90 shadow-md overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={getAssetUrl(clinic.image)}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-white/95 backdrop-blur-md text-[#142B4D] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-sm">
                        {clinic.tag}
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-extrabold text-slate-950 mb-6 tracking-tight font-heading">
                        {clinic.name}
                      </h3>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3 text-slate-700 text-sm">
                          <MapPin className="w-5 h-5 text-[#142B4D] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900">Hospital Address</div>
                            <div>{clinic.address}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-slate-700 text-sm">
                          <Phone className="w-5 h-5 text-[#3EA3AC] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900">Direct Telephone</div>
                            <div className="text-lg font-extrabold text-[#142B4D]">{clinic.phone}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-slate-700 text-sm">
                          <Clock className="w-5 h-5 text-[#142B4D] shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900">Consultation Hours</div>
                            {clinic.hours.map((h, i) => (
                              <div key={i} className="text-xs text-slate-600">
                                {h.days}: <strong className="text-slate-900">{h.time}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-none sm:rounded-sm border border-slate-200/80 mb-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Facility Highlights:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                          {clinic.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#3EA3AC] shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 flex gap-3">
                    <button
                      onClick={() => openWhatsAppBooking({
                        clinic: clinic.id === 'sliema' ? 'Sliema' : 'San Pawl il-Baħar'
                      })}
                      className="flex-1 py-3.5 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer border border-[#142B4D] shadow-sm text-center"
                    >
                      Book at {clinic.id === 'sliema' ? 'Sliema' : 'San Pawl'}
                    </button>
                    <a
                      href={`tel:+${clinic.phoneClean}`}
                      className="px-6 py-3.5 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 no-underline flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* How to Find Us Inside St. James Hospital (3 Photo Steps from Video Frame 28s) */}
            <div className="bg-white p-8 sm:p-10 rounded-none sm:rounded-sm border border-slate-200/90 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#3EA3AC] font-heading">
                    Location Guide • St. James Hospital Sliema
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 font-heading">
                    How to Find DiU Clinic on Arrival
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Parking: The nearest car park is at the Victoria Hotel, close by.
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=St+James+Hospital+Sliema+Malta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-none sm:rounded-sm bg-[#3EA3AC] hover:bg-[#328b93] text-white font-bold text-xs uppercase tracking-wider transition-colors no-underline flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get directions in Google Maps ↗</span>
                </a>
              </div>

              {/* 3 Step Visuals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="rounded-none sm:rounded-sm overflow-hidden border border-slate-200 bg-slate-50">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={getAssetUrl('clinic/st_james_main_entrance.jpg')} 
                      alt="1. Main entrance St. James Hospital Sliema"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-bold text-slate-950">1 · Main Entrance</div>
                    <div className="text-xs text-slate-600 mt-1">Enter through the main St. James Hospital reception doors on George Borg Olivier Street.</div>
                  </div>
                </div>

                <div className="rounded-none sm:rounded-sm overflow-hidden border border-slate-200 bg-slate-50">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={getAssetUrl('clinic/st_james_lift_lg.jpg')} 
                      alt="2. Lift down to Lower Ground LG"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-bold text-slate-950">2 · Lift down to LG</div>
                    <div className="text-xs text-slate-600 mt-1">Take the main hospital elevators down to the Lower Ground floor (LG).</div>
                  </div>
                </div>

                <div className="rounded-none sm:rounded-sm overflow-hidden border border-slate-200 bg-slate-50">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={getAssetUrl('clinic/diu_clinic_entrance.jpg')} 
                      alt="3. DiU Entrance Reception"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-bold text-slate-950">3 · DiU Entrance</div>
                    <div className="text-xs text-slate-600 mt-1">Our dedicated Dental & Implantology reception team is right outside the elevators to greet you.</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 10. PATIENT INFORMATION: EVERYTHING YOU NEED BEFORE YOUR VISIT (From Video Frame 24s) */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
                <FileText className="w-4 h-4 text-[#3EA3AC]" />
                <span>PATIENT INFORMATION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
                Everything you need <span className="text-[#3EA3AC]">before your visit</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-none sm:rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#142B4D] mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2 font-heading">
                  Your first visit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  What to expect at your first consultation, comprehensive 3D scan, and personalized treatment roadmap.
                </p>
              </div>

              <div className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-none sm:rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#142B4D] mb-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2 font-heading">
                  Fees and insurance
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Transparent fee schedules and direct hospital health insurance coordination. Let us know if you have private coverage.
                </p>
              </div>

              <div className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-none sm:rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#142B4D] mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2 font-heading">
                  Aftercare
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Looking after your teeth after treatment. Dedicated post-op instructions and continuous clinical check-ins.
                </p>
              </div>

              <div className="p-8 rounded-none sm:rounded-sm bg-[#F8FAFC] border border-slate-200/90 shadow-2xs">
                <div className="w-10 h-10 rounded-none sm:rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#3EA3AC] mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2 font-heading">
                  Dental emergencies
                </h3>
                <div className="text-xs text-slate-600 leading-relaxed font-body">
                  <div>During opening hours: <strong className="text-slate-900">2329 1029</strong></div>
                  <div>WhatsApp: <strong className="text-slate-900">9999 1029</strong></div>
                  <div>Out of hours: <strong className="text-slate-900">2329 1000</strong></div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 11. PATIENT REVIEWS (3 REAL VERIFIED TESTIMONIALS) */}
        <section id="reviews" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Verified Google Patient Reviews</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
                Voices of Trust & Restored Smiles
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3 font-body">
                Read how our hospital sedation and same-day dental engineering transformed lives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verifiedReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 sm:p-10 rounded-none sm:rounded-sm border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-6 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-2 font-heading">5.0 Verified</span>
                    </div>

                    <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed mb-8 font-body italic">
                      “{rev.text}”
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                    <img
                      src={getAssetUrl(rev.photo)}
                      alt={rev.author}
                      className="w-14 h-14 rounded-none sm:rounded-sm object-cover border border-slate-300 shadow-2xs shrink-0"
                    />
                    <div>
                      <div className="font-extrabold text-slate-950 text-base font-heading">
                        {rev.author}
                      </div>
                      <div className="text-xs text-[#3EA3AC] font-bold">
                        {rev.treatment}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {rev.clinic}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 12. FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="py-24 md:py-32 bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-blue-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
                <span>Transparent Clinical Answers</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqsData.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-none sm:rounded-sm border border-slate-200/90 bg-[#F8FAFC] overflow-hidden shadow-2xs"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left font-bold text-slate-900 text-base sm:text-lg flex justify-between items-center gap-4 cursor-pointer bg-transparent border-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-[#3EA3AC] font-heading">[ {faq.num} ]</span>
                        <span>{faq.q}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-none sm:rounded-sm bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-teal-50 text-[#3EA3AC]' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 pt-4 pl-12 font-body">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 13. DIRECT CONSULTATION DESK */}
        <section id="booking" className="py-24 md:py-32 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-5xl mx-auto rounded-none sm:rounded-sm bg-white p-8 sm:p-14 shadow-xl border border-slate-200/90">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                    <Calendar className="w-3.5 h-3.5 text-[#3EA3AC]" />
                    <span>Direct Clinical Consultation Desk</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 font-heading text-slate-950">
                    Ready to Restore Your Smile in One Visit?
                  </h2>

                  <p className="text-slate-600 text-base leading-relaxed mb-8 font-body">
                    Book an evaluation with our specialist surgical and implantology team at St. James Hospital. Prefer an instant WhatsApp chat? Launch our real-time booking flow below.
                  </p>

                  <button
                    onClick={() => openWhatsAppBooking()}
                    className="w-full sm:w-auto mb-8 flex items-center justify-center gap-3 px-8 py-4 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer border border-[#142B4D]"
                  >
                    <Calendar className="w-4 h-4 text-[#3EA3AC]" />
                    <span>Schedule Consultation via WhatsApp</span>
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Phone className="w-4 h-4 text-[#3EA3AC]" />
                      <span>Sliema Hospital: <strong className="text-slate-950">(+356) 2329 1029</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Phone className="w-4 h-4 text-[#3EA3AC]" />
                      <span>San Pawl il-Baħar: <strong className="text-slate-950">(+356) 2329 3710</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Mail className="w-4 h-4 text-[#3EA3AC]" />
                      <span className="text-slate-950 font-semibold">appointment@dentalunitmalta.com</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Callback Form */}
                <div className="lg:col-span-6 bg-slate-50 p-8 sm:p-10 rounded-none sm:rounded-sm border border-slate-200">
                  <div className="text-xl font-bold text-slate-950 mb-1">Request a Telephone Callback</div>
                  <div className="text-xs text-slate-500 mb-6">Our hospital patient coordinator will call you back within 1 hour.</div>

                  {leadSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-none sm:rounded-sm p-6 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <div className="text-base font-bold text-emerald-950">Appointment Request Received</div>
                      <div className="text-xs text-emerald-700 mt-1">Our hospital coordinator will call you shortly to confirm your slot.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Christopher Borg"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-none sm:rounded-sm bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3EA3AC]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+356 ..."
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-none sm:rounded-sm bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3EA3AC]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Hospital Clinic</label>
                          <select
                            value={leadForm.clinic}
                            onChange={(e) => setLeadForm({ ...leadForm, clinic: e.target.value })}
                            className="w-full px-3 py-3 rounded-none sm:rounded-sm bg-white border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none"
                          >
                            <option value="Sliema">Sliema (Hospital)</option>
                            <option value="San Pawl">San Pawl il-Baħar</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Procedure</label>
                          <select
                            value={leadForm.service}
                            onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                            className="w-full px-3 py-3 rounded-none sm:rounded-sm bg-white border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none"
                          >
                            <option value="Implants">Dental Implants / All-on-4</option>
                            <option value="CEREC">Same-Day CEREC Crown</option>
                            <option value="Sedation">IV Sedation Protocol</option>
                            <option value="DSD">Digital Smile Design</option>
                            <option value="Surgery">Oral & Wisdom Surgery</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-none sm:rounded-sm bg-[#3EA3AC] hover:bg-[#328b93] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer border-none mt-2"
                      >
                        Confirm Callback Request
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 14. CINEMATIC CURTAIN REVEAL FOOTER */}
      <CinematicFooter 
        onOpenWhatsApp={() => openWhatsAppBooking()}
        onScrollToSection={(id) => scrollToSection(id)}
      />

      {/* 15. FLOATING QUICK CONVERSION BAR (Visible after scroll) */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40 bg-white/95 backdrop-blur-md p-2.5 rounded-none sm:rounded-sm border border-slate-200/90 shadow-2xl flex items-center justify-between gap-2 sm:gap-3 text-slate-900"
          >
            <button
              onClick={() => scrollToSection('clinics')}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-[#142B4D] hover:text-[#3EA3AC] bg-transparent border-none cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
              <span>(+356) 2329 1029</span>
            </button>

            <button
              onClick={() => openWhatsAppBooking()}
              className="px-4 sm:px-6 py-2.5 rounded-none sm:rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border border-emerald-600/30 flex items-center gap-2 shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 text-slate-950" />
              <span>Book via WhatsApp</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 16. INTERACTIVE SERVICE DETAIL MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-none sm:rounded-sm shadow-2xl p-6 sm:p-10 text-slate-900"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none sm:rounded-sm bg-teal-50 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                <span>[ Procedure {selectedService.num} ]</span>
                <span>•</span>
                <span>{selectedService.tagline}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4 font-heading">
                {selectedService.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                {selectedService.desc}
              </p>

              <div className="bg-slate-50 p-5 rounded-none sm:rounded-sm border border-slate-200 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Clinical Advantages:</div>
                <div className="space-y-2">
                  {selectedService.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#3EA3AC] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    openWhatsAppBooking({ treatment: title });
                  }}
                  className="flex-1 py-3.5 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer border border-[#142B4D] shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#3EA3AC]" />
                  <span>Schedule Consultation for This Procedure</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 17. EXPANDED WHATSAPP INTAKE MODAL WITH LIVE REAL-TIME PHONE PREVIEW */}
      <AnimatePresence>
        {whatsappModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-none sm:rounded-sm shadow-2xl p-6 sm:p-10 text-slate-900 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setWhatsappModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none sm:rounded-sm bg-emerald-50 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct WhatsApp Clinical Booking • St. James Hospital Network</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
                  Schedule Your Consultation via WhatsApp
                </h3>
                <p className="text-slate-600 text-sm mt-1 font-body">
                  Complete your details below. Watch your official message format in real-time on the right.
                </p>
              </div>

              {/* Interactive Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Left Side */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Christopher Borg"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC] focus:border-transparent"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>WhatsApp Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +356 9912 3456 or +44 7911 123456"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC] focus:border-transparent"
                    />
                  </div>

                  {/* Clinic Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>Hospital Location Preference</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, clinic: 'Sliema' })}
                        className={`p-3.5 rounded-none sm:rounded-sm border text-left cursor-pointer transition-all ${
                          bookingForm.clinic === 'Sliema'
                            ? 'bg-teal-50/70 border-[#3EA3AC] text-slate-950 font-bold ring-1 ring-[#3EA3AC]'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold">Sliema Flagship</span>
                          {bookingForm.clinic === 'Sliema' && <Check className="w-3.5 h-3.5 text-[#3EA3AC]" />}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">St. James Surgical Hospital</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, clinic: 'San Pawl' })}
                        className={`p-3.5 rounded-none sm:rounded-sm border text-left cursor-pointer transition-all ${
                          bookingForm.clinic === 'San Pawl'
                            ? 'bg-teal-50/70 border-[#3EA3AC] text-slate-950 font-bold ring-1 ring-[#3EA3AC]'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold">San Pawl il-Baħar</span>
                          {bookingForm.clinic === 'San Pawl' && <Check className="w-3.5 h-3.5 text-[#3EA3AC]" />}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">St. James North Medical Centre</div>
                      </button>
                    </div>
                  </div>

                  {/* Treatment Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>Procedure of Interest</span>
                    </label>
                    <select
                      value={bookingForm.treatment}
                      onChange={(e) => setBookingForm({ ...bookingForm, treatment: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC]"
                    >
                      {treatmentOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Doctor Preference (Optional) */}
                  {bookingForm.doctor && (
                    <div className="p-3 bg-teal-50 border border-teal-200 rounded-none sm:rounded-sm flex items-center justify-between text-xs text-slate-800">
                      <div>
                        <strong className="text-[#142B4D]">Requested Clinician:</strong> {bookingForm.doctor}
                      </div>
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, doctor: '' })}
                        className="text-slate-400 hover:text-slate-700 bg-transparent border-none cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Timeline / Urgency */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>Timeline or Urgency</span>
                    </label>
                    <select
                      value={bookingForm.urgency}
                      onChange={(e) => setBookingForm({ ...bookingForm, urgency: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC]"
                    >
                      <option value="Urgent Dental Emergency (Today / Tomorrow)">🚨 Urgent Dental Emergency (Today / Tomorrow)</option>
                      <option value="This week (Monday – Friday)">📅 This week (Monday – Friday)</option>
                      <option value="Next week">🗓️ Next week</option>
                      <option value="Planning ahead (Within this month)">🔍 Planning ahead (Within this month)</option>
                    </select>
                  </div>

                  {/* Validation Error Banner */}
                  {formValidationWarning && (
                    <div className="p-3.5 rounded-none sm:rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Please enter both your Full Name and WhatsApp Phone Number to proceed.</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleSendWhatsApp}
                      className="flex-1 py-4 px-6 rounded-none sm:rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-emerald-600/30"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                      <span>Send to Official WhatsApp</span>
                    </button>

                    <button
                      onClick={handleCopyWhatsAppMessage}
                      className="py-4 px-5 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-300"
                    >
                      {copySuccess ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copySuccess ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>

                </div>

                {/* Right Interactive Live WhatsApp Phone Preview */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900 rounded-none sm:rounded-sm p-4 shadow-2xl border-2 border-slate-800 text-white relative">
                    
                    {/* Phone Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                      <span>09:41</span>
                      <div className="w-16 h-3 bg-black rounded-none sm:rounded-sm mx-auto" />
                      <span>5G 🔋</span>
                    </div>

                    {/* WhatsApp Top Bar */}
                    <div className="flex items-center gap-3 py-3 border-b border-slate-800">
                      <div className="w-8 h-8 rounded-none sm:rounded-sm bg-[#142B4D] flex items-center justify-center text-[#3EA3AC] border border-[#3EA3AC]/40">
                        <LogoMark className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                          <span>DIU Clinic Malta</span>
                          <CheckCheck className="w-3 h-3 text-[#3EA3AC]" />
                        </div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Online • St. James Hospital</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Message Bubble */}
                    <div className="py-5 min-h-[260px] flex flex-col justify-end">
                      <div className="bg-[#005c4b] text-white p-3.5 rounded-none sm:rounded-sm text-xs leading-relaxed shadow-md border border-emerald-600/40 font-mono">
                        <div className="text-[11px] font-bold text-emerald-200 mb-1">
                          👋 CLINICAL APPOINTMENT REQUEST
                        </div>
                        <div>👤 <strong>Patient:</strong> {bookingForm.name.trim() || '[Your Name]'}</div>
                        <div>📱 <strong>WhatsApp:</strong> {bookingForm.phone.trim() || '[Your Phone]'}</div>
                        <div>🏛️ <strong>Location:</strong> {bookingForm.clinic === 'Sliema' ? 'St. James Hospital (Sliema)' : 'San Pawl il-Baħar'}</div>
                        <div>🦷 <strong>Treatment:</strong> {bookingForm.treatment}</div>
                        {bookingForm.doctor && <div>👨‍⚕️ <strong>Clinician:</strong> {bookingForm.doctor}</div>}
                        <div>⏰ <strong>Timeline:</strong> {bookingForm.urgency}</div>
                        <div className="text-right text-[9px] text-emerald-300 mt-2">
                          10:45 AM ✓✓
                        </div>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 px-3 py-2 rounded-none sm:rounded-sm text-xs text-slate-400">
                        Type a message...
                      </div>
                      <div className="w-8 h-8 rounded-none sm:rounded-sm bg-[#00A884] flex items-center justify-center text-white">
                        <Send className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>

                  <div className="text-center mt-3 text-[11px] text-slate-500 font-medium">
                    ● Live Interactive WhatsApp Preview
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
