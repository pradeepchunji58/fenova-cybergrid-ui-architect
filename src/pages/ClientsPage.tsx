import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Award,
  Building,
  ShieldCheck,
  FileCheck,
  Star,
  Quote,
} from 'lucide-react';
import { ClientLogoBadge } from '../components/ClientLogoBadge.tsx';

export const ClientsPage: React.FC = () => {
  const { clients, testimonials, navigate, ui, t } = useApp();

  const visibleClients = clients.filter((c) => c.visible).sort((a, b) => a.order - b.order);
  const visibleTestimonials = testimonials.filter((t) => t.visible).sort((a, b) => a.order - b.order);

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
            <span>{ui.clientAppreciation}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Sovereign & Industrial Client Trust
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Partnering with premier national ministries, sovereign wealth funds, energy conglomerates, and regional civil development authorities across the Middle East.
          </p>
        </div>
      </section>

      {/* Client Logos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            ESTEEMED PARTNERS & CLIENT ORGANIZATIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white">
            Key Strategic Relationships
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleClients.map((client) => (
            <div
              key={client.id}
              className="p-6 rounded border border-white/10 bg-[#060b12] hover:border-white/30 flex flex-col items-center text-center space-y-3 transition-all"
            >
              <div
                className="w-14 h-14 rounded-full bg-black/50 border flex items-center justify-center transition-colors"
                style={{
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent-color)',
                }}
              >
                <Building className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-cyber text-white">{client.name}</h4>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {client.category || 'CIVIL_PARTNER'}
                </span>
              </div>
              <div className="pt-2">
                <ClientLogoBadge company={client.name} logoUrl={client.logo} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Letters of Appreciation & Certificates Showcase */}
      <section className="py-16 border-y border-white/10 bg-[#03060a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
              OFFICIAL COMMENDATIONS & LETTERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white">
              Client Appreciation & Project Handover Certificates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Formal letters of recognition awarded to Fenova Hi-Tech Civil Engineering for flawless safety records, accelerated project commissioning, and strict adherence to geotechnical specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded border border-white/10 bg-[#050910] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2" style={{ color: 'var(--accent-color)' }}>
                  <Award className="w-6 h-6" />
                  <span className="font-bold text-sm uppercase font-mono">Saudi Aramco Commendation</span>
                </div>
                <ClientLogoBadge company="Saudi Aramco" />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-sans">
                "Fenova Hi-Tech Civil Engineering demonstrated exemplary engineering control and rigorous adherence to Aramco standard SAES during the construction of the multi-level heavy viaduct package. The zero-LTI safety achievement across 8.4 million man-hours represents an industry benchmark."
              </p>

              <div className="pt-2 text-xs text-slate-400 font-mono">
                <p className="font-bold text-white">General Manager, Project Management Department</p>
                <p className="text-slate-500">Saudi Aramco Upstream & Infrastructure Division</p>
              </div>
            </div>

            <div className="p-8 rounded border border-white/10 bg-[#050910] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2" style={{ color: 'var(--accent-color)' }}>
                  <Award className="w-6 h-6" />
                  <span className="font-bold text-sm uppercase font-mono">Ministry of Transport Recognition</span>
                </div>
                <ClientLogoBadge company="Royal Commission Riyadh" />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-sans">
                "Awarded to Fenova for finishing the Riyadh Western Ring Road deep pier foundations 45 days ahead of contractual schedule while navigating complex karstic limestone geology with zero traffic disruptions."
              </p>

              <div className="pt-2 text-xs text-slate-400 font-mono">
                <p className="font-bold text-white">Deputy Minister for Roads & Civil Structures</p>
                <p className="text-slate-500">Ministry of Transport and Logistic Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Small Sharpener-Rubber Logos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            DIRECT TESTIMONIALS & VERIFIED COMMENDATIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white">
            Executive Client Voices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((tItem) => (
            <div
              key={tItem.id}
              className="p-6 rounded border border-white/10 bg-[#050910] flex flex-col justify-between hover:border-white/30 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1" style={{ color: 'var(--accent-color)' }}>
                    {[...Array(tItem.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {/* Small sharpener rubber size company logo */}
                  <ClientLogoBadge
                    company={tItem.company}
                    logoUrl={tItem.clientLogo}
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed font-sans">
                  "{t(tItem.testimonial)}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <h4 className="text-sm font-bold text-white font-cyber">{tItem.clientName}</h4>
                <p className="text-xs font-mono font-semibold" style={{ color: 'var(--accent-color)' }}>
                  {t(tItem.position)}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">{tItem.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
