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
  const { locations, navigate, ui, t, theme } = useApp();
  const isLight = theme === 'modern-construction';

  // Only show active branches on public frontend
  const activeLocations = (locations || [])
    .filter((loc) => loc.status === 'active')
    .sort((a, b) => a.order - b.order);

  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    activeLocations[0]?.id || ''
  );

  const activeLoc = activeLocations.find((l) => l.id === selectedLocationId) || activeLocations[0];

  return (
    <div className="space-y-16 pb-20">
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
            <span>{ui.locations}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Strategic Operating Hubs & Branch Network
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Multi-regional presence connecting corporate governance, heavy industrial yards, and high-precision computational engineering design centers.
          </p>
        </div>
      </section>

      {/* Main Interactive Location Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Branch List / Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">
              Select Operating Center ({activeLocations.length})
            </h3>

            <div className="space-y-3">
              {activeLocations.map((loc) => {
                const isSelected = loc.id === (activeLoc?.id || '');
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? isLight
                          ? 'bg-orange-50/70 border-orange-500 shadow-md'
                          : 'bg-[#111c2a] border-amber-500 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-[#0d1622] border-[#1e2f42] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        {t(loc.country)}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {loc.coordinates.lat.toFixed(2)}° N, {loc.coordinates.lng.toFixed(2)}° E
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-heading mt-1">{t(loc.name)}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{t(loc.address)}</p>

                    <div className="pt-3 mt-3 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono">{loc.phone}</span>
                      <span className="text-amber-500 font-semibold">{isSelected ? 'Active View' : 'Select →'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Branch Detail & Live Map Embed */}
          {activeLoc && (
            <div className="lg:col-span-2 space-y-6">
              <div
                className={`p-6 sm:p-8 rounded-xl border space-y-6 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0d1622] border-[#1e2f42]'
                }`}
              >
                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-52 rounded-lg overflow-hidden bg-black relative">
                    <img
                      src={activeLoc.locationImage}
                      alt={t(activeLoc.name)}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                      Exterior Site Facility
                    </span>
                  </div>
                  <div className="h-52 rounded-lg overflow-hidden bg-black relative">
                    <img
                      src={activeLoc.officeImage}
                      alt={t(activeLoc.name)}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono">
                      Engineering Command Center
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                      {t(activeLoc.country)}
                    </span>
                    <h2 className="text-2xl font-bold font-heading mt-1">{t(activeLoc.name)}</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                      {t(activeLoc.description)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/40 text-xs">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{t(activeLoc.address)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                        <a href={`tel:${activeLoc.phone}`} className="font-mono hover:underline">
                          {activeLoc.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                        <a href={`mailto:${activeLoc.email}`} className="font-mono hover:underline">
                          {activeLoc.email}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <User className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{activeLoc.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{t(activeLoc.workingHours)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Embed */}
                <div className="pt-4 border-t border-slate-800/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Geographic Satellite Coordinates</span>
                    <span className="font-mono text-amber-400 text-[11px]">
                      LAT {activeLoc.coordinates.lat} / LNG {activeLoc.coordinates.lng}
                    </span>
                  </h4>
                  <div className="h-64 sm:h-80 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-900">
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
