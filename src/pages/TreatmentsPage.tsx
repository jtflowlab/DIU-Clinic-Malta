import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Phone, 
  ChevronRight
} from 'lucide-react';
import { getAssetUrl } from '@/data/clinicData';

interface TreatmentsPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

// WhatsApp Icon SVG
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Hero (Worksheet #29) */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb: "Home > Treatments" */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#0E2B4C] cursor-pointer bg-transparent border-none p-0"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0E2B4C] font-bold">Treatments</span>
          </div>

          <div className="max-w-3xl">
            {/* Label exact: "ALL YOUR DENTAL CARE IN ONE PLACE" */}
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              ALL YOUR DENTAL CARE IN ONE PLACE
            </span>
            {/* Heading exact: "Everything your Smile needs, planned by one team" */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E2B4C] font-heading mb-6 leading-tight">
              Everything your Smile needs, <br />
              <span className="text-[#2BB4A7]">planned by one team</span>
            </h1>
            {/* Intro exact */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              From family check-ups and children's dentistry to implants, full mouth reconstruction and smile design, our dentist and specialists work together to plan the right treatment for you.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Main Treatments Deep-Dive (4 Sections) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          
          {/* ---------------- SECTION 1: IMPLANTS & ORAL SURGERY (#30) ---------------- */}
          <div
            id="implants"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-sm"
          >
            {/* Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/scanning_in_surgery.jpg')}
                  alt="Dental Implants & Oral Surgery"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-6">
              <div className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                IMPLANTS &amp; ORAL SURGERY
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-4">
                Dental Implants &amp; Oral Surgery
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                Whether you need wisdom teeth removal or a complete new smile, our oral surgery and prosthetic team plan and carry out your care together.
              </p>

              {/* Sub heading: Dental Implants */}
              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E2B4C] mb-2.5">
                  Dental Implants
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Single-tooth implant</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Full-mouth reconstruction and immediate loading</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Crowns and bridges designed and made by our prosthetic team</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>3D CBCT, dental scans and Digital Smile Design for precise planning.</span>
                  </div>
                </div>
              </div>

              {/* Sub heading: Oral surgery */}
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E2B4C] mb-2.5">
                  Oral surgery
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Wisdom teeth removal</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Simple and surgical extractions</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Bone grafting and sinus lifts</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>All treatments available under sedation.</span>
                  </div>
                </div>
              </div>

              {/* Clinicians exact */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-[#0E2B4C] uppercase tracking-wider text-[11px] mb-1">
                  Leading Clinicians:
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Mark Diacono, Oral Surgeon</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Prof. Nikolai Attard, Prosthodontist</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Fokion Iatridis, Prosthodontist</span>
                </div>
              </div>

              {/* Action Buttons: Book a consultation, Enquire, WhatsApp */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Dental Implants & Oral Surgery' })}
                  className="px-6 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a consultation</span>
                </button>
                <button
                  onClick={() => onOpenBooking({ treatment: 'Dental Implants & Oral Surgery' })}
                  className="px-5 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Enquire</span>
                </button>
                <a
                  href="https://wa.me/35699991029?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Dental%20Implants%20%26%20Oral%20Surgery."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all no-underline flex items-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 2: DIGITAL SMILE DESIGN (#31) ---------------- */}
          <div
            id="dsd"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-sm"
          >
            {/* Image */}
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/md_3d_scanner_and_pt.jpg')}
                  alt="Digital Smile Design"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-6 lg:order-1">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                SIGNATURE TREATMENT
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-4">
                Digital Smile Design
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                Your new smile, designed around your face. We plan your smile on screen, then make a mock-up in your mouth so you can test drive the look before treatment begins.
              </p>

              {/* Bullets */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Designed around your face, lips and smile dynamics</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Test drive your new smile before treatment begins</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Same day all ceramic crowns, inlays and onlays</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Tooth coloured natural looking composite bonding</span>
                </div>
              </div>

              {/* Clinicians exact */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-[#0E2B4C] uppercase tracking-wider text-[11px] mb-1">
                  Leading Clinicians:
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Susanna Diacono (Restorative Dentist with DSD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Laura Cuschieri (composite bonding)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Digital Smile Design' })}
                  className="px-6 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a smile design consultation</span>
                </button>
                <button
                  onClick={() => onOpenBooking({ treatment: 'Digital Smile Design' })}
                  className="px-5 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Enquire</span>
                </button>
                <a
                  href="https://wa.me/35699991029?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Digital%20Smile%20Design."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all no-underline flex items-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 3: FAMILY & GENERAL DENTISTRY (#32) ---------------- */}
          <div
            id="family"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-sm"
          >
            {/* Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/examination_for_fading_background.jpg')}
                  alt="Family & General Dentistry"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-6">
              <div className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                FAMILY &amp; GENERAL DENTISTRY
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-4">
                Family &amp; General Dentistry
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                Everyday care to keep teeth and gums healthy at every age, from regular check-ups and hygiene visits to fillings and gentle dentistry for children, in a calm, welcoming setting.
              </p>

              {/* Bullets exact */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Regular check-ups and thorough examinations</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Hygiene visit and gum care</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Tooth coloured fillings</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Gentle, friendly dentistry for children</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Same day emergency appointment</span>
                </div>
              </div>

              {/* YOUR DENTAL TEAM exact */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-[#0E2B4C] uppercase tracking-wider text-[11px] mb-1">
                  YOUR DENTAL TEAM:
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Michael Rafferty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Lisa Carabott</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Dr Francesca Schembri</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Mary-Jane Galea (Dental Hygienist)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'General Dentistry' })}
                  className="px-6 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a family check-up</span>
                </button>
                <button
                  onClick={() => onOpenBooking({ treatment: 'General Dentistry' })}
                  className="px-5 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Enquire</span>
                </button>
                <a
                  href="https://wa.me/35699991029?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Family%20%26%20General%20Dentistry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all no-underline flex items-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 4: GENTLE CARE FOR NERVOUS PATIENTS (#33) ---------------- */}
          <div
            id="anxious"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-sm"
          >
            {/* Image */}
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={getAssetUrl('clinic/waiting_room_2.jpg')}
                  alt="Gentle Care for Nervous Patients"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-6 lg:order-1">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
                IV SEDATION
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-4">
                Gentle Care for Nervous Patients
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                Feeling anxious about the dentist is common, and you are not alone. We offer IV sedation given by a consultant anaesthetist, so you can have the treatment you need while feeling calm and cared for.
              </p>

              {/* Bullets exact */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Sedation given and monitored by a consultant anaesthetist</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>A calm, deeply relaxed state throughout treatment</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Little or no memory of the procedure afterwards</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Available for both routine and complex treatments</span>
                </div>
              </div>

              {/* YOUR CARE TEAM exact */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-[#0E2B4C] uppercase tracking-wider text-[11px] mb-1">
                  YOUR CARE TEAM:
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                  <span>Your dentist, together with our consultant anaesthetist</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'IV Sedation' })}
                  className="px-6 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a sedation consultation</span>
                </button>
                <button
                  onClick={() => onOpenBooking({ treatment: 'IV Sedation' })}
                  className="px-5 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Enquire</span>
                </button>
                <a
                  href="https://wa.me/35699991029?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20IV%20Sedation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all no-underline flex items-center gap-2 shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default TreatmentsPage;
