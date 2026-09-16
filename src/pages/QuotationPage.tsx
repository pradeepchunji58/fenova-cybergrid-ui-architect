import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { QuotationForm } from '../components/QuotationModal.tsx';
import { ShieldCheck, HardHat, FileText, CheckCircle2 } from 'lucide-react';

export const QuotationPage: React.FC = () => {
  const { navigate, ui } = useApp();

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
            <span>{ui.requestQuote}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Commercial Tendering & Engineering Quotation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Submit your infrastructure parameters, geotechnical ground profiles, or preliminary Bill of Quantities (BoQ) directly to Fenova's Commercial Estimating Directorate.
          </p>
        </div>
      </section>

      {/* Main Quotation Workstation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded border border-white/10 bg-[#060b12] shadow-2xl">
          <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                OFFICIAL RFQ SUBMISSION
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-cyber text-white mt-1">
                Project Specification Form
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Encrypted Tendering Channel</span>
            </div>
          </div>

          <QuotationForm />
        </div>
      </section>
    </div>
  );
};
