import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  X,
  FileText,
  Send,
  Building,
  Upload,
  CheckCircle2,
  DollarSign,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const QuotationForm: React.FC<{ isModal?: boolean; onClose?: () => void }> = ({ isModal = false, onClose }) => {
  const { services, theme, showToast, refreshData } = useApp();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    country: 'Saudi Arabia',
    location: 'Riyadh',
    projectType: 'Heavy Infrastructure & Bridges',
    serviceRequired: services[0]?.id || 'Civil Engineering & Heavy Foundations',
    projectDescription: '',
    estimatedProjectSize: '',
    budgetRange: '$20M - $50M USD',
    preferredContactMethod: 'email' as 'email' | 'phone' | 'teams_meeting',
    attachmentFileName: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone || !formData.projectDescription) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedId(data.quoteId);
        showToast('Quotation request submitted to Fenova Commercial Tendering.', 'success');
        refreshData();
      } else {
        showToast('Failed to submit quote request. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error during submission.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedId) {
    return (
      <div className="p-8 sm:p-12 text-center space-y-4 font-mono">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border"
          style={{
            backgroundColor: 'var(--accent-badge)',
            borderColor: 'var(--accent-border)',
            color: 'var(--accent-color)',
          }}
        >
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold font-cyber text-white">Tender Request Received</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto font-sans">
          Reference Code: <span className="font-mono font-bold" style={{ color: 'var(--accent-color)' }}>{submittedId}</span>.
          Our Lead Commercial Tendering Engineer and Geotechnical Estimations team will analyze your project parameters within 24 business hours.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wider"
              style={{
                backgroundColor: 'var(--accent-color)',
                color: 'var(--accent-btn-text, #02060a)',
              }}
            >
              Close Window
            </button>
          )}
        </div>
      </div>
    );
  }

  const inputClasses =
    'w-full px-3.5 py-2.5 rounded border border-white/15 bg-black/40 text-slate-100 text-sm outline-none transition-colors focus:border-white/40 font-mono';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {/* Contact Details */}
      <div>
        <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--accent-color)' }}>
          <Building className="w-4 h-4" /> 1. Client & Organization Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">First Name *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={inputClasses}
              placeholder="e.g. Abdullah"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Last Name *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={inputClasses}
              placeholder="e.g. Al-Otaibi"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Company / Authority Name *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={inputClasses}
              placeholder="e.g. Saudi Aramco / Red Sea Development"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Official Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
              placeholder="tenders@organization.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Direct Phone / Mobile *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClasses}
              placeholder="+966 5X XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Country of Execution</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className={inputClasses}
            >
              <option value="Saudi Arabia">Kingdom of Saudi Arabia</option>
              <option value="India">India</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Qatar">Qatar</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Oman">Oman</option>
              <option value="Other">Other International Jurisdiction</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Scope & Requirements */}
      <div className="pt-2 border-t border-white/10">
        <h4 className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--accent-color)' }}>
          <FileText className="w-4 h-4" /> 2. Technical Scope & Specifications
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Primary Engineering Discipline *</label>
            <select
              value={formData.serviceRequired}
              onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
              className={inputClasses}
            >
              <option value="Civil Engineering & Heavy Foundations">Civil Engineering & Heavy Foundations</option>
              <option value="General & Industrial Construction">General & Industrial EPC Construction</option>
              <option value="Infrastructure & Transportation Corridors">Infrastructure & Transportation Corridors</option>
              <option value="Marine & Coastal Engineering">Marine, Quays & Coastal Protection</option>
              <option value="Turnkey EPC Project Management">Turnkey EPC Project Management</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Estimated Budget Range</label>
            <select
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className={inputClasses}
            >
              <option value="$10M - $25M USD">$10M - $25M USD</option>
              <option value="$25M - $50M USD">$25M - $50M USD</option>
              <option value="$50M - $100M USD">$50M - $100M USD</option>
              <option value="$100M+ USD">$100M+ USD (Mega Package)</option>
              <option value="Confidential / To Be Determined">Confidential / To Be Determined</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Project Site / City Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={inputClasses}
              placeholder="e.g. Jubail Phase 2 / Riyadh Ring Road"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Estimated Footprint / Size</label>
            <input
              type="text"
              value={formData.estimatedProjectSize}
              onChange={(e) => setFormData({ ...formData, estimatedProjectSize: e.target.value })}
              className={inputClasses}
              placeholder="e.g. 18.5 km viaduct / 140,000 m² plot"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Project Scope & Tendering Brief *</label>
          <textarea
            required
            rows={4}
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded border border-white/15 bg-black/40 text-slate-100 text-sm outline-none transition-colors resize-y font-mono focus:border-white/40"
            placeholder="Please detail geotechnical requirements, expected foundation depth, target mobilization window, and required engineering certifications..."
          />
        </div>

        {/* Attachment Upload Simulation */}
        <div className="mt-4 p-4 rounded border border-dashed border-white/20 bg-black/20 flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
            <div>
              <p className="text-xs font-semibold text-slate-200">Attach RFQ Documents / Preliminary BoQ (Optional)</p>
              <p className="text-[11px] text-slate-500">PDF, DWG, or ZIP up to 50 MB</p>
            </div>
          </div>
          <div>
            <input
              type="file"
              id="quote-file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFormData({ ...formData, attachmentFileName: e.target.files[0].name });
                }
              }}
            />
            <label
              htmlFor="quote-file"
              className="px-3 py-1.5 rounded text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer border border-white/10"
            >
              {formData.attachmentFileName ? formData.attachmentFileName : 'Browse File'}
            </label>
          </div>
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 font-mono">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
          <span>Contact:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              checked={formData.preferredContactMethod === 'email'}
              onChange={() => setFormData({ ...formData, preferredContactMethod: 'email' })}
            />
            <span>Email</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              checked={formData.preferredContactMethod === 'phone'}
              onChange={() => setFormData({ ...formData, preferredContactMethod: 'phone' })}
            />
            <span>Phone</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              checked={formData.preferredContactMethod === 'teams_meeting'}
              onChange={() => setFormData({ ...formData, preferredContactMethod: 'teams_meeting' })}
            />
            <span>MS Teams</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all uppercase tracking-wider"
          style={{
            backgroundColor: 'var(--accent-color)',
            color: 'var(--accent-btn-text, #02060a)',
          }}
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Transmitting...' : 'Submit Quotation Request'}</span>
        </button>
      </div>
    </form>
  );
};

export const QuotationModal: React.FC = () => {
  const { quoteModalOpen, closeQuoteModal } = useApp();
  if (!quoteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded overflow-hidden shadow-2xl border border-white/15 bg-[#060b12] text-slate-100">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#04080e]">
          <div>
            <h3 className="text-lg font-bold font-cyber text-white">Request an Engineering Quotation</h3>
            <p className="text-xs text-slate-400 font-mono">Direct transmission to Fenova Commercial Tendering & Estimations</p>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-1.5 rounded hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <QuotationForm isModal onClose={closeQuoteModal} />
        </div>
      </div>
    </div>
  );
};
