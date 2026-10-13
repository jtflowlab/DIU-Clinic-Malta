"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Phone, ArrowUp, Sparkles } from "lucide-react";

// Register ScrollTrigger safely for React / SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Real WhatsApp SVG Icon
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 32s linear infinite;
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
  color: #FFFFFF !important;
  box-shadow: 0 10px 30px -5px rgba(37, 211, 102, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.whatsapp-magnetic-pill:hover {
  background: linear-gradient(135deg, #2ae06d 0%, #15a897 100%) !important;
  box-shadow: 0 15px 35px -5px rgba(37, 211, 102, 0.55) !important;
  color: #FFFFFF !important;
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
// 3. DIU CLINIC MARQUEE STRIP (Exact order as requested in Worksheet #24)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 shrink-0">
    <span>Sedation for Anxiety</span> <span className="text-[#00A896]">✦</span>
    <span>Digital Smile Design</span> <span className="text-[#004A9C]">✦</span>
    <span>Implant treatments</span> <span className="text-[#00A896]">✦</span>
    <span>Aesthetic dentistry</span> <span className="text-[#004A9C]">✦</span>
    <span>One visit all ceramic crowns, inlays, onlays</span> <span className="text-[#00A896]">✦</span>
    <span>CAD/CAM technology</span> <span className="text-[#004A9C]">✦</span>
    <span>Dentures</span> <span className="text-[#00A896]">✦</span>
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
  onNavigate?: (route: string) => void;
}

export function CinematicFooter({
  giantText = "DIU CLINIC",
  heading = "Ready for Your New Smile?",
  onOpenWhatsApp,
  onScrollToSection,
  onNavigate,
}: CinematicFooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (onOpenWhatsApp) {
      e.preventDefault();
      onOpenWhatsApp();
    } else {
      window.open("https://wa.me/35699991029", "_blank");
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
      
      {/* Reliable, full-width luxury footer */}
      <footer className="relative flex min-h-fit lg:min-h-[640px] w-full flex-col justify-between overflow-hidden bg-[#F8FAFC] text-slate-900 cinematic-footer-wrapper select-none pt-12 sm:pt-16 pb-20 sm:pb-24 lg:pb-6 border-t border-slate-200/90">
        
        {/* Ambient Soft Light & Grid Background */}
        <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* Giant background text (DIU CLINIC) */}
        <div
          className="footer-giant-bg-text absolute bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center hidden lg:block opacity-75"
        >
          {giantText}
        </div>

        {/* 1. Sleek Marquee Strip (Top of footer) */}
        <div className="relative w-full overflow-hidden border-y border-slate-200/90 bg-white/85 backdrop-blur-md py-3.5 z-10 shadow-2xs mb-6 sm:mb-8">
          <div className="flex w-max animate-footer-scroll-marquee text-[11px] md:text-xs font-black tracking-[0.25em] text-slate-600 uppercase">
            <MarqueeItem />
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 2. Main Center Content: Clean, Big Letters, Light Palette */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 my-6 sm:my-8 w-full max-w-5xl mx-auto">
          
          {/* Sub-Badge exact as Worksheet #25 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
            <span>Dental &amp; Implantology Unit with more than 25 years of experience</span>
          </div>

          {/* Giant Clean Heading in Dark Slate */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-editorial footer-text-glow tracking-tight mb-8 sm:mb-10 text-center leading-[1.05]"
          >
            {heading}
          </h2>

          {/* Interactive Magnetic Pills */}
          <div className="flex flex-col items-center gap-5 w-full">
            
            {/* Primary Action Pills */}
            <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 w-full">
              
              {/* WhatsApp Button with Real WhatsApp Logo */}
              <MagneticButton 
                as="button" 
                onClick={handleWhatsAppClick}
                className="whatsapp-magnetic-pill px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-transform"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>WhatsApp Us</span>
              </MagneticButton>
              
              {/* Direct Telephone - Exact Label as Worksheet #26 */}
              <MagneticButton 
                as="a" 
                href="tel:35623291029" 
                className="footer-glass-pill px-7 sm:px-9 py-4 sm:py-4.5 rounded-full text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 group shadow-sm hover:border-[#3EA3AC]"
              >
                <Phone className="w-4 h-4 text-[#3EA3AC] group-hover:scale-110 transition-transform" />
                <span>Phone Dental &amp; Implantology Unit (+356) 2329 1029</span>
              </MagneticButton>
            </div>

            {/* Secondary Navigation Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mt-2">
              <MagneticButton 
                as="button" 
                onClick={() => onNavigate ? onNavigate('/team') : handleNavClick('our-team')}
                className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
              >
                About Us
              </MagneticButton>

              <MagneticButton 
                as="button" 
                onClick={() => onNavigate ? onNavigate('/treatments') : handleNavClick('services')}
                className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
              >
                Treatments
              </MagneticButton>
              
              <MagneticButton 
                as="button" 
                onClick={() => onNavigate ? onNavigate('/prices') : handleNavClick('prices')}
                className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
              >
                Prices
              </MagneticButton>
              
              <MagneticButton 
                as="button" 
                onClick={() => onNavigate ? onNavigate('/referral') : handleNavClick('referrals')}
                className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
              >
                Referrals
              </MagneticButton>

              <MagneticButton 
                as="button" 
                onClick={() => onNavigate ? onNavigate('/blog') : handleNavClick('blog')}
                className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
              >
                Blog
              </MagneticButton>

              <MagneticButton 
                as="button" 
                onClick={handleNavClick('contact-booking')}
                className="footer-glass-pill px-5 sm:px-6 py-2.5 rounded-full text-slate-600 font-semibold text-xs hover:text-slate-950 hover:bg-white"
              >
                Contact
              </MagneticButton>
            </div>

          </div>
        </div>

        {/* 3. Bottom Bar / Credits (Exact Copyright #26, Removed Excellence badge #27) */}
        <div className="relative z-20 w-full pb-4 sm:pb-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200/70 pt-4 bg-white/40">
          
          {/* Copyright line exactly as Worksheet #26 */}
          <div className="text-slate-500 text-[10px] md:text-xs font-semibold tracking-wider order-2 md:order-1 text-center md:text-left">
            ©2026 Dental &amp; Implantology Unit Malta. All rights reserved.
          </div>

          {/* Back to top */}
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-slate-700 hover:text-slate-950 group order-3 border-slate-200 shadow-2xs"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300 text-[#00A896]" />
          </MagneticButton>

        </div>
      </footer>
    </>
  );
}
export default CinematicFooter;
