import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  Compass,
  ExternalLink,
  Building,
} from 'lucide-react';

export const LocationsPage: React.FC = () => {
  const { locations, navigate, ui, t } = useApp();

  // Only show active branches on public frontend
  const activeLocations = (locations || [])
    .filter((loc) => loc.status === 'active')
    .sort((a, b) => a.order - b.order);

  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    activeLocations[0]?.id || ''
  );

  const activeLoc = activeLocations.find((l) => l.id === selectedLocationId) || activeLocations[0];

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
            <button onClick={() => navigate('/about')} className="hover:underline">
              {ui.about}
            </button>
            <span>/</span>
            <span>{ui.locations}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-cyber tracking-tight">
            Strategic Operating Hubs & Branch Network
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            Multi-regional presence connecting corporate governance, heavy industrial yards, and high-precision computational engineering design centers.
          </p>
        </div>
      </section>

      {/* Main Interactive Location Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Branch List / Selector */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>
              Select Operating Center ({activeLocations.length})
            </h3>

            <div className="space-y-3">
              {activeLocations.map((loc) => {
                const isSelected = loc.id === (activeLoc?.id || '');
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className="p-5 rounded border cursor-pointer transition-all duration-200 bg-[#060b12]"
                    style={{
                      borderColor: isSelected ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                      boxShadow: isSelected ? '0 0 15px var(--accent-glow)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>
                        {t(loc.country)}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {loc.coordinates.lat.toFixed(2)}° N, {loc.coordinates.lng.toFixed(2)}° E
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-cyber text-white mt-1">{t(loc.name)}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-sans">{t(loc.address)}</p>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>{loc.phone}</span>
                      <span className="font-semibold" style={{ color: 'var(--accent-color)' }}>
                        {isSelected ? '[ ACTIVE_VIEW ]' : 'SELECT →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Branch Detail & Live Map Embed */}
          {activeLoc && (
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 sm:p-8 rounded border border-white/10 space-y-6 bg-[#060b12]">
                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-52 rounded overflow-hidden bg-black relative border border-white/10">
                    <img
                      src={activeLoc.locationImage}
                      alt={t(activeLoc.name)}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono border border-white/10">
                      Exterior Site Facility
                    </span>
                  </div>
                  <div className="h-52 rounded overflow-hidden bg-black relative border border-white/10">
                    <img
                      src={activeLoc.officeImage}
                      alt={t(activeLoc.name)}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono border border-white/10">
                      Engineering Command Center
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-color)' }}>
                      {t(activeLoc.country)}
                    </span>
                    <h2 className="text-2xl font-bold font-cyber text-white mt-1">{t(activeLoc.name)}</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-sans">
                      {t(activeLoc.description)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                        <span className="font-sans">{t(activeLoc.address)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                        <a href={`tel:${activeLoc.phone}`} className="hover:underline">
                          {activeLoc.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                        <a href={`mailto:${activeLoc.email}`} className="hover:underline">
                          {activeLoc.email}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <User className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                        <span className="font-sans">{activeLoc.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-color)' }} />
                        <span className="font-sans">{t(activeLoc.workingHours)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Embed */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Geographic Satellite Coordinates</span>
                    <span className="text-[11px]" style={{ color: 'var(--accent-color)' }}>
                      LAT {activeLoc.coordinates.lat} / LNG {activeLoc.coordinates.lng}
                    </span>
                  </h4>
                  <div className="h-64 sm:h-80 rounded overflow-hidden border border-white/10 bg-slate-900">
                    <iframe
                      title={`Map for ${t(activeLoc.name)}`}
                      src={activeLoc.mapEmbedUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
