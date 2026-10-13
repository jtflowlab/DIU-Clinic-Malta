import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { BookingModal } from '@/components/BookingModal';
import { EmergencyModal } from '@/components/EmergencyModal';
import { HomePage } from '@/pages/HomePage';
import { TreatmentsPage } from '@/pages/TreatmentsPage';
import { PricesPage } from '@/pages/PricesPage';
import { TeamPage } from '@/pages/TeamPage';
import { BlogPage } from '@/pages/BlogPage';
import { ReferralPage } from '@/pages/ReferralPage';
import { BookingFormData } from '@/types';
import { blogPosts } from '@/data/clinicData';

// SEO Title & Description Map (strictly avoiding hospital ownership claims)
const SEO_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'DiU Clinic Malta | Dental & Implantology Unit at St James Hospital, Sliema',
    description: 'Trusted by families for over 25 years. Specialist dental implants, same-day crowns, digital smile design and conscious sedation at St James Hospital, Sliema.'
  },
  '/treatments': {
    title: 'Dental Treatments & Specialties | DiU Clinic Malta',
    description: 'Explore our dental treatments: Family dentistry, dental implants, Digital Smile Design, IV sedation, crowns and veneers at St James Hospital.'
  },
  '/prices': {
    title: 'Treatment Fees & Prices | DiU Clinic Malta',
    description: 'Clear dental fees, consultation costs, implants, smile design, restorations, IV sedation and private medical insurance coverage.'
  },
  '/team': {
    title: 'Our Dental Team | DiU Clinic Malta',
    description: 'Meet our multidisciplinary team of oral surgeons, prosthodontists, general dentists, hygienists and clinical care coordinators at St James Hospital.'
  },
  '/referral': {
    title: 'Dentist Referral Portal | DiU Clinic Malta at St James Hospital, Sliema',
    description: 'Colleague referral portal for dental practitioners for oral surgery, complex implants, CBCT diagnostics, DSD rehabilitation, and IV sedation.'
  },
  '/blog': {
    title: 'Dental Insights & Articles | DiU Clinic Malta',
    description: 'Expert dental health articles, IV sedation advice, smile design previews and patient care guides authored by DiU Clinic clinicians.'
  }
};

// Normalize route from pathname or hash
const parseRouteFromLocation = (): string => {
  if (typeof window === 'undefined') return '/';
  
  // Check hash first (e.g., #/treatments or #treatments)
  const hash = window.location.hash.replace(/^#\/?/, '/');
  if (hash === '/treatments' || hash === '/prices' || hash === '/team' || hash === '/referral' || hash.startsWith('/blog')) {
    return hash;
  }
  
  // Check path
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path.endsWith('/treatments')) return '/treatments';
  if (path.endsWith('/prices') || path.endsWith('/fees-and-prices')) return '/prices';
  if (path.endsWith('/team')) return '/team';
  if (path.endsWith('/referral')) return '/referral';
  if (path.includes('/blog')) return path;
  
  return '/';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(parseRouteFromLocation);
  const [isScrolled, setIsScrolled] = useState(false);

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
    // Check if currentRoute is a specific blog post
    let title = 'DiU Clinic Malta | Dental & Implantology Unit at St James Hospital, Sliema';
    let description = 'Specialist dental care, dental implants, and Digital Smile Design at St James Hospital, Sliema.';

    if (currentRoute.startsWith('/blog/')) {
      const slug = currentRoute.replace('/blog/', '').replace(/^\//, '');
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        title = `${post.title} | DiU Clinic Malta`;
        description = post.excerpt;
      } else {
        const meta = SEO_METADATA['/blog'];
        title = meta.title;
        description = meta.description;
      }
    } else {
      const meta = SEO_METADATA[currentRoute] || SEO_METADATA['/'];
      title = meta.title;
      description = meta.description;
    }

    document.title = title;

    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', description);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Scroll Listener for header styling
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
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

        {currentRoute === '/referral' && (
          <ReferralPage
            onNavigate={navigateTo}
          />
        )}

        {currentRoute.startsWith('/blog') && (
          <BlogPage
            onOpenBooking={handleOpenBooking}
            onNavigate={navigateTo}
            currentRoute={currentRoute}
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

      {/* 4. INTERACTIVE MODALS */}
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
