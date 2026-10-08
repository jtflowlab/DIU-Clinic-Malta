import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import { Header } from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { BookingModal } from '@/components/BookingModal';
import { EmergencyModal } from '@/components/EmergencyModal';
import { HomePage } from '@/pages/HomePage';
import { TreatmentsPage } from '@/pages/TreatmentsPage';
import { PricesPage } from '@/pages/PricesPage';
import { TeamPage } from '@/pages/TeamPage';
import { BlogPage } from '@/pages/BlogPage';
import { BookingFormData } from '@/types';

// SEO Title & Description Map
const SEO_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'DiU Clinic Malta | Dental & Implantology Unit • St. James Hospital Sliema',
    description: 'Trusted by families for over 25 years. Specialist dental implants, CEREC same-day crowns, digital smile design and conscious sedation inside St. James Hospital Sliema.'
  },
  '/treatments': {
    title: 'Clinical Dental Treatments & Specialties | DiU Clinic Malta',
    description: 'Explore our dental treatments: Family dentistry, Swiss dental implants, All-on-4 fixed teeth, CEREC porcelain crowns, sedation and orthodontics.'
  },
  '/prices': {
    title: 'Treatment Fees & Transparent Pricing Guide | DiU Clinic Malta',
    description: 'Transparent hospital dental fees, consultation costs, Swiss implants, CEREC restorations, IV sedation and private medical insurance coverage.'
  },
  '/team': {
    title: 'Our Dentists, Specialists & Surgeons | DiU Clinic Malta',
    description: 'Meet our multidisciplinary team of 19 oral surgeons, prosthodontists, general dentists, hygienists and clinical care coordinators at St. James Hospital.'
  },
  '/blog': {
    title: 'Dental Insights, Guides & Articles | DiU Clinic Malta',
    description: 'Expert dental health articles, IV sedation advice, smile design previews and patient care guides authored by DiU Clinic specialists.'
  }
};

// Normalize route from pathname or hash
const parseRouteFromLocation = (): string => {
  if (typeof window === 'undefined') return '/';
  
  // Check hash first (e.g., #/treatments or #treatments)
  const hash = window.location.hash.replace(/^#\/?/, '/');
  if (hash === '/treatments' || hash === '/prices' || hash === '/team' || hash === '/blog') {
    return hash;
  }
  
  // Check path
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path.endsWith('/treatments')) return '/treatments';
  if (path.endsWith('/prices') || path.endsWith('/fees-and-prices')) return '/prices';
  if (path.endsWith('/team')) return '/team';
  if (path.endsWith('/blog')) return '/blog';
  
  return '/';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(parseRouteFromLocation);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [modalDefaults, setModalDefaults] = useState<Partial<BookingFormData>>({});

  // Route Synchronization & SEO Meta Tags
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseRouteFromLocation());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    // Update Document Title and Meta Description for SEO
    const meta = SEO_METADATA[currentRoute] || SEO_METADATA['/'];
    document.title = meta.title;

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', meta.description);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Scroll Listener
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const isNearBottom = (scrollPos + winHeight) >= (docHeight - 160);
      setIsScrolled(scrollPos > 40);
      setShowBottomBar(scrollPos > 600 && !isNearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    try {
      window.history.pushState({}, '', route);
    } catch {
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (defaults?: Partial<BookingFormData>) => {
    if (defaults) {
      setModalDefaults(defaults);
    } else {
      setModalDefaults({});
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#2BB4A7]/20 selection:text-[#0E2B4C] overflow-x-clip font-body flex flex-col justify-between">
      
      {/* 1. TOP STICKY NAVBAR */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
        isScrolled={isScrolled}
      />

      {/* 2. DYNAMIC PAGE VIEW BASED ON ROUTE */}
      <main className="flex-1">
        {currentRoute === '/treatments' && (
          <TreatmentsPage
            onOpenBooking={handleOpenBooking}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/prices' && (
          <PricesPage
            onOpenBooking={handleOpenBooking}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/team' && (
          <TeamPage
            onOpenBooking={handleOpenBooking}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/blog' && (
          <BlogPage
            onOpenBooking={handleOpenBooking}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
            onOpenEmergency={() => setEmergencyModalOpen(true)}
          />
        )}
      </main>

      {/* 3. CINEMATIC FOOTER */}
      <CinematicFooter
        onOpenWhatsApp={() => handleOpenBooking()}
        onNavigate={navigateTo}
        onScrollToSection={(id) => {
          if (currentRoute !== '/') {
            navigateTo('/');
            setTimeout(() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 4. FLOATING QUICK CONVERSION BAR (Visible after scroll) */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40 bg-white/95 backdrop-blur-md p-2 rounded-full border border-slate-200/90 shadow-2xl flex items-center justify-between gap-2 text-slate-900"
          >
            <a
              href="tel:35623291029"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0E2B4C] hover:text-[#2BB4A7] no-underline"
            >
              <Phone className="w-3.5 h-3.5 text-[#2BB4A7]" />
              <span>2329 1029</span>
            </a>

            <button
              onClick={() => handleOpenBooking()}
              className="px-5 py-2.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>Book Consultation</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. INTERACTIVE MODALS */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialDefaults={modalDefaults}
      />

      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

    </div>
  );
}
