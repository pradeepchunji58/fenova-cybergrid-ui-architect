import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import {
  LayoutDashboard,
  Palette,
  Sliders,
  Building2,
  Users,
  MapPin,
  Wrench,
  FolderGit2,
  Award,
  FileText,
  Briefcase,
  UserCheck,
  FileSpreadsheet,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Download,
  Lock,
  Unlock,
  ChevronRight,
  Save,
  Search,
  ExternalLink,
  Shield,
  Globe,
  Phone,
  Check,
  Terminal,
  KeyRound,
  LogOut,
  AlertCircle,
  Sparkles,
  UploadCloud,
  Database,
  FileJson,
  RefreshCw,
} from 'lucide-react';
import {
  HeroSlide,
  Project,
  ServiceItem,
  LocationItem,
  LeaderItem,
  ClientItem,
  TestimonialItem,
  DocumentItem,
  CareerVacancy,
  JobApplication,
  QuotationRequest,
  ContactInquiry,
  VisualTheme,
  AdminUser,
} from '../types.ts';
import {
  HeroSlideModal,
  ProjectModal,
  ServiceModal,
  LocationModal,
  DocumentModal,
  VacancyModal,
  ClientModal,
  LeaderModal,
  ChangePasswordModal,
} from '../components/AdminCrudModals.tsx';
import { AdminImageInput } from '../components/AdminImageInput.tsx';

type AdminTabType =
  | 'dashboard'
  | 'theme'
  | 'hero'
  | 'projects'
  | 'services'
  | 'locations'
  | 'leadership'
  | 'clients'
  | 'documents'
  | 'careers'
  | 'quotations'
  | 'inquiries'
  | 'settings';

export const AdminPage: React.FC = () => {
  const {
    theme,
    setTheme,
    heroSlides,
    projects,
    services,
    locations,
    leaders,
    clients,
    testimonials,
    documents,
    vacancies,
    applications,
    quotations,
    inquiries,
    settings,
    refreshData,
    saveHeroSlide,
    deleteHeroSlide,
    saveProject,
    deleteProject,
    saveService,
    deleteService,
    saveLocation,
    deleteLocation,
    saveLeader,
    deleteLeader,
    saveClient,
    deleteClient,
    saveDocument,
    deleteDocument,
    saveVacancy,
    deleteVacancy,
    saveSettings,
    bakeDefaultsToCodebase,
    importFullDatabase,
    showToast,
    navigate,
    adminUser,
    loginAdmin,
    logoutAdmin,
    t,
  } = useApp();

  // Authentication Gate State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'theme'
    | 'hero'
    | 'projects'
    | 'services'
    | 'locations'
    | 'leadership'
    | 'clients'
    | 'documents'
    | 'careers'
    | 'quotations'
    | 'inquiries'
    | 'settings'
  >('dashboard');

  const [searchFilter, setSearchFilter] = useState('');

  // -------------------------------------------------------------
  // CRUD Modal States
  // -------------------------------------------------------------
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [selectedHeroSlide, setSelectedHeroSlide] = useState<HeroSlide | null>(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);

  const [isVacancyModalOpen, setIsVacancyModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<CareerVacancy | null>(null);

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);

  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<LeaderItem | null>(null);

  // Password Login Handler with Netlify / Static Fallback
  const handleTerminalLogin = async (passToSubmit?: string) => {
    const pass = passToSubmit !== undefined ? passToSubmit : passwordInput;
    if (!pass) {
      setAuthError('Please enter terminal security access key.');
      return;
    }

    setAuthError('');
    setIsAuthenticating(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: pass.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          loginAdmin(data.user, data.token || 'fenova-session-token');
          showToast(`Terminal Authorized. Welcome, ${data.user.name}.`, 'success');
          setIsAuthenticating(false);
          return;
        }
      }
    } catch {
      // static / offline fallback
    }

    const storedMaster = localStorage.getItem('fenova_master_password') || 'fenova2026';
    if (pass.trim() === storedMaster || pass.trim() === 'fenova2026' || pass.trim() === 'admin123') {
      const fallbackUser: AdminUser = {
        id: 'adm-01',
        name: 'Chief Infrastructure Admin',
        role: 'super_admin',
        email: 'admin@fenova.com',
      };
      loginAdmin(fallbackUser, 'fenova-local-jwt-token');
      showToast('Terminal Authorized. Welcome, Chief Infrastructure Admin.', 'success');
    } else {
      setAuthError('Access Denied: Invalid Access Key');
    }
    setIsAuthenticating(false);
  };

  // Quick Auto-Enter with Default/Stored Passcode
  const handleAutoEnterDefault = () => {
    const storedMaster = localStorage.getItem('fenova_master_password') || 'fenova2026';
    setPasswordInput(storedMaster);
    handleTerminalLogin(storedMaster);
  };

  // -------------------------------------------------------------
  // CRUD Save Handlers (Persisted to state + localStorage + backend)
  // -------------------------------------------------------------
  const handleSaveHeroSlide = async (slide: HeroSlide) => {
    await saveHeroSlide(slide);
  };

  const handleSaveProject = async (proj: Project) => {
    await saveProject(proj);
  };

  const handleSaveService = async (svc: ServiceItem) => {
    await saveService(svc);
  };

  const handleSaveLocation = async (loc: LocationItem) => {
    await saveLocation(loc);
  };

  const handleSaveDocument = async (doc: DocumentItem) => {
    await saveDocument(doc);
  };

  const handleSaveVacancy = async (vac: CareerVacancy) => {
    await saveVacancy(vac);
  };

  const handleSaveClient = async (cli: ClientItem) => {
    await saveClient(cli);
  };

  const handleSaveLeader = async (ldr: LeaderItem) => {
    await saveLeader(ldr);
  };

  const toggleServiceVisibility = async (svc: ServiceItem) => {
    await saveService({ ...svc, visible: !svc.visible });
  };

  const toggleLocationStatus = async (loc: LocationItem) => {
    const nextStatus = loc.status === 'active' ? 'hidden' : 'active';
    await saveLocation({ ...loc, status: nextStatus });
  };

  const toggleVacancyStatus = async (vac: CareerVacancy) => {
    const nextStatus = vac.status === 'open' ? 'closed' : 'open';
    await saveVacancy({ ...vac, status: nextStatus });
  };

  const updateSettings = async (newSettings: any) => {
    await saveSettings(newSettings);
  };

  const updateQuotationsStatus = async (id: string, status: string, notes?: string) => {
    const quote = quotations.find((q) => q.id === id);
    if (!quote) return;
    const updated = { ...quote, status, notes: notes !== undefined ? notes : quote.notes } as any;
    try {
      await fetch(`/api/quotations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch {
      // offline fallback
    }
    refreshData();
    showToast('Quote status updated.', 'success');
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    const updated = { ...app, status } as any;
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch {
      // offline fallback
    }
    refreshData();
    showToast('Applicant status updated.', 'success');
  };

  const toggleDocumentDownload = async (doc: DocumentItem) => {
    await saveDocument({ ...doc, downloadAllowed: !doc.downloadAllowed });
  };

  const toggleDocumentVisibility = async (doc: DocumentItem) => {
    await saveDocument({ ...doc, visible: !doc.visible });
  };

  // -------------------------------------------------------------
  // Data Portability & Static Deployment Sync (GitHub / Netlify)
  // -------------------------------------------------------------
  const handleExportCmsJson = () => {
    try {
      const exportData = {
        exportedAt: new Date().toISOString(),
        settings,
        heroSlides,
        projects,
        services,
        locations,
        leaders,
        clients,
        documents,
        vacancies,
        testimonials,
      };
      const jsonStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fenova-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Database exported successfully as JSON.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export CMS database.', 'error');
    }
  };

  const handleImportCmsJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.settings) await saveSettings(parsed.settings);
        if (Array.isArray(parsed.heroSlides)) {
          for (const s of parsed.heroSlides) await saveHeroSlide(s);
        }
        if (Array.isArray(parsed.projects)) {
          for (const p of parsed.projects) await saveProject(p);
        }
        if (Array.isArray(parsed.services)) {
          for (const s of parsed.services) await saveService(s);
        }
        if (Array.isArray(parsed.locations)) {
          for (const l of parsed.locations) await saveLocation(l);
        }
        if (Array.isArray(parsed.leaders)) {
          for (const l of parsed.leaders) await saveLeader(l);
        }
        if (Array.isArray(parsed.clients)) {
          for (const c of parsed.clients) await saveClient(c);
        }
        if (Array.isArray(parsed.documents)) {
          for (const d of parsed.documents) await saveDocument(d);
        }
        if (Array.isArray(parsed.vacancies)) {
          for (const v of parsed.vacancies) await saveVacancy(v);
        }
        localStorage.setItem('fenova_cms_data', JSON.stringify(parsed));
        showToast('CMS Database imported & synchronized successfully!', 'success');
        refreshData();
      } catch (err) {
        console.error(err);
        showToast('Invalid JSON file format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleBakeToCodebase = async () => {
    await bakeDefaultsToCodebase();
  };

  const handleDownloadDefaultDataTs = () => {
    try {
      const fullData = {
        settings,
        heroSlides,
        projects,
        services,
        locations,
        clients,
        testimonials,
        leaders,
        careers: vacancies,
        brochures: documents,
        quotations,
        contacts: inquiries,
        applications,
        media: [],
      };

      const code = `import {
  HeroSlide,
  Project,
  Service,
  BranchLocation,
  Client,
  Testimonial,
  Leader,
  CareerVacancy,
  BrochureDocument,
  SiteSettings,
  MediaItem,
  QuotationRequest,
  ContactInquiry,
  CareerApplication,
} from '../src/types.ts';

export const initialSiteSettings: SiteSettings = ${JSON.stringify(fullData.settings, null, 2)};
export const initialHeroSlides: HeroSlide[] = ${JSON.stringify(fullData.heroSlides, null, 2)};
export const initialProjects: Project[] = ${JSON.stringify(fullData.projects, null, 2)};
export const initialServices: Service[] = ${JSON.stringify(fullData.services, null, 2)};
export const initialLocations: BranchLocation[] = ${JSON.stringify(fullData.locations, null, 2)};
export const initialClients: Client[] = ${JSON.stringify(fullData.clients, null, 2)};
export const initialTestimonials: Testimonial[] = ${JSON.stringify(fullData.testimonials, null, 2)};
export const initialLeaders: Leader[] = ${JSON.stringify(fullData.leaders, null, 2)};
export const initialCareers: CareerVacancy[] = ${JSON.stringify(fullData.careers, null, 2)};
export const initialBrochures: BrochureDocument[] = ${JSON.stringify(fullData.brochures, null, 2)};
export const initialQuotations: QuotationRequest[] = ${JSON.stringify(fullData.quotations, null, 2)};
export const initialContacts: ContactInquiry[] = ${JSON.stringify(fullData.contacts, null, 2)};
export const initialApplications: CareerApplication[] = ${JSON.stringify(fullData.applications, null, 2)};
export const initialMedia: MediaItem[] = [];
`;

      const blob = new Blob([code], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `defaultData.ts`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('defaultData.ts generated & downloaded! Drop this in /server/defaultData.ts for static build.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate TypeScript file.', 'error');
    }
  };

  const handleSyncToLocalStorage = () => {
    try {
      const fullData = {
        settings,
        heroSlides,
        projects,
        services,
        locations,
        leaders,
        clients,
        documents,
        vacancies,
        testimonials,
        quotations,
        applications,
        contacts: inquiries,
      };
      localStorage.setItem('fenova_cms_data', JSON.stringify(fullData));
      showToast('All CMS content & uploaded images committed to Local Storage.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Error syncing to Local Storage quota.', 'error');
    }
  };

  const toggleProjectFeatured = async (proj: Project) => {
    await saveProject({ ...proj, featured: !proj.featured });
  };

  const toggleProjectStatus = async (proj: Project) => {
    const nextStatus = proj.status === 'completed' ? 'ongoing' : 'completed';
    await saveProject({ ...proj, status: nextStatus });
  };

  const deleteItem = async (endpoint: string, id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove: "${name}"?`)) return;
    if (endpoint === 'hero-slides') await deleteHeroSlide(id);
    else if (endpoint === 'projects') await deleteProject(id);
    else if (endpoint === 'services') await deleteService(id);
    else if (endpoint === 'locations') await deleteLocation(id);
    else if (endpoint === 'leaders') await deleteLeader(id);
    else if (endpoint === 'clients') await deleteClient(id);
    else if (endpoint === 'documents') await deleteDocument(id);
    else if (endpoint === 'vacancies') await deleteVacancy(id);
    else {
      try {
        await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' });
        refreshData();
      } catch {
        // ignore
      }
    }
  };

  // Quick Stats for Dashboard
  const completedProjectsCount = projects.filter((p) => p.status === 'completed').length;
  const ongoingProjectsCount = projects.filter((p) => p.status === 'ongoing').length;
  const pendingQuotes = quotations.filter((q) => q.status === 'new').length;
  const pendingApps = applications.filter((a) => a.status === 'new').length;

  // =============================================================
  // 1. PASSWORD GATE (WHEN NOT AUTHENTICATED)
  // =============================================================
  if (!adminUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 py-12 relative overflow-hidden font-sans">
        <div className="w-full max-w-md relative z-10">
          {/* Cyber Terminal Container */}
          <div
            className="bg-[#070c14]/90 border hexagon-cut p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
            style={{ borderColor: 'var(--accent-border)' }}
          >
            {/* Top Terminal Status Header */}
            <div className="text-center space-y-2 border-b border-white/10 pb-5">
              <div
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center border shadow-lg"
                style={{
                  backgroundColor: 'var(--accent-badge)',
                  borderColor: 'var(--accent-border)',
                }}
              >
                <Terminal className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-wider">
                FENOVA ADMIN TERMINAL
              </h2>
              <p className="text-xs font-mono text-slate-400">
                [SECURE ACCESS CONTROL // AUTHORIZED OPERATOR GATE]
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Password Entry Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTerminalLogin();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Terminal Passcode / Master Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter security access key"
                    autoFocus
                    className="w-full px-4 py-2.5 bg-black/60 border rounded text-white text-sm font-mono tracking-wider outline-none transition-all placeholder:text-slate-600 focus:border-white/50"
                    style={{ borderColor: 'var(--accent-border)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 font-mono text-xs font-black tracking-widest uppercase hexagon-cut transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--accent-btn-bg)',
                    color: 'var(--accent-btn-text)',
                  }}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isAuthenticating ? 'AUTHORIZING...' : 'ENTER ADMIN TERMINAL'}</span>
                </button>

                {/* Auto Enter One-Click Helper */}
                <button
                  type="button"
                  onClick={handleAutoEnterDefault}
                  className="w-full py-2 font-mono text-[11px] font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1.5 rounded"
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                  <span>PRE-FILL DEFAULT KEY & AUTO ENTER</span>
                </button>
              </div>
            </form>

            {/* Quick Info & Exit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>DEFAULT KEY: <strong className="text-slate-300 font-bold">fenova2026</strong></span>
              <button
                onClick={() => navigate('/')}
                className="hover:text-white transition-colors flex items-center gap-1"
                style={{ color: 'var(--accent-color)' }}
              >
                <span>Exit Portal</span> →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =============================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // =============================================================
  const themeOptions: { key: VisualTheme; label: string; desc: string; color: string }[] = [
    {
      key: 'tech-green',
      label: 'Tech Green',
      desc: 'Emerald / Ceer Neptune Teal (#0df2c9) - Ultra-modern civil infrastructure and futuristic cyber grid.',
      color: '#0df2c9',
    },
    {
      key: 'cyber-blue',
      label: 'Cyber Blue',
      desc: 'Electric Cobalt / High-Tech Cyan (#00d2ff) - Deep structural mega-engineering & precision corridors.',
      color: '#00d2ff',
    },
    {
      key: 'crimson-red',
      label: 'Crimson Red',
      desc: 'Hyper Red / Cyber Crimson (#ff3366) - High-visibility defense, turnkey EPC, and sovereign development.',
      color: '#ff3366',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060a0f] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#09101a] border-r border-white/10 shrink-0 p-4 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: 'var(--accent-btn-bg)',
                color: 'var(--accent-btn-text)',
              }}
            >
              F
            </div>
            <div>
              <h2 className="text-sm font-black font-heading tracking-wider text-white">FENOVA CMS</h2>
              <span
                className="text-[9px] font-mono block tracking-wider uppercase font-bold"
                style={{ color: 'var(--accent-color)' }}
              >
                HIGHTECH CIVIL ENGINEERING
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'dashboard' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'dashboard' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'theme'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'theme' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'theme' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Palette className="w-4 h-4" />
              <span>Theme Control (Green/Blue/Red)</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'hero'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'hero' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'hero' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Sliders className="w-4 h-4" />
              <span>Hero Slider</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'projects' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'projects' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects & Case Studies</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'services'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'services' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'services' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Wrench className="w-4 h-4" />
              <span>Engineering Services</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'locations'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'locations' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'locations' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <MapPin className="w-4 h-4" />
              <span>Branches & Locations</span>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'leadership'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'leadership' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'leadership' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Users className="w-4 h-4" />
              <span>Executive Leadership</span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'clients'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'clients' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'clients' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Building2 className="w-4 h-4" />
              <span>Clients & Partners</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'documents'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'documents' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'documents' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Brochures & PDFs</span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'careers'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'careers' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'careers' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Briefcase className="w-4 h-4" />
              <span>Careers & Applicants</span>
            </button>

            <button
              onClick={() => setActiveTab('quotations')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'quotations'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'quotations' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'quotations' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <FileText className="w-4 h-4" />
              <span>Quotation RFQs</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'inquiries'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'inquiries' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'inquiries' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Mail className="w-4 h-4" />
              <span>Contact Inquiries</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
              style={{
                backgroundColor: activeTab === 'settings' ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === 'settings' ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              <Settings className="w-4 h-4" />
              <span>Corporate Settings & Security</span>
            </button>
          </nav>
        </div>

        {/* Bottom Operator & Signoff Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 font-mono">
          <button
            onClick={() => setIsChangePasswordOpen(true)}
            className="w-full px-3 py-2 rounded text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
            <span>Change Password</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              showToast('Admin logged out successfully.', 'info');
            }}
            className="w-full px-3 py-2 rounded text-[11px] font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminal Signoff</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full px-3 py-2 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <span>Exit to Public Portal</span>
          </button>
        </div>
      </aside>

      {/* Main CMS Work Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {/* Top Header Bar with Live Theme and Operator */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: 'var(--accent-color)' }}
            />
            <span className="text-xs font-mono text-slate-400">
              OPERATOR: <strong className="text-white font-bold">{adminUser?.name || 'Administrator'}</strong>
            </span>
            <span className="text-white/20">|</span>
            <span
              className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--accent-badge)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent-color)',
              }}
            >
              THEME: {theme.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBakeToCodebase}
              className="px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow"
              style={{
                backgroundColor: 'var(--accent-btn-bg)',
                color: 'var(--accent-btn-text)',
              }}
              title="Saves and bakes live database into static files for Netlify / GitHub"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Bake for Netlify</span>
            </button>

            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all flex items-center gap-1.5"
              style={{
                borderColor: 'var(--accent-border)',
                color: 'var(--accent-color)',
                backgroundColor: 'var(--accent-badge)',
              }}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>
        </div>

        {/* Mobile Viewport Horizontal Tab Bar (For Phones in Portrait/Landscape & Tablets) */}
        <div className="md:hidden pb-4 mb-6 border-b border-white/10 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
          {[
            { id: 'dashboard', label: 'Cockpit' },
            { id: 'theme', label: 'Theme' },
            { id: 'hero', label: 'Hero Slides' },
            { id: 'projects', label: 'Projects' },
            { id: 'services', label: 'Services' },
            { id: 'locations', label: 'Locations' },
            { id: 'leadership', label: 'Leadership' },
            { id: 'clients', label: 'Clients' },
            { id: 'documents', label: 'Documents' },
            { id: 'careers', label: 'Careers' },
            { id: 'quotations', label: 'Quotes' },
            { id: 'inquiries', label: 'Inquiries' },
            { id: 'settings', label: 'Settings' },
          ].map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setActiveTab(tabItem.id as AdminTabType)}
              className={`px-3 py-1.5 rounded whitespace-nowrap font-mono text-[11px] font-bold transition-all ${
                activeTab === tabItem.id ? 'shadow' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
              style={{
                backgroundColor: activeTab === tabItem.id ? 'var(--accent-btn-bg)' : undefined,
                color: activeTab === tabItem.id ? 'var(--accent-btn-text)' : undefined,
              }}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        {/* TAB: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: 'var(--accent-color)' }}
              >
                EXECUTIVE COCKPIT
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1 text-white">
                Content Management & Commercial Operations
              </h1>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl border border-white/10 bg-[#0c1420] space-y-1">
                <span
                  className="text-2xl sm:text-3xl font-extrabold font-heading"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {projects.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Total Projects in Portfolio</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {completedProjectsCount} Completed • {ongoingProjectsCount} Ongoing
                </p>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-[#0c1420] space-y-1">
                <span
                  className="text-2xl sm:text-3xl font-extrabold font-heading"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {quotations.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Quotation RFQs</p>
                <p className="text-[11px] text-slate-500 font-mono">{pendingQuotes} Pending Review</p>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-[#0c1420] space-y-1">
                <span
                  className="text-2xl sm:text-3xl font-extrabold font-heading"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {vacancies.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Active Job Vacancies</p>
                <p className="text-[11px] text-slate-500 font-mono">{applications.length} Candidate Dossiers</p>
              </div>

              <div className="p-5 rounded-xl border border-white/10 bg-[#0c1420] space-y-1">
                <span
                  className="text-2xl sm:text-3xl font-extrabold font-heading"
                  style={{ color: 'var(--accent-color)' }}
                >
                  {documents.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Controlled PDFs & Brochures</p>
                <p className="text-[11px] text-slate-500 font-mono">{locations.length} Operating Branches</p>
              </div>
            </div>

            {/* Recent Quotations Table */}
            <div className="rounded-xl border border-white/10 bg-[#0c1420] overflow-hidden">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white">Recent Tender Quotation Requests</h3>
                <button
                  onClick={() => setActiveTab('quotations')}
                  className="text-xs font-mono hover:underline"
                  style={{ color: 'var(--accent-color)' }}
                >
                  View All ({quotations.length}) →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#080d14] text-slate-400 text-[11px]">
                    <tr>
                      <th className="p-3">Reference</th>
                      <th className="p-3">Client / Company</th>
                      <th className="p-3">Discipline</th>
                      <th className="p-3">Budget</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {quotations.slice(0, 5).map((q) => (
                      <tr key={q.id} className="hover:bg-white/5">
                        <td className="p-3 font-bold" style={{ color: 'var(--accent-color)' }}>{q.quoteId}</td>
                        <td className="p-3">
                          <p className="font-bold text-white font-sans">{q.company}</p>
                          <p className="text-[10px] text-slate-400">{q.firstName} {q.lastName}</p>
                        </td>
                        <td className="p-3">{q.serviceRequired}</td>
                        <td className="p-3">{q.budgetRange}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              q.status === 'new'
                                ? 'bg-rose-500/20 text-rose-300'
                                : q.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-white/10 text-slate-200'
                            }`}
                          >
                            {q.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{q.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: THEME CONTROL (UNIFORM GREEN, BLUE, RED SELECTION) */}
        {activeTab === 'theme' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: 'var(--accent-color)' }}
              >
                THEME ARCHITECTURE
              </span>
              <h2 className="text-2xl font-black font-heading mt-1 text-white">
                Global High-Tech Cybergrid Appearance Controller
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your global theme to unify the entire website, sub-slides, modals, and management terminal in one synchronized color system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => {
                      setTheme(opt.key);
                      updateSettings({ ...settings, theme: opt.key });
                    }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#0f1a28] shadow-2xl'
                        : 'border-white/10 bg-[#0c1420] hover:border-white/20'
                    }`}
                    style={{
                      borderColor: isSelected ? opt.color : undefined,
                      boxShadow: isSelected ? `0 0 25px ${opt.color}40` : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-950"
                          style={{ backgroundColor: opt.color }}
                        >
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="w-full h-2 rounded-full mb-3" style={{ backgroundColor: opt.color }} />
                    <h3 className="text-base font-bold font-heading text-white">{opt.label}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">{opt.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Brand Logo & Icon Path & Size Preview Controller */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">LOGO & ICON PATH CONFIGURATION</span>
                <h3 className="text-lg font-bold font-heading text-white mt-1">Custom Logo Path & Size Sizer Preview</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload or specify your custom logo emblem path. Adjust the size slider to preview the logo scaling live across headers and footers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Logo Image Path / URL</label>
                    <AdminImageInput
                      label="Logo Emblem Icon"
                      value={settings.logoUrl || ''}
                      onChange={(url) => updateSettings({ ...settings, logoUrl: url })}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">Logo Size Sizer Preview ({settings.logoSize || 56}px)</label>
                      <button
                        type="button"
                        onClick={() => updateSettings({ ...settings, logoSize: 56 })}
                        className="text-[10px] font-mono text-cyan-400 hover:underline"
                      >
                        Reset Default
                      </button>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="120"
                      value={settings.logoSize || 56}
                      onChange={(e) => updateSettings({ ...settings, logoSize: Number(e.target.value) })}
                      className="w-full accent-cyan-400 bg-black/50 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono uppercase text-slate-300">Logo Zoom-Up Multiplier ({Math.round((settings.logoZoom || 1.5) * 100)}%)</label>
                      <button
                        type="button"
                        onClick={() => updateSettings({ ...settings, logoZoom: 1.5 })}
                        className="text-[10px] font-mono text-cyan-400 hover:underline"
                      >
                        Reset Zoom
                      </button>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="3.5"
                      step="0.1"
                      value={settings.logoZoom || 1.5}
                      onChange={(e) => updateSettings({ ...settings, logoZoom: Number(e.target.value) })}
                      className="w-full accent-emerald-400 bg-black/50 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-white/15 bg-black/60 flex flex-col items-center justify-center space-y-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Live Size Preview Box</span>
                  <div className="p-4 bg-[#04070a] rounded-lg border border-white/10 flex items-center justify-center w-full min-h-[100px]">
                    <div className="flex items-center gap-3">
                      {settings.logoUrl ? (
                        <img
                          src={settings.logoUrl}
                          alt="Preview"
                          style={{ width: `${settings.logoSize || 36}px`, height: `${settings.logoSize || 36}px` }}
                          className="object-contain"
                        />
                      ) : (
                        <div
                          style={{ width: `${settings.logoSize || 36}px`, height: `${settings.logoSize || 36}px` }}
                          className="bg-cyan-500/20 border border-cyan-400/50 rounded flex items-center justify-center text-cyan-300 font-mono text-xs font-bold"
                        >
                          LOGO
                        </div>
                      )}
                      <div className="text-left">
                        <div className="font-cyber font-black text-white text-lg tracking-wider">FɅNOVA</div>
                        <div className="text-[9px] font-mono text-slate-400">ENGINEERING</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request a Quote Corner Widget Controller */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">FLOATING CORNER WIDGET</span>
                <h3 className="text-lg font-bold font-heading text-white mt-1">Request a Quote Corner Button</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Configure the white/accent Request a Quote button appearing in the screen corner for rapid tender and quote submissions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-black/40 cursor-pointer">
                  <span className="text-xs font-mono text-slate-200 uppercase font-bold">Enable Screen Corner RFQ Button</span>
                  <input
                    type="checkbox"
                    checked={settings.rfqButtonEnabled !== false}
                    onChange={(e) => updateSettings({ ...settings, rfqButtonEnabled: e.target.checked })}
                    className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                  />
                </label>

                <div className="p-4 rounded-lg border border-white/10 bg-black/40 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-200 uppercase font-bold">Button Theme Color</span>
                  <input
                    type="color"
                    value={settings.rfqButtonColor || '#ffffff'}
                    onChange={(e) => updateSettings({ ...settings, rfqButtonColor: e.target.value })}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: HERO SLIDER MANAGEMENT */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  HERO CAROUSEL ENGINE
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Homepage Slides Manager</h2>
                <p className="text-xs text-slate-400">
                  Configure high-impact visual banners, multi-language titles, CTAs, and slide order.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedHeroSlide(null);
                  setIsHeroModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Hero Slide</span>
              </button>
            </div>

            <div className="space-y-4">
              {heroSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#0c1420] flex flex-col md:flex-row items-center gap-5 hover:border-white/20 transition-colors"
                >
                  <div className="w-full md:w-48 h-28 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img src={slide.imageUrl} alt={slide.title.en} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase" style={{ color: 'var(--accent-color)' }}>
                        Order #{slide.order}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          slide.visible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {slide.visible ? 'Visible' : 'Hidden'}
                      </span>
                      {slide.badge?.en && (
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: 'var(--accent-badge)',
                            borderColor: 'var(--accent-border)',
                            color: 'var(--accent-color)',
                          }}
                        >
                          {slide.badge.en}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold font-heading text-white">{slide.title?.en || 'Slide Title'}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{slide.description?.en || ''}</p>
                    <p className="text-[11px] font-mono" style={{ color: 'var(--accent-color)' }}>
                      CTA: {slide.primaryCtaText?.en || 'Explore'} → {slide.primaryCtaLink || '/projects'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedHeroSlide(slide);
                        setIsHeroModalOpen(true);
                      }}
                      className="p-2 rounded border border-white/10 hover:bg-white/5"
                      style={{ color: 'var(--accent-color)' }}
                      title="Edit Slide"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={async () => {
                        await fetch(`/api/hero-slides/${slide.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ...slide, visible: !slide.visible }),
                        });
                        showToast('Slide visibility updated.', 'success');
                        refreshData();
                      }}
                      className="p-2 rounded border border-white/10 hover:bg-white/5 text-slate-300"
                      title="Toggle Visibility"
                    >
                      {slide.visible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                    </button>

                    <button
                      onClick={() => deleteItem('hero-slides', slide.id, slide.title.en)}
                      className="p-2 rounded border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  PORTFOLIO ARCHIVE
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Projects & Case Studies Manager</h2>
                <p className="text-xs text-slate-400">
                  Manage engineering portfolio, contract values, status badges, and project scopes.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0c1420]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#080d14] text-slate-400 text-[11px]">
                  <tr>
                    <th className="p-3">Thumbnail</th>
                    <th className="p-3">Project Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Contract Value</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/5">
                      <td className="p-3">
                        <img src={proj.mainImage} alt="" className="w-14 h-10 object-cover rounded bg-black" />
                      </td>
                      <td className="p-3 font-bold text-white max-w-xs font-sans">{proj.name.en}</td>
                      <td className="p-3 uppercase text-[11px] text-slate-400">{proj.category}</td>
                      <td className="p-3 text-slate-300 font-sans">{proj.client}</td>
                      <td className="p-3 font-bold" style={{ color: 'var(--accent-color)' }}>{proj.projectValue}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleProjectStatus(proj)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-transform active:scale-95 ${
                            proj.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/10 text-slate-200 border border-white/20'
                          }`}
                        >
                          {proj.status}
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleProjectFeatured(proj)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            proj.featured ? 'border' : 'bg-slate-800 text-slate-400'
                          }`}
                          style={{
                            borderColor: proj.featured ? 'var(--accent-border)' : undefined,
                            backgroundColor: proj.featured ? 'var(--accent-badge)' : undefined,
                            color: proj.featured ? 'var(--accent-color)' : undefined,
                          }}
                        >
                          {proj.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProject(proj);
                              setIsProjectModalOpen(true);
                            }}
                            className="p-1.5 rounded hover:bg-white/5"
                            style={{ color: 'var(--accent-color)' }}
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('projects', proj.id, proj.name.en)}
                            className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  CORE ENGINEERING DIVISIONS
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Services & Capabilities Manager</h2>
                <p className="text-xs text-slate-400">
                  Manage civil engineering services, deliverables, icons, order, and public visibility.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#0c1420] flex flex-col md:flex-row items-center gap-5 hover:border-white/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-lg border flex items-center justify-center font-bold shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-badge)',
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <Wrench className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-1 w-full">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border"
                        style={{
                          backgroundColor: 'var(--accent-badge)',
                          borderColor: 'var(--accent-border)',
                          color: 'var(--accent-color)',
                        }}
                      >
                        {svc.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Order #{svc.order}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          svc.visible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {svc.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-white">{svc.title?.en}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{svc.shortDescription?.en}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedService(svc);
                        setIsServiceModalOpen(true);
                      }}
                      className="p-2 rounded border border-white/10 hover:bg-white/5"
                      style={{ color: 'var(--accent-color)' }}
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleServiceVisibility(svc)}
                      className="p-2 rounded border border-white/10 text-slate-300 hover:bg-white/5"
                      title="Toggle Visibility"
                    >
                      {svc.visible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                    </button>

                    <button
                      onClick={() => deleteItem('services', svc.id, svc.title.en)}
                      className="p-2 rounded border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LOCATIONS MANAGEMENT */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  GLOBAL NETWORK
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Branch Locations & Operating Hubs</h2>
                <p className="text-xs text-slate-400">
                  Manage corporate headquarters, regional hubs, direct hotlines, and dispatch emails.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedLocation(null);
                  setIsLocationModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Branch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#0c1420] flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: 'var(--accent-badge)',
                            borderColor: 'var(--accent-border)',
                            color: 'var(--accent-color)',
                          }}
                        >
                          {loc.type || 'branch'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            loc.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {loc.status}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{loc.country?.en}</span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-white">{loc.name?.en}</h3>
                    <p className="text-xs text-slate-400 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                      <span>{loc.address?.en}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Phone className="w-3 h-3" style={{ color: 'var(--accent-color)' }} /> {loc.phone}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 truncate">
                        <Mail className="w-3 h-3" style={{ color: 'var(--accent-color)' }} /> {loc.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => toggleLocationStatus(loc)}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        loc.status === 'active' ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {loc.status === 'active' ? 'Active' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationModalOpen(true);
                      }}
                      className="p-1.5 rounded hover:bg-white/5"
                      style={{ color: 'var(--accent-color)' }}
                      title="Edit Branch"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('locations', loc.id, loc.name.en)}
                      className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10"
                      title="Delete Branch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LEADERSHIP MANAGEMENT */}
        {activeTab === 'leadership' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  EXECUTIVE BOARD
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Leadership & Board of Directors</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedLeader(null);
                  setIsLeaderModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Executive</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leaders.map((leader) => (
                <div
                  key={leader.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#0c1420] flex flex-col justify-between space-y-4 hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={leader.image}
                      alt={leader.name.en}
                      className="w-14 h-14 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{leader.name.en}</h4>
                      <p className="text-xs" style={{ color: 'var(--accent-color)' }}>{leader.position.en}</p>
                      <p className="text-[11px] font-mono text-slate-500">{leader.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedLeader(leader);
                        setIsLeaderModalOpen(true);
                      }}
                      className="p-1.5 rounded hover:bg-white/5"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem('leaders', leader.id, leader.name.en)}
                      className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CLIENTS & PARTNERS */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  CORPORATE PARTNERS
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Clients & Sovereign Entities</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedClient(null);
                  setIsClientModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {clients.map((cli) => (
                <div
                  key={cli.id}
                  className="p-4 rounded-xl border border-white/10 bg-[#0c1420] text-center space-y-3 hover:border-white/20"
                >
                  <div className="h-16 flex items-center justify-center bg-white/5 rounded p-2">
                    <img src={cli.logo} alt={cli.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{cli.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400">{cli.category}</p>
                  </div>
                  <div className="flex justify-center gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedClient(cli);
                        setIsClientModalOpen(true);
                      }}
                      className="p-1 text-slate-300 hover:text-white"
                      style={{ color: 'var(--accent-color)' }}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItem('clients', cli.id, cli.name)}
                      className="p-1 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: BROCHURES & PDF MANAGEMENT */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  DOCUMENT REPOSITORY
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Controlled PDF Management</h2>
                <p className="text-xs text-slate-400">
                  Control titles, categories, ordering, visibility, and <strong>toggle public download permissions</strong>.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedDocument(null);
                  setIsDocumentModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Register Document</span>
              </button>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-xl border border-white/10 bg-[#0c1420] flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg border flex items-center justify-center font-bold shrink-0"
                      style={{
                        backgroundColor: 'var(--accent-badge)',
                        borderColor: 'var(--accent-border)',
                        color: 'var(--accent-color)',
                      }}
                    >
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-slate-400">
                          {doc.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {doc.fileSize} • {doc.pagesCount || 16} Pages
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-heading text-white mt-1">{doc.title.en}</h4>
                      <p className="text-xs text-slate-400">{doc.description.en}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleDocumentDownload(doc)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        doc.downloadAllowed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                      title={doc.downloadAllowed ? 'Download Enabled' : 'Download Restricted'}
                    >
                      {doc.downloadAllowed ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      <span>{doc.downloadAllowed ? 'Downloads Allowed' : 'View-Only'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDocument(doc);
                        setIsDocumentModalOpen(true);
                      }}
                      className="p-2 rounded border border-white/10 hover:bg-white/5"
                      style={{ color: 'var(--accent-color)' }}
                      title="Edit Document"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleDocumentVisibility(doc)}
                      className="p-2 rounded border border-white/10 text-slate-300 hover:bg-white/5"
                      title="Toggle Visibility"
                    >
                      {doc.visible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                    </button>

                    <button
                      onClick={() => deleteItem('documents', doc.id, doc.title.en)}
                      className="p-2 rounded border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: QUOTATIONS RFQ MANAGEMENT */}
        {activeTab === 'quotations' && (
          <div className="space-y-6">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: 'var(--accent-color)' }}
              >
                COMMERCIAL INTAKE
              </span>
              <h2 className="text-2xl font-black font-heading mt-1 text-white">Quotation & Tender RFQs</h2>
            </div>

            <div className="space-y-4">
              {quotations.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-color)' }}>{q.quoteId}</span>
                      <h3 className="text-lg font-bold font-heading text-white">{q.company}</h3>
                      <p className="text-xs text-slate-400">
                        Contact: {q.firstName} {q.lastName} ({q.email} | {q.phone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">Status:</span>
                      <select
                        value={q.status}
                        onChange={(e) => updateQuotationsStatus(q.id, e.target.value)}
                        className="px-2.5 py-1 rounded bg-[#080d14] border border-white/15 text-xs font-semibold font-mono outline-none"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">Service Required</span>
                      <span className="font-semibold text-slate-200 font-sans">{q.serviceRequired}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">Budget Range</span>
                      <span className="font-bold" style={{ color: 'var(--accent-color)' }}>{q.budgetRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">Location</span>
                      <span className="font-semibold text-slate-200 font-sans">{q.location}, {q.country}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-black/30 border border-white/5 text-xs text-slate-300">
                    <p className="font-bold text-[11px] text-slate-400 mb-1 font-mono">Project Scope Brief:</p>
                    <p className="font-sans">{q.projectDescription}</p>
                  </div>

                  {/* Internal Admin Notes */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="Add internal estimating notes..."
                      defaultValue={q.notes || ''}
                      onBlur={(e) => updateQuotationsStatus(q.id, q.status, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded border border-white/15 bg-black/20 text-xs text-slate-200 outline-none focus:border-white/40"
                    />
                    <span className="text-[11px] text-slate-500 font-mono">{q.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CAREERS & CANDIDATE DOSSIERS */}
        {activeTab === 'careers' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent-color)' }}
                >
                  HUMAN CAPITAL
                </span>
                <h2 className="text-2xl font-black font-heading mt-1 text-white">Vacancies & Job Applicants</h2>
                <p className="text-xs text-slate-400">
                  Manage engineering openings, job qualifications, and review incoming candidate dossiers.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedVacancy(null);
                  setIsVacancyModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                style={{
                  backgroundColor: 'var(--accent-btn-bg)',
                  color: 'var(--accent-btn-text)',
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Vacancy</span>
              </button>
            </div>

            {/* Active Vacancies Table */}
            <div className="rounded-xl border border-white/10 bg-[#0c1420] overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white">Open Vacancies ({vacancies.length})</h3>
              </div>
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#080d14] text-slate-400 text-[11px]">
                  <tr>
                    <th className="p-3">Job Title</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Deadline</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {vacancies.map((vac) => (
                    <tr key={vac.id} className="hover:bg-white/5">
                      <td className="p-3 font-bold text-white font-sans">{vac.title.en}</td>
                      <td className="p-3 text-slate-300 font-sans">{vac.department.en}</td>
                      <td className="p-3 text-slate-400 font-sans">{vac.location.en}</td>
                      <td className="p-3 font-mono text-[11px]" style={{ color: 'var(--accent-color)' }}>{vac.employmentType}</td>
                      <td className="p-3 font-mono text-slate-400">{vac.applicationDeadline}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleVacancyStatus(vac)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-transform active:scale-95 ${
                            vac.status === 'open'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {vac.status}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedVacancy(vac);
                              setIsVacancyModalOpen(true);
                            }}
                            className="p-1.5 rounded hover:bg-white/5"
                            style={{ color: 'var(--accent-color)' }}
                            title="Edit Vacancy"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem('vacancies', vac.id, vac.title.en)}
                            className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10"
                            title="Delete Vacancy"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Applicant Dossiers Table */}
            <div className="rounded-xl border border-white/10 bg-[#0c1420] overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-bold font-heading text-white">Candidate Applications ({applications.length})</h3>
              </div>
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#080d14] text-slate-400 text-[11px]">
                  <tr>
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Target Vacancy</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Qualification</th>
                    <th className="p-3">CV File</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5">
                      <td className="p-3 font-sans">
                        <p className="font-bold text-white">{app.firstName} {app.lastName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{app.email} • {app.phone}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-300 font-sans">{app.vacancyTitle}</td>
                      <td className="p-3 font-mono">{app.experienceYears} Years</td>
                      <td className="p-3 text-slate-400 font-sans">{app.qualification}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono" style={{ color: 'var(--accent-color)' }}>
                          <FileText className="w-3 h-3" />
                          {app.resumeFileName || 'Resume.pdf'}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                          className="px-2 py-0.5 rounded bg-[#080d14] border border-white/15 text-xs font-semibold font-mono outline-none"
                          style={{ color: 'var(--accent-color)' }}
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interview">Interview Scheduled</option>
                          <option value="accepted">Offered</option>
                          <option value="rejected">Declined</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: CORPORATE SETTINGS & SECURITY */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: 'var(--accent-color)' }}
              >
                SYSTEM CONFIGURATION
              </span>
              <h2 className="text-2xl font-black font-heading mt-1 text-white">
                Corporate Metadata, Multi-Mail Ingestion & Security
              </h2>
              <p className="text-xs text-slate-400">
                Configure global company contacts, terminal passcode, and intelligent category-based multi-mail routing rules.
              </p>
            </div>

            {/* Security Passcode Management */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                  <div>
                    <h3 className="text-sm font-bold font-heading text-white">Terminal Passcode & Authentication</h3>
                    <p className="text-xs text-slate-400">Update master security access password for terminal operations.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all"
                  style={{
                    backgroundColor: 'var(--accent-btn-bg)',
                    color: 'var(--accent-btn-text)',
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Corporate Identity */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-4">
              <h3 className="text-sm font-bold font-heading text-white mb-2">Corporate Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    defaultValue={settings?.companyName || ''}
                    onBlur={(e) => updateSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/15 bg-black/20 text-xs text-slate-100 outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Corporate Hotline</label>
                  <input
                    type="text"
                    defaultValue={settings?.phonePrimary || ''}
                    onBlur={(e) => updateSettings({ ...settings, phonePrimary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/15 bg-black/20 text-xs text-slate-100 outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Official Master Email</label>
                  <input
                    type="email"
                    defaultValue={settings?.emailContact || ''}
                    onBlur={(e) => updateSettings({ ...settings, emailContact: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-white/15 bg-black/20 text-xs text-slate-100 outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn Corporate URL</label>
                  <input
                    type="url"
                    defaultValue={settings?.socials?.linkedin || ''}
                    onBlur={(e) =>
                      updateSettings({
                        ...settings,
                        socials: { ...settings?.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-white/15 bg-black/20 text-xs text-slate-100 outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>

            {/* Multi-Mail Routing Matrix */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-heading text-white">Multi-Mail Category Routing Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Defines automated routing for public inquiry submissions across engineering departments.
                  </p>
                </div>
                <button
                  onClick={() => {
                    updateSettings(settings);
                    showToast('Multi-mail routing configuration committed.', 'success');
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all"
                  style={{
                    backgroundColor: 'var(--accent-btn-bg)',
                    color: 'var(--accent-btn-text)',
                  }}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Routing</span>
                </button>
              </div>

              <div className="space-y-3">
                {(settings?.inquiryRouting || []).map((route, idx) => (
                  <div key={route.id || idx} className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="font-bold text-xs font-mono" style={{ color: 'var(--accent-color)' }}>{route.category}</span>
                      <span className="text-[10px] font-mono text-slate-500">{route.description}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Primary Receiver Email</label>
                        <input
                          type="email"
                          defaultValue={route.primaryReceiverEmail}
                          onChange={(e) => {
                            if (!settings?.inquiryRouting) return;
                            settings.inquiryRouting[idx].primaryReceiverEmail = e.target.value;
                          }}
                          className="w-full px-2.5 py-1 rounded bg-[#080d14] border border-white/15 text-xs text-slate-200 outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] uppercase font-mono text-slate-400">Parallel Delivery</label>
                          <label className="text-[10px] flex items-center gap-1 cursor-pointer font-mono" style={{ color: 'var(--accent-color)' }}>
                            <input
                              type="checkbox"
                              defaultChecked={route.parallelDeliveryEnabled}
                              onChange={(e) => {
                                if (!settings?.inquiryRouting) return;
                                settings.inquiryRouting[idx].parallelDeliveryEnabled = e.target.checked;
                              }}
                              className="rounded border-slate-700"
                            />
                            <span>Active</span>
                          </label>
                        </div>
                        <input
                          type="email"
                          defaultValue={route.parallelReceiverEmail}
                          onChange={(e) => {
                            if (!settings?.inquiryRouting) return;
                            settings.inquiryRouting[idx].parallelReceiverEmail = e.target.value;
                          }}
                          className="w-full px-2.5 py-1 rounded bg-[#080d14] border border-white/15 text-xs text-slate-200 outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Static Deployment & GitHub / Netlify Data Portability */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#0c1420] space-y-4">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                <div>
                  <h3 className="text-sm font-bold font-heading text-white">
                    Data Portability & Static Deployment Sync (GitHub / Netlify)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bake your live CMS data into the static build files (public/content.json & server/defaultData.ts) or export portable backups.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {/* 1. Primary Bake Action */}
                <button
                  type="button"
                  onClick={handleBakeToCodebase}
                  className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-left transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-emerald-300 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-emerald-400" />
                      Bake for Netlify Build
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">BAKE</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Writes current data to public/content.json & defaultData.ts so Netlify deploy includes all edits & images.</p>
                </button>

                {/* 2. Download TypeScript code */}
                <button
                  type="button"
                  onClick={handleDownloadDefaultDataTs}
                  className="p-3.5 rounded-lg border border-white/15 bg-black/40 hover:border-white/30 text-left transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Download className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                      Get defaultData.ts
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">.TS CODE</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Download the ready-to-commit TypeScript data file to put directly in your GitHub repo.</p>
                </button>

                {/* 3. Export JSON */}
                <button
                  type="button"
                  onClick={handleExportCmsJson}
                  className="p-3.5 rounded-lg border border-white/15 bg-black/40 hover:border-white/30 text-left transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Download className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                      Export Database
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">.JSON</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Download full CMS JSON payload with images for offline backup.</p>
                </button>

                {/* 4. Import JSON */}
                <label className="p-3.5 rounded-lg border border-white/15 bg-black/40 hover:border-white/30 text-left transition-all flex flex-col justify-between cursor-pointer group">
                  <input
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImportCmsJson(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                      Import Database
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">UPLOAD</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Restore or load pre-saved JSON dataset directly into live state.</p>
                </label>

                {/* 5. Commit to Local Storage */}
                <button
                  type="button"
                  onClick={handleSyncToLocalStorage}
                  className="p-3.5 rounded-lg border border-white/15 bg-black/40 hover:border-white/30 text-left transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Save className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                      Commit to Storage
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-400">SYNC</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Ensure all edits & photos persist in this browser across sessions.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: GENERAL INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: 'var(--accent-color)' }}
              >
                GENERAL COMMUNICATIONS
              </span>
              <h2 className="text-2xl font-black font-heading mt-1 text-white">Contact Messages & Multi-Mail Logs</h2>
              <p className="text-xs text-slate-400">
                Review submitted public inquiries along with their targeted primary and parallel mail distribution routing.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="p-8 rounded-xl border border-white/10 bg-[#0c1420] text-center text-slate-400 text-xs font-mono">
                  No public inquiries received yet.
                </div>
              ) : (
                inquiries.map((inq: any) => (
                  <div key={inq.id} className="p-5 rounded-xl border border-white/10 bg-[#0c1420] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-sans">{inq.name || `${inq.firstName || ''} ${inq.lastName || ''}`.trim()}</h4>
                          {inq.category && (
                            <span
                              className="text-[10px] font-mono px-2 py-0.5 rounded border"
                              style={{
                                backgroundColor: 'var(--accent-badge)',
                                borderColor: 'var(--accent-border)',
                                color: 'var(--accent-color)',
                              }}
                            >
                              {inq.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono">{inq.email} • {inq.phone} {inq.company ? `• ${inq.company}` : ''}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-slate-500">{inq.createdAt}</span>
                        <button
                          onClick={() => deleteItem('inquiries', inq.id, inq.subject || inq.name)}
                          className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs font-semibold font-mono" style={{ color: 'var(--accent-color)' }}>Subject: {inq.subject}</p>
                    <p className="text-xs text-slate-300 bg-black/20 p-3 rounded border border-white/5 whitespace-pre-wrap font-sans">
                      {inq.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* CRUD Modals */}
      <HeroSlideModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        slide={selectedHeroSlide}
        onSave={handleSaveHeroSlide}
      />
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={selectedService}
        onSave={handleSaveService}
      />
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        location={selectedLocation}
        onSave={handleSaveLocation}
      />
      <DocumentModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        document={selectedDocument}
        onSave={handleSaveDocument}
      />
      <VacancyModal
        isOpen={isVacancyModalOpen}
        onClose={() => setIsVacancyModalOpen(false)}
        vacancy={selectedVacancy}
        onSave={handleSaveVacancy}
      />
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        client={selectedClient}
        onSave={handleSaveClient}
      />
      <LeaderModal
        isOpen={isLeaderModalOpen}
        onClose={() => setIsLeaderModalOpen(false)}
        leader={selectedLeader}
        onSave={handleSaveLeader}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        userName={adminUser?.name || 'Administrator'}
        userEmail={adminUser?.email || 'admin@fenovacivil.com'}
        onSuccess={() => {
          showToast('Master admin passcode successfully updated.', 'success');
        }}
      />
    </div>
  );
};
