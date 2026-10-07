import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Phone, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Smile, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Navigation,
  Check,
  User,
  Cpu,
  Heart,
  Users,
  Shield,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import { 
  getAssetUrl, 
  approvedServices, 
  cliniciansList, 
  feesCategories, 
  verifiedReviews, 
  faqsData,
  bookingTreatmentOptions
} from '@/data/clinicData';
import { ServiceItem, Clinician } from '@/types';

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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isHeroFullscreen, setIsHeroFullscreen] = useState(false);

  // Home Page Direct Form State
  const [homeForm, setHomeForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactPreference: 'WhatsApp' as 'WhatsApp' | 'Call Back' | 'Email',
    treatment: 'Initial Dental Consultation & Check-up',
    message: ''
  });
  const [homeFormSuccess, setHomeFormSuccess] = useState(false);
  const [homeFormError, setHomeFormError] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // 5 Leading Clinicians matching Frame 16s
  const featuredClinicians = cliniciansList.slice(0, 5);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

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
      setHomeFormError(true);
      return;
    }
    setHomeFormError(false);
    setHomeFormSuccess(true);
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-body">

      {/* 1. HERO SECTION: LUMINOUS & BRIGHT (MATCHING APPROVED FIGMA FRAME 01s) */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Approved Typography & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0E2B4C] leading-[1.08] mb-6 font-heading">
                Trusted by families <br />
                <span className="text-[#2BB4A7]">for over 25 years.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-body">
                From your family’s check-ups and children’s dentistry to smile design, implants and full-mouth reconstruction, one team plans your care together.
              </p>

              {/* CTA Pill Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer border border-[#0E2B4C] hover:scale-102"
                >
                  Book a consultation
                </button>

                <button
                  onClick={() => onNavigate('/treatments')}
                  className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-teal-50/50 text-[#0E2B4C] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 border border-teal-500/40 hover:border-[#2BB4A7] cursor-pointer shadow-2xs hover:scale-102"
                >
                  Smile design around your face
                </button>
              </div>

              {/* Sedation Alert Notice Card (Light Teal Container Matching Frame 01s) */}
              <div className="rounded-2xl bg-[#E8F8F6] border border-[#C5EDE8] p-4 sm:p-5 flex items-start gap-4 text-slate-800 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#2BB4A7]/15 border border-[#2BB4A7]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#2BB4A7]">
                  <Smile className="w-5 h-5 text-[#2BB4A7]" />
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="text-[#0E2B4C] font-bold">Nervous about the dentist?</strong> All our treatments are available under sedation, with a consultant anaesthetist, in a hospital setting.
                </div>
              </div>

            </div>

            {/* Right Column: Luminous, Crystal-Clear Hero Video Container */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] group">
                
                {/* Bright Clinic Video (No dark overlay) */}
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

                {/* Subtle Clean Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-[11px] font-bold uppercase tracking-wider border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2BB4A7] animate-pulse" />
                  <span>St. James Hospital • Sliema</span>
                </div>

                {/* Video Controls (Mute & Play/Pause) */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={toggleVideoPlay}
                    className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-md cursor-pointer border border-slate-200 transition-transform hover:scale-105"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={toggleVideoMute}
                    className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-md cursor-pointer border border-slate-200 transition-transform hover:scale-105"
                    aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

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
                <div className="text-base font-bold text-white group-hover:text-rose-300 transition-colors font-heading">
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

      {/* 3. FOUR CORE TREATMENT CATEGORIES (MATCHING APPROVED FIGMA FRAME 04s) */}
      <section id="services" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-widest mb-3">
              Comprehensive Care
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
              Our Dental Treatments
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto font-body">
              Specialists and general dentists working under one hospital roof, tailoring each treatment to your comfort.
            </p>
          </div>

          {/* 4 Cards Grid with Real Clinic Photos and Exact Copy from Frame 04s */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {approvedServices.map((svc) => (
              <div
                key={svc.id}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
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
                    <h3 className="text-xl font-bold text-[#0E2B4C] mb-3 font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-body">
                      {svc.summary}
                    </p>

                    {/* Clinicians Attribution */}
                    {svc.clinicians && (
                      <div className="pt-4 border-t border-slate-100 space-y-1 mb-4 text-[11px] text-slate-500 font-medium">
                        {svc.clinicians.map((c, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking({ treatment: svc.title })}
                    className="text-xs font-bold text-[#2BB4A7] hover:text-[#0E2B4C] transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 uppercase tracking-wider"
                  >
                    <span>Learn more →</span>
                  </button>
                  <button
                    onClick={() => onOpenBooking({ treatment: svc.title })}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-[#0E2B4C] text-slate-700 hover:text-white text-[11px] font-bold border border-slate-200 transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/treatments')}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0E2B4C] font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all cursor-pointer shadow-sm inline-flex items-center gap-2 hover:scale-102"
            >
              <span>Explore All Clinical Services & Specialties</span>
              <ArrowRight className="w-4 h-4 text-[#2BB4A7]" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. FOR ANXIOUS PATIENTS: SAFE, GENTLE HANDS (MATCHING APPROVED FIGMA FRAME 08s) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image: The Actual Waiting Room 2 Lounge (Frame 08s) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 relative aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={getAssetUrl('clinic/waiting_room_2.jpg')}
                  alt="DiU Clinic Malta Private Patient Waiting Lounge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                  Serene Hospital Waiting Lounge
                </div>
              </div>
            </div>

            {/* Right Text Content (Exact Text from Frame 08s) */}
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

      {/* 5. FOUR PILLARS OF EXCELLENCE (MATCHING APPROVED FIGMA FRAME 12s) */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: Modern technology */}
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

            {/* Pillar 2: Anxious-patient care */}
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

            {/* Pillar 3: Multidisciplinary team */}
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

            {/* Pillar 4: Hospital-level safety */}
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

      {/* 6. OUR CLINICIANS & TEAM (MATCHING APPROVED FIGMA FRAME 16s) */}
      <section id="our-team" className="py-20 lg:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                OUR CLINICIANS
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
                Our dentists <span className="text-[#2BB4A7]">&amp; hygienist</span>
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base max-w-md font-body">
              Specialists and general dentists working side by side, so every treatment is planned by the right person.
            </p>
          </div>

          {/* 5 Core Clinicians Horizontal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {featuredClinicians.map((person) => (
              <div
                key={person.id}
                className="rounded-3xl bg-[#F8FAFC] border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
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

                  <div className="p-4 sm:p-5">
                    <h3 className="text-base font-bold text-[#0E2B4C] font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
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

                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => onOpenBooking({ doctor: person.name, treatment: person.treatmentDefault })}
                    className="w-full py-2.5 rounded-full bg-white hover:bg-[#0E2B4C] text-[#0E2B4C] hover:text-white font-bold text-[11px] uppercase tracking-wider border border-slate-200 transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Medical Team Button */}
          <div className="text-center">
            <button
              onClick={() => onNavigate('/team')}
              className="px-8 sm:px-10 py-4 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-102 cursor-pointer inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#2BB4A7]" />
              <span>View Full Medical Team &amp; Specialists (19)</span>
              <ArrowRight className="w-4 h-4 text-[#2BB4A7]" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. AWARD-WINNING RESTORATIONS (BEFORE & AFTER SLIDER WITH ROUNDED CORNERS) */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              Real Clinical Restorations
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading">
              Award-Winning Restorations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-body max-w-xl mx-auto">
              Drag the center slider to inspect how our surgical and ceramic restorative team restored missing teeth to natural function.
            </p>
          </div>

          {/* Interactive Before & After Slider */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2BB4A7]">
                    Fixed Swiss Dental Implants Case
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#0E2B4C] font-heading">
                    3 Missing Teeth Restored to Fixed Perfection
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-50 text-[#0E2B4C] text-xs font-bold border border-teal-200 self-start sm:self-auto">
                  Immediate Ceramic Loading
                </span>
              </div>

              {/* Slider Viewport */}
              <div
                ref={sliderContainerRef}
                onMouseMove={(e) => handleSliderMove(e.clientX)}
                onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
                onTouchStart={(e) => handleSliderMove(e.touches[0].clientX)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] border border-slate-200 shadow-lg cursor-ew-resize select-none bg-slate-100 touch-none"
              >
                {/* AFTER: Base Image */}
                <img
                  src={getAssetUrl('dental_case_after.jpg')}
                  alt="After: Permanent Ceramic Dental Implant Restoration"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE: Clipped Layer */}
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
                  <div className="w-10 h-10 rounded-full bg-[#0E2B4C] text-white flex items-center justify-center shadow-xl border-2 border-white text-xs font-bold">
                    ⇄
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-xs font-bold border border-slate-200 shadow-md">
                  BEFORE: Missing Teeth
                </div>
                <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[#0E2B4C] text-white text-xs font-bold border border-blue-400/40 shadow-md">
                  AFTER: Fixed Teeth
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-[#0E2B4C]">Hospital Protocol:</strong> 3D CBCT guided implantology • German CEREC single-visit milling • St. James Hospital
                </div>
                <button
                  onClick={() => onOpenBooking({ treatment: 'Dental Implant & Oral Surgery' })}
                  className="px-6 py-2.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs shrink-0"
                >
                  Inquire About This Case
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. PATIENT INFORMATION (MATCHING APPROVED FIGMA FRAME 24s) */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
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
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
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
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
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
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
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
              className="p-7 rounded-3xl bg-rose-50/60 border border-rose-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-rose-950 mb-2 font-heading group-hover:text-rose-700 transition-colors">
                Dental emergencies
              </h3>
              <p className="text-xs text-rose-900 leading-relaxed font-body mb-2">
                During opening hours: <strong className="underline">2329 1029</strong> <br />
                WhatsApp: <strong className="underline">9999 1029</strong>
              </p>
              <p className="text-xs text-rose-800 font-body">
                Out of hours: <strong className="underline">2329 1000</strong>
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 9. HOW TO FIND US INSIDE ST. JAMES HOSPITAL (FRAME 28s) */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
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
              
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
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

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
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

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
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

      {/* 10. BOOK A CONSULTATION SECTION (MATCHING APPROVED FIGMA FRAME 28s & 32s) */}
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
                <div className="flex justify-between text-rose-300">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form (Frame 28s & 32s + Direct Form Submit) */}
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

                    {/* Interested in (General consultation default) */}
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

                    {homeFormError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Please enter your First Name and Phone Number.</span>
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
