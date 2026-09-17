import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Link, Check, AlertCircle, X, Sparkles, Copy, CheckCheck } from 'lucide-react';

interface AdminImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  presets?: { label: string; url: string }[];
}

// Client-side image compressor: converts uploaded file to lightweight optimized Base64
// This ensures images embed seamlessly into localStorage & static Netlify/GitHub deploys
const compressImageFile = (file: File, maxWidth = 1400, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If it's an SVG, read directly as data URL or text
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => {
        // Fallback to raw data url if canvas drawing fails
        resolve(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const AdminImageInput: React.FC<AdminImageInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/... or upload an image',
  aspectRatio = 'video',
  presets,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [imgError, setImgError] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultPresets = presets || [
    { label: 'Mega Bridge Viaduct', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Industrial Refinery EPC', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Deep Excavation & Foundation', url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Marine Port & Causeway', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Precast Casting Yard', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop' },
    { label: 'Corporate Headquarters', url: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Executive Leadership Avatar', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
  ];

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, SVG)');
      return;
    }

    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressImageFile(file);
      setImgError(false);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error('Image compression error:', err);
      // Fallback to basic file reader
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImgError(false);
          onChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'h-40 w-32'
      : aspectRatio === 'square'
      ? 'h-32 w-32'
      : aspectRatio === 'wide'
      ? 'h-32 w-full sm:w-64'
      : 'h-36 w-full sm:w-60';

  const isDataUri = value?.startsWith('data:image/');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-slate-300 font-mono text-xs font-semibold">{label}</label>
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'upload'
                ? 'font-bold'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
            style={
              activeTab === 'upload'
                ? { backgroundColor: 'var(--accent-color)', color: 'var(--accent-btn-text, #02060a)' }
                : {}
            }
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'url'
                ? 'font-bold'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
            style={
              activeTab === 'url'
                ? { backgroundColor: 'var(--accent-color)', color: 'var(--accent-btn-text, #02060a)' }
                : {}
            }
          >
            URL Input
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'presets'
                ? 'font-bold'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
            style={
              activeTab === 'presets'
                ? { backgroundColor: 'var(--accent-color)', color: 'var(--accent-btn-text, #02060a)' }
                : {}
            }
          >
            Presets
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-3.5 bg-black/50 border border-white/10 rounded">
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
                  crossOrigin="anonymous"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span
                    className="text-[10px] font-mono px-2 py-1 rounded font-bold"
                    style={{ backgroundColor: 'var(--accent-color)', color: 'var(--accent-btn-text, #02060a)' }}
                  >
                    REFLECTED OK
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

            {isProcessing && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <span className="text-[10px] font-mono animate-pulse text-white">Compressing...</span>
              </div>
            )}
          </div>

          {value && (
            <div className="flex items-center gap-2 mt-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                title="Copy Image Data / URL"
              >
                {copied ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : isDataUri ? 'Base64' : 'Copy'}</span>
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setImgError(false);
                }}
                className="text-[10px] font-mono text-rose-400 hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          )}
        </div>

        {/* Input Modes */}
        <div className="flex-1 space-y-2">
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-all ${
                dragOver ? 'border-white/50 bg-white/10' : 'border-white/15 hover:border-white/30 bg-black/30'
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
              <Upload className="w-6 h-6 mx-auto mb-1.5" style={{ color: 'var(--accent-color)' }} />
              <p className="text-xs font-mono text-slate-100 font-bold">
                Click to Browse or Drag Image Here
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-1">
                Auto-compressed to embedded Base64 — 100% portable for Netlify, GitHub & local persistence.
              </p>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-1.5">
              <input
                type="text"
                value={value || ''}
                onChange={(e) => {
                  setImgError(false);
                  onChange(e.target.value);
                }}
                className="w-full px-3 py-2 text-xs font-mono bg-black/60 border border-white/15 rounded text-slate-100 outline-none transition-colors"
                style={{ borderColor: value ? 'var(--accent-border)' : undefined }}
                placeholder={placeholder}
              />
              <p className="text-[10px] font-mono text-slate-400 leading-tight">
                Enter any direct HTTPS image link (Unsplash, Cloudinary, Imgur, S3, CDN) or paste a Data URI.
              </p>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Select Verified High-Tech Construction Preset:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {defaultPresets.map((p) => (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => {
                      setImgError(false);
                      onChange(p.url);
                    }}
                    className={`p-2 rounded text-[11px] font-mono text-left border flex items-center gap-2 transition-all ${
                      value === p.url
                        ? 'border-white/40 bg-white/15 text-white font-bold'
                        : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
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
