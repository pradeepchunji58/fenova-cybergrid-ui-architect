import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { locations, settings, navigate, ui, t, showToast, refreshData } = useApp();

  const activeLocations = locations.filter((l) => l.status === 'active');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredLocation: activeLocations[0]?.name?.en || 'Riyadh Corporate Headquarters',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        showToast('Corporate message transmitted successfully.', 'success');
        refreshData();
      } else {
        showToast('Failed to submit message. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error during transmission.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-20 pb-20 text-slate-100 font-sans">
      {/* Page Header */}
      <section className="relative py-20 bg-[#04080e] text-white border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <span>{ui.contact}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Connect with Global Engineering Centers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Contact our corporate governance office in Riyadh, our Eastern Province heavy plant headquarters in Jubail, or our South Asian engineering design hub.
          </p>
        </div>
      </section>

      {/* Main Form & HQ Direct Channels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Inquiry Form */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded border border-white/10 bg-[#060b12] space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                GENERAL TRANSMISSION
              </span>
              <h2 className="text-2xl font-black font-cyber text-white mt-1">Send a Corporate Inquiry</h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                For commercial tendering and RFQs, please prefer our dedicated Request a Quote system.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-cyber text-white">Message Successfully Transmitted</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                  Your inquiry has been routed to the appropriate regional director. Our liaison officer will reply within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded text-xs font-mono font-bold"
                  style={{
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--accent-btn-text, #02060a)',
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-white/10 text-xs outline-none bg-black/40 text-slate-100 font-mono focus:border-white/30"
                      placeholder="e.g. Tariq Al-Mansoor"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Corporate Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-white/10 text-xs outline-none bg-black/40 text-slate-100 font-mono focus:border-white/30"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Telephone / Direct Line</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-white/10 text-xs outline-none bg-black/40 text-slate-100 font-mono focus:border-white/30"
                      placeholder="+966 50 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Target Regional Office</label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded border border-white/10 text-xs outline-none bg-black/40 text-slate-100 font-mono focus:border-white/30"
                    >
                      {activeLocations.map((loc) => (
                        <option key={loc.id} value={loc.name.en} className="bg-[#070c14] text-white">
                          {t(loc.name)} ({t(loc.country)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Subject Matter *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-white/10 text-xs outline-none bg-black/40 text-slate-100 font-mono focus:border-white/30"
                    placeholder="e.g. Geotechnical Joint-Venture Partnership"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded border border-white/10 text-xs outline-none resize-y bg-black/40 text-slate-100 font-sans focus:border-white/30"
                    placeholder="Provide details regarding your inquiry..."
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded text-xs font-mono font-bold flex items-center gap-2"
                    style={{
                      backgroundColor: 'var(--accent-color)',
                      color: 'var(--accent-btn-text, #02060a)',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Transmitting...' : 'Send Corporate Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Contact & Escalation Info */}
          <div className="space-y-6">
            <div className="p-6 rounded border border-white/10 bg-[#060b12] space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>
                Corporate Headquarters
              </h3>

              <div className="space-y-3 text-xs text-slate-300 font-sans">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                  <span>Fenova Tower, Level 24, King Fahd Road, Al Olaya District, Riyadh, KSA</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                  <a href={`tel:${settings?.phonePrimary}`} className="font-mono hover:underline">
                    {settings?.phonePrimary || '+966 11 489 7700'}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                  <a href={`mailto:${settings?.emailContact}`} className="font-mono hover:underline">
                    {settings?.emailContact || 'inquiry@fenovacivil.com'}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                  <span>Sunday – Thursday: 08:00 – 17:30 (AST)</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded border border-white/10 bg-[#060b12] space-y-3">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>
                Need Tender Pricing?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                If you have an RFQ, engineering tender, or preliminary BoQ, use our dedicated quotation portal for rapid technical review.
              </p>
              <button
                onClick={() => navigate('/quotation')}
                className="w-full py-2.5 rounded text-xs font-mono font-bold border transition-colors hover:bg-white/5"
                style={{
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent-color)',
                }}
              >
                Go to Request a Quote →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Operating Hubs Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            WORLDWIDE LOCATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-cyber text-white">
            Operating Centers Directory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeLocations.map((loc) => (
            <div
              key={loc.id}
              className="rounded border border-white/10 bg-[#060b12] overflow-hidden hover:border-white/30 transition-colors"
            >
              <div className="h-44 bg-black overflow-hidden relative">
                <img src={loc.locationImage} alt={t(loc.name)} className="w-full h-full object-cover" />
                <span
                  className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-mono font-bold bg-black/80"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {t(loc.country)}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h4 className="text-base font-bold font-cyber text-white">{t(loc.name)}</h4>
                <div className="space-y-1.5 text-xs text-slate-400 font-sans">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                    <span>{t(loc.address)}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono">
                    <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-color)' }} />
                    <span>{loc.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono">
                    <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-color)' }} />
                    <span>{loc.email}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
