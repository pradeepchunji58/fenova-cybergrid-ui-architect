import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { FileText, ArrowRight } from 'lucide-react';

export const RequestQuoteFloatingWidget: React.FC = () => {
  const { navigate, settings } = useApp();

  // If explicitly disabled in settings, don't render
  if (settings.rfqButtonEnabled === false) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center group">
      <button
        onClick={() => navigate('/quotation')}
        className="relative flex items-center gap-2.5 px-4 py-3 bg-white text-slate-950 font-mono text-xs font-bold shadow-2xl hover:bg-slate-100 transition-all duration-300 hexagon-cut border border-white/40 group-hover:scale-105"
        style={{
          clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
          backgroundColor: settings.rfqButtonColor || '#ffffff',
        }}
        title="Request a Quote / Tender Inquiry"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <FileText className="w-4 h-4 text-slate-900" />
        <span className="tracking-wider uppercase">Request a Quote</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-900 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};
