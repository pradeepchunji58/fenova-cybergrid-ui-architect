import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  X,
  Briefcase,
  Upload,
  Send,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const ApplyJobModal: React.FC = () => {
  const { selectedVacancy, closeApplyModal, t, theme, showToast, refreshData } = useApp();
  const isLight = theme === 'modern-construction';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experienceYears: 5,
    qualification: '',
    coverLetter: '',
    resumeFileName: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!selectedVacancy) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vacancyId: selectedVacancy.id,
          vacancyTitle: t(selectedVacancy.title),
          ...formData,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        showToast('Application submitted successfully to Fenova HR Talent Acquisition.', 'success');
        refreshData();
      } else {
        showToast('Failed to submit application. Please retry.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error during application submittal.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-2xl max-h-[92vh] flex flex-col rounded-xl overflow-hidden shadow-2xl border ${
          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0d1622] border-[#1e2f42] text-slate-100'
        }`}
      >
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#080f18] border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading line-clamp-1">
                Apply for {t(selectedVacancy.title)}
              </h3>
              <p className="text-xs text-slate-400">
                {t(selectedVacancy.department)} • {t(selectedVacancy.location)}
              </p>
            </div>
          </div>
          <button
            onClick={closeApplyModal}
            className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-heading">Application Logged Successfully</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your dossier has been registered in the Fenova Human Capital database. Qualified candidates are contacted within 10 business days for technical assessment.
              </p>
              <button
                onClick={closeApplyModal}
                className="mt-4 px-6 py-2 rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--accent-btn-text, #02060a)',
                }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Years of Relevant Experience *</label>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Highest Degree / Certification *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                    }`}
                    placeholder="e.g. B.Sc. Civil Engineering, SCE Registered"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Current Residential City / Country</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                  }`}
                  placeholder="e.g. Riyadh, KSA or Mumbai, India"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Executive Summary / Cover Letter</label>
                <textarea
                  rows={3}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs outline-none resize-none ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black/30 border-slate-700 text-slate-100'
                  }`}
                  placeholder="Summarize your key engineering accomplishments, major projects delivered, and software expertise..."
                />
              </div>

              {/* CV File Upload */}
              <div className="p-3.5 rounded-lg border border-dashed border-slate-700 flex items-center justify-between bg-black/10">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-xs font-semibold">Attach Resume / Curriculum Vitae (PDF/DOCX)</p>
                    <p className="text-[11px] text-slate-500">Max size 25 MB</p>
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    id="career-cv"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, resumeFileName: e.target.files[0].name });
                      }
                    }}
                  />
                  <label
                    htmlFor="career-cv"
                    className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer border border-slate-700"
                  >
                    {formData.resumeFileName ? formData.resumeFileName : 'Choose CV'}
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md"
                  style={{
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--accent-btn-text, #02060a)',
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
