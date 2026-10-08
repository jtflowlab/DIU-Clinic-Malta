import React, { useState, useRef } from 'react';
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

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);

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
  const servicesX = useTransform(servicesProgress, [0, 1], ["0%", "-58%"]);

  // 3. Scroll-Driven Horizontal Translation for Specialist Doctors & Medical Team (Track #2)
  const { scrollYProgress: teamProgress } = useScroll({
    target: teamSectionRef,
    offset: ["start start", "end end"]
  });
  const teamX = useTransform(teamProgress, [0, 1], ["0%", "-52%"]);

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

      {/* 1. HERO SECTION: FULL-BLEED CINEMATIC 4K VIDEO HERO WITH OVERLAID TEXT + SCROLL DOCK */}
      <div 
        id="hero" 
        ref={heroSectionRef} 
        className="relative w-full h-[140vh] bg-[#F8FAFC]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center p-0">
          
          <motion.div 
            style={{ 
              scale: heroScale,
              borderRadius: heroRadius
            }}
            className="relative w-full h-full overflow-hidden shadow-2xl bg-slate-900 will-change-transform flex items-center justify-start"
          >
            {/* Bright, Crystal-Clear 4K Hero Video (Occupies entire screen) */}
            <video
              ref={heroVideoRef}
              src={getAssetUrl('video_hero_optimized.mp4')}
              poster={getAssetUrl('hero_poster_4k.jpg')}
              autoPlay
              muted={isVideoMuted}
              playsInline
              loop
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
            />
            
            {/* Subtle Directional Scrim: Gentle darkening on far left so video stays bright, and physical glass letters remain visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E2B4C]/80 via-[#0E2B4C]/35 to-transparent pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E2B4C]/60 via-transparent to-black/15 pointer-events-none z-[1]" />

            {/* Overlaid Editorial Content: Constrained to max-w-xl on left */}
            <motion.div 
              style={{ y: heroContentY, opacity: heroContentOpacity }}
              className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 pb-12"
            >
              <div className="max-w-xl lg:max-w-2xl">
                
                {/* 1. Hospital Location Pill */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[#0E2B4C] text-[11px] font-bold uppercase tracking-widest mb-5 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2BB4A7] animate-pulse" />
                  <span>ST JAMES HOSPITAL, SLIEMA</span>
                </motion.div>

                {/* 2. Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-5 font-heading drop-shadow-lg"
                >
                  Dental care done properly. <br />
                  <span className="text-[#2BB4A7] drop-shadow-md">With one team under one roof.</span>
                </motion.h1>

                {/* 3. Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base md:text-lg text-slate-100 font-normal leading-relaxed mb-7 max-w-xl font-body drop-shadow"
                >
                  From your family’s check-ups and children’s dentistry to smile design, implants and full-mouth reconstruction, one team plans your care together.
                </motion.p>

                {/* 4. Action Pill Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-3.5 mb-6"
                >
                  <button
                    onClick={() => onOpenBooking()}
                    className="px-7 sm:px-8 py-3.5 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer border border-[#2BB4A7] hover:scale-105 active:scale-95"
                  >
                    Book a consultation
                  </button>

                  <button
                    onClick={() => onNavigate('/treatments')}
                    className="px-7 sm:px-8 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#0E2B4C] font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-white/80 cursor-pointer shadow-md backdrop-blur-md hover:scale-105 active:scale-95"
                  >
                    Smile design around your face
                  </button>
                </motion.div>

                {/* 5. Sedation Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 p-4 flex items-start gap-3.5 text-slate-800 shadow-lg max-w-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2BB4A7]/15 border border-[#2BB4A7]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#2BB4A7]">
                    <Smile className="w-4 h-4 text-[#2BB4A7]" />
                  </div>
                  <div className="text-xs leading-relaxed text-slate-700">
                    <strong className="text-[#0E2B4C] font-bold">Nervous about the dentist?</strong> All our treatments are available under sedation, with a consultant anaesthetist, in a hospital setting.
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Bottom Right Floating Media Controls */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-2">
              <button
                onClick={toggleVideoPlay}
                className="p-3 rounded-full bg-white/90 hover:bg-white text-[#0E2B4C] shadow-lg backdrop-blur-md cursor-pointer border border-white/50 transition-transform hover:scale-110 active:scale-95"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={toggleVideoMute}
                className="p-3 rounded-full bg-white/90 hover:bg-white text-[#0E2B4C] shadow-lg backdrop-blur-md cursor-pointer border border-white/50 transition-transform hover:scale-110 active:scale-95"
                aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

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
                  src={getAssetUrl('clinic/founders_diacono.jpg')}
                  alt="Dr Mark Diacono and Dr Susanna Diacono - Co-Founders of Dental and Implantology Unit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md">
                  <div className="text-sm font-bold text-[#0E2B4C] font-heading">
                    Dr Mark Diacono &amp; Dr Susanna Diacono
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Founders &amp; Clinical Directors · St James Hospital, Sliema (Est. 1999)
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

      {/* 5. DSD SIGNATURE TREATMENT SECTION (CAPTURA 10) */}
      <section className="py-20 lg:py-28 bg-[#0E2B4C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                DIGITAL SMILE DESIGN
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 font-heading leading-tight">
                See your new smile <br />
                <span className="text-[#2BB4A7]">before we touch a tooth</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-body">
                Digital Smile Design (DSD) uses facial 3D scanning and computer modeling to design restorations that harmonize with your natural facial proportions. You preview, adjust and approve your new smile before treatment begins.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Designed to your facial symmetry, not a generic template",
                  "Try on your temporary mockup smile in person",
                  "Precision-engineered ceramic veneers and crowns",
                  "Planned jointly with our surgical team when implants are needed"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenBooking({ treatment: 'Digital Smile Design & Restorative Dentistry' })}
                className="px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer hover:scale-105"
              >
                Experience Digital Smile Design
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={getAssetUrl('clinic/md_3d_scanner_and_pt.jpg')}
                  alt="Digital Smile Design scanning chairside with patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#0E2B4C]/90 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  3D Face &amp; Smile Digital Planning
                </div>
              </div>
            </div>
          </div>

          {/* 4 Steps Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
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
                We believe exceptional dentistry relies on three essentials: meticulous clinical skill, state-of-the-art diagnostic technology, and a hospital setting that guarantees total safety and peace of mind.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/scanner_screen.jpg')}
                  alt="3D Dental Scanner Diagnostic Screen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                  Advanced 3D Optical Diagnostics
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
                Modern technology
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

      {/* 7. FOR ANXIOUS PATIENTS: SAFE, GENTLE HANDS (CAPTURA 12 & 13) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Dr Mark explaining jaw model to patient */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={getAssetUrl('clinic/dr_mark_patient_model.jpg')}
                  alt="Dr Mark Diacono explaining procedure gently to patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                  Unhurried Patient Care
                </div>
              </div>
            </div>

            {/* Exact Client Text */}
            <div className="lg:col-span-6">
              <div className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                FOR ANXIOUS PATIENTS
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E2B4C] mb-6 font-heading leading-tight">
                You’re in safe, <br />
                <span className="text-[#2BB4A7]">gentle hands</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-body">
                Dental anxiety is common, and you are not alone. We’re known for our calm, patient approach with nervous patients, and we offer sedation with a consultant anaesthetist, so you can receive the care you need feeling completely supported.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-body">
                Prefer to start with a relaxed chat away from the dental chair? We offer an informal pre-treatment consultation to ease you in, at your pace.
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
