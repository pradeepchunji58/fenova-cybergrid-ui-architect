import React from 'react';

interface ClientLogoBadgeProps {
  company: string;
  logoUrl?: string;
  className?: string;
}

export const ClientLogoBadge: React.FC<ClientLogoBadgeProps> = ({
  company,
  logoUrl,
  className = '',
}) => {
  const normalized = (company || '').toLowerCase();

  // If custom logo image URL exists and is not a placeholder, render image
  if (logoUrl && !logoUrl.includes('placeholder')) {
    return (
      <div
        className={`h-7.5 max-w-[130px] px-2.5 py-1 rounded bg-black/60 border border-white/15 flex items-center justify-center shrink-0 overflow-hidden ${className}`}
        title={company}
      >
        <img
          src={logoUrl}
          alt={company}
          className="h-5 w-auto max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // High-precision vector logo badges (sharpener rubber dimensions: ~30px height, compact pill)
  if (normalized.includes('aramco')) {
    return (
      <div
        className={`h-7.5 px-2.5 py-1 rounded bg-[#030d12] border border-sky-500/30 flex items-center gap-1.5 shrink-0 shadow-sm ${className}`}
        title="Saudi Aramco Certified Partner"
      >
        {/* Aramco Geometric Starburst Vector */}
        <svg className="w-4 h-4 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 3V21M3 12H21" stroke="#0df2c9" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
        <span className="font-heading font-black tracking-wider text-[10px] text-sky-200">
          aramco
        </span>
      </div>
    );
  }

  if (normalized.includes('riyadh') || normalized.includes('royal commission')) {
    return (
      <div
        className={`h-7.5 px-2.5 py-1 rounded bg-[#0a0f0d] border border-emerald-500/30 flex items-center gap-1.5 shrink-0 shadow-sm ${className}`}
        title="Royal Commission Endorsed"
      >
        {/* Saudi Palm & Crossed Swords Vector */}
        <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M12 4V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 7C10 5 14 5 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 10C9 8 15 8 18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 19L17 13M17 19L7 13" stroke="#00f0b5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="font-mono font-bold tracking-tight text-[9px] uppercase text-emerald-200 leading-none">
          RCRC // SAUDI
        </span>
      </div>
    );
  }

  if (normalized.includes('red sea')) {
    return (
      <div
        className={`h-7.5 px-2.5 py-1 rounded bg-[#0e070a] border border-rose-500/30 flex items-center gap-1.5 shrink-0 shadow-sm ${className}`}
        title="Red Sea Global"
      >
        <svg className="w-4 h-4 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 14C9 12 11 15 13 13C15 11 17 14 17 14" stroke="#ff3366" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
        <span className="font-heading font-extrabold tracking-wider text-[9px] uppercase text-rose-200">
          RED SEA
        </span>
      </div>
    );
  }

  if (normalized.includes('marine') || normalized.includes('expressway') || normalized.includes('port')) {
    return (
      <div
        className={`h-7.5 px-2.5 py-1 rounded bg-[#050b14] border border-cyan-500/30 flex items-center gap-1.5 shrink-0 shadow-sm ${className}`}
        title="Marine Transport Authority"
      >
        <svg className="w-4 h-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M4 16C7 14 10 17 13 15C16 13 20 16 20 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M12 4V11M8 8H16" stroke="#00d2ff" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
        <span className="font-mono font-bold tracking-wider text-[9px] uppercase text-cyan-200">
          PORT_AUTH
        </span>
      </div>
    );
  }

  // Default compact corporate emblem
  return (
    <div
      className={`h-7.5 px-2.5 py-1 rounded bg-black/60 border border-white/15 flex items-center gap-1.5 shrink-0 shadow-sm ${className}`}
      title={company}
    >
      <div className="w-3.5 h-3.5 rounded bg-white/10 flex items-center justify-center font-mono text-[8px] font-black text-white">
        {(company || 'EPC').slice(0, 2).toUpperCase()}
      </div>
      <span className="font-mono font-bold text-[9px] uppercase text-slate-300 tracking-wider truncate max-w-[100px]">
        {company.split(' ')[0]}
      </span>
    </div>
  );
};
