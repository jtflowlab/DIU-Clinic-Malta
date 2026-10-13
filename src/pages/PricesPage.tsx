import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { feesCategories, faqsData } from '@/data/clinicData';

interface PricesPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

export const PricesPage: React.FC<PricesPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-[#0E2B4C] text-white border-b border-slate-800 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#2BB4A7]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#2BB4A7] cursor-pointer bg-transparent border-none p-0 text-slate-300"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-bold">Fees &amp; Prices</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
              Clear &amp; Honest Pricing
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-heading mb-6 leading-tight">
              Treatment Fees &amp; Prices
            </h1>
            
            {/* Exact Intro Box as requested in Worksheet #160 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-sm sm:text-base leading-relaxed font-body shadow-lg">
              Every treatment plan is personal, so these are starting prices. You will receive a written plan with the full cost before any treatment begins. If you have health insurance, check whether it includes dental cover. We work with the major insurers in Malta and overseas.
            </div>
          </div>

        </div>
      </section>

      {/* 2. Price List in Premium Menu Style (All 10 Categories) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-12 sm:space-y-16">
            {feesCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10 transition-all hover:shadow-md"
              >
                {/* Category Header Centered in Capitals */}
                <div className="text-center mb-8 border-b border-slate-100 pb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0E2B4C] font-heading uppercase tracking-wide">
                    {cat.title}
                  </h2>
                  {cat.clinician && (
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      {cat.clinician}
                    </p>
                  )}
                </div>

                {/* Items in Menu Style Table */}
                <div className="divide-y divide-slate-100 mb-8">
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="py-4 sm:py-5 flex items-start justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex-1 pr-4">
                        <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>

                      {item.price && (
                        <div className="text-right shrink-0">
                          <span className="font-extrabold text-sm sm:text-base text-[#0E2B4C] font-heading">
                            {item.price}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Category Action Button - Opens Booking with preselected treatment */}
                <div className="pt-4 border-t border-slate-100 flex justify-center">
                  <button
                    onClick={() => onOpenBooking({ treatment: cat.treatmentDefault || cat.title })}
                    className="px-8 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 border border-[#0E2B4C] hover:border-[#2BB4A7] shadow-sm hover:shadow"
                  >
                    <Calendar className="w-4 h-4 text-[#2BB4A7] group-hover:text-white" />
                    <span>{cat.buttonText || `Enquire about ${cat.title}`}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Insurance and Claims Block (Worksheet lines 296-302) */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-teal-50/70 via-white to-slate-50 p-8 sm:p-12 rounded-3xl border border-teal-200/80 shadow-sm">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E2B4C] text-[#2BB4A7] text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>INSURANCE</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-4">
              Insurance and claims
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body mb-4">
              If you have private health insurance, check whether it includes dental cover. We work with the major insurers in Malta and overseas, and we're happy to help with your claim.
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body mb-6">
              Oral surgery procedures, such as wisdom tooth removal, biopsies and surgical removal of roots, are often covered by private health insurance even when routine dental care is not.
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200/80 text-xs text-slate-800 font-medium">
                <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                <span>Detailed receipts for your insurance claim</span>
              </div>
              <div className="flex items-start gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200/80 text-xs text-slate-800 font-medium">
                <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                <span>Help with private insurance claim forms</span>
              </div>
              <div className="flex items-start gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200/80 text-xs text-slate-800 font-medium">
                <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                <span>Oral surgery, including surgical removal of wisdom teeth, surgical removal of roots and biopsy</span>
              </div>
              <div className="flex items-start gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200/80 text-xs text-slate-800 font-medium">
                <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                <span>Separate invoicing for sedation</span>
              </div>
            </div>

            {/* Sub heading: Clear written estimates */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-lg font-bold text-[#0E2B4C] font-heading mb-2">
                Clear written estimates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body mb-6">
                Before any major treatment, such as oral surgery interventions, implants, crowns or full-mouth rehabilitation, you'll receive a detailed written estimate, so there are no surprises.
              </p>

              <button
                onClick={() => onOpenBooking({ treatment: 'Dental Implants & Oral Surgery' })}
                className="px-8 py-3.5 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-102 flex items-center gap-2"
              >
                <span>Enquire about treatment &amp; estimates</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FAQ Accordion Section (Worksheet lines 303-304) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0E2B4C] text-[11px] font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#2BB4A7]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E2B4C] font-heading">
              Common Questions About Treatments &amp; Fees
            </h2>
          </div>

          <div className="space-y-3">
            {faqsData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-[#0E2B4C]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#2BB4A7] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
export default PricesPage;
