import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building2,
  MapPin,
  FileText,
  Play,
  Pause,
  Award,
  Layers,
  Sparkles,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { ClientLogoBadge } from '../components/ClientLogoBadge.tsx';
import { RunningCounter } from '../components/RunningCounter.tsx';
import { fallbackHeroSlides } from '../data/fallbackData.ts';

export const HomePage: React.FC = () => {
  const {
    heroSlides,
    projects,
    services,
    locations,
    testimonials,
    settings,
    navigate,
    ui,
    t,
  } = useApp();

  // Hero Slider State
  const visibleSlides = (heroSlides || []).filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const effectiveSlides = visibleSlides.length > 0 ? visibleSlides : fallbackHeroSlides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [tickerMetric, setTickerMetric] = useState(99.4);

  useEffect(() => {
    if (!autoplay || effectiveSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % effectiveSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [autoplay, effectiveSlides.length]);

  // Dynamic ticker fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerMetric((prev) => {
        const delta = (Math.random() - 0.48) * 0.3;
        return Math.min(100, Math.max(97.5, Number((prev + delta).toFixed(1))));
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = effectiveSlides[currentSlideIndex] || effectiveSlides[0] || fallbackHeroSlides[0];
  const featuredProjects = (projects || []).filter((p) => p.visible && p.featured).slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-24 text-slate-100 font-sans">
      {/* 1. FULL-FLEDGED LANDSCAPE CINEMATIC HERO (CEER MOTORS INSPIRED) */}
      <section id="hero-slider-section" className="relative border-b border-white/10 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-5 pb-8">
          {/* Top Breadcrumb & Status Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: 'var(--accent-color)' }}
              />
              <span className="text-white font-semibold tracking-wider">
                FENOVA // DELIVERING COMPLEX CIVIL INFRASTRUCTURE
              </span>
              <span className="text-white/20">/</span>
              <span className="hidden sm:inline" style={{ color: 'var(--accent-color)' }}>
                HIGH-TECH EPC ARCHITECTURE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline">[SECTOR: 01 // RIYADH_EAST HQ]</span>
              <span className="font-bold" style={{ color: 'var(--accent-color)' }}>
                OPERATIONAL_READINESS: {tickerMetric}%
              </span>
            </div>
          </div>

          {/* Full-fledged Landscape Container with Hexagon Cuts */}
          <div className="w-full border border-white/10 bg-[#04070c] relative overflow-hidden flex flex-col justify-between min-h-[580px] lg:min-h-[660px] xl:min-h-[700px] shadow-2xl hexagon-cut">
            {/* Corner Crosshair Reticles */}
            <span className="absolute top-2 left-2 text-[12px] leading-none z-30 font-mono" style={{ color: 'var(--accent-color)' }}>+</span>
            <span className="absolute top-2 right-2 text-[12px] leading-none z-30 font-mono" style={{ color: 'var(--accent-color)' }}>+</span>
            <span className="absolute bottom-2 left-2 text-[12px] leading-none z-30 font-mono" style={{ color: 'var(--accent-color)' }}>+</span>
            <span className="absolute bottom-2 right-2 text-[12px] leading-none z-30 font-mono" style={{ color: 'var(--accent-color)' }}>+</span>

            {/* Media Background Crossfade (Video in Top of Home Screen) */}
            {effectiveSlides.map((slide, idx) => {
              const hasVideo = slide.videoUrl || (idx === 0 ? '/hero_video.mp4' : undefined);
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                    idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {hasVideo ? (
                    <video
                      src={hasVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center scale-100"
                    />
                  ) : (
                    <img
                      src={slide.imageUrl}
                      alt={t(slide.title)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-100 animate-subtleZoom"
                    />
                  )}
                  {/* High-Tech Automotive Gradient Vignette & Dark Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020509] via-[#020509]/70 to-[#020509]/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#020509]/95 via-[#020509]/60 to-transparent" />
                  <div className="absolute inset-0 scanline-overlay opacity-25" />
                </div>
              );
            })}

            {/* Top Landscape Status Tag */}
            <div className="relative z-20 p-4 sm:p-8 lg:p-12 pb-0 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 hexagon-cut-sm bg-black/75 border text-[11px] font-mono tracking-widest uppercase backdrop-blur-md"
                style={{
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent-color)',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                <span>[ {currentSlide?.badge ? t(currentSlide.badge) : 'COMPLEX CIVIL INFRASTRUCTURE'} ]</span>
              </div>

              {/* Accreditations badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 hexagon-cut-sm bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 backdrop-blur-sm">
                <span style={{ color: 'var(--accent-color)' }}>ISO 9001:2015</span>
                <span className="text-white/20">|</span>
                <span>GRADE 1 EPC</span>
              </div>
            </div>

            {/* Middle Content Area: Broad Landscape Typography & Quotation/Exploration Focus */}
            <div className="relative z-20 px-4 sm:px-8 lg:px-12 py-6 sm:py-8 max-w-4xl space-y-4 sm:space-y-5">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-cyber tracking-tight leading-[1.08] text-white">
                {t(currentSlide?.title)}
              </h1>

              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg font-geom tracking-wider uppercase font-semibold"
                style={{ color: 'var(--accent-color)' }}
              >
                // {t(currentSlide?.subtitle)}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-normal font-sans">
                {t(currentSlide?.description)}
              </p>

              {/* Action Controls: Hexagon Cut Quotation & Mega Project Exploration */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* 1. Request Quotation & Tender Docket (White/Hexagon Cut) */}
                <button
                  id="hero-quotation-cta"
                  onClick={() => navigate(currentSlide?.secondaryCtaLink || '/quotation')}
                  data-cursor="TENDER"
                  className="px-5 sm:px-7 py-3.5 sm:py-4 bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-none"
                  style={{
                    clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                  }}
                >
                  <FileText className="w-4 h-4 text-black shrink-0" />
                  <span>{t(currentSlide?.secondaryCtaText) || ui.requestQuote}</span>
                </button>

                {/* 2. Explore Mega Projects Portfolio */}
                <button
                  id="hero-projects-cta"
                  onClick={() => navigate(currentSlide?.primaryCtaLink || '/projects')}
                  data-cursor="PORTFOLIO"
                  className="px-5 sm:px-7 py-3.5 sm:py-4 bg-black/60 hover:bg-white/10 text-white border text-xs font-mono tracking-widest uppercase backdrop-blur-md transition-all flex items-center gap-2.5 group hexagon-cut-sm cursor-pointer"
                  style={{
                    borderColor: 'var(--accent-border)',
                  }}
                >
                  <span className="group-hover:text-white transition-colors">
                    {t(currentSlide?.primaryCtaText) || ui.exploreProjects}
                  </span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-color)' }} />
                </button>

                {/* 3. Civil Disciplines & Technical Specs */}
                <button
                  id="hero-disciplines-cta"
                  onClick={() => navigate('/services')}
                  data-cursor="SPECS"
                  className="hidden md:inline-flex px-6 py-4 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono tracking-widest uppercase backdrop-blur-sm transition-all hexagon-cut-sm"
                >
                  <span>[ CIVIL_EPC_SPECS ]</span>
                </button>
              </div>
            </div>

            {/* Bottom Landscape Dock: Panoramic Mega Project Selectors & Slide Controls */}
            <div className="relative z-20 border-t border-white/10 bg-[#020509]/90 backdrop-blur-md p-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Landscape Quick Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 whitespace-nowrap scrollbar-none">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mr-2 hidden sm:inline">
                  MEGA_PROJECTS:
                </span>
                {effectiveSlides.map((slide, idx) => {
                  const isSelected = idx === currentSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      data-cursor={`PROJECT_${idx + 1}`}
                      className={`px-3 py-2 text-left border transition-all text-xs font-mono flex items-center gap-2.5 hexagon-cut-sm ${
                        isSelected
                          ? 'text-white'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-badge)' : undefined,
                        borderColor: isSelected ? 'var(--accent-color)' : undefined,
                      }}
                    >
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: isSelected ? 'var(--accent-color)' : '#64748b' }}
                      >
                        0{idx + 1}
                      </span>
                      <span className="truncate max-w-[140px] sm:max-w-[180px] font-sans text-xs">
                        {(t(slide.title) || '').split(' ')[0]} {(t(slide.title) || '').split(' ')[1] || ''}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-color)' }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Viewport Navigation Controls */}
              <div className="flex items-center justify-end gap-3 font-mono text-xs text-slate-400 shrink-0">
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--accent-color)' }}>
                    SLIDE 0{((currentSlideIndex % effectiveSlides.length) + 1)}
                  </span>
                  <span className="text-white/20">/</span>
                  <span>0{effectiveSlides.length}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + effectiveSlides.length) % effectiveSlides.length)}
                    className="p-2 border border-white/10 hover:text-white transition-colors hexagon-cut-sm"
                    style={{ borderColor: 'var(--accent-border)' }}
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % effectiveSlides.length)}
                    className="p-2 border border-white/10 hover:text-white transition-colors hexagon-cut-sm"
                    style={{ borderColor: 'var(--accent-border)' }}
                    title="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => setAutoplay(!autoplay)}
                    className="p-2 border border-white/10 hover:text-white transition-colors ml-1 hexagon-cut-sm"
                    style={{ borderColor: 'var(--accent-border)' }}
                    title={autoplay ? 'Pause Reel' : 'Resume Reel'}
                  >
                    {autoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE AUDITED TELEMETRY METRICS BANNER (Full-scale with Matrix Running Numbers) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#05080e] hexagon-cut">
          {/* Tile 1 */}
          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-white/10 relative group">
            <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-600 group-hover:text-white transition-colors">[METRIC_01]</span>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-cyber text-white">
                <RunningCounter target={Number(settings?.stats.yearsOfExcellence) || 34} suffix="+" duration={2400} />
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-200">
                OPERATIONAL YEARS
              </p>
              <p className="text-[11px] text-slate-500 font-mono">Continuous legacy since 1992</p>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="p-6 sm:p-8 border-b sm:border-b-0 lg:border-r border-white/10 relative group">
            <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-600 group-hover:text-white transition-colors">[METRIC_02]</span>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-cyber text-white">
                <RunningCounter target={Number(settings?.stats.completedMegaProjects) || 148} suffix="+" duration={2600} />
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-200">
                MEGA EPC ASSETS
              </p>
              <p className="text-[11px] text-slate-500 font-mono">Valued at {settings?.stats.aggregateProjectValue || '$18.4B'}</p>
            </div>
          </div>

          {/* Tile 3 */}
          <div className="p-6 sm:p-8 border-r border-white/10 relative group">
            <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-600 group-hover:text-white transition-colors">[METRIC_03]</span>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-cyber text-white">
                <RunningCounter textValue={String(settings?.stats.workforceStrength || '12.5K')} duration={2800} />
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-200">
                SKILLED SPECIALISTS
              </p>
              <p className="text-[11px] text-slate-500 font-mono">Chartered engineers & teams</p>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="p-6 sm:p-8 relative group">
            <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-600 group-hover:text-white transition-colors">[METRIC_04]</span>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black font-cyber" style={{ color: 'var(--accent-color)' }}>
                <RunningCounter textValue={String(settings?.stats.safetyHoursWithoutLTI || '42.8M')} duration={3000} />
              </div>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase text-slate-200">
                SAFE MAN-HOURS
              </p>
              <p className="text-[11px] text-slate-500 font-mono">Zero LTI / ISO 45001 Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE ASYMMETRICAL PORTFOLIO TILES (Full-scale with Hexagon Cuts) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest" style={{ color: 'var(--accent-color)' }}>
              <span>PORTFOLIO_TERMINAL // SECTION_04</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-cyber mt-1 text-white">
              TRANSFORMATIVE CIVIL & INFRASTRUCTURE
            </h2>
          </div>

          <button
            onClick={() => navigate('/projects')}
            data-cursor="ALL_PROJECTS"
            className="px-5 py-2.5 border border-white/20 text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-white flex items-center gap-2 transition-all self-start md:self-auto hexagon-cut-sm cursor-pointer"
            style={{
              borderColor: 'var(--accent-border)',
            }}
          >
            <span>[ {ui.exploreProjects} ]</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" style={{ color: 'var(--accent-color)' }} />
          </button>
        </div>

        {/* 3-column Bento layout with Hexagon Cuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.slug}`)}
              data-cursor={`VIEW_${idx + 1}`}
              className="group cursor-pointer border border-white/10 bg-[#060b12] hover:border-white/40 transition-all duration-300 relative flex flex-col justify-between overflow-hidden hexagon-cut"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-1 left-1 text-[10px] text-slate-700 group-hover:text-white font-mono transition-colors">+</span>
              <span className="absolute top-1 right-1 text-[10px] text-slate-700 group-hover:text-white font-mono transition-colors">+</span>

              {/* Full-bleed media tile header */}
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={project.mainImage}
                  alt={t(project.name)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b12] via-transparent to-transparent opacity-80" />

                {/* Status chip */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 bg-black/75 border text-[10px] font-mono tracking-widest uppercase backdrop-blur-md hexagon-cut-sm"
                    style={{
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    {project.status === 'completed' ? ui.completedStatus : ui.ongoingStatus}
                  </span>
                </div>

                {project.projectValue && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 text-white font-mono text-xs border border-white/10 hexagon-cut-sm">
                    {project.projectValue}
                  </div>
                )}
              </div>

              {/* Structural Content */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--accent-color)' }}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{t(project.location)}</span>
                  </div>

                  <h3 className="text-lg font-bold font-cyber text-white group-hover:text-white transition-colors line-clamp-1">
                    {t(project.name)}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {t(project.description)}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                  <span className="text-[11px]">CLIENT // {project.client}</span>
                  <span style={{ color: 'var(--accent-color)' }}>{ui.viewDetails} →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODULAR DISCIPLINES: STRICT FINE LINE GRID */}
      <section className="border-y border-white/10 bg-[#03060a] w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--accent-color)' }}>
                ENGINEERING_CORE // DISCIPLINES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white mt-1">
                CIVIL, STRUCTURAL & HEAVY INFRASTRUCTURE
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-sans">
              Rigorous execution standards across transportation corridors, geotechnical works, and heavy industrial facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 bg-[#05090f] hexagon-cut">
            {services.map((serv, idx) => (
              <div
                key={serv.id}
                onClick={() => navigate(`/services/${serv.slug}`)}
                data-cursor={`DISCIPLINE_${idx + 1}`}
                className="p-6 lg:p-8 border-b md:border-b-0 md:border-r border-white/10 hover:bg-[#08101a] transition-all duration-300 cursor-pointer flex flex-col justify-between group relative"
              >
                <span className="font-mono text-[10px] text-slate-600 group-hover:text-white transition-colors">
                  [0{idx + 1} // {serv.category?.toUpperCase() || 'CIVIL'}]
                </span>

                <div className="space-y-4 my-6">
                  <div
                    className="w-12 h-12 border bg-black/40 flex items-center justify-center transition-all hexagon-cut-sm"
                    style={{
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-cyber text-white transition-colors">
                    {t(serv.title)}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                    {t(serv.shortDescription)}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
                  <span>SPECIFICATIONS</span>
                  <span style={{ color: 'var(--accent-color)' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRATEGIC OPERATING HUBS & GPS COORDINATE TILES */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--accent-color)' }}>
              OPERATIONAL_NODES // HUBS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white mt-1">
              REGIONAL MULTI-BRANCH NETWORK
            </h2>
          </div>
          <button
            onClick={() => navigate('/about/locations')}
            data-cursor="MAPS"
            className="px-5 py-2.5 border border-white/20 text-xs font-mono tracking-wider uppercase text-slate-200 hover:text-white flex items-center gap-2 transition-all self-start md:self-auto hexagon-cut-sm cursor-pointer"
            style={{
              borderColor: 'var(--accent-border)',
            }}
          >
            <span>[ {ui.locations} ]</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" style={{ color: 'var(--accent-color)' }} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.slice(0, 3).map((loc) => (
            <div
              key={loc.id}
              onClick={() => navigate('/about/locations')}
              data-cursor="NODE"
              className="border border-white/10 bg-[#060b12] hover:border-white/40 transition-all cursor-pointer group flex flex-col justify-between overflow-hidden hexagon-cut"
            >
              <div className="h-44 relative overflow-hidden bg-black">
                <img
                  src={loc.locationImage}
                  alt={t(loc.name)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b12] via-transparent to-transparent" />
                <div
                  className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 font-mono text-[10px] border hexagon-cut-sm"
                  style={{
                    borderColor: 'var(--accent-border)',
                    color: 'var(--accent-color)',
                  }}
                >
                  {t(loc.country)}
                </div>
                <div className="absolute bottom-2 right-3 font-mono text-[9px] text-slate-300 bg-black/70 px-2 py-0.5 hexagon-cut-sm border border-white/10">
                  REGIONAL FACILITY
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold font-cyber text-white transition-colors">
                  {t(loc.name)}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                  {t(loc.address)}
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{loc.phone}</span>
                  <span style={{ color: 'var(--accent-color)' }}>ACTIVATE_ROUTE →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SOVEREIGN COMMENDATIONS & ENDORSEMENTS */}
      <section className="border-t border-white/10 bg-[#020508] py-16 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--accent-color)' }}>
                CERTIFIED_VALIDATION // CLIENT_TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-cyber text-white mt-1">
                ENDORSED BY SOVEREIGN ENTERPRISES
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
              <span className="font-mono text-xs text-slate-400">VERIFIED CONTRACTOR COMMENDATIONS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 border border-white/10 bg-[#050910] hover:border-white/30 transition-all flex flex-col justify-between relative shadow-lg group hexagon-cut"
              >
                <div className="space-y-4">
                  {/* Header: Verification Hash + Small "Sharpener Rubber" Sized Logo */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                      <span>HASH: #VALID_{test.id.slice(-4).toUpperCase()}</span>
                    </div>

                    {/* Logo at exact requested "sharpener rubber" size */}
                    <ClientLogoBadge
                      company={test.company}
                      logoUrl={test.clientLogo}
                    />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-current"
                        style={{ color: 'var(--accent-color)' }}
                      />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic">
                    "{t(test.testimonial)}"
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 space-y-1">
                  <h4 className="text-xs font-bold font-cyber text-white">{test.clientName}</h4>
                  <p className="text-[11px] font-mono" style={{ color: 'var(--accent-color)' }}>
                    {t(test.position)}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>{test.company}</span>
                    {test.projectReference && (
                      <span className="text-[10px] text-slate-500 font-sans truncate max-w-[120px]">
                        Ref: {test.projectReference}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM OF HOME SCREEN: WEBP BACKGROUND INFRASTRUCTURE SHOWCASE */}
      <section
        id="home-bottom-showcase"
        className="w-full relative overflow-hidden border-t border-white/10 bg-cover bg-center py-20 lg:py-28"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 5, 8, 0.92), rgba(2, 5, 8, 0.82)), url('/footer_bg.webp')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="p-8 lg:p-12 border border-white/15 bg-black/60 backdrop-blur-xl hexagon-cut">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[11px] uppercase tracking-widest border border-white/10 hexagon-cut-sm bg-black/50" style={{ color: 'var(--accent-color)' }}>
                  <Award className="w-3.5 h-3.5" />
                  <span>KINGDOM INFRASTRUCTURE GRADE-1 EPC PRIME CONTRACTOR</span>
                </div>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black font-cyber text-white leading-tight">
                  READY TO MOBILIZE COMPLEX CIVIL INFRASTRUCTURE?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
                  Connect directly with Fenova's executive engineering division in Riyadh, Jeddah, Dammam, and Al Khobar. We execute geotechnical, structural, and mega EPC tenders with audited safety and engineering mastery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => navigate('/quotation')}
                  data-cursor="TENDER"
                  className="px-8 py-4 bg-white hover:bg-slate-200 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-none transition-all"
                  style={{
                    clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                  }}
                >
                  <FileText className="w-4 h-4 text-black" />
                  <span>{ui.requestQuote}</span>
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  data-cursor="CONTACT"
                  className="px-8 py-4 border border-white/20 hover:border-white/50 text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hexagon-cut-sm cursor-pointer bg-black/40"
                >
                  <span>{ui.contact}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" style={{ color: 'var(--accent-color)' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
