import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  FileText,
  Lock,
  Download,
  Eye,
  ShieldCheck,
  Calendar,
  Layers,
  Search,
} from 'lucide-react';

export const BrochuresPage: React.FC = () => {
  const { documents, openDocumentModal, navigate, ui, t, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const visibleDocs = documents
    .filter((d) => d.visible)
    .sort((a, b) => a.order - b.order);

  const categories = ['all', ...Array.from(new Set(visibleDocs.map((d) => d.category)))];

  const filteredDocs = visibleDocs.filter((d) => {
    const matchCat = selectedCategory === 'all' || d.category === selectedCategory;
    const matchQuery =
      searchQuery === '' ||
      t(d.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(d.description).toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
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
            <span>{ui.brochures}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Controlled Technical Publications & Corporate Profiles
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Official brochures, pre-qualification dossiers, engineering fleet registries, and HSE manuals rendered through our secure document reader.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
                {cat === 'all' ? ui.filterAll : String(cat).toUpperCase()}
              </button>
            ))}
          </div>

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

      {/* Elegant Document Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded border border-white/10 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 bg-[#060b12] hover:border-white/30"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded border flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: 'var(--accent-badge)',
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 text-slate-400 border border-white/10">
                    {doc.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-cyber text-white line-clamp-2 transition-colors">
                    {t(doc.title)}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed font-sans">
                    {t(doc.description)}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 pt-2 border-t border-white/10">
                  <span>{doc.fileSize}</span>
                  <span>•</span>
                  <span>{doc.pagesCount || 16} Pages</span>
                  <span>•</span>
                  <span>{doc.uploadDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono">
                <button
                  onClick={() => openDocumentModal(doc)}
                  className="flex-1 py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider"
                  style={{
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--accent-btn-text, #02060a)',
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{ui.viewDocument}</span>
                </button>

                {doc.downloadAllowed ? (
                  <button
                    onClick={() => {
                      showToast(`Downloading: ${t(doc.title)}`, 'success');
                    }}
                    className="p-2 rounded border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                ) : (
                  <span
                    className="p-2 rounded border border-white/5 text-slate-600 cursor-not-allowed"
                    title="Download restricted by administrator"
                  >
                    <Lock className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
