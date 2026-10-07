import React, { useState } from 'react';
import { 
  Users, 
  ArrowRight, 
  Calendar, 
  ChevronRight, 
  Building2, 
  Award,
  Sparkles,
  Phone
} from 'lucide-react';
import { cliniciansList, getAssetUrl } from '@/data/clinicData';
import { Clinician } from '@/types';

interface TeamPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'specialists' | 'general' | 'support'>('all');

  const filteredClinicians = cliniciansList.filter(c => {
    if (activeTab === 'all') return true;
    return c.category === activeTab;
  });

  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Banner */}
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
            <span className="text-[#0E2B4C] font-bold">Our Medical Team</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              19 Dental Specialists &amp; Hospital Staff
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E2B4C] font-heading mb-6 leading-tight">
              Our Dentists, Specialists <br />
              <span className="text-[#2BB4A7]">&amp; Clinical Coordinators</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              Specialists and general dentists working side by side inside St. James Hospital in Sliema, so your entire family's dental care is seamlessly managed by the right clinician under one roof.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Filter Navigation & Team Grid */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-12 pb-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'all'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              All Clinicians ({cliniciansList.length})
            </button>
            <button
              onClick={() => setActiveTab('specialists')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'specialists'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Specialists &amp; Surgeons (5)
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'general'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              General &amp; Paediatric Dentists (4)
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'support'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              Care, Nursing &amp; DSD Coordinators (10)
            </button>
          </div>

          {/* Clinicians Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredClinicians.map((person) => (
              <div
                key={person.id}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Portrait Photo */}
                  <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(person.photo)}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-2xs">
                      {person.badge}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-[#0E2B4C] mb-1 font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                      {person.name}
                    </h3>
                    
                    <div className="text-xs font-bold text-[#2BB4A7] uppercase tracking-wider mb-1 font-heading">
                      {person.role}
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium mb-3 leading-snug line-clamp-2">
                      {person.qualifications}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-body line-clamp-4">
                      {person.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => onOpenBooking({
                      doctor: person.name,
                      treatment: person.treatmentDefault
                    })}
                    className="w-full py-2.5 rounded-full bg-slate-50 hover:bg-[#0E2B4C] text-slate-800 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 hover:border-[#0E2B4C] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Book with {person.name.split(' ')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Bottom Consultation Callout */}
      <section className="py-16 bg-[#0E2B4C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Ready to meet your chosen clinician?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl font-body">
              Schedule your consultation online or speak with our hospital coordination desk at St. James Hospital in Sliema.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shrink-0 hover:scale-102"
          >
            Schedule Consultation Now
          </button>
        </div>
      </section>

    </div>
  );
};
