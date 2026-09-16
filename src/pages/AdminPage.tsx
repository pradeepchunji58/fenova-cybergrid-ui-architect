import React, { useState } from 'react';
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
} from '../types.ts';

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
    showToast,
    navigate,
    t,
  } = useApp();

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
  // Helpers to persist generic updates to backend
  // -------------------------------------------------------------
  const updateSettings = async (newSettings: any) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        showToast('Settings saved successfully.', 'success');
        refreshData();
      }
    } catch {
      showToast('Error saving settings.', 'error');
    }
  };

  const updateQuotationsStatus = async (id: string, status: string, notes?: string) => {
    const quote = quotations.find((q) => q.id === id);
    if (!quote) return;
    try {
      const res = await fetch(`/api/quotations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quote, status, notes: notes !== undefined ? notes : quote.notes }),
      });
      if (res.ok) {
        showToast('Quote status updated.', 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating quote status.', 'error');
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...app, status }),
      });
      if (res.ok) {
        showToast('Applicant status updated.', 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating application.', 'error');
    }
  };

  const toggleDocumentDownload = async (doc: DocumentItem) => {
    try {
      const res = await fetch(`/api/documents/${doc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...doc, downloadAllowed: !doc.downloadAllowed }),
      });
      if (res.ok) {
        showToast(
          `Document download permission set to: ${!doc.downloadAllowed ? 'Allowed' : 'Restricted'}`,
          'success'
        );
        refreshData();
      }
    } catch {
      showToast('Error toggling document permission.', 'error');
    }
  };

  const toggleDocumentVisibility = async (doc: DocumentItem) => {
    try {
      const res = await fetch(`/api/documents/${doc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...doc, visible: !doc.visible }),
      });
      if (res.ok) {
        showToast(`Document visibility toggled.`, 'success');
        refreshData();
      }
    } catch {
      showToast('Error toggling document visibility.', 'error');
    }
  };

  const toggleProjectFeatured = async (proj: Project) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...proj, featured: !proj.featured }),
      });
      if (res.ok) {
        showToast(`Project featured status updated.`, 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating project.', 'error');
    }
  };

  const toggleProjectStatus = async (proj: Project) => {
    const nextStatus = proj.status === 'completed' ? 'ongoing' : 'completed';
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...proj, status: nextStatus }),
      });
      if (res.ok) {
        showToast(`Project status set to ${nextStatus}.`, 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating project status.', 'error');
    }
  };

  const deleteItem = async (endpoint: string, id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove: "${name}"?`)) return;
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Deleted successfully.`, 'info');
        refreshData();
      }
    } catch {
      showToast('Error deleting item.', 'error');
    }
  };

  // Quick Stats for Dashboard
  const completedProjectsCount = projects.filter((p) => p.status === 'completed').length;
  const ongoingProjectsCount = projects.filter((p) => p.status === 'ongoing').length;
  const pendingQuotes = quotations.filter((q) => q.status === 'new').length;
  const pendingApps = applications.filter((a) => a.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#060a0f] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#09101a] border-r border-slate-800 shrink-0 p-4 space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            A
          </div>
          <div>
            <h2 className="text-sm font-extrabold font-heading tracking-wider">APEX CMS</h2>
            <span className="text-[10px] font-mono text-amber-400">CORPORATE ADMIN</span>
          </div>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'theme' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Theme Control</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'hero' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Hero Slider</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'projects' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects & Case Studies</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'services' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Engineering Services</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'locations' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Branches & Locations</span>
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'leadership' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leadership & Team</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'clients' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Clients & Appreciation</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'documents' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Brochures & PDFs</span>
          </button>

          <button
            onClick={() => setActiveTab('careers')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'careers' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4" />
              <span>Careers & Applications</span>
            </div>
            {pendingApps > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-bold">
                {pendingApps}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('quotations')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'quotations' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Quotation RFQs</span>
            </div>
            {pendingQuotes > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                {pendingQuotes}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'inquiries' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>General Inquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'settings' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Corporate Settings</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={() => navigate('/')}
            className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <span>Exit to Public Portal</span>
          </button>
        </div>
      </aside>

      {/* Main CMS Work Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {/* TAB: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                EXECUTIVE COCKPIT
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading mt-1">
                Content Management & Commercial Operations
              </h1>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
                  {projects.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Total Projects in Portfolio</p>
                <p className="text-[11px] text-slate-500">
                  {completedProjectsCount} Completed • {ongoingProjectsCount} Ongoing
                </p>
              </div>

              <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-400">
                  {quotations.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Quotation RFQs</p>
                <p className="text-[11px] text-slate-500">{pendingQuotes} Pending Review</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
                  {vacancies.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Active Job Vacancies</p>
                <p className="text-[11px] text-slate-500">{applications.length} Candidate Dossiers</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-sky-400">
                  {documents.length}
                </span>
                <p className="text-xs font-semibold text-slate-300">Controlled PDFs & Brochures</p>
                <p className="text-[11px] text-slate-500">{locations.length} Operating Branches</p>
              </div>
            </div>

            {/* Recent Quotations Table */}
            <div className="rounded-xl border border-slate-800 bg-[#0c1420] overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading">Recent Tender Quotation Requests</h3>
                <button
                  onClick={() => setActiveTab('quotations')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  View All ({quotations.length}) →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#080d14] text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Reference</th>
                      <th className="p-3">Client / Company</th>
                      <th className="p-3">Discipline</th>
                      <th className="p-3">Budget</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {quotations.slice(0, 5).map((q) => (
                      <tr key={q.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono text-amber-400">{q.quoteId}</td>
                        <td className="p-3">
                          <p className="font-bold text-white">{q.company}</p>
                          <p className="text-[10px] text-slate-400">{q.firstName} {q.lastName}</p>
                        </td>
                        <td className="p-3">{q.serviceRequired}</td>
                        <td className="p-3 font-mono">{q.budgetRange}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              q.status === 'new'
                                ? 'bg-rose-500/20 text-rose-300'
                                : q.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
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

        {/* TAB: THEME CONTROL (Requirement 2 & 21) */}
        {activeTab === 'theme' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                THEME ARCHITECTURE
              </span>
              <h2 className="text-2xl font-bold font-heading mt-1">Dual Brand Appearance Controller</h2>
              <p className="text-xs text-slate-400 mt-1">
                The prompt requires two master themes: <strong>Theme 1 (Premium Engineering)</strong> with dark luxury tones, deep navy accents, and gold/champagne precision, and <strong>Theme 2 (Modern Construction)</strong> with bright daylight high-contrast, slate, and safety orange.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theme 1 Card */}
              <div
                onClick={() => {
                  setTheme('premium-engineering');
                  updateSettings({ ...settings, primaryTheme: 'premium-engineering' });
                }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  theme === 'premium-engineering'
                    ? 'border-amber-500 bg-[#0f1a28] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                    : 'border-slate-800 bg-[#0c1420] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Theme 1 (Default)
                  </span>
                  {theme === 'premium-engineering' && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500 text-slate-950 font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-heading">Premium Engineering / High-End Corporate</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Deep charcoal & dark navy canvas (#0a0f18), crisp stark white typography, precision engineering grids, and champagne/gold accentuation.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0a0f18] border border-slate-700"></span>
                  <span className="w-5 h-5 rounded-full bg-[#182638] border border-slate-700"></span>
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]"></span>
                  <span className="w-5 h-5 rounded-full bg-white"></span>
                </div>
              </div>

              {/* Theme 2 Card */}
              <div
                onClick={() => {
                  setTheme('modern-construction');
                  updateSettings({ ...settings, primaryTheme: 'modern-construction' });
                }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  theme === 'modern-construction'
                    ? 'border-orange-500 bg-[#0f1a28] shadow-[0_0_25px_rgba(234,88,12,0.2)]'
                    : 'border-slate-800 bg-[#0c1420] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Theme 2
                  </span>
                  {theme === 'modern-construction' && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500 text-white font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-heading">Modern Construction / Contemporary Industrial</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Stark high-visibility architectural daylight mode, slate-900 typography, heavy equipment steel tones, and safety industrial orange accents.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-400"></span>
                  <span className="w-5 h-5 rounded-full bg-slate-200 border border-slate-400"></span>
                  <span className="w-5 h-5 rounded-full bg-orange-600"></span>
                  <span className="w-5 h-5 rounded-full bg-slate-900"></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: HERO SLIDER MANAGEMENT (Requirement 4 & 21) */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  HERO CAROUSEL ENGINE
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Homepage Slides Manager</h2>
              </div>
              <button
                onClick={async () => {
                  const newSlide: HeroSlide = {
                    id: `slide_${Date.now()}`,
                    title: { en: 'New Infrastructure Milestone', ar: 'إنجاز بنية تحتية جديد', hi: 'नया बुनियादी ढांचा' },
                    subtitle: { en: 'Precision Geotechnical Engineering', ar: 'هندسة جيوتقنية دقيقة', hi: 'सटीक भू-तकनीकी इंजीनियरिंग' },
                    description: { en: 'Executing mega civil contracts with speed and safety.', ar: 'تنفيذ العقود المدنية الكبرى', hi: 'मेगा सिविल अनुबंधों का निष्पादन' },
                    badge: { en: 'Featured Landmark', ar: 'معلم رئيسي', hi: 'प्रमुख मील का पत्थर' },
                    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1920&q=80',
                    primaryCtaText: { en: 'Explore Project', ar: 'استكشف المشروع', hi: 'परियोजना देखें' },
                    primaryCtaLink: '/projects',
                    order: heroSlides.length + 1,
                    visible: true,
                  };
                  await fetch('/api/hero-slides', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSlide),
                  });
                  showToast('New slide created.', 'success');
                  refreshData();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400"
              >
                <Plus className="w-4 h-4" />
                <span>Add Hero Slide</span>
              </button>
            </div>

            <div className="space-y-4">
              {heroSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] flex flex-col md:flex-row items-center gap-5"
                >
                  <div className="w-full md:w-48 h-28 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img src={slide.imageUrl} alt={slide.title.en} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                        Order #{slide.order}
                      </span>
                      <span
                        className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                          slide.visible ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {slide.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-heading">{slide.title?.en || 'Slide Title'}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{slide.description?.en || ''}</p>
                    <p className="text-[11px] text-amber-400 font-mono">
                      CTA: {slide.primaryCtaText?.en || 'Explore'} → {slide.primaryCtaLink || '/projects'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
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
                      className="p-2 rounded border border-slate-700 hover:bg-slate-800 text-slate-300"
                      title="Toggle Visibility"
                    >
                      {slide.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
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

        {/* TAB: PROJECTS MANAGEMENT (Requirement 9, 10, 11) */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  PORTFOLIO ARCHIVE
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Projects & Case Studies Manager</h2>
              </div>
              <button
                onClick={async () => {
                  const newProj: Project = {
                    id: `proj_${Date.now()}`,
                    name: { en: 'New Infrastructure Package', ar: 'حزمة بنية تحتية جديدة', hi: 'नया इंफ्रास्ट्रक्चर पैकेज' },
                    slug: `new-project-${Date.now()}`,
                    category: 'infrastructure',
                    status: 'ongoing',
                    featured: true,
                    client: 'National Transport Authority',
                    location: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية', hi: 'रियाद, सऊदी अरब' },
                    startDate: '2025',
                    completionDate: '2027',
                    projectValue: '$85,000,000 USD',
                    description: { en: 'Heavy civil execution of viaduct piers and precast bridges.', ar: 'تنفيذ الأعمال المدنية', hi: 'पुलों का निर्माण' },
                    detailedDescription: { en: 'Comprehensive turnkey engineering package.', ar: 'حزمة هندسية شاملة', hi: 'व्यापक इंजीनियरिंग पैकेज' },
                    scopeOfWork: [{ en: 'Piling works', ar: 'أعمال الخوازيق', hi: 'पिलिंग कार्य' }],
                    highlights: [{ en: 'Advanced deep foundation piles', ar: 'خوازيق الأساسات العميقة المتقدمة', hi: 'उन्नत गहरी नींव के ढेर' }],
                    mainImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
                    gallery: [],
                    order: projects.length + 1,
                    visible: true,
                  };
                  await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProj),
                  });
                  showToast('New project created.', 'success');
                  refreshData();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c1420]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d14] text-slate-400 font-mono text-[11px]">
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
                <tbody className="divide-y divide-slate-800">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/5">
                      <td className="p-3">
                        <img src={proj.mainImage} alt="" className="w-14 h-10 object-cover rounded bg-black" />
                      </td>
                      <td className="p-3 font-bold text-white max-w-xs">{proj.name.en}</td>
                      <td className="p-3 uppercase text-[11px] font-mono text-slate-400">{proj.category}</td>
                      <td className="p-3 text-slate-300">{proj.client}</td>
                      <td className="p-3 font-mono text-amber-400">{proj.projectValue}</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleProjectStatus(proj)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-transform active:scale-95 ${
                            proj.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {proj.status}
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleProjectFeatured(proj)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            proj.featured ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {proj.featured ? 'Featured' : 'Standard'}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
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

        {/* TAB: BROCHURES & PDF MANAGEMENT (Requirement 16 & 17) */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  DOCUMENT REPOSITORY
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Controlled PDF Management</h2>
                <p className="text-xs text-slate-400">
                  Control titles, categories, ordering, visibility, and <strong>toggle public download permissions</strong>.
                </p>
              </div>
              <button
                onClick={async () => {
                  const newDoc: DocumentItem = {
                    id: `doc_${Date.now()}`,
                    title: { en: 'New Technical Publication', ar: 'منشور فني جديد', hi: 'नया तकनीकी प्रकाशन' },
                    description: { en: 'Corporate specification dossier.', ar: 'ملف المواصفات المؤسسية', hi: 'कॉर्पोरेट विनिर्देश' },
                    category: 'corporate',
                    documentUrl: '/documents/spec.pdf',
                    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
                    fileSize: '4.2 MB',
                    pagesCount: 18,
                    uploadDate: '2026-03-15',
                    downloadAllowed: false,
                    order: documents.length + 1,
                    visible: true,
                  };
                  await fetch('/api/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDoc),
                  });
                  showToast('Document record added.', 'success');
                  refreshData();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400"
              >
                <Plus className="w-4 h-4" />
                <span>Register Document</span>
              </button>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold">
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

                  <div className="flex items-center gap-3">
                    {/* Toggle Download Permission */}
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
                      <span>{doc.downloadAllowed ? 'Downloads Allowed' : 'View-Only (Restricted)'}</span>
                    </button>

                    <button
                      onClick={() => toggleDocumentVisibility(doc)}
                      className="p-2 rounded border border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      {doc.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
                    </button>

                    <button
                      onClick={() => deleteItem('documents', doc.id, doc.title.en)}
                      className="p-2 rounded border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: QUOTATIONS RFQ MANAGEMENT (Requirement 19 & 21) */}
        {activeTab === 'quotations' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                COMMERCIAL INTAKE
              </span>
              <h2 className="text-2xl font-bold font-heading mt-1">Quotation & Tender RFQs</h2>
            </div>

            <div className="space-y-4">
              {quotations.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-xl border border-slate-800 bg-[#0c1420] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <div>
                      <span className="font-mono text-xs text-amber-400 font-bold">{q.quoteId}</span>
                      <h3 className="text-lg font-bold font-heading text-white">{q.company}</h3>
                      <p className="text-xs text-slate-400">
                        Contact: {q.firstName} {q.lastName} ({q.email} | {q.phone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Status:</span>
                      <select
                        value={q.status}
                        onChange={(e) => updateQuotationsStatus(q.id, e.target.value)}
                        className="px-2.5 py-1 rounded bg-[#080d14] border border-slate-700 text-xs font-semibold text-amber-400 outline-none"
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">Service Required</span>
                      <span className="font-semibold text-slate-200">{q.serviceRequired}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">Budget Range</span>
                      <span className="font-semibold text-amber-400 font-mono">{q.budgetRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">Location</span>
                      <span className="font-semibold text-slate-200">{q.location}, {q.country}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-black/30 border border-slate-800/80 text-xs text-slate-300">
                    <p className="font-bold text-[11px] text-slate-400 mb-1">Project Scope Brief:</p>
                    <p>{q.projectDescription}</p>
                  </div>

                  {/* Internal Admin Notes */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="Add internal estimating notes..."
                      defaultValue={q.notes || ''}
                      onBlur={(e) => updateQuotationsStatus(q.id, q.status, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded border border-slate-700 bg-black/20 text-xs text-slate-200 outline-none"
                    />
                    <span className="text-[11px] text-slate-500 font-mono">{q.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CAREERS & CANDIDATE DOSSIERS (Requirement 14, 15, 21) */}
        {activeTab === 'careers' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  HUMAN CAPITAL
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Vacancies & Job Applicants</h2>
              </div>
              <button
                onClick={async () => {
                  const newJob: CareerVacancy = {
                    id: `job_${Date.now()}`,
                    slug: `senior-geotechnical-engineer-${Date.now()}`,
                    title: { en: 'Senior Geotechnical Engineer', ar: 'مهندس جيوتقني أول', hi: 'वरिष्ठ भू-तकनीकी इंजीनियर' },
                    department: { en: 'Engineering & Groundworks', ar: 'الهندسة والأساسات', hi: 'इंजीनियरिंग और नींव' },
                    location: { en: 'Jubail Industrial City', ar: 'مدينة الجبيل الصناعية', hi: 'जुबैल औद्योगिक शहर' },
                    employmentType: 'Full-time',
                    experience: '8+ Years in Piling & Vibro-compaction',
                    qualification: { en: 'B.Sc. / M.Sc. Civil / Geotechnical', ar: 'بكالوريوس في الهندسة', hi: 'बी.एससी. / एम.एससी.' },
                    skills: ['Piling', 'Deep Foundations', 'Bauer Rigs'],
                    description: { en: 'Lead heavy foundation testing and diaphragm wall construction.', ar: 'قيادة اختبارات الأساسات', hi: 'भारी नींव निर्माण' },
                    responsibilities: [{ en: 'Oversight of Bauer rotary piling operations', ar: 'الإشراف على الحفر', hi: 'पिलिंग संचालन की निगरानी' }],
                    requirements: [{ en: 'Saudi Council of Engineers (SCE) accredited', ar: 'معتمد من الهيئة', hi: 'प्रमाणित' }],
                    applicationDeadline: '2026-06-30',
                    status: 'open',
                    order: vacancies.length + 1,
                  };
                  await fetch('/api/vacancies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newJob),
                  });
                  showToast('New vacancy created.', 'success');
                  refreshData();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vacancy</span>
              </button>
            </div>

            {/* Applicant Dossiers Table */}
            <div className="rounded-xl border border-slate-800 bg-[#0c1420] overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-sm font-bold font-heading">Candidate Applications ({applications.length})</h3>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d14] text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Applicant Name</th>
                    <th className="p-3">Target Vacancy</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Qualification</th>
                    <th className="p-3">CV File</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5">
                      <td className="p-3">
                        <p className="font-bold text-white">{app.firstName} {app.lastName}</p>
                        <p className="text-[10px] text-slate-400">{app.email} • {app.phone}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-300">{app.vacancyTitle}</td>
                      <td className="p-3 font-mono">{app.experienceYears} Years</td>
                      <td className="p-3 text-slate-400">{app.qualification}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                          <FileText className="w-3 h-3" />
                          {app.resumeFileName || 'Resume.pdf'}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                          className="px-2 py-0.5 rounded bg-[#080d14] border border-slate-700 text-xs text-amber-400 font-semibold outline-none"
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

        {/* TAB: CORPORATE SETTINGS (Requirement 21) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                SYSTEM CONFIGURATION
              </span>
              <h2 className="text-2xl font-bold font-heading mt-1">Corporate Metadata & Channels</h2>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1420] space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Company Legal Name</label>
                <input
                  type="text"
                  defaultValue={settings?.companyName || ''}
                  onBlur={(e) => updateSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Corporate Hotline</label>
                <input
                  type="text"
                  defaultValue={settings?.phonePrimary || ''}
                  onBlur={(e) => updateSettings({ ...settings, phonePrimary: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Official Inquiry Email</label>
                <input
                  type="email"
                  defaultValue={settings?.emailContact || ''}
                  onBlur={(e) => updateSettings({ ...settings, emailContact: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  defaultValue={settings?.socials?.linkedin || ''}
                  onBlur={(e) =>
                    updateSettings({
                      ...settings,
                      socials: { ...settings?.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: GENERAL INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                GENERAL COMMUNICATIONS
              </span>
              <h2 className="text-2xl font-bold font-heading mt-1">Contact Messages & Inquiries</h2>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                      <p className="text-xs text-slate-400">{inq.email} • {inq.phone}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{inq.createdAt}</span>
                  </div>
                  <p className="text-xs font-semibold text-amber-400">Subject: {inq.subject}</p>
                  <p className="text-xs text-slate-300 bg-black/20 p-3 rounded border border-slate-800">
                    {inq.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
