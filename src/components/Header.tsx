import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Menu, X, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '@/data/clinicData';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenBooking,
  isScrolled
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact menu items requested in Worksheet: ABOUT US, TREATMENTS, PRICES, REFERRALS, BLOG, CONTACT
  const navItems = [
    { label: 'ABOUT US', route: '/team' },
    { label: 'TREATMENTS', route: '/treatments' },
    { label: 'PRICES', route: '/prices' },
    { label: 'REFERRALS', route: '/referral' },
    { label: 'BLOG', route: '/blog' },
    { label: 'CONTACT', route: 'contact' }
  ];

  const handleNavClick = (route: string) => {
    setMobileMenuOpen(false);
    if (route === 'contact') {
      if (currentRoute !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById('contact-booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      } else {
        const el = document.getElementById('contact-booking');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onNavigate(route);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 py-2 sm:py-2.5 shadow-[0_4px_25px_rgba(14,43,76,0.08)] text-slate-800'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 py-3 sm:py-3.5 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* DiU Logo - Made prominent so Dental & Implantology Unit is clearly readable */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center cursor-pointer group shrink-0"
        >
          <img
            src={getAssetUrl('DiU_Logo_Full_Colour.png')}
            alt="DiU Dental & Implantology Unit - At St James Hospital, Sliema"
            className="h-11 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-102"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.route)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                    : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100 hover:text-[#0E2B4C]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          
          {/* Direct Telephone */}
          <a
            href="tel:35623291029"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full text-[#0E2B4C] hover:text-[#2BB4A7] hover:bg-slate-50 transition-colors no-underline tracking-wide border border-slate-200/60"
          >
            <Phone className="w-3.5 h-3.5 text-[#2BB4A7]" />
            <span>+356 2329 1029</span>
          </a>

          {/* Book Consultation Button */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all bg-[#0E2B4C] hover:bg-[#07192d] text-white border border-[#0E2B4C] shadow-sm hover:shadow hover:scale-102 cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[#2BB4A7]" />
            <span className="hidden sm:inline">Book a consultation</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full cursor-pointer border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 px-6 py-5 flex flex-col gap-3 shadow-xl"
          >
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-[#0E2B4C] text-white border-[#0E2B4C]'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#2BB4A7]' : 'text-slate-400'}`} />
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="tel:35623291029"
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#0E2B4C] no-underline transition-colors"
              >
                <Phone className="w-4 h-4 text-[#2BB4A7]" />
                <span>Call Us: (+356) 2329 1029</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-[#0E2B4C] text-white font-extrabold text-center text-xs uppercase tracking-wider cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                <span>Book a consultation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
