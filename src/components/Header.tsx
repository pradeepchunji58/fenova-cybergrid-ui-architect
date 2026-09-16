import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  Building2,
  Globe,
  ChevronDown,
  Menu,
  X,
  FileText,
  Lock,
  ArrowUpRight,
  Palette,
} from 'lucide-react';
import { Language, VisualTheme } from '../types.ts';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    currentRoute,
    navigate,
    ui,
    adminUser,
    theme,
    setTheme,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [sysTime, setSysTime] = useState<string>('');
  const [tickerMetric, setTickerMetric] = useState(99.4);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toISOString().slice(11, 19) + ' UTC';
      setSysTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const tickerInterval = setInterval(() => {
      setTickerMetric((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return Math.min(100, Math.max(98.0, Number((prev + delta).toFixed(1))));
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(tickerInterval);
    };
  }, []);

  const navLinks = [
    { code: '01', label: ui.home, path: '/' },
    {
      code: '02',
      label: ui.about,
      path: '/about',
      hasDropdown: true,
      children: [
        { label: ui.aboutUs, path: '/about', desc: 'Corporate ethos, engineering precision & legacy', tag: 'PROFILE' },
        { label: ui.locations, path: '/about/locations', desc: 'Operating hubs in Riyadh, Dubai, Dammam & Doha', tag: 'HUBS' },
        { label: ui.leadership, path: '/about/leadership', desc: 'Executive board & technical engineering directors', tag: 'BOARD' },
      ],
    },
    { code: '03', label: ui.services, path: '/services' },
    {
      code: '04',
      label: ui.projects,
      path: '/projects',
      hasDropdown: true,
      children: [
        { label: ui.projects, path: '/projects', desc: 'Full portfolio of national mega-infrastructure assets', tag: 'ALL_EPC' },
        { label: ui.completedProjects, path: '/projects/completed', desc: 'Delivered highways, bridges, tunnels & industrial plants', tag: 'DELIVERED' },
        { label: ui.ongoingProjects, path: '/projects/ongoing', desc: 'Active high-density structural and civil developments', tag: 'ACTIVE' },
      ],
    },
    {
      code: '05',
      label: ui.clients,
      path: '/clients',
      hasDropdown: true,
      children: [
        { label: ui.clients, path: '/clients', desc: 'Strategic government ministries & sovereign enterprise clients', tag: 'PARTNERS' },
        { label: ui.clientAppreciation, path: '/clients/appreciation', desc: 'Verified completion certificates & letters of commendation', tag: 'RATINGS' },
      ],
    },
    { code: '06', label: ui.careers, path: '/careers' },
    { code: '07', label: ui.brochures, path: '/brochures' },
    { code: '08', label: ui.contact, path: '/contact' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  };

  const themeOptions: { key: VisualTheme; label: string; color: string }[] = [
    { key: 'tech-green', label: 'GREEN', color: '#0df2c9' },
    { key: 'cyber-blue', label: 'BLUE', color: '#00d2ff' },
    { key: 'crimson-red', label: 'RED', color: '#ff3366' },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 bg-[#04070a]/95 backdrop-blur-md border-b border-white/10 text-slate-100 transition-colors"
    >
      {/* Top Telemetry & Micro-Data Status Bar */}
      <div className="border-b border-white/5 bg-[#020406]/90 px-4 sm:px-8 py-1.5 text-[11px] font-mono text-slate-400 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        {/* Left Side: Monospaced Metrics & Active GPS Coordinates */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center gap-2" style={{ color: 'var(--accent-color)' }}>
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: 'var(--accent-color)' }}
            />
            <span className="font-semibold tracking-wider">FENOVA.SYS: NOMINAL</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="hidden md:inline text-slate-300">
            [SYS.GRID // 24°42'44"N 46°40'28"E]
          </span>
          <span className="hidden lg:inline text-white/20">|</span>
          <span className="hidden lg:inline text-slate-400">
            LOAD: <span className="text-white font-bold">{tickerMetric}%</span>
          </span>
          <span className="hidden xl:inline text-white/20">|</span>
          <span className="hidden xl:inline text-slate-400">
            TIME:{' '}
            <span style={{ color: 'var(--accent-color)' }}>
              {sysTime || 'SYNCING...'}
            </span>
          </span>
        </div>

        {/* Right Side: 3-Theme Selector, Security Terminal & Language Selector */}
        <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
          {/* Multi-Theme Selector: Green, Blue, Red */}
          <div
            id="theme-selector-bar"
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 bg-black/60 text-[10px] font-mono"
          >
            <Palette className="w-3 h-3 text-slate-400 mr-1 hidden sm:inline" />
            <span className="text-slate-400 mr-1 hidden sm:inline">THEME:</span>
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.key;
              return (
                <button
                  key={opt.key}
                  id={`theme-btn-${opt.key}`}
                  onClick={() => setTheme(opt.key)}
                  data-cursor={opt.label}
                  className={`px-1.5 py-0.5 rounded flex items-center gap-1 transition-all uppercase tracking-wider ${
                    isSelected
                      ? 'font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isSelected ? `${opt.color}22` : 'transparent',
                    color: isSelected ? opt.color : undefined,
                    border: isSelected ? `1px solid ${opt.color}66` : '1px solid transparent',
                  }}
                  title={`${opt.label} Theme`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: opt.color }}
                  />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Admin Terminal Access Link */}
          <button
            id="header-admin-link"
            onClick={() => handleNav('/admin')}
            title="Open Operational Terminal CMS"
            data-cursor="CMS"
            className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1.5 border transition-all ${
              adminUser
                ? 'bg-white/10 text-white'
                : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
            }`}
            style={{
              borderColor: adminUser ? 'var(--accent-color)' : undefined,
            }}
          >
            <Lock className="w-2.5 h-2.5" style={{ color: 'var(--accent-color)' }} />
            <span>{adminUser ? `ROOT_${adminUser.role.split('_')[0].toUpperCase()}` : 'TERMINAL_CMS'}</span>
          </button>

          {/* Precision Language Selector */}
          <div
            id="top-language-selector"
            className="flex items-center px-2 py-0.5 rounded border border-white/10 bg-black/40 text-[10px] font-mono"
          >
            <Globe className="w-3 h-3 mr-1.5 rtl:ml-1.5" style={{ color: 'var(--accent-color)' }} />
            {(['en', 'ar', 'hi'] as Language[]).map((lang, idx) => (
              <React.Fragment key={lang}>
                {idx > 0 && <span className="mx-1 text-white/20">/</span>}
                <button
                  id={`lang-btn-${lang}`}
                  onClick={() => setLanguage(lang)}
                  data-cursor={lang.toUpperCase()}
                  className={`px-1 py-0.2 transition-colors uppercase tracking-wider ${
                    language === lang
                      ? 'font-bold border-b'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={{
                    color: language === lang ? 'var(--accent-color)' : undefined,
                    borderColor: language === lang ? 'var(--accent-color)' : 'transparent',
                  }}
                >
                  {lang}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Flat Top Header Bar Nested Inside Fine Line Grid Boundaries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        {/* Brand Terminal Mark: FENOVA */}
        <div
          id="brand-logo-container"
          onClick={() => handleNav('/')}
          data-cursor="HOME"
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          {/* Cyber-automotive Geometric Vector Emblem */}
          <div
            className="w-11 h-11 rounded border bg-[#060c13] flex items-center justify-center relative overflow-hidden transition-all duration-300"
            style={{
              borderColor: 'var(--accent-border)',
            }}
          >
            <Building2 className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
            <div
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--accent-color)' }}
            />
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'linear-gradient(to top right, var(--accent-color), transparent)',
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-cyber tracking-wider text-white">
                FENOVA
              </span>
              <span
                className="text-[9px] font-mono font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border"
                style={{
                  borderColor: 'var(--accent-border)',
                  backgroundColor: 'var(--accent-badge)',
                  color: 'var(--accent-color)',
                }}
              >
                HI-TECH CIVIL EPC
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              FENOVA HI-TECH CIVIL ENGINEERING
            </p>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden xl:flex items-center h-full">
          {navLinks.map((link) => {
            const activeRoute = currentRoute || '';
            const isActive =
              activeRoute === link.path ||
              (link.path !== '/' && activeRoute.startsWith(link.path));

            const isMenuOpen = activeMegaMenu === link.path;

            return (
              <div
                key={link.path}
                className="h-full flex items-center relative"
                onMouseEnter={() => link.hasDropdown && setActiveMegaMenu(link.path)}
                onMouseLeave={() => link.hasDropdown && setActiveMegaMenu(null)}
              >
                <button
                  onClick={() => handleNav(link.path)}
                  data-cursor={link.code}
                  className={`h-full px-3.5 border-b-2 text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'border-transparent text-slate-300 hover:text-white hover:bg-white/[0.02]'
                  }`}
                  style={{
                    borderColor: isActive ? 'var(--accent-color)' : 'transparent',
                    backgroundColor: isActive ? 'var(--accent-badge)' : undefined,
                  }}
                >
                  <span className="text-[10px] text-slate-500">{link.code}</span>
                  <span className="font-sans font-medium uppercase text-xs">{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
                        isMenuOpen ? 'rotate-180' : ''
                      }`}
                      style={{ color: isMenuOpen ? 'var(--accent-color)' : undefined }}
                    />
                  )}
                </button>

                {/* Seamless Micro-Grid Menu Dropdown */}
                {link.hasDropdown && isMenuOpen && (
                  <div
                    className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-[420px] bg-[#05090f]/98 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 z-50 backdrop-blur-xl"
                    style={{ borderTopColor: 'var(--accent-color)' }}
                  >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 font-mono text-[10px] text-slate-500">
                      <span>TERMINAL_SUBSYSTEM // {link.code}</span>
                      <span style={{ color: 'var(--accent-color)' }}>ACTIVE_SECTOR</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {link.children?.map((sub) => (
                        <button
                          key={sub.path}
                          onClick={() => handleNav(sub.path)}
                          data-cursor="OPEN"
                          className={`w-full text-left rtl:text-right p-3 rounded border transition-all group ${
                            currentRoute === sub.path
                              ? 'text-white'
                              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-slate-300'
                          }`}
                          style={{
                            backgroundColor: currentRoute === sub.path ? 'var(--accent-badge)' : undefined,
                            borderColor: currentRoute === sub.path ? 'var(--accent-color)' : undefined,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-heading text-sm font-semibold group-hover:text-white transition-colors">
                              {sub.label}
                            </span>
                            <span
                              className="font-mono text-[9px] px-1 py-0.5 rounded bg-black/60 border"
                              style={{
                                borderColor: 'var(--accent-border)',
                                color: 'var(--accent-color)',
                              }}
                            >
                              {sub.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 font-sans line-clamp-1">
                            {sub.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Button: RFQ / Tender Docket */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-quote-cta"
            onClick={() => handleNav('/quotation')}
            data-cursor="TENDER"
            className="relative px-5 py-2.5 rounded border text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group"
            style={{
              borderColor: 'var(--accent-color)',
              color: 'var(--accent-color)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              boxShadow: '0 0 15px var(--accent-glow)',
            }}
          >
            <span className="absolute -top-1 -left-1 text-[10px] leading-none" style={{ color: 'var(--accent-color)' }}>+</span>
            <span className="absolute -bottom-1 -right-1 text-[10px] leading-none" style={{ color: 'var(--accent-color)' }}>+</span>
            <FileText className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            <span>[ {ui.requestQuote} ]</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="MENU"
            className="p-2 rounded border border-white/10 text-slate-200 transition-colors"
            style={{
              borderColor: mobileMenuOpen ? 'var(--accent-color)' : undefined,
              color: mobileMenuOpen ? 'var(--accent-color)' : undefined,
            }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="xl:hidden border-t border-white/10 bg-[#05090f]/98 px-4 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto backdrop-blur-2xl"
        >
          {/* Mobile Theme Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
            <span className="text-slate-400">ACTIVE_THEME:</span>
            <div className="flex items-center gap-1.5">
              {themeOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setTheme(opt.key)}
                  className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 border ${
                    theme === opt.key ? 'font-bold' : 'text-slate-400'
                  }`}
                  style={{
                    backgroundColor: theme === opt.key ? `${opt.color}22` : 'transparent',
                    color: theme === opt.key ? opt.color : undefined,
                    borderColor: theme === opt.key ? opt.color : 'rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: opt.color }} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="font-mono text-[10px] tracking-widest pb-2 border-b border-white/10" style={{ color: 'var(--accent-color)' }}>
            FENOVA_DIRECTORY // MOBILE_ACCESS
          </div>

          {navLinks.map((link) => (
            <div key={link.path} className="border border-white/5 rounded p-2 bg-white/[0.02]">
              <button
                onClick={() => handleNav(link.path)}
                className="w-full text-left rtl:text-right px-2 py-1.5 text-xs font-mono font-semibold flex items-center justify-between"
                style={{
                  color: currentRoute === link.path ? 'var(--accent-color)' : undefined,
                }}
              >
                <span>{link.code} // {link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {link.hasDropdown && (
                <div className="mt-2 pl-3 rtl:pr-3 rtl:pl-0 border-l rtl:border-r rtl:border-l-0 border-white/10 space-y-1.5">
                  {link.children?.map((sub) => (
                    <button
                      key={sub.path}
                      onClick={() => handleNav(sub.path)}
                      className="w-full text-left rtl:text-right px-2 py-1 text-[11px] rounded transition-colors flex items-center justify-between"
                      style={{
                        color: currentRoute === sub.path ? 'var(--accent-color)' : undefined,
                      }}
                    >
                      <span>{sub.label}</span>
                      <span className="font-mono text-[9px] text-slate-500">[{sub.tag}]</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNav('/quotation')}
              className="w-full py-3 rounded text-slate-950 font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: 'var(--accent-color)',
                boxShadow: '0 0 20px var(--accent-glow)',
              }}
            >
              <FileText className="w-4 h-4" />
              <span>[ {ui.requestQuote} ]</span>
            </button>
            <button
              onClick={() => handleNav('/admin')}
              className="w-full py-2.5 rounded border border-white/10 bg-white/5 text-slate-300 font-mono text-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
              <span>{ui.adminPortal}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
