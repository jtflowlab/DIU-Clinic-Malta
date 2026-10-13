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
  ChevronDown,
  AlertCircle,
  Navigation,
  Check,
  Cpu,
  Heart,
  Users,
  ShieldCheck,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
  Plus,
  Minus,
  HelpCircle
} from 'lucide-react';
import { 
  getAssetUrl, 
  approvedServices, 
  cliniciansList, 
  bookingTreatmentOptions,
  faqsData
} from '@/data/clinicData';
import { Clinician } from '@/types';

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

  // Selected bio modal state
  const [selectedBio, setSelectedBio] = useState<Clinician | null>(null);

  // Interactive FAQ Accordion State (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Home Page Direct Form State
  const [homeForm, setHomeForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactPreference: 'WhatsApp' as 'WhatsApp' | 'Call Back' | 'Email',
    treatment: 'Dental Implants & Oral Surgery',
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

  // Clinicians for Home: All 9 clinicians (specialists, general, hygienist)
  const homeClinicians = cliniciansList.filter(c => c.category !== 'support');

  // 1. Full-Bleed Video Hero Scroll-Driven Transformations
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end end"]
  });

  // Background Video Blur (smooth cinematic blur)
  const heroVideoBlur = useTransform(
    heroProgress,
    [0, 0.35],
    ["blur(0px)", "blur(16px)"]
  );

  // Background Video Scale (avoids blurred edge artifacts)
  const heroVideoScale = useTransform(
    heroProgress,
    [0, 0.35],
    [1, 1.08]
  );

  // Background Darkening Overlay for maximum typography readability
  const heroOverlayOpacity = useTransform(
    heroProgress,
    [0, 0.35],
    [0.2, 0.65]
  );

  // Stage 1: Initial State (Only CTA button "Book an appointment" visible at start)
  const initialCtaOpacity = useTransform(heroProgress, [0, 0.08], [1, 0]);
  const initialCtaY = useTransform(heroProgress, [0, 0.08], [0, -20]);
  const initialCtaScale = useTransform(heroProgress, [0, 0.08], [1, 0.92]);
  const initialCtaDisplay = useTransform(heroProgress, (v) => v > 0.09 ? 'none' : 'flex');

  // Stage 2: Hero letters appear smoothly in center as user scrolls
  const heroTextOpacity = useTransform(
    heroProgress,
    [0.08, 0.28, 0.8, 0.98],
    [0, 1, 1, 0]
  );
  const heroTextY = useTransform(
    heroProgress,
    [0.08, 0.28, 0.8, 1],
    [40, 0, 0, -60]
  );
  const heroTextScale = useTransform(
    heroProgress,
    [0.08, 0.28, 0.85, 1],
    [0.93, 1, 1, 0.96]
  );
  const heroTextDisplay = useTransform(heroProgress, (v) => (v < 0.07 || v > 0.99) ? 'none' : 'flex');

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

      {/* 1. HERO SECTION: FULL-BLEED VIDEO WITH SCROLL-REVEAL TEXT */}
      <div 
        id="hero" 
        ref={heroSectionRef} 
        className="relative w-full h-[220vh] bg-[#07192D]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Background Video Layer with Smooth Cinematic Blur on Scroll */}
          <motion.div 
            style={{ 
              filter: heroVideoBlur,
              scale: heroVideoScale
            }}
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[filter,transform]"
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
          </motion.div>

          {/* Dynamic Darkness Overlay */}
          <motion.div 
            style={{ opacity: heroOverlayOpacity }}
            className="absolute inset-0 bg-slate-950 pointer-events-none will-change-[opacity]"
          />

          {/* Ambient Lighting Accents */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#2BB4A7]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* STAGE 1 (Initial View at Scroll 0): Only Single Call to Action Button (Centered Bottom) */}
          <motion.div
            style={{
              opacity: initialCtaOpacity,
              y: initialCtaY,
              scale: initialCtaScale,
              display: initialCtaDisplay
            }}
            className="absolute bottom-12 sm:bottom-16 md:bottom-20 inset-x-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto"
          >
            <button
              onClick={() => onOpenBooking()}
              className="px-8 sm:px-11 py-4 sm:py-5 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-[0_12px_40px_rgba(43,180,167,0.55)] cursor-pointer border border-white/40 hover:scale-105 active:scale-95 flex items-center gap-3 backdrop-blur-md"
            >
              <Calendar className="w-5 h-5 text-white" />
              <span>Book an appointment</span>
            </button>

            {/* Subtle Scroll Hint */}
            <div 
              onClick={() => {
                if (heroSectionRef.current) {
                  const targetY = heroSectionRef.current.offsetTop + window.innerHeight * 0.65;
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              }}
              className="mt-4 sm:mt-5 flex flex-col items-center gap-1.5 text-white/80 animate-pulse text-xs tracking-widest uppercase font-semibold cursor-pointer hover:text-white transition-colors"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4 text-[#2BB4A7] animate-bounce" />
            </div>
          </motion.div>

          {/* STAGE 2 (Scroll Reveal): Hero letters appear in center when user scrolls */}
          <motion.div
            style={{
              opacity: heroTextOpacity,
              y: heroTextY,
              scale: heroTextScale,
              display: heroTextDisplay
            }}
            className="absolute z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center"
          >
            {/* Location & DSD Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[#0E2B4C] text-[11px] font-bold uppercase tracking-widest shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2BB4A7] animate-pulse" />
                <span>LOCATED @ ST JAMES HOSPITAL, SLIEMA</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/30 to-amber-500/25 border border-amber-300/60 text-amber-200 text-[11px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-md">
                <span className="text-amber-300">★</span>
                <span>Digital Smile Design Signature Centre</span>
              </div>
            </div>

            {/* Main Headline Centered - "Smile" in the center */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6 font-heading drop-shadow-xl text-center">
              One Team for Every <br />
              <span className="text-[#2BB4A7] drop-shadow-xl inline-block my-1">Smile</span> <br />
              <span className="text-white drop-shadow-xl">Under One Roof.</span>
            </h1>

            {/* Reassuring Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-body mb-8 drop-shadow">
              Specialist oral surgery, Digital Smile Design, and gentle sedation in a calm hospital setting At St James Hospital, Sliema.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 sm:px-9 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer border border-[#2BB4A7] hover:scale-105 active:scale-95"
              >
                Book a consultation
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('dsd-signature');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onOpenBooking({ treatment: 'Digital Smile Design' });
                  }
                }}
                className="px-7 sm:px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-white/30 cursor-pointer shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Experience Your Future Smile</span>
                <span>→</span>
              </button>
            </div>

            {/* Sedation Hospital Notice */}
            <div className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 flex items-center gap-2.5 text-slate-200 text-xs shadow-md">
              <Smile className="w-4 h-4 text-[#2BB4A7] shrink-0" />
              <span>
                <strong className="text-white font-semibold">Nervous about the dentist?</strong> All treatments available under sedation with a Consultant Anaesthetist.
              </span>
            </div>
          </motion.div>

          {/* Discreet Media Controls (Bottom Right) */}
          <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
            <button
              onClick={toggleVideoPlay}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-[#0E2B4C] shadow-lg backdrop-blur-md cursor-pointer border border-white/50 transition-transform hover:scale-110 active:scale-95"
              aria-label={isVideoPlaying ? "Pause video" : "Play video"}
            >
              {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <button
              onClick={toggleVideoMute}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-[#0E2B4C] shadow-lg backdrop-blur-md cursor-pointer border border-white/50 transition-transform hover:scale-110 active:scale-95"
              aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
            >
              {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. SUMMARY BAR (Worksheet #6: "Book an appointment") */}
      <section className="bg-[#0E2B4C] text-white py-6 border-b border-[#07192d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Column 1: Book an appointment */}
            <div 
              onClick={() => onOpenBooking()}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-[#2BB4A7]/40 bg-white/10 flex items-center justify-center shrink-0 group-hover:border-[#2BB4A7] transition-colors">
                <Calendar className="w-5 h-5 text-[#2BB4A7]" />
              </div>
              <div>
                <div className="text-base font-bold text-white group-hover:text-[#2BB4A7] transition-colors font-heading">
                  Book an appointment
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

      {/* 3. A WARM WELCOME FROM DR MARK & DR SUSANNA (Worksheet #7, #8, #9) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Founders Photo - White banner removed (#7) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] sm:aspect-[16/12] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/founders_clean_linen.jpg')}
                  alt="Dr Mark Diacono and Dr Susanna Diacono - Founders of Dental and Implantology Unit"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Column with Exact Label (#8) & Credentials (#9) */}
            <div className="lg:col-span-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                A WARM WELCOME FROM DR MARK &amp; DR SUSANNA
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] mb-6 font-heading leading-tight">
                Every smile <span className="text-[#2BB4A7]">has a story.</span>
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-body mb-8">
                <p>
                  We founded the Dental and Implantology Unit in 1999 with a simple conviction: patients deserve unhurried, thoughtful dental care from clinicians who take the time to listen.
                </p>
                <p>
                  Being based at St James Hospital allows us to offer something rare in private practice: a complete multidisciplinary team collaborating on complex cases, access to hospital-level theatre and sedation facilities, and the reassurance of an established medical environment.
                </p>
                <p>
                  Whether you’re visiting for a regular check-up or embarking on a full smile reconstruction, you’re in caring, experienced hands.
                </p>
              </div>

              {/* Exact Credentials as Worksheet #9 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <div className="font-bold text-[#0E2B4C] text-sm font-heading">Dr Mark Diacono</div>
                  <div className="text-xs text-slate-500 leading-snug">
                    RGN, BChD Hons (Leeds), FDS RCPS (Glasgow) <br />
                    <span className="text-[#2BB4A7] font-semibold">Specialist in Oral Surgery</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[#0E2B4C] text-sm font-heading">Dr Susanna Diacono</div>
                  <div className="text-xs text-slate-500 leading-snug">
                    DDS (Gothenburg), LDS (Sweden), M.Dent.Sci Restorative (Leeds) <br />
                    <span className="text-[#2BB4A7] font-semibold">Restorative Dentist, Digital Smile Design</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. OUR DENTAL TREATMENTS (High Contrast Grid) */}
      <section 
        id="services" 
        className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-7xl mx-auto w-full mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-widest mb-3">
                Comprehensive Care
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
                Our Dental Treatments
              </h2>
              {/* Exact Intro Text Worksheet #10 */}
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl font-body">
                Specialist and general dentist working as a team, tailoring each treatment to your needs.
              </p>
            </div>

            {/* Clean View all treatments link (#12) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/treatments')}
                className="px-6 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md hover:scale-102"
              >
                <span>View all treatments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* High Contrast 4-Card Grid - All treatments immediately visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {approvedServices.map((svc) => (
              <div
                key={svc.id}
                className="rounded-3xl bg-white border-2 border-slate-200/90 hover:border-[#2BB4A7] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
              >
                <div>
                  {/* High Contrast Gradient Top Accent */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#0E2B4C] via-[#2BB4A7] to-[#0E2B4C]" />

                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(svc.image)}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3.5 py-1.5 rounded-full bg-[#0E2B4C]/95 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-[#2BB4A7]/50 shadow-md">
                      [ {svc.num} ]
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0E2B4C] mb-3 font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 font-body">
                      {svc.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <button
                    onClick={() => onNavigate('/treatments')}
                    className="text-xs sm:text-sm font-black text-[#0E2B4C] hover:text-[#2BB4A7] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 uppercase tracking-wider"
                  >
                    <span>Learn more →</span>
                  </button>
                  <button
                    onClick={() => onOpenBooking({ treatment: svc.title })}
                    className="px-5 py-2.5 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    Enquire
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. DSD SIGNATURE TREATMENT: BEFORE & AFTER (Worksheet #13, #14) */}
      <section id="dsd-signature" className="py-20 lg:py-28 bg-[#0E2B4C] text-white relative overflow-hidden border-b border-[#07192D]">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2BB4A7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Signature Badge */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-400/60 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-950/20 backdrop-blur-md mb-6">
              <span className="text-amber-300 text-base">★</span>
              <span>SIGNATURE FEATURE SERVICE · DIGITAL SMILE DESIGN</span>
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

            {/* View Mode Switcher */}
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
                  
                  {/* AFTER Image */}
                  <img
                    src={getAssetUrl('clinic/dsd_after_patient.jpg')}
                    alt="After: Radiant transformed smile via Digital Smile Design"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  />
                  
                  {/* BEFORE Image */}
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
                      Before: Initial Presentation
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-body">
                      Patient presented with uneven margins, wear, and aesthetic disharmony.
                    </p>
                  </div>
                </div>

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
                      Custom ceramic restorations restored natural luminosity, lip support, and harmonious facial balance.
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
                  ★ Facially Driven Treatment
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
                    <span>Physical trial smile mockup worn in your mouth before any permanent work starts</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>High-precision ceramic restorations matching your natural dynamics</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Joint surgical-restorative planning when implants are required</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Digital Smile Design' })}
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

          {/* 4 Steps Process Cards (Worksheet #14 Exact Texts) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {[
              { 
                num: "01", 
                title: "Facial Images and Dental Scan", 
                desc: "Digital intraoral scan and high-definition facial photography with appropriate x-rays captures your natural smile dynamics." 
              },
              { 
                num: "02", 
                title: "Digital Aesthetic Simulation", 
                desc: "Using advanced DSD software, we design the ideal length, width, and contours suited to your face." 
              },
              { 
                num: "03", 
                title: "Realistic Clinical Mock-up", 
                desc: "A physical trial smile is placed directly in your mouth so you can test drive the look." 
              },
              { 
                num: "04", 
                title: "Your New Smile", 
                desc: "Once you approved the design, your veneers, crowns or bridges are crafted to match it and carefully fitted." 
              }
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

      {/* 6. WHY PATIENTS CHOOSE DIU (Worksheet #15, #16) */}
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
              {/* Exact paragraph Worksheet #15 */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                We believe exceptional dentistry relies on meticulous clinical skills and advanced diagnostic technology. Every treatment is planned with precision and delivered with personal care.
              </p>
            </div>

            {/* Photo - White banner removed (#15) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={getAssetUrl('patient_elena.jpg')}
                  alt="Confident, natural smile results achieved at DiU Clinic Malta"
                  className="w-full h-full object-cover object-top"
                />
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

            {/* Hospital-level safety card exact Worksheet #16 (Shield with tick + exact text) */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-2 font-heading">
                Hospital–level safety
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                Trusted since 1999, more than 25 years of high quality care with returning patients.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. YOU ARE IN SAFE HANDS (Worksheet #17) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Reassuring Clinician Photo - White banner removed (#17) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={getAssetUrl('clinic/dr_mark_explaining_treatment_female_pt.jpg')}
                  alt="Dr. Mark Diacono explaining treatment plan gently and reassuringly to patient"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Exact Reassurance Copy (#17) */}
            <div className="lg:col-span-6">
              <div className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                SAFETY &amp; COMFORT
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E2B4C] mb-6 font-heading leading-tight">
                You are in <br />
                <span className="text-[#2BB4A7]">safe hands</span>
              </h2>

              {/* Exact first paragraph #17 */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-body">
                Dental anxiety, or phobia is common, and many people avoid the dentist because of it, often leading to gum disease, infection and more complex treatment needs. Modern dentistry offers many ways to make your visit calm and comfortable.
              </p>

              {/* Second paragraph kept #17 */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-body">
                Prefer to start with a relaxed conversation away from the dental chair? We offer an informal pre-treatment consultation to understand your feelings, answer questions, and plan treatment entirely at your pace.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenBooking({ treatment: 'IV Sedation' })}
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

      {/* 8. OUR DENTISTS AND HYGIENIST (Worksheet #18, #19, #20) */}
      <section 
        id="our-team" 
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                OUR CLINICIANS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
                Our dentists <span className="text-[#2BB4A7]">&amp; hygienist</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-md font-body">
                Specialists and general dentists working side by side, so every treatment is planned by the right person.
              </p>
            </div>

            {/* View Full Team link */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/team')}
                className="px-6 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md hover:scale-102"
              >
                <span>VIEW FULL TEAM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Clean Responsive Grid - All clinicians visible without horizontal scroll lock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            {homeClinicians.map((person) => (
              <div
                key={person.id}
                className="rounded-3xl bg-[#F8FAFC] border-2 border-slate-200/90 hover:border-[#2BB4A7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Centered photo */}
                  <div className="relative aspect-[4/4] overflow-hidden bg-slate-200 flex items-center justify-center">
                    <img
                      src={getAssetUrl(person.photo)}
                      alt={person.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#0E2B4C] font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                      {person.name}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
                      {person.qualifications}
                    </div>
                    <div className="text-xs font-bold text-[#2BB4A7] mt-2 font-heading">
                      {person.role}
                    </div>
                  </div>
                </div>

                {/* Read bio button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedBio(person)}
                    className="w-full py-2.5 rounded-full bg-white hover:bg-[#0E2B4C] text-[#0E2B4C] hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors cursor-pointer text-center"
                  >
                    Read bio
                  </button>
                </div>
              </div>
            ))}

            {/* Final Team Teaser Card */}
            <div className="rounded-3xl bg-[#0E2B4C] text-white p-7 flex flex-col justify-between shadow-xl min-h-[360px]">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#2BB4A7] text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                  OUR TEAM
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 leading-snug">
                  Meet the People Behind Your Smile
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  Specialists and general dentists working with a fantastic support team.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/team')}
                className="w-full py-3.5 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
              >
                <Users className="w-4 h-4" />
                <span>VIEW FULL TEAM</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Individual Clinician Biography Modal on Home */}
      {selectedBio && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedBio(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBio(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-48 aspect-[4/4] rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm flex items-center justify-center">
                <img
                  src={getAssetUrl(selectedBio.photo)}
                  alt={selectedBio.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-[10px] font-bold uppercase tracking-wider mb-2">
                  {selectedBio.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mb-1">
                  {selectedBio.name}
                </h3>
                <div className="text-xs font-bold text-[#2BB4A7] uppercase tracking-wider mb-2 font-heading">
                  {selectedBio.role}
                </div>
                <div className="text-xs text-slate-500 font-semibold mb-4 pb-3 border-b border-slate-100">
                  {selectedBio.qualifications}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-body mb-6">
                  {selectedBio.bio}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const person = selectedBio;
                      setSelectedBio(null);
                      onOpenBooking({
                        doctor: person.name,
                        treatment: person.treatmentDefault
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Book Consultation with {selectedBio.name.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedBio(null)}
                    className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. FREQUENTLY ASKED QUESTIONS (High-Contrast Interactive Section) */}
      <section id="faq" className="py-20 lg:py-28 bg-[#0B1E36] text-white relative overflow-hidden border-b border-[#07192D]">
        
        {/* Ambient glow effects for luxury contrast */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2BB4A7]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-[#2BB4A7] text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#2BB4A7]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading leading-tight mb-4">
              Everything You Need <span className="text-[#2BB4A7]">to Know</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body">
              Clear answers regarding our treatments, single-visit ceramics, sedation options, fees, and hospital location.
            </p>
          </div>

          {/* Interactive Accordion List */}
          <div className="space-y-4 mb-14">
            {[
              {
                q: "Can I get crowns, veneers, or teeth restorations in a single visit?",
                a: "Yes. With our in-house CEREC CAD/CAM 3D scanning and precision milling unit, we can digitally design, craft, and fit permanent ceramic crowns, onlays, and inlays in about an hour—meaning zero uncomfortable putty impressions and no need for temporary teeth."
              },
              {
                q: "How does IV sedation work for nervous or anxious patients?",
                a: "We offer conscious Intravenous (IV) sedation administered and continuously monitored by a consultant hospital anaesthetist. You will feel peaceful and completely relaxed throughout treatment, with virtually no memory of the procedure afterwards."
              },
              {
                q: "What are the benefits of being located inside St James Hospital?",
                a: "Our clinic operates within St James Hospital in Sliema, providing hospital-grade sterility, access to medical imaging (low-dose 3D CBCT scans), multidisciplinary surgical support, and hospital theatre admission if required, with convenient parking nearby at Victoria Hotel."
              },
              {
                q: "What is Digital Smile Design (DSD) and can I preview my smile before treatment?",
                a: "Digital Smile Design is our signature facially guided aesthetic protocol. We record high-resolution facial dynamics and 3D intraoral scans to create a digital simulation and a physical 3D mock-up you can test drive in your mouth before any permanent treatment begins."
              },
              {
                q: "How transparent are treatment fees and do you work with private health insurance?",
                a: "We believe in honest, upfront pricing. Every patient receives a comprehensive written treatment plan with transparent costs before treatment begins. We assist with private medical insurance claims in Malta and internationally to help process your claim documentation."
              },
              {
                q: "What should I do in case of a dental emergency or severe toothache?",
                a: "We reserve priority slots daily for emergencies such as severe toothache, infections, trauma, or broken teeth. You can reach our clinic reception during opening hours at (+356) 2329 1029 or message us on WhatsApp at (+356) 9999 1029. Out of hours, St James Hospital provides 24/7 medical emergency admission."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                    isOpen 
                      ? 'bg-[#132C4A] border-[#2BB4A7]/60 shadow-xl shadow-teal-950/20' 
                      : 'bg-[#0E243E] border-slate-700/80 hover:border-teal-500/40 hover:bg-[#122a46]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white font-heading leading-snug">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#2BB4A7] text-[#0E2B4C] rotate-180' : 'bg-white/10 text-[#2BB4A7]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-200 text-sm sm:text-base leading-relaxed font-body border-t border-slate-700/50 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Consultation & WhatsApp Reassurance Banner inside FAQ */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#113155] via-[#153a63] to-[#113155] border border-teal-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1.5">
                Still have questions about your dental care?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                Our patient care team at St James Hospital is always available to assist with treatment options, costs, or urgent appointments.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://wa.me/35699991029?text=Hello%20DiU%20Clinic%2C%20I%20have%20a%20question%20about%20your%20treatments."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md no-underline flex items-center gap-2 hover:scale-105"
              >
                <span>Ask on WhatsApp</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
              >
                Book Consultation
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 10. HOW TO FIND US AT ST JAMES HOSPITAL */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#F8FAFC] p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2BB4A7]">
                  Location Guide • St James Hospital Sliema
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mt-1">
                  How to Find DiU Clinic on Arrival
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Parking: the nearest car park is at the Victoria Hotel, close by.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Saint+James+Hospital+George+Borg+Olivier+Street+Sliema+Malta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-colors no-underline flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs hover:scale-102"
              >
                <Navigation className="w-4 h-4" />
                <span>Get directions in Google Maps ↗</span>
              </a>
            </div>

            {/* Embedded Google Maps with Clickable Direct Link Overlay */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Saint+James+Hospital+George+Borg+Olivier+Street+Sliema+Malta"
              target="_blank"
              rel="noopener noreferrer"
              title="Open DiU Clinic at Saint James Hospital Sliema on Google Maps"
              className="relative block w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-md mb-8 bg-slate-100 group cursor-pointer"
            >
              <iframe
                title="DiU Clinic Location at St James Hospital Sliema"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.163456209865!2d14.500222!3d35.912639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4539655f4621%3A0xd677e1919efec5cf!2sSaint%20James%20Hospital%20Sliema!5e0!3m2!1sen!2smt!4v1710000000000!5m2!1sen!2smt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full pointer-events-none"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-slate-900/10 transition-colors flex items-end justify-end p-4">
                <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-bold uppercase tracking-wider shadow-md border border-slate-200 group-hover:bg-[#2BB4A7] group-hover:text-white transition-all flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps ↗</span>
                </span>
              </div>
            </a>

            {/* 3 Steps Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl('clinic/st_james_main_entrance.jpg')}
                    alt="1. Main entrance St James Hospital Sliema"
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
                  <div className="text-xs text-slate-600 mt-1">Take the main elevators down to the Lower Ground floor (LG).</div>
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

      {/* 11. INSURANCE AND CLAIMS SECTION (Worksheet #96: Uses owner's text) */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0E2B4C] via-[#123961] to-[#0E2B4C] text-white border-b border-[#07192D] shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#2BB4A7]/20 border border-[#2BB4A7]/40 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                INSURANCE &amp; CLAIMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3">
                Insurance and claims
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-body mb-3">
                If you have private health insurance, check whether it includes dental cover. We work with the major insurers in Malta and overseas, and we're happy to help with your claim.
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-body">
                Oral surgery procedures, such as wisdom tooth removal, biopsies and surgical removal of roots, are often covered by private health insurance even when routine dental care is not.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigate('/prices')}
                className="px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                View Fees &amp; Prices →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. BOOK A CONSULTATION SECTION (Worksheet #36, #37: email appointments@dentalunitmalta.com) */}
      <section id="contact-booking" className="py-20 lg:py-28 bg-[#0E2B4C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact Info */}
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
                  <a href="mailto:appointments@dentalunitmalta.com" className="text-white hover:text-[#2BB4A7] font-semibold text-base transition-colors underline">
                    appointments@dentalunitmalta.com
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

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200">
                
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mb-1">
                  Book an appointment
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
                      Thank you, {homeForm.firstName}. Our coordinator will contact you via {homeForm.contactPreference} shortly.
                    </p>
                    <button
                      onClick={() => setHomeFormSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-[#0E2B4C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHomeFormSubmit} className="space-y-4">
                    
                    {/* First & Last Name */}
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

                    {/* Interested in (10 Price options) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Interested in Treatment *
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

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Message (Optional)
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
                          I accept the <strong className="text-[#0E2B4C] underline">Terms &amp; Conditions</strong> and consent to DiU Clinic contacting me regarding this appointment request.
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
                        className="py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-emerald-600/30 flex items-center justify-center gap-2"
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
export default HomePage;
