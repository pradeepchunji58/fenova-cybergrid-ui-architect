import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import {
  HeroSlide,
  Project,
  Service,
  BranchLocation,
  DocumentItem,
  CareerVacancy,
} from '../types.ts';
import { AdminImageInput } from './AdminImageInput.tsx';

export { ClientModal, LeaderModal, ChangePasswordModal } from './AdminClientAndLeaderModals.tsx';

// -------------------------------------------------------------
// 1. HERO SLIDE MODAL
// -------------------------------------------------------------
interface HeroSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  slide: HeroSlide | null;
  onSave: (slide: HeroSlide) => Promise<void>;
}

export const HeroSlideModal: React.FC<HeroSlideModalProps> = ({
  isOpen,
  onClose,
  slide,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<HeroSlide>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (slide) {
      setFormData(slide);
    } else {
      setFormData({
        id: `slide-${Date.now()}`,
        badge: { en: 'MEGA-SCALE INFRASTRUCTURE', ar: '', hi: '' },
        title: { en: '', ar: '', hi: '' },
        subtitle: { en: '', ar: '', hi: '' },
        description: { en: '', ar: '', hi: '' },
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1920&q=80',
        videoUrl: '/hero_video.mp4',
        primaryCtaText: { en: 'Explore Mega Projects', ar: '', hi: '' },
        primaryCtaLink: '/projects',
        secondaryCtaText: { en: 'Request a Quotation', ar: '', hi: '' },
        secondaryCtaLink: '/quotation',
        order: 1,
        visible: true,
      });
    }
  }, [slide, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as HeroSlide);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-[#0b1320] border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--accent-color)' }}>
            {slide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Badge Tagline (English)</label>
            <input
              type="text"
              value={formData.badge?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  badge: { en: e.target.value, ar: formData.badge?.ar || '', hi: formData.badge?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              placeholder="e.g. HIGH-TECH INFRASTRUCTURE"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Headline Title (English) *</label>
            <input
              type="text"
              required
              value={formData.title?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { en: e.target.value, ar: formData.title?.ar || '', hi: formData.title?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Subtitle (English)</label>
            <input
              type="text"
              value={formData.subtitle?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subtitle: { en: e.target.value, ar: formData.subtitle?.ar || '', hi: formData.subtitle?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Description Paragraph (English)</label>
            <textarea
              rows={3}
              value={formData.description?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { en: e.target.value, ar: formData.description?.ar || '', hi: formData.description?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white resize-y"
            />
          </div>

          <AdminImageInput
            label="Hero Background Image *"
            value={formData.imageUrl || ''}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            aspectRatio="wide"
            placeholder="Image URL or upload local image file"
          />

          <div>
            <label className="block text-slate-400 mb-1">Video Background URL (Optional)</label>
            <input
              type="text"
              value={formData.videoUrl || ''}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              placeholder="/hero_video.mp4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Primary CTA Text</label>
              <input
                type="text"
                value={formData.primaryCtaText?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryCtaText: { en: e.target.value, ar: '', hi: '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Primary CTA Link</label>
              <input
                type="text"
                value={formData.primaryCtaLink || ''}
                onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.order || 1}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="slide-visible"
                checked={formData.visible !== false}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="slide-visible" className="text-slate-300">Slide is Visible</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Slide'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. PROJECT MODAL
// -------------------------------------------------------------
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (proj: Project) => Promise<void>;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        id: `proj-${Date.now()}`,
        slug: `project-${Date.now()}`,
        name: { en: '', ar: '', hi: '' },
        client: '',
        location: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية', hi: 'रियाद, सऊदी अरब' },
        category: 'infrastructure',
        status: 'ongoing',
        featured: true,
        startDate: '2025',
        completionDate: '2027',
        projectValue: '$50,000,000 USD',
        description: { en: '', ar: '', hi: '' },
        mainImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        scopeOfWork: [{ en: 'Turnkey Civil Engineering', ar: '', hi: '' }],
        highlights: [{ en: 'Mega Foundation Piling', ar: '', hi: '' }],
        order: 1,
        visible: true,
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as Project);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-[#0b1320] border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--accent-color)' }}>
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Project Name (English) *</label>
            <input
              type="text"
              required
              value={formData.name?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: { en: e.target.value, ar: formData.name?.ar || '', hi: formData.name?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Client / Authority *</label>
              <input
                type="text"
                required
                value={formData.client || ''}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Location *</label>
              <input
                type="text"
                required
                value={formData.location?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { en: e.target.value, ar: '', hi: '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <select
                value={formData.category || 'infrastructure'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              >
                <option value="infrastructure">Infrastructure</option>
                <option value="civil">Civil Engineering</option>
                <option value="industrial">Industrial EPC</option>
                <option value="transportation">Transportation</option>
                <option value="geotechnical">Geotechnical</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Status</label>
              <select
                value={formData.status || 'ongoing'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'completed' | 'ongoing' })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Contract Value</label>
              <input
                type="text"
                value={formData.projectValue || ''}
                onChange={(e) => setFormData({ ...formData, projectValue: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
                placeholder="$45,000,000 USD"
              />
            </div>
          </div>

          <AdminImageInput
            label="Featured Main Image *"
            value={formData.mainImage || ''}
            onChange={(url) => setFormData({ ...formData, mainImage: url })}
            aspectRatio="video"
            placeholder="Image URL or upload local image file"
          />

          <div>
            <label className="block text-slate-400 mb-1">Description Brief</label>
            <textarea
              rows={3}
              value={formData.description?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white resize-y"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="proj-featured"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="proj-featured" className="text-slate-300">Featured on Homepage</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="proj-visible"
                checked={formData.visible !== false}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="proj-visible" className="text-slate-300">Publicly Visible</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. SERVICE MODAL
// -------------------------------------------------------------
interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onSave: (svc: Service) => Promise<void>;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        id: `svc-${Date.now()}`,
        slug: `service-${Date.now()}`,
        title: { en: '', ar: '', hi: '' },
        shortDescription: { en: '', ar: '', hi: '' },
        detailedDescription: { en: '', ar: '', hi: '' },
        category: 'Geotechnical & Foundations',
        iconName: 'Wrench',
        mainImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        features: [{ en: 'Deep Foundation Piles', ar: '', hi: '' }],
        benefits: [{ en: 'Accelerated EPC delivery', ar: '', hi: '' }],
        relatedProjectIds: [],
        order: 1,
        visible: true,
      });
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as Service);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-[#0b1320] border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--accent-color)' }}>
            {service ? 'Edit Engineering Service' : 'Add New Service'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Service Title (English) *</label>
            <input
              type="text"
              required
              value={formData.title?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { en: e.target.value, ar: formData.title?.ar || '', hi: formData.title?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Discipline Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
                placeholder="e.g. Geotechnical & Foundations"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Icon Identifier</label>
              <input
                type="text"
                value={formData.iconName || 'Wrench'}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
                placeholder="Wrench, Building2, HardHat"
              />
            </div>
          </div>

          <AdminImageInput
            label="Service Main Cover Image *"
            value={formData.mainImage || ''}
            onChange={(url) => setFormData({ ...formData, mainImage: url })}
            aspectRatio="wide"
            placeholder="Image URL or upload local image file"
          />

          <div>
            <label className="block text-slate-400 mb-1">Short Description *</label>
            <textarea
              rows={3}
              required
              value={formData.shortDescription?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortDescription: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white resize-y"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="svc-visible"
                checked={formData.visible !== false}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="svc-visible" className="text-slate-300">Service is Publicly Active</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Service'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. BRANCH LOCATION MODAL
// -------------------------------------------------------------
interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: BranchLocation | null;
  onSave: (loc: BranchLocation) => Promise<void>;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  location,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<BranchLocation>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (location) {
      setFormData(location);
    } else {
      setFormData({
        id: `loc-${Date.now()}`,
        name: { en: '', ar: '', hi: '' },
        country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية', hi: 'सऊदी अरब' },
        address: { en: '', ar: '', hi: '' },
        phone: '+966 11 489 7700',
        email: 'info@fenovacivil.com',
        contactPerson: 'Operations Director',
        locationImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        officeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        mapEmbedUrl: '',
        coordinates: { lat: 24.7136, lng: 46.6753 },
        description: { en: 'Executive Regional Operating Center', ar: '', hi: '' },
        workingHours: { en: 'Sun - Thu: 08:00 - 17:30', ar: '', hi: '' },
        status: 'active',
        order: 1,
      });
    }
  }, [location, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as BranchLocation);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-[#0b1320] border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--accent-color)' }}>
            {location ? 'Edit Branch Location' : 'Add New Branch Location'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Hub Name (English) *</label>
              <input
                type="text"
                required
                value={formData.name?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { en: e.target.value, ar: '', hi: '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
                placeholder="Riyadh HQ"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Country (English) *</label>
              <input
                type="text"
                required
                value={formData.country?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    country: { en: e.target.value, ar: '', hi: '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
                placeholder="Saudi Arabia"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Physical Address *</label>
            <input
              type="text"
              required
              value={formData.address?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              placeholder="King Fahd Road, Al Olaya District, Riyadh"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Official Email *</label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>
          </div>

          <AdminImageInput
            label="Location Photo *"
            value={formData.locationImage || ''}
            onChange={(url) => setFormData({ ...formData, locationImage: url })}
            aspectRatio="wide"
            placeholder="Image URL or upload local image file"
          />

          <div>
            <label className="block text-slate-400 mb-1">Operational Status</label>
            <select
              value={formData.status || 'active'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'hidden' })}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            >
              <option value="active">Active Regional Center</option>
              <option value="hidden">Hidden / Upcoming Facility</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Hub'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. BROCHURE / DOCUMENT MODAL
// -------------------------------------------------------------
interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  onSave: (doc: DocumentItem) => Promise<void>;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  document,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<DocumentItem>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (document) {
      setFormData(document);
    } else {
      setFormData({
        id: `doc-${Date.now()}`,
        title: { en: '', ar: '', hi: '' },
        description: { en: '', ar: '', hi: '' },
        category: 'corporate',
        documentUrl: '/documents/fenova_profile.pdf',
        thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
        fileSize: '4.8 MB',
        pagesCount: 24,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadAllowed: true,
        order: 1,
        visible: true,
      });
    }
  }, [document, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as DocumentItem);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-[#0b1320] border w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--accent-color)' }}>
            {document ? 'Edit Document' : 'Register New PDF Document'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Document Title *</label>
            <input
              type="text"
              required
              value={formData.title?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <select
                value={formData.category || 'corporate'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              >
                <option value="corporate">Corporate Profile</option>
                <option value="civil">Civil Engineering Dossier</option>
                <option value="geotechnical">Geotechnical Specifications</option>
                <option value="equipment">Equipment Fleet Catalog</option>
                <option value="hse">HSE & Quality Manuals</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">File Size</label>
              <input
                type="text"
                value={formData.fileSize || '3.5 MB'}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Document / PDF URL *</label>
            <input
              type="text"
              required
              value={formData.documentUrl || ''}
              onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white resize-y"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="doc-download"
                checked={formData.downloadAllowed || false}
                onChange={(e) => setFormData({ ...formData, downloadAllowed: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="doc-download" className="text-slate-300">Allow Public Download</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="doc-visible"
                checked={formData.visible !== false}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="doc-visible" className="text-slate-300">Publicly Visible</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Document'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 6. CAREER VACANCY MODAL
// -------------------------------------------------------------
interface VacancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: CareerVacancy | null;
  onSave: (vac: CareerVacancy) => Promise<void>;
}

export const VacancyModal: React.FC<VacancyModalProps> = ({
  isOpen,
  onClose,
  vacancy,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<CareerVacancy>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (vacancy) {
      setFormData(vacancy);
    } else {
      setFormData({
        id: `job-${Date.now()}`,
        slug: `job-${Date.now()}`,
        title: { en: '', ar: '', hi: '' },
        department: { en: 'Heavy Civil Infrastructure', ar: '', hi: '' },
        location: { en: 'Riyadh, Saudi Arabia', ar: '', hi: '' },
        employmentType: 'Full-time',
        experience: '5+ Years in Civil EPC',
        qualification: { en: 'B.Sc. Civil Engineering', ar: '', hi: '' },
        skills: ['AutoCAD', 'Structural Analysis', 'Primavera P6'],
        description: { en: '', ar: '', hi: '' },
        responsibilities: [{ en: 'Lead site engineering operations', ar: '', hi: '' }],
        requirements: [{ en: 'SCE membership preferred', ar: '', hi: '' }],
        applicationDeadline: '2026-12-31',
        status: 'open',
        order: 1,
      });
    }
  }, [vacancy, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as CareerVacancy);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-[#0b1320] border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--accent-color)' }}>
            {vacancy ? 'Edit Career Opening' : 'Add New Career Opening'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.title?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Department *</label>
              <input
                type="text"
                required
                value={formData.department?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: { en: e.target.value, ar: '', hi: '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Job Location *</label>
              <input
                type="text"
                required
                value={formData.location?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { en: e.target.value, ar: '', hi: '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Experience Required</label>
              <input
                type="text"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
                placeholder="e.g. 5+ Years"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Status</label>
              <select
                value={formData.status || 'open'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'closed' })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white"
              >
                <option value="open">Active / Accepting Applications</option>
                <option value="closed">Closed / Filled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Job Description</label>
            <textarea
              rows={3}
              value={formData.description?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { en: e.target.value, ar: '', hi: '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white resize-y"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Vacancy'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
