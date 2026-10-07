import { Clinician, ServiceItem, FeeCategory, PatientReview, FaqItem, BlogPost } from '@/types';

export const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const cliniciansList: Clinician[] = [
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
    treatmentDefault: 'Dental Implant & Oral Surgery'
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
    treatmentDefault: 'Digital Smile Design & Restorative Dentistry'
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
    treatmentDefault: 'Dental Implant & Oral Surgery'
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
    treatmentDefault: 'Dental Implant & Oral Surgery'
  },
  {
    id: 'dr-laura',
    name: 'Dr. Laura Cuschieri',
    category: 'specialists',
    role: 'Digital Dentistry & Composite Bonding',
    qualifications: 'MDS (Melit), MSc Digital Dentistry (Melit) with Distinction',
    badge: 'Aesthetic & Digital Specialist',
    photo: 'team/dr_laura_cuschieri.jpg',
    bio: 'Specializing in minimally invasive smile enhancements, optical 3D digital impressions, and biomimetic cosmetic composite bonding.',
    treatmentDefault: 'Digital Smile Design & Restorative Dentistry'
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
    treatmentDefault: 'Family & General Dentistry'
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
    treatmentDefault: 'Family & General Dentistry'
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
    treatmentDefault: 'Family & General Dentistry'
  },
  {
    id: 'mrs-mary-jane',
    name: 'Mrs. Mary-Jane Galea',
    category: 'general',
    role: 'Registered Dental Hygienist',
    qualifications: 'Registered Dental Hygienist',
    badge: 'Periodontal Prevention',
    photo: 'team/mrs_mary-jane_galea_dental_hyginist.jpg',
    bio: 'Specialist in ultrasonic periodontal hygiene, gentle stain removal, implant maintenance, and personalized oral preventive regimens.',
    treatmentDefault: 'Family & General Dentistry'
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
    treatmentDefault: 'Digital Smile Design & Restorative Dentistry'
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
    treatmentDefault: 'Initial Dental Consultation & Check-up'
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
    treatmentDefault: 'Initial Dental Consultation & Check-up'
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
    treatmentDefault: 'Initial Dental Consultation & Check-up'
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
    treatmentDefault: 'Treatment for Anxious Patients (Sedation)'
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
    treatmentDefault: 'Dental Implant & Oral Surgery'
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
    treatmentDefault: 'Digital Smile Design & Restorative Dentistry'
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
    treatmentDefault: 'Digital Smile Design & Restorative Dentistry'
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
    treatmentDefault: 'Dental Implant & Oral Surgery'
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
    treatmentDefault: 'Digital Smile Design & Restorative Dentistry'
  }
];

// Approved Treatments Matching Client Figma Frame 04s + Real Clinic Photos
export const approvedServices: ServiceItem[] = [
  {
    num: "01",
    id: "FAMILY",
    title: "Family & General Dentistry",
    tagline: "Everyday Care & Prevention",
    image: "clinic/examination_for_fading_background.jpg",
    bgClass: "bg-white",
    accentColor: "#2BB4A7",
    summary: "Everyday care to keep teeth and gums healthy at every age, with regular check-ups, hygienist visits, fillings and gentle dentistry for children.",
    bullets: [
      "Regular check-ups and preventative screenings",
      "Ultrasonic hygiene cleanings and stain removal",
      "Gentle paediatric dentistry for infants and children",
      "Minimally invasive tooth-coloured fillings"
    ],
    desc: "Our general dental team provides attentive, long-term oral care for your entire family. From routine hygiene cleanings and preventive fluoride treatments to paediatric appointments designed to make children feel at home, we protect your oral health at every stage of life.",
    clinicians: ["Dr Michael Rafferty (General Dentist)", "Dr Lisa Gatt (General Dentist)", "Mrs Mary-Jane Galea (Dental Hygienist)"]
  },
  {
    num: "02",
    id: "IMPLANTS",
    title: "Dental Implant & Oral Surgery",
    tagline: "Specialist Surgical Care",
    image: "clinic/scanning_in_surgery.jpg",
    bgClass: "bg-white",
    accentColor: "#0E2B4C",
    summary: "Oral surgery and implants, from a single tooth to full-mouth reconstruction, with specialist care.",
    bullets: [
      "Single tooth implants with Swiss biocompatible titanium",
      "Same-day All-on-4 / All-on-6 full arch fixed teeth",
      "Hospital-grade 3D CBCT bone diagnostics",
      "Sterile operating theatre surgical safety"
    ],
    desc: "Led by Dr. Mark Diacono and our consultant surgical team at St. James Hospital. We restore missing teeth with permanent, rock-solid implants. Using 3D computer-guided planning, our patients can receive immediate-load fixed teeth without removable dentures.",
    clinicians: ["Dr Mark Diacono (Principal Specialist Oral Surgeon)", "Prof. Nikolai Attard (Specialist Prosthodontist)", "Dr Fokion Iatridis (Specialist Prosthodontist)"]
  },
  {
    num: "03",
    id: "DSD",
    title: "Digital Smile Design & Restorative",
    tagline: "Facially Driven Smile Mockup",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    bgClass: "bg-white",
    accentColor: "#2BB4A7",
    isGold: true,
    summary: "Facially driven smile design, veneers, crowns, bridges, full-mouth reconstruction, root canal treatment and composite bonding.",
    bullets: [
      "3D facial dynamic scan and cosmetic harmony analysis",
      "Try on a temporary test-drive smile in your mouth first",
      "CEREC 1-hour German porcelain crowns & veneers",
      "Biomimetic aesthetic composite bonding"
    ],
    desc: "Led by Dr. Susanna Diacono, Malta's pioneer Digital Smile Design Master. We record your facial features and lip symmetry to craft a customized smile mockup that you can test-drive in the mirror before any permanent treatment begins.",
    clinicians: ["Dr Susanna Diacono (Restorative Dentist & DSD Master)", "Dr Laura Cuschieri (Digital Dentistry & Composite Bonding)"]
  },
  {
    num: "04",
    id: "ANXIOUS",
    title: "Treatment for Anxious Patients",
    tagline: "Hospital IV Sedation",
    image: "clinic/waiting_room_2.jpg",
    bgClass: "bg-white",
    accentColor: "#0E2B4C",
    summary: "Using sedation with a consultant anaesthetist, in a safe, hospital-based clinic. Available for all our treatments.",
    bullets: [
      "Consultant hospital anaesthetist stays by your side",
      "Drift into a peaceful, pain-free twilight sleep",
      "Zero frightening drill sounds, zero anxiety",
      "Complete multiple treatments in a single calm visit"
    ],
    desc: "If dental fear has caused you to put off needed treatment, our hospital-based IV sedation program ensures you feel completely safe and serene. You drift into a restful twilight state while our clinicians complete your care effortlessly.",
    clinicians: ["Supervised by Consultant Hospital Anaesthetists inside St. James Hospital"]
  }
];

// All booking treatment options (with General Consultation as #1 default per client notes)
export const bookingTreatmentOptions = [
  "Initial Dental Consultation & Check-up",
  "Family & General Dentistry",
  "Dental Implant & Oral Surgery",
  "Digital Smile Design & Restorative Dentistry",
  "Treatment for Anxious Patients (Sedation)",
  "CEREC 3D Ceramics & Single-Visit Crowns",
  "Dental Emergency & Urgent Care",
  "Periodontal Hygiene & Cleaning"
];

// Hospital Fees & Prices
export const feesCategories: FeeCategory[] = [
  {
    title: "Consultation & 3D Diagnostics",
    description: "Thorough clinical examination, digital imaging, and transparent treatment plan",
    items: [
      {
        name: "Initial Comprehensive Dental Consultation & Examination",
        price: "€75",
        features: ["Full mouth examination by doctor", "Written treatment plan with exact fees", "Direct clinician discussion"]
      },
      {
        name: "Hospital Low-Dose 3D CBCT Bone Scan",
        price: "€120",
        features: ["Low-radiation 3D diagnostic scan", "Precise anatomical bone measurement", "Immediate digital report"]
      },
      {
        name: "Digital Smile Design (DSD Mockup Preview)",
        price: "from €150",
        features: ["Facial dynamic video analysis", "Physical test-drive smile in your mouth", "Mirror preview before any procedure"]
      }
    ]
  },
  {
    title: "Dental Implants & Restorative Dentistry",
    description: "Swiss biocompatible implants and German CEREC CAD/CAM porcelain ceramics",
    items: [
      {
        name: "Single Swiss Titanium Implant",
        price: "from €850",
        features: ["Swiss biocompatible fixture", "Sterile hospital operating theatre", "Long-term clinical registry"]
      },
      {
        name: "CEREC Same-Day 3D Porcelain Crown",
        price: "from €550",
        features: ["Diamond-milled on-site in 60 minutes", "No messy impression trays", "Natural aesthetic shade match"]
      },
      {
        name: "All-on-4 / All-on-6 Full Arch Same-Day Teeth",
        price: "Personalised Consultation",
        features: ["Fixed teeth loaded on the same day", "No removable dentures", "Consultant surgical & prosthodontic team"]
      }
    ]
  },
  {
    title: "Sedation, Hygiene & General Care",
    description: "Hospital consultant sedation protocols and gentle preventive dental care",
    items: [
      {
        name: "Consultant Anaesthetist IV Sedation",
        price: "from €350",
        features: ["Certified hospital anaesthetist", "Twilight relaxation state", "100% pain & anxiety free"]
      },
      {
        name: "Preventive Dental Hygiene & Air-Flow Polish",
        price: "€70",
        features: ["Ultrasonic gentle clean", "Stain removal & plaque polishing", "Gum health assessment"]
      },
      {
        name: "Surgical Wisdom Tooth Removal",
        price: "from €180",
        features: ["Ultrasonic bone-sparing instruments", "Sterile hospital suite", "Gentle, comfortable recovery"]
      }
    ]
  }
];

// Patient Reviews
export const verifiedReviews: PatientReview[] = [
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

// FAQs Data
export const faqsData: FaqItem[] = [
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
    a: "Consultations can be booked through our online booking form or via our official WhatsApp service (+356 9999 1029) or phone (+356 2329 1029). Our hospital patient coordinators will confirm a specialist slot within minutes."
  }
];

// Clinical Blog Posts / Articles (For SEO / Dedicated Blog Page)
export const blogPosts: BlogPost[] = [
  {
    id: "sedation-guide",
    slug: "complete-guide-to-sleep-dentistry-iv-sedation-malta",
    title: "The Complete Guide to Sleep Dentistry & IV Sedation at St. James Hospital",
    excerpt: "Overcome severe dental anxiety with consultant anaesthetist-supervised sedation. Discover how patients complete complex treatments in complete comfort.",
    category: "Anxious Patient Care",
    readTime: "5 min read",
    date: "May 2026",
    author: "Dr. Mark Diacono",
    authorRole: "Principal Oral Surgeon",
    image: "clinic/waiting_room_2.jpg",
    content: [
      "Dental phobia affects over 30% of the population, often leading individuals to delay crucial dental care until severe pain or infection develops. At DiU Clinic, located inside St. James Hospital in Sliema, our conscious IV sedation protocol provides a calm, hospital-backed solution.",
      "Administered exclusively by consultant anaesthetists, IV sedation places you in a deeply relaxed twilight state. You breathe independently and remain safely monitored throughout, while experiencing zero pain, anxiety, or unpleasant clinical sensations.",
      "Whether you require multiple surgical extractions, dental implants, or intensive restorative work, treatment can be completed in a single, peaceful visit. You wake with your care accomplished and minimal recollection of the procedure."
    ]
  },
  {
    id: "dsd-test-drive",
    slug: "how-digital-smile-design-lets-you-test-drive-your-smile",
    title: "How Digital Smile Design Lets You Test-Drive Your Smile Before Treatment",
    excerpt: "Learn how 3D facial video analysis and intraoral scanning allow you to look in the mirror and preview your new smile before any permanent work is started.",
    category: "Cosmetic & Digital Dentistry",
    readTime: "4 min read",
    date: "April 2026",
    author: "Dr. Susanna Diacono",
    authorRole: "Restorative Dentist & DSD Master",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    content: [
      "Traditional aesthetic dentistry relied heavily on dental wax-ups that patients couldn't test in real life. Digital Smile Design (DSD), pioneered in Malta by Dr. Susanna Diacono, revolutionizes this approach by framing teeth around your unique facial dynamics.",
      "During your initial DSD consultation, high-resolution photographs and 3D intraoral scans capture your smile during natural speech, laughter, and resting expressions. We then print a temporary mock-up that comfortably clips over your existing teeth.",
      "This trial smile lets you look in the mirror, evaluate proportions, share photos with loved ones, and request adjustments before any ceramic veneer or crown is manufactured."
    ]
  },
  {
    id: "all-on-4-guide",
    slug: "all-on-4-dental-implants-same-day-fixed-teeth-malta",
    title: "All-on-4 Dental Implants: From Missing Teeth to Fixed Teeth in One Day",
    excerpt: "A detailed breakdown of immediate-load full arch implantology. How modern surgical planning restores full chewing function without removable plates.",
    category: "Implantology & Surgery",
    readTime: "6 min read",
    date: "March 2026",
    author: "Prof. Nikolai Attard",
    authorRole: "Specialist Prosthodontist",
    image: "clinic/scanning_in_surgery.jpg",
    content: [
      "For patients suffering from multiple missing teeth or failing dental bridges, removable dentures often present significant challenges with stability, speech, and comfort. The All-on-4 protocol provides a permanent, fixed alternative.",
      "By strategically placing four to six titanium dental implants using 3D CBCT diagnostic planning, our surgical and prosthodontic team secures a complete arch of replacement teeth on the very day of surgery.",
      "The results restore over 90% of natural chewing capacity and deliver a youthful, supported facial profile, all performed within the sterile operating theatres of St. James Hospital."
    ]
  },
  {
    id: "cerec-single-visit",
    slug: "cerec-porcelain-crowns-in-60-minutes-no-impressions",
    title: "CEREC Porcelain Crowns in About an Hour: The End of Messy Impression Trays",
    excerpt: "Explore in-house CAD/CAM diamond milling technology that delivers permanent German porcelain restorations in a single 60-minute appointment.",
    category: "Restorative Technology",
    readTime: "4 min read",
    date: "February 2026",
    author: "Dr. Laura Cuschieri",
    authorRole: "Digital Dentistry Specialist",
    image: "clinic/explaining_treatment_to_pt.jpg",
    content: [
      "In conventional dentistry, getting a dental crown required messy silicone impressions, two weeks of wearing fragile temporary plastic caps, and multiple injections across separate visits.",
      "With German CEREC CAD/CAM technology at DiU Clinic, we scan the prepared tooth with an optical 3D camera in seconds, design the ceramic restoration on-screen, and diamond-mill a solid block of dental porcelain right in our on-site lab.",
      "Within 60 minutes, the permanent ceramic crown is glazed, polished, and permanently bonded. Patients leave with their permanent restoration completed in a single visit."
    ]
  }
];
