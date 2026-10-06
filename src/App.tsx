import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  AlertCircle,
  Camera,
  Volume2,
  VolumeX,
  Users,
  ArrowRight,
  ArrowLeft
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
    bio: 'Oversees patient coordination, clinical standards, and hospital operating theatre scheduling inside St. James Hospital, Sliema.',
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
    title: "New Teeth in One Day",
    tagline: "Fixed Teeth • No Dentures",
    image: "clinic/scanning_in_surgery.jpg",
    bgClass: "bg-white",
    accentColor: "#142B4D",
    summary: "Replace missing or loose teeth with brand new teeth fixed permanently. You can chew, smile, and talk naturally on the very same day.",
    bullets: ["Eat apples and all your favorite foods again", "Fixed tight so they never move or slip out", "Looks and feels just like your real teeth", "Painless treatment guided by 3D hospital scans"],
    desc: "Led by Dr. Mark Diacono and our surgical team at St. James Hospital. We place gentle dental implants that hold new teeth securely in your mouth. You walk in with missing teeth and walk out with fixed, stable teeth on the same day."
  },
  {
    num: "02",
    id: "CADCAM",
    title: "New Crowns in About an Hour",
    tagline: "Done in 1 Visit • Zero Mess",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    bgClass: "bg-white",
    accentColor: "#3EA3AC",
    summary: "We make your custom ceramic tooth while you relax in our lounge. No messy pink paste trays in your mouth. You go home with your finished crown today.",
    bullets: ["100% finished in just 60 minutes", "No messy impression paste in your mouth", "No temporary plastic caps that fall off", "Smooth, strong natural white porcelain"],
    desc: "Our on-site German ceramic milling machine sculpts your new tooth right in our clinic. We take a quick 3D photo of your tooth, design it on the computer, and carve it from strong porcelain in less than an hour."
  },
  {
    num: "03",
    id: "SEDATION",
    title: "Sleep Dentistry (No Fear, No Pain)",
    tagline: "100% Gentle & Relaxing",
    image: "frame_chair.jpg",
    bgClass: "bg-white",
    accentColor: "#142B4D",
    summary: "Nervous about visiting the dentist? A hospital doctor gives you gentle sleep medicine so you take a peaceful nap while we fix your teeth.",
    bullets: ["Hospital doctor stays right beside you", "You drift into a peaceful, calm sleep", "Zero pain, zero scary sounds or memories", "Wake up rested with all treatment completed"],
    desc: "Special care for nervous or worried patients. A hospital anaesthetist gives you gentle intravenous sedation. You feel completely relaxed and peaceful, and when you wake up, your dental treatment is completely done."
  },
  {
    num: "04",
    id: "DSD",
    title: "Try On Your New Smile First",
    tagline: "★ See It In The Mirror First",
    image: "clinic/scanning_pt.jpg",
    bgClass: "bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20",
    accentColor: "#D4AF37",
    isGold: true,
    summary: "See your new smile before we do any work. We put a temporary model in your mouth so you can look in the mirror and smile with confidence.",
    bullets: ["Look in the mirror before making any choice", "Designed to fit your face and lips naturally", "Zero surprises — you approve how it looks", "Take photos to show your friends and family"],
    desc: "Led by Dr. Susanna Diacono, Malta's first Digital Smile Design Master. We record your natural smile and speech on video, design your best smile on computer, and let you wear a real temporary preview in your mouth."
  },
  {
    num: "05",
    id: "SURGERY",
    title: "Gentle Surgery & Wisdom Teeth",
    tagline: "Sterile Hospital Theatres",
    image: "clinic/explaining_treatment_to_pt.jpg",
    bgClass: "bg-white",
    accentColor: "#142B4D",
    summary: "Removing painful wisdom teeth or fixing bone problems inside a clean hospital operating room with gentle, modern instruments.",
    bullets: ["Gentle care for painful wisdom teeth", "Clean hospital operating suites", "Gentle tools protect your gums and nerves", "Fast, peaceful healing with doctor follow-up"],
    desc: "Operating inside St. James Hospital, our specialist oral surgeons use gentle ultrasonic tools that cut bone without harming soft gums or nerves, making healing much faster and more comfortable."
  },
  {
    num: "06",
    id: "ORTHO",
    title: "Clear Braces (Straight Teeth)",
    tagline: "Almost Invisible • Removable",
    image: "clinic/examination_for_fading_background.jpg",
    bgClass: "bg-white",
    accentColor: "#3EA3AC",
    summary: "Straighten crooked teeth with clear plastic trays you can barely see. Take them out whenever you want to eat your lunch or brush your teeth.",
    bullets: ["Clear plastic trays that no one notices", "Take them out to eat and brush easily", "Gentle tooth movement with no wire pokes", "Watch your smile get straighter each week"],
    desc: "Clear aligners for teenagers and adults. We plan your entire tooth movement in 3D so you can see your final straight smile on-screen before you even begin wearing your comfortable clear trays."
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
    clinic: "St. James Hospital, Sliema",
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

// Transparent Treatment Fees & Pricing Guide
const feesCategories = [
  {
    title: "Consultation & 3D Diagnostics",
    description: "Clear answers and 3D preview before starting any treatment",
    items: [
      {
        name: "Full Dental Exam & Specialist Consultation",
        price: "€75",
        features: ["Full mouth check with specialist", "Written personalized treatment plan", "Direct doctor discussion"]
      },
      {
        name: "Hospital Low-Dose 3D CBCT Bone Scan",
        price: "€120",
        features: ["Low-radiation hospital 3D scan", "Precise implant measurement", "Immediate digital report"]
      },
      {
        name: "Digital Smile Design (3D Smile Test-Drive)",
        price: "from €150",
        features: ["Try on real temporary mockup", "Look in mirror before starting", "Photo & video smile review"]
      }
    ]
  },
  {
    title: "Same-Day Teeth & Restorations",
    description: "Swiss titanium implants and 60-minute German ceramic crowns",
    items: [
      {
        name: "Single Swiss Titanium Implant",
        price: "from €850",
        features: ["Swiss biocompatible implant", "Lifetime warranty registered", "Sterile hospital theatre"]
      },
      {
        name: "CEREC Same-Day 3D Porcelain Crown",
        price: "from €550",
        features: ["Diamond-milled in 1 hour on-site", "No gooey impression paste", "Custom color shade match"]
      },
      {
        name: "All-on-4 Full Arch Same-Day Teeth",
        price: "Personalised Consultation",
        features: ["Walk out with fixed teeth same day", "No loose removable dentures", "Consultant surgical team"]
      }
    ]
  },
  {
    title: "Gentle Sleep Dentistry & Care",
    description: "Complete comfort with consultant hospital doctor",
    items: [
      {
        name: "Sleep Dentistry (IV Hospital Sedation)",
        price: "from €350",
        features: ["Consultant hospital anaesthetist", "Drift into a peaceful sleep", "Zero pain, zero memories"]
      },
      {
        name: "Gentle Dental Cleaning & Hygiene",
        price: "€70",
        features: ["Ultrasonic gentle clean", "Air-flow stain polishing", "Gum health assessment"]
      },
      {
        name: "Gentle Wisdom Tooth Removal",
        price: "from €180",
        features: ["Ultrasonic bone-sparing tools", "Sterile hospital suite", "Gentle, speedy healing"]
      }
    ]
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
    a: "Consultations can be booked instantly through our fast WhatsApp consultation flow with live chat preview or by calling (+356) 2329 1029. Our hospital patient coordinators will confirm a specialist slot within minutes."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroViewMode, setHeroViewMode] = useState<'video' | 'reception'>('video');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTeamTab, setActiveTeamTab] = useState<'all' | 'specialists' | 'general' | 'support'>('all');

  // WhatsApp Intake Modal State & Interactive Live Preview
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [isFullTeamDirectoryOpen, setIsFullTeamDirectoryOpen] = useState(false);
  const [heroVideoLayout, setHeroVideoLayout] = useState<'fullscreen' | 'compact'>('fullscreen');
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactPreference: 'WhatsApp' as 'WhatsApp' | 'Call Back' | 'Email',
    clinic: 'Sliema',
    treatment: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)',
    doctor: '',
    urgency: 'This week (Monday – Friday)',
    notes: ''
  });
  const [formValidationWarning, setFormValidationWarning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  // 4 Core Leading Specialists to display prominently in main page
  const coreSpecialists = useMemo(() => [
    cliniciansList.find(c => c.id === 'dr-mark')!,
    cliniciansList.find(c => c.id === 'dr-susanna')!,
    cliniciansList.find(c => c.id === 'prof-nikolai')!,
    cliniciansList.find(c => c.id === 'dr-laura')!,
  ], []);

  // 21st.dev Style Scroll-Linked Transforms for Cinematic Hero (Scroll-Down Shrink & Docking)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });

  // When scrolling down, the entire hero scales down (from 1.0 down to 0.88), corners round smoothly (0px -> 24px)
  const heroCardScale = useTransform(heroProgress, [0, 0.85], [1, 0.88]);
  const heroCardRadius = useTransform(heroProgress, [0, 0.85], ["0px", "24px"]);
  const heroContentY = useTransform(heroProgress, [0, 0.7], [0, -50]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.75], [1, 0.3]);

  // 21st.dev Style Scroll-Driven Horizontal Translation for Clinical Services (01 - 06)
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start start", "end end"]
  });

  const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-62%"]);

  const toggleVideoPlay = () => {
    if (!heroVideoRef.current) return;
    if (heroVideoRef.current.paused) {
      heroVideoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      heroVideoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

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
    const firstNameText = bookingForm.firstName.trim();
    const lastNameText = bookingForm.lastName.trim();
    const patientName = (firstNameText || lastNameText) ? `${firstNameText} ${lastNameText}`.trim() : '[Patient Name]';
    const phoneText = bookingForm.phone.trim() || '[Phone Number]';
    const emailText = bookingForm.email.trim() ? `\n✉️ *Email:* ${bookingForm.email.trim()}` : '';
    const preference = bookingForm.contactPreference;
    const clinicName = 'St. James Hospital (Sliema Flagship)';
    const treatmentText = bookingForm.treatment || 'Clinical Consultation';
    const doctorText = bookingForm.doctor ? `\n👨‍⚕️ *Requested Clinician:* ${bookingForm.doctor}` : '';
    const urgencyText = bookingForm.urgency || 'This week';
    const notesText = bookingForm.notes.trim() ? `\n📝 *Notes / Symptoms:* ${bookingForm.notes.trim()}` : '';

    return `👋 *CLINICAL APPOINTMENT REQUEST • DiU CLINIC MALTA*
━━━━━━━━━━━━━━━━━━
👤 *Patient:* ${patientName}
📱 *Phone:* ${phoneText}${emailText}
🔔 *Preferred Contact Method:* ${preference}
🏛️ *Hospital Centre:* ${clinicName}
🦷 *Treatment:* ${treatmentText}${doctorText}
⏰ *Timeline / Urgency:* ${urgencyText}${notesText}
━━━━━━━━━━━━━━━━━━
_Sent via the official portal of DiU Clinic Malta (St. James Hospital Network). Please confirm appointment availability._`;
  };

  // Send WhatsApp Link
  const handleSendWhatsApp = () => {
    if (!bookingForm.firstName.trim() || !bookingForm.phone.trim()) {
      setFormValidationWarning(true);
      return;
    }
    const phoneTarget = '35699991029';
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

  const filteredClinicians = useMemo(() => {
    if (!showAllTeam && activeTeamTab === 'all') {
      return cliniciansList.slice(0, 5);
    }
    if (activeTeamTab === 'all') return cliniciansList;
    return cliniciansList.filter(c => c.category === activeTeamTab);
  }, [showAllTeam, activeTeamTab]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#3EA3AC]/20 selection:text-[#142B4D] overflow-x-clip font-body">

      {/* 1. TOP STICKY HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-[0_4px_25px_rgba(20,43,77,0.06)] text-slate-800' 
            : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-4 sm:py-5 text-white border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <FullLogo className="h-8 sm:h-9 w-auto" light={!isScrolled} />
            <div className={`hidden lg:block border-l pl-3 ${isScrolled ? 'border-slate-200/80' : 'border-white/20'}`}>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3EA3AC] block">
                St. James Hospital Network
              </span>
              <span className={`text-[11px] font-semibold block ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`}>
                Sliema Flagship
              </span>
            </div>
          </div>

          {/* Desktop Nav Links - Streamlined, High-End Luxury Editorial */}
          <nav className={`hidden xl:flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.18em] ${isScrolled ? 'text-slate-600' : 'text-white/85'}`}>
            <button 
              onClick={() => scrollToSection('services-section')}
              className={`hover:text-[#3EA3AC] transition-colors cursor-pointer bg-transparent border-none py-1 ${isScrolled ? 'hover:text-[#142B4D]' : 'hover:text-white'}`}
            >
              Treatments
            </button>
            <button 
              onClick={() => scrollToSection('digital-smile-design')}
              className={`hover:text-[#3EA3AC] transition-colors cursor-pointer bg-transparent border-none py-1 flex items-center gap-1.5 ${isScrolled ? 'hover:text-[#142B4D]' : 'hover:text-white'}`}
            >
              <span>Smile Design</span>
              <span className="px-1.5 py-0.5 text-[9px] bg-amber-500/20 text-amber-300 font-extrabold rounded-none sm:rounded-sm border border-amber-400/40">
                Gold
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('our-team')}
              className={`hover:text-[#3EA3AC] transition-colors cursor-pointer bg-transparent border-none py-1 ${isScrolled ? 'hover:text-[#142B4D]' : 'hover:text-white'}`}
            >
              Our Specialists
            </button>
            <button 
              onClick={() => scrollToSection('fees-prices')}
              className={`hover:text-[#3EA3AC] transition-colors cursor-pointer bg-transparent border-none py-1 ${isScrolled ? 'hover:text-[#142B4D]' : 'hover:text-white'}`}
            >
              Fees & Prices
            </button>
            <button 
              onClick={() => scrollToSection('clinics')}
              className={`hover:text-[#3EA3AC] transition-colors cursor-pointer bg-transparent border-none py-1 ${isScrolled ? 'hover:text-[#142B4D]' : 'hover:text-white'}`}
            >
              Hospital Centre
            </button>
          </nav>

          {/* Contact, Urgent & CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Urgent Dental Emergency Button */}
            <button
              onClick={() => setEmergencyModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-none sm:rounded-sm font-extrabold text-[11px] uppercase tracking-wider transition-all border cursor-pointer shadow-xs ${
                isScrolled 
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300' 
                  : 'bg-rose-500/25 hover:bg-rose-500/35 text-rose-100 border-rose-400/50'
              }`}
            >
              <AlertCircle className={`w-3.5 h-3.5 ${isScrolled ? 'text-rose-600' : 'text-rose-300'}`} />
              <span>Urgent Care</span>
            </button>

            <a 
              href="tel:35623291029"
              className={`hidden lg:flex items-center gap-2 text-xs font-semibold px-2 py-1.5 transition-colors no-underline tracking-wide ${
                isScrolled ? 'text-[#142B4D] hover:text-[#3EA3AC]' : 'text-white hover:text-[#3EA3AC]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
              <span>+356 2329 1029</span>
            </a>

            <button
              onClick={() => openWhatsAppBooking()}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-none sm:rounded-sm font-bold text-xs uppercase tracking-[0.14em] transition-all shadow-sm hover:shadow cursor-pointer border ${
                isScrolled 
                  ? 'bg-[#142B4D] hover:bg-[#0c1c33] text-white border-[#142B4D]' 
                  : 'bg-[#3EA3AC] hover:bg-[#358f97] text-white border-[#3EA3AC]'
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${isScrolled ? 'text-[#3EA3AC]' : 'text-white'}`} />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-none sm:rounded-sm cursor-pointer border ${
                isScrolled 
                  ? 'bg-slate-100 text-slate-800 border-slate-200' 
                  : 'bg-white/10 text-white border-white/20'
              }`}
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
              className="xl:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-5 flex flex-col gap-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xl"
            >
              <button 
                onClick={() => scrollToSection('services-section')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Treatments
              </button>
              <button 
                onClick={() => scrollToSection('digital-smile-design')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer flex items-center justify-between"
              >
                <span>Smile Design</span>
                <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 border border-amber-200">✦ Gold Provider</span>
              </button>
              <button 
                onClick={() => scrollToSection('our-team')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Our Specialists
              </button>
              <button 
                onClick={() => scrollToSection('fees-prices')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Fees & Prices
              </button>
              <button 
                onClick={() => scrollToSection('clinics')}
                className="text-left py-2 hover:text-[#142B4D] bg-transparent border-none cursor-pointer"
              >
                Hospital Centre (Sliema)
              </button>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setEmergencyModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-none sm:rounded-sm bg-rose-50 text-rose-800 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-rose-200"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>🚨 Urgent Dental Emergency</span>
                </button>
                <a 
                  href="tel:35623291029"
                  className="flex items-center gap-2 py-1.5 text-xs font-bold text-[#142B4D] no-underline tracking-normal normal-case"
                >
                  <Phone className="w-4 h-4 text-[#3EA3AC]" />
                  <span>Hospital Line: (+356) 2329 1029</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppBooking();
                }}
                className="w-full mt-2 py-3.5 rounded-none sm:rounded-sm bg-[#142B4D] text-white font-extrabold text-center text-xs uppercase tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#3EA3AC]" />
                <span>Book a Consultation</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 bg-[#F8FAFC]">

        {/* 2. HERO SECTION: FULL-BLEED CINEMATIC 4K VIDEO + SCROLL DOWNSCALING DOCK (21ST.DEV) + PROGRESSIVE EDITORIAL TYPOGRAPHY */}
        <div 
          id="hero" 
          ref={heroSectionRef} 
          className="relative w-full h-[165vh] bg-[#F8FAFC]"
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center p-0">
            
            {/* The Animated Hero Canvas: Starts 100% full-screen edge-to-edge, smoothly shrinks down to dock on scroll */}
            <motion.div 
              style={{ 
                scale: heroCardScale,
                borderRadius: heroCardRadius
              }}
              className="relative w-full h-full overflow-hidden shadow-2xl bg-slate-950 will-change-transform border border-slate-800/40 flex items-center justify-center"
            >
              <video
                ref={heroVideoRef}
                src={getAssetUrl('video_hero_optimized.mp4')}
                poster={getAssetUrl('hero_poster_4k.jpg')}
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
              />
              
              {/* Deep Cinematic Vignette & Readability Gradients (Video is 100% visible, text is crystal clear) */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/25 pointer-events-none z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/60 pointer-events-none z-[1]" />

              {/* Progressive Floating Editorial Text Layer */}
              <motion.div 
                style={{ y: heroContentY, opacity: heroContentOpacity }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20"
              >
                <div className="max-w-3xl">
                  
                  {/* 1. Hospital Location Pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-[#3EA3AC] text-xs font-black uppercase tracking-[0.22em] mb-6 shadow-md"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#3EA3AC]" />
                    <span>ST. JAMES HOSPITAL • SLIEMA</span>
                  </motion.div>

                  {/* 2. Giant Commanding Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.03] mb-6 font-editorial text-white drop-shadow-2xl"
                  >
                    Trusted by families <br />
                    <span className="text-[#3EA3AC] font-medium">for over 25 years.</span>
                  </motion.h1>

                  {/* 3. Simple Warm Subtitle (Level 3rd Grade, Large & Legible) */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-2xl md:text-3xl text-slate-200 font-normal leading-relaxed mb-8 sm:mb-10 max-w-2xl font-body drop-shadow"
                  >
                    All your dental care in one safe hospital. Same-day fixed teeth, 1-hour porcelain crowns, and gentle sleep dentistry.
                  </motion.p>

                  {/* 4. High-Impact Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
                  >
                    <button
                      onClick={() => openWhatsAppBooking()}
                      className="px-7 sm:px-9 py-4 sm:py-4.5 rounded-none sm:rounded-sm bg-[#3EA3AC] hover:bg-[#358f97] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2.5 border border-[#3EA3AC]"
                    >
                      <span>Book Consultation</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setEmergencyModalOpen(true)}
                      className="px-6 sm:px-8 py-4 sm:py-4.5 rounded-none sm:rounded-sm bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 border border-rose-500"
                    >
                      <AlertCircle className="w-4 h-4 text-white" />
                      <span>🚨 Urgent Care</span>
                    </button>

                    <button
                      onClick={() => scrollToSection('services-section')}
                      className="px-6 sm:px-7 py-4 sm:py-4.5 rounded-none sm:rounded-sm bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Explore Treatments</span>
                      <ChevronDown className="w-4 h-4 text-[#3EA3AC]" />
                    </button>
                  </motion.div>

                  {/* 5. Direct Emergency Call Quick Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.95 }}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Hospital direct line:</span>
                    <a href="tel:35623291029" className="text-white font-extrabold hover:text-[#3EA3AC] transition-colors underline decoration-[#3EA3AC]">
                      (+356) 2329 1029
                    </a>
                    <span className="text-slate-400">· 24/7 Emergency:</span>
                    <a href="tel:35623291000" className="text-white font-extrabold hover:text-rose-400 transition-colors underline decoration-rose-400">
                      2329 1000
                    </a>
                  </motion.div>

                </div>
              </motion.div>

              {/* Scroll Indicator Pill at Bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/70 pointer-events-none"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">Scroll Down</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#3EA3AC]" />
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Under-Hero Dark Blue Quick Info Banner (Matching Client Artifact Frame 01s) */}
        <div className="relative z-20 bg-[#142B4D] text-white py-6 border-y border-[#0c1c33]">
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

        {/* 2. COMPREHENSIVE CLINICAL SPECIALTIES (21ST.DEV SCROLL-DRIVEN HORIZONTAL TRACK #1) */}
        <div 
          id="services-section" 
          ref={servicesSectionRef}
          className="relative lg:h-[250vh] bg-white border-b border-slate-200/80"
        >
          <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-center py-20 lg:py-0 px-4 sm:px-8 lg:px-14">
            
            <div className="max-w-7xl mx-auto w-full mb-8 lg:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4 text-[#3EA3AC]" />
                  <span>Advanced Clinical Specialties [ 01 – 06 ]</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight font-editorial">
                  Comprehensive Care For <span className="text-[#142B4D]">Every Patient</span>
                </h2>
              </div>
              <div className="text-xs font-semibold text-slate-500 hidden lg:flex items-center gap-2">
                <span>Scroll vertically to glide through procedures</span>
                <ChevronRight className="w-4 h-4 text-[#3EA3AC] animate-pulse" />
              </div>
            </div>

            {/* Desktop Horizontal Sliding Track (Scroll-Driven via servicesX) */}
            <div className="hidden lg:block w-full overflow-hidden">
              <motion.div 
                style={{ x: servicesX }}
                className="flex gap-8 will-change-transform pr-24"
              >
                {servicesData.map((svc) => (
                  <div
                    key={svc.id}
                    className={`w-[420px] xl:w-[460px] shrink-0 rounded-none sm:rounded-sm border ${
                      svc.isGold 
                        ? 'border-amber-400 shadow-md ring-1 ring-amber-300' 
                        : 'border-slate-200/90 shadow-2xs'
                    } flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer overflow-hidden ${svc.bgClass}`}
                    onClick={() => setSelectedService(svc)}
                  >
                    {/* Real Clinical Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                      <img
                        src={getAssetUrl(svc.image)}
                        alt={svc.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-none sm:rounded-sm bg-white/95 backdrop-blur-md text-[#142B4D] text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-2xs">
                        [ {svc.num} ]
                      </div>
                      <div className="absolute top-3 right-3">
                        <span 
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-none sm:rounded-sm uppercase tracking-wider backdrop-blur-md ${
                            svc.isGold 
                              ? 'bg-amber-100/95 text-amber-900 border border-amber-300' 
                              : 'bg-white/95 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {svc.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-2.5 tracking-tight font-heading">
                          {svc.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-body">
                          {svc.summary}
                        </p>

                        <ul className="space-y-2 mb-6">
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
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile / Tablet Responsive Horizontal Carousel with Touch Scroll */}
            <div className="lg:hidden flex gap-5 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth">
              {servicesData.map((svc) => (
                <div
                  key={svc.id}
                  className={`w-[85vw] max-w-[340px] shrink-0 rounded-none sm:rounded-sm border ${
                    svc.isGold 
                      ? 'border-amber-400 shadow-md ring-1 ring-amber-300' 
                      : 'border-slate-200/90 shadow-2xs'
                  } flex flex-col justify-between overflow-hidden ${svc.bgClass}`}
                  onClick={() => setSelectedService(svc)}
                >
                  {/* Real Clinical Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img
                      src={getAssetUrl(svc.image)}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-none sm:rounded-sm bg-white/95 text-[#142B4D] text-[9px] font-extrabold uppercase tracking-wider border border-slate-200">
                      [ {svc.num} ]
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span 
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-none sm:rounded-sm uppercase tracking-wider ${
                          svc.isGold 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {svc.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-950 mb-1.5 tracking-tight font-heading">
                        {svc.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mb-3.5 font-body">
                        {svc.summary}
                      </p>

                      <ul className="space-y-1.5 mb-5">
                        {svc.bullets.slice(0, 3).map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3EA3AC] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openWhatsAppBooking({ treatment: svc.title });
                        }}
                        className="flex items-center gap-1 px-3.5 py-2 rounded-none sm:rounded-sm bg-[#142B4D] text-white font-extrabold text-xs uppercase tracking-wider"
                      >
                        <span>Book</span>
                      </button>
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 3. AWARD-WINNING RESTORATIONS: 3-TOOTH ABSENCE VS FIXED CERAMIC IMPLANTS (Moved higher up) */}
        <section 
          id="smile-results" 
          className="bg-white text-slate-950 pt-20 pb-28 border-b border-slate-200/90 relative z-20"
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
                <span>Real Smiles We Have Fixed [ Before vs After ]</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight font-editorial text-slate-950 mb-4 leading-tight">
                Award-Winning Restorations
              </h2>
              <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto font-body">
                Drag the slider with your finger or mouse to see how we fixed missing teeth with strong, permanent new teeth that look and feel real.
              </p>
            </motion.div>

            {/* Interactive Before & After Slider */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-[#F8FAFC] p-4 sm:p-8 rounded-none sm:rounded-sm border border-slate-200/90 shadow-xl">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#3EA3AC] font-heading">
                      Fixed Swiss Dental Implants Case
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-slate-950 font-editorial">
                      3 Missing Teeth Restored to Fixed Perfection
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
                    BEFORE: 3 Missing Teeth
                  </div>
                  <div className="absolute top-3 right-3 z-10 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-[#142B4D] text-white text-[10px] sm:text-xs font-bold border border-blue-400/40 shadow-md">
                    AFTER: Brand New Fixed Teeth
                  </div>
                </div>

                {/* Footer trigger */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-none sm:rounded-sm bg-white border border-slate-200 text-slate-800">
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

        {/* 4. FOR ANXIOUS PATIENTS: SAFE, GENTLE HANDS & HOSPITAL SEDATION (Vertical Flow) */}
        <section 
          id="anxious-patients"
          className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Image: The Actual Clinic Waiting Lounge */}
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

              {/* Right Content */}
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

                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.06] mb-6 font-editorial text-slate-950">
                  You’re in safe, <br className="hidden sm:block" />
                  <span className="text-[#3EA3AC]">gentle hands.</span>
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

        {/* 4. SIGNATURE GOLDEN FEATURE: DIGITAL SMILE DESIGN (DSD) — REQUESTED TOP SERVICE */}
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
              
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight font-editorial text-slate-950 leading-tight">
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

            {/* High-Tech In-Surgery Scanning Visual Showcase (DSD Technology in Action) */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-none sm:rounded-sm overflow-hidden border border-amber-200 aspect-[16/10] bg-slate-100 shadow-sm">
                <img 
                  src={getAssetUrl('clinic/md_3d_scanner_and_pt.jpg')} 
                  alt="Dr. Mark Diacono with 3D Scanner and Patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-none sm:rounded-sm text-xs font-bold text-slate-900 border border-slate-200 shadow-2xs">
                  Intraoral 3D Digital Scanning with Dr. Mark Diacono
                </div>
              </div>
              <div className="relative rounded-none sm:rounded-sm overflow-hidden border border-amber-200 aspect-[16/10] bg-slate-100 shadow-sm">
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

        {/* 5. OUR CLINICIANS & MEDICAL TEAM: 4 FOCUSED SPECIALISTS + INTERNAL FULL TEAM DIRECTORY BUTTON */}
        <section 
          id="our-team"
          className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header: Client Wording with Large Editorial Typography */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
                <User className="w-4 h-4 text-[#3EA3AC]" />
                <span>OUR CLINICIANS • ST. JAMES HOSPITAL</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight font-editorial mb-4">
                Our Experts in <span className="text-[#142B4D]">Oral Health</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed max-w-2xl mx-auto">
                Led by pioneers in surgical implantology and Digital Smile Design, our senior medical specialists deliver predictable hospital-standard dental care in Malta.
              </p>
            </div>

            {/* 4 Focused Specialist Cards with Rich Architectural Styling & Animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
              {coreSpecialists.map((person, idx) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="rounded-none sm:rounded-sm bg-white border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  <div>
                    {/* Portrait Photo Container */}
                    <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
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
                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl font-bold text-slate-950 mb-1 font-heading group-hover:text-[#3EA3AC] transition-colors">
                        {person.name}
                      </h3>
                      
                      <div className="text-xs font-bold text-[#142B4D] uppercase tracking-wider mb-1 font-heading">
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
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={() => openWhatsAppBooking({
                        doctor: person.name,
                        treatment: person.treatmentDefault
                      })}
                      className="w-full py-3 rounded-none sm:rounded-sm bg-slate-50 hover:bg-[#142B4D] text-slate-800 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 hover:border-[#142B4D] transition-colors cursor-pointer flex items-center justify-center gap-1.5 group-hover:bg-[#142B4D] group-hover:text-white"
                    >
                      <span>Inquire with {person.name.split(' ')[0]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#3EA3AC]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Clear, Prominent Call-to-Action to View All Team Members (Internal Directory) */}
            <div className="mt-14 sm:mt-16 text-center flex flex-col items-center justify-center">
              <button
                onClick={() => setIsFullTeamDirectoryOpen(true)}
                className="px-8 sm:px-12 py-4 sm:py-5 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer inline-flex items-center gap-3.5 border border-[#142B4D] group"
              >
                <Users className="w-4 h-4 text-[#3EA3AC]" />
                <span>View Full Medical Team & Specialists (19)</span>
                <ArrowRight className="w-4 h-4 text-[#3EA3AC] group-hover:translate-x-1.5 transition-transform" />
              </button>
              <p className="mt-3.5 text-xs sm:text-sm text-slate-500 font-medium">
                Click to explore our complete roster of 19 surgeons, prosthodontists, dentists, hygienists, and hospital care coordinators.
              </p>
            </div>

          </div>
        </section>

        {/* 6. TRANSPARENT TREATMENT FEES & PRICES GUIDE */}
        <section 
          id="fees-prices" 
          className="py-24 md:py-32 bg-white border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-blue-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
                <CreditCard className="w-4 h-4 text-[#3EA3AC]" />
                <span>Transparent Treatment Fees & Pricing Guide</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight font-editorial">
                Clear, Honest <span className="text-[#142B4D]">Hospital Fees</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3 font-body">
                No surprises or hidden fees. Every patient receives a clear written plan with exact prices after their examination at St. James Hospital.
              </p>
            </div>

            {/* 3 Pricing Category Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
              {feesCategories.map((cat, idx) => (
                <div 
                  key={idx}
                  className="rounded-none sm:rounded-sm border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#3EA3AC] mb-1 font-heading">
                      [ Category 0{idx + 1} ]
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-2 font-heading">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-6 font-body">
                      {cat.description}
                    </p>

                    <div className="space-y-4">
                      {cat.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="bg-white p-4 rounded-none sm:rounded-sm border border-slate-200/80 shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span className="text-sm font-bold text-slate-900 leading-snug">
                              {item.name}
                            </span>
                            <span className="text-base font-extrabold text-[#142B4D] shrink-0 font-heading">
                              {item.price}
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {item.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                                <Check className="w-3 h-3 text-[#3EA3AC] shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200">
                    <button
                      onClick={() => openWhatsAppBooking({ treatment: cat.items[0].name })}
                      className="w-full py-3 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#142B4D]"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>Book For This Category</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Insurance & Hospital direct billing banner */}
            <div className="p-6 sm:p-8 rounded-none sm:rounded-sm bg-gradient-to-r from-blue-50/70 via-white to-teal-50/50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none sm:rounded-sm bg-[#142B4D] text-[#3EA3AC] flex items-center justify-center shrink-0 border border-[#142B4D]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Private Health Insurance & Direct St. James Hospital Coordination
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    We provide official receipts, dental claim forms, and hospital surgical invoices for all local and European insurance providers.
                  </p>
                </div>
              </div>
              <button
                onClick={() => openWhatsAppBooking({ notes: 'Requesting insurance claim & billing estimate' })}
                className="px-6 py-3 rounded-none sm:rounded-sm bg-white hover:bg-slate-50 text-[#142B4D] font-bold text-xs uppercase tracking-wider border border-slate-300 shrink-0 transition-colors cursor-pointer shadow-2xs"
              >
                Inquire on Insurance
              </button>
            </div>

          </div>
        </section>


        {/* 9. THE HOSPITAL CENTRE & NAVIGATION (ST. JAMES HOSPITAL SLIEMA + 3 PHOTO STEPS) */}
        <section id="clinics" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-blue-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
                <Building2 className="w-4 h-4 text-[#3EA3AC]" />
                <span>Flagship Hospital Centre • Sliema</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight font-heading">
                St. James Hospital (Sliema)
              </h2>
              <p className="text-slate-600 text-base sm:text-xl mt-3 font-body">
                Malta's premier accredited private hospital facility, equipped with sterile operating theatres and advanced 3D diagnostics.
              </p>
            </div>

            {/* Single Flagship Clinic Showcase */}
            <div className="mb-16">
              {clinicLocations.map((clinic) => (
                <div
                  key={clinic.id}
                  className="rounded-none sm:rounded-sm bg-white border border-slate-200/90 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
                >
                  {/* Left Imagery Column */}
                  <div className="lg:col-span-6 relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-slate-100 flex flex-col">
                    <img
                      src={getAssetUrl(clinic.image)}
                      alt={clinic.name}
                      className="w-full h-full object-cover min-h-[380px]"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-white/95 backdrop-blur-md text-[#142B4D] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-sm">
                      {clinic.tag}
                    </div>
                  </div>

                  {/* Right Details Column */}
                  <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3EA3AC] mb-2 font-heading">
                        <span>Accredited Private Hospital Facility</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-6 tracking-tight font-heading">
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
                            <div className="text-xl font-extrabold text-[#142B4D]">{clinic.phone}</div>
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

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => openWhatsAppBooking({ clinic: 'Sliema' })}
                        className="flex-1 py-4 px-6 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer border border-[#142B4D] shadow-sm text-center flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4 text-[#3EA3AC]" />
                        <span>Book Consultation at St. James Hospital</span>
                      </button>
                      <a
                        href={`tel:+${clinic.phoneClean}`}
                        className="px-7 py-4 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 no-underline flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-[#3EA3AC]" />
                        <span>Call Hospital</span>
                      </a>
                    </div>
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

        {/* 10. DIRECT CONSULTATION DESK (VIP HOSPITAL CONCIERGE) */}
        <section id="booking" className="py-24 md:py-32 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-5xl mx-auto rounded-none sm:rounded-sm bg-white p-8 sm:p-14 shadow-xl border border-slate-200/90">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 text-[#142B4D] text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                    <Calendar className="w-3.5 h-3.5 text-[#3EA3AC]" />
                    <span>Direct Hospital Intake Desk • Sliema</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight mb-4 font-editorial text-slate-950">
                    Direct Access to Malta’s <span className="text-[#3EA3AC]">Oral Specialists</span>
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                    Skip long clinic queues. Connect directly with our patient coordinators at St. James Hospital for priority surgical consultations, 3D CBCT diagnostic appointments, and same-day dental evaluations.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openWhatsAppBooking()}
                      className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer border border-[#142B4D]"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#3EA3AC]" />
                      <span>Launch WhatsApp Concierge</span>
                    </button>
                    <a
                      href="tel:+35623291029"
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 no-underline transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#3EA3AC]" />
                      <span>Call Hospital (+356 2329 1029)</span>
                    </a>
                  </div>
                </div>

                {/* VIP Coordinator Info Card */}
                <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-none sm:rounded-sm border border-slate-200">
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#3EA3AC] mb-1 font-heading">
                    Dedicated Patient Care
                  </div>
                  <div className="text-lg font-bold text-slate-950 mb-4 font-heading">
                    Hospital Coordination Team
                  </div>

                  <div className="space-y-4 mb-6 text-xs text-slate-700">
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#142B4D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Hospital Operating Hours</div>
                        <div className="text-slate-600">Monday – Friday: 08:30 – 19:00</div>
                        <div className="text-slate-600">Saturday: 08:30 – 13:00</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#142B4D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Hospital Floor & Entrance</div>
                        <div className="text-slate-600">Lower Ground (LG), St. James Hospital, Sliema</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-[#3EA3AC] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Emergency & Out-Of-Hours</div>
                        <div className="text-slate-600">Hospital direct line: <strong>2329 1000</strong> (24/7)</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-none sm:rounded-sm flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span>Average coordinator reply:</span>
                    <span className="text-[#3EA3AC] font-bold">Under 15 minutes</span>
                  </div>
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
                  
                  {/* First Name & Last Name (Separated per CEO Jordan Pozo's request) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#3EA3AC]" />
                        <span>First Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Christopher"
                        value={bookingForm.firstName}
                        onChange={(e) => setBookingForm({ ...bookingForm, firstName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#3EA3AC]" />
                        <span>Last Name *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Borg"
                        value={bookingForm.lastName}
                        onChange={(e) => setBookingForm({ ...bookingForm, lastName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Method (WhatsApp | Call Back | Email per CEO request) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>How do you prefer to be contacted? *</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WhatsApp', 'Call Back', 'Email'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setBookingForm({ ...bookingForm, contactPreference: method })}
                          className={`py-3 px-2 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                            bookingForm.contactPreference === method
                              ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {method === 'WhatsApp' ? '💬 WhatsApp' : method === 'Call Back' ? '📞 Call Back' : '✉️ Email'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phone & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +356 9912 3456"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#3EA3AC]" />
                        <span>Email (Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. christopher@gmail.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#3EA3AC] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Hospital Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#3EA3AC]" />
                      <span>Hospital Centre</span>
                    </label>
                    <div className="p-3.5 rounded-none sm:rounded-sm bg-teal-50/70 border border-[#3EA3AC]/50 text-slate-950 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-extrabold text-[#142B4D]">St. James Hospital (Sliema Flagship)</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">George Borg Olivier Street, Sliema • Ground Floor / LG</div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-none sm:rounded-sm">
                        <Check className="w-3.5 h-3.5 text-[#3EA3AC]" />
                        <span>Flagship Centre</span>
                      </span>
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
                      <span>Please enter your First Name and Phone Number to proceed.</span>
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
                        <div>👤 <strong>Patient:</strong> {`${bookingForm.firstName} ${bookingForm.lastName}`.trim() || '[Your Name]'}</div>
                        <div>📱 <strong>Phone:</strong> {bookingForm.phone.trim() || '[Your Phone]'}</div>
                        {bookingForm.email.trim() && <div>✉️ <strong>Email:</strong> {bookingForm.email.trim()}</div>}
                        <div>🔔 <strong>Preferred Contact:</strong> {bookingForm.contactPreference}</div>
                        <div>🏛️ <strong>Location:</strong> St. James Hospital (Sliema)</div>
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

      {/* 18. DENTAL EMERGENCY MODAL */}
      <AnimatePresence>
        {emergencyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border-2 border-rose-300 rounded-none sm:rounded-sm shadow-2xl p-6 sm:p-10 text-slate-900 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200 transition-colors"
                aria-label="Close emergency modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Emergency Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none sm:rounded-sm bg-rose-50 text-rose-900 text-xs font-black uppercase tracking-wider mb-2 border border-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>St. James Hospital • Emergency Dental Care</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
                  Toothache, a broken tooth or a lost filling?
                </h3>
                <p className="text-slate-600 text-sm mt-2 font-body leading-relaxed">
                  We provide urgent treatment for severe pain, dental infections, knocked-out teeth, and facial trauma inside St. James Hospital in Sliema.
                </p>
              </div>

              {/* Direct Urgent Contact Channels */}
              <div className="space-y-4 mb-8">
                
                {/* 1. Opening Hours Line */}
                <div className="p-4 sm:p-5 rounded-none sm:rounded-sm bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#3EA3AC] font-heading">
                      During Opening Hours (Reception Desk)
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-[#142B4D]">
                      (+356) 2329 1029
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Mon, Tue, Thu 09:00–18:00 · Wed 09:00–17:30 · Fri, Sat 09:00–13:30
                    </div>
                  </div>
                  <a
                    href="tel:+35623291029"
                    className="px-5 py-3 rounded-none sm:rounded-sm bg-[#142B4D] hover:bg-[#0c1c33] text-white font-extrabold text-xs uppercase tracking-wider no-underline text-center shrink-0 flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3EA3AC]" />
                    <span>Call 2329 1029</span>
                  </a>
                </div>

                {/* 2. Out of Hours Hospital Emergency 24/7 */}
                <div className="p-4 sm:p-5 rounded-none sm:rounded-sm bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 font-heading flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                      <span>Out-Of-Hours & Hospital Emergency (24/7)</span>
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-rose-950">
                      (+356) 2329 1000
                    </div>
                    <div className="text-xs text-rose-800 mt-0.5">
                      St. James Hospital 24-hour medical emergency triage admission
                    </div>
                  </div>
                  <a
                    href="tel:+35623291000"
                    className="px-5 py-3 rounded-none sm:rounded-sm bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider no-underline text-center shrink-0 flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>Call Hospital 24/7</span>
                  </a>
                </div>

                {/* 3. Urgent WhatsApp Mobile */}
                <div className="p-4 sm:p-5 rounded-none sm:rounded-sm bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-heading">
                      Urgent WhatsApp Mobile
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-950">
                      (+356) 9999 1029
                    </div>
                    <div className="text-xs text-emerald-800 mt-0.5">
                      Message our team directly with photos or symptom notes
                    </div>
                  </div>
                  <a
                    href="https://wa.me/35699991029?text=Hello%20DiU%20Clinic,%20I%20have%20an%20urgent%20dental%20emergency."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-none sm:rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider no-underline text-center shrink-0 flex items-center justify-center gap-2 shadow-xs"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-slate-950" />
                    <span>WhatsApp 9999 1029</span>
                  </a>
                </div>

              </div>

              {/* Hospital Address and Email Footer */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#142B4D]" />
                  <span>St. James Hospital, George Borg Olivier Street, Sliema</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#3EA3AC]" />
                  <a href="mailto:appointment@dentalunitmalta.com" className="text-[#142B4D] hover:underline font-semibold">
                    appointment@dentalunitmalta.com
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL MEDICAL TEAM DIRECTORY INTERNAL PAGE MODAL */}
      <AnimatePresence>
        {isFullTeamDirectoryOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[70] bg-[#F8FAFC] overflow-y-auto"
          >
            {/* Internal Page Sticky Header */}
            <div className="sticky top-0 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3 px-4 sm:px-8 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsFullTeamDirectoryOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-none sm:rounded-sm bg-slate-100 hover:bg-slate-200 text-[#142B4D] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-slate-300"
                >
                  <ArrowLeft className="w-4 h-4 text-[#3EA3AC]" />
                  <span>Back to Overview</span>
                </button>
                <span className="hidden md:inline-block text-xs font-semibold text-slate-300">|</span>
                <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <FullLogo className="h-6 w-auto" light={false} />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[#142B4D] font-bold">Medical Team Directory (19 Clinicians)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setIsFullTeamDirectoryOpen(false);
                    openWhatsAppBooking();
                  }}
                  className="px-4 sm:px-5 py-2 rounded-none sm:rounded-sm bg-[#3EA3AC] hover:bg-[#358f97] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
                <button
                  onClick={() => setIsFullTeamDirectoryOpen(false)}
                  className="p-2 rounded-none sm:rounded-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer border border-slate-200"
                  aria-label="Close Team Directory"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Internal Page Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20">
              
              {/* Internal Banner */}
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none sm:rounded-sm bg-teal-50 border border-teal-200 text-[#3EA3AC] text-xs font-bold uppercase tracking-wider mb-3">
                  <Building2 className="w-3.5 h-3.5 text-[#3EA3AC]" />
                  <span>ST. JAMES HOSPITAL • SLIEMA CLINICAL ROSTER</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-950 tracking-tight font-editorial mb-4">
                  The Complete <span className="text-[#142B4D]">Medical Team</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed">
                  Explore all 19 oral surgeons, prosthodontists, general dentists, registered hygienists, and hospital care coordinators dedicated to your comfort and oral health.
                </p>
              </div>

              {/* Internal Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200">
                <button
                  onClick={() => setActiveTeamTab('all')}
                  className={`px-4 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTeamTab === 'all'
                      ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  All Clinicians ({cliniciansList.length})
                </button>
                <button
                  onClick={() => setActiveTeamTab('specialists')}
                  className={`px-4 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTeamTab === 'specialists'
                      ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  Specialists & Surgeons (5)
                </button>
                <button
                  onClick={() => setActiveTeamTab('general')}
                  className={`px-4 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTeamTab === 'general'
                      ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  General & Paediatric Dentists (4)
                </button>
                <button
                  onClick={() => setActiveTeamTab('support')}
                  className={`px-4 py-2.5 rounded-none sm:rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTeamTab === 'support'
                      ? 'bg-[#142B4D] text-white border-[#142B4D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  Care, Nursing & DSD Coordinators (10)
                </button>
              </div>

              {/* Clinicians Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {cliniciansList
                  .filter(c => activeTeamTab === 'all' || c.category === activeTeamTab)
                  .map((person) => (
                    <div
                      key={person.id}
                      className="rounded-none sm:rounded-sm bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                    >
                      <div>
                        <div className="relative aspect-[4/3.8] overflow-hidden bg-slate-100">
                          <img
                            src={getAssetUrl(person.photo)}
                            alt={person.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-none sm:rounded-sm bg-white/95 text-[#142B4D] text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-2xs">
                            {person.badge}
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="text-lg font-bold text-slate-950 mb-0.5 font-heading group-hover:text-[#3EA3AC] transition-colors truncate">
                            {person.name}
                          </h3>
                          
                          <div className="text-[11px] font-bold text-[#142B4D] uppercase tracking-wider mb-1 font-heading truncate">
                            {person.role}
                          </div>

                          <div className="text-[10px] text-[#3EA3AC] font-semibold mb-2.5 truncate">
                            {person.qualifications}
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-body line-clamp-3">
                            {person.bio}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <button
                          onClick={() => {
                            setIsFullTeamDirectoryOpen(false);
                            openWhatsAppBooking({
                              doctor: person.name,
                              treatment: person.treatmentDefault
                            });
                          }}
                          className="w-full py-2.5 rounded-none sm:rounded-sm bg-slate-50 hover:bg-[#142B4D] text-slate-800 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 hover:border-[#142B4D] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>Inquire with {person.name.split(' ')[0]}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#3EA3AC]" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Internal Directory Bottom Action Bar */}
              <div className="bg-[#142B4D] text-white p-8 sm:p-12 rounded-none sm:rounded-sm border border-[#0c1c33] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-editorial mb-2">
                    Ready to meet your chosen doctor?
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl font-body">
                    Schedule your consultation directly. Our hospital patient coordinators will confirm your specialist time slot within minutes.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setIsFullTeamDirectoryOpen(false);
                      openWhatsAppBooking();
                    }}
                    className="px-6 py-3.5 rounded-none sm:rounded-sm bg-[#3EA3AC] hover:bg-[#358f97] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setIsFullTeamDirectoryOpen(false)}
                    className="px-6 py-3.5 rounded-none sm:rounded-sm bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider cursor-pointer border border-white/20"
                  >
                    Return to Overview
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
