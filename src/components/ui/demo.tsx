"use client";

import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Demo() {
  return (
    <div className="relative w-full bg-[#070B12] min-h-screen font-sans selection:bg-[#27CFC3] selection:text-slate-950 overflow-x-hidden">

      {/* 
        MAIN CONTENT AREA 
        We use a high z-index and minimum height to allow the user 
        to scroll down and reveal the footer securely underneath.
      */}
      <main className="relative z-10 w-full min-h-[120vh] bg-[#070B12] flex flex-col items-center justify-center text-white border-b border-white/10 shadow-2xl rounded-b-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(39,207,195,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-neutral-300 mb-8 uppercase text-center px-4 font-editorial">
          Scroll down to reveal
        </h1>
        
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#27CFC3] to-transparent" />
      </main>

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
      
    </div>
  );
}
