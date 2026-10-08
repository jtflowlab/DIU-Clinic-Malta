"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Phone, ArrowUp, Sparkles, MessageCircle, Heart } from "lucide-react";

// Register ScrollTrigger safely for React / SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES (Cinematic Light Luxury Aesthetic)
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables for Light Luxury Theme */
  --pill-bg-1: rgba(255, 255, 255, 0.95);
  --pill-bg-2: rgba(255, 255, 255, 0.85);
  --pill-shadow: rgba(15, 23, 42, 0.08);
  --pill-highlight: rgba(255, 255, 255, 1);
  --pill-inset-shadow: rgba(15, 23, 42, 0.03);
  --pill-border: rgba(226, 232, 240, 0.9);
  
  --pill-bg-1-hover: #FFFFFF;
  --pill-bg-2-hover: #F8FAFC;
  --pill-border-hover: rgba(0, 168, 150, 0.5);
  --pill-shadow-hover: rgba(0, 168, 150, 0.15);
  --pill-highlight-hover: #FFFFFF;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.4)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.7)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 32s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background in Light */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Theme-adaptive Soft Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(39, 207, 195, 0.18) 0%, 
    rgba(0, 74, 156, 0.10) 40%, 
    transparent 72%
  );
}

/* Glass Pill Theming (Light) */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 25px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  color: #1E293B;
}

.footer-glass-pill:hover {
  background: #FFFFFF;
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 16px 36px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #0F172A;
}

.whatsapp-magnetic-pill {
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important;
  color: #070B12 !important;
  box-shadow: 0 10px 30px -5px rgba(37, 211, 102, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.whatsapp-magnetic-pill:hover {
  background: linear-gradient(135deg, #2ae06d 0%, #15a897 100%) !important;
  box-shadow: 0 15px 35px -5px rgba(37, 211, 102, 0.55) !important;
  color: #000000 !important;
}

/* Giant Background Text Masking in Light */
.footer-giant-bg-text {
  font-size: 19vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(15, 23, 42, 0.07);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.08) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* High Contrast Header Text */
.footer-text-glow {
  background: linear-gradient(180deg, #0F172A 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. DIU CLINIC MARQUEE STRIP
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 shrink-0">
    <span>CEREC 3D Ceramics in 60 Mins</span> <span className="text-[#00A896]">✦</span>
    <span>Hospital IV Sedation</span> <span className="text-[#004A9C]">✦</span>
    <span>Immediate Fixed Implants</span> <span className="text-[#00A896]">✦</span>
    <span>St. James Hospital Network</span> <span className="text-[#004A9C]">✦</span>
    <span>Zero Dental Anxiety</span> <span className="text-[#00A896]">✦</span>
    <span>Digital Smile Design</span> <span className="text-[#004A9C]">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT (LIGHT THEME)
// -------------------------------------------------------------------------
export interface CinematicFooterProps {
  giantText?: string;
  heading?: string;
  onOpenWhatsApp?: () => void;
  onScrollToSection?: (id: string) => void;
}

export function CinematicFooter({
  giantText = "DIU CLINIC",
  heading = "Ready for Your New Smile?",
  onOpenWhatsApp,
  onScrollToSection,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = React.useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isDesktop) return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [isDesktop]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1.2,
        ease: "power3.inOut"
      });
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (onOpenWhatsApp) {
      e.preventDefault();
      onOpenWhatsApp();
    } else {
      window.open("https://wa.me/35623291029", "_blank");
    }
  };

  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* Responsive Curtain Reveal Wrapper (Desktop) / Fluid Block (Mobile) */}
      <div
        ref={wrapperRef}
        className="relative lg:h-screen w-full overflow-visible"
        style={isDesktop ? { clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" } : undefined}
      >
        {/* Footer: Flows naturally on mobile with ample bottom padding; Fixed curtain on desktop */}
        <footer className="relative lg:fixed lg:bottom-0 lg:left-0 flex min-h-fit lg:h-screen w-full flex-col justify-between overflow-visible lg:overflow-hidden bg-[#F8FAFC] text-slate-900 cinematic-footer-wrapper select-none pt-12 sm:pt-16 lg:pt-0 pb-28 sm:pb-32 lg:pb-0">
          
          {/* Ambient Soft Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text (DIU CLINIC) */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[3vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center hidden lg:block"
          >
            {giantText}
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="relative lg:absolute top-0 lg:top-8 sm:lg:top-12 left-0 w-full overflow-hidden border-y border-slate-200/90 bg-white/85 backdrop-blur-md py-3.5 z-10 lg:-rotate-1 sm:lg:-rotate-2 scale-100 lg:scale-105 shadow-sm mb-6 lg:mb-0">
            <div className="flex w-max animate-footer-scroll-marquee text-[11px] md:text-xs font-black tracking-[0.25em] text-slate-600 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content: Clean, Big Letters, Light Palette */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-16 sm:mt-20 w-full max-w-5xl mx-auto">
            
            {/* Minimal Sub-Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
              <span>St. James Hospital Network • Est. 1999</span>
            </div>

            {/* Giant Clean Heading in Dark Slate */}
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-editorial footer-text-glow tracking-tight mb-8 sm:mb-10 text-center leading-[1.05]"
            >
              {heading}
            </h2>

            {/* Interactive Magnetic Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              
              {/* Primary Action Pills */}
              <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 w-full">
                
                {/* Book WhatsApp Button */}
                <MagneticButton 
                  as="button" 
                  onClick={handleWhatsAppClick}
                  className="whatsapp-magnetic-pill px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-transform"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 fill-current" />
                  <span>Book via WhatsApp</span>
                </MagneticButton>
                
                {/* Direct Telephone Sliema */}
                <MagneticButton 
                  as="a" 
                  href="tel:35623291029" 
                  className="footer-glass-pill px-7 sm:px-9 py-4 sm:py-4.5 rounded-full text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 group shadow-sm hover:border-[#3EA3AC]"
                >
                  <Phone className="w-4 h-4 text-[#3EA3AC] group-hover:scale-110 transition-transform" />
                  <span>St. James Hospital (+356) 2329 1029</span>
                </MagneticButton>
              </div>

              {/* Secondary Navigation Pills */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-2">
                <MagneticButton 
                  as="button" 
                  onClick={handleNavClick('smile-results')}
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
                >
                  Restorations
                </MagneticButton>
                
                <MagneticButton 
                  as="button" 
                  onClick={handleNavClick('why-diu-container')}
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
                >
                  Why DiU Clinic
                </MagneticButton>
                
                <MagneticButton 
                  as="button" 
                  onClick={handleNavClick('clinics')}
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
                >
                  Hospital Suites
                </MagneticButton>
                
                <MagneticButton 
                  as="button" 
                  onClick={handleNavClick('reviews')}
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
                >
                  Patient Reviews
                </MagneticButton>

                <MagneticButton 
                  as="button" 
                  onClick={handleNavClick('faqs')}
                  className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
                >
                  FAQ
                </MagneticButton>
              </div>

            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200/70 pt-4 bg-white/40">
            
            {/* Copyright */}
            <div className="text-slate-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
              © 2026 DiU Clinic Malta • St. James Hospital Network. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="footer-glass-pill px-5 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-slate-200 bg-white">
              <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Excellence by</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-footer-heartbeat" />
              <span className="text-slate-900 font-black text-xs md:text-sm tracking-normal ml-0.5">Dr. Mark Diacono</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-slate-700 hover:text-slate-950 group order-3 border-slate-200 shadow-sm"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300 text-[#00A896]" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
export default CinematicFooter;
