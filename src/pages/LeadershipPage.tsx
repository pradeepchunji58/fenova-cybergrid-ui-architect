import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Linkedin,
  Mail,
  Award,
  BookOpen,
  Quote,
  ShieldCheck,
  HardHat,
  ChevronRight,
} from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const { leaders, navigate, ui, t } = useApp();

  const ceo = leaders.find((l) => l.roleType === 'ceo' && l.visible);
  const boardMembers = leaders.filter((l) => l.roleType === 'board' && l.visible).sort((a, b) => a.order - b.order);
  const teamMembers = leaders.filter((l) => l.roleType === 'team' && l.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-20 pb-20 text-slate-100 font-sans">
      {/* Page Header */}
      <section className="relative py-20 bg-[#04080e] text-white border-b border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            <button onClick={() => navigate('/')} className="hover:underline">
              {ui.home}
            </button>
            <span>/</span>
            <button onClick={() => navigate('/about')} className="hover:underline">
              {ui.about}
            </button>
            <span>/</span>
            <span>{ui.leadership}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Executive Leadership & Board of Directors
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Seasoned international engineering executives, chartered fellows of global engineering institutions, and sovereign infrastructure advisors.
          </p>
        </div>
      </section>

      {/* CEO Message & Executive Spotlight */}
      {ceo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center gap-10 bg-[#060b12]">
            {/* CEO Photo */}
            <div className="w-full lg:w-96 shrink-0 relative">
              <div className="h-96 sm:h-[440px] rounded overflow-hidden bg-black shadow-xl relative border border-white/10">
                <img
                  src={ceo.photo}
                  alt={ceo.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                    CHIEF EXECUTIVE
                  </span>
                  <h3 className="text-xl font-bold font-cyber">{ceo.name}</h3>
                  <p className="text-xs text-slate-300 font-mono">{t(ceo.designation)}</p>
                </div>
              </div>
            </div>

            {/* CEO Message & Biography */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: 'var(--accent-badge)',
                    borderColor: 'var(--accent-border)',
                    borderWidth: '1px',
                    color: 'var(--accent-color)',
                  }}
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>Message from the Managing Director</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-cyber text-white">
                  Engineering the Foundations of Economic Sovereignty
                </h2>
              </div>

              {ceo.message && (
                <div
                  className="p-5 rounded border-l-4 italic text-sm text-slate-300 leading-relaxed bg-white/[0.02]"
                  style={{ borderLeftColor: 'var(--accent-color)' }}
                >
                  "{t(ceo.message)}"
                </div>
              )}

              <div className="space-y-3 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                <p>{t(ceo.biography)}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                {ceo.linkedin && (
                  <a
                    href={ceo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded text-xs font-mono font-semibold bg-white/5 hover:bg-white/15 transition-colors flex items-center gap-2 text-slate-300 border border-white/10"
                    style={{ borderColor: 'var(--accent-border)' }}
                  >
                    <Linkedin className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                    <span>Executive Profile</span>
                  </a>
                )}
                {ceo.email && (
                  <a
                    href={`mailto:${ceo.email}`}
                    className="px-3.5 py-1.5 rounded text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-slate-300 border border-white/10"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Executive Office</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Board of Directors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
            CORPORATE GOVERNANCE
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-cyber text-white">
            Board of Directors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-sans">
            Providing fiduciary stewardship, independent risk management, and strategic capital allocation for multi-billion-dollar infrastructure ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 sm:p-8 rounded border border-white/10 flex flex-col sm:flex-row gap-6 bg-[#060b12] hover:border-white/20 transition-all"
            >
              <div className="w-full sm:w-40 h-52 sm:h-auto rounded overflow-hidden shrink-0 bg-black border border-white/10">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-lg font-bold font-cyber text-white">{member.name}</h3>
                  <p className="text-xs font-mono font-semibold" style={{ color: 'var(--accent-color)' }}>{t(member.designation)}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-4 font-sans">
                  {t(member.biography)}
                </p>
                {member.linkedin && (
                  <div className="pt-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1.5"
                    >
                      <Linkedin className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 13: "People & Expertise" / Our Professionals */}
      <section className="py-16 border-y border-white/10 bg-[#03060a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
              TECHNICAL MASTERY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-cyber text-white">
              People & Engineering Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-sans">
              Chief structural designers, geotechnical authorities, and plant logistics directors powering our daily field accomplishments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded border border-white/10 flex flex-col sm:flex-row gap-6 bg-[#060b12] hover:border-white/20 transition-all"
              >
                <div className="w-full sm:w-36 h-48 sm:h-auto rounded overflow-hidden shrink-0 bg-black border border-white/10">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  {member.department && (
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--accent-color)' }}>
                      {t(member.department)}
                    </span>
                  )}
                  <h3 className="text-base font-bold font-cyber text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-slate-300 font-mono">{t(member.designation)}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{t(member.biography)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
