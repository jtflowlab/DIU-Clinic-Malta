import { useState, useEffect, useRef } from 'react';
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
  Smartphone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// Asset URL resolver (works flawlessly on GitHub Pages subpaths and local dev)
const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

// Official Logo SVG
const LogoMark = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 34 51" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#27CFC3"/>
    <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#27CFC3"/>
    <path d="M0 10.0222L8.75654 0L33.4809 10.0222L27.5573 50.882L0 10.0222Z" fill="#004A9C"/>
  </svg>
);

const FullLogo = ({ className = "h-9 w-auto", light = false }: { className?: string; light?: boolean }) => {
  const primaryColor = light ? "#FFFFFF" : "#004A9C";
  return (
    <svg viewBox="0 0 128 51" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <path d="M45.328 48.8262V12.2065H57.6901C62.7123 12.2065 66.7042 12.9775 69.5372 14.3909C72.499 15.9327 74.8169 18.1171 76.491 20.9439C78.165 23.7706 79.0664 26.9829 79.0664 30.4521C79.0664 32.8934 78.5513 35.2062 77.6499 37.519C76.7485 39.7034 75.332 41.7592 73.658 43.4296C71.8551 45.2284 69.7948 46.5133 67.4769 47.4128C66.0604 47.9267 64.7726 48.3122 63.6137 48.4407C62.4547 48.8262 60.2656 48.8262 57.0463 48.8262H45.328ZM57.1751 16.9607H50.6076V44.2005H57.3038C59.8793 44.2005 61.9396 44.072 63.4849 43.6866C64.9014 43.3011 66.1891 42.9156 67.0905 42.2732C68.1207 41.7592 68.8934 40.9883 69.7948 40.2173C72.3702 37.6475 73.658 34.3068 73.658 30.1951C73.658 26.2119 72.3702 22.9997 69.666 20.5584C68.6358 19.659 67.6056 18.888 66.3179 18.2456C65.0302 17.6031 63.8712 17.2176 62.7123 17.0892C61.5533 16.9607 59.7505 16.9607 57.1751 16.9607Z" fill={primaryColor}/>
        <path d="M84.7324 19.9159H90.0121V48.9546H84.7324V19.9159Z" fill={primaryColor}/>
        <path d="M122.72 12.2065H128V33.0219C128 35.8487 127.742 38.033 127.356 39.4464C126.97 40.8598 126.455 42.0162 125.811 43.0441C125.167 43.9435 124.523 44.843 123.622 45.6139C120.66 48.0552 116.926 49.3401 112.161 49.3401C107.396 49.3401 103.533 48.0552 100.571 45.6139C99.67 44.843 98.8974 43.9435 98.3823 43.0441C97.7385 42.1447 97.2234 40.8598 96.837 39.5749C96.4507 38.1615 96.1932 35.9772 96.1932 33.0219V12.2065H101.473V33.0219C101.473 36.4911 101.859 38.9324 102.632 40.2173C103.404 41.5022 104.563 42.6586 106.237 43.4296C107.911 44.2005 109.714 44.7145 111.903 44.7145C114.994 44.7145 117.569 43.9435 119.501 42.2732C120.531 41.3737 121.304 40.3458 121.69 39.1894C122.205 38.033 122.334 35.9772 122.334 33.0219V12.2065H122.72Z" fill={primaryColor}/>
        <path d="M90.012 12.2065H84.7324V17.0892H90.012V12.2065Z" fill="#27CFC3"/>
        <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#27CFC3"/>
        <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#27CFC3"/>
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

// Services / Treatments Data (Luxury Dental Architecture)
const servicesData = [
  {
    num: "01",
    id: "IMPLANTS",
    title: "Dental Implants & All-on-4",
    tagline: "Same-Day Fixed Teeth",
    bgClass: "bg-[#eaf8f7]",
    accentColor: "#27CFC3",
    summary: "Permanent full-arch or single tooth restoration guided by 3D CBCT digital bone mapping. Walk out with fixed, stable teeth on the very same day.",
    bullets: ["3D CBCT guided surgical placement", "All-on-4 immediate full arch loading", "Bio-compatible Swiss grade titanium", "Lifelong bone preservation"],
    desc: "Directed by senior maxillofacial surgeons and implantologists at St. James Hospital. Using high-precision 3D cone beam planning, we place implants with sub-millimeter accuracy. Patients with failing dentition or removable dentures can receive complete fixed teeth in one single visit without prolonged healing gaps."
  },
  {
    num: "02",
    id: "CADCAM",
    title: "Same-Day CEREC 3D Ceramics",
    tagline: "In-House Precision Milling",
    bgClass: "bg-[#eff5fc]",
    accentColor: "#004A9C",
    summary: "Precision porcelain crowns, inlays, and veneers designed and milled in our on-site dental laboratory in just 60 minutes. Zero messy impressions.",
    bullets: ["100% finished in a single visit", "Zero temporary restorations needed", "Optical intraoral 3D camera scanning", "High-strength biocompatible feldspathic porcelain"],
    desc: "Our on-site German CEREC CAD/CAM milling suite eliminates the two-week waiting period of traditional dental work. An optical 3D scan replaces traditional gooey trays; your custom restoration is sculpted digitally and diamond-milled while you relax in our private hospital lounge."
  },
  {
    num: "03",
    id: "SEDATION",
    title: "Certified IV Sedation Unit",
    tagline: "100% Anxiety & Pain Free",
    bgClass: "bg-[#f5f3ff]",
    accentColor: "#7c3aed",
    summary: "Dedicated intravenous sedation protocol directly monitored by consultant hospital anaesthetists for patients with dental anxiety or undergoing surgery.",
    bullets: ["Consultant hospital anaesthetist on-site", "Deep relaxation with peaceful wake-up", "Zero memory of procedural discomfort", "Full vital signs hemodynamic monitoring"],
    desc: "Designed specifically for nervous or phobic patients and complex surgical procedures. Intravenous sedation safely drifts you into a twilight sleep state. You remain responsive but completely calm and comfortable, with no recollection of surgical sounds or tension."
  },
  {
    num: "04",
    id: "SURGERY",
    title: "Maxillofacial & Hospital Surgery",
    tagline: "Sterile Hospital Theatres",
    bgClass: "bg-[#fef6ee]",
    accentColor: "#ea580c",
    summary: "Complex wisdom teeth extractions, bone grafting, sinus lifts, and corrective surgery performed in St. James Hospital sterile surgical suites.",
    bullets: ["Operating theatre hospital sterility", "Piezoelectric ultrasonic bone cutting", "Advanced sinus lift & bone regeneration", "Specialist maxillofacial surgical team"],
    desc: "Operating within Malta's leading private healthcare facility, our surgical division provides maximum clinical safety. Procedures are conducted with piezoelectric ultrasonic instruments that cut bone without harming adjacent soft tissue or nerve bundles."
  },
  {
    num: "05",
    id: "DSD",
    title: "Digital Smile Design (DSD)",
    tagline: "Predictable Facial Aesthetics",
    bgClass: "bg-[#fdf2f8]",
    accentColor: "#db2777",
    summary: "High-definition facial dynamic analysis. We produce a physical 3D mock-up you can test-drive in your own mouth before initiating treatment.",
    bullets: ["Facial harmony proportion mapping", "Physical mock-up test drive in mouth", "High-definition video aesthetic analysis", "Zero surprises in final aesthetic result"],
    desc: "Digital Smile Design bridges artistic facial aesthetics with dental engineering. By capturing video of your natural smile dynamics and speech patterns, we calculate ideal proportions and print a 3D preview you can wear and evaluate in real life before any tooth modification."
  },
  {
    num: "06",
    id: "ORTHO",
    title: "Invisalign & Clear Aligners",
    tagline: "Discreet Orthodontic Correction",
    bgClass: "bg-[#f0fdf4]",
    accentColor: "#16a34a",
    summary: "Virtually invisible removable aligners and cosmetic braces designed to correct overcrowding and bite misalignments with digital tracking.",
    bullets: ["Custom 3D transparent aligners", "Removable for normal eating & cleaning", "Digital weekly movement tracking", "Accelerated cosmetic orthodontic protocols"],
    desc: "Modern digital orthodontics for adults and teenagers. We digitize your entire tooth movement roadmap, allowing you to view your final aligned smile progression on-screen from day one while wearing discreet, comfortable trays."
  }
];

// Available Treatments for WhatsApp Booking Form
const treatmentOptions = [
  "Dental Implants & All-on-4 (Same-Day Fixed Teeth)",
  "CEREC 3D Ceramics & Veneers (60-Minute Milling)",
  "Certified IV Sedation (100% Anxiety & Pain Free)",
  "Maxillofacial & Surgical Wisdom Extraction",
  "Digital Smile Design (DSD Mockup)",
  "Invisalign & Clear Aligners",
  "General Consultation & 3D CBCT Bone Scan"
];

// Clinic Locations Data
const clinicLocations = [
  {
    id: 'sliema',
    name: 'St. James Hospital (Sliema)',
    tag: 'Flagship Hospital Suite',
    address: 'George Borg Olivier Street, Sliema SLM 1807, Malta',
    phone: '(+356) 2329 1029',
    phoneClean: '35623291029',
    email: 'info@dentalunitmalta.com',
    hours: [
      { days: 'Monday, Tuesday & Thursday', time: '09:00 – 18:00' },
      { days: 'Wednesday', time: '09:00 – 17:00' },
      { days: 'Friday', time: '09:00 – 13:00' }
    ],
    features: [
      'Full St. James Hospital Surgical Theatres',
      'Dedicated Consultant IV Sedation Unit',
      'In-House CEREC CAD/CAM 3D Milling Lab',
      'Direct Hospital Underground Parking'
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
    email: 'info@dentalunitmalta.com',
    hours: [
      { days: 'Monday, Tuesday & Thursday', time: '09:00 – 18:00' },
      { days: 'Wednesday', time: '09:00 – 17:00' },
      { days: 'Friday', time: '09:00 – 13:00' }
    ],
    features: [
      'Digital 3D CBCT Radiographic Suite',
      'Microscopic Endodontics & Aesthetics',
      'Rapid Same-Day Consultations',
      'Ground Floor Accessible Entrance'
    ],
    image: 'burmarrad_clinic.png'
  }
];

// Testimonials Data
const testimonialsData = [
  {
    author: "Christopher M.",
    treatment: "All-on-4 Full Arch Implants",
    text: "After years of struggling with missing teeth and dentists who only offered removable plates, Dr. Mark Diacono completely changed my life. I had my surgery under IV sedation at St. James Hospital in the morning and walked out with a fixed, beautiful set of teeth by afternoon. Zero pain, zero anxiety.",
    rating: 5,
    clinic: "Sliema Hospital"
  },
  {
    author: "Elena Vassallo",
    treatment: "CEREC Ceramic Crown in 1 Visit",
    text: "I chipped a front molar before an overseas flight. The team scanned my tooth with their 3D camera, milled the porcelain crown right there in their clinic lab, and bonded it in less than an hour! It matches my other teeth seamlessly. Incredible technology.",
    rating: 5,
    clinic: "San Pawl il-Baħar"
  },
  {
    author: "Mark Cassar",
    treatment: "Surgical Wisdom Extraction & Sedation",
    text: "As someone who suffers from severe dental phobia, having an anaesthetist administer IV sedation gave me total peace of mind. I remember lying down, and the next moment I was waking up with all 4 impacted teeth removed. The care was exemplary.",
    rating: 5,
    clinic: "Sliema Hospital"
  }
];

// FAQs Data
const faqsData = [
  {
    q: "Can I really receive a fixed set of teeth or crown in one single day?",
    a: "Yes. Using our in-house CEREC CAD/CAM 3D milling lab and immediate-load implant protocols (All-on-4), single crowns and full arch restorations can be designed, fabricated, and fitted in a single appointment. This avoids traditional gooey impression trays and weeks of temporary teeth."
  },
  {
    q: "How does the certified IV sedation work for nervous patients?",
    a: "IV sedation is supervised directly on-site by certified consultant hospital anaesthetists. A gentle sedative is administered through an IV line, causing you to enter a relaxed twilight sleep state. You remain responsive but feel no discomfort, hear no dental sounds, and will have zero recollection of pain afterwards."
  },
  {
    q: "What makes being located inside St. James Hospital advantageous?",
    a: "Being directly situated within Malta's premier private hospital ensures the strictest medical sterility, backup medical services, emergency hospital operating theatres, on-site 3D diagnostic imaging, and private recovery facilities that typical high-street clinics cannot provide."
  },
  {
    q: "What is Digital Smile Design (DSD) and how does it help me?",
    a: "DSD is a 3D aesthetic simulation system. By recording your facial gestures, lips, and facial symmetry, we generate a physical mock-up you can 'test-drive' in your mouth. You see and feel exactly how your smile will look before any procedure is started."
  },
  {
    q: "Are consultations free and how do I schedule an appointment?",
    a: "Initial evaluations can be booked directly through our fast WhatsApp consultation flow with live chat preview or by calling (+356) 2329 1029 (Sliema) or (+356) 2329 3710 (San Pawl). Our hospital patient coordinators will confirm a specialist slot within minutes."
  }
];

// Clinical Transformations Cases Data (Cover-Up Portfolio Style)
const transformationCases = [
  {
    id: 1,
    title: "All-on-4 Full Arch",
    subtitle: "Same-Day Fixed Implant Restoration",
    summary: "Complete upper arch rehabilitation for terminal dentition. Computer-guided 4-implant placement with immediate loading and screw-retained zirconia bridge.",
    timeframe: "Single-Day Surgery",
    sedation: "Certified Hospital IV Sedation",
    beforeLabel: "Before: Failing Dentition",
    afterLabel: "After: Fixed All-on-4 Teeth",
    beforeImage: "sliema_clinic.png",
    afterImage: "results_preview.png"
  },
  {
    id: 2,
    title: "CEREC Same-Day Smile",
    subtitle: "High-Strength Biocompatible Ceramics",
    summary: "Cosmetic ceramic rehabilitation using on-site CEREC 3D CAD/CAM milling. Restored vertical dimension and natural shade harmony in just 60 minutes.",
    timeframe: "60-Minute Milling",
    sedation: "Comfort Local Protocol",
    beforeLabel: "Before: Enamel Wear & Crowding",
    afterLabel: "After: 3D Feldspathic Veneers",
    beforeImage: "frame_chair.jpg",
    afterImage: "results_preview.png"
  },
  {
    id: 3,
    title: "3D Guided Bone Reconstruction",
    subtitle: "Sub-Millimeter CBCT Anatomy Mapping",
    summary: "Severe bone resorption treated with precision sinus lift and particulate graft before placement of Swiss-grade biocompatible titanium fixtures.",
    timeframe: "3-Month Integration",
    sedation: "Hospital IV Sedation Protocol",
    beforeLabel: "Before: Severe Bone Deficit",
    afterLabel: "After: Integrated Titanium Implants",
    beforeImage: "tech_preview.png",
    afterImage: "results_preview.png"
  },
  {
    id: 4,
    title: "Zero Anxiety Rehabilitation",
    subtitle: "Consultant-Administered IV Sedation",
    summary: "Severe dental phobia patient received full restorative treatment across 4 quadrants in a single asleep session inside St. James Hospital.",
    timeframe: "Single Sedated Session",
    sedation: "St. James Consultant Anaesthetist",
    beforeLabel: "Before: High Dental Anxiety",
    afterLabel: "After: Restored Healthy Smile",
    beforeImage: "frame_reception.jpg",
    afterImage: "results_preview.png"
  }
];

// Hospital Accreditations & Standards (Awards Style List)
const hospitalAccreditations = [
  {
    num: "01",
    name: "St. James Hospital Network Surgical Accreditation",
    category: "Hospital Sterile Suites",
    year: "Est. 1999 • Sliema & San Pawl il-Baħar",
    detail: "Full hospital sterilization suites, HEPA surgical filtration, emergency backup, and St. James medical monitoring."
  },
  {
    num: "02",
    name: "CEREC 3D CAD/CAM Center of Clinical Excellence",
    category: "In-House Digital Milling Lab",
    year: "Certified Sirona Dental System",
    detail: "Direct intraoral optical scanning and immediate diamond-bur ceramic milling within 60 minutes. Zero temporary crowns."
  },
  {
    num: "03",
    name: "European Association for Osseointegration (EAO)",
    category: "Surgical & Implant Protocols",
    year: "Swiss-Grade Bio-Titanium Standards",
    detail: "Strict adherence to international biocompatibility protocols with Nobel Biocare and Straumann surgical fixtures."
  },
  {
    num: "04",
    name: "Consultant Hospital Anaesthetist IV Sedation",
    category: "Patient Safety & Pain-Free Protocol",
    year: "Board-Certified Medical Specialists",
    detail: "Full continuous hemodynamic vital signs monitoring for zero-anxiety procedures inside hospital operating suites."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [activeClinic, setActiveClinic] = useState<'sliema' | 'burmarrad'>('sliema');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // WhatsApp Intake Modal State & Interactive Live Preview
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    clinic: 'Sliema', // 'Sliema' | 'San Pawl il-Baħar'
    treatment: 'Dental Implants & All-on-4 (Same-Day Fixed Teeth)',
    urgency: 'Esta semana (Lunes a Viernes)',
    notes: ''
  });
  const [formValidationWarning, setFormValidationWarning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Standard Lead desk state
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', clinic: 'Sliema', service: 'Implants' });

  const videoRef = useRef<HTMLVideoElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // 21st.dev / Elena Voss Scroll-Synchronized Transforms
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end end"]
  });

  const heroCardScale = useTransform(heroProgress, [0, 0.75], [1, 0.58]);
  const heroCardRadius = useTransform(heroProgress, [0, 0.55], ["0px", "32px"]);
  const marqueeOpacity = useTransform(heroProgress, [0.05, 0.45], [0, 1]);
  const heroTextOpacity = useTransform(heroProgress, [0.15, 0.65], [1, 0.25]);
  const heroTextY = useTransform(heroProgress, [0.15, 0.65], [0, -30]);

  // Video Autoplay & Loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
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

  // Horizontal Scroll Handler for Services
  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (!horizontalTrackRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    horizontalTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Before / After Slider Drag Logic
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(5, Math.min(95, position)));
  };

  // Open WhatsApp Intake Modal with customizable defaults
  const openWhatsAppBooking = (initialDefaults?: Partial<typeof bookingForm>) => {
    if (initialDefaults) {
      setBookingForm(prev => ({ ...prev, ...initialDefaults }));
    }
    setFormValidationWarning(false);
    setCopySuccess(false);
    setWhatsappModalOpen(true);
  };

  // Generates real-time WhatsApp message string
  const generateWhatsAppMessage = () => {
    const nameText = bookingForm.name.trim() || '[Nombre del Paciente]';
    const phoneText = bookingForm.phone.trim() || '[Teléfono WhatsApp]';
    const clinicName = bookingForm.clinic === 'Sliema' 
      ? 'St. James Hospital (Sliema Flagship)' 
      : 'St. James Medical Centre (San Pawl il-Baħar)';
    const treatmentText = bookingForm.treatment || 'Consulta Quirúrgica';
    const urgencyText = bookingForm.urgency || 'Esta semana';
    const notesText = bookingForm.notes.trim() ? `\n📝 *Detalles o Síntomas:* ${bookingForm.notes.trim()}` : '';

    return `👋 *SOLICITUD DE AGENDAMIENTO • DiU CLINIC MALTA*
━━━━━━━━━━━━━━━━━━
👤 *Paciente:* ${nameText}
📱 *Teléfono WhatsApp:* ${phoneText}
🏛️ *Sede de Preferencia:* ${clinicName}
🦷 *Tratamiento:* ${treatmentText}
⏰ *Disponibilidad / Urgencia:* ${urgencyText}${notesText}
━━━━━━━━━━━━━━━━━━
_Solicitud generada a través de la web oficial de DiU Clinic Malta (St. James Hospital Network). Deseo confirmar disponibilidad para consulta._`;
  };

  // Direct Send to WhatsApp Link
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

  // Copy message to clipboard helper
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

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Show floating bar and adjust header on scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowBottomBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 font-sans selection:bg-[#27CFC3] selection:text-slate-950 overflow-x-clip">

      {/* 1. ULTRA-LUXURY FLOATING NAVBAR */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5 px-4 sm:px-8' 
          : 'bg-transparent py-5 px-4 sm:px-8 lg:px-12'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <FullLogo light={true} className="h-8 sm:h-9 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow" />
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-semibold text-white/80 tracking-widest uppercase">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#27CFC3] transition-colors bg-transparent border-none cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollToSection('smile-results')} className="hover:text-[#27CFC3] transition-colors bg-transparent border-none cursor-pointer">
              Restorations
            </button>
            <button onClick={() => scrollToSection('why-diu')} className="hover:text-[#27CFC3] transition-colors bg-transparent border-none cursor-pointer">
              Why DiU
            </button>
            <button onClick={() => scrollToSection('services-section')} className="hover:text-[#27CFC3] transition-colors bg-transparent border-none cursor-pointer">
              Specialties
            </button>
            <button onClick={() => scrollToSection('clinics')} className="hover:text-[#27CFC3] transition-colors bg-transparent border-none cursor-pointer">
              Hospital Clinics
            </button>
            <button onClick={() => scrollToSection('faqs')} className="hover:text-[#27CFC3] transition-colors bg-transparent border-none cursor-pointer">
              FAQ
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Primary Instant WhatsApp Pill */}
            <button
              onClick={() => openWhatsAppBooking()}
              className="group relative flex items-center justify-center gap-2 h-9 sm:h-11 px-3.5 sm:px-5 rounded-full overflow-hidden text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-300 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-105 cursor-pointer border-none shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 text-slate-950" />
              <span>Agendar WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : (
                <div className="flex flex-col gap-1.5 w-6">
                  <span className="h-0.5 w-full bg-white rounded" />
                  <span className="h-0.5 w-4/5 bg-white rounded" />
                  <span className="h-0.5 w-full bg-white rounded" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-950/95 backdrop-blur-xl border border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-semibold text-white mt-3 rounded-2xl shadow-2xl"
            >
              <button onClick={() => scrollToSection('hero')} className="text-left py-2 border-b border-white/10 bg-transparent border-none text-white cursor-pointer">Overview</button>
              <button onClick={() => scrollToSection('smile-results')} className="text-left py-2 border-b border-white/10 bg-transparent border-none text-white cursor-pointer">Award-Winning Restorations</button>
              <button onClick={() => scrollToSection('why-diu')} className="text-left py-2 border-b border-white/10 bg-transparent border-none text-white cursor-pointer">Why DiU Clinic?</button>
              <button onClick={() => scrollToSection('services-section')} className="text-left py-2 border-b border-white/10 bg-transparent border-none text-white cursor-pointer">Specialties & Treatments</button>
              <button onClick={() => scrollToSection('clinics')} className="text-left py-2 border-b border-white/10 bg-transparent border-none text-white cursor-pointer">The 2 Hospital Clinics</button>
              <button onClick={() => scrollToSection('faqs')} className="text-left py-2 border-b border-white/10 bg-transparent border-none text-white cursor-pointer">Questions & Answers</button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppBooking();
                }}
                className="w-full mt-2 py-3.5 rounded-full bg-[#25D366] text-slate-950 font-black text-center text-xs uppercase tracking-wider border-none cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                <span>Agendar Cita en WhatsApp</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION: 21ST.DEV SCROLL-SHRINK CARD + DUAL VERTICAL MARQUEE UNVEIL */}
      <div 
        id="hero" 
        ref={heroSectionRef} 
        className="relative w-full h-[260vh] bg-[#070B12]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#070B12]">
          
          {/* Layer 0: Dual Vertical Marquee Stream (Unveiled behind shrinking hero card) */}
          <motion.div 
            style={{ opacity: marqueeOpacity }}
            className="absolute inset-0 pointer-events-none z-0 flex justify-between px-4 sm:px-12 lg:px-20 overflow-hidden"
          >
            {/* Ambient Cyan / Midnight Glow Overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(39,207,195,0.12)_0%,transparent_75%)]" />
            <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#070B12] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#070B12] to-transparent z-10" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070B12] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070B12] to-transparent z-10" />

            {/* Column 1: Upward scrolling stream */}
            <div className="w-[46%] sm:w-[28%] flex flex-col gap-6 marquee-col-1">
              {[
                { title: 'Sliema Hospital Surgical Theatre', tag: 'Flagship Centre', img: 'sliema_clinic.png' },
                { title: 'Executive Patient Intake & Reception', tag: 'St. James Hospital', img: 'frame_reception.jpg' },
                { title: 'CEREC CAD/CAM 3D Milling Lab', tag: 'In-House Ceramics', img: 'tech_preview.png' },
                { title: 'Consultant IV Sedation Suite', tag: 'Zero Anxiety Care', img: 'frame_chair.jpg' },
                { title: 'Sliema Hospital Surgical Theatre', tag: 'Flagship Centre', img: 'sliema_clinic.png' },
                { title: 'Executive Patient Intake & Reception', tag: 'St. James Hospital', img: 'frame_reception.jpg' },
                { title: 'CEREC CAD/CAM 3D Milling Lab', tag: 'In-House Ceramics', img: 'tech_preview.png' },
                { title: 'Consultant IV Sedation Suite', tag: 'Zero Anxiety Care', img: 'frame_chair.jpg' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-2xl shrink-0">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={getAssetUrl(item.img)} alt={item.title} className="w-full h-full object-cover brightness-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#27CFC3]">{item.tag}</span>
                      <div className="text-xs font-semibold truncate">{item.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Downward scrolling stream */}
            <div className="w-[46%] sm:w-[28%] flex flex-col gap-6 marquee-col-2">
              {[
                { title: 'San Pawl il-Baħar Medical Centre', tag: 'North Malta Suite', img: 'burmarrad_clinic.png' },
                { title: 'St. James Sterile Hospital Hallway', tag: 'Accredited Facility', img: 'frame_hallway.jpg' },
                { title: 'Digital Smile Design & 3D CBCT', tag: 'Diagnostic Precision', img: 'tech_preview.png' },
                { title: 'Restorative All-on-4 Treatment Room', tag: 'Same-Day Surgery', img: 'frame_chair.jpg' },
                { title: 'San Pawl il-Baħar Medical Centre', tag: 'North Malta Suite', img: 'burmarrad_clinic.png' },
                { title: 'St. James Sterile Hospital Hallway', tag: 'Accredited Facility', img: 'frame_hallway.jpg' },
                { title: 'Digital Smile Design & 3D CBCT', tag: 'Diagnostic Precision', img: 'tech_preview.png' },
                { title: 'Restorative All-on-4 Treatment Room', tag: 'Same-Day Surgery', img: 'frame_chair.jpg' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-2xl shrink-0">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={getAssetUrl(item.img)} alt={item.title} className="w-full h-full object-cover brightness-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#27CFC3]">{item.tag}</span>
                      <div className="text-xs font-semibold truncate">{item.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Layer 1: Pinned Shrinking Hero Card */}
          <motion.div 
            style={{ 
              scale: heroCardScale, 
              borderRadius: heroCardRadius 
            }}
            className="relative w-full h-full overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-[#070B12] z-10 transition-shadow duration-300"
          >
            {/* Background 4K Video */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
              <video
                ref={videoRef}
                src={getAssetUrl('video_hero_4k.mp4')}
                poster={getAssetUrl('hero_poster_4k.jpg')}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-cover object-center"
              />
              {/* Radial glow and directional gradient filters for optimal contrast */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_20%,rgba(39,207,195,0.25)_0%,transparent_65%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_20%_80%,rgba(0,74,156,0.45)_0%,transparent_70%)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50" />
            </div>

            {/* Foreground Content Layer (High-Converting Hero with WhatsApp Intake & Scroll Explorer) */}
            <motion.div 
              style={{ opacity: heroTextOpacity, y: heroTextY }}
              className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-16 sm:py-24 w-full h-full flex flex-col justify-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Content Column */}
                <div className="lg:col-span-8 text-white">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#27CFC3] text-[11px] sm:text-xs font-bold tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>EST. 1999 • ST. JAMES HOSPITAL NETWORK</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] sm:text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>4.9 / 5.0 (200+ Reviews)</span>
                    </div>
                  </div>

                  {/* 3-Line Statement in Editorial Typography */}
                  <h1 className="text-5xl sm:text-7xl lg:text-[5.5vw] font-normal tracking-tight leading-[1.05] mb-6 drop-shadow-md font-editorial text-white">
                    Precision <br />
                    Dentistry. <br />
                    <span className="text-[#27CFC3]">In Motion.</span>
                  </h1>

                  <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-normal leading-relaxed max-w-2xl mb-8 drop-shadow font-body">
                    Founded by <strong className="font-semibold text-white">Dr. Mark & Susanna Diacono</strong>. Same-day CEREC 3D ceramics, precision bone reconstruction, and 100% anxiety-free certified IV sedation inside St. James Hospital.
                  </p>

                  {/* High-Converting Action Row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                    
                    {/* PRIMARY HIGH-CONVERTING WHATSAPP BUTTON */}
                    <button
                      onClick={() => openWhatsAppBooking()}
                      className="group relative flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-emerald-500/40 hover:scale-[1.03] cursor-pointer border-none"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-slate-950" />
                      <span>Agendar Cita por WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    {/* SECONDARY EXPLORATION BUTTON (Scroll down) */}
                    <button
                      onClick={() => scrollToSection('smile-results')}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/25 hover:border-white transition-all cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-[#27CFC3]" />
                      <span>Explorar Casos (Scroll ↓)</span>
                    </button>

                    {/* DIRECT HOSPITAL CALL */}
                    <a
                      href="tel:+35623291029"
                      className="hidden md:flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-white/5 hover:bg-white/15 text-white/90 hover:text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer border border-white/10 no-underline"
                    >
                      <Phone className="w-4 h-4 text-[#27CFC3]" />
                      <span>(+356) 2329 1029</span>
                    </a>
                  </div>

                  {/* Trust Reassurance Footnote */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Respuesta en menos de 15 min</span>
                    </div>
                    <span className="text-white/30 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Sin compromiso</span>
                    </div>
                    <span className="text-white/30 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Sliema & San Pawl il-Baħar</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Stacked Editorial Metadata */}
                <div className="hidden lg:flex lg:col-span-4 flex-col justify-between items-end text-right h-full py-4 text-white">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#27CFC3] block mb-1">
                      Hospital Network
                    </span>
                    <div className="text-base font-editorial text-white/90">
                      St. James Hospital
                    </div>
                    <div className="text-xs text-white/60">
                      Sliema & San Pawl il-Baħar
                    </div>
                  </div>

                  <div className="my-8">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#27CFC3] block mb-1">
                      Clinical Excellence
                    </span>
                    <div className="text-base font-editorial text-white/90">
                      Est. 1999 • 27+ Years
                    </div>
                    <div className="text-xs text-white/60">
                      10,000+ Restored Smiles
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#27CFC3] block mb-1">
                      Surgical Advancement
                    </span>
                    <div className="text-base font-editorial text-white/90">
                      CEREC 3D & IV Sedation
                    </div>
                    <div className="text-xs text-white/60">
                      Zero Anxiety Certified Care
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Bottom Video HUD Bar & Controls */}
            <div className="absolute bottom-5 inset-x-4 sm:inset-x-8 lg:inset-x-12 z-20 flex justify-between items-center pointer-events-none">
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#27CFC3] animate-ping" />
                <span>4K CLINICAL SUITE • ST. JAMES HOSPITAL</span>
              </div>

              {/* Central Scroll Indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-medium mx-auto sm:mx-0">
                <span>Scroll to explore clinical suites</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#27CFC3] animate-bounce" />
              </div>

              {/* Right Play / Pause Toggle */}
              <button
                onClick={toggleVideoPlayback}
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                className="pointer-events-auto hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium cursor-pointer transition-colors"
              >
                {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isVideoPlaying ? "Pause 4K Tour" : "Play 4K Tour"}</span>
              </button>
            </div>

          </motion.div>
        </div>
      </div>

      {/* 3. ARCHED ROLLING TRANSITION: AWARD-WINNING RESTORATIONS */}
      <section 
        id="smile-results" 
        className="-mt-24 sm:-mt-32 rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[100px] bg-[#070B12] text-white pt-24 pb-28 sm:pb-36 border-t border-white/10 relative z-20 shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.8)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#27CFC3] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <Smile className="w-4 h-4 text-[#27CFC3]" />
              <span>Verified Clinical Results [ 01 – 04 ]</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-[5.5vw] font-normal tracking-tight font-editorial text-white mb-4 leading-[1.1]">
              Award-Winning Restorations
            </h2>
            <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto font-body">
              Precision transformations engineered with Swiss Straumann implants and in-house CEREC 3D ceramics inside St. James Hospital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Timeline List of Cases */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-4"
            >
              {transformationCases.map((c, idx) => {
                const isActive = activeCaseIndex === idx;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      isActive 
                        ? 'bg-white/10 text-white border-[#27CFC3]/50 shadow-2xl backdrop-blur-md' 
                        : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#27CFC3]" />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-extrabold tracking-wider font-heading ${isActive ? 'text-[#27CFC3]' : 'text-slate-500'}`}>
                        [ 0{c.id} ]
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isActive ? 'bg-[#27CFC3]/20 text-[#27CFC3]' : 'bg-white/5 text-slate-400'
                      }`}>
                        {c.timeframe}
                      </span>
                    </div>

                    <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-1 font-editorial ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {c.title}
                    </h3>
                    <div className={`text-xs font-semibold mb-2 ${isActive ? 'text-[#27CFC3]' : 'text-slate-400'}`}>
                      {c.subtitle}
                    </div>

                    <p className={`text-xs leading-relaxed line-clamp-2 ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                      {c.summary}
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className={isActive ? 'text-slate-300' : 'text-slate-500'}>
                        {c.sedation}
                      </span>
                      <span className={`font-bold flex items-center gap-1 ${isActive ? 'text-[#27CFC3]' : 'text-white/70 group-hover:text-white'}`}>
                        Inspect Case <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Right Column: Dynamic Interactive Before & After Slider */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="bg-slate-900/90 p-5 sm:p-7 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
                
                {/* Active Case Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-white/10">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#27CFC3] font-heading">
                      Current Inspection • Case 0{transformationCases[activeCaseIndex].id}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white font-editorial">
                      {transformationCases[activeCaseIndex].title}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/10 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-[#27CFC3] animate-pulse" />
                    <span>{transformationCases[activeCaseIndex].timeframe}</span>
                  </div>
                </div>

                {/* Slider Container */}
                <div
                  ref={sliderContainerRef}
                  onMouseMove={(e) => handleSliderMove(e.clientX)}
                  onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
                  className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-white/15 shadow-2xl cursor-ew-resize select-none bg-slate-950"
                >
                  {/* After Image */}
                  <img
                    src={getAssetUrl(transformationCases[activeCaseIndex].afterImage)}
                    alt={transformationCases[activeCaseIndex].afterLabel}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Before Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={getAssetUrl(transformationCases[activeCaseIndex].beforeImage)}
                      alt={transformationCases[activeCaseIndex].beforeLabel}
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : '100%' }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                  </div>

                  {/* Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center z-20"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#27CFC3] text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white text-xs font-bold">
                      ⇄
                    </div>
                  </div>

                  {/* Floating Labels */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {transformationCases[activeCaseIndex].beforeLabel}
                  </div>
                  <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#004A9C]/90 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    {transformationCases[activeCaseIndex].afterLabel}
                  </div>

                  {/* Bottom Instruction */}
                  <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none z-10">
                    <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                      Drag left & right to inspect restoration
                    </span>
                  </div>
                </div>

                {/* Bottom Quick WhatsApp Trigger */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Protocol:</strong> {transformationCases[activeCaseIndex].sedation} • {transformationCases[activeCaseIndex].summary}
                  </div>
                  <button
                    onClick={() => openWhatsAppBooking({
                      treatment: `${transformationCases[activeCaseIndex].title} (${transformationCases[activeCaseIndex].subtitle})`
                    })}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 transition-all hover:scale-105 cursor-pointer border-none shadow-lg shadow-emerald-500/20"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                    <span>Consultar este Procedimiento</span>
                  </button>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE DIU CLINIC? (3-BENTO GRID WITH SCROLL ENTRANCE & HOVER REVEALS) */}
      <section id="why-diu" className="py-24 md:py-32 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Surgical Excellence Inside St. James Hospital</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-slate-950 tracking-tight font-editorial mb-4">
              Why Choose DiU Clinic?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-body">
              Fast-track your dental restoration with Swiss & German surgical precision.
            </p>
          </motion.div>

          {/* 3 Large Architectural Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {[
              {
                num: "01",
                badge: "CEREC CAD/CAM 3D Lab",
                title: "Rapid Same-Day Restorations",
                desc: "Walk in with damaged, fractured, or missing teeth. Leave with permanent, custom-shaded German ceramic crowns and bridges diamond-milled on-site within hours.",
                f1: "Single Visit Delivery",
                f2: "Zero Temporary Crowns",
                treatmentSelect: "CEREC 3D Ceramics & Veneers (60-Minute Milling)"
              },
              {
                num: "02",
                badge: "St. James Hospital Network",
                title: "Precision & Surgical Safety",
                desc: "Led by Dr. Mark & Susanna Diacono, every surgical procedure operates under stringent hospital operating theatre sterilization, HEPA filtration, and 3D CBCT guided protocols.",
                f1: "Sub-mm Guided Accuracy",
                f2: "Full Hospital Sterility",
                treatmentSelect: "Dental Implants & All-on-4 (Same-Day Fixed Teeth)"
              },
              {
                num: "03",
                badge: "Board-Certified Anesthetist",
                title: "100% Zero-Anxiety IV Sedation",
                desc: "Complete complex bone grafting, multiple implants, or full-arch smile rehabilitations while comfortably asleep. Zero pain, zero stress, wake up with your smile restored.",
                f1: "Twilight Sleep Protocol",
                f2: "Zero Dental Memory",
                treatmentSelect: "Certified IV Sedation (100% Anxiety & Pain Free)"
              }
            ].map((card, idx) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Hover line glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#27CFC3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-slate-400 tracking-wider">[ {card.num} ]</span>
                    <button
                      onClick={() => openWhatsAppBooking({ treatment: card.treatmentSelect })}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer bg-transparent border-none"
                    >
                      <span>Consultar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#004A9C] mb-2 font-heading">
                    {card.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-slate-950 mb-4 tracking-tight font-editorial">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{card.f1}</span>
                  <span className="text-[#27CFC3]">{card.f2}</span>
                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* 5. NEW: EDITORIAL PINNED HOSPITAL STATEMENT (Inspired by 21st.dev Reference) */}
      <section className="py-28 md:py-36 bg-[#070B12] text-white relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(39,207,195,0.12)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#27CFC3] text-xs font-bold uppercase tracking-widest mb-8 border border-white/15"
          >
            <ShieldCheck className="w-4 h-4 text-[#27CFC3]" />
            <span>St. James Hospital Network Standards</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight font-editorial leading-[1.08] max-w-5xl mx-auto mb-10 text-white"
          >
            Where Surgical Mastery <br className="hidden sm:inline" />
            <span className="text-[#27CFC3]">Meets Absolute Peace of Mind.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto font-body leading-relaxed mb-12"
          >
            Operating directly inside Malta’s premier private hospital, our surgical theatres, on-site CEREC 3D milling lab, and certified IV sedation protocol eliminate pain, guesswork, and weeks of waiting.
          </motion.p>

          {/* Quick Action Pill in Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => openWhatsAppBooking()}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:scale-105 cursor-pointer border-none"
            >
              <WhatsAppIcon className="w-4 h-4 text-slate-950" />
              <span>Agendar Consulta por WhatsApp</span>
            </button>
            <button
              onClick={() => scrollToSection('clinics')}
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#27CFC3]" />
              <span>Ver Sedes St. James</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Hospital Anchors Bar */}
      <div className="bg-[#EBF1F6] border-b border-slate-200/80 py-5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
            <div className="text-base font-extrabold text-[#004A9C] font-heading">100% In-House</div>
            <div className="text-[11px] text-slate-600">CEREC 3D Milling Lab</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
            <div className="text-base font-extrabold text-[#004A9C] font-heading">Zero Anxiety</div>
            <div className="text-[11px] text-slate-600">Certified IV Sedation</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
            <div className="text-base font-extrabold text-[#004A9C] font-heading">3D CBCT</div>
            <div className="text-[11px] text-slate-600">Sub-mm Bone Scans</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
            <div className="text-base font-extrabold text-[#004A9C] font-heading">Same Day</div>
            <div className="text-[11px] text-slate-600">All-on-4 Fixed Teeth</div>
          </div>
        </div>
      </div>

      {/* 6. PROVEN CLINICAL METRICS & SURGICAL CREDENTIALS */}
      <section className="py-20 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#004A9C] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4" />
              <span>Redefining Dental Excellence Since 1999</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight font-heading">
              Hospital Precision & Proven Results
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 font-body">
              We never cut corners on materials, sterilization protocols, or patient comfort.
            </p>
          </motion.div>

          {/* 4 Large Bento Counter Cards with Staggered Entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              {
                num: "01",
                stat: "27+",
                title: "Years Established",
                desc: "Founding dental surgery and restorative team operating inside St. James Hospital since 1999."
              },
              {
                num: "02",
                stat: "10k+",
                title: "Smiles Restored",
                desc: "Over ten thousand dental implants, full-arch restorations, and CEREC ceramics successfully completed."
              },
              {
                num: "03",
                stat: "98%",
                title: "Anxiety-Free Rating",
                desc: "Patients report zero discomfort or fear under our consultant-administered IV sedation protocols."
              },
              {
                num: "04",
                stat: "07m",
                title: "Average Wait Time",
                desc: "Digital patient intake and dedicated treatment chairs guarantee virtually zero waiting time."
              }
            ].map((stat, idx) => (
              <motion.div
                key={stat.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-[#27CFC3] transition-all hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#27CFC3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-xs font-bold text-slate-400 tracking-wider mb-4">[ {stat.num} ]</div>
                <div className="text-5xl sm:text-6xl font-extrabold text-[#004A9C] tracking-tight mb-2 group-hover:text-[#27CFC3] transition-colors font-heading">
                  {stat.stat}
                </div>
                <div className="text-lg font-bold text-slate-900 mb-2 font-heading">{stat.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {stat.desc}
                </p>
              </motion.div>
            ))}

          </div>

          {/* Clinical Quote from Mark & Susanna Diacono */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-14 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#004A9C] flex items-center justify-center shrink-0 border border-white/20">
                <LogoMark className="w-8 h-8" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold tracking-tight">
                  “We treat you like family, because your smile and health matter most.”
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Dr. Mark Diacono (B.Ch.D) & Susanna Diacono (M.Sc) • Co-Founders, DiU Malta
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('clinics')}
              className="px-6 py-3 rounded-full bg-[#27CFC3] hover:bg-[#20b5aa] text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all hover:scale-105 cursor-pointer border-none"
            >
              Meet The Clinical Team
            </button>
          </motion.div>

        </div>
      </section>

      {/* 7. HORIZONTAL SCROLL SERVICES CAROUSEL */}
      <section id="services-section" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Advanced Clinical Specialties [ 01 – 06 ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
                Comprehensive Care For <span className="text-[#004A9C]">Every Patient</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-2xl font-body">
                Explore our six flagship surgical and restorative procedures. Drag or use arrows to view all treatments.
              </p>
            </div>

            {/* Navigation Arrows for Horizontal Track */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollHorizontal('left')}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full bg-white border border-slate-200 hover:border-[#004A9C] text-slate-800 flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollHorizontal('right')}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full bg-[#004A9C] hover:bg-[#003875] text-white flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer border-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* The Horizontal Scrolling Track */}
        <div 
          ref={horizontalTrackRef}
          className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-12 pb-8 scroll-smooth"
        >
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className={`min-w-[320px] sm:min-w-[380px] lg:min-w-[420px] rounded-3xl p-8 border border-slate-200/90 shadow-md flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${svc.bgClass}`}
              onClick={() => setSelectedService(svc)}
            >
              <div>
                {/* Number & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-extrabold text-slate-400 tracking-wider font-heading">
                    [ {svc.num} ]
                  </span>
                  <span 
                    className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-white/80 border border-slate-200/60"
                    style={{ color: svc.accentColor }}
                  >
                    {svc.tagline}
                  </span>
                </div>

                {/* Title & Summary */}
                <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight font-heading">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {svc.summary}
                </p>

                {/* Feature Bullets */}
                <ul className="space-y-2 mb-8">
                  {svc.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons in Card */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openWhatsAppBooking({ treatment: svc.title });
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#25D366] text-slate-950 font-black text-[11px] uppercase tracking-wider border-none cursor-pointer hover:bg-[#20ba59] shadow-sm transition-transform hover:scale-105"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Agendar</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span>Detalles</span>
                  <div 
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-900 group-hover:scale-110 transition-transform overflow-hidden relative"
                  >
                    <ArrowUpRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
                    <ArrowUpRight className="w-4 h-4 text-[#004A9C] absolute transition-all duration-300 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 8. HOSPITAL ACCREDITATIONS & SURGICAL STANDARDS (AWARDS STYLE LIST) */}
      <section className="py-20 md:py-28 bg-[#070B12] text-white border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#27CFC3] text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
                <Award className="w-4 h-4 text-[#27CFC3]" />
                <span>Hospital Standards & Certifications</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading">
                Accreditations of Excellence
              </h2>
            </div>
            <p className="text-slate-400 text-sm sm:text-base max-w-md font-body">
              Our clinical operating theatres and sterilization protocols meet the strictest European hospital standards.
            </p>
          </motion.div>

          {/* Minimalist Editorial Row List with Staggered Entrance */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {hospitalAccreditations.map((item, idx) => (
              <motion.div 
                key={item.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="py-8 sm:py-10 group relative transition-all duration-300 hover:bg-white/[0.02] px-4 -mx-4 rounded-xl cursor-default"
              >
                {/* Hover line draw */}
                <div className="absolute left-0 bottom-0 right-0 h-0.5 bg-[#27CFC3] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  <div className="lg:col-span-1 text-sm font-extrabold text-[#27CFC3] font-heading">
                    [ {item.num} ]
                  </div>
                  <div className="lg:col-span-5">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#27CFC3] transition-colors font-heading">
                      {item.name}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1">
                      {item.category}
                    </div>
                  </div>
                  <div className="lg:col-span-4 text-xs sm:text-sm text-slate-300 font-body">
                    {item.detail}
                  </div>
                  <div className="lg:col-span-2 text-left lg:text-right">
                    <span className="inline-block text-[11px] font-semibold text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {item.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. THE 2 CLINICS: DUAL HOSPITAL LOCATIONS & SCHEDULES */}
      <section id="clinics" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#004A9C] text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-4 h-4" />
              <span>Two Convenient Clinical Centres</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
              St. James Hospital Network in Malta
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 font-body">
              Operating sterile surgical suites in Sliema and specialized diagnostic dental care in San Pawl il-Baħar.
            </p>
          </motion.div>

          {/* Interactive Location Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveClinic('sliema')}
              className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none flex items-center gap-2 ${
                activeClinic === 'sliema'
                  ? 'bg-[#004A9C] text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Sliema (Hospital Flagship)</span>
            </button>
            <button
              onClick={() => setActiveClinic('burmarrad')}
              className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none flex items-center gap-2 ${
                activeClinic === 'burmarrad'
                  ? 'bg-[#004A9C] text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>San Pawl il-Baħar (Clinic)</span>
            </button>
          </div>

          {/* Location Details Card */}
          {clinicLocations
            .filter((c) => c.id === activeClinic)
            .map((clinic) => (
              <motion.div
                key={clinic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-5xl mx-auto rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200/60 font-heading">
                    {clinic.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4 tracking-tight font-heading">
                    {clinic.name}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-slate-700 text-sm">
                      <MapPin className="w-5 h-5 text-[#004A9C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Address</div>
                        <div>{clinic.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-slate-700 text-sm">
                      <Phone className="w-5 h-5 text-[#27CFC3] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Direct Telephone</div>
                        <div className="text-base font-extrabold text-[#004A9C]">{clinic.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-slate-700 text-sm">
                      <Clock className="w-5 h-5 text-[#004A9C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">Working Hours</div>
                        {clinic.hours.map((h, i) => (
                          <div key={i} className="text-xs text-slate-600">
                            {h.days}: <strong className="text-slate-900">{h.time}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => openWhatsAppBooking({
                        clinic: clinic.id === 'sliema' ? 'Sliema' : 'San Pawl il-Baħar'
                      })}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border-none shadow-md shadow-emerald-500/25"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                      <span>Agendar en esta Sede</span>
                    </button>
                    <a
                      href={`tel:+${clinic.phoneClean}`}
                      className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none no-underline flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Llamar al Hospital</span>
                    </a>
                  </div>
                </div>

                {/* Clinic Image & Facilities */}
                <div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] border-2 border-slate-200 shadow-md mb-6">
                    <img
                      src={getAssetUrl(clinic.image)}
                      alt={clinic.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Facility Specifications:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      {clinic.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

        </div>
      </section>

      {/* 10. PATIENT TESTIMONIALS (VERIFIED GOOGLE REVIEWS) */}
      <section className="py-24 md:py-32 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Voices of Trust & Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
              Patient Experiences at DiU
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl relative"
            >
              <div className="flex items-center gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500" />
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2 font-heading">5.0 Star Patient Verification</span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-8 font-body">
                “{testimonialsData[activeTestimonial].text}”
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
                <div>
                  <div className="font-extrabold text-slate-950 text-base font-heading">
                    {testimonialsData[activeTestimonial].author}
                  </div>
                  <div className="text-xs text-slate-500 font-medium font-body">
                    {testimonialsData[activeTestimonial].treatment} • {testimonialsData[activeTestimonial].clinic}
                  </div>
                </div>

                {/* Dot Switcher */}
                <div className="flex items-center gap-2">
                  {testimonialsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Show review ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all cursor-pointer border-none ${
                        activeTestimonial === idx ? 'w-8 bg-[#004A9C]' : 'w-2.5 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 11. QUESTIONS WE GET OFTEN (INTERACTIVE FAQ ACCORDION) */}
      <section id="faqs" className="py-24 md:py-32 bg-[#F4F6F9] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#004A9C] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Transparent Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 font-body">
              Everything you need to know about treatments, sedation safety, and booking.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqsData.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left font-bold text-slate-900 text-base sm:text-lg flex justify-between items-center gap-4 cursor-pointer bg-transparent border-none"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. HIGH-CONVERSION CONSULTATION DESK & BOOKING FORM */}
      <section id="booking" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto rounded-3xl bg-slate-950 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#27CFC3]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#004A9C]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#27CFC3] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Direct Clinical Consultation Desk</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 font-heading">
                  Ready to Restore Your Smile in One Visit?
                </h2>

                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  Book an evaluation with our specialist surgical and implantology team at St. James Hospital. Prefer an instant WhatsApp chat? Click below to launch real-time intake.
                </p>

                {/* Big WhatsApp CTA in desk */}
                <button
                  onClick={() => openWhatsAppBooking()}
                  className="w-full sm:w-auto mb-8 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:scale-105 cursor-pointer border-none"
                >
                  <WhatsAppIcon className="w-5 h-5 text-slate-950" />
                  <span>Abrir Agendamiento en WhatsApp</span>
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Phone className="w-5 h-5 text-[#27CFC3]" />
                    <span>Sliema Hospital: <strong className="text-white">(+356) 2329 1029</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Phone className="w-5 h-5 text-[#27CFC3]" />
                    <span>San Pawl il-Baħar: <strong className="text-white">(+356) 2329 3710</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Mail className="w-5 h-5 text-[#27CFC3]" />
                    <span>info@dentalunitmalta.com</span>
                  </div>
                </div>
              </div>

              {/* Consultation Booking Form (Web option) */}
              <div className="lg:col-span-6 bg-white p-8 rounded-3xl text-slate-900 shadow-xl">
                <div className="text-xl font-bold text-slate-950 mb-1">Schedule Consultation Callback</div>
                <div className="text-xs text-slate-500 mb-6">Fill in your information for hospital telephone confirmation.</div>

                {leadSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="text-base font-bold text-emerald-950">Appointment Request Received</div>
                    <div className="text-xs text-emerald-700 mt-1">Our hospital coordinator will call you to confirm your date and time.</div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Borg"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27CFC3]"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27CFC3]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Clinic Location</label>
                        <select
                          value={leadForm.clinic}
                          onChange={(e) => setLeadForm({ ...leadForm, clinic: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:outline-none"
                        >
                          <option value="Sliema">Sliema (Hospital)</option>
                          <option value="San Pawl">San Pawl il-Baħar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Interest</label>
                        <select
                          value={leadForm.service}
                          onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-semibold focus:outline-none"
                        >
                          <option value="Implants">Dental Implants / All-on-4</option>
                          <option value="CEREC">Same-Day CEREC Crown</option>
                          <option value="Sedation">IV Sedation Protocol</option>
                          <option value="Surgery">Oral & Wisdom Surgery</option>
                          <option value="DSD">Smile Makeover / DSD</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#27CFC3] hover:bg-[#20b5aa] text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-teal-500/25 hover:scale-[1.02] cursor-pointer border-none mt-2"
                    >
                      Confirm Free Consultation
                    </button>
                  </form>
                )}
              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <FullLogo className="h-8 w-auto brightness-0 invert" />
            <span className="text-slate-500">| St. James Hospital Dental Network</span>
          </div>
          <div className="text-center md:text-right">
            <div>© 2026 Dental & Implantology Unit (DiU) Malta. All rights reserved.</div>
            <div className="text-slate-600 mt-1">George Borg Olivier St, Sliema • Triq Il-Wardija, San Pawl il-Baħar</div>
          </div>
        </div>
      </footer>

      {/* 14. FLOATING QUICK CONVERSION BAR (Visible after scroll) */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40 bg-slate-950/95 backdrop-blur-md p-2 rounded-full border border-slate-800 shadow-2xl flex items-center justify-between gap-2 sm:gap-3 text-white"
          >
            <button
              onClick={() => scrollToSection('clinics')}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-[#27CFC3] bg-transparent border-none cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(+356) 2329 1029</span>
            </button>

            <button
              onClick={() => openWhatsAppBooking()}
              className="px-4 sm:px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border-none flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              <WhatsAppIcon className="w-4 h-4 text-slate-950" />
              <span>Agendar en WhatsApp</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 15. INTERACTIVE SERVICE DETAIL MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer border-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-extrabold text-slate-400 mb-2">[ {selectedService.num} ]</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3 font-heading">{selectedService.title}</h3>
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 bg-slate-100"
                style={{ color: selectedService.accentColor }}
              >
                {selectedService.tagline}
              </div>

              <p className="text-slate-700 text-base leading-relaxed mb-6">
                {selectedService.desc}
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 mb-8">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Clinical Highlights:</div>
                <ul className="space-y-2">
                  {selectedService.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer border-none hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const svcName = selectedService.title;
                    setSelectedService(null);
                    openWhatsAppBooking({ treatment: svcName });
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer border-none shadow-md hover:bg-[#20ba59]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                  <span>Consultar en WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 16. REVOLUTIONARY REAL-TIME WHATSAPP BOOKING MODAL WITH LIVE SMARTPHONE PREVIEW */}
      <AnimatePresence>
        {whatsappModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0B1017] text-white rounded-[32px] border border-white/15 w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setWhatsappModalOpen(false)}
                className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer border-none transition-colors z-30"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 pr-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#25D366] text-[11px] font-black uppercase tracking-wider mb-2">
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Agendamiento Inteligente • St. James Hospital</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-editorial tracking-tight text-white">
                  Solicita tu Cita Directa por WhatsApp
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Completa tus datos y mira en tiempo real a la derecha cómo se redactará tu mensaje oficial.
                </p>
              </div>

              {/* 2-Column Responsive Layout: Intake Form (Left) + Phone WhatsApp Mockup (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: Intake Form */}
                <div className="lg:col-span-6 space-y-5">
                  
                  {/* Full Name Input */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      <User className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Nombre Completo *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Carlos Mendoza o Sarah Borg"
                      value={bookingForm.name}
                      onChange={(e) => {
                        setBookingForm({ ...bookingForm, name: e.target.value });
                        if (formValidationWarning) setFormValidationWarning(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-colors ${
                        formValidationWarning && !bookingForm.name.trim() ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10'
                      }`}
                    />
                  </div>

                  {/* WhatsApp Phone Number */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Teléfono con WhatsApp *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. +356 9912 3456 o +34 612 345 678"
                      value={bookingForm.phone}
                      onChange={(e) => {
                        setBookingForm({ ...bookingForm, phone: e.target.value });
                        if (formValidationWarning) setFormValidationWarning(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-colors ${
                        formValidationWarning && !bookingForm.phone.trim() ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10'
                      }`}
                    />
                  </div>

                  {/* Sede Hospital Preference */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      <Building2 className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Sede de Atención St. James</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, clinic: 'Sliema' })}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          bookingForm.clinic === 'Sliema'
                            ? 'bg-[#004A9C]/30 border-[#27CFC3] text-white shadow-md'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>Sliema Flagship</span>
                          {bookingForm.clinic === 'Sliema' && <CheckCircle2 className="w-4 h-4 text-[#27CFC3]" />}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">St. James Hospital Quirúrgico</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, clinic: 'San Pawl il-Baħar' })}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          bookingForm.clinic === 'San Pawl il-Baħar'
                            ? 'bg-[#004A9C]/30 border-[#27CFC3] text-white shadow-md'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>San Pawl il-Baħar</span>
                          {bookingForm.clinic === 'San Pawl il-Baħar' && <CheckCircle2 className="w-4 h-4 text-[#27CFC3]" />}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">St. James Medical Centre Norte</div>
                      </button>
                    </div>
                  </div>

                  {/* Treatment of Interest */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      <Smile className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Tratamiento de Interés</span>
                    </label>
                    <select
                      value={bookingForm.treatment}
                      onChange={(e) => setBookingForm({ ...bookingForm, treatment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    >
                      {treatmentOptions.map((opt, i) => (
                        <option key={i} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Time / Urgency */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Preferencia de Horario o Urgencia</span>
                    </label>
                    <select
                      value={bookingForm.urgency}
                      onChange={(e) => setBookingForm({ ...bookingForm, urgency: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    >
                      <option value="Urgencia Inmediata (Hoy / 24 Horas)">🚨 Urgencia Inmediata (Hoy / 24 Horas)</option>
                      <option value="Esta semana (Lunes a Viernes)">📅 Esta semana (Lunes a Viernes)</option>
                      <option value="Próxima semana">🗓️ Próxima semana</option>
                      <option value="Mañana (09:00 - 13:00)">☀️ Horario Mañana (09:00 - 13:00)</option>
                      <option value="Tarde (14:00 - 18:00)">🌤️ Horario Tarde (14:00 - 18:00)</option>
                      <option value="Solo deseo información de precios">💬 Solo deseo información previa de costos</option>
                    </select>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#27CFC3]" />
                      <span>Detalles adicionales (Opcional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Tengo fobia dental, busco sedación consciente / pieza rota / reemplazo de prótesis..."
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                  </div>

                  {/* Warning Notice if fields are missing */}
                  {formValidationWarning && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <span className="font-bold">⚠️ Atención:</span>
                      <span>Por favor ingresa tu nombre y teléfono para preparar tu solicitud.</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleSendWhatsApp}
                      className="w-full flex-1 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:scale-[1.02] cursor-pointer border-none flex items-center justify-center gap-2.5"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-slate-950" />
                      <span>Enviar a WhatsApp Oficial</span>
                    </button>

                    <button
                      onClick={handleCopyWhatsAppMessage}
                      className="w-full sm:w-auto px-4 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/15 flex items-center justify-center gap-1.5 shrink-0"
                    >
                      {copySuccess ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                      <span>{copySuccess ? "Copiado!" : "Copiar"}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#27CFC3]" />
                    <span>Conexión directa con la central de admisión de St. James Hospital Malta.</span>
                  </div>

                </div>

                {/* RIGHT COLUMN: Realistic WhatsApp Smartphone Mockup */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  
                  <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[44px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border-4 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative select-none">
                    
                    {/* Phone Outer Screen Bezel */}
                    <div className="w-full rounded-[34px] overflow-hidden bg-[#0B141A] flex flex-col border border-white/10 relative">
                      
                      {/* Dynamic Island / Speaker Notch */}
                      <div className="bg-[#1F2C34] pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-300">
                        <span>09:41</span>
                        <div className="w-20 h-4 bg-black rounded-full mx-auto" />
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px]">5G</span>
                          <span className="w-4 h-2 rounded-sm border border-white/60 inline-block p-0.5"><span className="w-full h-full bg-white block rounded-2xs" /></span>
                        </div>
                      </div>

                      {/* WhatsApp Chat Header */}
                      <div className="bg-[#1F2C34] px-3 py-2.5 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="text-white/80 text-xs font-bold cursor-default">&larr;</div>
                          <div className="w-8 h-8 rounded-full bg-[#004A9C] flex items-center justify-center text-white relative shadow-inner">
                            <LogoMark className="w-4 h-4" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border border-[#1F2C34]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1">
                              <span>DiU Clinic Malta</span>
                              <CheckCircle2 className="w-3 h-3 text-[#27CFC3]" />
                            </div>
                            <div className="text-[10px] text-emerald-400 flex items-center gap-1 leading-tight">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>en línea</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 text-white/70">
                          <Phone className="w-3.5 h-3.5" />
                          <Smartphone className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* WhatsApp Chat Canvas */}
                      <div className="p-3 flex flex-col gap-3 min-h-[360px] max-h-[380px] overflow-y-auto bg-[#0B141A] relative font-sans text-xs">
                        
                        {/* Background Wallpaper Pattern Overlay */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#27CFC3_1px,transparent_1px)] [background-size:16px_16px]" />

                        {/* Encrypted Pill Badge */}
                        <div className="mx-auto my-1 px-3 py-1 rounded-lg bg-[#182229] border border-white/5 text-[9px] text-[#8696A0] text-center max-w-[90%] flex items-center gap-1 justify-center">
                          <ShieldCheck className="w-3 h-3 text-amber-400/80 shrink-0" />
                          <span>Mensajes protegidos con cifrado de extremo a extremo.</span>
                        </div>

                        {/* Date Chip */}
                        <div className="mx-auto px-2.5 py-0.5 rounded-md bg-[#182229] text-[10px] font-semibold text-[#8696A0]">
                          HOY
                        </div>

                        {/* Real-time Outgoing User Chat Bubble */}
                        <div className="self-end max-w-[90%] bg-[#005C4B] text-white p-3 rounded-2xl rounded-tr-none shadow-md relative border border-emerald-400/20">
                          
                          {/* Bubble Corner Tail */}
                          <div className="absolute top-0 -right-1.5 w-2 h-2 bg-[#005C4B]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }} />

                          <div className="font-bold text-[11px] text-emerald-200 border-b border-emerald-400/20 pb-1 mb-2">
                            👋 SOLICITUD DE AGENDAMIENTO
                          </div>

                          <div className="space-y-1 text-[11px] leading-snug">
                            <div>
                              <span className="text-emerald-200">👤 Paciente: </span>
                              <strong className="text-white">{bookingForm.name.trim() || "[Tu Nombre]"}</strong>
                            </div>
                            <div>
                              <span className="text-emerald-200">📱 WhatsApp: </span>
                              <span className="text-white">{bookingForm.phone.trim() || "[Tu Teléfono]"}</span>
                            </div>
                            <div>
                              <span className="text-emerald-200">🏛️ Sede: </span>
                              <span className="text-white font-medium">
                                {bookingForm.clinic === 'Sliema' ? 'Sliema (Hospital)' : 'San Pawl il-Baħar'}
                              </span>
                            </div>
                            <div>
                              <span className="text-emerald-200">🦷 Interés: </span>
                              <span className="text-white">{bookingForm.treatment}</span>
                            </div>
                            <div>
                              <span className="text-emerald-200">⏰ Horario: </span>
                              <span className="text-white">{bookingForm.urgency}</span>
                            </div>
                            {bookingForm.notes.trim() && (
                              <div className="mt-1 pt-1 border-t border-emerald-400/20 text-emerald-100 italic">
                                📝 {bookingForm.notes.trim()}
                              </div>
                            )}
                          </div>

                          <div className="mt-2 text-[9px] text-emerald-200/80 flex items-center justify-end gap-1">
                            <span>10:45 AM</span>
                            <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                          </div>
                        </div>

                      </div>

                      {/* WhatsApp Bottom Fake Input Field */}
                      <div className="bg-[#1F2C34] p-2 flex items-center gap-2 border-t border-white/5">
                        <div className="flex-1 bg-[#2A3942] rounded-full px-3 py-1.5 text-[11px] text-[#8696A0] flex items-center justify-between">
                          <span>Escribe un mensaje...</span>
                          <span className="text-white/50">📎</span>
                        </div>
                        <div 
                          onClick={handleSendWhatsApp}
                          className="w-8 h-8 rounded-full bg-[#00A884] hover:bg-[#008f70] text-slate-950 flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-110"
                        >
                          <Send className="w-3.5 h-3.5 text-slate-950" />
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Vista previa interactiva en tiempo real</span>
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Al presionar enviar, WhatsApp se abrirá con este mensaje formateado.
                    </p>
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
