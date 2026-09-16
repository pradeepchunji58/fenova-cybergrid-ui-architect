import React, { useState, useEffect } from 'react';
import { X, Save, Shield, KeyRound, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Client, Leader } from '../types.ts';
import { AdminImageInput } from './AdminImageInput.tsx';

// -------------------------------------------------------------
// 1. CLIENT MODAL
// -------------------------------------------------------------
interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onSave: (client: Client) => Promise<void>;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  client,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Client>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData(client);
    } else {
      setFormData({
        id: `client-${Date.now()}`,
        name: '',
        logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=300&auto=format&fit=crop',
        category: 'GOVERNMENT // ENERGY',
        industry: { en: 'Sovereign Energy & EPC', ar: '', hi: '' },
        shortDescription: { en: 'Strategic infrastructure development partner.', ar: '', hi: '' },
        websiteUrl: 'https://example.com',
        featured: true,
        visible: true,
        order: 1,
      });
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as Client);
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
            {client ? 'Edit Client Organization' : 'Register New Client'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Client / Entity Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
                placeholder="e.g. Saudi Aramco, NEOM, RCRC"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Category / Tag</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
                placeholder="e.g. SOVEREIGN // INFRASTRUCTURE"
              />
            </div>
          </div>

          <AdminImageInput
            label="Client Logo / Badge Image *"
            value={formData.logo || ''}
            onChange={(url) => setFormData({ ...formData, logo: url })}
            aspectRatio="square"
            placeholder="Image URL or upload local SVG / PNG logo"
            presets={[
              { label: 'Aramco Symbol', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=300&auto=format&fit=crop' },
              { label: 'RCRC Emblem', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=300&auto=format&fit=crop' },
              { label: 'Red Sea Logo', url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=300&auto=format&fit=crop' },
              { label: 'Industrial Crest', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=300&auto=format&fit=crop' },
            ]}
          />

          <div>
            <label className="block text-slate-400 mb-1">Official Website URL</label>
            <input
              type="text"
              value={formData.websiteUrl || ''}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Short Description (English)</label>
            <textarea
              rows={2}
              value={formData.shortDescription?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortDescription: { en: e.target.value, ar: formData.shortDescription?.ar || '', hi: formData.shortDescription?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
            />
          </div>

          <div className="flex items-center gap-6 pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.featured ?? true}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Featured on Homepage</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.visible ?? true}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Active Visibility</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Client'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. LEADER MODAL
// -------------------------------------------------------------
interface LeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  leader: Leader | null;
  onSave: (leader: Leader) => Promise<void>;
}

export const LeaderModal: React.FC<LeaderModalProps> = ({
  isOpen,
  onClose,
  leader,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Leader>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (leader) {
      setFormData(leader);
    } else {
      setFormData({
        id: `leader-${Date.now()}`,
        name: '',
        roleType: 'board',
        designation: { en: 'Managing Director & Board Member', ar: '', hi: '' },
        biography: { en: 'Chartered civil engineer with 20+ years executing mega infrastructure assets.', ar: '', hi: '' },
        message: { en: '', ar: '', hi: '' },
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        email: 'director@fenovacivil.com',
        linkedin: 'https://linkedin.com',
        order: 1,
        visible: true,
      });
    }
  }, [leader, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData as Leader);
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
            {leader ? 'Edit Executive Profile' : 'Add Executive Leader'}
          </h3>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Executive Full Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
                placeholder="e.g. Eng. Tariq Al-Mansoor"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Role Classification *</label>
              <select
                value={formData.roleType || 'board'}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value as any })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              >
                <option value="ceo">Chief Executive Officer / MD</option>
                <option value="board">Board of Directors</option>
                <option value="team">Technical Executive Team</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Designation / Title (English) *</label>
            <input
              type="text"
              required
              value={formData.designation?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  designation: { en: e.target.value, ar: formData.designation?.ar || '', hi: formData.designation?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              placeholder="e.g. Executive Director of Civil Works & Infrastructure"
            />
          </div>

          <AdminImageInput
            label="Executive Portrait Photograph *"
            value={formData.photo || ''}
            onChange={(url) => setFormData({ ...formData, photo: url })}
            aspectRatio="portrait"
            placeholder="Portrait URL or upload photo"
            presets={[
              { label: 'Executive Male 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
              { label: 'Executive Male 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' },
              { label: 'Executive Female', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
              { label: 'Senior Engineer', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop' },
            ]}
          />

          <div>
            <label className="block text-slate-400 mb-1">Biography & Credentials (English)</label>
            <textarea
              rows={3}
              value={formData.biography?.en || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  biography: { en: e.target.value, ar: formData.biography?.ar || '', hi: formData.biography?.hi || '' },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
            />
          </div>

          {formData.roleType === 'ceo' && (
            <div>
              <label className="block text-slate-400 mb-1">Managing Director Message Quote</label>
              <textarea
                rows={2}
                value={formData.message?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: { en: e.target.value, ar: formData.message?.ar || '', hi: formData.message?.hi || '' },
                  })
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
                placeholder="Strategic vision quote..."
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Corporate Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.visible ?? true}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Profile Publicly Visible</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. CHANGE PASSWORD MODAL
// -------------------------------------------------------------
interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  onSuccess: (newPass: string) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  onSuccess,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setSaving(true);
    // Update local storage credentials
    try {
      const storedCredentials = localStorage.getItem('fenova_custom_passwords');
      const creds = storedCredentials ? JSON.parse(storedCredentials) : {};
      creds[userEmail.toLowerCase()] = newPassword;
      localStorage.setItem('fenova_custom_passwords', JSON.stringify(creds));
      onSuccess(newPassword);
      onClose();
    } catch {
      setError('Failed updating password storage.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="bg-[#0b1320] border w-full max-w-md p-6 text-slate-100 hexagon-cut shadow-2xl space-y-4"
        style={{ borderColor: 'var(--accent-border)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
            <h3 className="text-base font-bold font-heading text-white">
              Change Security Password
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-white/[0.03] border border-white/5 rounded text-xs font-mono space-y-1">
          <div className="text-slate-400">
            Account: <span className="text-white font-bold">{userName}</span>
          </div>
          <div className="text-slate-400">
            Terminal ID: <span className="text-slate-200">{userEmail}</span>
          </div>
        </div>

        {error && (
          <div className="p-2.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1">Current Password *</label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">New Security Password *</label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              placeholder="Min 6 alphanumeric characters"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Confirm New Password *</label>
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/15 rounded text-white outline-none focus:border-white/40"
              placeholder="Re-enter new password"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPass ? 'Hide Passwords' : 'Show Passwords'}</span>
            </button>
            <span className="text-[10px] text-slate-500">Persisted locally & server</span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-slate-950 font-bold rounded text-xs flex items-center gap-1.5 transition-all"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
