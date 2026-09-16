import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { motion } from 'motion/react';
import {
  MapPin,
  Calendar,
  DollarSign,
  Building,
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Layers,
  Activity,
} from 'lucide-react';

export const ProjectsPage: React.FC<{ initialFilter?: 'all' | 'completed' | 'ongoing' }> = ({
  initialFilter = 'all',
}) => {
  const { projects, navigate, ui, t } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>(initialFilter);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const visibleProjects = projects
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order);

  const categories: string[] = ['all', ...Array.from(new Set<string>(visibleProjects.map((p) => String(p.category))))];

  const filteredProjects = visibleProjects.filter((p) => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchQuery =
      searchQuery === '' ||
      t(p.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(p.location).toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchCat && matchQuery;
  });

  return (
    <div className="space-y-12 pb-24 text-slate-100 font-sans">
      {/* Page Header Terminal */}
      <section className="relative py-16 bg-[#03060a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#0df2c9] tracking-widest uppercase">
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <span>SYSTEM_PORTFOLIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight text-white">
            STRATEGIC CIVIL & INFRASTRUCTURE ASSETS
          </h1>

          <p className="text-xs sm:text-sm font-sans text-slate-400 max-w-2xl leading-relaxed">
            Delivering landmark national transport networks, specialized deep foundations, heavy industrial turnkey plants, and marine coastal protection across sovereign hubs.
          </p>

          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500 pt-2 border-t border-white/5">
            <span>TOTAL_RECORDS: {filteredProjects.length}</span>
            <span>•</span>
            <span className="text-[#0df2c9]">SYS_COMPLIANCE: 100% NOMINAL</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 border border-white/10 bg-[#04080e]">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              data-cursor="ALL"
              className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                statusFilter === 'all'
                  ? 'bg-[#0df2c9] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              [ {ui.filterAll} ]
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              data-cursor="COMPLETED"
              className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                statusFilter === 'completed'
                  ? 'bg-[#0df2c9] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              [ {ui.completedProjects} ]
            </button>
            <button
              onClick={() => setStatusFilter('ongoing')}
              data-cursor="ONGOING"
              className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                statusFilter === 'ongoing'
                  ? 'bg-[#0df2c9] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              [ {ui.ongoingProjects} ]
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 font-mono">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="SEARCH_BY_ASSET_OR_CLIENT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded border border-white/10 bg-black/50 text-slate-100 text-xs outline-none focus:border-[#0df2c9] transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded border uppercase tracking-wider transition-all ${
                categoryFilter === cat
                  ? 'bg-[#0df2c9]/15 text-[#0df2c9] border-[#0df2c9]/60 font-bold'
                  : 'bg-white/[0.02] text-slate-400 border-white/10 hover:border-white/20'
              }`}
            >
              {cat === 'all' ? 'ALL_DISCIPLINES' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid with Motion Reveal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => navigate(`/projects/${project.slug}`)}
              data-cursor="EXPLORE"
              className="group cursor-pointer border border-white/10 bg-[#060b12] hover:border-[#0df2c9]/60 transition-all duration-300 relative flex flex-col justify-between overflow-hidden"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-1 left-1 text-[10px] text-slate-700 group-hover:text-[#0df2c9] font-mono transition-colors">+</span>
              <span className="absolute top-1 right-1 text-[10px] text-slate-700 group-hover:text-[#0df2c9] font-mono transition-colors">+</span>

              <div>
                <div className="relative h-60 overflow-hidden bg-black">
                  <img
                    src={project.mainImage}
                    alt={t(project.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b12] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-black/80 border border-[#0df2c9]/40 text-[#0df2c9] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
                      {project.status === 'completed' ? ui.completedStatus : ui.ongoingStatus}
                    </span>
                  </div>

                  {project.projectValue && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-xs border border-white/10">
                      {project.projectValue}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#0df2c9]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{t(project.location)}</span>
                  </div>

                  <h3 className="text-lg font-bold font-cyber text-white group-hover:text-[#0df2c9] transition-colors line-clamp-1">
                    {t(project.name)}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {t(project.description)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-[#0df2c9] transition-colors">
                  <span className="text-[11px]">CLIENT // {project.client}</span>
                  <span>{ui.viewDetails} →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ProjectDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { projects, navigate, ui, t, openQuoteModal } = useApp();
  const project = projects.find((p) => p.slug === slug) || projects[0];

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4 font-mono">
        <h2 className="text-2xl font-bold font-cyber">ASSET_NOT_FOUND</h2>
        <button onClick={() => navigate('/projects')} className="text-[#0df2c9] hover:underline">
          RETURN_TO_PORTFOLIO
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 text-slate-100 font-sans">
      {/* Detail Header */}
      <section className="relative py-16 bg-[#03060a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#0df2c9] tracking-widest uppercase">
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <button onClick={() => navigate('/projects')} className="hover:underline">
              {ui.projects}
            </button>
            <span>/</span>
            <span>{project.slug.toUpperCase()}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="px-2.5 py-1 rounded bg-black/80 border border-[#0df2c9]/40 text-[#0df2c9] text-[10px] font-mono tracking-widest uppercase">
                STATUS: {project.status.toUpperCase()}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-tight mt-2">
                {t(project.name)}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0df2c9]" />
                <span>{t(project.location)}</span>
                <span>•</span>
                <span>CLIENT: {project.client}</span>
              </p>
            </div>

            <button
              onClick={() => openQuoteModal()}
              data-cursor="TENDER"
              className="px-6 py-3.5 bg-[#0df2c9] text-slate-950 hover:bg-[#00f0b5] font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(13,242,201,0.3)] self-start lg:self-auto"
            >
              [ INQUIRE_SIMILAR_PROJECT ]
            </button>
          </div>
        </div>
      </section>

      {/* Main Detail Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 8-col: Media Gallery & Scope */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border border-white/10 overflow-hidden bg-black relative">
              <img
                src={project.mainImage}
                alt={t(project.name)}
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 font-mono text-[10px] text-[#0df2c9] border border-white/10">
                ASSET_PRIMARY_VIEW // {project.slug}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="p-8 border border-white/10 bg-[#060b12] space-y-4">
              <h2 className="text-lg font-bold font-cyber text-white">PROJECT_SPECIFICATION & CONTEXT</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {t(project.detailedDescription || project.description)}
              </p>
            </div>

            {/* Scope of Work */}
            {project.scopeOfWork && project.scopeOfWork.length > 0 && (
              <div className="p-8 border border-white/10 bg-[#060b12] space-y-4">
                <h2 className="text-lg font-bold font-cyber text-white">TECHNICAL_SCOPE_OF_WORK</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.scopeOfWork.map((scope, i) => (
                    <div key={i} className="p-3 border border-white/5 bg-white/[0.02] flex items-start gap-2.5 font-mono text-xs">
                      <span className="text-[#0df2c9] font-bold">&gt;</span>
                      <span className="text-slate-300 font-sans">{t(scope)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 4-col: Metadata Docket */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 border border-white/10 bg-[#060b12] space-y-5 font-mono text-xs">
              <h3 className="font-bold font-cyber text-sm text-[#0df2c9] pb-3 border-b border-white/10">
                TELEMETRY_DOSSIER
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">CLIENT</span>
                  <span className="text-white font-bold">{project.client}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">DISCIPLINE</span>
                  <span className="text-[#0df2c9] font-bold uppercase">{project.category}</span>
                </div>
                {project.projectValue && (
                  <div className="flex justify-between py-1.5 border-b border-white/5">
                    <span className="text-slate-500">VALUATION</span>
                    <span className="text-white font-bold">{project.projectValue}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">START_DATE</span>
                  <span className="text-slate-300">{project.startDate || 'Q1 2022'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-500">COMPLETION</span>
                  <span className="text-slate-300">{project.completionDate || 'Q4 2025'}</span>
                </div>
              </div>

              <button
                onClick={() => openQuoteModal()}
                className="w-full py-3 bg-[#0df2c9] text-slate-950 font-bold tracking-widest uppercase hover:bg-[#00f0b5] transition-all"
              >
                [ TENDER_INQUIRY ]
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
