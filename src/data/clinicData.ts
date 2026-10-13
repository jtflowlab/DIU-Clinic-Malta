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
    name: 'Dr Mark Diacono',
    category: 'specialists',
    role: 'Specialist in Oral Surgery',
    qualifications: 'RGN, BChD Hons (Leeds), FDS RCPS (Glasgow)',
    badge: 'Co-Founder & Clinical Director',
    photo: 'team/dr_mark_diacono_principle_oral_surgeon.jpg',
    bio: 'Over 25 years specializing in surgical implantology, immediate All-on-4 loading, bone grafting and surgical dental procedures at St James Hospital.',
    treatmentDefault: 'Dental Implants & Oral Surgery'
  },
  {
    id: 'dr-susanna',
    name: 'Dr Susanna Diacono',
    category: 'restorative',
    role: 'Restorative Dentist, Digital Smile Design',
    qualifications: 'DDS (Gothenburg), LDS (Sweden), M.Dent.Sci Restorative (Leeds)',
    badge: 'Co-Founder & DSD Lead',
    photo: 'team/dr._susanna_diacono_principle_restoratve_dentist_&_co-founder.jpg',
    bio: 'Pioneered Digital Smile Design in Malta. Specialist in Scandinavian restorative dentistry, CEREC CAD/CAM ceramics, and aesthetic veneers.',
    treatmentDefault: 'Digital Smile Design'
  },
  {
    id: 'prof-nikolai',
    name: 'Prof Nikolai Attard',
    category: 'restorative',
    role: 'Specialist Prosthodontist',
    qualifications: 'BChD Hons (Melit), MSc (Toronto), PhD (Toronto)',
    badge: 'Prosthodontic Consultant',
    photo: 'team/prof_nikolai_attard.jpg',
    bio: 'Internationally recognized academic and clinician specializing in complex implant prosthetics, full arch oral rehabilitation and occlusal restoration.',
    treatmentDefault: 'Dental Implants & Oral Surgery'
  },
  {
    id: 'dr-fokion',
    name: 'Dr Fokion Iatridis',
    category: 'restorative',
    role: 'Specialist Prosthodontist',
    qualifications: 'DDS (Thessaloniki), CAGS (Tufts Boston USA)',
    badge: 'Fixed & Removable Prosthetics',
    photo: 'team/dr_fokion_iatridis.jpg',
    bio: 'Specialist in full aesthetic transformations, high-precision CEREC crowns, inlays, and fixed prosthetic reconstructions.',
    treatmentDefault: 'Dentures'
  },
  {
    id: 'dr-laura',
    name: 'Dr Laura Cuschieri',
    category: 'restorative',
    role: 'Digital Dentistry & Composite Bonding',
    qualifications: 'MDS (Melit), MSc Digital Dentistry (Melit) with Distinction',
    badge: 'Aesthetic & Digital Specialist',
    photo: 'team/dr_laura_cuschieri.jpg',
    bio: 'Specializing in minimally invasive smile enhancements, optical 3D digital impressions, and biomimetic cosmetic composite bonding.',
    treatmentDefault: 'Composite Bonding'
  },

  // 2. General & Paediatric Dentists
  {
    id: 'dr-michael',
    name: 'Dr Michael Rafferty',
    category: 'general',
    role: 'General Dentist',
    qualifications: 'BChD, Comprehensive Dental Care',
    badge: 'General & Restorative Practice',
    photo: 'team/dr._michael_rafferty_general_dentist.jpg',
    bio: 'Committed to comprehensive family dental health, minimally invasive tooth preservation, and patient-centered clinical care.',
    treatmentDefault: 'General Dentistry'
  },
  {
    id: 'dr-lisa',
    name: 'Dr Lisa Carabott',
    category: 'general',
    role: 'General & Aesthetic Dentist',
    qualifications: 'BChD, Restorative Practice',
    badge: 'Family & Preventive Care',
    photo: 'team/dr._lisa_gatt_general_dentist.jpg',
    bio: 'Dedicated to thorough clinical check-ups, aesthetic ceramic restorations, and gentle preventive dentistry for patients of all ages.',
    treatmentDefault: 'General Dentistry'
  },
  {
    id: 'dr-francesca',
    name: 'Dr Francesca Schembri',
    category: 'general',
    role: 'General & Paediatric Dentist',
    qualifications: 'BChD, Special Interest in Children’s Dentistry',
    badge: 'Paediatric & Gentle Care',
    photo: 'team/dr.francesca_schembri_general_and_paediatric_dentist.jpg',
    bio: 'Passionate about creating positive dental experiences for infants, children, and nervous young teens in a comforting, friendly environment.',
    treatmentDefault: 'General Dentistry'
  },

  // 3. Registered Dental Hygienist
  {
    id: 'mary-jane-galea',
    name: 'Mary-Jane Galea',
    category: 'hygienist',
    role: 'Dental Hygienist',
    qualifications: 'Registered Dental Hygienist',
    badge: 'Periodontal Prevention',
    photo: 'team/mrs_mary-jane_galea_dental_hyginist.jpg',
    bio: 'Specialist in ultrasonic periodontal hygiene, gentle stain removal, implant maintenance, and personalized oral preventive regimens.',
    treatmentDefault: 'Hygiene & Gum Care'
  },

  // 4. Clinical Support & Nursing Team
  {
    id: 'ms-aneta',
    name: 'Ms Aneta Mileska',
    category: 'support',
    role: 'Dental Nurse & DSD Coordinator',
    qualifications: 'Lead DSD Digital Workflow Coordinator',
    badge: 'Smile Design Coordinator',
    photo: 'team/ms_aneta_mileska_dsd_coordinator.jpg',
    bio: 'Guides patients step-by-step through 3D facial aesthetic capture, virtual smile mockups, and coordinated clinician treatment plans.',
    treatmentDefault: 'Digital Smile Design'
  },
  {
    id: 'mrs-sue',
    name: 'Mrs Sue Lanzon',
    category: 'support',
    role: 'Clinic Manager',
    qualifications: 'Clinical Operations Director',
    badge: 'Clinic Operations',
    photo: 'team/mrs_sue_lanzon_clinic_manager.jpg',
    bio: 'Oversees patient coordination, clinical standards, and appointment logistics at St James Hospital, Sliema.',
    treatmentDefault: 'General Dentistry'
  },
  {
    id: 'christa-muscat',
    name: 'Christa Muscat',
    category: 'support',
    role: 'Patient Reception Coordinator',
    qualifications: 'Front-of-House Patient Care',
    badge: 'Welcoming Team',
    photo: 'team/mrs_christa_rudrum_reception.jpg',
    bio: 'Welcomes patients at St James Hospital, coordinates appointment logistics, and ensures a seamless, serene visit from arrival to departure.',
    treatmentDefault: 'General Dentistry'
  },
  {
    id: 'diane-cappello',
    name: 'Diane Cappello',
    category: 'support',
    role: 'Patient Reception Coordinator',
    qualifications: 'Front-of-House Patient Care',
    badge: 'Welcoming Team',
    photo: 'team/mrs_diane_capello_reception.jpg',
    bio: 'Dedicated patient coordinator assisting with insurance enquiries, scheduling, and ensuring warm hospitable patient intake.',
    treatmentDefault: 'General Dentistry'
  },
  {
    id: 'ms-candy',
    name: 'Ms Candy Dowling',
    category: 'support',
    role: 'Head Nurse',
    qualifications: 'Senior Clinical Nursing Lead',
    badge: 'Clinical Lead',
    photo: 'team/ms_candy_dowling_head_nurse.jpg',
    bio: 'Oversees surgical nurse teams, sterilization compliance, and patient comfort protocols during all dental operations.',
    treatmentDefault: 'IV Sedation'
  },
  {
    id: 'maria-camilleri',
    name: 'Ms Maria Camilleri',
    category: 'support',
    role: 'Surgical Dental Nurse',
    qualifications: 'Surgical Dental Nurse',
    badge: 'Surgical Theatre',
    photo: 'team/maria_camilleri_surgical_nurse.jpg',
    bio: 'Assists senior oral surgeons during implantology and maxillofacial surgeries at St James Hospital.',
    treatmentDefault: 'Dental Implants & Oral Surgery'
  },
  {
    id: 'mrs-sonia',
    name: 'Mrs Sonia Madiona',
    category: 'support',
    role: 'Restorative Dental Nurse',
    qualifications: 'Restorative Care Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/mrs_sonia_madiona_restorative_dental_nurse.jpg',
    bio: 'Assists during CEREC ceramic restorations and aesthetic chairside procedures with attentive, compassionate care.',
    treatmentDefault: 'Digital Smile Design'
  },
  {
    id: 'ms-charlotte',
    name: 'Ms Charlotte Camenzuli',
    category: 'support',
    role: 'Restorative Dental Nurse',
    qualifications: 'Restorative Care Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/ms_charlotte_camenzuli_restorative_dental_nurse.jpg',
    bio: 'Provides focused chairside nursing assistance and patient reassurance during restorative dental treatments.',
    treatmentDefault: 'Digital Smile Design'
  },
  {
    id: 'ms-kelly',
    name: 'Ms Kelly Grech',
    category: 'support',
    role: 'Restorative & Surgical Nurse',
    qualifications: 'Dual Specialty Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/ms_kelly_grech_restorative_dental_nurse.jpg',
    bio: 'Cross-trained across surgical implant suites and restorative CEREC procedures, ensuring impeccable patient safety.',
    treatmentDefault: 'Dental Implants & Oral Surgery'
  },
  {
    id: 'rachel-bornel',
    name: 'Rachel Bornel',
    category: 'support',
    role: 'Restorative Dental Nurse',
    qualifications: 'Restorative Care Nurse',
    badge: 'Clinical Nursing',
    photo: 'team/ms_rachael_restorative_dental_nurse.jpg',
    bio: 'Dedicated to patient comfort, gentle chairside care, and clinical efficiency in the restorative department.',
    treatmentDefault: 'Digital Smile Design'
  }
];

// Approved Treatments Matching Client Layout - Implants & DSD First
export const approvedServices: ServiceItem[] = [
  {
    num: "01",
    id: "IMPLANTS",
    title: "Dental Implants & Oral Surgery",
    tagline: "Specialist Surgical Care",
    image: "clinic/scanning_in_surgery.jpg",
    bgClass: "bg-white",
    accentColor: "#0E2B4C",
    summary: "Whether you need wisdom teeth removal or a complete new smile, our oral surgery and prosthetic team plan and carry out your care together.",
    bullets: [
      "Single-tooth implant",
      "Full-mouth reconstruction and immediate loading",
      "Crowns and bridges designed and made by our prosthetic team",
      "3D CBCT, dental scans and Digital Smile Design for precise planning"
    ],
    desc: "Whether you need wisdom teeth removal or a complete new smile, our oral surgery and prosthetic team plan and carry out your care together at St James Hospital, Sliema.",
    clinicians: ["Dr Mark Diacono, Oral Surgeon", "Prof. Nikolai Attard, Prosthodontist", "Dr Fokion Iatridis, Prosthodontist"]
  },
  {
    num: "02",
    id: "DSD",
    title: "Digital Smile Design",
    tagline: "Signature Treatment",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    bgClass: "bg-white",
    accentColor: "#2BB4A7",
    isGold: true,
    summary: "Your new smile, designed around your face. Plan your smile on screen and test drive the look before treatment begins.",
    bullets: [
      "Designed around your face, lips and smile dynamics",
      "Test drive your new smile before treatment begins",
      "Same day all ceramic crowns, inlays and onlays",
      "Tooth coloured natural looking composite bonding"
    ],
    desc: "Your new smile, designed around your face. We plan your smile on screen, then make a mock-up in your mouth so you can test drive the look before treatment begins.",
    clinicians: ["Dr Susanna Diacono (Restorative Dentist with DSD)", "Dr Laura Cuschieri (composite bonding)"]
  },
  {
    num: "03",
    id: "FAMILY",
    title: "Family & General Dentistry",
    tagline: "Everyday Care & Prevention",
    image: "clinic/examination_for_fading_background.jpg",
    bgClass: "bg-white",
    accentColor: "#2BB4A7",
    summary: "Everyday care to keep teeth and gums healthy at every age, from regular check-ups and hygiene visits to fillings and gentle dentistry for children, in a calm, welcoming setting.",
    bullets: [
      "Regular check-ups and thorough examinations",
      "Hygiene visit and gum care",
      "Tooth coloured fillings",
      "Gentle, friendly dentistry for children",
      "Same day emergency appointment"
    ],
    desc: "Everyday care to keep teeth and gums healthy at every age, from regular check-ups and hygiene visits to fillings and gentle dentistry for children, in a calm, welcoming setting.",
    clinicians: ["Dr Michael Rafferty", "Dr Lisa Carabott", "Dr Francesca Schembri", "Mary-Jane Galea (Dental Hygienist)"]
  },
  {
    num: "04",
    id: "ANXIOUS",
    title: "Gentle Care for Nervous Patients",
    tagline: "IV Sedation",
    image: "clinic/waiting_room_2.jpg",
    bgClass: "bg-white",
    accentColor: "#0E2B4C",
    summary: "Feeling anxious about the dentist is common, and you are not alone. We offer IV sedation given by a consultant anaesthetist, so you can have the treatment you need while feeling calm and cared for.",
    bullets: [
      "Sedation given and monitored by a consultant anaesthetist",
      "A calm, deeply relaxed state throughout treatment",
      "Little or no memory of the procedure afterwards",
      "Available for both routine and complex treatments"
    ],
    desc: "Feeling anxious about the dentist is common, and you are not alone. We offer IV sedation given by a consultant anaesthetist, so you can have the treatment you need while feeling calm and cared for.",
    clinicians: ["Your dentist, together with our consultant anaesthetist"]
  }
];

// All 10 booking treatment options matching the price categories exactly
export const bookingTreatmentOptions = [
  "Dental Implants & Oral Surgery",
  "Digital Smile Design",
  "General Dentistry",
  "Hygiene & Gum Care",
  "Composite Bonding",
  "Porcelain Veneers, Crowns & Bridges",
  "Teeth Whitening",
  "Dentures",
  "Root Canal Treatment",
  "IV Sedation"
];

// 10 Official Treatment Fee Categories in Premium Menu Style
export const feesCategories: FeeCategory[] = [
  {
    title: "DENTAL IMPLANTS AND ORAL SURGERY",
    clinician: "With Dr Mark Diacono, Specialist Oral Surgeon",
    buttonText: "Enquire about implants",
    treatmentDefault: "Dental Implants & Oral Surgery",
    items: [
      {
        name: "Implant consultation",
        description: "Specialist assessment, 3D scan review and a written treatment plan",
        price: "€75"
      },
      {
        name: "Single implant with crown",
        description: "Titanium implant with a custom ceramic crown",
        price: "from €2,400"
      },
      {
        name: "Full-arch implants",
        description: "A complete fixed set of teeth, planned by surgeon and prosthodontist",
        price: "from €4,500"
      },
      {
        name: "Wisdom tooth removal",
        description: "Surgical removal, with sedation available",
        price: "from €200"
      }
    ]
  },
  {
    title: "DIGITAL SMILE DESIGN",
    clinician: "With Dr Susanna Diacono, Restorative Dentist",
    buttonText: "Enquire about smile design",
    treatmentDefault: "Digital Smile Design",
    items: [
      {
        name: "Smile design consultation",
        description: "Facial photography and video, a 3D digital scan for planning your smile"
      },
      {
        name: "Smile mock-up",
        description: "Try your new smile in your mouth and see with photography before any treatment begins"
      }
    ]
  },
  {
    title: "GENERAL DENTISTRY",
    buttonText: "Enquire about general dentistry",
    treatmentDefault: "General Dentistry",
    items: [
      {
        name: "New patient examination",
        description: "A full check of your mouth, X-rays and a written treatment plan with costs"
      },
      {
        name: "Routine check-up",
        description: "Teeth and gum check with personalised hygiene advice"
      },
      {
        name: "Emergency appointment",
        description: "Prompt assessment, X-ray and clear options to relieve your pain. Treatment charged separately",
        price: "from €50"
      },
      {
        name: "Tooth-coloured fillings",
        description: "Natural-looking fillings that keep as much of your own tooth as possible"
      }
    ]
  },
  {
    title: "HYGIENE & GUM CARE",
    clinician: "With Mary-Jane Galea, Hygienist",
    buttonText: "Book a hygiene appointment",
    treatmentDefault: "Hygiene & Gum Care",
    items: [
      {
        name: "Hygiene and gum care appointment",
        description: "Gentle cleaning, stain removal and polishing, with a full gum check and ongoing care for the gums, implants with a personal home-care plan",
        price: "€60"
      },
      {
        name: "Gum treatment",
        description: "Deep cleaning below the gum line to treat inflamed gums, with a personal home-care plan",
        price: "€120 (per session)"
      }
    ]
  },
  {
    title: "COMPOSITE BONDING",
    clinician: "With Dr Susanna Diacono and Dr Laura Cuschieri",
    buttonText: "Book a bonding consultation",
    treatmentDefault: "Composite Bonding",
    items: [
      {
        name: "Bonding consultation",
        description: "Smile assessment, colour and shape matching, and a review of your options"
      },
      {
        name: "Edge bonding",
        description: "Repairs small chips and uneven edges, sculpted by hand in one visit with minimal drilling"
      },
      {
        name: "Composite veneers",
        description: "Covers the whole front of the tooth to close gaps and improve shape and colour"
      }
    ]
  },
  {
    title: "PORCELAIN VENEERS, CROWNS AND BRIDGES",
    clinician: "With our restorative team",
    buttonText: "Book a restorative consultation",
    treatmentDefault: "Porcelain Veneers, Crowns & Bridges",
    items: [
      {
        name: "Restorative consultation",
        description: "Full assessment, 3D digital scan and check of your bite and tooth shade"
      },
      {
        name: "Porcelain veneers and crowns",
        description: "High-strength ceramic that reflects light like a natural tooth"
      },
      {
        name: "Bridges",
        description: "A fixed replacement for missing teeth, made in all-ceramic or zirconia"
      }
    ]
  },
  {
    title: "TEETH WHITENING",
    clinician: "Safe, effective professional whitening",
    buttonText: "Book a whitening consultation",
    treatmentDefault: "Teeth Whitening",
    items: [
      {
        name: "Whitening consultation",
        description: "A check that whitening is right for you, your current shade recorded, and advice on avoiding sensitivity"
      },
      {
        name: "Home whitening",
        description: "Custom-made trays and professional whitening gel for gentle gradual results"
      },
      {
        name: "In-Clinic Whitening",
        description: "A single visit with professional-strength gel, for noticeably whiter teeth in about 90 min",
        price: "from €350"
      }
    ]
  },
  {
    title: "DENTURES",
    clinician: "With Dr Fokion Iatridis and Prof. Nikolai Attard",
    buttonText: "Book denture consultation",
    treatmentDefault: "Dentures",
    items: [
      {
        name: "Denture consultation",
        description: "Specialist examination, bite assessment and a personal quotation",
        price: "€75"
      },
      {
        name: "Partial denture",
        description: "Replaces some missing teeth, in acrylic or chrome, with natural look and secure fit",
        price: "from €250"
      },
      {
        name: "Full denture",
        description: "A complete upper or lower set, shaped to suit your face, with a comfortable, natural fit",
        price: "from €650"
      },
      {
        name: "Implant retained denture",
        description: "Clips securely onto implants for a stable, confident fit, with no need for adhesive",
        price: "from €3,200"
      }
    ]
  },
  {
    title: "ROOT CANAL TREATMENT",
    clinician: "With Dr Susanna Diacono",
    buttonText: "Book a root canal consultation",
    treatmentDefault: "Root Canal Treatment",
    items: [
      {
        name: "Root canal treatment",
        description: "Saves an infected or damaged tooth, carried out gently under local anaesthetic with precision instruments and magnification",
        price: "from €200, depending on the tooth"
      }
    ]
  },
  {
    title: "IV SEDATION",
    clinician: "Relaxing sedation for anxious patients, given by a consultant anaesthetist",
    buttonText: "Book a sedation consultation",
    treatmentDefault: "IV Sedation",
    items: [
      {
        name: "Intravenous (IV) sedation",
        description: "Given and monitored throughout by a consultant anaesthetist, so you stay calm and deeply relaxed during treatment. Dental treatment and medication charged separately",
        price: "€180 per hour"
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
    clinic: "At St James Hospital, Sliema",
    text: "After years of struggling with missing teeth and dentists who only offered removable plates, Dr Mark Diacono completely changed my life. I had surgery under IV sedation in the morning and walked out with a fixed, beautiful set of teeth by afternoon. Zero pain, zero anxiety.",
    rating: 5
  },
  {
    author: "Elena Vassallo",
    photo: "patient_elena.jpg",
    treatment: "Ceramic Crown in 1 Visit",
    clinic: "At St James Hospital, Sliema",
    text: "I chipped a front tooth right before an overseas flight. The team scanned it with their 3D optical camera, milled the porcelain crown right there in their clinic lab, and bonded it in less than an hour! It matches my other teeth seamlessly. Incredible technology.",
    rating: 5
  },
  {
    author: "Mark Cassar",
    photo: "patient_mark.jpg",
    treatment: "Surgical Wisdom Extraction & IV Sedation",
    clinic: "At St James Hospital, Sliema",
    text: "As someone who suffers from dental anxiety, having an anaesthetist administer IV sedation gave me total peace of mind. I remember lying down peacefully, and the next moment I was waking up with all 4 impacted teeth removed. The care was exemplary.",
    rating: 5
  }
];

// FAQs Data
export const faqsData: FaqItem[] = [
  {
    num: "01",
    q: "Can I receive a fixed set of teeth or crown in one visit?",
    a: "Yes. Using in-house CAD/CAM 3D milling and immediate-load implant protocols, single crowns and full arch restorations can often be digitally designed, milled, and fitted in a single appointment, avoiding weeks of temporary teeth."
  },
  {
    num: "02",
    q: "How does IV sedation work for nervous or anxious patients?",
    a: "IV sedation is administered and monitored directly by a consultant anaesthetist. A gentle sedative is administered through an IV line, causing you to enter a deeply relaxed state. You remain responsive but feel no discomfort, and will have little or no memory of the procedure afterwards."
  },
  {
    num: "03",
    q: "What are the advantages of being located at St James Hospital?",
    a: "Being located at St James Hospital in Sliema provides convenient access to hospital-standard diagnostic imaging, dedicated sterile facilities, and medical support in a reassuring, professional private hospital setting."
  },
  {
    num: "04",
    q: "What is Digital Smile Design (DSD) and how does it help before treatment?",
    a: "DSD is a facially driven aesthetic simulation system. By recording your facial gestures, lip dynamics, and symmetry, we plan your smile on screen and generate a physical trial smile you can test drive in your mouth before any permanent treatment begins."
  },
  {
    num: "05",
    q: "How do I schedule an appointment and what are the consultation details?",
    a: "Consultations can be booked through our online booking form or via our WhatsApp or phone (+356 2329 1029). Our patient coordinators will confirm a suitable appointment slot promptly."
  }
];

// Clinical Blog Posts with exact short slugs
export const blogPosts: BlogPost[] = [
  {
    id: "worn-teeth-guide",
    slug: "veneers",
    title: "Composite bonding, veneers or crowns? Rebuilding worn teeth",
    excerpt: "How the three options compare, why teeth become short through wear and acid erosion, and how we rebuild a worn bite with ceramics.",
    category: "Veneers & crowns",
    readTime: "7 min read",
    date: "6 October 2026",
    author: "Dr Susanna Diacono",
    authorRole: "Restorative Dentist",
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
    slug: "implant-consultation",
    title: "What happens at your first implant consultation",
    excerpt: "From the 3D scan to your written plan: a step-by-step look at how we assess you for dental implants.",
    category: "Implants",
    readTime: "5 min read",
    date: "October 2026",
    author: "Dr Mark Diacono",
    authorRole: "Specialist Oral Surgeon",
    image: "clinic/scanning_in_surgery.jpg",
    content: [
      "At your initial implant consultation, our surgeon and prosthodontist examine your mouth, review your medical history, and evaluate bone density using a 3D CBCT scan.",
      "You receive a clear, written plan with transparent costs before deciding on any procedure. Everything is explained in plain, comforting language."
    ]
  },
  {
    id: "dsd-works",
    slug: "digital-smile-design",
    title: "How Digital Smile Design works",
    excerpt: "How we design your new smile on screen and let you try it in your mouth before any treatment begins.",
    category: "Digital Smile Design",
    readTime: "4 min read",
    date: "October 2026",
    author: "Dr Susanna Diacono",
    authorRole: "Restorative Dentist",
    image: "clinic/md_3d_scanner_and_pt.jpg",
    content: [
      "Digital Smile Design (DSD) is a facially driven approach. Using photographs, video and digital 3D scans, we plan your new smile in harmony with your facial proportions.",
      "We produce a trial smile mock-up you can actually test drive directly in your mouth before any permanent work starts, ensuring total predictability and confidence."
    ]
  },
  {
    id: "child-first-visit",
    slug: "childs-first-visit",
    title: "Your child’s first dental visit",
    excerpt: "Simple tips to make the first visit a happy one, and what we check at each age.",
    category: "Family dentistry",
    readTime: "4 min read",
    date: "October 2026",
    author: "Dr Francesca Schembri",
    authorRole: "General & Paediatric Dentist",
    image: "clinic/examination_for_fading_background.jpg",
    content: [
      "We believe children’s first dental visit should be fun, gentle and reassuring. We count teeth, demonstrate fun brushing games, and help kids feel proud of their smiles."
    ]
  },
  {
    id: "anxious-care",
    slug: "nervous-patients",
    title: "Nervous about the dentist? You are not alone",
    excerpt: "How we help anxious patients feel in control, from the first phone call to the end of treatment.",
    category: "Anxious patients",
    readTime: "5 min read",
    date: "October 2026",
    author: "Dr Mark Diacono",
    authorRole: "Specialist Oral Surgeon",
    image: "clinic/dr_mark_patient_model.jpg",
    content: [
      "Dental anxiety is very common. We offer calm pre-treatment chats away from the chair, and IV sedation with a consultant anaesthetist for peaceful relaxation."
    ]
  },
  {
    id: "hygiene-matters",
    slug: "hygiene-visit",
    title: "Why your hygiene visit matters",
    excerpt: "What a hygienist does, how often to come, and how it protects your teeth and gums.",
    category: "Prevention",
    readTime: "4 min read",
    date: "October 2026",
    author: "Mary-Jane Galea",
    authorRole: "Dental Hygienist",
    image: "clinic/examination_for_fading_background.jpg",
    content: [
      "Professional hygiene visits protect your natural teeth and dental implants from periodontal disease, removing hardened tartar and polishing away stains safely."
    ]
  },
  {
    id: "dental-implants-csi",
    slug: "csi-implants",
    title: "Dental Implants & CSI Protocol: Rebuilding Teeth with Precision",
    excerpt: "From individual titanium implants to full-arch restorations and the Cortical-Spongiosa Immediate (CSI) protocol under sedation.",
    category: "Implants",
    readTime: "6 min read",
    date: "October 2026",
    author: "Dr Mark Diacono",
    authorRole: "Specialist Oral Surgeon",
    image: "clinic/scanning_in_surgery.jpg",
    content: [
      "Dental implants represent the gold standard for replacing missing teeth, restoring chewing efficiency and aesthetics, while preserving underlying jawbone health.",
      "At DiU Clinic at St James Hospital, implant procedures benefit from modern 3D CBCT diagnostic imaging, dedicated surgical facilities, and IV sedation administered by consultant anaesthetists for anxious patients.",
      "The CSI (Cortical-Spongiosa Immediate) implant treatment protocol leverages cortical bone stability combined with biocompatible titanium fixtures, enabling immediate primary stability.",
      "Whether you require a single implant to replace an isolated tooth or a full-arch rehabilitation, our surgical and prosthodontic team plans every millimeter digitally beforehand."
    ]
  }
];
