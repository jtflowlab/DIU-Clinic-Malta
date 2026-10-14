import React, { useState, useMemo } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  HelpCircle,
  Search,
  Sparkles,
  Smile,
  Shield,
  CreditCard,
  Building2,
  FileText,
  Heart,
  Zap,
  Layers,
  Sun,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Category Icon helper
  const getCategoryIcon = (title: string) => {
    const t = title.toUpperCase();
    if (t.includes('IMPLANT') || t.includes('SURGERY')) return <Sparkles className="w-5 h-5 text-[#2BB4A7]" />;
    if (t.includes('SMILE DESIGN')) return <Smile className="w-5 h-5 text-amber-500" />;
    if (t.includes('GENERAL')) return <Shield className="w-5 h-5 text-sky-600" />;
    if (t.includes('HYGIENE')) return <Zap className="w-5 h-5 text-teal-600" />;
    if (t.includes('BONDING')) return <Sparkles className="w-5 h-5 text-violet-600" />;
    if (t.includes('PORCELAIN') || t.includes('CROWN')) return <Layers className="w-5 h-5 text-indigo-600" />;
    if (t.includes('WHITENING')) return <Sun className="w-5 h-5 text-amber-500" />;
    if (t.includes('DENTURE')) return <Users className="w-5 h-5 text-emerald-600" />;
    if (t.includes('ROOT CANAL')) return <ShieldCheck className="w-5 h-5 text-rose-600" />;
    if (t.includes('SEDATION')) return <Heart className="w-5 h-5 text-rose-500" />;
    return <CheckCircle2 className="w-5 h-5 text-[#2BB4A7]" />;
  };

  // Category Tag badge
  const getCategoryBadge = (title: string) => {
    const t = title.toUpperCase();
    if (t.includes('IMPLANT') || t.includes('SURGERY')) return 'SURGICAL SPECIALTY';
    if (t.includes('SMILE DESIGN')) return 'SIGNATURE AESTHETICS';
    if (t.includes('GENERAL')) return 'ESSENTIAL CARE';
    if (t.includes('HYGIENE')) return 'PREVENTATIVE DENTISTRY';
    if (t.includes('BONDING')) return 'MINIMAL DRILLING';
    if (t.includes('PORCELAIN') || t.includes('CROWN')) return 'CEREC CAD/CAM CERAMICS';
    if (t.includes('WHITENING')) return 'CLINICAL WHITENING';
    if (t.includes('DENTURE')) return 'PROSTHODONTICS';
    if (t.includes('ROOT CANAL')) return 'ENDODONTICS';
    if (t.includes('SEDATION')) return 'ANXIETY-FREE CARE';
    return 'CLINICAL CARE';
  };

  // Category Classification for Filter Tabs
  const getCategoryGroup = (title: string) => {
    const t = title.toUpperCase();
    if (t.includes('IMPLANT') || t.includes('SURGERY') || t.includes('SEDATION')) return 'surgery';
    if (t.includes('SMILE DESIGN') || t.includes('BONDING') || t.includes('WHITENING')) return 'aesthetics';
    if (t.includes('PORCELAIN') || t.includes('CROWN') || t.includes('DENTURE')) return 'restorative';
    return 'general';
  };

  // Filter Categories by Tab and Search
  const filteredCategories = useMemo(() => {
    return feesCategories.filter((cat) => {
      // Filter tab
      if (selectedFilter !== 'all' && getCategoryGroup(cat.title) !== selectedFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = cat.title.toLowerCase().includes(query);
        const matchesClinician = cat.clinician?.toLowerCase().includes(query);
        const matchesItems = cat.items.some(
          (item) => item.name.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query)
        );
        return matchesTitle || matchesClinician || matchesItems;
      }
      return true;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Hero Banner - Flush with top, High Prestige Dark Navy */}
      <section className="bg-[#0E2B4C] text-white border-b border-slate-800 pt-28 sm:pt-36 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute -right-20 -top-20 w-[450px] h-[450px] bg-[#2BB4A7]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#2BB4A7] cursor-pointer bg-transparent border-none p-0 text-slate-300 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#2BB4A7] font-bold">Fees &amp; Prices</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#2BB4A7] text-[11px] font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2BB4A7]" />
                <span>TRANSPARENT &amp; HONEST PRICING</span>
              </span>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading mb-5 leading-tight">
                Treatment Fees &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2BB4A7] via-teal-300 to-amber-300">
                  Investment Schedule
                </span>
              </h1>
              
              {/* Exact Intro Box as requested in Worksheet #160 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs sm:text-sm leading-relaxed font-body shadow-xl max-w-2xl">
                Every treatment plan is personal, so these are starting prices. You will receive a written plan with the full cost before any treatment begins. If you have health insurance, check whether it includes dental cover. We work with the major insurers in Malta and overseas.
              </div>
            </div>

            {/* Quick Pricing Highlights Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center gap-2">
                  <span>★</span>
                  <span>OUR FINANCIAL COMMITMENT</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <FileText className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading">Written Estimate First</strong>
                      <span className="text-slate-300 text-xs">Full breakdown of costs provided prior to any permanent clinical work.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Building2 className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading">Hospital Facility Standards</strong>
                      <span className="text-slate-300 text-xs">Sterile surgical suites &amp; sedation care at St James Hospital, Sliema.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <CreditCard className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-heading">Private Insurance Support</strong>
                      <span className="text-slate-300 text-xs">Direct claim assistance for Bupa, Atlas, Cigna &amp; overseas policies.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Interactive Category Filter & Live Search Toolbar */}
      <section className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Treatments (10)' },
                { id: 'surgery', label: 'Implants & Surgery' },
                { id: 'aesthetics', label: 'Smile Design & Aesthetics' },
                { id: 'restorative', label: 'Restorative & Dentures' },
                { id: 'general', label: 'General & Hygiene' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                    selectedFilter === tab.id
                      ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-[#0E2B4C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search treatments or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Price Catalog: 2-Column High-Contrast Responsive Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick results counter */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0E2B4C] font-heading">
                Treatment Categories &amp; Pricing
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Showing {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} organized across clinical disciplines.
              </p>
            </div>
            
            {searchQuery && (
              <span className="text-xs text-teal-700 font-bold bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Filtered by: "{searchQuery}"
              </span>
            )}
          </div>

          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 shadow-xs">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0E2B4C] mb-1">No treatments found</h3>
              <p className="text-sm text-slate-500 mb-4">No treatments match your search "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                className="px-5 py-2.5 rounded-full bg-[#0E2B4C] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            /* 2-Column Responsive Grid */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              {filteredCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#2BB4A7]/60 transition-all duration-300 group"
                >
                  {/* Card Header with Distinct Contrast */}
                  <div className="p-6 sm:p-7 bg-gradient-to-r from-slate-50 via-white to-slate-50/70 border-b border-slate-100">
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                          {getCategoryIcon(cat.title)}
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#2BB4A7] font-mono">
                          {getCategoryBadge(cat.title)}
                        </span>
                      </div>
                      
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                        DiU Clinic
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#0E2B4C] font-heading uppercase tracking-wide group-hover:text-[#2BB4A7] transition-colors">
                      {cat.title}
                    </h3>

                    {cat.clinician && (
                      <p className="text-xs text-slate-600 font-medium mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                        <span>{cat.clinician}</span>
                      </p>
                    )}
                  </div>

                  {/* Items List in High-Contrast Table Format */}
                  <div className="p-6 sm:p-7 divide-y divide-slate-100 flex-1">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="py-3.5 sm:py-4 flex items-start justify-between gap-4 first:pt-0 last:pb-0 hover:bg-slate-50/60 rounded-xl px-2 -mx-2 transition-colors"
                      >
                        <div className="flex-1 pr-3">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                              {item.description}
                            </div>
                          )}
                        </div>

                        {/* High-Contrast Price Tag */}
                        <div className="text-right shrink-0">
                          {item.price ? (
                            <span className="inline-block font-extrabold text-xs sm:text-sm text-[#0E2B4C] bg-slate-100/90 border border-slate-200/90 px-3 py-1.5 rounded-xl font-mono shadow-2xs group-hover:bg-[#0E2B4C] group-hover:text-white transition-all">
                              {item.price}
                            </span>
                          ) : (
                            <span className="inline-block text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
                              Quote on plan
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 text-center sm:text-left">
                      <Check className="w-3.5 h-3.5 text-[#2BB4A7] shrink-0" />
                      <span>Transparent written estimate included</span>
                    </span>

                    <button
                      onClick={() => onOpenBooking({ treatment: cat.treatmentDefault || cat.title })}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border border-[#0E2B4C] hover:border-[#2BB4A7] shadow-sm hover:scale-102 active:scale-98"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#2BB4A7] group-hover:text-white" />
                      <span>{cat.buttonText || `Enquire about ${cat.title}`}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. High-Contrast Insurance & Claims Section (Worksheet lines 296-302) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-[#0E2B4C] via-[#0E2B4C] to-[#123963] text-white p-8 sm:p-12 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#2BB4A7]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#2BB4A7]" />
                  <span>PRIVATE MEDICAL &amp; DENTAL COVER</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold font-heading mb-4 leading-tight">
                  Insurance &amp; Direct Claims Support
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-body mb-4">
                  If you have private health insurance, check whether it includes dental cover. We work with the major insurers in Malta and overseas, and our patient coordinators are glad to assist with claim documentation.
                </p>

                <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed font-body mb-6">
                  Oral surgery procedures, such as wisdom tooth removal, biopsies and surgical removal of roots, are often covered by private health insurance even when routine dental care is not.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-white">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Detailed receipts for your insurance claim</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-white">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Help with private insurance claim forms</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-white">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Oral surgery, wisdom teeth removal &amp; biopsies</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-white">
                    <Check className="w-4 h-4 text-[#2BB4A7] shrink-0 mt-0.5" />
                    <span>Separate invoicing for IV conscious sedation</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => onOpenBooking({ treatment: 'Dental Implants & Oral Surgery' })}
                    className="px-7 py-3 rounded-full bg-[#2BB4A7] hover:bg-[#22998e] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer flex items-center gap-2 border border-teal-400/40 hover:scale-102"
                  >
                    <span>Enquire about treatment &amp; estimates</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Major Insurers Box */}
              <div className="lg:col-span-5">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-base font-bold text-white font-heading">
                    Common Insurers We Coordinate With
                  </h3>
                  <p className="text-xs text-slate-300">
                    We supply itemised invoices and clinical diagnoses matching international insurance codes:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs font-bold font-mono">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center text-teal-200">
                      Bupa Global
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center text-teal-200">
                      Atlas Healthcare
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center text-teal-200">
                      GasanMamo
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center text-teal-200">
                      Cigna International
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center text-teal-200">
                      Allianz Care
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center text-teal-200">
                      AXA PPP
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 text-center">
                    Check your policy to verify your exact dental benefit limits.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. FAQ Accordion Section (Worksheet lines 303-304) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0E2B4C] text-[11px] font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#2BB4A7]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0E2B4C] font-heading">
              Frequently Asked Questions About Fees
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Everything you need to know about our fees, insurance reimbursement, payment plans and consultations.
            </p>
          </div>

          <div className="space-y-3">
            {faqsData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all hover:border-[#2BB4A7]/40"
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

          {/* Bottom Consultation Box */}
          <div className="mt-12 p-8 rounded-3xl bg-[#E8F8F6] border border-[#C5EDE8] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs text-center sm:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0E2B4C] font-heading mb-1">
                Have specific treatment questions?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Book a consultation with our dental team to receive a personal diagnostic assessment and written treatment plan.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="px-7 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer shrink-0"
            >
              Book Consultation
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default PricesPage;
