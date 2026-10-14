import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  User, 
  MessageSquare, 
  Phone, 
  Mail, 
  Smile, 
  Clock, 
  CheckCircle2, 
  Copy, 
  CheckCheck, 
  AlertCircle, 
  Calendar,
  Send
} from 'lucide-react';
import { BookingFormData } from '@/types';
import { bookingTreatmentOptions, getAssetUrl } from '@/data/clinicData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDefaults?: Partial<BookingFormData>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDefaults
}) => {
  const defaultTreatment = initialDefaults?.treatment || 'Dental Implants & Oral Surgery';

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: initialDefaults?.firstName || '',
    lastName: initialDefaults?.lastName || '',
    phone: initialDefaults?.phone || '',
    email: initialDefaults?.email || '',
    contactPreference: initialDefaults?.contactPreference || 'WhatsApp',
    clinic: 'At St James Hospital, Sliema',
    treatment: defaultTreatment,
    doctor: initialDefaults?.doctor || '',
    urgency: initialDefaults?.urgency || 'This week (Monday – Friday)',
    notes: initialDefaults?.notes || ''
  });

  const [formValidationWarning, setFormValidationWarning] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSubmittedDirectly, setIsSubmittedDirectly] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset or initialize when modal opens or defaults change
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        firstName: initialDefaults?.firstName ?? prev.firstName,
        lastName: initialDefaults?.lastName ?? prev.lastName,
        phone: initialDefaults?.phone ?? prev.phone,
        email: initialDefaults?.email ?? prev.email,
        contactPreference: initialDefaults?.contactPreference ?? prev.contactPreference,
        clinic: 'At St James Hospital, Sliema',
        treatment: initialDefaults?.treatment || prev.treatment || 'Dental Implants & Oral Surgery',
        doctor: initialDefaults?.doctor ?? prev.doctor,
        urgency: initialDefaults?.urgency ?? prev.urgency,
        notes: initialDefaults?.notes ?? prev.notes
      }));
      setFormValidationWarning(null);
      setAcceptedTerms(false);
      setIsSubmittedDirectly(false);
    }
  }, [isOpen, initialDefaults]);

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    const firstNameText = formData.firstName.trim();
    const lastNameText = formData.lastName.trim();
    const patientName = (firstNameText || lastNameText) ? `${firstNameText} ${lastNameText}`.trim() : '[Patient Name]';
    const phoneText = formData.phone.trim() || '[Phone Number]';
    const emailText = formData.email.trim() ? `\n✉️ *Email:* ${formData.email.trim()}` : '';
    const preference = formData.contactPreference;
    const clinicName = 'At St James Hospital, Sliema';
    const treatmentText = formData.treatment || 'Dental Implants & Oral Surgery';
    const doctorText = formData.doctor ? `\n👨‍⚕️ *Requested Clinician:* ${formData.doctor}` : '';
    const urgencyText = formData.urgency || 'This week';
    const notesText = formData.notes.trim() ? `\n📝 *Notes:* ${formData.notes.trim()}` : '';

    return `👋 *CLINICAL APPOINTMENT REQUEST • DiU CLINIC MALTA*
━━━━━━━━━━━━━━━━━━
👤 *Patient:* ${patientName}
📱 *Phone:* ${phoneText}${emailText}
🔔 *Preferred Contact Method:* ${preference}
🏛️ *Location:* ${clinicName}
🦷 *Treatment:* ${treatmentText}${doctorText}
⏰ *Timeline / Urgency:* ${urgencyText}${notesText}
━━━━━━━━━━━━━━━━━━
_Sent via the official portal of DiU Clinic Malta. Please confirm appointment availability._`;
  };

  const handleSendWhatsApp = () => {
    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setFormValidationWarning('Please provide both your First Name and Phone Number to continue.');
      return;
    }
    if (!acceptedTerms) {
      setFormValidationWarning('Please tick the box to accept the Terms & Conditions.');
      return;
    }
    setFormValidationWarning(null);
    const phoneTarget = '35699991029';
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyWhatsAppMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setFormValidationWarning('Please provide both your First Name and Phone Number to continue.');
      return;
    }
    if (!acceptedTerms) {
      setFormValidationWarning('Please tick the box to accept the Terms & Conditions.');
      return;
    }
    setFormValidationWarning(null);
    setIsSubmittedDirectly(true);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl xl:max-w-6xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-9 text-slate-900 my-auto max-h-[94vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 mb-1.5">
            <img
              src={getAssetUrl('DiU_Logo_Full_Colour.png')}
              alt="DiU Dental & Implantology Unit"
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#2BB4A7] px-2.5 py-0.5 bg-teal-50 border border-teal-200 rounded-full">
              APPOINTMENTS · ST JAMES HOSPITAL, SLIEMA
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0E2B4C] font-heading tracking-tight">
            Book a Consultation
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-body">
            Complete your details below to schedule an initial clinical assessment or fast-track directly via WhatsApp.
          </p>
        </div>

        {/* Confirmation Screen When Form is Submitted Directly */}
        {isSubmittedDirectly ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#E8F8F6] border border-[#C5EDE8] text-center my-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#2BB4A7] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] mb-2 font-heading">
              Appointment Request Received
            </h4>
            <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Our patient care coordinators at St James Hospital (Sliema) have received your enquiry and will contact you via <strong>{formData.contactPreference}</strong> ({formData.phone}).
            </p>

            <div className="bg-white p-5 rounded-2xl border border-teal-100 max-w-lg mx-auto text-left text-xs sm:text-sm space-y-2.5 mb-6 shadow-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Selected Treatment:</span>
                <span className="font-bold text-[#0E2B4C]">{formData.treatment}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Preferred Contact:</span>
                <span className="font-bold text-[#0E2B4C]">{formData.contactPreference} ({formData.phone})</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Location:</span>
                <span className="font-bold text-[#0E2B4C]">At St James Hospital, Sliema</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-medium">Urgency:</span>
                <span className="font-bold text-[#2BB4A7]">{formData.urgency}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleSendWhatsApp}
                className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Also Open in WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Interactive Split Grid Form */
          <form onSubmit={handleDirectSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Form Left Side: Spacious & Clear Inputs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              {/* Separate First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>First Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Susanna"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent transition-all shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>Last Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diacono"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>How do you prefer our team to contact you? *</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['WhatsApp', 'Call Back', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, contactPreference: method })}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border text-center flex items-center justify-center gap-1.5 ${
                        formData.contactPreference === method
                          ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {method === 'WhatsApp' ? '💬 WhatsApp' : method === 'Call Back' ? '📞 Call Back' : '✉️ Email'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +356 9999 1029"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent transition-all shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. susanna@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Treatment Selection & Urgency in 2-Column Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Smile className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>Selected Treatment *</span>
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                  >
                    {formData.treatment && !bookingTreatmentOptions.includes(formData.treatment) && (
                      <option value={formData.treatment}>{formData.treatment}</option>
                    )}
                    {bookingTreatmentOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>Urgency / Timeline</span>
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                  >
                    <option value="Urgent Dental Emergency (Today / Tomorrow)">🚨 Urgent Emergency</option>
                    <option value="This week (Monday – Friday)">📅 This week (Mon–Fri)</option>
                    <option value="Next week">🗓️ Next week</option>
                    <option value="Planning ahead (Within this month)">🔍 Planning ahead</option>
                  </select>
                </div>
              </div>

              {/* Free-text Patient Needs, Concerns or Questions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>Notes / Dental Concerns / Preferred Days (Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe any specific symptoms, anxiety concerns, or questions for the doctor..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent font-body resize-none"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2BB4A7] focus:ring-[#2BB4A7] cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I accept the <strong className="text-[#0E2B4C] underline">Terms &amp; Conditions</strong> and consent to DiU Clinic coordinating my consultation at St James Hospital.
                  </span>
                </label>
              </div>

              {/* Validation Warning */}
              {formValidationWarning && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formValidationWarning}</span>
                </div>
              )}

              {/* Action Buttons for Mobile View */}
              <div className="lg:hidden pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#0E2B4C]"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Submit Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-emerald-600/30"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

            </div>

            {/* Right Side: Expanded Live Phone Mockup & Anchored Desktop Action Center */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm">
              
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Ticket Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    DIRECT ROUTE
                  </span>
                </div>

                {/* Expanded Smartphone Frame */}
                <div className="bg-slate-950 rounded-[30px] p-4 shadow-2xl border-4 border-slate-800 text-white relative w-full mb-4">
                  
                  {/* Dynamic Island Notch */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px] text-slate-400 font-mono">
                    <span>09:41</span>
                    <div className="w-16 h-3.5 bg-black rounded-full mx-auto flex items-center justify-end px-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    </div>
                    <span>5G 🔋</span>
                  </div>

                  {/* WhatsApp Bar */}
                  <div className="flex items-center gap-2.5 py-2.5 border-b border-slate-800/80">
                    <div className="w-8 h-8 rounded-full bg-[#0E2B4C] flex items-center justify-center text-[#2BB4A7] border border-[#2BB4A7]/40 text-xs font-black shadow-inner">
                      DiU
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        <span>DiU Clinic Malta</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#2BB4A7]" />
                      </div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>At St James Hospital, Sliema</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Bubble */}
                  <div className="py-3 flex flex-col justify-end">
                    <div className="bg-[#005c4b] text-white p-3.5 rounded-2xl text-xs leading-relaxed shadow-lg border border-emerald-600/40 font-mono space-y-1">
                      <div className="text-[10px] font-extrabold text-amber-300 tracking-wider pb-1 border-b border-emerald-600/50">
                        👋 CLINICAL APPOINTMENT REQUEST
                      </div>
                      <div className="text-[11px] pt-1">
                        👤 <strong>Patient:</strong> {`${formData.firstName} ${formData.lastName}`.trim() || '[Your Name]'}
                      </div>
                      <div className="text-[11px]">
                        📱 <strong>Phone:</strong> {formData.phone.trim() || '[Your Phone]'}
                      </div>
                      <div className="text-[11px]">
                        🔔 <strong>Contact via:</strong> {formData.contactPreference}
                      </div>
                      <div className="text-[11px]">
                        🏛️ <strong>Location:</strong> At St James Hospital, Sliema
                      </div>
                      <div className="text-[11px]">
                        🦷 <strong>Treatment:</strong> {formData.treatment}
                      </div>
                      <div className="text-[11px]">
                        ⏰ <strong>Timeline:</strong> {formData.urgency}
                      </div>
                      {formData.notes.trim() && (
                        <div className="text-[10px] text-emerald-100 pt-1 border-t border-emerald-600/40 italic line-clamp-2">
                          📝 <strong>Notes:</strong> {formData.notes.trim()}
                        </div>
                      )}
                      <div className="text-right text-[9px] text-emerald-300 pt-1 flex items-center justify-end gap-1">
                        <span>Just now</span>
                        <span className="text-sky-300 font-bold">✓✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-slate-400 font-medium">
                    Live Preview of Your Submission
                  </div>
                </div>
              </div>

              {/* Right-Hand Desktop Action Controls */}
              <div className="hidden lg:flex flex-col space-y-3 pt-2">
                {/* Direct Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#0E2B4C] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Submit Consultation Request</span>
                </button>

                {/* WhatsApp Send Button */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-emerald-600/30 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send via WhatsApp</span>
                </button>

                {/* Copy Text Option */}
                <div className="flex items-center justify-between px-1 text-[11px]">
                  <span className="text-slate-500">Prefer to paste manually?</span>
                  <button
                    type="button"
                    onClick={handleCopyWhatsAppMessage}
                    className="font-bold text-[#0E2B4C] hover:text-[#2BB4A7] underline flex items-center gap-1 cursor-pointer bg-transparent border-none"
                  >
                    {copySuccess ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                  </button>
                </div>

                {/* Reassurance Footer */}
                <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-200 text-[10px] text-slate-500 text-center font-medium">
                  <div>🔒 100% Confidential</div>
                  <div>🏥 St James Hospital</div>
                  <div>⚡ Rapid Reply</div>
                </div>
              </div>

            </div>

          </form>
        )}

      </motion.div>
    </div>
  );
};
