import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Smile, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  User,
  ChevronRight,
  Building2
} from 'lucide-react';
import { approvedServices, getAssetUrl } from '@/data/clinicData';
import { ServiceItem } from '@/types';

interface TreatmentsPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Hero */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#0E2B4C] cursor-pointer bg-transparent border-none p-0"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0E2B4C] font-bold">Treatments &amp; Clinical Specialties</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Hospital Dental Care
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E2B4C] font-heading mb-6 leading-tight">
              Clinical Treatments &amp; <span className="text-[#2BB4A7]">Advanced Procedures</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              Operating within the sterile theatre facilities of St. James Hospital in Sliema, our multidisciplinary team plans every detail together — from routine family dental check-ups to complex full-arch reconstructions and cosmetic smile designs.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Main Treatments Deep-Dive */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          
          {approvedServices.map((svc, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={svc.id}
                id={svc.id.toLowerCase()}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-sm`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/11] bg-slate-100">
                    <img
                      src={getAssetUrl(svc.image)}
                      alt={svc.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-xs font-extrabold uppercase tracking-wider border border-slate-200 shadow-xs">
                      [ Specialty 0{index + 1} ]
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                    {svc.tagline}
                  </div>
                  
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-4">
                    {svc.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-body">
                    {svc.desc}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 mb-8">
                    {svc.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Attributed Clinicians */}
                  {svc.clinicians && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-xs text-slate-600 space-y-1">
                      <div className="font-bold text-[#0E2B4C] uppercase tracking-wider text-[11px] mb-1">
                        Leading Clinicians:
                      </div>
                      {svc.clinicians.map((c, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenBooking({ treatment: svc.title })}
                      className="px-6 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-2 hover:scale-102"
                    >
                      <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                      <span>Book Consultation for {svc.title.split('&')[0]}</span>
                    </button>
                    <a
                      href="tel:35623291029"
                      className="px-5 py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all no-underline flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#2BB4A7]" />
                      <span>Inquire: 2329 1029</span>
                    </a>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* 3. Hospital Safety Banner */}
      <section className="py-16 bg-[#0E2B4C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2BB4A7]">
              Accredited Clinical Safety
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1">
              Hospital Operating Standards for Every Patient
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-xl font-body">
              Every procedure is conducted under strict hospital hygiene protocols inside St. James Hospital in Sliema, backed by emergency medical teams and modern diagnostic scanning.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0 hover:scale-102"
          >
            Book Initial Consultation
          </button>
        </div>
      </section>

    </div>
  );
};
