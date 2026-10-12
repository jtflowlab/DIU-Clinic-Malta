import React, { useState } from 'react';
import { 
  Building2, 
  ChevronRight, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Stethoscope, 
  ArrowRight,
  Send,
  AlertCircle
} from 'lucide-react';

interface ReferralPageProps {
  onNavigate: (route: string) => void;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    dentistName: '',
    dentistPhone: '',
    dentistEmail: '',
    practiceName: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientDob: '',
    referralReason: '',
    urgency: 'Routine (within 2-3 weeks)'
  });

  const [files, setFiles] = useState<File[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dentistName || !formData.dentistPhone || !formData.dentistEmail) {
      setErrorMessage('Please fill in all required Referring Dentist details.');
      return;
    }
    if (!formData.patientName || !formData.patientPhone || !formData.patientDob) {
      setErrorMessage('Please provide the patient full name, phone number, and date of birth.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('Please confirm agreement to clinical referral terms.');
      return;
    }

    setErrorMessage(null);
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-[#0E2B4C] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#2BB4A7]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#2BB4A7] cursor-pointer bg-transparent border-none p-0 text-slate-300"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-bold">Dentist Referral Portal</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
              Colleague Referral Portal At St James Hospital
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-heading mb-6 leading-tight">
              Dentist <span className="text-[#2BB4A7]">Referral Form</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-body">
              We work collaboratively with dental practitioners across Malta and Europe. When you refer a patient to Dr. Mark Diacono and our multidisciplinary hospital team, we treat them exclusively for the requested procedure and return them to your ongoing care with comprehensive clinical notes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Referral Form & Hospital Commitments */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl">
              
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-20 h-20 bg-teal-50 border border-teal-200 text-[#2BB4A7] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#0E2B4C] font-heading">
                    Referral Successfully Received
                  </h3>
                  <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you, Dr. <strong>{formData.dentistName}</strong>. Our clinical coordination desk At St James Hospital has registered the referral for <strong>{formData.patientName}</strong>. We will contact the patient promptly to coordinate diagnostics and keep you fully informed.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          dentistName: '',
                          dentistPhone: '',
                          dentistEmail: '',
                          practiceName: '',
                          patientName: '',
                          patientPhone: '',
                          patientEmail: '',
                          patientDob: '',
                          referralReason: '',
                          urgency: 'Routine (within 2-3 weeks)'
                        });
                        setFiles([]);
                      }}
                      className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Submit Another Referral
                    </button>
                    <button
                      onClick={() => onNavigate('/')}
                      className="px-6 py-3 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Step A: Referring Dentist Details */}
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-6">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-[#2BB4A7] font-extrabold text-xs flex items-center justify-center border border-teal-200">
                        1
                      </div>
                      <h3 className="text-lg font-bold text-[#0E2B4C] font-heading">
                        Referring Dentist Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Dentist Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. John Smith"
                          value={formData.dentistName}
                          onChange={(e) => setFormData({ ...formData, dentistName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Dental Practice / Clinic Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. St. Julian's Dental Surgery"
                          value={formData.practiceName}
                          onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Dentist Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +356 9999 1234"
                          value={formData.dentistPhone}
                          onChange={(e) => setFormData({ ...formData, dentistPhone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Dentist Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. dentist@surgery.com"
                          value={formData.dentistEmail}
                          onChange={(e) => setFormData({ ...formData, dentistEmail: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step B: Patient Details */}
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-6">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-[#2BB4A7] font-extrabold text-xs flex items-center justify-center border border-teal-200">
                        2
                      </div>
                      <h3 className="text-lg font-bold text-[#0E2B4C] font-heading">
                        Patient Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Patient Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Maria Borg"
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Patient Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.patientDob}
                          onChange={(e) => setFormData({ ...formData, patientDob: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Patient Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +356 7900 1234"
                          value={formData.patientPhone}
                          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Patient Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. patient@gmail.com"
                          value={formData.patientEmail}
                          onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step C: Clinical Information & Uploads */}
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-6">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-[#2BB4A7] font-extrabold text-xs flex items-center justify-center border border-teal-200">
                        3
                      </div>
                      <h3 className="text-lg font-bold text-[#0E2B4C] font-heading">
                        Clinical Referral Information &amp; Files
                      </h3>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Reason for Referral / Treatment Requested *
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Please provide clinical background, requested procedure (e.g. surgical extraction of impacted wisdom tooth, implant placement, DSD rehabilitation, IV sedation, CBCT scan), relevant medical history, or specific instructions..."
                          value={formData.referralReason}
                          onChange={(e) => setFormData({ ...formData, referralReason: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2BB4A7] font-body resize-y"
                        />
                      </div>

                      {/* File Upload UI */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Upload Radiographs / Photos / Clinical Reports (Optional)
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#2BB4A7] transition-colors bg-slate-50/50">
                          <Upload className="w-8 h-8 text-[#2BB4A7] mx-auto mb-2" />
                          <p className="text-xs text-slate-700 font-semibold mb-1">
                            Click to select or drag &amp; drop OPGs, CBCT slices, intraoral photos, or PDF reports
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Supported: JPG, PNG, PDF, DICOM up to 25MB each
                          </p>
                          <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.pdf,.dcm"
                            onChange={handleFileChange}
                            className="hidden"
                            id="referral-file-upload"
                          />
                          <label
                            htmlFor="referral-file-upload"
                            className="inline-block mt-3 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 cursor-pointer shadow-2xs"
                          >
                            Browse Files
                          </label>
                        </div>

                        {/* Uploaded File List */}
                        {files.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between px-3.5 py-2 bg-slate-100 rounded-xl text-xs">
                                <span className="font-medium text-slate-800 truncate max-w-xs">{file.name} ({(file.size / 1024).toFixed(0)} KB)</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="text-rose-600 hover:text-rose-800 font-bold ml-2 cursor-pointer"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Terms Acceptance */}
                      <div className="pt-2">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2BB4A7] focus:ring-[#2BB4A7]"
                          />
                          <span className="text-xs text-slate-600 leading-snug">
                            I confirm that I am referring this patient for specialized clinical evaluation/treatment and consent to clinical correspondence between DIU Clinic Malta and my practice in accordance with GDPR regulations.
                          </span>
                        </label>
                      </div>

                      {errorMessage && (
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-[#0E2B4C] hover:bg-[#2BB4A7] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Colleague Referral</span>
                      </button>

                    </div>
                  </div>

                </form>
              )}

            </div>

            {/* Sidebar Column: Colleague Commitment */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0E2B4C] mb-2 font-heading">
                  Collaborative Practice Promise
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  We treat referring practitioners as partners. Your patient is returned to your care immediately once the referred surgical, implant, or specialized treatment is concluded. We will never carry out unauthorized restorative work outside the scope of your referral.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#2BB4A7] flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0E2B4C] mb-2 font-heading">
                  Hospital Facilities
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-body mb-3">
                  Located inside St. James Hospital, Sliema, our clinic offers immediate access to:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                    <span>3D CBCT Cone-Beam diagnostic scans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                    <span>Hospital theatre sedation with Consultant Anaesthetist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2BB4A7]" />
                    <span>CEREC 3D single-day porcelain restorations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#0E2B4C] text-white p-7 rounded-3xl shadow-md">
                <div className="text-xs uppercase tracking-wider text-[#2BB4A7] font-bold mb-1">
                  Urgent Colleague Enquiries
                </div>
                <h4 className="text-lg font-bold font-heading mb-2">
                  Direct Referral Liaison
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Prefer discussing a complex case directly with Dr. Mark Diacono?
                </p>
                <a
                  href="tel:35623291029"
                  className="w-full py-3 rounded-full bg-[#2BB4A7] hover:bg-[#23998e] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 no-underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call (+356) 2329 1029</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
