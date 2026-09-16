import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  initialSiteSettings,
  initialHeroSlides,
  initialProjects,
  initialServices,
  initialLocations,
  initialClients,
  initialTestimonials,
  initialLeaders,
  initialCareers,
  initialBrochures,
  initialQuotations,
  initialContacts,
  initialApplications,
  initialMedia,
} from './server/defaultData.ts';
import { AdminUser, AdminRole } from './src/types.ts';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface AppDatabase {
  settings: typeof initialSiteSettings;
  heroSlides: typeof initialHeroSlides;
  projects: typeof initialProjects;
  services: typeof initialServices;
  locations: typeof initialLocations;
  clients: typeof initialClients;
  testimonials: typeof initialTestimonials;
  leaders: typeof initialLeaders;
  careers: typeof initialCareers;
  brochures: typeof initialBrochures;
  quotations: typeof initialQuotations;
  contacts: typeof initialContacts;
  applications: typeof initialApplications;
  media: typeof initialMedia;
}

function loadDatabase(): AppDatabase {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed reading database file, initializing defaults:', err);
  }

  const initialDb: AppDatabase = {
    settings: initialSiteSettings,
    heroSlides: initialHeroSlides,
    projects: initialProjects,
    services: initialServices,
    locations: initialLocations,
    clients: initialClients,
    testimonials: initialTestimonials,
    leaders: initialLeaders,
    careers: initialCareers,
    brochures: initialBrochures,
    quotations: initialQuotations,
    contacts: initialContacts,
    applications: initialApplications,
    media: initialMedia,
  };

  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(db: AppDatabase) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed saving database file:', err);
  }
}

let db = loadDatabase();

// Pre-configured Admin accounts
const ADMIN_ACCOUNTS: (AdminUser & { passwordHash: string })[] = [
  {
    id: 'user-super-1',
    name: 'Eng. Tariq Al-Mansoor',
    email: 'admin@apexcivil.com',
    role: 'super_admin',
    passwordHash: 'ApexEngineering2026!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'user-content-1',
    name: 'Faris Al-Ghamdi',
    email: 'content@apexcivil.com',
    role: 'content_manager',
    passwordHash: 'ContentApex2026!',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'user-hr-1',
    name: 'Sara Al-Otaibi',
    email: 'hr@apexcivil.com',
    role: 'hr_manager',
    passwordHash: 'HRApex2026!',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
];

async function startServer() {
  const app = express();

  // Support JSON payloads including base64 file data
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // --- API ROUTES ---

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get all public website CMS data
  app.get('/api/content', (req, res) => {
    res.json({
      settings: db.settings,
      heroSlides: db.heroSlides.sort((a, b) => a.order - b.order),
      projects: db.projects.sort((a, b) => a.order - b.order),
      services: db.services.sort((a, b) => a.order - b.order),
      locations: db.locations.sort((a, b) => a.order - b.order),
      clients: db.clients.sort((a, b) => a.order - b.order),
      testimonials: db.testimonials.sort((a, b) => a.order - b.order),
      leaders: db.leaders.sort((a, b) => a.order - b.order),
      careers: db.careers.sort((a, b) => a.order - b.order),
      brochures: db.brochures.sort((a, b) => a.order - b.order),
      media: db.media,
      quotations: db.quotations,
      applications: db.applications,
      contacts: db.contacts,
    });
  });

  // Get Admin stats
  app.get('/api/stats', (req, res) => {
    res.json({
      totalProjects: db.projects.length,
      activeProjects: db.projects.filter((p) => p.status === 'ongoing').length,
      completedProjects: db.projects.filter((p) => p.status === 'completed').length,
      clientsCount: db.clients.length,
      locationsCount: db.locations.length,
      openCareersCount: db.careers.filter((c) => c.status === 'open').length,
      quotationRequestsCount: db.quotations.length,
      newQuotesCount: db.quotations.filter((q) => q.status === 'new').length,
      contactInquiriesCount: db.contacts.length,
      applicationsCount: db.applications.length,
      brochuresCount: db.brochures.length,
      mediaItemsCount: db.media.length,
      recentQuotations: db.quotations.slice(-5).reverse(),
      recentApplications: db.applications.slice(-5).reverse(),
      recentContacts: db.contacts.slice(-5).reverse(),
    });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const account = ADMIN_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === (email || '').toLowerCase() && acc.passwordHash === password
    );

    if (!account) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return sanitized user object
    const { passwordHash, ...user } = account;
    res.json({
      user,
      token: `apex-token-${user.id}-${Date.now()}`,
      message: 'Authentication successful',
    });
  });

  // Auth: Current User Demo Info
  app.get('/api/auth/accounts', (req, res) => {
    res.json({
      accounts: ADMIN_ACCOUNTS.map((a) => ({
        email: a.email,
        role: a.role,
        name: a.name,
        passwordHint: a.passwordHash,
      })),
    });
  });

  // Settings
  app.put('/api/settings', (req, res) => {
    db.settings = { ...db.settings, ...req.body };
    saveDatabase(db);
    res.json({ success: true, settings: db.settings });
  });

  function resolveCollectionKey(name: string): keyof AppDatabase | null {
    const map: Record<string, keyof AppDatabase> = {
      'hero-slides': 'heroSlides',
      'heroslides': 'heroSlides',
      'heroslide': 'heroSlides',
      'projects': 'projects',
      'services': 'services',
      'locations': 'locations',
      'leaders': 'leaders',
      'leadership': 'leaders',
      'clients': 'clients',
      'testimonials': 'testimonials',
      'careers': 'careers',
      'vacancies': 'careers',
      'brochures': 'brochures',
      'documents': 'brochures',
      'quotations': 'quotations',
      'applications': 'applications',
      'contacts': 'contacts',
      'inquiries': 'contacts',
      'media': 'media',
    };
    const key = map[name.toLowerCase()] || map[name];
    if (key && key in db) return key;
    if (name in db) return name as keyof AppDatabase;
    return null;
  }

  // Generic Collection CRUD for Admin
  const handleGetCollection = (req: express.Request, res: express.Response, colParam?: string) => {
    const rawCol = colParam || (req.params as { collection?: string }).collection || '';
    const colKey = resolveCollectionKey(rawCol);
    if (!colKey || !(colKey in db)) {
      return res.status(404).json({ error: `Collection ${rawCol} not found` });
    }
    res.json(db[colKey]);
  };

  const handlePostCollection = (req: express.Request, res: express.Response, colParam?: string) => {
    const rawCol = colParam || (req.params as { collection?: string }).collection || '';
    const colKey = resolveCollectionKey(rawCol);
    if (!colKey || !(colKey in db) || !Array.isArray(db[colKey])) {
      return res.status(400).json({ error: `Invalid collection: ${rawCol}` });
    }

    const newItem = {
      id: `${colKey.slice(0, 4)}-${Date.now()}`,
      order: (db[colKey] as any[]).length + 1,
      ...req.body,
    };

    (db[colKey] as any[]).push(newItem);
    saveDatabase(db);
    res.json({ success: true, item: newItem });
  };

  const handlePutCollection = (req: express.Request, res: express.Response, colParam?: string) => {
    const rawCol = colParam || (req.params as { collection?: string }).collection || '';
    const colKey = resolveCollectionKey(rawCol);
    const { id } = req.params as { id: string };
    if (!colKey || !(colKey in db) || !Array.isArray(db[colKey])) {
      return res.status(400).json({ error: `Invalid collection: ${rawCol}` });
    }

    const arr = db[colKey] as any[];
    const idx = arr.findIndex((item) => item.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    arr[idx] = { ...arr[idx], ...req.body };
    saveDatabase(db);
    res.json({ success: true, item: arr[idx] });
  };

  const handleDeleteCollection = (req: express.Request, res: express.Response, colParam?: string) => {
    const rawCol = colParam || (req.params as { collection?: string }).collection || '';
    const colKey = resolveCollectionKey(rawCol);
    const { id } = req.params as { id: string };
    if (!colKey || !(colKey in db) || !Array.isArray(db[colKey])) {
      return res.status(400).json({ error: `Invalid collection: ${rawCol}` });
    }

    const arr = db[colKey] as any[];
    const idx = arr.findIndex((item) => item.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const removed = arr.splice(idx, 1)[0];
    saveDatabase(db);
    res.json({ success: true, removed });
  };

  app.get('/api/content/:collection', (req, res) => handleGetCollection(req, res));
  app.post('/api/content/:collection', (req, res) => handlePostCollection(req, res));
  app.put('/api/content/:collection/:id', (req, res) => handlePutCollection(req, res));
  app.patch('/api/content/:collection/:id', (req, res) => handlePutCollection(req, res));
  app.delete('/api/content/:collection/:id', (req, res) => handleDeleteCollection(req, res));

  // Direct collection routes for convenience (e.g. /api/projects, /api/documents, /api/vacancies)
  const directCollections = [
    'hero-slides',
    'projects',
    'services',
    'locations',
    'leaders',
    'leadership',
    'clients',
    'testimonials',
    'careers',
    'vacancies',
    'brochures',
    'documents',
    'quotations',
    'applications',
    'contacts',
    'inquiries',
    'media',
  ];

  directCollections.forEach((col) => {
    app.get(`/api/${col}`, (req, res) => {
      handleGetCollection(req, res, col);
    });
    app.post(`/api/${col}`, (req, res) => {
      handlePostCollection(req, res, col);
    });
    app.put(`/api/${col}/:id`, (req, res) => {
      handlePutCollection(req, res, col);
    });
    app.patch(`/api/${col}/:id`, (req, res) => {
      handlePutCollection(req, res, col);
    });
    app.delete(`/api/${col}/:id`, (req, res) => {
      handleDeleteCollection(req, res, col);
    });
  });

  // Reorder Collection Items
  app.post('/api/content/:collection/reorder', (req, res) => {
    const col = req.params.collection as keyof AppDatabase;
    const { items } = req.body; // array of items or IDs with new order
    if (!(col in db) || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid reorder payload' });
    }

    (db[col] as any) = items;
    saveDatabase(db);
    res.json({ success: true, message: 'Ordering updated' });
  });

  // Public: Submit Quotation Request
  app.post('/api/quotations', (req, res) => {
    const quote = {
      id: `quote-${Date.now()}`,
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    db.quotations.unshift(quote as any);
    saveDatabase(db);
    res.json({ success: true, quoteId: quote.id, message: 'Quotation request submitted successfully' });
  });

  // Admin: Update Quotation
  app.patch('/api/quotations/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.quotations.findIndex((q) => q.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    db.quotations[idx] = { ...db.quotations[idx], ...req.body };
    saveDatabase(db);
    res.json({ success: true, quotation: db.quotations[idx] });
  });

  // Public: Submit Contact Inquiry
  app.post('/api/contacts', (req, res) => {
    const contact = {
      id: `contact-${Date.now()}`,
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    db.contacts.unshift(contact as any);
    saveDatabase(db);
    res.json({ success: true, contactId: contact.id, message: 'Inquiry transmitted to technical coordination team' });
  });

  // Admin: Update Contact
  app.patch('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.contacts.findIndex((c) => c.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Contact inquiry not found' });
    }
    db.contacts[idx] = { ...db.contacts[idx], ...req.body };
    saveDatabase(db);
    res.json({ success: true, contact: db.contacts[idx] });
  });

  // Public: Submit Career Application
  app.post('/api/applications', (req, res) => {
    const application = {
      id: `app-${Date.now()}`,
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    db.applications.unshift(application as any);
    saveDatabase(db);
    res.json({ success: true, applicationId: application.id, message: 'Application submitted successfully to Apex HR' });
  });

  // Admin: Update Application
  app.patch('/api/applications/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.applications.findIndex((a) => a.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }
    db.applications[idx] = { ...db.applications[idx], ...req.body };
    saveDatabase(db);
    res.json({ success: true, application: db.applications[idx] });
  });

  // Admin: Media Upload / Add
  app.post('/api/media', (req, res) => {
    const { filename, url, title, altText, category, caption, fileSize } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Media URL or Data required' });
    }

    const newMedia = {
      id: `med-${Date.now()}`,
      filename: filename || `asset-${Date.now()}.webp`,
      url,
      title: title || 'Media Resource',
      altText: altText || 'Civil engineering media asset',
      category: category || 'general',
      visibility: true,
      uploadDate: new Date().toISOString().split('T')[0],
      caption: caption || '',
      fileSize: fileSize || '350 KB',
    };

    db.media.unshift(newMedia);
    saveDatabase(db);
    res.json({ success: true, media: newMedia });
  });

  // Admin: Reset to initial demo database (helpful for testing)
  app.post('/api/admin/reset-data', (req, res) => {
    db = {
      settings: initialSiteSettings,
      heroSlides: initialHeroSlides,
      projects: initialProjects,
      services: initialServices,
      locations: initialLocations,
      clients: initialClients,
      testimonials: initialTestimonials,
      leaders: initialLeaders,
      careers: initialCareers,
      brochures: initialBrochures,
      quotations: initialQuotations,
      contacts: initialContacts,
      applications: initialApplications,
      media: initialMedia,
    };
    saveDatabase(db);
    res.json({ success: true, message: 'Database reset to default seed state' });
  });

  // --- VITE MIDDLEWARE / PRODUCTION STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Apex Civil Engineering Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
