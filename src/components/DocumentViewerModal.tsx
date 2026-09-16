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
  const { selectedDocument, closeDocumentModal, t, showToast } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!selectedDocument) return null;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="document-viewer-card"
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded overflow-hidden shadow-2xl border border-white/15 bg-[#060b12] text-slate-100"
      >
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#04080e]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded border flex items-center justify-center font-bold"
              style={{
                backgroundColor: 'var(--accent-badge)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent-color)',
              }}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-cyber line-clamp-1">{t(selectedDocument.title)}</h3>
              <p className="text-xs text-slate-400 font-mono">
                {selectedDocument.category.toUpperCase()} • {selectedDocument.fileSize} • Uploaded {selectedDocument.uploadDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono">
            {selectedDocument.downloadAllowed ? (
              <button
                id="doc-modal-download-btn"
                onClick={handleDownload}
                className="px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm uppercase tracking-wider"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  color: 'var(--accent-btn-text, #02060a)',
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </button>
            ) : (
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-white/5 text-slate-400 flex items-center gap-1 border border-white/10">
                <Lock className="w-3 h-3" style={{ color: 'var(--accent-color)' }} />
                <span>View Only</span>
              </span>
            )}

            <button
              onClick={closeDocumentModal}
              className="p-1.5 rounded hover:bg-white/10 transition-colors ml-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Page Navigation */}
        <div className="px-5 py-2 border-b border-white/10 flex items-center justify-between text-xs bg-[#04080e] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 rounded border border-white/10 disabled:opacity-30 hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 rounded border border-white/10 disabled:opacity-30 hover:bg-white/5"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(60, z - 20))}
              className="p-1 rounded border border-white/10 hover:bg-white/5"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(160, z + 20))}
              className="p-1 rounded border border-white/10 hover:bg-white/5"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Controlled Document Canvas Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/40">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center top' }}
            className="transition-transform duration-200 w-full max-w-2xl min-h-[520px] rounded shadow-xl p-8 border border-white/10 bg-[#070c14] text-slate-200 flex flex-col justify-between"
          >
            {/* Sheet Page Simulation */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs font-mono"
                    style={{
                      backgroundColor: 'var(--accent-color)',
                      color: 'var(--accent-btn-text, #02060a)',
                    }}
                  >
                    F
                  </div>
                  <span className="font-cyber font-bold text-sm tracking-wider text-white">FENOVA CIVIL ENGINEERING</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-slate-500">
                  REF: DOC-SEC-{(selectedDocument.id || '001').toUpperCase()}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                  OFFICIAL TECHNICAL DOCUMENTATION
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-cyber text-white mt-1">{t(selectedDocument.title)}</h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">{t(selectedDocument.description)}</p>
              </div>

              {/* Dynamic Page Content Based on Page Number */}
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
                <div className="p-3 rounded border border-white/10 bg-black/30">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Section {currentPage}.0</p>
                  <p className="text-xs font-semibold text-white mt-1">
                    {currentPage === 1 ? 'Executive Summary & Corporate Governance' : `Technical Chapter ${currentPage}: Execution Details`}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">
                    Compliant with international building codes and FIDIC contract provisions.
                  </p>
                </div>

                <div className="p-3 rounded border border-white/10 bg-black/30">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Quality Index</p>
                  <p className="text-xs font-semibold mt-1" style={{ color: 'var(--accent-color)' }}>ISO 9001 / MOMRA Class A</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">
                    Verified by independent third-party geotechnical auditors.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded border border-dashed border-white/20 text-center font-sans">
                <ShieldCheck className="w-8 h-8 mx-auto opacity-80 mb-2" style={{ color: 'var(--accent-color)' }} />
                <p className="text-xs font-semibold text-white">Controlled Corporate Publication</p>
                <p className="text-[11px] text-slate-400">
                  This document is monitored under Fenova Document Control Protocol. Unauthorized replication or distribution is strictly prohibited.
                </p>
              </div>
            </div>

            {/* Document Sheet Footer */}
            <div className="border-t pt-4 mt-6 border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Fenova Hi-Tech Civil Engineering Document Management System</span>
              <span>Sheet {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Info */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs bg-[#04080e] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Digital Certificate Valid & Authenticated</span>
          </div>
          <button
            onClick={closeDocumentModal}
            className="text-xs font-semibold hover:underline"
            style={{ color: 'var(--accent-color)' }}
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
