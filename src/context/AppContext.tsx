import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  VisualTheme,
  MultilingualText,
  SiteSettings,
  HeroSlide,
  Project,
  Service,
  BranchLocation,
  Client,
  Testimonial,
  Leader,
  CareerVacancy,
  BrochureDocument,
  MediaItem,
  AdminUser,
  QuotationRequest,
  ContactInquiry,
  CareerApplication,
} from '../types.ts';
import { translations, UiTranslations } from '../utils/translations.ts';
import {
  fallbackSiteSettings,
  fallbackHeroSlides,
  fallbackProjects,
  fallbackServices,
  fallbackLocations,
  fallbackClients,
  fallbackTestimonials,
  fallbackLeaders,
  fallbackCareers,
  fallbackDocuments,
  fallbackQuotations,
  fallbackContacts,
  fallbackApplications,
  fallbackMedia,
} from '../data/fallbackData.ts';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: VisualTheme;
  setTheme: (theme: VisualTheme) => void;
  currentRoute: string;
  currentPath: string;
  navigate: (path: string) => void;
  ui: UiTranslations;
  t: (textObj: MultilingualText | undefined | null) => string;

  // Live CMS Data
  settings: SiteSettings | null;
  heroSlides: HeroSlide[];
  projects: Project[];
  services: Service[];
  locations: BranchLocation[];
  clients: Client[];
  testimonials: Testimonial[];
  leaders: Leader[];
  careers: CareerVacancy[];
  vacancies: CareerVacancy[];
  jobs: CareerVacancy[];
  brochures: BrochureDocument[];
  documents: BrochureDocument[];
  media: MediaItem[];
  quotations: QuotationRequest[];
  applications: CareerApplication[];
  inquiries: ContactInquiry[];
  contacts: ContactInquiry[];
  loading: boolean;
  refreshData: () => Promise<void>;

  // Direct CMS State Mutations (with localStorage & Server sync)
  saveHeroSlide: (slide: HeroSlide) => Promise<boolean>;
  deleteHeroSlide: (id: string) => Promise<boolean>;
  saveProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveService: (service: Service) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  saveLocation: (location: BranchLocation) => Promise<boolean>;
  deleteLocation: (id: string) => Promise<boolean>;
  saveLeader: (leader: Leader) => Promise<boolean>;
  deleteLeader: (id: string) => Promise<boolean>;
  saveClient: (client: Client) => Promise<boolean>;
  deleteClient: (id: string) => Promise<boolean>;
  saveDocument: (doc: BrochureDocument) => Promise<boolean>;
  deleteDocument: (id: string) => Promise<boolean>;
  saveVacancy: (vac: CareerVacancy) => Promise<boolean>;
  deleteVacancy: (id: string) => Promise<boolean>;
  saveSettings: (newSettings: SiteSettings) => Promise<boolean>;
  submitQuotation: (quote: QuotationRequest) => Promise<boolean>;
  submitInquiry: (inquiry: ContactInquiry) => Promise<boolean>;
  submitApplication: (app: CareerApplication) => Promise<boolean>;
  bakeDefaultsToCodebase: () => Promise<boolean>;
  importFullDatabase: (jsonData: any) => Promise<boolean>;

  // Modals & Active Selections
  quoteModalOpen: boolean;
  openQuoteModal: (serviceId?: string) => void;
  closeQuoteModal: () => void;
  selectedDocument: BrochureDocument | null;
  openDocumentModal: (doc: BrochureDocument) => void;
  closeDocumentModal: () => void;
  selectedVacancy: CareerVacancy | null;
  openApplyModal: (vacancy: CareerVacancy) => void;
  closeApplyModal: () => void;

  // Admin Auth & Actions
  adminUser: AdminUser | null;
  adminToken: string | null;
  loginAdmin: (user: AdminUser, token: string) => void;
  logoutAdmin: () => void;

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('fenova_language') || localStorage.getItem('apex_language') as Language) || 'en';
  });

  const [theme, setThemeState] = useState<VisualTheme>(() => {
    const saved = (localStorage.getItem('fenova_theme') || localStorage.getItem('apex_theme')) as VisualTheme;
    if (saved === 'tech-green' || saved === 'cyber-blue' || saved === 'crimson-red') {
      return saved;
    }
    return 'tech-green';
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Load initial CMS state from localStorage if present, else fallbackData
  const getInitialCmsData = () => {
    try {
      const stored = localStorage.getItem('fenova_cms_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  };

  const initialCms = getInitialCmsData();

  // CMS State
  const [settings, setSettings] = useState<SiteSettings | null>(initialCms?.settings || fallbackSiteSettings);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialCms?.heroSlides || fallbackHeroSlides);
  const [projects, setProjects] = useState<Project[]>(initialCms?.projects || fallbackProjects);
  const [services, setServices] = useState<Service[]>(initialCms?.services || fallbackServices);
  const [locations, setLocations] = useState<BranchLocation[]>(initialCms?.locations || fallbackLocations);
  const [clients, setClients] = useState<Client[]>(initialCms?.clients || fallbackClients);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialCms?.testimonials || fallbackTestimonials);
  const [leaders, setLeaders] = useState<Leader[]>(initialCms?.leaders || fallbackLeaders);
  const [careers, setCareers] = useState<CareerVacancy[]>(initialCms?.careers || fallbackCareers);
  const [brochures, setBrochures] = useState<BrochureDocument[]>(initialCms?.brochures || fallbackDocuments);
  const [media, setMedia] = useState<MediaItem[]>(initialCms?.media || fallbackMedia);
  const [quotations, setQuotations] = useState<QuotationRequest[]>(initialCms?.quotations || fallbackQuotations);
  const [applications, setApplications] = useState<CareerApplication[]>(initialCms?.applications || fallbackApplications);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialCms?.contacts || initialCms?.inquiries || fallbackContacts);
  const [loading, setLoading] = useState<boolean>(false);

  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefilledServiceId, setPrefilledServiceId] = useState<string | undefined>();
  const [selectedDocument, setSelectedDocument] = useState<BrochureDocument | null>(null);
  const [selectedVacancy, setSelectedVacancy] = useState<CareerVacancy | null>(null);

  // Admin Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('fenova_admin_user') || localStorage.getItem('apex_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('fenova_admin_token') || localStorage.getItem('apex_admin_token');
  });

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Helper to persist current state to localStorage
  const persistStateToLocalStorage = (partialUpdate: Record<string, unknown>) => {
    try {
      const current = getInitialCmsData() || {
        settings,
        heroSlides,
        projects,
        services,
        locations,
        clients,
        testimonials,
        leaders,
        careers,
        brochures,
        media,
        quotations,
        applications,
        contacts: inquiries,
      };
      const updated = { ...current, ...partialUpdate };
      localStorage.setItem('fenova_cms_data', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
  };

  // Browser Navigation / Popstate listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentRoute) {
      window.history.pushState({}, '', path);
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // RTL and Lang HTML attributes
  useEffect(() => {
    localStorage.setItem('fenova_language', language);
    localStorage.setItem('apex_language', language);
    const htmlEl = document.documentElement;
    htmlEl.lang = language;
    if (language === 'ar') {
      htmlEl.dir = 'rtl';
      document.body.classList.add('font-cairo');
      document.body.classList.remove('font-outfit');
    } else {
      htmlEl.dir = 'ltr';
      document.body.classList.remove('font-cairo');
      document.body.classList.add('font-outfit');
    }
  }, [language]);

  // Theme synchronization across all pages & documents
  useEffect(() => {
    localStorage.setItem('fenova_theme', theme);
    localStorage.setItem('apex_theme', theme);
    const root = document.documentElement;
    root.classList.remove(
      'theme-tech-green',
      'theme-cyber-blue',
      'theme-crimson-red',
      'theme-modern-construction',
      'theme-premium-engineering',
      'theme-admin-orange',
      'theme-green',
      'theme-blue',
      'theme-red'
    );
    root.classList.add(`theme-${theme}`);
    document.body.className = `theme-${theme} antialiased font-sans bg-[#04070a] text-slate-100`;
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (t: VisualTheme) => {
    let targetTheme: VisualTheme = t;
    if ((t as string) === 'green' || (t as string) === 'premium-engineering') targetTheme = 'tech-green';
    if ((t as string) === 'blue' || (t as string) === 'modern-construction') targetTheme = 'cyber-blue';
    if ((t as string) === 'red') targetTheme = 'crimson-red';
    setThemeState(targetTheme);
  };

  // Translate helper
  const t = (textObj: MultilingualText | undefined | null): string => {
    if (!textObj) return '';
    return textObj[language] || textObj.en || '';
  };

  const ui = translations[language];

  // Fetch live CMS data from backend API or static bundled content
  const refreshData = async () => {
    try {
      let data: any = null;

      // 1. First try active Express server API route
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          data = await res.json();
        }
      } catch (e) {
        // Express backend not present or failed (e.g. Netlify static mode)
      }

      // 2. If API was unavailable, try static /content.json
      if (!data) {
        try {
          const resStatic = await fetch('/content.json');
          if (resStatic.ok) {
            data = await resStatic.json();
          }
        } catch (e) {
          // Static content.json not available
        }
      }

      if (data) {
        if (data.settings) setSettings(data.settings);
        if (data.heroSlides?.length) setHeroSlides(data.heroSlides);
        if (data.projects?.length) setProjects(data.projects);
        if (data.services?.length) setServices(data.services);
        if (data.locations?.length) setLocations(data.locations);
        if (data.clients?.length) setClients(data.clients);
        if (data.testimonials?.length) setTestimonials(data.testimonials);
        if (data.leaders?.length) setLeaders(data.leaders);
        if (data.careers?.length) setCareers(data.careers);
        if (data.brochures?.length) setBrochures(data.brochures);
        if (data.media?.length) setMedia(data.media);
        if (data.quotations) setQuotations(data.quotations);
        if (data.applications) setApplications(data.applications);
        if (data.contacts || data.inquiries) setInquiries(data.contacts || data.inquiries);

        // Store to localStorage
        localStorage.setItem('fenova_cms_data', JSON.stringify(data));

        if (!localStorage.getItem('fenova_theme') && data.settings?.theme) {
          setThemeState(data.settings.theme);
        }
      }
    } catch (err) {
      console.warn('Operating in offline / static deployment mode:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Safe mutations that update state and localStorage synchronously, and send to backend
  const saveHeroSlide = async (slide: HeroSlide): Promise<boolean> => {
    const updated = heroSlides.some((s) => s.id === slide.id)
      ? heroSlides.map((s) => (s.id === slide.id ? slide : s))
      : [...heroSlides, slide];
    setHeroSlides(updated);
    persistStateToLocalStorage({ heroSlides: updated });
    try {
      await fetch('/api/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(slide),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Hero Slide updated successfully');
    return true;
  };

  const deleteHeroSlide = async (id: string): Promise<boolean> => {
    const updated = heroSlides.filter((s) => s.id !== id);
    setHeroSlides(updated);
    persistStateToLocalStorage({ heroSlides: updated });
    try {
      await fetch(`/api/hero-slides/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Hero Slide removed', 'info');
    return true;
  };

  const saveProject = async (project: Project): Promise<boolean> => {
    const updated = projects.some((p) => p.id === project.id)
      ? projects.map((p) => (p.id === project.id ? project : p))
      : [...projects, project];
    setProjects(updated);
    persistStateToLocalStorage({ projects: updated });
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(project),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Project updated successfully');
    return true;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    persistStateToLocalStorage({ projects: updated });
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Project removed', 'info');
    return true;
  };

  const saveService = async (service: Service): Promise<boolean> => {
    const updated = services.some((s) => s.id === service.id)
      ? services.map((s) => (s.id === service.id ? service : s))
      : [...services, service];
    setServices(updated);
    persistStateToLocalStorage({ services: updated });
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(service),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Service updated successfully');
    return true;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    persistStateToLocalStorage({ services: updated });
    try {
      await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Service removed', 'info');
    return true;
  };

  const saveLocation = async (loc: BranchLocation): Promise<boolean> => {
    const updated = locations.some((l) => l.id === loc.id)
      ? locations.map((l) => (l.id === loc.id ? loc : l))
      : [...locations, loc];
    setLocations(updated);
    persistStateToLocalStorage({ locations: updated });
    try {
      await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(loc),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Location updated successfully');
    return true;
  };

  const deleteLocation = async (id: string): Promise<boolean> => {
    const updated = locations.filter((l) => l.id !== id);
    setLocations(updated);
    persistStateToLocalStorage({ locations: updated });
    try {
      await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Location removed', 'info');
    return true;
  };

  const saveLeader = async (lead: Leader): Promise<boolean> => {
    const updated = leaders.some((l) => l.id === lead.id)
      ? leaders.map((l) => (l.id === lead.id ? lead : l))
      : [...leaders, lead];
    setLeaders(updated);
    persistStateToLocalStorage({ leaders: updated });
    try {
      await fetch('/api/leaders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(lead),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Leadership member updated successfully');
    return true;
  };

  const deleteLeader = async (id: string): Promise<boolean> => {
    const updated = leaders.filter((l) => l.id !== id);
    setLeaders(updated);
    persistStateToLocalStorage({ leaders: updated });
    try {
      await fetch(`/api/leaders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Leader removed', 'info');
    return true;
  };

  const saveClient = async (cli: Client): Promise<boolean> => {
    const updated = clients.some((c) => c.id === cli.id)
      ? clients.map((c) => (c.id === cli.id ? cli : c))
      : [...clients, cli];
    setClients(updated);
    persistStateToLocalStorage({ clients: updated });
    try {
      await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(cli),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Client partner updated successfully');
    return true;
  };

  const deleteClient = async (id: string): Promise<boolean> => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    persistStateToLocalStorage({ clients: updated });
    try {
      await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Client partner removed', 'info');
    return true;
  };

  const saveDocument = async (doc: BrochureDocument): Promise<boolean> => {
    const updated = brochures.some((b) => b.id === doc.id)
      ? brochures.map((b) => (b.id === doc.id ? doc : b))
      : [...brochures, doc];
    setBrochures(updated);
    persistStateToLocalStorage({ brochures: updated });
    try {
      await fetch('/api/brochures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(doc),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Document updated successfully');
    return true;
  };

  const deleteDocument = async (id: string): Promise<boolean> => {
    const updated = brochures.filter((b) => b.id !== id);
    setBrochures(updated);
    persistStateToLocalStorage({ brochures: updated });
    try {
      await fetch(`/api/brochures/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Document removed', 'info');
    return true;
  };

  const saveVacancy = async (vac: CareerVacancy): Promise<boolean> => {
    const updated = careers.some((c) => c.id === vac.id)
      ? careers.map((c) => (c.id === vac.id ? vac : c))
      : [...careers, vac];
    setCareers(updated);
    persistStateToLocalStorage({ careers: updated });
    try {
      await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(vac),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Career opening updated successfully');
    return true;
  };

  const deleteVacancy = async (id: string): Promise<boolean> => {
    const updated = careers.filter((c) => c.id !== id);
    setCareers(updated);
    persistStateToLocalStorage({ careers: updated });
    try {
      await fetch(`/api/careers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } catch {
      // offline / static fallback
    }
    showToast('Career opening removed', 'info');
    return true;
  };

  const saveSettings = async (newSettings: SiteSettings): Promise<boolean> => {
    setSettings(newSettings);
    if (newSettings.theme) {
      setThemeState(newSettings.theme);
    }
    persistStateToLocalStorage({ settings: newSettings });
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify(newSettings),
      });
    } catch {
      // offline / static fallback
    }
    showToast('Corporate Settings updated successfully');
    return true;
  };

  const submitQuotation = async (quote: QuotationRequest): Promise<boolean> => {
    const newQuotations = [quote, ...quotations];
    setQuotations(newQuotations);
    persistStateToLocalStorage({ quotations: newQuotations });
    try {
      await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote),
      });
    } catch {
      // offline fallback
    }
    showToast('Quotation request submitted successfully');
    return true;
  };

  const submitInquiry = async (inquiry: ContactInquiry): Promise<boolean> => {
    const newInquiries = [inquiry, ...inquiries];
    setInquiries(newInquiries);
    persistStateToLocalStorage({ contacts: newInquiries });
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      });
    } catch {
      // offline fallback
    }
    showToast('Inquiry submitted successfully');
    return true;
  };

  const submitApplication = async (app: CareerApplication): Promise<boolean> => {
    const newApplications = [app, ...applications];
    setApplications(newApplications);
    persistStateToLocalStorage({ applications: newApplications });
    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app),
      });
    } catch {
      // offline fallback
    }
    showToast('Application submitted successfully');
    return true;
  };

  const openQuoteModal = (serviceId?: string) => {
    setPrefilledServiceId(serviceId);
    setQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteModalOpen(false);
    setPrefilledServiceId(undefined);
  };

  const openDocumentModal = (doc: BrochureDocument) => {
    setSelectedDocument(doc);
  };

  const closeDocumentModal = () => {
    setSelectedDocument(null);
  };

  const openApplyModal = (vacancy: CareerVacancy) => {
    setSelectedVacancy(vacancy);
  };

  const closeApplyModal = () => {
    setSelectedVacancy(null);
  };

  const bakeDefaultsToCodebase = async (): Promise<boolean> => {
    try {
      const payload = {
        settings,
        heroSlides,
        projects,
        services,
        locations,
        clients,
        testimonials,
        leaders,
        careers,
        brochures,
        media,
        quotations,
        applications,
        contacts: inquiries,
      };

      // 1. Persist to localStorage immediately
      localStorage.setItem('fenova_cms_data', JSON.stringify(payload));

      // 2. Call server endpoint to update data/db.json, public/content.json, and server/defaultData.ts
      try {
        const res = await fetch('/api/admin/bake-defaults', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
          showToast('Data baked into source code & static Netlify bundle!', 'success');
          return true;
        }
      } catch {
        // static fallback
      }

      showToast('State synced to browser storage for static hosting!', 'success');
      return true;
    } catch (e) {
      showToast('Failed saving state snapshot', 'error');
      return false;
    }
  };

  const importFullDatabase = async (jsonData: any): Promise<boolean> => {
    try {
      if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Invalid JSON format');
      }

      if (jsonData.settings) {
        setSettings(jsonData.settings);
        if (jsonData.settings.theme) setThemeState(jsonData.settings.theme);
      }
      if (Array.isArray(jsonData.heroSlides)) setHeroSlides(jsonData.heroSlides);
      if (Array.isArray(jsonData.projects)) setProjects(jsonData.projects);
      if (Array.isArray(jsonData.services)) setServices(jsonData.services);
      if (Array.isArray(jsonData.locations)) setLocations(jsonData.locations);
      if (Array.isArray(jsonData.clients)) setClients(jsonData.clients);
      if (Array.isArray(jsonData.testimonials)) setTestimonials(jsonData.testimonials);
      if (Array.isArray(jsonData.leaders)) setLeaders(jsonData.leaders);
      if (Array.isArray(jsonData.careers)) setCareers(jsonData.careers);
      if (Array.isArray(jsonData.brochures)) setBrochures(jsonData.brochures);
      if (Array.isArray(jsonData.media)) setMedia(jsonData.media);
      if (Array.isArray(jsonData.quotations)) setQuotations(jsonData.quotations);
      if (Array.isArray(jsonData.applications)) setApplications(jsonData.applications);
      if (Array.isArray(jsonData.contacts || jsonData.inquiries)) setInquiries(jsonData.contacts || jsonData.inquiries);

      // Sync to localStorage
      localStorage.setItem('fenova_cms_data', JSON.stringify(jsonData));

      // Sync to backend
      try {
        await fetch('/api/admin/import-all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(jsonData),
        });
      } catch {
        // static fallback
      }

      showToast('Database imported and synchronized successfully!', 'success');
      return true;
    } catch (err: any) {
      showToast(err.message || 'Failed importing database', 'error');
      return false;
    }
  };

  const loginAdmin = (user: AdminUser, token: string) => {
    setAdminUser(user);
    setAdminToken(token);
    localStorage.setItem('fenova_admin_user', JSON.stringify(user));
    localStorage.setItem('fenova_admin_token', token);
    localStorage.setItem('apex_admin_user', JSON.stringify(user));
    localStorage.setItem('apex_admin_token', token);
    showToast(`Welcome back, ${user.name} (${user.role.replace('_', ' ')})`);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('fenova_admin_user');
    localStorage.removeItem('fenova_admin_token');
    localStorage.removeItem('apex_admin_user');
    localStorage.removeItem('apex_admin_token');
    showToast('Logged out of Admin CMS', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        currentRoute,
        currentPath: currentRoute,
        navigate,
        ui,
        t,
        settings,
        heroSlides,
        projects,
        services,
        locations: locations || [],
        clients: clients || [],
        testimonials: testimonials || [],
        leaders: leaders || [],
        careers: careers || [],
        vacancies: careers || [],
        jobs: careers || [],
        brochures: brochures || [],
        documents: brochures || [],
        media: media || [],
        quotations: quotations || [],
        applications: applications || [],
        inquiries: inquiries || [],
        contacts: inquiries || [],
        loading,
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
        submitQuotation,
        submitInquiry,
        submitApplication,
        bakeDefaultsToCodebase,
        importFullDatabase,
        quoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        selectedDocument,
        openDocumentModal,
        closeDocumentModal,
        selectedVacancy,
        openApplyModal,
        closeApplyModal,
        adminUser,
        adminToken,
        loginAdmin,
        logoutAdmin,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
