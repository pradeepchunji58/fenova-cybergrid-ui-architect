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
  Palette,
} from 'lucide-react';
import { VisualTheme } from '../types.ts';
import { LogoBrand } from './LogoBrand.tsx';

export const Footer: React.FC = () => {
  const { navigate, ui, settings, t, theme, setTheme } = useApp();

  const themeOptions: { key: VisualTheme; label: string; color: string }[] = [
    { key: 'tech-green', label: 'GREEN', color: '#0df2c9' },
    { key: 'cyber-blue', label: 'BLUE', color: '#00d2ff' },
    { key: 'crimson-red', label: 'RED', color: '#ff3366' },
  ];

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
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 hexagon-cut-sm">
              <div
                className="w-8 h-8 hexagon-cut-sm border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">ZERO_HARM_HSE</p>
                <p className="text-xs font-bold text-white">42.8M SAFE HOURS</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 hexagon-cut-sm">
              <div
                className="w-8 h-8 hexagon-cut-sm border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">MOMRA_EPC_CLASS</p>
                <p className="text-xs font-bold text-white">GRADE 1 CONTRACTOR</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 hexagon-cut-sm">
              <div
                className="w-8 h-8 hexagon-cut-sm border bg-black/40 flex items-center justify-center shrink-0"
                style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
              >
                <HardHat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">FLEET_TELEMETRY</p>
                <p className="text-xs font-bold text-white">1,850+ OWNED UNITS</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 hexagon-cut-sm">
              <div
                className="w-8 h-8 hexagon-cut-sm border bg-black/40 flex items-center justify-center shrink-0"
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
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => navigate('/')} className="inline-block">
              <LogoBrand size="md" />
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

          {/* Column 4: HQ Corporate Location & Contact */}
          <div className="space-y-3">
            <h4
              className="text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: 'var(--accent-color)' }}
            >
              GLOBAL HEADQUARTERS
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

        {/* Bottom Legal, Ticker, Theme Reform & Controls */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col xl:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-6">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left justify-center xl:justify-start">
            <p>© 2026 FENOVA HI-TECH CIVIL ENGINEERING CORP. ALL RIGHTS RESERVED.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[11px] text-slate-400">
              ACTIVE PALETTE: <span className="font-bold text-white uppercase">{theme.replace('-', ' ')}</span>
            </span>
          </div>

          {/* Green, Blue, Red Theme Reform Selector at the Bottom of the Website */}
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div
              id="footer-theme-selector"
              className="flex items-center gap-2 bg-black/70 border border-white/10 hexagon-cut-sm px-3.5 py-1.5 font-mono text-[11px]"
            >
              <span className="flex items-center gap-1.5 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                <span>THEME PALETTE:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {themeOptions.map((opt) => {
                  const isSelected = theme === opt.key;
                  return (
                    <button
                      key={opt.key}
                      id={`footer-theme-${opt.key}`}
                      onClick={() => setTheme(opt.key)}
                      data-cursor={`THEME_${opt.label}`}
                      className={`px-3 py-1 text-[10px] font-bold tracking-wider hexagon-cut-sm flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-white/15 text-white border'
                          : 'text-slate-400 hover:text-slate-200 bg-black/40 border border-white/5 hover:border-white/20'
                      }`}
                      style={{
                        borderColor: isSelected ? opt.color : undefined,
                        boxShadow: isSelected ? `0 0 12px ${opt.color}50` : undefined,
                      }}
                      title={`Switch to ${opt.label} Theme`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block shrink-0 transition-transform"
                        style={{
                          backgroundColor: opt.color,
                          boxShadow: `0 0 8px ${opt.color}`,
                          transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                        }}
                      />
                      <span style={{ color: isSelected ? opt.color : undefined }}>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleCursorMode}
                title="Toggle Custom X-Mark Reticle Cursor"
                className="px-2.5 py-1.5 hexagon-cut-sm border border-white/10 bg-white/5 hover:text-white transition-all flex items-center gap-1.5 text-[11px]"
              >
                <Crosshair className="w-3 h-3" style={{ color: 'var(--accent-color)' }} />
                <span>X_TRACKER_CURSOR</span>
              </button>
              <span>•</span>
              <button
                onClick={() => navigate('/admin')}
                className="hover:underline flex items-center gap-1 text-[11px]"
                style={{ color: 'var(--accent-color)' }}
              >
                <Terminal className="w-3 h-3" />
                <span>ADMIN_TERMINAL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
