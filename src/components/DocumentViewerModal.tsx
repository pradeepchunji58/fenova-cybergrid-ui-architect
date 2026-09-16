import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  X,
  FileText,
  Download,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Lock,
  Layers,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const DocumentViewerModal: React.FC = () => {
  const { selectedDocument, closeDocumentModal, t, theme, showToast } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!selectedDocument) return null;

  const isLight = theme === 'modern-construction';
  const totalPages = selectedDocument.pagesCount || 12;

  const handleDownload = () => {
    if (!selectedDocument.downloadAllowed) {
      showToast('Document download is restricted by administrative policy.', 'info');
      return;
    }
    showToast(`Initiating secure download: ${t(selectedDocument.title)}`, 'success');
  };

  return (
    <div
      id="document-viewer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="document-viewer-card"
        className={`w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl overflow-hidden shadow-2xl border ${
          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0d1622] border-[#1e2f42] text-slate-100'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#080f18] border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold line-clamp-1">{t(selectedDocument.title)}</h3>
              <p className="text-xs text-slate-400">
                {selectedDocument.category.toUpperCase()} • {selectedDocument.fileSize} • Uploaded {selectedDocument.uploadDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedDocument.downloadAllowed ? (
              <button
                id="doc-modal-download-btn"
                onClick={handleDownload}
                className="px-3 py-1.5 rounded text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </button>
            ) : (
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-400 flex items-center gap-1 border border-slate-700">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>View Only (Download Restricted)</span>
              </span>
            )}

            <button
              onClick={closeDocumentModal}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Page Navigation */}
        <div
          className={`px-5 py-2 border-b flex items-center justify-between text-xs ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-[#0b131d] border-slate-800 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded border disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded border disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(60, z - 20))}
              className="p-1 rounded border hover:bg-black/5 dark:hover:bg-white/5"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(160, z + 20))}
              className="p-1 rounded border hover:bg-black/5 dark:hover:bg-white/5"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Controlled Document Canvas Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/20">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center top' }}
            className={`transition-transform duration-200 w-full max-w-2xl min-h-[520px] rounded-lg shadow-xl p-8 border flex flex-col justify-between ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#101a26] border-slate-700 text-slate-200'
            }`}
          >
            {/* Sheet Page Simulation */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-slate-700/40">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                    A
                  </div>
                  <span className="font-heading font-bold text-sm tracking-wider">APEX ENGINEERING CORP</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-500">
                  REF: DOC-SEC-{(selectedDocument.id || '001').toUpperCase()}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest">
                  OFFICIAL TECHNICAL DOCUMENTATION
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading mt-1">{t(selectedDocument.title)}</h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t(selectedDocument.description)}</p>
              </div>

              {/* Dynamic Page Content Based on Page Number */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded border border-slate-700/40 bg-black/10">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Section {currentPage}.0</p>
                  <p className="text-xs font-semibold text-white mt-1">
                    {currentPage === 1 ? 'Executive Summary & Corporate Governance' : `Technical Chapter ${currentPage}: Execution Details`}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Compliant with international building codes and FIDIC contract provisions.
                  </p>
                </div>

                <div className="p-3 rounded border border-slate-700/40 bg-black/10">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Quality Index</p>
                  <p className="text-xs font-semibold mt-1" style={{ color: 'var(--accent-color)' }}>ISO 9001 / MOMRA Class A</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Verified by independent third-party geotechnical auditors.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-md border border-dashed border-slate-700/50 text-center">
                <ShieldCheck className="w-8 h-8 mx-auto text-emerald-400 opacity-80 mb-2" />
                <p className="text-xs font-semibold">Controlled Corporate Publication</p>
                <p className="text-[11px] text-slate-500">
                  This document is monitored under Fenova Document Control Protocol. Unauthorized replication or distribution is strictly prohibited.
                </p>
              </div>
            </div>

            {/* Document Sheet Footer */}
            <div className="border-t pt-4 mt-6 border-slate-700/40 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Fenova Hi-Tech Civil Engineering Document Management System</span>
              <span>Sheet {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Info */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between text-xs ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#080f18] border-slate-800 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Digital Certificate Valid & Authenticated</span>
          </div>
          <button onClick={closeDocumentModal} className="text-xs font-semibold text-amber-500 hover:underline">
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
