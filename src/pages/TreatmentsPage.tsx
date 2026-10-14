import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  ChevronRight
} from 'lucide-react';
import { getAssetUrl } from '@/data/clinicData';

interface TreatmentsPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border-2 border-slate-200/90 hover:border-[#2BB4A7] shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Gradient Accent Bar */}
            <div className="col-span-12 h-1.5 w-full bg-gradient-to-r from-[#0E2B4C] via-[#2BB4A7] to-[#0E2B4C] rounded-full -mb-4 lg:-mb-8" />

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
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#0E2B4C] text-white text-xs sm:text-sm font-black uppercase tracking-wider mb-3.5 border border-[#2BB4A7]/40 shadow-xs">
                IMPLANTS &amp; ORAL SURGERY
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2B4C] font-heading mb-4">
                Dental Implants &amp; Oral Surgery
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-body">
                Whether you need wisdom teeth removal or a complete new smile, our oral surgery and prosthetic team plan and carry out your care together.
              </p>

              {/* Sub heading: Dental Implants */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0E2B4C] mb-3">
                  Dental Implants
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Single-tooth implant</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Full-mouth reconstruction and immediate loading</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Crowns and bridges designed and made by our prosthetic team</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>3D CBCT, dental scans and Digital Smile Design for precise planning.</span>
                  </div>
                </div>
              </div>

              {/* Sub heading: Oral surgery */}
              <div className="mb-8">
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0E2B4C] mb-3">
                  Oral surgery
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Wisdom teeth removal</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Simple and surgical extractions</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Bone grafting and sinus lifts</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>All treatments available under sedation.</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Book a consultation (triggers booking modal) */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Dental Implants & Oral Surgery' })}
                  className="px-8 py-4 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a consultation</span>
                </button>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 2: DIGITAL SMILE DESIGN (#31) ---------------- */}
          <div
            id="dsd"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border-2 border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Gradient Accent Bar */}
            <div className="col-span-12 h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#2BB4A7] to-amber-500 rounded-full -mb-4 lg:-mb-8" />

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
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider mb-3.5 border border-amber-400 shadow-xs">
                SIGNATURE TREATMENT
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2B4C] font-heading mb-4">
                Digital Smile Design
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-body">
                Your new smile, designed around your face. We plan your smile on screen, then make a mock-up in your mouth so you can test drive the look before treatment begins.
              </p>

              {/* Bullets */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Designed around your face, lips and smile dynamics</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Test drive your new smile before treatment begins</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Same day all ceramic crowns, inlays and onlays</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Tooth coloured natural looking composite bonding</span>
                </div>
              </div>

              {/* Action Button: Book a smile design consultation (triggers booking modal) */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'Digital Smile Design' })}
                  className="px-8 py-4 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a smile design consultation</span>
                </button>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 3: FAMILY & GENERAL DENTISTRY (#32) ---------------- */}
          <div
            id="family"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border-2 border-slate-200/90 hover:border-[#2BB4A7] shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Gradient Accent Bar */}
            <div className="col-span-12 h-1.5 w-full bg-gradient-to-r from-[#0E2B4C] via-[#2BB4A7] to-[#0E2B4C] rounded-full -mb-4 lg:-mb-8" />

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
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#0E2B4C] text-white text-xs sm:text-sm font-black uppercase tracking-wider mb-3.5 border border-[#2BB4A7]/40 shadow-xs">
                FAMILY &amp; GENERAL DENTISTRY
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2B4C] font-heading mb-4">
                Family &amp; General Dentistry
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-body">
                Everyday care to keep teeth and gums healthy at every age, from regular check-ups and hygiene visits to fillings and gentle dentistry for children, in a calm, welcoming setting.
              </p>

              {/* Bullets exact */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Regular check-ups and thorough examinations</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Hygiene visit and gum care</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Tooth coloured fillings</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Gentle, friendly dentistry for children</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Same day emergency appointment</span>
                </div>
              </div>

              {/* Action Button: Book a family check-up */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'General Dentistry' })}
                  className="px-8 py-4 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a family check-up</span>
                </button>
              </div>

            </div>
          </div>

          {/* ---------------- SECTION 4: GENTLE CARE FOR NERVOUS PATIENTS (#33) ---------------- */}
          <div
            id="anxious"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border-2 border-slate-200/90 hover:border-indigo-400 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Gradient Accent Bar */}
            <div className="col-span-12 h-1.5 w-full bg-gradient-to-r from-indigo-600 via-[#2BB4A7] to-indigo-600 rounded-full -mb-4 lg:-mb-8" />

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
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-900 text-white text-xs sm:text-sm font-black uppercase tracking-wider mb-3.5 border border-indigo-400/40 shadow-xs">
                IV SEDATION
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2B4C] font-heading mb-4">
                Gentle Care for Nervous Patients
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-body">
                Feeling anxious about the dentist is common, and you are not alone. We offer IV sedation given by a consultant anaesthetist, so you can have the treatment you need while feeling calm and cared for.
              </p>

              {/* Bullets exact */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Sedation given and monitored by a consultant anaesthetist</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>A calm, deeply relaxed state throughout treatment</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Little or no memory of the procedure afterwards</span>
                </div>
                <div className="flex items-start gap-3 text-sm sm:text-base text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2BB4A7] shrink-0 mt-0.5" />
                  <span>Available for both routine and complex treatments</span>
                </div>
              </div>

              {/* Action Button: Book a sedation consultation */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBooking({ treatment: 'IV Sedation' })}
                  className="px-8 py-4 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2 hover:scale-102"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Book a sedation consultation</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
export default TreatmentsPage;
