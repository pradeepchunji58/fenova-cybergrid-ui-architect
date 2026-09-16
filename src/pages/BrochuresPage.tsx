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
  const { documents, openDocumentModal, navigate, ui, t, theme, showToast } = useApp();
  const isLight = theme === 'modern-construction';

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
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <section className="relative py-20 bg-[#070d14] text-white border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-engineering opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <span>{ui.brochures}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Controlled Technical Publications & Corporate Profiles
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Official brochures, pre-qualification dossiers, engineering fleet registries, and HSE manuals rendered through our secure document reader.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : isLight
                    ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? ui.filterAll : String(cat).toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={ui.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs outline-none ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0d1622] border-slate-700 text-slate-100'
              }`}
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
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${
                isLight
                  ? 'bg-white border-slate-200 hover:shadow-xl'
                  : 'bg-[#0d1622] border-[#1e2f42] hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]'
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-black/40 text-slate-400 border border-slate-800">
                    {doc.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-heading line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {t(doc.title)}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {t(doc.description)}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/40">
                  <span>{doc.fileSize}</span>
                  <span>•</span>
                  <span>{doc.pagesCount || 16} Pages</span>
                  <span>•</span>
                  <span>{doc.uploadDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-800/40 flex items-center justify-between gap-3">
                <button
                  onClick={() => openDocumentModal(doc)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isLight
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{ui.viewDocument}</span>
                </button>

                {doc.downloadAllowed ? (
                  <button
                    onClick={() => {
                      showToast(`Downloading: ${t(doc.title)}`, 'success');
                    }}
                    className="p-2 rounded-lg border border-slate-700 hover:bg-white/10 text-slate-300 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                ) : (
                  <span
                    className="p-2 rounded-lg border border-slate-800 text-slate-500 cursor-not-allowed"
                    title="Download restricted by administrator"
                  >
                    <Lock className="w-4 h-4 text-slate-500" />
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
