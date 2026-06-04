import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ArrowUp, ChevronDown, Star, Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const TOTAL_FRAMES = 300;
const ZOOM_FACTOR = 1.0;

// Miniature branding SVG tooth icon component
const LogoMark = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 34 51" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#27CFC3"/>
    <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#27CFC3"/>
    <path d="M0 10.0222L8.75654 0L33.4809 10.0222L27.5573 50.882L0 10.0222Z" fill="#004A9C"/>
  </svg>
);

// Testimonial data
const testimonials = [
  {
    name: 'Samuel R.',
    location: 'Valletta, Malta',
    rating: 5,
    text: 'After years of avoiding the dentist, DIU Malta changed everything. The IV sedation made my full implant reconstruction completely painless. I walked out with a new smile and zero anxiety.',
    treatment: 'Full Mouth Implants',
  },
  {
    name: 'Maria T.',
    location: 'Sliema, Malta',
    rating: 5,
    text: 'The Digital Smile Design process was incredible — I could see my new smile before any work started. The team was professional and caring throughout. Best dental experience I\'ve ever had.',
    treatment: 'Smile Design & Veneers',
  },
  {
    name: 'James K.',
    location: 'London, UK',
    rating: 5,
    text: 'I flew to Malta specifically for DIU\'s expertise. Same-day CAD/CAM crowns, 3D scanning — it\'s like stepping into the future of dentistry. Worth every mile of the journey.',
    treatment: 'CAD/CAM Restorations',
  },
];

// FAQ data
const faqs = [
  {
    question: 'How long does a dental implant procedure take?',
    answer: 'A single implant placement typically takes 30-60 minutes. However, the full process from consultation to final crown takes 3-6 months, allowing time for the implant to integrate with your jawbone. With our All-on-4 technique, you can leave with a full set of fixed teeth in just one day.',
  },
  {
    question: 'Is IV sedation safe? What does it feel like?',
    answer: 'IV sedation is extremely safe when administered by our on-site consultant anaesthetists. You\'ll feel deeply relaxed — most patients describe it as "a pleasant nap." You won\'t feel any pain during the procedure, and the sedative wears off quickly with minimal side effects.',
  },
  {
    question: 'What is Digital Smile Design (DSD)?',
    answer: 'DSD is our advanced cosmetic planning technology. Using high-resolution photographs, video, and 3D facial scans, we digitally design your ideal smile. Before any treatment begins, we create a physical mock-up that you can try in your mouth to preview and approve the final result.',
  },
  {
    question: 'Do you treat international patients?',
    answer: 'Absolutely! We welcome patients from across Europe and beyond. Malta is easily accessible, and we offer comprehensive treatment planning for overseas visitors, including scheduling multiple procedures into condensed visit windows.',
  },
  {
    question: 'What\'s included in a free consultation?',
    answer: 'Your first visit includes a thorough oral examination, digital X-rays, a discussion of your goals, and a detailed treatment plan with transparent pricing. For implant cases, we may include a complimentary CBCT 3D scan to assess bone density and plan your treatment with precision.',
  },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeTreatment, setActiveTreatment] = useState<string | null>(null);
  const [activeTechTab, setActiveTechTab] = useState<number>(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  const getTreatmentDescription = (treatment: string) => {
    switch (treatment) {
      case 'IMPLANTS':
        return 'We provide single tooth implants, multiple teeth replacements, bone grafting, sinus lifts, and full mouth implant reconstructions (All-on-4). Directed by experienced specialists and implantologists using 3D CBCT digital planning.';
      case 'RESTORATIVE':
        return 'Our aesthetic restorations include tooth-coloured composite fillings, high-durability porcelain veneers, and same-day CADCAM ceramic crowns, inlays, onlays, and bridges to restore functionality and a natural look.';
      case 'ORAL SURGERY':
        return 'Includes surgical extractions of impacted wisdom teeth, surgical removal of oral lesions or growths, and bone grafting procedures. Managed by senior specialists under sterile clinical environments.';
      case 'SEDATION':
        return 'Specialized unit for phobic or nervous patients. We offer intravenous (IV) sedation and general anesthesia supervised on-site by consultant anaesthetists to ensure a safe, anxiety-free experience.';
      case 'ORTHODONTICS':
        return 'Traditional fixed braces and modern clear aligners (such as Invisalign) for children and adults to correct teeth alignment, overcrowding, and bite issues with digital progress tracking.';
      case 'PREVENTIVE':
        return 'Comprehensive checkups, cancer screenings, professional hygienist cleanings, paediatric care, dental sealants, diet advice, and tooth whitening procedures to protect your dental health.';
      case 'CBCT 3D SCANNING':
        return 'Our Cone Beam 3D CT scanner provides highly detailed, three-dimensional bone maps and anatomical planning. This diagnostic technology allows our oral surgeons to accurately locate nerve paths, verify bone density, and plan dental implant placements with millimetre precision for a safer and more predictable procedure.';
      case 'SAME-DAY TEETH':
        return 'Leveraging in-house CEREC CAD/CAM technology, we take precise digital scans of your teeth to design and mill custom ceramic restorations (crowns, veneers, inlays, or onlays) directly in our laboratory in one visit. This eliminates traditional messy impressions, temporary fittings, and the need for secondary appointments.';
      case 'SMILE DESIGN':
        return 'Digital Smile Design (DSD) is a state-of-the-art cosmetic treatment planner. By analyzing photographs, digital videos, and 3D scans of your face and teeth, we design a custom smile blueprint. Before beginning any procedure, we create a physical mock-up you can test-drive in your mouth to see and feel the results.';
      case 'SAFE ANESTHESIA':
        return 'Our dedicated intravenous (IV) sedation unit is designed to provide a completely relaxed, anxiety-free experience for dental-phobic or nervous patients. Supervised directly on-site by consultant anaesthetists, IV sedation allows you to drift into a peaceful state during complex surgical or restorative treatments.';
      case 'CLINICAL MICROSCOPE':
        return 'We use high-magnification dental microscopes for micro-restorations and endodontics (root canal treatments). This level of magnification exposes minute details, narrow root canal branches, and fine fractures, ensuring maximum conservation of healthy tooth structure and excellent clinical outcomes.';
      case 'ADVANCED IMAGING':
        return 'In partnership with St. James Hospital, our clinical units have access to advanced conventional CT scanners and Magnetic Resonance Imaging (MRI) facilities. This allows us to perform exhaustive maxillofacial, TMJ (jaw-joint), and soft-tissue investigations for complex cosmetic and reconstructive cases.';
      default:
        return '';
    }
  };

  const getActiveLink = () => {
    if (scrollPercent >= 15 && scrollPercent < 35) return 'Clinics';
    if (scrollPercent >= 35 && scrollPercent < 55) return 'Technology';
    if (scrollPercent >= 55 && scrollPercent < 75) return 'Treatments';
    if (scrollPercent >= 75 && scrollPercent < 90) return 'Results';
    if (scrollPercent >= 90) return 'Contact';
    return '';
  };
  const activeLink = getActiveLink();

  // 6-section scroll segment flags
  const isS1Active = scrollPercent < 15;
  const isS2Active = scrollPercent >= 15 && scrollPercent < 35;
  const isS3Active = scrollPercent >= 35 && scrollPercent < 55;
  const isS4Active = scrollPercent >= 55 && scrollPercent < 75;
  const isS5Active = scrollPercent >= 75 && scrollPercent < 90;
  const isS6Active = scrollPercent >= 90;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollFractionRef = useRef<number>(0);

  // Updated nav links for 6 sections
  const navLinks = ['Clinics', 'Technology', 'Treatments', 'Results', 'Contact'];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 1. Preload images
  useEffect(() => {
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = String(i).padStart(3, '0');
      
      const onImageLoad = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(progress);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      const onImageError = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(progress);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onload = onImageLoad;
      img.onerror = onImageError;
      img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;
      
      tempImages.push(img);
    }
    imagesRef.current = tempImages;
  }, []);

  // 2. Draw function — FIXED: object-fit cover using Math.max for full-bleed (no black bars on mobile)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    // COVER scaling — use Math.max so image always fills the canvas completely
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight) * ZOOM_FACTOR;
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    // Center the oversized image
    const xOffset = (canvasWidth - drawWidth) / 2;
    const yOffset = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
  };

  // 3. Handle window resizing and initial scale set
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Redraw current frame
      const currentFrame = Math.min(
        Math.floor(scrollFractionRef.current * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );
      drawFrame(currentFrame);
    };

    // Apply scale 1.0 to canvas for parallax (no zoom)
    if (canvasRef.current) {
      gsap.set(canvasRef.current, { scale: 1.0 });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger initial sizing

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // 4. Scroll-to-Frame Mapping
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      const fraction = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
      scrollFractionRef.current = fraction;
      setScrollPercent(Math.round(fraction * 100));

      const frameIndex = Math.min(
        Math.floor(fraction * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial frame draw

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  // 5. Interactive Mouse Parallax (Canvas shifts in opposite direction)
  useEffect(() => {
    if (!isLoaded) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const relX = (clientX - centerX) / window.innerWidth;
      const relY = (clientY - centerY) / window.innerHeight;

      const moveX = -relX * 40;
      const moveY = -relY * 40;

      gsap.to(canvasRef.current, {
        x: moveX,
        y: moveY,
        scale: 1.0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLoaded]);

  // 6. GSAP programmatic Scroll to Top / target positions
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.8,
      ease: 'power3.inOut',
    });
  };

  const handleNavLinkClick = (link: string) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let targetPercent = 0;
    
    if (link === 'Clinics') targetPercent = 0.25;
    else if (link === 'Technology') targetPercent = 0.45;
    else if (link === 'Treatments') targetPercent = 0.65;
    else if (link === 'Results') targetPercent = 0.82;
    else if (link === 'Contact') targetPercent = 0.95;

    gsap.to(window, {
      scrollTo: maxScroll * targetPercent,
      duration: 1.6,
      ease: 'power3.inOut',
    });
    setIsMobileMenuOpen(false);
  };

  // Nav variants
  const fadeDown = {
    initial: { opacity: 0, y: -20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="w-full bg-transparent relative select-none font-sans">
      
      {/* LOADING SCREEN OVERLAY */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-semibold uppercase tracking-widest text-white"
          >
            <LogoMark className="w-10 h-14 mb-4 animate-pulse" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              className="text-xs tracking-[0.25em]"
            >
              Loading Dental Unit Malta Experience
            </motion.p>
            
            <h2 className="text-5xl md:text-7xl font-semibold mt-4 text-white">
              {loadingProgress}%
            </h2>

            {/* Premium Loader Bar */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-6">
              <motion.div 
                className="h-full bg-accent"
                style={{ width: `${loadingProgress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            
            <p className="text-[9px] tracking-widest text-white/40 mt-3">
              PRELOADING CLINIC VISUAL FRAMES
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN SCROLLYTELLING CANVAS */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
        />
        {/* Dark vignette overlay for premium readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/65 pointer-events-none" />
      </div>

      {/* FIXED NAVIGATION BAR */}
      {isLoaded && (
        <nav className="fixed top-0 left-0 right-0 w-full flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6 z-40 pointer-events-none">
          {/* Left: Logo */}
          <motion.div 
            custom={0}
            variants={fadeDown}
            initial="initial"
            animate="animate"
            className="h-10 w-auto cursor-pointer pointer-events-auto flex items-center gap-2"
            onClick={scrollToTop}
          >
            <svg viewBox="0 0 128 51" className="h-8 w-auto text-white hover:text-accent transition-colors duration-300">
              <g fill="none" fillRule="evenodd">
                <path d="M45.328 48.8262V12.2065H57.6901C62.7123 12.2065 66.7042 12.9775 69.5372 14.3909C72.499 15.9327 74.8169 18.1171 76.491 20.9439C78.165 23.7706 79.0664 26.9829 79.0664 30.4521C79.0664 32.8934 78.5513 35.2062 77.6499 37.519C76.7485 39.7034 75.332 41.7592 73.658 43.4296C71.8551 45.2284 69.7948 46.5133 67.4769 47.4128C66.0604 47.9267 64.7726 48.3122 63.6137 48.4407C62.4547 48.8262 60.2656 48.8262 57.0463 48.8262H45.328ZM57.1751 16.9607H50.6076V44.2005H57.3038C59.8793 44.2005 61.9396 44.072 63.4849 43.6866C64.9014 43.3011 66.1891 42.9156 67.0905 42.2732C68.1207 41.7592 68.8934 40.9883 69.7948 40.2173C72.3702 37.6475 73.658 34.3068 73.658 30.1951C73.658 26.2119 72.3702 22.9997 69.666 20.5584C68.6358 19.659 67.6056 18.888 66.3179 18.2456C65.0302 17.6031 63.8712 17.2176 62.7123 17.0892C61.5533 16.9607 59.7505 16.9607 57.1751 16.9607Z" fill="currentColor"/>
                <path d="M84.7324 19.9159H90.0121V48.9546H84.7324V19.9159Z" fill="currentColor"/>
                <path d="M122.72 12.2065H128V33.0219C128 35.8487 127.742 38.033 127.356 39.4464C126.97 40.8598 126.455 42.0162 125.811 43.0441C125.167 43.9435 124.523 44.843 123.622 45.6139C120.66 48.0552 116.926 49.3401 112.161 49.3401C107.396 49.3401 103.533 48.0552 100.571 45.6139C99.67 44.843 98.8974 43.9435 98.3823 43.0441C97.7385 42.1447 97.2234 40.8598 96.837 39.5749C96.4507 38.1615 96.1932 35.9772 96.1932 33.0219V12.2065H101.473V33.0219C101.473 36.4911 101.859 38.9324 102.632 40.2173C103.404 41.5022 104.563 42.6586 106.237 43.4296C107.911 44.2005 109.714 44.7145 111.903 44.7145C114.994 44.7145 117.569 43.9435 119.501 42.2732C120.531 41.3737 121.304 40.3458 121.69 39.1894C122.205 38.033 122.334 35.9772 122.334 33.0219V12.2065H122.72Z" fill="currentColor"/>
                <path d="M90.012 12.2065H84.7324V17.0892H90.012V12.2065Z" fill="#27CFC3"/>
                <path d="M19.4447 2.18433L33.4809 10.0222L24.8531 0L19.4447 2.18433Z" fill="#27CFC3"/>
                <path d="M0 10.0222L5.92354 50.882L15.1952 37.1336L0 10.0222Z" fill="#27CFC3"/>
                <path d="M0 10.0222L8.75654 0L33.4809 10.0222L27.5573 50.882L0 10.0222Z" fill="#004A9C"/>
              </g>
            </svg>
          </motion.div>

          {/* Center Links (Visible md+) */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            {navLinks.map((link, index) => (
              <motion.button
                key={link}
                onClick={() => handleNavLinkClick(link)}
                custom={index + 1}
                variants={fadeDown}
                initial="initial"
                animate="animate"
                className={`text-[13px] transition-all duration-300 font-semibold uppercase tracking-widest cursor-pointer bg-transparent border-none ${
                  activeLink === link ? 'text-accent border-b-2 border-accent pb-1' : 'text-white/80 hover:text-accent'
                }`}
              >
                {link}
              </motion.button>
            ))}
          </div>

          {/* Right: Hamburger button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(true)}
            custom={5}
            variants={fadeDown}
            initial="initial"
            animate="animate"
            aria-label="Open mobile menu"
            className="w-9 h-9 rounded-full bg-black border border-white/20 hover:border-white/40 flex flex-col items-center justify-center gap-[4px] cursor-pointer pointer-events-auto transition-colors duration-300 shrink-0"
          >
            <span className="w-4 h-0.5 bg-white" />
            <span className="w-4 h-0.5 bg-white" />
            <span className="w-4 h-0.5 bg-white" />
          </motion.button>
        </nav>
      )}

      {/* 600VH SCROLLABLE CONTAINER FOR 6 SECTIONS */}
      {isLoaded && (
        <div className="relative w-full h-[600vh] bg-transparent">
          
          {/* STATIC CONTAINER LAYOUT FOR FIXED OVERLAYS */}
          <div className="fixed inset-0 w-full h-full pointer-events-none z-30 font-semibold uppercase tracking-widest text-white">

            {/* ========== SECTION 1: HORMOZI HERO (0% to 15%) ========== */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 transition-all duration-700 ${
                isS1Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
              }`}
            >
              <div className="w-full grid grid-cols-12 gap-4 md:gap-8 items-center">
                {/* Left Column — Ethos & CTA */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isS1Active ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-5 text-left items-start pointer-events-auto"
                >
                  <div className="flex items-center gap-2">
                    <LogoMark className="w-6 h-9 shrink-0" />
                    <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.2em]">
                      Dental Implantology <br />
                      Unit Malta / Since 1999
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 text-left leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-sm normal-case font-normal">
                    Founded by Mark and Susanna Diacono, delivering outstanding patient-focused care within Malta's premier clinical network. Never compromising on either the quality of materials or the time required.
                  </p>
                  <button
                    onClick={() => handleNavLinkClick('Contact')}
                    className="group flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full border border-accent/30 bg-accent hover:bg-accent/90 text-black backdrop-blur-md text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer uppercase tracking-widest hover:scale-105 shadow-[0_0_25px_rgba(39,207,195,0.35)]"
                  >
                    <span>Book Free Consultation</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  {/* Results Mini Stats */}
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-white/50">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                      <span className="text-xs font-bold normal-case">4.9/5</span>
                    </div>
                    <span className="text-white/20">|</span>
                    <span className="text-[10px] sm:text-xs text-white/50 normal-case font-normal">200+ Google Reviews</span>
                  </div>
                </motion.div>

                {/* Center Column (Clean Corridor) */}
                <div className="hidden md:block md:col-span-4"></div>

                {/* Right Column — Stats & Slogan */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isS1Active ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-6 text-right items-end pointer-events-auto"
                >
                  {/* Stats Card */}
                  <div className="backdrop-blur-md bg-black/45 border border-white/5 p-5 rounded-xl flex items-center gap-6 sm:gap-8 justify-between w-full max-w-sm">
                    <div className="flex flex-col items-center flex-1 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start font-semibold">
                        <span className="text-accent text-xs leading-none mt-1">+</span>
                        <span className="text-2xl sm:text-3xl font-bold">27</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-white/50 font-bold leading-tight mt-1 text-center">
                        YEARS ACTIVE
                      </p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10" />
                    <div className="flex flex-col items-center flex-1 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start font-semibold">
                        <span className="text-accent text-xs leading-none mt-1">+</span>
                        <span className="text-2xl sm:text-3xl font-bold">10K</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-white/50 font-bold leading-tight mt-1 text-center">
                        SMILES RESTORED
                      </p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10" />
                    <div className="flex flex-col items-center flex-1 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start font-semibold">
                        <span className="text-accent text-xs leading-none mt-1">+</span>
                        <span className="text-2xl sm:text-3xl font-bold">7</span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-white/50 font-bold leading-tight mt-1 text-center">
                        SURGERY CHAIRS
                      </p>
                    </div>
                  </div>

                  {/* Slogan */}
                  <div className="flex flex-col items-end text-right w-full">
                    {['We Restore', 'Your Smile', '& Confidence'].map((word) => (
                      <div 
                        key={word} 
                        style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.8rem)' }}
                        className="overflow-hidden h-[1.05em] flex items-end justify-end"
                      >
                        <h1 className="font-bold uppercase text-white tracking-wider leading-[0.92] text-right whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {word}
                        </h1>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ========== SECTION 2: CLINICS & VALUE PROP (15% to 35%) ========== */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 transition-all duration-700 ${
                isS2Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
              }`}
            >
              <div className="w-full flex justify-between items-center absolute top-24 left-0 px-5 sm:px-8 md:px-12">
                <span className="text-[10px] sm:text-xs text-accent tracking-[0.25em]">01 / LOCATIONS</span>
                <span className="text-[9px] sm:text-[10px] text-white/30 tracking-widest hidden md:inline">MALTA CLINICAL NETWORK</span>
              </div>

              <div className="w-full grid grid-cols-12 gap-4 md:gap-8 items-center mt-4">
                {/* Left Column — Sliema Clinic */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isS2Active ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-4 text-left items-start pointer-events-auto"
                >
                  <h3 className="text-white font-bold text-xl sm:text-2xl tracking-wider leading-tight">
                    SLIEMA <br />
                    CLINICAL UNIT
                  </h3>
                  <p className="text-white/50 text-[10px] sm:text-xs normal-case font-normal -mt-2">Dental & Implantology Unit</p>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 10px 30px -10px rgba(39, 207, 195, 0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 rounded-xl flex flex-col justify-between text-left relative overflow-hidden group"
                  >
                    {/* Clinic preview image */}
                    <div className="w-full h-32 sm:h-36 overflow-hidden rounded-t-xl">
                      <img src="/sliema_clinic.png" alt="Sliema Clinic Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="absolute right-3 bottom-3 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <LogoMark className="w-14 h-14" />
                      </div>
                      <h4 className="text-accent text-[10px] sm:text-xs tracking-[0.25em] font-semibold mb-1 uppercase">
                        <MapPin className="w-3 h-3 inline mr-1" />ST. JAMES HOSPITAL
                      </h4>
                      <p className="text-white font-bold text-sm tracking-wider">SLIEMA</p>
                      <p className="text-white/60 text-xs mt-2 normal-case leading-relaxed font-normal">
                        George Borg Olivier Street<br />
                        Sliema SLM 1807<br />
                        Malta
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1.5 text-[10px] sm:text-xs text-white/50 font-normal">
                        <div><Phone className="w-3 h-3 inline mr-1" />TEL: <span className="text-white font-semibold">(+356) 2329 1029</span></div>
                        <div>MON, TUE, THU: 09:00 – 18:00</div>
                        <div>WED: 09:00 – 17:00 | FRI: 09:00 – 13:00</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Center Column */}
                <div className="hidden md:block md:col-span-4"></div>

                {/* Right Column — Burmarrad Clinic */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isS2Active ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-4 text-right items-end pointer-events-auto"
                >
                  <h3 className="text-white font-bold text-xl sm:text-2xl tracking-wider leading-tight text-right">
                    SAN PAWL <br />
                    IL-BAĦAR
                  </h3>
                  <p className="text-white/50 text-[10px] sm:text-xs normal-case font-normal -mt-2 text-right">Dental & Implantology Unit</p>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 10px 30px -10px rgba(39, 207, 195, 0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 rounded-xl flex flex-col justify-between text-left relative overflow-hidden group"
                  >
                    {/* Clinic preview image */}
                    <div className="w-full h-32 sm:h-36 overflow-hidden rounded-t-xl">
                      <img src="/burmarrad_clinic.png" alt="Burmarrad Clinic Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="absolute right-3 bottom-3 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <LogoMark className="w-14 h-14" />
                      </div>
                      <h4 className="text-accent text-[10px] sm:text-xs tracking-[0.25em] font-semibold mb-1 uppercase">
                        <MapPin className="w-3 h-3 inline mr-1" />ST. JAMES CLINIC
                      </h4>
                      <p className="text-white font-bold text-sm tracking-wider">SAN PAWL IL-BAĦAR</p>
                      <p className="text-white/60 text-xs mt-2 normal-case leading-relaxed font-normal">
                        Triq Il-Wardija<br />
                        San Pawl il-Baħar<br />
                        Malta
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1.5 text-[10px] sm:text-xs text-white/50 font-normal">
                        <div><Phone className="w-3 h-3 inline mr-1" />TEL: <span className="text-white font-semibold">(+356)-2329-3710</span></div>
                        <div>MON, TUE, THU: 09:00 – 18:00</div>
                        <div>WED: 09:00 – 17:00 | FRI: 09:00 – 13:00</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* ========== SECTION 3: TECHNOLOGY (35% to 55%) ========== */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 transition-all duration-700 ${
                isS3Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
              }`}
            >
              <div className="w-full flex justify-between items-center absolute top-24 left-0 px-5 sm:px-8 md:px-12">
                <span className="text-[10px] sm:text-xs text-accent tracking-[0.25em]">02 / CLINICAL TECHNOLOGY</span>
                <span className="text-[9px] sm:text-[10px] text-white/30 tracking-widest hidden md:inline">ADVANCED MEDICAL DIAGNOSTICS</span>
              </div>

              {/* DESKTOP SPLIT GRID */}
              <div className="hidden md:grid grid-cols-12 gap-8 items-center w-full mt-4">
                {/* Left Column (Tech cards 1, 3, 5) */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isS3Active ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-4 flex flex-col gap-4 text-left items-start pointer-events-auto"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em] mb-2">
                    ULTRA-PRECISE DIGITAL DIAGNOSTICS
                  </p>
                  
                  {/* Card 1: CBCT */}
                  <motion.div 
                    onClick={() => setActiveTreatment('CBCT 3D SCANNING')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 8px 24px -8px rgba(39,207,195,0.15)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-4 sm:p-5 rounded-xl flex flex-col text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-14 h-14" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[9px] sm:text-[10px] tracking-widest font-semibold">01 / DIAGNOSTICS</span>
                      <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide mt-1">CBCT 3D SCANNING</h4>
                    <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed mt-2 normal-case font-normal">
                      Cone Beam 3D CT scanner for highly detailed bone maps and implant planning.
                    </p>
                  </motion.div>

                  {/* Card 3: DSD */}
                  <motion.div 
                    onClick={() => setActiveTreatment('SMILE DESIGN')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 8px 24px -8px rgba(39,207,195,0.15)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-4 sm:p-5 rounded-xl flex flex-col text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-14 h-14" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[9px] sm:text-[10px] tracking-widest font-semibold">03 / ESTHETICS</span>
                      <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide mt-1">DIGITAL SMILE DESIGN</h4>
                    <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed mt-2 normal-case font-normal">
                      3D face scans allow you to preview and "test drive" your smile before starting.
                    </p>
                  </motion.div>

                  {/* Card 5: Microscope */}
                  <motion.div 
                    onClick={() => setActiveTreatment('CLINICAL MICROSCOPE')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 8px 24px -8px rgba(39,207,195,0.15)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-4 sm:p-5 rounded-xl flex flex-col text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-14 h-14" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[9px] sm:text-[10px] tracking-widest font-semibold">05 / PRECISION</span>
                      <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide mt-1">DENTAL MICROSCOPE</h4>
                    <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed mt-2 normal-case font-normal">
                      Dedicated surgical microscope for root canals and micro-restorations.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Center Column */}
                <div className="col-span-4"></div>

                {/* Right Column (Tech cards 2, 4, 6) */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isS3Active ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-4 flex flex-col gap-4 text-right items-end pointer-events-auto"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em] mb-2 text-right">
                    SAME-DAY CERAMIC RESTORATIONS
                  </p>

                  {/* Card 2: CADCAM */}
                  <motion.div 
                    onClick={() => setActiveTreatment('SAME-DAY TEETH')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 8px 24px -8px rgba(39,207,195,0.15)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-4 sm:p-5 rounded-xl flex flex-col text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-14 h-14" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[9px] sm:text-[10px] tracking-widest font-semibold">02 / RESTORATIVE</span>
                      <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide mt-1">SAME-DAY CAD/CAM TEETH</h4>
                    <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed mt-2 normal-case font-normal">
                      In-house milling machinery creates exact ceramic restorations in a single visit.
                    </p>
                  </motion.div>

                  {/* Card 4: IV Sedation */}
                  <motion.div 
                    onClick={() => setActiveTreatment('SAFE ANESTHESIA')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 8px 24px -8px rgba(39,207,195,0.15)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-4 sm:p-5 rounded-xl flex flex-col text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-14 h-14" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[9px] sm:text-[10px] tracking-widest font-semibold">04 / PATIENT CARE</span>
                      <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide mt-1">SPECIALIZED IV SEDATION</h4>
                    <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed mt-2 normal-case font-normal">
                      Anaesthetist-supervised intravenous sedation units for phobic/nervous patients.
                    </p>
                  </motion.div>

                  {/* Card 6: Advanced Imaging */}
                  <motion.div 
                    onClick={() => setActiveTreatment('ADVANCED IMAGING')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)', boxShadow: '0 8px 24px -8px rgba(39,207,195,0.15)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-4 sm:p-5 rounded-xl flex flex-col text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-14 h-14" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-[9px] sm:text-[10px] tracking-widest font-semibold">06 / IMAGING</span>
                      <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                    </div>
                    <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide mt-1">ADVANCED CT & MRI</h4>
                    <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed mt-2 normal-case font-normal">
                      On-site high-grade conventional CT and MRI for extensive clinical diagnostic scanning.
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* MOBILE INTERACTIVE TAB CAROUSEL */}
              <div className="block md:hidden w-full mt-4 bg-transparent text-left pointer-events-auto px-1">
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                  {[
                    { id: 'CBCT', title: 'CBCT 3D' },
                    { id: 'CADCAM', title: 'CAD/CAM' },
                    { id: 'DSD', title: 'DSD' },
                    { id: 'SEDATION', title: 'IV SEDATION' },
                    { id: 'MICROSCOPE', title: 'MICROSCOPE' },
                    { id: 'IMAGING', title: 'CT & MRI' }
                  ].map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTechTab(idx)}
                      className={`px-3 py-2 rounded-full border text-[10px] sm:text-xs uppercase font-bold tracking-widest transition-all duration-300 shrink-0 ${
                        activeTechTab === idx
                          ? 'border-accent bg-accent text-black shadow-[0_0_12px_rgba(39,207,195,0.4)]'
                          : 'border-white/10 bg-black/50 text-white/70 hover:text-white'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                {(() => {
                  const techData = [
                    { title: 'CBCT 3D SCANNING', num: '01', tag: 'DIAGNOSTICS', desc: 'Cone Beam 3D CT scanner for highly detailed bone maps and implant planning.' },
                    { title: 'SAME-DAY TEETH', num: '02', tag: 'RESTORATIVE', desc: 'In-house milling machinery creates exact ceramic restorations in a single visit.' },
                    { title: 'SMILE DESIGN', num: '03', tag: 'ESTHETICS', desc: '3D face scans allow you to preview and "test drive" your smile before starting.' },
                    { title: 'SAFE ANESTHESIA', num: '04', tag: 'PATIENT CARE', desc: 'Anaesthetist-supervised intravenous sedation units for phobic/nervous patients.' },
                    { title: 'CLINICAL MICROSCOPE', num: '05', tag: 'PRECISION', desc: 'Dedicated surgical microscope for root canals and micro-restorations.' },
                    { title: 'ADVANCED IMAGING', num: '06', tag: 'IMAGING', desc: 'On-site advanced medical CT and MRI scans for complex dental diagnostics.' }
                  ][activeTechTab];

                  return (
                    <motion.div
                      key={activeTechTab}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setActiveTreatment(techData.title)}
                      className="w-full mt-2 backdrop-blur-lg bg-black/60 border border-white/10 p-5 rounded-xl flex flex-col justify-between text-left relative overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                        <LogoMark className="w-16 h-16" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-accent text-[10px] sm:text-xs tracking-widest font-semibold">{techData.num} / {techData.tag}</span>
                          <ArrowUpRight className="w-4 h-4 text-accent/60" />
                        </div>
                        <h4 className="text-white font-bold text-sm tracking-wide mt-1.5 uppercase">{techData.title}</h4>
                        <p className="text-white/60 text-xs leading-relaxed mt-2.5 normal-case font-normal">
                          {techData.desc}
                        </p>
                        <span className="text-[10px] sm:text-xs text-accent font-bold mt-4 inline-block tracking-wider uppercase">
                          TAP FOR SERVICE DETAILS →
                        </span>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            </div>

            {/* ========== SECTION 4: TREATMENTS & OUTCOMES (55% to 75%) ========== */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 transition-all duration-700 ${
                isS4Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
              }`}
            >
              <div className="w-full flex justify-between items-center absolute top-24 left-0 px-5 sm:px-8 md:px-12">
                <span className="text-[10px] sm:text-xs text-accent tracking-[0.25em]">03 / EXPERTISE & TREATMENTS</span>
                <span className="text-[9px] sm:text-[10px] text-white/30 tracking-widest hidden md:inline">COMPREHENSIVE ORAL HEALTHCARE</span>
              </div>

              <div className="w-full grid grid-cols-12 gap-4 md:gap-8 items-center mt-4">
                {/* Left Column (Treatments 1, 3, 5) */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isS4Active ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-3 text-left items-start pointer-events-auto"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em] mb-1">
                    SPECIALIST CLINICAL CARE
                  </p>
                  
                  {/* Card 1: Implants */}
                  <motion.div 
                    onClick={() => setActiveTreatment('IMPLANTS')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-1 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-12 h-12" />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">DENTAL IMPLANTS</h4>
                      <p className="text-white/50 text-[10px] sm:text-xs leading-tight mt-1 normal-case font-normal">
                        Single implants, bone grafts, full mouth reconstructions.
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors shrink-0" />
                  </motion.div>

                  {/* Card 3: Oral Surgery */}
                  <motion.div 
                    onClick={() => setActiveTreatment('ORAL SURGERY')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-1 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-12 h-12" />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">ORAL SURGERY</h4>
                      <p className="text-white/50 text-[10px] sm:text-xs leading-tight mt-1 normal-case font-normal">
                        Impacted wisdom teeth extractions, lesion & growth removal.
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors shrink-0" />
                  </motion.div>

                  {/* Card 5: Orthodontics */}
                  <motion.div 
                    onClick={() => setActiveTreatment('ORTHODONTICS')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-1 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-12 h-12" />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">ORTHODONTICS</h4>
                      <p className="text-white/50 text-[10px] sm:text-xs leading-tight mt-1 normal-case font-normal">
                        Fixed brackets and clear invisible aligners (Invisalign).
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors shrink-0" />
                  </motion.div>
                </motion.div>

                {/* Center Column */}
                <div className="hidden md:block md:col-span-4"></div>

                {/* Right Column (Treatments 2, 4, 6) */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isS4Active ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-3 text-right items-end pointer-events-auto"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em] mb-1 text-right">
                    PREVENTIVE & AESTHETIC RESTORATIONS
                  </p>

                  {/* Card 2: Restorative */}
                  <motion.div 
                    onClick={() => setActiveTreatment('RESTORATIVE')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-1 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-12 h-12" />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">RESTORATIVE DENTISTRY</h4>
                      <p className="text-white/50 text-[10px] sm:text-xs leading-tight mt-1 normal-case font-normal">
                        Veneers, same-day crowns, bridges, and composite fillings.
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors shrink-0" />
                  </motion.div>

                  {/* Card 4: Sedation */}
                  <motion.div 
                    onClick={() => setActiveTreatment('SEDATION')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-1 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-12 h-12" />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">SEDATION (PHOBIC CARE)</h4>
                      <p className="text-white/50 text-[10px] sm:text-xs leading-tight mt-1 normal-case font-normal">
                        IV sedation and general anesthesia units for phobias.
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors shrink-0" />
                  </motion.div>

                  {/* Card 6: Preventive */}
                  <motion.div 
                    onClick={() => setActiveTreatment('PREVENTIVE')}
                    whileHover={{ scale: 1.02, y: -2, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between text-left cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute right-2 bottom-1 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                      <LogoMark className="w-12 h-12" />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">PREVENTIVE & WHITENING</h4>
                      <p className="text-white/50 text-[10px] sm:text-xs leading-tight mt-1 normal-case font-normal">
                        Hygienist cleanings, white fillings, paediatric exams.
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors shrink-0" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* ========== SECTION 5: TESTIMONIALS / SOCIAL PROOF (75% to 90%) ========== */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 transition-all duration-700 ${
                isS5Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
              }`}
            >
              <div className="w-full flex justify-between items-center absolute top-24 left-0 px-5 sm:px-8 md:px-12">
                <span className="text-[10px] sm:text-xs text-accent tracking-[0.25em]">04 / RESULTS & REVIEWS</span>
                <span className="text-[9px] sm:text-[10px] text-white/30 tracking-widest hidden md:inline">PATIENT TESTIMONIALS</span>
              </div>

              <div className="w-full grid grid-cols-12 gap-4 md:gap-8 items-center mt-4">
                {/* Left Column — Results Image & Rating */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isS5Active ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-4 text-left items-start pointer-events-auto"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em]">
                    REAL PATIENT RESULTS
                  </p>

                  {/* Results Preview Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02, borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 rounded-xl overflow-hidden group relative"
                  >
                    <div className="w-full h-40 sm:h-48 overflow-hidden">
                      <img src="/results_preview.png" alt="Patient smile transformation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                        <span className="text-white/60 text-xs ml-2 normal-case font-normal">4.9 average</span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm normal-case leading-relaxed font-normal">
                        Over 200 verified 5-star reviews from patients across Malta and Europe. Real results, real confidence.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Center Column */}
                <div className="hidden md:block md:col-span-4"></div>

                {/* Right Column — Testimonial Carousel */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isS5Active ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 flex flex-col gap-4 text-right items-end pointer-events-auto"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em] text-right">
                    WHAT OUR PATIENTS SAY
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5 }}
                      className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-5 sm:p-6 rounded-xl text-left relative overflow-hidden"
                    >
                      <div className="absolute right-3 bottom-3 opacity-5 pointer-events-none">
                        <LogoMark className="w-16 h-16" />
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= testimonials[activeTestimonial].rating ? 'text-accent fill-accent' : 'text-white/20'}`} />
                        ))}
                      </div>

                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed normal-case font-normal italic">
                        "{testimonials[activeTestimonial].text}"
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <p className="text-white font-bold text-xs sm:text-sm tracking-wider">{testimonials[activeTestimonial].name}</p>
                        <p className="text-white/40 text-[10px] sm:text-xs normal-case font-normal">{testimonials[activeTestimonial].location}</p>
                        <p className="text-accent text-[10px] sm:text-xs font-semibold mt-1 tracking-wider">{testimonials[activeTestimonial].treatment}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial dots */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
                          activeTestimonial === idx ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ========== SECTION 6: FAQ + CONTACT BOOKING (90% to 100%) ========== */}
            <div 
              className={`absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-12 pt-20 pb-8 transition-all duration-700 ${
                isS6Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
              }`}
            >
              <div className="w-full flex justify-between items-center absolute top-24 left-0 px-5 sm:px-8 md:px-12">
                <span className="text-[10px] sm:text-xs text-accent tracking-[0.25em]">05 / FAQ & CONTACT</span>
                <span className="text-[9px] sm:text-[10px] text-white/30 tracking-widest hidden md:inline">IMPLANTOLOGY & DENTISTRY CLINIC</span>
              </div>

              <div className="w-full grid grid-cols-12 gap-4 md:gap-8 items-start mt-4">
                {/* Left Column — FAQs Accordion */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isS6Active ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-5 flex flex-col gap-2 text-left items-start pointer-events-auto max-h-[70vh] overflow-y-auto pr-2"
                >
                  <p className="text-xs sm:text-sm text-accent leading-normal font-semibold tracking-[0.15em] mb-2">
                    FREQUENTLY ASKED QUESTIONS
                  </p>

                  {faqs.map((faq, idx) => (
                    <motion.div
                      key={idx}
                      className="w-full backdrop-blur-lg bg-black/60 border border-white/10 rounded-xl overflow-hidden group"
                    >
                      <button
                        onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left cursor-pointer bg-transparent border-none text-white transition-colors hover:text-accent"
                      >
                        <span className="text-xs sm:text-sm font-bold tracking-wide normal-case pr-4">{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-accent shrink-0 transition-transform duration-300 ${activeFaqIndex === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeFaqIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-white/60 text-xs sm:text-sm leading-relaxed normal-case font-normal">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Right Column — Contact & Booking */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isS6Active ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-5 text-right items-end pointer-events-auto"
                >
                  {/* Heading */}
                  <div className="flex flex-col items-end text-right w-full">
                    {['Book', 'Your', 'Consult'].map((word) => (
                      <div 
                        key={word} 
                        style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.8rem)' }}
                        className="overflow-hidden h-[1.05em] flex items-end justify-end"
                      >
                        <h1 className="font-bold uppercase text-white tracking-wider leading-[0.92] text-right whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {word}
                        </h1>
                      </div>
                    ))}
                  </div>

                  {/* Booking Card */}
                  <motion.div 
                    whileHover={{ borderColor: 'rgba(39, 207, 195, 0.3)' }}
                    className="w-full backdrop-blur-lg bg-black/60 border border-white/10 p-5 sm:p-6 rounded-xl text-left flex flex-col gap-4 relative overflow-hidden group"
                  >
                    <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
                      <LogoMark className="w-14 h-14" />
                    </div>

                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-[9px] sm:text-[10px] text-white/40 tracking-wider flex items-center gap-1"><Mail className="w-3 h-3" /> EMAIL</span>
                      <span className="text-white font-semibold text-sm tracking-widest lowercase">
                        info@dentalunitmalta.com
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-3 border-t border-white/5 z-10">
                      <span className="text-[9px] sm:text-[10px] text-white/40 tracking-wider flex items-center gap-1"><Phone className="w-3 h-3" /> DIRECT CLINIC NUMBERS</span>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between border border-white/10 p-2.5 rounded-lg bg-black/30">
                          <span className="text-[10px] sm:text-xs text-white/50 font-semibold uppercase tracking-wider">SLIEMA</span>
                          <span className="text-white font-bold text-xs sm:text-sm">(+356) 2329 1029</span>
                        </div>
                        <div className="flex items-center justify-between border border-white/10 p-2.5 rounded-lg bg-black/30">
                          <span className="text-[10px] sm:text-xs text-white/50 font-semibold uppercase tracking-wider">SAN PAWL</span>
                          <span className="text-white font-bold text-xs sm:text-sm">(+356)-2329-3710</span>
                        </div>
                      </div>
                    </div>

                    {/* Primary CTA — stays internal */}
                    <button
                      onClick={scrollToTop}
                      className="w-full mt-2 py-3 rounded-full bg-accent hover:bg-accent/90 text-black font-bold text-center text-xs sm:text-sm tracking-wider uppercase transition-all border-none cursor-pointer shadow-[0_0_20px_rgba(39,207,195,0.3)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(39,207,195,0.4)]"
                    >
                      Book Free Consultation
                    </button>
                  </motion.div>

                  <div className="flex items-center gap-3 pointer-events-auto">
                    <span className="text-[10px] sm:text-xs tracking-widest text-white/40">SCROLL TO TOP</span>
                    <button
                      onClick={scrollToTop}
                      className="w-10 h-10 rounded-full border border-white/20 hover:border-accent text-white hover:text-accent flex items-center justify-center cursor-pointer bg-black/50 transition-all hover:scale-105 active:scale-95 shadow-md"
                      aria-label="Back to top"
                    >
                      <ArrowUp className="w-4 h-4 animate-bounce" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* DETAIL MODAL OVERLAY */}
            <AnimatePresence>
              {activeTreatment && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60] flex items-center justify-center p-4 pointer-events-auto"
                  onClick={() => setActiveTreatment(null)}
                >
                  <motion.div
                    initial={{ scale: 0.92, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.92, y: 15 }}
                    className="bg-black/95 border border-accent/20 p-6 sm:p-8 rounded-2xl max-w-md w-full relative text-left shadow-[0_0_50px_rgba(39,207,195,0.15)] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Glowing background ring */}
                    <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-accent/5 filter blur-3xl pointer-events-none" />
                    
                    <button
                      onClick={() => setActiveTreatment(null)}
                      className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer bg-transparent border-none outline-none transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <LogoMark className="w-4 h-6" />
                      <span className="text-[9px] sm:text-[10px] text-accent tracking-[0.2em] font-bold uppercase">DIU CLINIC SERVICE</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                      {activeTreatment}
                    </h3>
                    
                    <p className="text-white/70 text-sm sm:text-base mt-4 leading-relaxed normal-case font-normal">
                      {getTreatmentDescription(activeTreatment)}
                    </p>
                    
                    <button
                      onClick={() => {
                        setActiveTreatment(null);
                        handleNavLinkClick('Contact');
                      }}
                      className="w-full mt-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-black font-bold text-center text-xs sm:text-sm tracking-wider uppercase transition-all border-none cursor-pointer shadow-[0_0_15px_rgba(39,207,195,0.25)] hover:scale-[1.02]"
                    >
                      Inquire About This Service
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      )}

      {/* SCROLL TO TOP FLOATING BUTTON */}
      <AnimatePresence>
        {isLoaded && scrollPercent > 20 && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-accent hover:bg-accent/90 text-white items-center justify-center border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-full h-screen bg-black z-50 px-5 sm:px-8 pt-5 pb-8 flex flex-col justify-between font-semibold uppercase tracking-widest text-white animate-none"
          >
            {/* Top row */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LogoMark className="w-5 h-8" />
                <span className="text-accent text-[10px] sm:text-xs tracking-[0.2em] font-bold">DIU MALTA</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full bg-black border border-white/20 hover:border-white/40 flex items-center justify-center cursor-pointer transition-colors duration-300 shrink-0"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-6 mt-12">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => handleNavLinkClick(link)}
                  className="text-2xl sm:text-3xl font-semibold tracking-widest uppercase text-left text-white hover:text-accent transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  {link}
                </motion.button>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto pt-8 border-t border-white/10">
              <button
                onClick={() => handleNavLinkClick('Contact')}
                className="group flex items-center gap-2 text-lg sm:text-xl text-accent hover:text-accent/90 transition-colors duration-300 font-semibold uppercase tracking-widest bg-transparent border-none cursor-pointer"
              >
                Book Free Consultation
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="text-white/30 text-[10px] sm:text-xs mt-3 normal-case font-normal">
                info@dentalunitmalta.com | (+356) 2329 1029
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
