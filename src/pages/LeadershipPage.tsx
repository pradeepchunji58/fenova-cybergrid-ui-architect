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
  const { leaders, navigate, ui, t, theme } = useApp();
  const isLight = theme === 'modern-construction';

  const ceo = leaders.find((l) => l.roleType === 'ceo' && l.visible);
  const boardMembers = leaders.filter((l) => l.roleType === 'board' && l.visible).sort((a, b) => a.order - b.order);
  const teamMembers = leaders.filter((l) => l.roleType === 'team' && l.visible).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-20 pb-20">
      {/* Page Header */}
      <section className="relative py-20 bg-[#070d14] text-white border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-engineering opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
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
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Executive Leadership & Board of Directors
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Seasoned international engineering executives, chartered fellows of global engineering institutions, and sovereign infrastructure advisors.
          </p>
        </div>
      </section>

      {/* CEO Message & Executive Spotlight */}
      {ceo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl border p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center gap-10 ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0d1622] border-[#1e2f42]'
            }`}
          >
            {/* CEO Photo */}
            <div className="w-full lg:w-96 shrink-0 relative">
              <div className="h-96 sm:h-[440px] rounded-xl overflow-hidden bg-black shadow-xl relative">
                <img
                  src={ceo.photo}
                  alt={ceo.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    CHIEF EXECUTIVE
                  </span>
                  <h3 className="text-xl font-bold font-heading">{ceo.name}</h3>
                  <p className="text-xs text-slate-300">{t(ceo.designation)}</p>
                </div>
              </div>
            </div>

            {/* CEO Message & Biography */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Message from the Managing Director</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Engineering the Foundations of Economic Sovereignty
                </h2>
              </div>

              {ceo.message && (
                <div className="p-5 rounded-lg border-l-4 border-amber-500 bg-amber-500/5 italic text-sm text-slate-300 leading-relaxed">
                  "{t(ceo.message)}"
                </div>
              )}

              <div className="space-y-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                <p>{t(ceo.biography)}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/40 flex items-center gap-4">
                {ceo.linkedin && (
                  <a
                    href={ceo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-amber-500 hover:text-slate-950 transition-colors flex items-center gap-2 text-slate-300"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Executive Profile</span>
                  </a>
                )}
                {ceo.email && (
                  <a
                    href={`mailto:${ceo.email}`}
                    className="px-3.5 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2 text-slate-300"
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
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            CORPORATE GOVERNANCE
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading">
            Board of Directors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Providing fiduciary stewardship, independent risk management, and strategic capital allocation for multi-billion-dollar infrastructure ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className={`p-6 sm:p-8 rounded-xl border flex flex-col sm:flex-row gap-6 ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#0d1622] border-[#1e2f42]'
              }`}
            >
              <div className="w-full sm:w-40 h-52 sm:h-auto rounded-lg overflow-hidden shrink-0 bg-black">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-lg font-bold font-heading">{member.name}</h3>
                  <p className="text-xs font-semibold text-amber-500">{t(member.designation)}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                  {t(member.biography)}
                </p>
                {member.linkedin && (
                  <div className="pt-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-amber-400 inline-flex items-center gap-1"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-amber-500" />
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
      <section
        className={`py-16 border-y ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#080d14] border-[#182333]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              TECHNICAL MASTERY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading">
              People & Engineering Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Chief structural designers, geotechnical authorities, and plant logistics directors powering our daily field accomplishments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`p-6 rounded-xl border flex flex-col sm:flex-row gap-6 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0d1622] border-[#1e2f42]'
                }`}
              >
                <div className="w-full sm:w-36 h-48 sm:h-auto rounded-lg overflow-hidden shrink-0 bg-black">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  {member.department && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                      {t(member.department)}
                    </span>
                  )}
                  <h3 className="text-base font-bold font-heading">{member.name}</h3>
                  <p className="text-xs font-semibold text-slate-300">{t(member.designation)}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{t(member.biography)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
