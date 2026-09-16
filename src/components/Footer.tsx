import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  ShieldCheck,
  Award,
  HardHat,
  FileCheck,
  Crosshair,
  Terminal,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, ui, settings, t } = useApp();

  const toggleCursorMode = () => {
    if (document.body.classList.contains('custom-cursor-active')) {
      document.body.classList.remove('custom-cursor-active');
    } else {
      document.body.classList.add('custom-cursor-active');
    }
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-white/10 bg-[#020407] text-slate-400 transition-colors relative"
    >
      {/* Corner crosshairs */}
      <span className="absolute -top-1 -left-1 text-[10px] font-mono leading-none z-10" style={{ color: 'var(--accent-color)' }}>+</span>
      <span className="absolute -top-1 -right-1 text-[10px] font-mono leading-none z-10" style={{ color: 'var(--accent-color)' }}>+</span>

      {/* Upper Terminal Credentials Bar */}
      <div className="border-b border-white/5 bg-[#03060a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded">
              <div
                className="w-8 h-8 rounded border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">ZERO_HARM_HSE</p>
                <p className="text-xs font-bold text-white">42.8M SAFE HOURS</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded">
              <div
                className="w-8 h-8 rounded border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">MOMRA_EPC_CLASS</p>
                <p className="text-xs font-bold text-white">GRADE 1 CONTRACTOR</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded">
              <div
                className="w-8 h-8 rounded border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <HardHat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">FLEET_TELEMETRY</p>
                <p className="text-xs font-bold text-white">1,850+ OWNED UNITS</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded">
              <div
                className="w-8 h-8 rounded border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">ARAMCO_APPROVED</p>
                <p className="text-xs font-bold" style={{ color: 'var(--accent-color)' }}>VENDOR #10049281</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div
                className="w-10 h-10 rounded border bg-[#060c13] flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black font-cyber tracking-wider text-white transition-colors">
                  FENOVA
                </span>
                <span
                  className="block text-[10px] font-mono tracking-widest uppercase font-semibold"
                  style={{ color: 'var(--accent-color)' }}
                >
                  FENOVA HI-TECH CIVIL ENGINEERING
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-sans">
              {t(settings?.tagline) ||
                'Pioneering mega-scale civil engineering, sustainable transportation corridors, deep foundations, and turnkey industrial EPC across the Middle East and South Asia.'}
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 border border-white/10 hover:border-white/40 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-white/10 hover:border-white/40 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-white/10 hover:border-white/40 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Modules */}
          <div className="space-y-3">
            <h4
              className="text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: 'var(--accent-color)' }}
            >
              CORE_DIRECTORY
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.aboutUs}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.services}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/projects')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.projects}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/clients')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.clients}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.careers}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Portfolios & Sectors */}
          <div className="space-y-3">
            <h4
              className="text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: 'var(--accent-color)' }}
            >
              SECTORS // EPC
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> Civil & Heavy Structural
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> Transportation Corridors
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/projects/completed')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.completedProjects}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/projects/ongoing')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">&gt;</span> {ui.ongoingProjects}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: HQ Telemetry & Coordinates */}
          <div className="space-y-3">
            <h4
              className="text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: 'var(--accent-color)' }}
            >
              HQ_COORDINATES
            </h4>
            <div className="space-y-2.5 text-xs font-mono text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                <span className="font-sans text-xs">King Fahd Road, Riyadh 12214, KSA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-color)' }} />
                <a href={`tel:${settings?.phonePrimary || '+966114897700'}`} className="hover:text-white">
                  {settings?.phonePrimary || '+966 11 489 7700'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-color)' }} />
                <a href={`mailto:${settings?.emailContact || 'inquiry@fenovacivil.com'}`} className="hover:text-white">
                  {settings?.emailContact || 'inquiry@fenovacivil.com'}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/brochures')}
                  className="text-xs font-mono hover:underline flex items-center gap-1"
                  style={{ color: 'var(--accent-color)' }}
                >
                  [ {ui.brochures} ] →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Ticker & Custom Cursor Toggle */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© 2026 FENOVA HI-TECH CIVIL ENGINEERING CORP. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleCursorMode}
              title="Toggle Custom X-Mark Reticle Cursor"
              className="px-2 py-1 rounded border border-white/10 bg-white/5 hover:text-white transition-all flex items-center gap-1.5 text-[11px]"
            >
              <Crosshair className="w-3 h-3" style={{ color: 'var(--accent-color)' }} />
              <span>X_TRACKER_CURSOR</span>
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/admin')}
              className="hover:underline flex items-center gap-1"
              style={{ color: 'var(--accent-color)' }}
            >
              <Terminal className="w-3 h-3" />
              <span>ADMIN_TERMINAL</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
