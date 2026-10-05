import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  X, 
  ArrowUp, 
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
  ShieldCheck, 
  Building2, 
  Smile, 
  Cpu,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MoveRight,
  Activity,
  Layers,
  Award
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

const FullLogo = ({ className = "h-9 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 128 51" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M45.328 48.8262V12.2065H57.6901C62.7123 12.2065 66.7042 12.9775 69.5372 14.3909C72.499 15.9327 74.8169 18.1171 76.491 20.9439C78.165 23.7706 79.0664 26.9829 79.0664 30.4521C79.0664 32.8934 78.5513 35.2062 77.6499 37.519C76.7485 39.7034 75.332 41.7592 73.658 43.4296C71.8551 45.2284 69.7948 46.5133 67.4769 47.4128C66.0604 47.9267 64.7726 48.3122 63.6137 48.4407C62.4547 48.8262 60.2656 48.8262 57.0463 48.8262H45.328ZM57.1751 16.9607H50.6076V44.2005H57.3038C59.8793 44.2005 61.9396 44.072 63.4849 43.6866C64.9014 43.3011 66.1891 42.9156 67.0905 42.2732C68.1207 41.7592 68.8934 40.9883 69.7948 40.2173C72.3702 37.6475 73.658 34.3068 73.658 30.1951C73.658 26.2119 72.3702 22.9997 69.666 20.5584C68.6358 19.659 67.6056 18.888 66.3179 18.2456C65.0302 17.6031 63.8712 17.2176 62.7123 17.0892C61.5533 16.9607 59.7505 16.9607 57.1751 16.9607Z" fill="#004A9C"/>
      <path d="M84.7324 19.9159H90.0121V48.9546H84.7324V19.9159Z" fill="#004A9C"/>
      <path d="M122.72 12.2065H128V33.0219C128 35.8487 127.742 38.033 127.356 39.4464C126.97 40.8598 126.455 42.0162 125.811 43.0441C125.167 43.9435 124.523 44.843 123.622 45.6139C120.66 48.0552 116.926 49.3401 112.161 49.3401C107.396 49.3401 103.533 48.0552 100.571 45.6139C99.67 44.843 98.8974 43.9435 98.3823 43.0441C97.7385 42.1447 97.2234 40.8598 96.837 39.5749C96.4507 38.1615 96.1932 35.9772 96.1932 33.0219V12.2065H101.473V33.0219C101.473 36.4911 101.859 38.9324 102.632 40.2173C103.404 41.5022 104.563 42.6586 106.237 43.4296C107.911 44.2005 109.714 44.7145 111.903 44.7145C114.994 44.7145 117.569 43.9435 119.501 42.2732C120.531 41.3737 121.304 40.3458 121.69 39.1894C122.205 38.033 122.334 35.9772 122.334 33.0219V12.2065H122.72Z" fill="#004A9C"/>
      <path d="M90.012 12.2065H84.7324V17.0892H90.012V12.2065Z" fill="#27CFC3"/>
      <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#27CFC3"/>
      <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#27CFC3"/>
      <path d="M0 10.0222L8.75654 0L33.4809 10.0222L27.5573 50.882L0 10.0222Z" fill="#004A9C"/>
    </g>
  </svg>
);

// Services / Treatments Data (Luxury Westside Dental Style)
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

// Clinic Locations Data
const clinicLocations = [
  {
    id: 'sliema',
    name: 'St. James Hospital (Sliema)',
    tag: 'Flagship Hospital Suite',
    address: 'George Borg Olivier Street, Sliema SLM 1807, Malta',
    phone: '(+356) 2329 1029',
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
    phone: '(+356)-2329-3710',
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
    a: "Initial consultations can be requested directly through our fast callback form below or by calling (+356) 2329 1029 (Sliema) or (+356)-2329-3710 (San Pawl). Our clinical coordinators will schedule an evaluation with a specialist within 24–48 hours."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [activeClinic, setActiveClinic] = useState<'sliema' | 'burmarrad'>('sliema');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // For Before/After slider
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', clinic: 'Sliema', service: 'Implants' });

  const videoRef = useRef<HTMLVideoElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Framer Motion Scroll transforms for Hero expansion
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });

  const heroVideoScale = useTransform(heroProgress, [0, 0.8], [1, 1.18]);
  const heroVideoBorderRadius = useTransform(heroProgress, [0, 0.8], [28, 8]);
  const heroVideoY = useTransform(heroProgress, [0, 0.8], [0, 40]);

  // Handle Video Autoplay & Loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Browser autoplay policy might require muted
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

  // Horizontal Scroll Handler for Services (Arrows)
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

  // Show floating bar only after scrolling past hero
  useEffect(() => {
    const onScroll = () => {
      setShowBottomBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#27CFC3] selection:text-slate-950 overflow-x-hidden">

      {/* 1. TOP ANNOUNCEMENT BAR (Real Hospital Coordinates) */}
      <div className="bg-[#004A9C] text-white text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#27CFC3] animate-pulse" />
            <span className="font-medium tracking-wide">
              St. James Hospital Network • Sliema & San Pawl il-Baħar Clinics, Malta
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:flex items-center gap-1.5 text-blue-100">
              <Clock className="w-3.5 h-3.5 text-[#27CFC3]" />
              Mon–Thu 09:00–18:00 | Fri 09:00–13:00
            </span>
            <button 
              onClick={() => scrollToSection('clinics')}
              className="flex items-center gap-1.5 font-bold text-[#27CFC3] hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(+356) 2329 1029</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FLOATING LUXURY NAVBAR (Westside Dental Inspired) */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <FullLogo className="h-9 sm:h-10 w-auto group-hover:scale-[1.02] transition-transform duration-300" />
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-slate-700 tracking-wide uppercase">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#004A9C] transition-colors bg-transparent border-none cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollToSection('video-tour')} className="hover:text-[#004A9C] transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1">
              <span>4K Tour</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#27CFC3]" />
            </button>
            <button onClick={() => scrollToSection('services-section')} className="hover:text-[#004A9C] transition-colors bg-transparent border-none cursor-pointer">
              Services [01–06]
            </button>
            <button onClick={() => scrollToSection('smile-results')} className="hover:text-[#004A9C] transition-colors bg-transparent border-none cursor-pointer">
              Transformations
            </button>
            <button onClick={() => scrollToSection('clinics')} className="hover:text-[#004A9C] transition-colors bg-transparent border-none cursor-pointer">
              The 2 Clinics
            </button>
            <button onClick={() => scrollToSection('faqs')} className="hover:text-[#004A9C] transition-colors bg-transparent border-none cursor-pointer">
              FAQ
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('booking')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#27CFC3] hover:bg-[#20b5aa] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-teal-500/20 hover:scale-105 cursor-pointer border-none"
            >
              <span>Get Appointment</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors bg-transparent border-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : (
                <div className="flex flex-col gap-1.5 w-6">
                  <span className="h-0.5 w-full bg-slate-800 rounded" />
                  <span className="h-0.5 w-4/5 bg-slate-800 rounded" />
                  <span className="h-0.5 w-full bg-slate-800 rounded" />
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
              className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 flex flex-col gap-4 text-sm font-semibold text-slate-800"
            >
              <button onClick={() => scrollToSection('hero')} className="text-left py-2 border-b border-slate-100 bg-transparent border-none">Overview</button>
              <button onClick={() => scrollToSection('video-tour')} className="text-left py-2 border-b border-slate-100 bg-transparent border-none">4K Virtual Tour</button>
              <button onClick={() => scrollToSection('services-section')} className="text-left py-2 border-b border-slate-100 bg-transparent border-none">Services & Treatments</button>
              <button onClick={() => scrollToSection('smile-results')} className="text-left py-2 border-b border-slate-100 bg-transparent border-none">Smile Makeover Results</button>
              <button onClick={() => scrollToSection('clinics')} className="text-left py-2 border-b border-slate-100 bg-transparent border-none">The 2 Hospital Clinics</button>
              <button onClick={() => scrollToSection('faqs')} className="text-left py-2 border-b border-slate-100 bg-transparent border-none">Questions & Answers</button>
              <button
                onClick={() => scrollToSection('booking')}
                className="w-full mt-2 py-3 rounded-full bg-[#27CFC3] text-slate-950 font-bold text-center text-xs uppercase tracking-wider border-none cursor-pointer"
              >
                Book Free Consultation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION (High-Impact First Impression: 4K Video Instantly Visible Above the Fold) */}
      <section id="hero" ref={heroSectionRef} className="relative pt-6 pb-20 md:pt-10 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 2-Column Split Hero (Video and Value Proposition Side-by-Side) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            
            {/* Left Column: Bold Editorial Copy & Rapid Action */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>EST. 1999 • ST. JAMES HOSPITAL</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 (200+ Reviews)</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-5">
                Step Inside Malta’s Leading <br />
                <span className="text-[#004A9C]">Dental & Implantology</span> Hospital.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
                Founded by <strong className="font-semibold text-slate-900">Dr. Mark & Susanna Diacono</strong>. Same-day CEREC 3D ceramics, precision bone reconstruction, and 100% anxiety-free certified IV sedation inside St. James Hospital.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                  onClick={() => scrollToSection('booking')}
                  className="px-7 py-3.5 rounded-full bg-[#27CFC3] hover:bg-[#20b5aa] text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-teal-500/20 hover:scale-105 cursor-pointer border-none flex items-center gap-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('clinics')}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#004A9C] font-bold text-xs uppercase tracking-wider border-2 border-[#004A9C]/20 hover:border-[#004A9C] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-[#004A9C]" />
                  <span>2 Hospital Clinics</span>
                </button>
              </div>

              {/* Instant Callback Mini-Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Rapid Callback Guarantee</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Within 10 Minutes
                  </span>
                </div>
                {leadSubmitted ? (
                  <div className="text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl text-center">
                    ✓ Request logged! A senior clinical coordinator is calling you.
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="Your phone (+356...)"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#27CFC3]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#004A9C] text-white font-bold text-xs whitespace-nowrap cursor-pointer border-none hover:bg-[#003875] transition-colors"
                    >
                      Call Me
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Right Column: THE 4K SHOWSTOPPER VIDEO (Direct First Impression) */}
            <div className="lg:col-span-6">
              <motion.div 
                style={{
                  scale: heroVideoScale,
                  borderRadius: heroVideoBorderRadius,
                  y: heroVideoY
                }}
                className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-slate-900/15 bg-slate-950 aspect-[4/3] sm:aspect-video group"
              >
                {/* 4K Enhanced Native Video */}
                <video
                  ref={videoRef}
                  src={getAssetUrl('video_hero_4k.mp4')}
                  poster={getAssetUrl('hero_poster_4k.jpg')}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Live Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
                  <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-2 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    4K Virtual Walkthrough
                  </span>
                  <span className="hidden sm:flex px-3 py-1.5 rounded-full bg-[#004A9C]/80 backdrop-blur-md text-white text-[11px] font-medium items-center gap-1.5 border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-[#27CFC3]" />
                    St. James Hospital, Sliema
                  </span>
                </div>

                {/* Video Play/Pause Overlay */}
                <button
                  onClick={toggleVideoPlayback}
                  aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer border-none z-10"
                >
                  {isVideoPlaying ? <Pause className="w-4 h-4 text-slate-900" /> : <Play className="w-4 h-4 fill-slate-900 text-slate-900 ml-0.5" />}
                </button>

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 text-white text-[11px] font-medium pointer-events-none z-10">
                  <span>Entrance ➔ Reception ➔ Sterilization Suite</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Quick Key Trust Anchors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/60 text-center">
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
              <div className="text-base font-extrabold text-[#004A9C]">100% In-House</div>
              <div className="text-[11px] text-slate-500">CEREC 3D Milling Lab</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
              <div className="text-base font-extrabold text-[#004A9C]">Zero Anxiety</div>
              <div className="text-[11px] text-slate-500">Certified IV Sedation</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
              <div className="text-base font-extrabold text-[#004A9C]">3D CBCT</div>
              <div className="text-[11px] text-slate-500">Sub-mm Bone Scans</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80">
              <div className="text-base font-extrabold text-[#004A9C]">Same Day</div>
              <div className="text-[11px] text-slate-500">All-on-4 Fixed Teeth</div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ANIMATED TRUST METRICS & SURGICAL CREDENTIALS (Westside Style) */}
      <section className="py-20 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#004A9C] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4" />
              <span>Redefining Dental Excellence Since 1999</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Hospital Precision & Proven Results
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4">
              We never cut corners on materials, sterilization protocols, or patient comfort.
            </p>
          </div>

          {/* 4 Large Bento Counter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 hover:border-[#27CFC3] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="text-xs font-bold text-slate-400 tracking-wider mb-4">[ 01 ]</div>
              <div className="text-5xl sm:text-6xl font-extrabold text-[#004A9C] tracking-tight mb-2 group-hover:text-[#27CFC3] transition-colors">
                27+
              </div>
              <div className="text-lg font-bold text-slate-900 mb-2">Years Established</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Founding dental surgery and restorative team operating inside St. James Hospital since 1999.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 hover:border-[#27CFC3] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="text-xs font-bold text-slate-400 tracking-wider mb-4">[ 02 ]</div>
              <div className="text-5xl sm:text-6xl font-extrabold text-[#004A9C] tracking-tight mb-2 group-hover:text-[#27CFC3] transition-colors">
                10k+
              </div>
              <div className="text-lg font-bold text-slate-900 mb-2">Smiles Restored</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over ten thousand dental implants, full-arch restorations, and CEREC ceramics successfully completed.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 hover:border-[#27CFC3] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="text-xs font-bold text-slate-400 tracking-wider mb-4">[ 03 ]</div>
              <div className="text-5xl sm:text-6xl font-extrabold text-[#004A9C] tracking-tight mb-2 group-hover:text-[#27CFC3] transition-colors">
                98%
              </div>
              <div className="text-lg font-bold text-slate-900 mb-2">Anxiety-Free Rating</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patients report zero discomfort or fear under our consultant-administered IV sedation protocols.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-200/80 hover:border-[#27CFC3] transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="text-xs font-bold text-slate-400 tracking-wider mb-4">[ 04 ]</div>
              <div className="text-5xl sm:text-6xl font-extrabold text-[#004A9C] tracking-tight mb-2 group-hover:text-[#27CFC3] transition-colors">
                07m
              </div>
              <div className="text-lg font-bold text-slate-900 mb-2">Average Wait Time</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Digital patient intake and dedicated treatment chairs guarantee virtually zero waiting time.
              </p>
            </div>

          </div>

          {/* Clinical Quote from Mark & Susanna Diacono */}
          <div className="mt-14 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
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
          </div>

        </div>
      </section>

      {/* 5. HORIZONTAL SCROLL SERVICES CAROUSEL (Westside Style: service_sticky-trigger) */}
      <section id="services-section" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Advanced Clinical Specialties [ 01 – 06 ]</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
                Comprehensive Care For <span className="text-[#004A9C]">Every Patient</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-2xl">
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
          </div>

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
                  <span className="text-sm font-extrabold text-slate-400 tracking-wider">
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
                <h3 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tight">
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

              {/* Action Trigger Button */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  View Full Clinical Details
                </span>
                <div 
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-900 group-hover:scale-110 transition-transform"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. INTERACTIVE BEFORE & AFTER SMILE TRANSFORMATION SLIDER (Puresmile / 3D Experience) */}
      <section id="smile-results" className="py-24 md:py-32 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Smile className="w-4 h-4 text-teal-600" />
              <span>Real Clinical Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Interactive Smile Transformation
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Drag the central divider to inspect the restorative precision achieved with CEREC and dental implants.
            </p>
          </div>

          {/* Interactive Split Drag Container */}
          <div className="max-w-4xl mx-auto">
            <div
              ref={sliderContainerRef}
              onMouseMove={(e) => handleSliderMove(e.clientX)}
              onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
              className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border-4 border-white shadow-2xl shadow-slate-900/10 cursor-ew-resize select-none bg-slate-100"
            >
              {/* After Image (Full Background) */}
              <img
                src={getAssetUrl('results_preview.png')}
                alt="After full-arch dental smile restoration"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before Image (Clipped Left Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={getAssetUrl('sliema_clinic.png')}
                  alt="Pre-treatment evaluation"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : '100%' }}
                />
                <div className="absolute inset-0 bg-slate-950/20" />
              </div>

              {/* Central Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-[#27CFC3] text-slate-950 flex items-center justify-center shadow-xl border-2 border-white text-xs font-bold">
                  ⇄
                </div>
              </div>

              {/* Floating Labels */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                Before: Failing Dentition
              </div>
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#004A9C]/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                After: Full Arch All-on-4
              </div>

              {/* Bottom Instruction */}
              <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none z-10">
                <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                  Drag left & right to inspect restoration
                </span>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#eff5fc] border border-blue-100">
              <div className="text-sm text-slate-800">
                <strong className="text-[#004A9C]">Want to preview your future smile before starting?</strong> Our Digital Smile Design suite creates a 3D physical mock-up you can test in your mouth.
              </div>
              <button
                onClick={() => scrollToSection('booking')}
                className="px-6 py-3 rounded-full bg-[#004A9C] text-white font-bold text-xs uppercase tracking-wider shrink-0 hover:bg-[#003875] transition-all cursor-pointer border-none"
              >
                Book DSD Smile Simulation
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. THE 2 CLINICS: DUAL HOSPITAL LOCATIONS & SCHEDULES */}
      <section id="clinics" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#004A9C] text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-4 h-4" />
              <span>Two Convenient Clinical Centres</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              St. James Hospital Network in Malta
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Operating sterile surgical suites in Sliema and specialized diagnostic dental care in San Pawl il-Baħar.
            </p>
          </div>

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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200/60">
                    {clinic.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4 tracking-tight">
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
                      onClick={() => scrollToSection('booking')}
                      className="px-6 py-3.5 rounded-full bg-[#27CFC3] hover:bg-[#20b5aa] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border-none shadow-md"
                    >
                      Book At This Clinic
                    </button>
                    <button
                      onClick={() => alert(`For directions to ${clinic.name}, call our reception directly at ${clinic.phone}`)}
                      className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none"
                    >
                      View Directions & Parking
                    </button>
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

      {/* 8. PATIENT TESTIMONIALS (Verified Google Reviews Social Proof) */}
      <section className="py-24 md:py-32 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Voices of Trust & Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Patient Experiences at DiU
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#f8fafc] p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-lg relative">
              <div className="flex items-center gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500" />
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2">5.0 Star Patient Verification</span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-900 leading-relaxed mb-8">
                “{testimonialsData[activeTestimonial].text}”
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200/80">
                <div>
                  <div className="font-extrabold text-slate-950 text-base">
                    {testimonialsData[activeTestimonial].author}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
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
            </div>
          </div>

        </div>
      </section>

      {/* 9. QUESTIONS WE GET OFTEN (Interactive FAQ Accordion) */}
      <section id="faqs" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#004A9C] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Transparent Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Everything you need to know about treatments, sedation safety, and booking.
            </p>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
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
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. HIGH-CONVERSION CONSULTATION DESK & BOOKING FORM */}
      <section id="booking" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#27CFC3]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#004A9C]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#27CFC3] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Direct Clinical Consultation Desk</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                  Ready to Restore Your Smile in One Visit?
                </h2>

                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  Book an evaluation with our specialist surgical and implantology team at St. James Hospital. No referral needed.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Phone className="w-5 h-5 text-[#27CFC3]" />
                    <span>Sliema Hospital: <strong className="text-white">(+356) 2329 1029</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Phone className="w-5 h-5 text-[#27CFC3]" />
                    <span>San Pawl il-Baħar: <strong className="text-white">(+356)-2329-3710</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Mail className="w-5 h-5 text-[#27CFC3]" />
                    <span>info@dentalunitmalta.com</span>
                  </div>
                </div>
              </div>

              {/* Consultation Booking Form */}
              <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-xl">
                <div className="text-xl font-bold text-slate-950 mb-1">Schedule Consultation</div>
                <div className="text-xs text-slate-500 mb-6">Fill in your information for same-day coordination.</div>

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

          </div>

        </div>
      </section>

      {/* 11. FOOTER */}
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

      {/* 12. FLOATING QUICK CONVERSION BAR (Fixed Bottom - Only visible after scrolling) */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40 bg-slate-950/95 backdrop-blur-md p-2 rounded-full border border-slate-800 shadow-2xl flex items-center justify-between gap-3 text-white"
          >
            <button
              onClick={() => scrollToSection('clinics')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#27CFC3] bg-transparent border-none cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>(+356) 2329 1029</span>
            </button>

            <button
              onClick={() => scrollToSection('booking')}
              className="px-5 py-2.5 rounded-full bg-[#27CFC3] hover:bg-[#20b5aa] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border-none flex items-center gap-1.5"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 13. INTERACTIVE SERVICE DETAIL MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
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
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3">{selectedService.title}</h3>
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
                    setSelectedService(null);
                    scrollToSection('booking');
                  }}
                  className="px-6 py-3 rounded-full bg-[#27CFC3] text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer border-none shadow-md hover:bg-[#20b5aa]"
                >
                  Inquire About Procedure
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
