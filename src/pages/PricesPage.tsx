import React from 'react';
import { 
  Check, 
  ShieldCheck, 
  Calendar, 
  ChevronRight, 
  Phone
} from 'lucide-react';
import { feesCategories } from '@/data/clinicData';

interface PricesPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

export const PricesPage: React.FC<PricesPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. High-Contrast Deep Navy Blue Header Banner (Client Requested) */}
      <section className="bg-[#0E2B4C] text-white border-b border-slate-800 py-16 sm:py-20 relative overflow-hidden">
        {/* Subtle decorative glow */}
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
              Clear &amp; Honest Pricing At St James Hospital
            </span>
            
            {/* "Fees & Prices" below "Hospital Treatment" as requested */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-heading mb-6 leading-tight">
              Hospital Treatment <br />
              <span className="text-[#2BB4A7]">Fees &amp; Prices</span>
            </h1>
            
            {/* Client Disclaimer Quote with High Contrast */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-sm sm:text-base leading-relaxed font-body shadow-lg">
              <strong className="text-white font-semibold">Every treatment plan is personal, so these are starting prices.</strong> You will receive a written plan with the full cost before treatment begins. Let us know if you have insurance.
            </div>
          </div>

        </div>
      </section>

      {/* 2. Health Insurance & Cross-Border Reimbursement (Positioned Prominently at Top) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-50/80 via-white to-slate-50 p-8 sm:p-10 rounded-3xl border border-teal-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2B4C] text-[#2BB4A7] text-[11px] font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Private Health Insurance Eligibility</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-bold text-[#0E2B4C] font-heading mb-3">
                  Do You Have Private Health Insurance?
                </h2>
                
                <p className="text-base text-slate-700 font-medium mb-4 font-body leading-relaxed">
                  Find out whether you may be eligible for dental care coverage or reimbursement.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body mb-5 max-w-2xl">
                  Because DIU Clinic is fully integrated inside St. James Hospital in Sliema, our surgical treatments, diagnostic scans, and hospital consultations qualify for coverage and claim itemization under both Maltese and international private health insurance policies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-semibold mb-2">
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0" />
                    <span>Official medical itemization</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0" />
                    <span>European S2 forms support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0" />
                    <span>Hospital theatre invoicing</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                <button
                  onClick={() => onOpenBooking({
                    treatment: 'Private Health Insurance Consultation & Claim Verification'
                  })}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:scale-102 flex items-center justify-center gap-2 text-center"
                >
                  <span>See If You're Eligible. Learn More.</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-500 mt-2.5 text-center lg:text-right w-full">
                  Speak directly with our hospital insurance coordination desk.
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Fee Cards Grid (All 10 Categories from Client Sheets) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2BB4A7] block mb-2">
              Transparent Fees
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E2B4C] font-heading">
              Clinical Procedures &amp; Starting Fees
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every procedure is delivered to hospital-grade sterilization and surgical standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {feesCategories.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#2BB4A7] mb-1 block">
                    [ 0{idx + 1} ]
                  </span>
                  <h3 className="text-2xl font-bold text-[#0E2B4C] mb-1 font-heading">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 font-body leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-4">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="text-sm font-bold text-slate-900 leading-snug">
                            {item.name}
                          </span>
                          <span className="text-base font-extrabold text-[#0E2B4C] shrink-0 font-heading">
                            {item.price}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {item.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                              <Check className="w-3 h-3 text-[#2BB4A7] shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => onOpenBooking({ treatment: cat.items[0]?.name || cat.title })}
                    className="w-full py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#0E2B4C] hover:border-[#2BB4A7]"
                  >
                    <Calendar className="w-4 h-4 text-[#2BB4A7] group-hover:text-white" />
                    <span>Inquire About {cat.title.split('(')[0].trim()}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* 4. Written Estimate Guarantee Box */}
          <div className="bg-[#0E2B4C] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-2">
                Written Estimate Guarantee Before Treatment
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-body leading-relaxed">
                No unexpected costs. You receive an itemized clinical treatment plan with fixed fees and diagnostic explanations prior to starting any procedure At St James Hospital.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking({ treatment: 'Initial Consultation & Diagnostic Estimate' })}
              className="px-8 py-4 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shrink-0 hover:scale-102"
            >
              Book Diagnostic Consultation
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
