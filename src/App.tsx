/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { DocumentViewerModal } from './components/DocumentViewerModal.tsx';
import { QuotationModal } from './components/QuotationModal.tsx';
import { ApplyJobModal } from './components/ApplyJobModal.tsx';
import { TechCursor } from './components/TechCursor.tsx';
import { WhatsAppWidget } from './components/WhatsAppWidget.tsx';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { LocationsPage } from './pages/LocationsPage.tsx';
import { LeadershipPage } from './pages/LeadershipPage.tsx';
import { ServicesPage, ServiceDetailPage } from './pages/ServicesPage.tsx';
import { ProjectsPage, ProjectDetailPage } from './pages/ProjectsPage.tsx';
import { ClientsPage } from './pages/ClientsPage.tsx';
import { BrochuresPage } from './pages/BrochuresPage.tsx';
import { CareersPage } from './pages/CareersPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { QuotationPage } from './pages/QuotationPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';

const AppContent: React.FC = () => {
  const { currentRoute, currentPath, theme, toast } = useApp() as any;
  const activePath = currentRoute || currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  const renderRoute = () => {
    // Admin Route
    if (activePath === '/admin') {
      return <AdminPage />;
    }

    // Projects Detail Route: /projects/:slug
    if (activePath.startsWith('/projects/') && activePath !== '/projects/completed' && activePath !== '/projects/ongoing') {
      const slug = activePath.replace('/projects/', '');
      return <ProjectDetailPage slug={slug} />;
    }

    // Services Detail Route: /services/:slug
    if (activePath.startsWith('/services/')) {
      const slug = activePath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }

    // Main Routes Switch
    switch (activePath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/about/locations':
        return <LocationsPage />;
      case '/about/leadership':
        return <LeadershipPage />;
      case '/services':
        return <ServicesPage />;
      case '/projects':
        return <ProjectsPage initialFilter="all" />;
      case '/projects/completed':
        return <ProjectsPage initialFilter="completed" />;
      case '/projects/ongoing':
        return <ProjectsPage initialFilter="ongoing" />;
      case '/clients':
      case '/clients/appreciation':
        return <ClientsPage />;
      case '/brochures':
        return <BrochuresPage />;
      case '/careers':
        return <CareersPage />;
      case '/contact':
        return <ContactPage />;
      case '/quotation':
        return <QuotationPage />;
      default:
        return <HomePage />;
    }
  };

  const isAdmin = activePath === '/admin';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative bg-[#04070a] text-slate-100 theme-${theme}`}
    >
      {/* Hardware-accelerated X-Mark Tracker Custom Cursor */}
      <TechCursor />

      {/* Floating Dynamic WhatsApp Communication Widget */}
      {!isAdmin && <WhatsAppWidget />}

      {/* Global Background Cyber Gridlines */}
      <div className="fixed inset-0 bg-grid-cyber opacity-35 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-grid-fine opacity-20 pointer-events-none z-0" />

      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded text-xs font-mono flex items-center gap-2 border shadow-2xl backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-200 border-rose-600'
                : toast.type === 'info'
                ? 'bg-cyan-950/90 text-cyan-200 border-cyan-500'
                : 'bg-emerald-950/90 text-emerald-200 border-[#0df2c9]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0df2c9] animate-ping" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Header (hidden inside standalone Admin view) */}
      {!isAdmin && <Header />}

      {/* Main Routed Page Content with Buttery Smooth Fade/Slide Motion */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderRoute()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer (hidden inside standalone Admin view) */}
      {!isAdmin && <Footer />}

      {/* Controlled Document Viewer Modal */}
      <DocumentViewerModal />

      {/* Tender & Engineering Quotation Modal */}
      <QuotationModal />

      {/* Career Application Modal with CV Upload */}
      <ApplyJobModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
