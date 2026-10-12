import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, 
  Phone, 
  Clock, 
  ArrowRight, 
  Smile, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Navigation,
  Check,
  Cpu,
  Heart,
  Users,
  Shield,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import { 
  getAssetUrl, 
  approvedServices, 
  cliniciansList, 
  bookingTreatmentOptions
} from '@/data/clinicData';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenBooking: (defaults?: any) => void;
  onOpenEmergency: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenEmergency
}) => {
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Home Page Direct Form State (with First & Last name separated + Contact Preference + Terms Checkbox)
  const [homeForm, setHomeForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactPreference: 'WhatsApp' as 'WhatsApp' | 'Call Back' | 'Email',
    treatment: 'Initial Dental Consultation & Check-up',
    message: ''
  });
  const [homeTermsAccepted, setHomeTermsAccepted] = useState(false);
  const [homeFormSuccess, setHomeFormSuccess] = useState(false);
  const [homeFormError, setHomeFormError] = useState<string | null>(null);

  // Digital Smile Design Before & After comparison state
  const [dsdSliderPos, setDsdSliderPos] = useState(50);
  const [dsdActiveTab, setDsdActiveTab] = useState<'slider' | 'book'>('slider');

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const teamTrackRef = useRef<HTMLDivElement>(null);

  const [servicesDistance, setServicesDistance] = useState(1150);
  const [teamDistance, setTeamDistance] = useState(1050);

  useEffect(() => {
    const updateDistances = () => {
      if (servicesTrackRef.current) {
        const parentW = servicesTrackRef.current.parentElement?.clientWidth || window.innerWidth;
        const totalW = servicesTrackRef.current.scrollWidth;
        const overflow = Math.max(0, totalW - parentW + 40);
        setServicesDistance(overflow);
      }
      if (teamTrackRef.current) {
        const parentW = teamTrackRef.current.parentElement?.clientWidth || window.innerWidth;
        const totalW = teamTrackRef.current.scrollWidth;
        const overflow = Math.max(0, totalW - parentW + 40);
        setTeamDistance(overflow);
      }
    };

    updateDistances();
    window.addEventListener('resize', updateDistances);
    const timer = setTimeout(updateDistances, 400);
    return () => {
      window.removeEventListener('resize', updateDistances);
      clearTimeout(timer);
    };
  }, []);

  // 1. Hero Scroll Downscaling Dock (scales from 1.0 down to 0.93, corners 0px -> 28px)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });
  const heroScale = useTransform(heroProgress, [0, 0.85], [1, 0.93]);
  const heroRadius = useTransform(heroProgress, [0, 0.85], ["0px", "28px"]);
  const heroContentY = useTransform(heroProgress, [0, 0.7], [0, -35]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.75], [1, 0.45]);

  // 2. Scroll-Driven Horizontal Translation for Clinical Treatments (Track #1)
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start start", "end end"]
  });
  const servicesX = useTransform(servicesProgress, (v) => {
    if (v <= 0) return 0;
    if (v >= 0.85) return -servicesDistance;
    return -(v / 0.85) * servicesDistance;
  });

  // 3. Scroll-Driven Horizontal Translation for Specialist Doctors & Medical Team (Track #2)
  const { scrollYProgress: teamProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start start", "end end"]
  });
  const teamX = useTransform(teamProgress, (v) => {
    if (v <= 0) return 0;
    if (v >= 0.85) return -teamDistance;
    return -(v / 0.85) * teamDistance;
  });

  // 5 Leading Clinicians matching client mockup
  const featuredClinicians = cliniciansList.slice(0, 5);

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

  const toggleVideoMute = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !heroVideoRef.current.muted;
    setIsVideoMuted(heroVideoRef.current.muted);
  };

  const handleHomeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeForm.firstName.trim() || !homeForm.phone.trim()) {
      setHomeFormError('Please enter your First Name and Phone Number.');
      return;
    }
    if (!homeTermsAccepted) {
      setHomeFormError('Please tick the box to accept the Terms & Conditions.');
      return;
    }
    setHomeFormError(null);
    setHomeFormSuccess(true);
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-body">

      {/* 1. HERO SECTION: 2-COLUMN SPLIT (EDITORIAL & DSD HIGHLIGHT ON LEFT, 4K VIDEO PLAYER ON RIGHT) */}
      <div 
        id="hero" 
        ref={heroSectionRef} 
        className="relative w-full min-h-[92vh] lg:h-[135vh] bg-[#F8FAFC]"
      >
        <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex items-center justify-center p-0">
          
          <motion.div 
            style={{ 
              scale: heroScale,
              borderRadius: heroRadius
            }}
            className="relative w-full h-full overflow-hidden shadow-2xl bg-gradient-to-br from-[#07192D] via-[#0E2B4C] to-[#133A63] will-change-transform flex items-center"
          >
            {/* Subtle architectural ambient lights in background */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2BB4A7]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Content Container (2-Column Grid) */}
            <motion.div 
              style={{ y: heroContentY, opacity: heroContentOpacity }}
              className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column (55% / 7 cols): Headline, DSD Gold Badge, CTAs, Sedation Notice */}
                <div className="lg:col-span-7">
                  
                  {/* Location & DSD Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center gap-2.5 mb-6"
                  >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[#0E2B4C] text-[11px] font-bold uppercase tracking-widest shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#2BB4A7] animate-pulse" />
                      <span>At St James Hospital, Sliema</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/20 border border-amber-300/50 text-amber-200 text-[11px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-md">
                      <span className="text-amber-300">★</span>
                      <span>Digital Smile Design Signature Centre</span>
                    </div>
                  </motion.div>

                  {/* Main Headline (Exact Client Text: "The Dental Care You Need Under One Roof", No Subheader) */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-8 font-heading drop-shadow-md"
                  >
                    The Dental Care You Need <br />
                    <span className="text-[#2BB4A7] drop-shadow-md">Under One Roof.</span>
                  </motion.h1>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-3.5 mb-7"
                  >
                    <button
                      onClick={() => onOpenBooking()}
                      className="px-7 sm:px-8 py-3.5 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer border border-[#2BB4A7] hover:scale-105 active:scale-95"
                    >
                      Book a consultation
                    </button>

                    <button
                      onClick={() => {
                        const el = document.getElementById('dsd-signature');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          onOpenBooking({ treatment: 'Digital Smile Design & Restorative Dentistry' });
                        }
                      }}
                      className="px-7 sm:px-8 py-3.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-100 font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-amber-400/50 cursor-pointer shadow-md backdrop-blur-md hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <span>Experience the Test Drive of Your Future Smile</span>
                      <span>→</span>
                    </button>
                  </motion.div>

                  {/* Sedation Hospital Notice */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 flex items-start gap-3.5 text-slate-200 shadow-lg max-w-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2BB4A7]/20 border border-[#2BB4A7]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#2BB4A7]">
                      <Smile className="w-4 h-4 text-[#2BB4A7]" />
                    </div>
                    <div className="text-xs leading-relaxed text-slate-200">
                      <strong className="text-white font-bold">Nervous about the dentist?</strong> All our treatments are available under sedation, with a consultant anaesthetist, in a hospital setting.
                    </div>
                  </motion.div>

                </div>

                {/* Right Column (45% / 5 cols): Video Player with Floating Controls */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[16/11] sm:aspect-[4/3] lg:aspect-[4/3] bg-slate-900 group"
                  >
                    <video
                      ref={heroVideoRef}
                      src={getAssetUrl('video_hero_optimized.mp4')}
                      poster={getAssetUrl('hero_poster_4k.jpg')}
                      autoPlay
                      muted={isVideoMuted}
                      playsInline
                      loop
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Gradient Rim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                    {/* Top Tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2BB4A7] animate-pulse" />
                      <span>At St James Hospital</span>
                    </div>

                    {/* Media Controls inside video player */}
                    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                      <button
                        onClick={toggleVideoPlay}
                        className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0E2B4C] shadow-lg backdrop-blur-md cursor-pointer border border-white/50 transition-transform hover:scale-110 active:scale-95"
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                      >
                        {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleVideoMute}
                        className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0E2B4C] shadow-lg backdrop-blur-md cursor-pointer border border-white/50 transition-transform hover:scale-110 active:scale-95"
                        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                      >
                        {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                  </motion.div>
                </div>

              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 2. THREE-COLUMN NAVY SUMMARY BAR (MATCHING APPROVED FIGMA FRAME 01s) */}
      <section className="bg-[#0E2B4C] text-white py-6 border-b border-[#07192d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Column 1: Get an appointment */}
            <div 
              onClick={() => onOpenBooking()}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-[#2BB4A7]/40 bg-white/10 flex items-center justify-center shrink-0 group-hover:border-[#2BB4A7] transition-colors">
                <Calendar className="w-5 h-5 text-[#2BB4A7]" />
              </div>
              <div>
                <div className="text-base font-bold text-white group-hover:text-[#2BB4A7] transition-colors font-heading">
                  Get an appointment
                </div>
                <div className="text-xs text-slate-300 font-body">
                  Quick online booking form
                </div>
              </div>
            </div>

            {/* Column 2: Emergency contact */}
            <div 
              onClick={onOpenEmergency}
              className="flex items-center gap-4 p-3 rounded-2xl md:border-x md:border-white/10 md:px-6 hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-[#2BB4A7]/40 bg-white/10 flex items-center justify-center shrink-0 group-hover:border-[#2BB4A7] transition-colors">
                <Phone className="w-5 h-5 text-[#2BB4A7]" />
              </div>
              <div>
                <div className="text-base font-bold text-white group-hover:text-[#2BB4A7] transition-colors font-heading">
                  Emergency contact
                </div>
                <div className="text-xs text-slate-300 font-body">
                  Opening hours <strong className="text-white underline">2329 1029</strong> · Out of hours <strong className="text-white underline">2329 1000</strong>
                </div>
              </div>
            </div>

            {/* Column 3: Clinic hours */}
            <div className="flex items-center gap-4 p-3 rounded-2xl">
              <div className="w-12 h-12 rounded-full border border-[#2BB4A7]/40 bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#2BB4A7]" />
              </div>
              <div>
                <div className="text-base font-bold text-white font-heading">
                  Clinic hours
                </div>
                <div className="text-xs text-slate-300 font-body leading-snug">
                  Mon, Tue, Thu 9:00–18:00 · Wed 9:00–17:30 <br />
                  Fri, Sat 9:00–13:30
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. A WELCOME FROM DR MARK AND DR SUSANNA (FOUNDERS SECTION, CAPTURAS 04 & 05) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Founders Joint Photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] sm:aspect-[16/12] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/founders_clean_linen.jpg')}
                  alt="Dr Mark Diacono and Dr Susanna Diacono - Co-Founders of Dental and Implantology Unit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md">
                  <div className="text-sm font-bold text-[#0E2B4C] font-heading">
                    Dr Mark Diacono &amp; Dr Susanna Diacono
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Founders &amp; Clinical Directors · At St James Hospital, Sliema (Est. 1999)
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column with Exact Client Copy */}
            <div className="lg:col-span-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                A Welcome from Dr Mark &amp; Dr Susanna
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] mb-6 font-heading leading-tight">
                Every smile <span className="text-[#2BB4A7]">has a story.</span>
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-body mb-8">
                <p>
                  We founded the Dental and Implantology Unit in 1999 with a simple conviction: patients deserve unhurried, thoughtful dental care from clinicians who take the time to listen.
                </p>
                <p>
                  Being based inside St James Hospital allows us to offer something rare in private practice: a complete multidisciplinary team collaborating on complex cases, access to hospital-level theatre and sedation facilities, and the reassurance of an established medical environment.
                </p>
                <p>
                  Whether you’re visiting for a regular check-up or embarking on a full smile reconstruction, you’re in caring, experienced hands.
                </p>
              </div>

              {/* Doctor Signatures / Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-bold text-[#0E2B4C] text-sm font-heading">Dr Mark Diacono</div>
                  <div className="text-xs text-slate-500 leading-snug">
                    B.Ch.D. (Hons), M.Sc. (Lond.), F.D.S.R.C.S. (Eng.) <br />
                    <span className="text-[#2BB4A7] font-semibold">Specialist in Oral Surgery</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#0E2B4C] text-sm font-heading">Dr Susanna Diacono</div>
                  <div className="text-xs text-slate-500 leading-snug">
                    B.Ch.D. (Hons), M.Sc. Restorative (Lond.) <br />
                    <span className="text-[#2BB4A7] font-semibold">Master in Digital Smile Design</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. FOUR CORE TREATMENT CATEGORIES (SCROLL-DRIVEN HORIZONTAL TRACK #1) */}
      <div 
        id="services" 
        ref={servicesSectionRef} 
        className="relative lg:h-[260vh] bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-center py-20 lg:py-0 px-4 sm:px-8 lg:px-14">
          
          <div className="max-w-7xl mx-auto w-full mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-widest mb-3">
                Comprehensive Care
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
                Our Dental Treatments
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl font-body">
                Specialists and general dentists working under one hospital roof, tailoring each treatment to your comfort.
              </p>
            </div>

            {/* Desktop Dynamic Scroll Prompt */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
              <span>Scroll vertically to glide through treatments</span>
              <ChevronRight className="w-4 h-4 text-[#2BB4A7] animate-pulse" />
            </div>
          </div>

          {/* Desktop Scroll-Driven Horizontal Translation Track */}
          <div className="hidden lg:block w-full overflow-hidden">
            <motion.div 
              ref={servicesTrackRef}
              style={{ x: servicesX }}
              className="flex gap-6 xl:gap-8 will-change-transform pr-24"
            >
              {approvedServices.map((svc) => (
                <div
                  key={svc.id}
                  className="w-[410px] xl:w-[450px] shrink-0 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
                >
                  <div>
                    {/* Real Clinic Photo */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                      <img
                        src={getAssetUrl(svc.image)}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-2xs">
                        [ {svc.num} ]
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0E2B4C] mb-2.5 font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                        {svc.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-body line-clamp-3">
                        {svc.summary}
                      </p>

                      {/* Clinicians Attribution */}
                      {svc.clinicians && (
                        <div className="pt-3.5 border-t border-slate-100 space-y-1 mb-2 text-[11px] text-slate-500 font-medium">
                          {svc.clinicians.map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                              <span className="truncate">{c}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="p-6 pt-0 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('/treatments')}
                      className="text-xs font-bold text-[#2BB4A7] hover:text-[#0E2B4C] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 uppercase tracking-wider"
                    >
                      <span>Learn more →</span>
                    </button>
                    <button
                      onClick={() => onOpenBooking({ treatment: svc.title })}
                      className="px-4 py-2 rounded-full bg-slate-50 hover:bg-[#0E2B4C] text-slate-700 hover:text-white text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                    >
                      Book
                    </button>
                  </div>

                </div>
              ))}

              {/* Final 5th CTA Card in the Horizontal Track */}
              <div className="w-[360px] xl:w-[400px] shrink-0 rounded-3xl bg-[#0E2B4C] text-white p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#2BB4A7] text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                    Hospital Specialties
                  </span>
                  <h3 className="text-2xl font-bold font-heading mb-3 leading-snug">
                    Explore All Treatments &amp; Procedures
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-body">
                    Detailed clinical procedures, fees itemization, and multidisciplinary planning inside St. James Hospital.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('/treatments')}
                  className="w-full py-4 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
                >
                  <span>View All Treatments</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>

          {/* Mobile / Tablet Responsive Horizontal Carousel with Touch Scroll */}
          <div className="lg:hidden flex gap-5 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth">
            {approvedServices.map((svc) => (
              <div
                key={svc.id}
                className="w-[85vw] max-w-[340px] shrink-0 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(svc.image)}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-2xs">
                      [ {svc.num} ]
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4 font-body line-clamp-3">
                      {svc.summary}
                    </p>
                    {svc.clinicians && (
                      <div className="pt-3 border-t border-slate-100 space-y-1 mb-2 text-[10px] text-slate-500 font-medium">
                        {svc.clinicians.map((c, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                            <span className="truncate">{c}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('/treatments')}
                    className="text-xs font-bold text-[#2BB4A7] uppercase tracking-wider"
                  >
                    Learn more →
                  </button>
                  <button
                    onClick={() => onOpenBooking({ treatment: svc.title })}
                    className="px-3.5 py-1.5 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 5. DSD SIGNATURE TREATMENT: INTERACTIVE BEFORE & AFTER COMPARISON (CLIENT ITEMS B, C & I) */}
      <section id="dsd-signature" className="py-20 lg:py-28 bg-[#0E2B4C] text-white relative overflow-hidden border-b border-[#07192D]">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2BB4A7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Golden Signature Badge */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-400/60 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-950/20 backdrop-blur-md mb-6">
              <span className="text-amber-300 text-base">★</span>
              <span>SIGNATURE FEATURE SERVICE · MASTER IN DIGITAL SMILE DESIGN</span>
              <span className="text-amber-300 text-base">★</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-heading leading-tight">
              Experience the Test Drive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2BB4A7] via-teal-300 to-amber-300">
                of Your Future Smile.
              </span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-body">
              Digital Smile Design (DSD) uses facial 3D scanning and computer modeling to engineer restorations that harmonise with your natural facial proportions. Preview, adjust, and test-drive your new smile before treatment ever begins.
            </p>

            {/* View Mode Switcher: Interactive Slider vs Book-Style Split */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/10 border border-white/20 mt-8 backdrop-blur-md">
              <button
                onClick={() => setDsdActiveTab('slider')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  dsdActiveTab === 'slider' 
                    ? 'bg-[#2BB4A7] text-white shadow-md' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Interactive Wipe Slider
              </button>
              <button
                onClick={() => setDsdActiveTab('book')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  dsdActiveTab === 'book' 
                    ? 'bg-[#2BB4A7] text-white shadow-md' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Book-Style Side-by-Side
              </button>
            </div>
          </div>

          {/* Interactive Before & After Showcase */}
          <div className="mb-16">
            {dsdActiveTab === 'slider' ? (
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-[16/11] sm:aspect-[16/10] bg-slate-950 select-none group">
                  
                  {/* AFTER Image (Full width background) */}
                  <img
                    src={getAssetUrl('clinic/dsd_after_patient.jpg')}
                    alt="After: Radiant transformed smile via Digital Smile Design"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  />
                  
                  {/* BEFORE Image (Clipped overlay based on dsdSliderPos %) */}
                  <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${dsdSliderPos}%` }}
                  >
                    <img
                      src={getAssetUrl('clinic/dsd_before_patient.jpg')}
                      alt="Before: Initial presentation prior to Digital Smile Design"
                      className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                      style={{ width: '100%', height: '100%', objectPosition: 'center' }}
                    />
                  </div>

                  {/* Divider Line & Handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 pointer-events-none"
                    style={{ left: `${dsdSliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0E2B4C] shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-[#2BB4A7]">
                      ⇄
                    </div>
                  </div>

                  {/* Pills overlay */}
                  <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                    Before: Initial Smile
                  </div>
                  <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md border border-white/20 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider">
                    ★ After: DSD Smile Design
                  </div>

                  {/* Range Slider for drag / touch */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={dsdSliderPos}
                    onChange={(e) => setDsdSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    aria-label="Drag to compare before and after"
                  />
                </div>

                {/* Quick Toggle Preset Buttons */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => setDsdSliderPos(100)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      dsdSliderPos === 100 
                        ? 'bg-white text-[#0E2B4C] border-white' 
                        : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    Show Before
                  </button>
                  <button
                    onClick={() => setDsdSliderPos(50)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      dsdSliderPos === 50 
                        ? 'bg-[#2BB4A7] text-white border-[#2BB4A7]' 
                        : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    50 / 50 Comparison
                  </button>
                  <button
                    onClick={() => setDsdSliderPos(0)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      dsdSliderPos === 0 
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-extrabold' 
                        : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    Show After
                  </button>
                </div>
              </div>
            ) : (
              /* Book-Style Dual Layout */
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Book Page Left: Before */}
                <div className="bg-white/5 border border-white/15 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-slate-900 border border-white/10">
                      <img
                        src={getAssetUrl('clinic/dsd_before_patient.jpg')}
                        alt="Before: Patient initial smile presentation"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        Initial Presentation
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading mb-1">
                      Before: Aesthetic Disharmony &amp; Wear
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-body">
                      Patient presented with uneven incisal margins, discolouration, and collapsed bite proportions.
                    </p>
                  </div>
                </div>

                {/* Book Page Right: After */}
                <div className="bg-gradient-to-br from-amber-500/10 via-white/5 to-[#2BB4A7]/10 border-2 border-amber-400/40 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-slate-900 border border-amber-400/30">
                      <img
                        src={getAssetUrl('clinic/dsd_after_patient.jpg')}
                        alt="After: Radiant result via Digital Smile Design"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                        ★ DSD Result
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-amber-200 font-heading mb-1">
                      After: Radiant Symmetrical Smile
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-body">
                      Custom biocompatible ceramic veneers restored natural luminosity, lip support, and harmonious facial balance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DSD Signature Key Points & Prominent Call to Action */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8">
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider block mb-2 font-mono">
                  ★ Certified DSD Master Protocol
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-4">
                  Why test-drive your smile before treatment?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Designed to your facial symmetry, not a generic template</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Physical trial smile mockup worn in your mouth before any tooth is touched</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Precision German CAD/CAM ceramic milling with lifetime durability</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Joint surgical-restorative planning when implants are required</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Digital Smile Design & Restorative Dentistry' })}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#2BB4A7] to-teal-500 hover:from-[#23998e] hover:to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-teal-950/40 cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <span>Experience the Test Drive of Your Future Smile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-400 mt-2 text-center lg:text-right">
                  Conducted by Dr Susanna Diacono · At St James Hospital
                </div>
              </div>

            </div>
          </div>

          {/* 4 Steps Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {[
              { num: "01", title: "3D Facial & Dental Scan", desc: "Digital intraoral scan and high-definition facial photography capture your natural smile dynamics." },
              { num: "02", title: "Digital Aesthetic Simulation", desc: "Using advanced DSD software, we design the ideal length, width, and contours suited to your face." },
              { num: "03", title: "Realistic Clinical Mock-up", desc: "A physical trial smile is placed directly in your mouth so you can evaluate the look and feel." },
              { num: "04", title: "Precision Ceramic Placement", desc: "Once you approve the design, custom ceramic veneers or crowns are milled and placed." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="text-[#2BB4A7] text-xs font-extrabold tracking-widest block mb-2 font-mono">
                  [ STEP {step.num} ]
                </span>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CARE WITHOUT COMPROMISE (WHY CHOOSE DIU, CAPTURA 11) */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                WHY PATIENTS CHOOSE DIU
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] mb-6 font-heading leading-tight">
                Care without <br />
                <span className="text-[#2BB4A7]">compromise</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                We believe exceptional dentistry relies on three essentials: meticulous clinical skill, advanced diagnostic technology, and a hospital setting that guarantees total safety and peace of mind.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={getAssetUrl('patient_elena.jpg')}
                  alt="Confident, natural smile results achieved at DiU Clinic Malta"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                  Natural Aesthetic Excellence
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading">
                Advanced Technology
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                3D dental scanner, crowns in a single visit with CAD/CAM technology, and 3D X-ray (CBCT).
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading">
                Anxious–patient care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Sedation with a consultant anaesthetist for nervous patients.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading">
                Multidisciplinary team
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Complex cases planned as a specialist team, all under one roof.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading">
                Hospital–level safety
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Based inside St James Hospital, Sliema, trusted since 1999.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. YOU ARE IN SAFE HANDS (DEDICATED REASSURANCE SECTION, CLIENT ITEM E) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Reassuring Clinician Photo */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={getAssetUrl('clinic/explaining_treatment_to_pt.jpg')}
                  alt="Doctor explaining treatment gently and reassuringly to patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                  Unhurried Patient Care
                </div>
              </div>
            </div>

            {/* Exact Client Reassurance Copy */}
            <div className="lg:col-span-6">
              <div className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                HOSPITAL SAFETY &amp; COMFORT
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E2B4C] mb-6 font-heading leading-tight">
                You are in <br />
                <span className="text-[#2BB4A7]">safe hands</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-body">
                Dental anxiety is very common, and you are never alone. We are widely recognised for our calm, gentle manner with nervous patients, offering hospital-grade conscious sedation administered directly by certified consultant anaesthetists.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-body">
                Prefer to start with a relaxed conversation away from the dental chair? We offer an informal pre-treatment consultation to understand your feelings, answer questions, and plan treatment entirely at your pace.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Treatment for Anxious Patients (Sedation)' })}
                  className="px-7 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer border border-[#0E2B4C] hover:scale-102"
                >
                  Learn about sedation options
                </button>
                <a
                  href="tel:35623291029"
                  className="px-6 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all no-underline flex items-center gap-2 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>Speak with our team</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. OUR CLINICIANS & MEDICAL TEAM (SCROLL-DRIVEN HORIZONTAL TRACK #2) */}
      <div 
        id="our-team" 
        ref={teamSectionRef} 
        className="relative lg:h-[260vh] bg-white border-b border-slate-200/80"
      >
        <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-center py-20 lg:py-0 px-4 sm:px-8 lg:px-14">
          
          <div className="max-w-7xl mx-auto w-full mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                OUR CLINICIANS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
                Our dentists <span className="text-[#2BB4A7]">&amp; hygienist</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-md font-body">
                Specialists and general dentists working side by side, so every treatment is planned by the right person.
              </p>
            </div>

            {/* Desktop Dynamic Scroll Prompt */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
              <span>Scroll vertically to meet our clinical team</span>
              <ChevronRight className="w-4 h-4 text-[#2BB4A7] animate-pulse" />
            </div>
          </div>

          {/* Desktop Scroll-Driven Horizontal Translation Track */}
          <div className="hidden lg:block w-full overflow-hidden">
            <motion.div 
              ref={teamTrackRef}
              style={{ x: teamX }}
              className="flex gap-6 xl:gap-8 will-change-transform pr-24"
            >
              {featuredClinicians.map((person) => (
                <div
                  key={person.id}
                  className="w-[320px] xl:w-[350px] shrink-0 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
                >
                  <div>
                    <div className="relative aspect-[4/4] overflow-hidden bg-slate-200">
                      <img
                        src={getAssetUrl(person.photo)}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-[#0E2B4C] font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                        {person.name}
                      </h3>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug line-clamp-2">
                        {person.qualifications}
                      </div>
                      <div className="text-xs font-bold text-[#2BB4A7] mt-2 font-heading">
                        {person.role}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onOpenBooking({ doctor: person.name, treatment: person.treatmentDefault })}
                      className="w-full py-2.5 rounded-full bg-white hover:bg-[#0E2B4C] text-[#0E2B4C] hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              ))}

              {/* Final 6th Card: View Full 19 Clinicians Directory */}
              <div className="w-[320px] xl:w-[350px] shrink-0 rounded-3xl bg-[#0E2B4C] text-white p-7 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#2BB4A7] text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                    Hospital Staff Directory
                  </span>
                  <h3 className="text-2xl font-bold font-heading mb-3 leading-snug">
                    Meet Our Entire Medical Team
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-body">
                    19 specialists, general dentists, dental hygienist, theatre surgical nurses, and patient care coordinators.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('/team')}
                  className="w-full py-3.5 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
                >
                  <Users className="w-4 h-4" />
                  <span>View Full Team (19)</span>
                </button>
              </div>

            </motion.div>
          </div>

          {/* Mobile / Tablet Responsive Horizontal Carousel with Touch Scroll */}
          <div className="lg:hidden flex gap-5 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth">
            {featuredClinicians.map((person) => (
              <div
                key={person.id}
                className="w-[78vw] max-w-[280px] shrink-0 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[4/4] overflow-hidden bg-slate-200">
                    <img
                      src={getAssetUrl(person.photo)}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#0E2B4C] font-heading leading-snug">
                      {person.name}
                    </h3>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-2">
                      {person.qualifications}
                    </div>
                    <div className="text-xs font-bold text-[#2BB4A7] mt-1.5 font-heading">
                      {person.role}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenBooking({ doctor: person.name, treatment: person.treatmentDefault })}
                    className="w-full py-2 rounded-full bg-white text-[#0E2B4C] font-bold text-xs border border-slate-200"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center lg:hidden">
            <button
              onClick={() => onNavigate('/team')}
              className="px-6 py-3 rounded-full bg-[#0E2B4C] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>View Full Team (19)</span>
              <ArrowRight className="w-4 h-4 text-[#2BB4A7]" />
            </button>
          </div>

        </div>
      </div>

      {/* 9. PATIENT INFORMATION (MATCHING APPROVED FIGMA FRAME 24s) */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              PATIENT INFORMATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
              Everything you need <span className="text-[#2BB4A7]">before your visit</span>
            </h2>
          </div>

          {/* 4 Cards Grid from Frame 24s */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Your first visit */}
            <div 
              onClick={() => onOpenBooking()}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading group-hover:text-[#2BB4A7] transition-colors">
                Your first visit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                What to expect at your first appointment.
              </p>
            </div>

            {/* Card 2: Fees and insurance */}
            <div 
              onClick={() => onNavigate('/prices')}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading group-hover:text-[#2BB4A7] transition-colors">
                Fees and insurance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Let us know if you have insurance.
              </p>
            </div>

            {/* Card 3: Aftercare */}
            <div 
              onClick={() => onNavigate('/blog')}
              className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading group-hover:text-[#2BB4A7] transition-colors">
                Aftercare
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Looking after your teeth after treatment.
              </p>
            </div>

            {/* Card 4: Dental emergencies */}
            <div 
              onClick={onOpenEmergency}
              className="p-7 rounded-3xl bg-teal-50/50 border border-teal-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading group-hover:text-[#2BB4A7] transition-colors">
                Dental emergencies
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-body mb-2">
                During opening hours: <strong className="underline text-[#0E2B4C]">2329 1029</strong> <br />
                WhatsApp: <strong className="underline text-[#0E2B4C]">9999 1029</strong>
              </p>
              <p className="text-xs text-slate-600 font-body">
                Out of hours: <strong className="underline text-[#0E2B4C]">2329 1000</strong>
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 10. HOW TO FIND US INSIDE ST. JAMES HOSPITAL (CAPTURA 28) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#F8FAFC] p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2BB4A7]">
                  Location Guide • St. James Hospital Sliema
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mt-1">
                  How to Find DiU Clinic on Arrival
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Parking: the nearest car park is at the Victoria Hotel, close by.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=St+James+Hospital+Sliema+Malta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-colors no-underline flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get directions in Google Maps ↗</span>
              </a>
            </div>

            {/* Interactive Embedded Google Maps (Client Item H) */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-md mb-8 bg-slate-100">
              <iframe
                title="DiU Clinic Location at St James Hospital Sliema"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.163456209865!2d14.500222!3d35.912639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4539655f4621%3A0xd677e1919efec5cf!2sSaint%20James%20Hospital%20Sliema!5e0!3m2!1sen!2smt!4v1710000000000!5m2!1sen!2smt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* 3 Steps Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('clinic/st_james_main_entrance.jpg')}
                    alt="1. Main entrance St. James Hospital Sliema"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-[#0E2B4C]">1 · Main entrance</div>
                  <div className="text-xs text-slate-600 mt-1">Enter through the main hospital reception doors on George Borg Olivier Street.</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('clinic/st_james_lift_lg.jpg')}
                    alt="2. Lift down to LG"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-[#0E2B4C]">2 · Lift down to LG</div>
                  <div className="text-xs text-slate-600 mt-1">Take the main hospital elevators down to the Lower Ground floor (LG).</div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('clinic/diu_clinic_entrance.jpg')}
                    alt="3. DiU entrance"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-[#0E2B4C]">3 · DiU entrance</div>
                  <div className="text-xs text-slate-600 mt-1">Our dedicated reception desk is immediately visible as you exit the lifts.</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 11. PERSONAL ESTIMATE CTA STRIP */}
      <section className="bg-white py-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2BB4A7]">
                Transparent Pricing Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mt-1">
                Ask us for a personal estimate
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-body leading-relaxed">
                Every treatment plan is personal. Call us on <strong>2329 1029</strong>, message on WhatsApp, or send an inquiry — you will receive a transparent written plan with no hidden extras.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/prices')}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0E2B4C] font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-2xs"
              >
                View Fees &amp; Prices
              </button>
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Request an Estimate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. AFTERCARE & CLINICAL GUARANTEE (CLIENT ITEM F) */}
      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              POST-TREATMENT SUPPORT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-3">
              Dedicated Aftercare &amp; Clinical Guarantees
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
              Our clinical responsibility does not end when your appointment finishes. We ensure structured aftercare, follow-up check-ups, and guaranteed materials for long-term peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0E2B4C] font-heading mb-2">
                  Material &amp; Implant Warranty
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  All Swiss titanium implants and CEREC diamond-milled ceramic restorations carry official manufacturer warranties against structural defects and material failures.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0E2B4C]">
                ✓ Written warranty passport provided
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0E2B4C] font-heading mb-2">
                  Complimentary Follow-ups
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  Following oral surgery or smile rehabilitation, all post-operative reviews, suture removals, and healing assessments are included at no additional fee.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0E2B4C]">
                ✓ Scheduled recovery consultations
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0E2B4C] font-heading mb-2">
                  24/7 Hospital Emergency Line
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  Inside St James Hospital, emergency medical support is on-site 24 hours a day. Should you need immediate post-treatment advice, hospital medical staff are always available.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-[#0E2B4C]">
                ✓ Direct line: <strong className="underline">2329 1000</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 13. HEALTH INSURANCE & CROSS-BORDER REIMBURSEMENT (CLIENT ITEM 6) */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0E2B4C] via-[#123961] to-[#0E2B4C] text-white border-b border-[#07192D] shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#2BB4A7]/20 border border-[#2BB4A7]/40 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                INSURANCE COVERAGE &amp; CROSS-BORDER REIMBURSEMENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3">
                Do You Have Private Health Insurance?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-body">
                Find out whether you may be eligible for dental care coverage or reimbursement. We provide complete itemised hospital medical receipts, ICD-10 diagnostic coding, and documentation for local insurers (Bupa Malta, Atlas, GasanMamo) and international schemes (AXA, Allianz, Cigna, EU Cross-Border Directive).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigate('/prices')}
                className="px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                See If You're Eligible. Learn More. →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BOOK A CONSULTATION SECTION (MATCHING APPROVED FIGMA FRAME 28s & 32s + TERMS CHECKBOX) */}
      <section id="contact-booking" className="py-20 lg:py-28 bg-[#0E2B4C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact Info (Frame 28s) */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 font-heading">
                Book a <span className="text-[#2BB4A7]">consultation</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-body">
                Send us a message and we will contact you to arrange a time, or call us directly.
              </p>

              <div className="space-y-4 mb-8 text-sm">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Phone:</div>
                  <a href="tel:35623291029" className="text-white hover:text-[#2BB4A7] font-semibold text-base transition-colors underline">
                    +356 2329 1029
                  </a>
                  <span className="text-slate-400"> / </span>
                  <a href="tel:35623291028" className="text-white hover:text-[#2BB4A7] font-semibold text-base transition-colors underline">
                    2329 1028
                  </a>
                </div>

                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Mobile / WhatsApp:</div>
                  <a href="https://wa.me/35699991029" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#2BB4A7] font-semibold text-base transition-colors underline">
                    +356 9999 1029
                  </a>
                </div>

                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Email:</div>
                  <a href="mailto:appointment@dentalunitmalta.com" className="text-white hover:text-[#2BB4A7] font-semibold text-base transition-colors underline">
                    appointment@dentalunitmalta.com
                  </a>
                </div>
              </div>

              {/* Clinic Hours Table */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-sm text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Mon, Tue, Thu</span>
                  <span className="text-white font-medium">9:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Wednesday</span>
                  <span className="text-white font-medium">9:00 – 17:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri, Sat</span>
                  <span className="text-white font-medium">9:00 – 13:30</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form with Terms & Conditions Checkbox */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200">
                
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mb-1">
                  Book a visit
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 font-body">
                  We’ll call you back to arrange a time.
                </p>

                {homeFormSuccess ? (
                  <div className="p-6 rounded-2xl bg-[#E8F8F6] border border-[#C5EDE8] text-center">
                    <div className="w-12 h-12 rounded-full bg-[#2BB4A7] text-white flex items-center justify-center mx-auto mb-3 shadow">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0E2B4C] font-heading mb-1">
                      Request Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 max-w-sm mx-auto mb-4">
                      Thank you, {homeForm.firstName}. Our hospital coordinator will contact you via {homeForm.contactPreference} shortly.
                    </p>
                    <button
                      onClick={() => setHomeFormSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-[#0E2B4C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHomeFormSubmit} className="space-y-4">
                    
                    {/* Separate First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Susanna"
                          value={homeForm.firstName}
                          onChange={(e) => setHomeForm({ ...homeForm, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Diacono"
                          value={homeForm.lastName}
                          onChange={(e) => setHomeForm({ ...homeForm, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Contact Method *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['WhatsApp', 'Call Back', 'Email'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setHomeForm({ ...homeForm, contactPreference: method })}
                            className={`py-2 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                              homeForm.contactPreference === method
                                ? 'bg-[#0E2B4C] text-white border-[#0E2B4C]'
                                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+356 9999 1029"
                          value={homeForm.phone}
                          onChange={(e) => setHomeForm({ ...homeForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="patient@example.com"
                          value={homeForm.email}
                          onChange={(e) => setHomeForm({ ...homeForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>
                    </div>

                    {/* Interested in */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Interested in *
                      </label>
                      <select
                        value={homeForm.treatment}
                        onChange={(e) => setHomeForm({ ...homeForm, treatment: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                      >
                        {bookingTreatmentOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message / Symptoms */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about what you'd like us to look at or any dental concerns..."
                        value={homeForm.message}
                        onChange={(e) => setHomeForm({ ...homeForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                      />
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={homeTermsAccepted}
                          onChange={(e) => setHomeTermsAccepted(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2BB4A7] focus:ring-[#2BB4A7] cursor-pointer shrink-0"
                        />
                        <span className="text-xs text-slate-600 leading-snug">
                          I accept the <strong className="text-[#0E2B4C] underline">Terms &amp; Conditions</strong> and consent to DiU Clinic Malta contacting me regarding this dental appointment request.
                        </span>
                      </label>
                    </div>

                    {homeFormError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{homeFormError}</span>
                      </div>
                    )}

                    {/* Dual Action: Direct Submit + WhatsApp */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-4 px-6 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#0E2B4C]"
                      >
                        Request a callback
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenBooking(homeForm)}
                        className="py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-emerald-600/30 flex items-center justify-center gap-2"
                      >
                        <span>WhatsApp Instead</span>
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
