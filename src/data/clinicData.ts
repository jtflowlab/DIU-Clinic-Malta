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

// Approved Treatments Matching Client Layout - Implants & DSD First
export const approvedServices: ServiceItem[] = [
  {
    num: "01",
    id: "IMPLANTS",
    title: "Dental Implant & Oral Surgery",
    tagline: "Specialist Surgical Care",
    image: "clinic/scanning_in_surgery.jpg",
    bgClass: "bg-white",
    accentColor: "#0E2B4C",
    summary: "Oral surgery and implants, from a single tooth to full-mouth reconstruction, with specialist care.",
    bullets: [
      "Single tooth implants with Swiss biocompatible titanium",
      "Full-mouth reconstruction and immediate loading",
      "Hospital-grade 3D CBCT bone diagnostics",
      "Sterile operating theatre surgical safety"
    ],
    desc: "From replacing a single tooth to rebuilding a full smile, our oral surgeon and prosthodontists plan and carry out your treatment together, in the safe setting of St James Hospital, Sliema.",
    clinicians: ["Dr Mark Diacono (Oral Surgeon)", "Prof. Nikolai Attard (Prosthodontist)", "Dr Fokion Iatridis (Prosthodontist)"]
  },
  {
    num: "02",
    id: "DSD",
    title: "Digital Smile Design & Restorative Dentistry",
    tagline: "Facially Driven Smile Design",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    bgClass: "bg-white",
    accentColor: "#2BB4A7",
    isGold: true,
    summary: "Facially driven smile design, veneers, crowns, bridges, full-mouth reconstruction, root canal treatment and composite bonding.",
    bullets: [
      "Designed around your face, lips and smile dynamics",
      "Test-drive your mock-up smile in your mouth first",
      "CEREC 1-hour German porcelain crowns & veneers",
      "Aesthetic biomimetic composite bonding"
    ],
    desc: "Your new smile, designed around your face. As a certified Digital Smile Design clinic, we plan your smile on screen, then make a mock-up in your mouth so you can see it before treatment begins.",
    clinicians: ["Dr Susanna Diacono (DSD & Full Mouth)", "Dr Laura Cuschieri (Composite Bonding)", "Dr Susanna Diacono (Root Canal Treatment)"]
  },
  {
    num: "03",
    id: "FAMILY",
    title: "Family & General Dentistry",
    tagline: "Everyday Care & Prevention",
    image: "clinic/examination_for_fading_background.jpg",
    bgClass: "bg-white",
    accentColor: "#2BB4A7",
    summary: "Everyday care to keep teeth and gums healthy at every age, with regular check-ups, hygienist visits, fillings and gentle dentistry for children.",
    bullets: [
      "Regular check-ups and thorough examinations",
      "Hygienist visits and periodontal gum maintenance",
      "Tooth-coloured composite fillings",
      "Gentle, reassuring dentistry for children"
    ],
    desc: "Everyday care to keep teeth and gums healthy at every age, with regular check-ups, hygienist visits, fillings and gentle dentistry for children in a calm hospital environment.",
    clinicians: ["Dr Michael Rafferty (General Dentist)", "Dr Lisa Carabott (General Dentist)", "Mrs Mary-Jane Galea (Dental Hygienist)"]
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
      "Supervised by a consultant hospital anaesthetist",
      "Peaceful, calm twilight relaxation state",
      "Zero pain, zero distress, zero dental anxiety",
      "Available for all routine and complex treatments"
    ],
    desc: "Dental anxiety is common, and you are not alone. We offer sedation with a consultant anaesthetist, so you can receive the care you need feeling completely supported.",
    clinicians: ["With our consultant anaesthetist"]
  }
];

// All booking treatment options (with Consultation as default)
export const bookingTreatmentOptions = [
  "Initial Dental Consultation & Check-up",
  "Dental Implant & Oral Surgery",
  "Digital Smile Design & Restorative Dentistry",
  "Family & General Dentistry",
  "Treatment for Anxious Patients (Sedation)",
  "Composite Bonding & Veneers",
  "Hygiene & Gum Care"
];

// Official Hospital Treatment Prices Matching Client Fees Sheets (Capturas 11-16)
export const feesCategories: FeeCategory[] = [
  {
    title: "Dental Implant & Oral Surgery",
    description: "with Dr Mark Diacono (Principal Specialist Oral Surgeon)",
    items: [
      {
        name: "Implant consultation",
        price: "€75",
        features: ["Specialist surgical consultation", "Examination and 3D CBCT review", "Written personal plan"]
      },
      {
        name: "Single implant including implant crown",
        price: "from €2,400",
        features: ["Swiss biocompatible titanium implant", "Custom ceramic implant crown", "Hospital sterile theatre protocol"]
      },
      {
        name: "Full-mouth implants (including final restoration)",
        price: "from €4,500",
        features: ["Complete arch fixed reconstruction", "Surgeon and prosthodontist planned", "Immediate functional support"]
      }
    ]
  },
  {
    title: "Digital Smile Design (DSD)",
    description: "with Dr Susanna Diacono (Restorative Dentist & DSD Master)",
    items: [
      {
        name: "DSD consultation",
        price: "€400",
        features: ["Facial dynamic photography & video", "3D digital intraoral scan", "Computer-aided smile design"]
      },
      {
        name: "DSD smile mock-up",
        price: "€100",
        features: ["Physical 3D smile model in your mouth", "Test-drive your smile in the mirror", "Agreed design before any procedure"]
      }
    ]
  },
  {
    title: "General Dentistry",
    description: "Dr Michael Rafferty · Dr Lisa Carabott · Dr Francesca Schembri",
    items: [
      {
        name: "New patient examination (includes X-rays)",
        price: "€50",
        features: ["Complete mouth assessment", "Digital diagnostic X-rays included", "Written treatment plan with costs"]
      },
      {
        name: "Dental examination",
        price: "€50",
        features: ["Routine follow-up check-up", "Gum and tooth health screening", "Personalized hygiene advice"]
      },
      {
        name: "Emergency appointment (excluding treatment)",
        price: "from €50",
        features: ["Prompt pain relief assessment", "Diagnostic X-ray review", "Clear immediate treatment options"]
      },
      {
        name: "Fillings (each)",
        price: "from €50",
        features: ["Gentle decay removal", "Tooth preservation protocol", "Local anaesthetic included"]
      },
      {
        name: "Tooth-coloured (composite) fillings (each)",
        price: "€70",
        features: ["Natural tooth-coloured composite resin", "Seamless aesthetic match", "Bonded directly to enamel"]
      }
    ]
  },
  {
    title: "Hygiene & Gum Care",
    description: "with Dental Hygienist Mrs Mary-Jane Galea",
    items: [
      {
        name: "Hygiene appointment",
        price: "€60",
        features: ["Ultrasonic gentle plaque removal", "Stain removal and polishing", "Gum pocket screening"]
      },
      {
        name: "Periodontal treatment session (per session)",
        price: "€60",
        features: ["Deep scaling and root debridement", "Gum inflammation treatment", "Personal home care regimen"]
      },
      {
        name: "Maintenance hygiene",
        price: "€60",
        features: ["Routine periodontal maintenance", "Implant care and cleaning", "Long-term gum protection"]
      }
    ]
  },
  {
    title: "Composite Bonding",
    description: "with Restorative Team (Dr Susanna Diacono & Dr Laura Cuschieri)",
    items: [
      {
        name: "Consultation",
        price: "€50",
        features: ["Aesthetic smile assessment", "Colour and shape matching", "Single-visit option review"]
      },
      {
        name: "Composite edging",
        price: "from €120",
        features: ["Repair minor chips or uneven edges", "Minimally invasive, no enamel removed", "Hand-sculpted in one visit"]
      },
      {
        name: "Composite bonding & veneers",
        price: "from €250",
        features: ["Full tooth composite surface facing", "Closes gaps and refreshes shade", "Reversible aesthetic enhancement"]
      }
    ]
  },
  {
    title: "Porcelain Veneers, Crowns & Bridges",
    description: "with Restorative Team",
    items: [
      {
        name: "Consultation",
        price: "€50",
        features: ["Restorative diagnosis and planning", "Digital 3D intraoral scan", "Ceramic shade and bite evaluation"]
      },
      {
        name: "Porcelain veneers & crowns (per tooth)",
        price: "from €450",
        features: ["High-strength German ceramic", "Natural light reflection and translucency", "15+ year durable lifespan"]
      },
      {
        name: "Bridges (per unit)",
        price: "from €450",
        features: ["Fixed replacement for missing teeth", "All-ceramic or zirconia construction", "Precision CAD/CAM milling"]
      }
    ]
  },
  {
    title: "Teeth Whitening",
    description: "Safe, effective clinical whitening",
    items: [
      {
        name: "Consultation",
        price: "€50",
        features: ["Enamel and gum shade assessment", "Sensitivity prevention protocol", "Shade guide expectation"]
      },
      {
        name: "Home whitening system",
        price: "from €125",
        features: ["Custom-moulded dental trays", "Professional whitening gel", "Gentle, gradual, brilliant results"]
      }
    ]
  },
  {
    title: "Dentures",
    description: "with Prosthodontist Team (Prof. Nikolai Attard & Dr Fokion Iatridis)",
    items: [
      {
        name: "Consultation",
        price: "€ —",
        features: ["Specialist prosthodontic examination", "Full mouth bite and ridge assessment", "Individualized quotation"]
      },
      {
        name: "Partial denture",
        price: "from € —",
        features: ["Custom chrome or acrylic fit", "Secure retention", "Natural tooth appearance"]
      },
      {
        name: "Full (complete) denture",
        price: "from € —",
        features: ["Upper or lower complete arch", "Facially contoured aesthetic teeth", "Comfortable suction fit"]
      },
      {
        name: "Implant-retained denture",
        price: "from € —",
        features: ["Locators or bar attachment", "Rock-solid stability, zero slipping", "No need for adhesives"]
      }
    ]
  },
  {
    title: "Root Canal Treatment",
    description: "with Dr Susanna Diacono",
    items: [
      {
        name: "Root canal treatment (depends on the tooth)",
        price: "from €200",
        features: ["Saves infected or broken natural teeth", "Gentle local anaesthetic procedure", "Precision rotary instrumentation"]
      }
    ]
  },
  {
    title: "Sedation with Consultant Anaesthetist",
    description: "Safe hospital twilight sleep dentistry for anxious patients",
    items: [
      {
        name: "Intravenous (IV) sedation (per hour)",
        price: "€180",
        features: [
          "Administered by a consultant hospital anaesthetist",
          "Deep twilight relaxation, zero anxiety or pain",
          "Excluding dental treatment and medication used"
        ]
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

// Clinical Blog Posts / Articles (Matching Client News & Insights Mockup Capturas 27-35)
export const blogPosts: BlogPost[] = [
  {
    id: "worn-teeth-guide",
    slug: "composite-bonding-veneers-or-crowns-rebuilding-worn-teeth",
    title: "Composite bonding, veneers or crowns? Rebuilding worn teeth",
    excerpt: "How the three options compare, why teeth become short through wear and acid erosion, and how we rebuild a worn bite with ceramics.",
    category: "Veneers & crowns",
    readTime: "7 min read",
    date: "6 October 2026",
    author: "Dr Susanna Diacono",
    authorRole: "Restorative Dentist & DSD Master",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    content: [
      "Composite bonding, ceramic veneers and crowns can all change the shape, colour and length of your teeth. The right choice depends less on the look you want and more on how much healthy tooth you have left, and how your teeth meet when you bite.",
      "For small changes on healthy teeth, bonding is often ideal. But when teeth have become short and flat through years of wear or acid erosion, the problem is no longer just cosmetic. The whole bite has collapsed a little, and rebuilding it properly usually calls for ceramics.",
      "Composite bonding uses a tooth-coloured resin that the dentist sculpts directly onto your teeth in a single visit. It is bonded to the enamel, so little or no healthy tooth needs to be removed. It shines for closing small gaps, repairing chips, reshaping uneven edges, and for young patients wanting a reversible change.",
      "However, resin is softer than enamel and ceramic, so it wears and chips more easily under heavy biting forces and typically needs polishing or maintenance every 5 to 7 years.",
      "Ceramic restorations (veneers and crowns) are designed digitally and made in a dental laboratory from high-strength porcelain or lithium disilicate. As hard as natural enamel, they resist wear, do not stain, reflect light naturally, and with good care commonly last 15 years or more.",
      "When teeth become short through wear (attrition from grinding) and acid erosion (citrus fruits, wine, carbonated drinks), rebuilding the bite with ceramic onlays or crowns restores the lost vertical height so teeth meet in harmony with your lips and face."
    ]
  },
  {
    id: "implant-consultation",
    slug: "what-happens-at-your-first-implant-consultation",
    title: "What happens at your first implant consultation",
    excerpt: "From the 3D scan to your written plan: a step-by-step look at how we assess you for dental implants.",
    category: "Implants",
    readTime: "5 min read",
    date: "October 2026",
    author: "Dr Mark Diacono",
    authorRole: "Principal Specialist Oral Surgeon",
    image: "clinic/scanning_in_surgery.jpg",
    content: [
      "At your initial implant consultation, our surgeon and prosthodontist examine your mouth, review your medical history, and evaluate bone density using a hospital 3D CBCT scan.",
      "You receive a clear, written plan with transparent costs before deciding on any procedure. Everything is explained in plain, comforting language."
    ]
  },
  {
    id: "dsd-works",
    slug: "how-digital-smile-design-works",
    title: "How Digital Smile Design works",
    excerpt: "How we design your new smile on screen and let you try it in your mouth before any treatment begins.",
    category: "Digital Smile Design",
    readTime: "4 min read",
    date: "October 2026",
    author: "Dr Susanna Diacono",
    authorRole: "Restorative Dentist & DSD Master",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    content: [
      "Digital Smile Design (DSD) is a facially driven approach. Using photographs, video and digital 3D scans, we plan your new smile in harmony with your facial proportions.",
      "We 3D print a temporary mock-up you can actually test-drive directly in your mouth before any permanent work starts, ensuring total predictability."
    ]
  },
  {
    id: "child-first-visit",
    slug: "your-childs-first-dental-visit",
    title: "Your child’s first dental visit",
    excerpt: "Simple tips to make the first visit a happy one, and what we check at each age.",
    category: "Family dentistry",
    readTime: "4 min read",
    date: "October 2026",
    author: "Dr Francesca Schembri",
    authorRole: "General Dentist",
    image: "clinic/examination_for_fading_background.jpg",
    content: [
      "We believe children’s first dental visit should be fun, gentle and reassuring. We count teeth, demonstrate fun brushing games, and help kids feel proud of their smiles."
    ]
  },
  {
    id: "anxious-care",
    slug: "nervous-about-the-dentist-you-are-not-alone",
    title: "Nervous about the dentist? You are not alone",
    excerpt: "How we help anxious patients feel in control, from the first phone call to the end of treatment.",
    category: "Anxious patients",
    readTime: "5 min read",
    date: "October 2026",
    author: "Dr Mark Diacono",
    authorRole: "Principal Specialist Oral Surgeon",
    image: "clinic/dr_mark_patient_model.jpg",
    content: [
      "Dental anxiety is very common. We offer calm pre-treatment chats away from the chair, and hospital IV sedation with a consultant anaesthetist for peaceful twilight sleep."
    ]
  },
  {
    id: "hygiene-matters",
    slug: "why-your-hygiene-visit-matters",
    title: "Why your hygiene visit matters",
    excerpt: "What a hygienist does, how often to come, and how it protects your teeth and gums.",
    category: "Prevention",
    readTime: "4 min read",
    date: "October 2026",
    author: "Mrs Mary-Jane Galea",
    authorRole: "Dental Hygienist",
    image: "clinic/examination_for_fading_background.jpg",
    content: [
      "Professional hygiene visits protect your natural teeth and dental implants from periodontal disease, removing hardened tartar and polishing away stains safely."
    ]
  }
];
