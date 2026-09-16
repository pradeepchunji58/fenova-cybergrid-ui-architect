import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Link, Check, AlertCircle, X, Sparkles } from 'lucide-react';

interface AdminImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  presets?: { label: string; url: string }[];
}

export const AdminImageInput: React.FC<AdminImageInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/... or data:image/...',
  aspectRatio = 'video',
  presets,
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'upload' | 'presets'>('url');
  const [imgError, setImgError] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultPresets = presets || [
    { label: 'Mega Bridge', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Viaduct EPC', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Industrial Plant', url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Tunnel Boring', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop' },
    { label: 'High-Tech Blueprint', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop' },
  ];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, SVG)');
      return;
    }
    // Limit to 5MB for local storage base64
    if (file.size > 5 * 1024 * 1024) {
      alert('File is larger than 5MB. Please choose a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImgError(false);
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'h-40 w-32'
      : aspectRatio === 'square'
      ? 'h-32 w-32'
      : aspectRatio === 'wide'
      ? 'h-32 w-full sm:w-64'
      : 'h-36 w-full sm:w-60';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-slate-300 font-mono text-xs font-semibold">{label}</label>
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-0.5 hexagon-cut-sm transition-colors ${
              activeTab === 'url' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            URL Input
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-0.5 hexagon-cut-sm transition-colors ${
              activeTab === 'upload' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2 py-0.5 hexagon-cut-sm transition-colors ${
              activeTab === 'presets' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Presets
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-3 bg-black/40 border border-white/10 hexagon-cut-sm">
        {/* Live Image Reflection & Preview Box */}
        <div className="shrink-0 flex flex-col items-center">
          <div
            className={`${aspectClass} rounded border border-white/15 bg-black/80 overflow-hidden relative group flex items-center justify-center`}
          >
            {value && !imgError ? (
              <>
                <img
                  src={value}
                  alt="Live Reflection"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-mono text-white px-2 py-1 bg-black/80 rounded border border-white/20">
                    LIVE REFLECTION
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 text-center text-slate-500">
                <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                <span className="text-[10px] font-mono">
                  {imgError ? 'Image Load Error' : 'No Image Set'}
                </span>
              </div>
            )}
          </div>
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                setImgError(false);
              }}
              className="mt-1.5 text-[10px] font-mono text-rose-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear Image
            </button>
          )}
        </div>

        {/* Input Modes */}
        <div className="flex-1 space-y-2">
          {activeTab === 'url' && (
            <div className="space-y-1.5">
              <div className="relative">
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => {
                    setImgError(false);
                    onChange(e.target.value);
                  }}
                  className="w-full px-3 py-2 text-xs font-mono bg-black/60 border border-white/15 rounded text-slate-100 outline-none focus:border-white/40"
                  placeholder={placeholder}
                />
              </div>
              <p className="text-[10px] font-mono text-slate-400 leading-tight">
                Provide any valid HTTPS image URL (Unsplash, Cloudinary, AWS S3, etc.) or paste a data URI.
              </p>
            </div>
          )}

          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
                dragOver ? 'border-white/50 bg-white/10' : 'border-white/15 hover:border-white/30 bg-black/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1" style={{ color: 'var(--accent-color)' }} />
              <p className="text-xs font-mono text-slate-200 font-semibold">
                Click to Browse or Drag Image Here
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                Automatically embeds into Netlify & GitHub (PNG, JPG, WebP up to 5MB)
              </p>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Choose High-Tech Engineering Preset:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-28 overflow-y-auto">
                {defaultPresets.map((p) => (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => {
                      setImgError(false);
                      onChange(p.url);
                    }}
                    className={`p-1.5 rounded text-[10px] font-mono text-left border flex items-center gap-1.5 transition-colors ${
                      value === p.url
                        ? 'border-white/40 bg-white/15 text-white font-bold'
                        : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
