import React from 'react';
import { 
  CreditCard, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  ChevronRight, 
  FileText,
  AlertCircle
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
            <span className="text-[#0E2B4C] font-bold">Fees &amp; Prices</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              Clear &amp; Honest Pricing
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E2B4C] font-heading mb-6 leading-tight">
              Hospital Treatment <span className="text-[#2BB4A7]">Fees &amp; Pricing</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              We believe in complete financial transparency. You will receive a comprehensive written treatment plan with transparent fees before any clinical procedure begins at St. James Hospital.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Fee Cards Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {feesCategories.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#2BB4A7] mb-1 block">
                    [ Category 0{idx + 1} ]
                  </span>
                  <h2 className="text-2xl font-bold text-[#0E2B4C] mb-2 font-heading">
                    {cat.title}
                  </h2>
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
                    onClick={() => onOpenBooking({ treatment: cat.items[0].name })}
                    className="w-full py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#0E2B4C]"
                  >
                    <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                    <span>Book For This Category</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* 3. Insurance & Hospital Billing Details */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Private Insurance Coverage</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mb-3">
                  Insurance &amp; Cross-Border Medical Reimbursement
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-body mb-4">
                  Because our clinic is fully integrated into St. James Hospital in Sliema, our surgical treatments and consultations are eligible for coverage under local and international private healthcare policies.
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2BB4A7]" />
                    <span>Official medical receipts &amp; diagnostic itemization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2BB4A7]" />
                    <span>European S2 forms and private insurance claim validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2BB4A7]" />
                    <span>Hospital theatre sedation invoicing</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
                <div className="text-sm font-bold text-[#0E2B4C] font-heading">
                  Written Estimate Guarantee
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Before beginning any complex treatment—including dental implants, ceramic crowns, or full mouth rehabilitation—you will receive a detailed printed estimate with zero hidden extras.
                </p>
                <button
                  onClick={() => onOpenBooking({ notes: 'Requesting treatment estimate & insurance claim details' })}
                  className="w-full py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request a Written Treatment Estimate
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
