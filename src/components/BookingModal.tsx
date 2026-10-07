import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  MessageSquare, 
  Phone, 
  Mail, 
  Building2, 
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
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: initialDefaults?.firstName || '',
    lastName: initialDefaults?.lastName || '',
    phone: initialDefaults?.phone || '',
    email: initialDefaults?.email || '',
    contactPreference: initialDefaults?.contactPreference || 'WhatsApp',
    clinic: 'St. James Hospital (Sliema Flagship)',
    treatment: initialDefaults?.treatment || 'Initial Dental Consultation & Check-up',
    doctor: initialDefaults?.doctor || '',
    urgency: initialDefaults?.urgency || 'This week (Monday – Friday)',
    notes: initialDefaults?.notes || ''
  });

  const [formValidationWarning, setFormValidationWarning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSubmittedDirectly, setIsSubmittedDirectly] = useState(false);

  // Reset or initialize on open
  React.useEffect(() => {
    if (initialDefaults) {
      setFormData(prev => ({
        ...prev,
        ...initialDefaults
      }));
    }
    setFormValidationWarning(false);
    setIsSubmittedDirectly(false);
  }, [isOpen, initialDefaults]);

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    const firstNameText = formData.firstName.trim();
    const lastNameText = formData.lastName.trim();
    const patientName = (firstNameText || lastNameText) ? `${firstNameText} ${lastNameText}`.trim() : '[Patient Name]';
    const phoneText = formData.phone.trim() || '[Phone Number]';
    const emailText = formData.email.trim() ? `\n✉️ *Email:* ${formData.email.trim()}` : '';
    const preference = formData.contactPreference;
    const clinicName = 'St. James Hospital (Sliema Flagship)';
    const treatmentText = formData.treatment || 'Initial Dental Consultation & Check-up';
    const doctorText = formData.doctor ? `\n👨‍⚕️ *Requested Clinician:* ${formData.doctor}` : '';
    const urgencyText = formData.urgency || 'This week';
    const notesText = formData.notes.trim() ? `\n📝 *Notes:* ${formData.notes.trim()}` : '';

    return `👋 *CLINICAL APPOINTMENT REQUEST • DiU CLINIC MALTA*
━━━━━━━━━━━━━━━━━━
👤 *Patient:* ${patientName}
📱 *Phone:* ${phoneText}${emailText}
🔔 *Preferred Contact Method:* ${preference}
🏛️ *Hospital Centre:* ${clinicName}
🦷 *Treatment:* ${treatmentText}${doctorText}
⏰ *Timeline / Urgency:* ${urgencyText}${notesText}
━━━━━━━━━━━━━━━━━━
_Sent via the official portal of DiU Clinic Malta (St. James Hospital Network). Please confirm appointment availability._`;
  };

  const handleSendWhatsApp = () => {
    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setFormValidationWarning(true);
      return;
    }
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
      setFormValidationWarning(true);
      return;
    }
    setFormValidationWarning(false);
    setIsSubmittedDirectly(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900 my-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={getAssetUrl('full_logo.png')}
              alt="DiU Dental & Implantology Unit"
              className="h-8 w-auto object-contain"
            />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2BB4A7] px-3 py-1 bg-teal-50 border border-teal-200 rounded-full">
              Hospital Appointment Desk
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
            Book a Consultation
          </h3>
          <p className="text-slate-600 text-sm mt-1 font-body">
            Submit your details directly or connect via our official hospital WhatsApp service.
          </p>
        </div>

        {/* Confirmation Screen When Form is Submitted Directly */}
        {isSubmittedDirectly ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#E8F8F6] border border-[#C5EDE8] text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#2BB4A7] text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] mb-2 font-heading">
              Appointment Request Received
            </h4>
            <p className="text-slate-700 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Our patient care coordinators at St. James Hospital (Sliema) have received your inquiry.
            </p>

            <div className="bg-white p-5 rounded-2xl border border-teal-100 max-w-md mx-auto text-left text-xs space-y-2 mb-6 shadow-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Selected Treatment:</span>
                <span className="font-bold text-[#0E2B4C]">{formData.treatment}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Preferred Contact:</span>
                <span className="font-bold text-[#0E2B4C]">{formData.contactPreference} ({formData.phone})</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Hospital Centre:</span>
                <span className="font-bold text-[#0E2B4C]">St. James Hospital, Sliema</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-medium">Urgency:</span>
                <span className="font-bold text-[#2BB4A7]">{formData.urgency}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleSendWhatsApp}
                className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Also Open in WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Interactive Split Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Left Side */}
            <form onSubmit={handleDirectSubmit} className="lg:col-span-7 space-y-4">
              
              {/* Separate First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent"
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>How do you prefer to be contacted? *</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['WhatsApp', 'Call Back', 'Email'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, contactPreference: method })}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border text-center ${
                        formData.contactPreference === method
                          ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {method === 'WhatsApp' ? '💬 WhatsApp' : method === 'Call Back' ? '📞 Call Back' : '✉️ Email'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone & Email Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2BB4A7]" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. appointment@dentalunitmalta.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Treatment Selection with General Consultation as #1 Default */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>Interested in *</span>
                </label>
                <select
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                >
                  {bookingTreatmentOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Timeline / Urgency */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>Timeline or Urgency</span>
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                >
                  <option value="Urgent Dental Emergency (Today / Tomorrow)">🚨 Urgent Dental Emergency (Today / Tomorrow)</option>
                  <option value="This week (Monday – Friday)">📅 This week (Monday – Friday)</option>
                  <option value="Next week">🗓️ Next week</option>
                  <option value="Planning ahead (Within this month)">🔍 Planning ahead (Within this month)</option>
                </select>
              </div>

              {/* Validation Warning */}
              {formValidationWarning && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Please provide both your First Name and Phone Number to continue.</span>
                </div>
              )}

              {/* Action Buttons: Form Submit (Direct) + WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#0E2B4C]"
                >
                  <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                  <span>Submit Appointment Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-emerald-600/30"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  Prefer to copy your message?
                </span>
                <button
                  type="button"
                  onClick={handleCopyWhatsAppMessage}
                  className="text-[11px] font-bold text-[#0E2B4C] hover:text-[#2BB4A7] underline flex items-center gap-1 cursor-pointer bg-transparent border-none"
                >
                  {copySuccess ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>
              </div>

            </form>

            {/* Right Side Live Phone Preview */}
            <div className="lg:col-span-5 hidden sm:block">
              <div className="bg-slate-900 rounded-3xl p-4 shadow-2xl border-2 border-slate-800 text-white relative">
                
                {/* Phone Notch */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                  <span>09:41</span>
                  <div className="w-16 h-3 bg-black rounded-full mx-auto" />
                  <span>5G 🔋</span>
                </div>

                {/* WhatsApp Bar */}
                <div className="flex items-center gap-3 py-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-[#0E2B4C] flex items-center justify-center text-[#2BB4A7] border border-[#2BB4A7]/40">
                    <span className="text-xs font-bold">DiU</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                      <span>DiU Clinic Malta</span>
                      <CheckCheck className="w-3 h-3 text-[#2BB4A7]" />
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>St. James Hospital Network</span>
                    </div>
                  </div>
                </div>

                {/* Message Bubble */}
                <div className="py-4 min-h-[240px] flex flex-col justify-end">
                  <div className="bg-[#005c4b] text-white p-3.5 rounded-2xl text-xs leading-relaxed shadow-md border border-emerald-600/40 font-mono">
                    <div className="text-[11px] font-bold text-emerald-200 mb-1">
                      👋 CLINICAL APPOINTMENT REQUEST
                    </div>
                    <div>👤 <strong>Patient:</strong> {`${formData.firstName} ${formData.lastName}`.trim() || '[Your Name]'}</div>
                    <div>📱 <strong>Phone:</strong> {formData.phone.trim() || '[Your Phone]'}</div>
                    <div>🔔 <strong>Preferred Contact:</strong> {formData.contactPreference}</div>
                    <div>🏛️ <strong>Location:</strong> St. James Hospital (Sliema)</div>
                    <div>🦷 <strong>Treatment:</strong> {formData.treatment}</div>
                    <div>⏰ <strong>Timeline:</strong> {formData.urgency}</div>
                    <div className="text-right text-[9px] text-emerald-300 mt-2">
                      Now ✓✓
                    </div>
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-400">
                  Live Preview of Your Submission
                </div>
              </div>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
};
