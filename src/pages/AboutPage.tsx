import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  ShieldCheck,
  Award,
  HardHat,
  Compass,
  CheckCircle2,
  ArrowRight,
  Building,
  Target,
  Eye,
  Users,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, navigate, ui, t } = useApp();

  return (
    <div className="space-y-20 pb-20 text-slate-100 font-sans">
      {/* Page Hero Header */}
      <section className="relative py-20 bg-[#04080e] text-white border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <span>{ui.about}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Engineering Legacy Built on Structural Integrity
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Founded in 1992, Fenova Hi-Tech Civil Engineering has evolved from a specialist geotechnical groundworks contractor into a premier international EPC and mega-infrastructure builder across the Middle East and South Asia.
          </p>

          {/* Sub-Navigation Tabs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/about')}
              className="px-4 py-2 rounded text-xs font-bold font-mono"
              style={{
                backgroundColor: 'var(--accent-color)',
                color: 'var(--accent-btn-text, #02060a)',
              }}
            >
              Company Overview
            </button>
            <button
              onClick={() => navigate('/about/leadership')}
              className="px-4 py-2 rounded text-xs font-semibold font-mono bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
              Leadership & Board
            </button>
            <button
              onClick={() => navigate('/about/locations')}
              className="px-4 py-2 rounded text-xs font-semibold font-mono bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
              Operating Hubs & Branches
            </button>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded border border-white/10 bg-[#060b12] space-y-4">
            <div
              className="w-12 h-12 rounded bg-black/40 border flex items-center justify-center"
              style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
            >
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-cyber text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              To deliver resilient, future-ready civil infrastructure and industrial facilities that catalyze regional economic growth while maintaining zero lost-time incidents and uncompromising environmental stewardship.
            </p>
          </div>

          <div className="p-8 rounded border border-white/10 bg-[#060b12] space-y-4">
            <div
              className="w-12 h-12 rounded bg-black/40 border flex items-center justify-center"
              style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
            >
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-cyber text-white">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              To be recognized across the Middle East and globally as the most technologically disciplined and dependable heavy civil engineering corporation, setting benchmarks for mega-scale construction efficiency.
            </p>
          </div>

          <div className="p-8 rounded border border-white/10 bg-[#060b12] space-y-4">
            <div
              className="w-12 h-12 rounded bg-black/40 border flex items-center justify-center"
              style={{ borderColor: 'var(--accent-border)', color: 'var(--accent-color)' }}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-cyber text-white">Core Values</h3>
            <ul className="text-xs sm:text-sm text-slate-400 space-y-2 font-sans">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                <span>Zero Compromise on Health, Safety & Environment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                <span>Precision Engineering & Sub-Millimeter Tolerances</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                <span>Contractual Honesty, Integrity & Early Delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Corporate Capabilities & Plant Fleet */}
      <section className="py-16 border-y border-white/10 bg-[#03060a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
              HEAVY PLANT & ASSET BASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white">
              Self-Sustaining Equipment Fleet & Technical Yards
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Unlike transactional broker-contractors, Fenova owns and operates an extensive proprietary machinery registry. Our internal ownership guarantees immediate mobilization for mega tenders without supply chain delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded border border-white/10 bg-[#060b12]">
              <h4 className="text-lg font-bold font-cyber mb-2" style={{ color: 'var(--accent-color)' }}>
                1,850+ Heavy Machinery Units
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Includes Bauer BG-40 rotary hydraulic piling rigs, 600-ton Liebherr crawler cranes, twin segmental launching gantries, and automated Caterpillar earthmoving fleets.
              </p>
            </div>

            <div className="p-6 rounded border border-white/10 bg-[#060b12]">
              <h4 className="text-lg font-bold font-cyber mb-2" style={{ color: 'var(--accent-color)' }}>
                Proprietary Precast Concrete Yards
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Over 300,000 m² of certified temperature-controlled precast yards in Jubail and Riyadh capable of producing 25 box girders per week under strict curing regimes.
              </p>
            </div>

            <div className="p-6 rounded border border-white/10 bg-[#060b12]">
              <h4 className="text-lg font-bold font-cyber mb-2" style={{ color: 'var(--accent-color)' }}>
                Quality Testing Laboratories
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                ISO 17025 accredited materials testing labs for aggregate petrography, concrete compressive strength, ultrasonic weld inspection, and soil triaxial testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Regulatory Accreditations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            COMPLIANCE & GOVERNANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-cyber text-white">
            Official Accreditations & Licenses
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {settings?.certifications.map((cert, i) => (
            <div
              key={i}
              className="p-4 rounded border border-white/10 bg-[#060b12] flex items-center gap-3 hover:border-white/30 transition-colors"
            >
              <Award className="w-5 h-5 shrink-0" style={{ color: 'var(--accent-color)' }} />
              <span className="text-xs font-semibold font-mono text-slate-200">{cert}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
