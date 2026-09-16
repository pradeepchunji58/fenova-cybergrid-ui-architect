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
  ExternalLink,
  Shield,
  Globe,
  Phone,
  Check,
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
import {
  HeroSlideModal,
  ProjectModal,
  ServiceModal,
  LocationModal,
  DocumentModal,
  VacancyModal,
} from '../components/AdminCrudModals.tsx';

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

  // -------------------------------------------------------------
  // CRUD Save Handlers
  // -------------------------------------------------------------
  const handleSaveHeroSlide = async (slide: HeroSlide) => {
    const exists = heroSlides.some((s) => s.id === slide.id);
    const method = exists ? 'PUT' : 'POST';
    const url = exists ? `/api/hero-slides/${slide.id}` : '/api/hero-slides';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide),
      });
      if (res.ok) {
        showToast(`Hero slide ${exists ? 'updated' : 'created'}.`, 'success');
        refreshData();
      } else {
        showToast('Failed to save hero slide.', 'error');
      }
    } catch {
      showToast('Error saving hero slide.', 'error');
    }
  };

  const handleSaveProject = async (proj: Project) => {
    const exists = projects.some((p) => p.id === proj.id);
    const method = exists ? 'PUT' : 'POST';
    const url = exists ? `/api/projects/${proj.id}` : '/api/projects';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj),
      });
      if (res.ok) {
        showToast(`Project ${exists ? 'updated' : 'created'}.`, 'success');
        refreshData();
      } else {
        showToast('Failed to save project.', 'error');
      }
    } catch {
      showToast('Error saving project.', 'error');
    }
  };

  const handleSaveService = async (svc: ServiceItem) => {
    const exists = services.some((s) => s.id === svc.id);
    const method = exists ? 'PUT' : 'POST';
    const url = exists ? `/api/services/${svc.id}` : '/api/services';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(svc),
      });
      if (res.ok) {
        showToast(`Service ${exists ? 'updated' : 'created'}.`, 'success');
        refreshData();
      } else {
        showToast('Failed to save service.', 'error');
      }
    } catch {
      showToast('Error saving service.', 'error');
    }
  };

  const handleSaveLocation = async (loc: LocationItem) => {
    const exists = locations.some((l) => l.id === loc.id);
    const method = exists ? 'PUT' : 'POST';
    const url = exists ? `/api/locations/${loc.id}` : '/api/locations';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loc),
      });
      if (res.ok) {
        showToast(`Location ${exists ? 'updated' : 'created'}.`, 'success');
        refreshData();
      } else {
        showToast('Failed to save location.', 'error');
      }
    } catch {
      showToast('Error saving location.', 'error');
    }
  };

  const handleSaveDocument = async (doc: DocumentItem) => {
    const exists = documents.some((d) => d.id === doc.id);
    const method = exists ? 'PUT' : 'POST';
    const url = exists ? `/api/documents/${doc.id}` : '/api/documents';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });
      if (res.ok) {
        showToast(`Document ${exists ? 'updated' : 'created'}.`, 'success');
        refreshData();
      } else {
        showToast('Failed to save document.', 'error');
      }
    } catch {
      showToast('Error saving document.', 'error');
    }
  };

  const handleSaveVacancy = async (vac: CareerVacancy) => {
    const exists = vacancies.some((v) => v.id === vac.id);
    const method = exists ? 'PUT' : 'POST';
    const url = exists ? `/api/vacancies/${vac.id}` : '/api/vacancies';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vac),
      });
      if (res.ok) {
        showToast(`Career vacancy ${exists ? 'updated' : 'created'}.`, 'success');
        refreshData();
      } else {
        showToast('Failed to save vacancy.', 'error');
      }
    } catch {
      showToast('Error saving vacancy.', 'error');
    }
  };

  const toggleServiceVisibility = async (svc: ServiceItem) => {
    try {
      const res = await fetch(`/api/services/${svc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...svc, visible: !svc.visible }),
      });
      if (res.ok) {
        showToast('Service visibility toggled.', 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating service visibility.', 'error');
    }
  };

  const toggleLocationStatus = async (loc: LocationItem) => {
    const nextStatus = loc.status === 'active' ? 'hidden' : 'active';
    try {
      const res = await fetch(`/api/locations/${loc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loc, status: nextStatus }),
      });
      if (res.ok) {
        showToast(`Location set to ${nextStatus}.`, 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating location status.', 'error');
    }
  };

  const toggleVacancyStatus = async (vac: CareerVacancy) => {
    const nextStatus = vac.status === 'open' ? 'closed' : 'open';
    try {
      const res = await fetch(`/api/vacancies/${vac.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...vac, status: nextStatus }),
      });
      if (res.ok) {
        showToast(`Vacancy marked as ${nextStatus}.`, 'success');
        refreshData();
      }
    } catch {
      showToast('Error updating vacancy status.', 'error');
    }
  };

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
            F
          </div>
          <div>
            <h2 className="text-sm font-extrabold font-heading tracking-wider text-white">FENOVA CMS</h2>
            <span className="text-[9px] font-mono text-amber-400 block tracking-wider">HIGHTECH CIVIL ENGINEERING</span>
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

        {/* TAB: HERO SLIDER MANAGEMENT */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  HERO CAROUSEL ENGINE
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Homepage Slides Manager</h2>
                <p className="text-xs text-slate-400">
                  Configure high-impact visual banners, multi-language titles, CTAs, and slide order.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedHeroSlide(null);
                  setIsHeroModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Hero Slide</span>
              </button>
            </div>

            <div className="space-y-4">
              {heroSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] flex flex-col md:flex-row items-center gap-5 hover:border-slate-700 transition-colors"
                >
                  <div className="w-full md:w-48 h-28 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img src={slide.imageUrl} alt={slide.title.en} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
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
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-500/20">
                          {slide.badge.en}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold font-heading text-white">{slide.title?.en || 'Slide Title'}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{slide.description?.en || ''}</p>
                    <p className="text-[11px] text-amber-400 font-mono">
                      CTA: {slide.primaryCtaText?.en || 'Explore'} → {slide.primaryCtaLink || '/projects'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedHeroSlide(slide);
                        setIsHeroModalOpen(true);
                      }}
                      className="p-2 rounded border border-slate-700 hover:bg-slate-800 text-amber-400"
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
                      className="p-2 rounded border border-slate-700 hover:bg-slate-800 text-slate-300"
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
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  PORTFOLIO ARCHIVE
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Projects & Case Studies Manager</h2>
                <p className="text-xs text-slate-400">
                  Manage engineering portfolio, contract values, status badges, and project scopes.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
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
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProject(proj);
                              setIsProjectModalOpen(true);
                            }}
                            className="p-1.5 rounded text-amber-400 hover:bg-amber-500/10"
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
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  CORE ENGINEERING DIVISIONS
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Services & Capabilities Manager</h2>
                <p className="text-xs text-slate-400">
                  Manage civil engineering services, deliverables, icons, order, and public visibility.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] flex flex-col md:flex-row items-center gap-5 hover:border-slate-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-amber-400 border border-amber-500/20">
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
                    {svc.deliverables && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {svc.deliverables.slice(0, 3).map((d, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                            {d.en}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedService(svc);
                        setIsServiceModalOpen(true);
                      }}
                      className="p-2 rounded border border-slate-700 hover:bg-slate-800 text-amber-400"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleServiceVisibility(svc)}
                      className="p-2 rounded border border-slate-700 text-slate-300 hover:bg-slate-800"
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
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  GLOBAL NETWORK
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Branch Locations & Operating Hubs</h2>
                <p className="text-xs text-slate-400">
                  Manage corporate headquarters, regional hubs, direct hotlines, and dispatch emails.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedLocation(null);
                  setIsLocationModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Branch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 text-amber-400 border border-amber-500/20">
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
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{loc.address?.en}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Phone className="w-3 h-3 text-amber-400" /> {loc.phone}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 truncate">
                        <Mail className="w-3 h-3 text-amber-400" /> {loc.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
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
                      className="p-1.5 rounded text-amber-400 hover:bg-amber-500/10"
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

        {/* TAB: BROCHURES & PDF MANAGEMENT */}
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
                onClick={() => {
                  setSelectedDocument(null);
                  setIsDocumentModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Register Document</span>
              </button>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold shrink-0">
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
                      className="p-2 rounded border border-slate-700 text-amber-400 hover:bg-slate-800"
                      title="Edit Document"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleDocumentVisibility(doc)}
                      className="p-2 rounded border border-slate-700 text-slate-300 hover:bg-slate-800"
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

        {/* TAB: CAREERS & CANDIDATE DOSSIERS */}
        {activeTab === 'careers' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  HUMAN CAPITAL
                </span>
                <h2 className="text-2xl font-bold font-heading mt-1">Vacancies & Job Applicants</h2>
                <p className="text-xs text-slate-400">
                  Manage engineering openings, job qualifications, and review incoming candidate dossiers.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedVacancy(null);
                  setIsVacancyModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vacancy</span>
              </button>
            </div>

            {/* Active Vacancies Table */}
            <div className="rounded-xl border border-slate-800 bg-[#0c1420] overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white">Open Vacancies ({vacancies.length})</h3>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d14] text-slate-400 font-mono text-[11px]">
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
                <tbody className="divide-y divide-slate-800">
                  {vacancies.map((vac) => (
                    <tr key={vac.id} className="hover:bg-white/5">
                      <td className="p-3 font-bold text-white">{vac.title.en}</td>
                      <td className="p-3 text-slate-300">{vac.department.en}</td>
                      <td className="p-3 text-slate-400">{vac.location.en}</td>
                      <td className="p-3 font-mono text-[11px] text-amber-400">{vac.employmentType}</td>
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
                            className="p-1.5 rounded text-amber-400 hover:bg-amber-500/10"
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
            <div className="rounded-xl border border-slate-800 bg-[#0c1420] overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-sm font-bold font-heading text-white">Candidate Applications ({applications.length})</h3>
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

        {/* TAB: CORPORATE SETTINGS & MULTI-MAIL ROUTING */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                SYSTEM CONFIGURATION
              </span>
              <h2 className="text-2xl font-bold font-heading mt-1">Corporate Metadata & Multi-Mail Ingestion</h2>
              <p className="text-xs text-slate-400">
                Configure global company contacts, brand metadata, and the intelligent category-based multi-mail routing rules.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1420] space-y-4">
              <h3 className="text-sm font-bold font-heading text-white mb-2">Corporate Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    defaultValue={settings?.companyName || ''}
                    onBlur={(e) => updateSettings({ ...settings, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Corporate Hotline</label>
                  <input
                    type="text"
                    defaultValue={settings?.phonePrimary || ''}
                    onBlur={(e) => updateSettings({ ...settings, phonePrimary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Official Master Email</label>
                  <input
                    type="email"
                    defaultValue={settings?.emailContact || ''}
                    onBlur={(e) => updateSettings({ ...settings, emailContact: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none focus:border-amber-500"
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
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-700 bg-black/20 text-xs text-slate-100 outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Multi-Mail Routing Matrix */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#0c1420] space-y-4">
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
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 hover:bg-amber-400"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Routing</span>
                </button>
              </div>

              <div className="space-y-3">
                {(settings?.inquiryRouting || []).map((route, idx) => (
                  <div key={route.id || idx} className="p-4 rounded-lg bg-black/30 border border-slate-800 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="font-bold text-xs text-amber-400">{route.category}</span>
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
                          className="w-full px-2.5 py-1 rounded bg-[#080d14] border border-slate-700 text-xs text-slate-200 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] uppercase font-mono text-slate-400">Parallel Delivery</label>
                          <label className="text-[10px] text-amber-400 flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={route.parallelDeliveryEnabled}
                              onChange={(e) => {
                                if (!settings?.inquiryRouting) return;
                                settings.inquiryRouting[idx].parallelDeliveryEnabled = e.target.checked;
                              }}
                              className="rounded border-slate-700 text-amber-500"
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
                          className="w-full px-2.5 py-1 rounded bg-[#080d14] border border-slate-700 text-xs text-slate-200 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
              <h2 className="text-2xl font-bold font-heading mt-1">Contact Messages & Multi-Mail Logs</h2>
              <p className="text-xs text-slate-400">
                Review submitted public inquiries along with their targeted primary and parallel mail distribution routing.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="p-8 rounded-xl border border-slate-800 bg-[#0c1420] text-center text-slate-400 text-xs">
                  No public inquiries received yet.
                </div>
              ) : (
                inquiries.map((inq: any) => (
                  <div key={inq.id} className="p-5 rounded-xl border border-slate-800 bg-[#0c1420] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{inq.name || `${inq.firstName || ''} ${inq.lastName || ''}`.trim()}</h4>
                          {inq.category && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {inq.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{inq.email} • {inq.phone} {inq.company ? `• ${inq.company}` : ''}</p>
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

                    {/* Routing status badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      <span className="text-slate-400">ROUTING:</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        Primary: {inq.routedPrimaryEmail || 'marketing@fenova.com'}
                      </span>
                      {inq.routedParallelEmail && (
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          Parallel: {inq.routedParallelEmail}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-amber-400">Subject: {inq.subject}</p>
                    <p className="text-xs text-slate-300 bg-black/20 p-3 rounded border border-slate-800 whitespace-pre-wrap">
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
    </div>
  );
};
