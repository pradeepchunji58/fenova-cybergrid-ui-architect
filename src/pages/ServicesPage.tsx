import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers,
  HardHat,
  Search,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, navigate, ui, t, openQuoteModal } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const visibleServices = services
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const categories = ['all', ...Array.from(new Set(visibleServices.map((s) => s.category)))];

  const filteredServices = visibleServices.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      t(s.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(s.shortDescription).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-16 pb-20 text-slate-100 font-sans">
      {/* Page Header */}
      <section className="relative py-20 bg-[#04080e] text-white border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <span>{ui.services}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Multidisciplinary Civil & Construction Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Integrated engineering, procurement, and heavy construction solutions delivering structural resilience from underground foundations to high-elevation bridge viaducts.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'font-bold shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:border-white/20'
                }`}
                style={
                  selectedCategory === cat
                    ? {
                        backgroundColor: 'var(--accent-color)',
                        color: 'var(--accent-btn-text, #02060a)',
                      }
                    : {}
                }
              >
                {cat === 'all' ? ui.filterAll : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 font-mono">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={ui.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded border border-white/10 bg-black/50 text-slate-100 text-xs outline-none transition-colors"
              style={{ borderColor: searchQuery ? 'var(--accent-color)' : undefined }}
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((serv) => (
            <div
              key={serv.id}
              className="rounded overflow-hidden border border-white/10 flex flex-col justify-between group transition-all duration-300 bg-[#060b12] hover:border-white/30"
            >
              <div>
                <div className="h-64 overflow-hidden relative bg-black">
                  <img
                    src={serv.mainImage}
                    alt={t(serv.title)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-xs font-mono font-bold uppercase backdrop-blur-xs"
                    style={{ color: 'var(--accent-color)', border: '1px solid var(--accent-border)' }}
                  >
                    {serv.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold font-cyber text-white transition-colors">
                    {t(serv.title)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {t(serv.detailedDescription)}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Core Technical Deliverables:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                      {serv.features.slice(0, 2).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                          <span>{t(feat)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4 font-mono">
                <button
                  onClick={() => navigate(`/services/${serv.slug}`)}
                  className="text-xs font-bold hover:underline flex items-center gap-1"
                  style={{ color: 'var(--accent-color)' }}
                >
                  <span>{ui.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => openQuoteModal(serv.id)}
                  className="px-4 py-2 rounded text-xs font-bold tracking-wide transition-all"
                  style={{
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--accent-btn-text, #02060a)',
                  }}
                >
                  {ui.requestQuote}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ServiceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { services, projects, navigate, ui, t, openQuoteModal } = useApp();

  const service = services.find((s) => s.slug === slug) || services[0];
  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4 font-mono">
        <h2 className="text-2xl font-bold font-cyber">Service Specification Not Found</h2>
        <button
          onClick={() => navigate('/services')}
          className="px-4 py-2 rounded text-xs font-bold"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--accent-btn-text, #02060a)' }}
        >
          {ui.backToServices}
        </button>
      </div>
    );
  }

  const related = projects.filter((p) => service.relatedProjectIds?.includes(p.id) || p.category === 'infrastructure');

  return (
    <div className="space-y-16 pb-20 text-slate-100 font-sans">
      <section className="relative py-20 bg-[#04080e] text-white border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            <button onClick={() => navigate('/services')} className="hover:underline">
              {ui.services}
            </button>
            <span>/</span>
            <span>{t(service.title)}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">{t(service.title)}</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-sans">
            {t(service.shortDescription)}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="h-96 sm:h-[480px] rounded overflow-hidden shadow-2xl bg-black border border-white/10">
          <img src={service.mainImage} alt={t(service.title)} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-cyber text-white">Comprehensive Engineering Methodology</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{t(service.detailedDescription)}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold font-cyber" style={{ color: 'var(--accent-color)' }}>Technical Features & Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded border border-white/10 bg-black/40 flex items-start gap-2.5 font-sans">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                    <span className="text-xs text-slate-300">{t(feat)}</span>
                  </div>
                ))}
              </div>
            </div>

            {service.benefits.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-cyber" style={{ color: 'var(--accent-color)' }}>Strategic Project Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((ben, idx) => (
                    <div key={idx} className="p-4 rounded border border-white/10 bg-black/40 flex items-start gap-2.5 font-sans">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                      <span className="text-xs text-slate-300">{t(ben)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded border border-white/10 space-y-4 bg-[#060b12]">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>
                Tender This Capability
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Submit your project specifications or preliminary BoQ to receive detailed engineering proposals and mobilization timelines.
              </p>
              <button
                onClick={() => openQuoteModal(service.id)}
                className="w-full py-3 rounded text-xs font-bold font-mono tracking-wider uppercase transition-all"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--accent-btn-text, #02060a)',
                }}
              >
                {ui.requestQuote}
              </button>
            </div>

            {related.length > 0 && (
              <div className="space-y-3 font-mono">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Related Projects
                </h4>
                {related.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/projects/${rel.slug}`)}
                    className="p-3 rounded border border-white/10 bg-black/40 hover:border-white/30 cursor-pointer transition-all space-y-1"
                  >
                    <h5 className="text-xs font-bold font-cyber text-white line-clamp-1">{t(rel.name)}</h5>
                    <p className="text-[11px] font-mono" style={{ color: 'var(--accent-color)' }}>{rel.client}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
