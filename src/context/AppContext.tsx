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
import { fallbackHeroSlides } from '../data/fallbackData.ts';

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
    return (localStorage.getItem('apex_language') as Language) || 'en';
  });

  const [theme, setThemeState] = useState<VisualTheme>(() => {
    const saved = localStorage.getItem('apex_theme') as VisualTheme;
    if (saved === 'tech-green' || saved === 'cyber-blue' || saved === 'crimson-red') {
      return saved;
    }
    return 'tech-green';
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // CMS State
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackHeroSlides);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [locations, setLocations] = useState<BranchLocation[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [careers, setCareers] = useState<CareerVacancy[]>([]);
  const [brochures, setBrochures] = useState<BrochureDocument[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [quotations, setQuotations] = useState<QuotationRequest[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefilledServiceId, setPrefilledServiceId] = useState<string | undefined>();
  const [selectedDocument, setSelectedDocument] = useState<BrochureDocument | null>(null);
  const [selectedVacancy, setSelectedVacancy] = useState<CareerVacancy | null>(null);

  // Admin Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('apex_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('apex_admin_token');
  });

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
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

  // Theme synchronization
  useEffect(() => {
    localStorage.setItem('apex_theme', theme);
    const root = document.documentElement;
    if (theme === 'modern-construction') {
      root.classList.add('theme-modern-construction');
      root.classList.remove('theme-premium-engineering');
      document.body.className = 'theme-modern-construction bg-slate-50 text-slate-900 antialiased';
    } else {
      root.classList.add('theme-premium-engineering');
      root.classList.remove('theme-modern-construction');
      document.body.className = 'theme-premium-engineering bg-neutral-950 text-neutral-100 antialiased';
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (t: VisualTheme) => {
    setThemeState(t);
  };

  // Translate helper
  const t = (textObj: MultilingualText | undefined | null): string => {
    if (!textObj) return '';
    return textObj[language] || textObj.en || '';
  };

  const ui = translations[language];

  // Fetch live CMS data from backend API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setHeroSlides(data.heroSlides || []);
        setProjects(data.projects || []);
        setServices(data.services || []);
        setLocations(data.locations || []);
        setClients(data.clients || []);
        setTestimonials(data.testimonials || []);
        setLeaders(data.leaders || []);
        setCareers(data.careers || []);
        setBrochures(data.brochures || []);
        setMedia(data.media || []);
        setQuotations(data.quotations || []);
        setApplications(data.applications || []);
        setInquiries(data.contacts || data.inquiries || []);

        // Sync initial server theme if none set locally
        if (!localStorage.getItem('apex_theme') && data.settings?.theme) {
          setThemeState(data.settings.theme);
        }
      }
    } catch (err) {
      console.error('Failed fetching content from /api/content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

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

  const loginAdmin = (user: AdminUser, token: string) => {
    setAdminUser(user);
    setAdminToken(token);
    localStorage.setItem('apex_admin_user', JSON.stringify(user));
    localStorage.setItem('apex_admin_token', token);
    showToast(`Welcome back, ${user.name} (${user.role.replace('_', ' ')})`);
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setAdminToken(null);
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
