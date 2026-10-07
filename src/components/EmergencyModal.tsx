import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { getAssetUrl } from '@/data/clinicData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white border border-rose-200 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900 my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200 transition-colors"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Emergency Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-900 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>St. James Hospital • Emergency Dental Care</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
            Toothache, a broken tooth or a lost filling?
          </h3>
          <p className="text-slate-600 text-sm mt-2 font-body leading-relaxed">
            We provide urgent treatment for severe pain, dental infections, knocked-out teeth, and facial trauma inside St. James Hospital in Sliema.
          </p>
        </div>

        {/* Direct Urgent Contact Channels */}
        <div className="space-y-4 mb-8">
          
          {/* 1. Opening Hours Line */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2BB4A7] font-heading">
                During Opening Hours (Reception Desk)
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0E2B4C]">
                (+356) 2329 1029
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Mon, Tue, Thu 09:00–18:00 · Wed 09:00–17:30 · Fri, Sat 09:00–13:30
              </div>
            </div>
            <a
              href="tel:+35623291029"
              className="px-6 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-extrabold text-xs uppercase tracking-wider no-underline text-center shrink-0 flex items-center justify-center gap-2 shadow-xs transition-transform hover:scale-102"
            >
              <Phone className="w-3.5 h-3.5 text-[#2BB4A7]" />
              <span>Call 2329 1029</span>
            </a>
          </div>

          {/* 2. Out of Hours Hospital Emergency 24/7 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 font-heading flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>Out-Of-Hours & Hospital Emergency (24/7)</span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-rose-950">
                (+356) 2329 1000
              </div>
              <div className="text-xs text-rose-800 mt-0.5">
                St. James Hospital 24-hour medical emergency triage admission
              </div>
            </div>
            <a
              href="tel:+35623291000"
              className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider no-underline text-center shrink-0 flex items-center justify-center gap-2 shadow-xs transition-transform hover:scale-102"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Call Hospital 24/7</span>
            </a>
          </div>

          {/* 3. Urgent WhatsApp Mobile */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-heading">
                Urgent WhatsApp Mobile
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-950">
                (+356) 9999 1029
              </div>
              <div className="text-xs text-emerald-800 mt-0.5">
                Message our team directly with photos or symptom notes
              </div>
            </div>
            <a
              href="https://wa.me/35699991029?text=Hello%20DiU%20Clinic,%20I%20have%20an%20urgent%20dental%20emergency."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider no-underline text-center shrink-0 flex items-center justify-center gap-2 shadow-xs transition-transform hover:scale-102"
            >
              <span>WhatsApp 9999 1029</span>
            </a>
          </div>

        </div>

        {/* Hospital Location and Email Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#0E2B4C]" />
            <span>Lower Ground Floor, St. James Hospital, Sliema, Malta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#2BB4A7]" />
            <a href="mailto:appointment@dentalunitmalta.com" className="text-[#0E2B4C] hover:underline font-semibold">
              appointment@dentalunitmalta.com
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
