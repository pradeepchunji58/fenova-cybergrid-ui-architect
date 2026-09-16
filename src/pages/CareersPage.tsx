import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  CheckCircle2,
  Search,
  ArrowRight,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { jobs: rawJobs, careers, vacancies, openApplyModal, navigate, ui, t } = useApp() as any;
  const jobs = rawJobs || careers || vacancies || [];
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const visibleJobs = (jobs || []).filter((j: any) => j && j.active);

  const departments = ['all', ...Array.from(new Set((jobs || []).map((j: any) => j?.department?.en).filter(Boolean)))];

  const filteredJobs = visibleJobs.filter((job) => {
    const matchDept = selectedDept === 'all' || job.department.en === selectedDept;
    const matchQuery =
      searchQuery === '' ||
      t(job.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(job.location).toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchQuery;
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
            <span>{ui.careers}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Build Civil Landmarks with Fenova
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Join a multi-national cadre of structural innovators, geotechnical masters, and project leaders shaping tomorrow's critical transport and industrial facilities.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono capitalize transition-all border ${
                  selectedDept === dept
                    ? 'font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                }`}
                style={
                  selectedDept === dept
                    ? {
                        backgroundColor: 'var(--accent-color)',
                        color: 'var(--accent-btn-text, #02060a)',
                        borderColor: 'var(--accent-color)',
                      }
                    : {}
                }
              >
                {dept === 'all' ? ui.filterAll : dept}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded border border-white/10 text-xs outline-none bg-[#070c14] text-slate-100 font-mono focus:border-white/30"
            />
          </div>
        </div>
      </section>

      {/* Vacancy Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded border border-white/10 bg-[#060b12] flex flex-col justify-between space-y-6 transition-all duration-300 group hover:border-white/30"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: 'var(--accent-badge)',
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                      borderWidth: '1px',
                    }}
                  >
                    {t(job.department)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {job.jobType}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-cyber text-white transition-colors">
                    {t(job.title)}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                      {t(job.location)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <GraduationCap className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                      {t(job.qualificationRequired)}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed font-sans">
                  {t(job.description)}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Key Responsibilities:</p>
                  <ul className="space-y-1 text-xs text-slate-300 font-sans">
                    {job.responsibilities.slice(0, 2).map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                        <span>{t(resp)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-[11px] text-slate-500 font-mono">
                  Deadline: {job.applicationDeadline}
                </span>

                <button
                  onClick={() => openApplyModal(job)}
                  className="px-5 py-2 rounded text-xs font-mono font-bold transition-all"
                  style={{
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--accent-btn-text, #02060a)',
                  }}
                >
                  {ui.applyNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
