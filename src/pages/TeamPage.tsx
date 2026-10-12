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
  const [activeTab, setActiveTab] = useState<'all' | 'specialists' | 'restorative' | 'general' | 'hygienist' | 'support'>('all');
  const [selectedClinician, setSelectedClinician] = useState<Clinician | null>(null);

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
          
          {/* Category Tabs with High Visual Contrast */}
          <div className="flex flex-wrap gap-2.5 mb-12 pb-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'all'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              All Clinicians ({cliniciansList.length})
            </button>
            <button
              onClick={() => setActiveTab('specialists')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'specialists'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Specialists &amp; Surgeons (1)
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'general'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              General &amp; Paediatric Dentists (3)
            </button>
            <button
              onClick={() => setActiveTab('hygienist')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'hygienist'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Dental Hygienist (1)
            </button>
            <button
              onClick={() => setActiveTab('restorative')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'restorative'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Restorative &amp; Digital Smile Design (4)
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'support'
                  ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              Care &amp; Nursing Team (10)
            </button>
          </div>

          {/* Clinicians Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredClinicians.map((person) => (
              <div
                key={person.id}
                onClick={() => setSelectedClinician(person)}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Clean Framed Portrait Photo (No overlays or signs covering faces) */}
                  <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(person.photo)}
                      alt={person.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Clean Info: Titles and Badges Placed Neatly Below the Photo */}
                  <div className="p-5 sm:p-6">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0E2B4C] text-[10px] font-bold uppercase tracking-wider mb-2 border border-slate-200">
                      {person.badge}
                    </div>

                    <h3 className="text-xl font-bold text-[#0E2B4C] mb-1 font-heading group-hover:text-[#2BB4A7] transition-colors leading-snug">
                      {person.name}
                    </h3>
                    
                    {/* Job Title Below Photo */}
                    <div className="text-xs font-bold text-[#2BB4A7] uppercase tracking-wider mb-1 font-heading">
                      {person.role}
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium mb-3 leading-snug line-clamp-2">
                      {person.qualifications}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-body line-clamp-3">
                      {person.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClinician(person);
                    }}
                    className="flex-1 py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-wider border border-slate-200 transition-colors"
                  >
                    View Bio
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking({
                        doctor: person.name,
                        treatment: person.treatmentDefault
                      });
                    }}
                    className="flex-1 py-2 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Individual Clinician Biography Modal */}
      {selectedClinician && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedClinician(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedClinician(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-48 aspect-[4/4] rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                <img
                  src={getAssetUrl(selectedClinician.photo)}
                  alt={selectedClinician.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-[10px] font-bold uppercase tracking-wider mb-2">
                  {selectedClinician.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mb-1">
                  {selectedClinician.name}
                </h3>
                <div className="text-xs font-bold text-[#2BB4A7] uppercase tracking-wider mb-2 font-heading">
                  {selectedClinician.role}
                </div>
                <div className="text-xs text-slate-500 font-semibold mb-4 pb-3 border-b border-slate-100">
                  {selectedClinician.qualifications}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-body mb-6">
                  {selectedClinician.bio}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const clinicianToBook = selectedClinician;
                      setSelectedClinician(null);
                      onOpenBooking({
                        doctor: clinicianToBook.name,
                        treatment: clinicianToBook.treatmentDefault
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Book Consultation with {selectedClinician.name.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedClinician(null)}
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
