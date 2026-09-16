import React, { useState } from 'react';
import { MessageCircle, X, Send, User, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const WhatsAppWidget: React.FC = () => {
  const { settings, currentRoute } = useApp() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Civil Engineering EPC Consultation');
  const [customNotes, setCustomNotes] = useState('');
  const [nameError, setNameError] = useState('');

  // If in admin page, don't show the widget
  if (currentRoute === '/admin') return null;

  const defaultTags = [
    'Civil Engineering EPC Consultation',
    'Request BOQ / BOM Review & Quotation',
    'Blueprint & Structural Feasibility Review',
    'Mega-Project Tender Inquiries',
    'Turnkey Infrastructure Solutions',
    'Schedule Technical Site Inspection',
    'Corporate & Government Partnership',
    'Equipment Fleet & Heavy Machinery Inquiry',
  ];

  const quickTags: string[] = settings?.whatsAppSettings?.quickTags?.length
    ? settings?.whatsAppSettings?.quickTags
    : defaultTags;

  // Phone number configured via Admin Panel, default to official Fenova operations line
  const rawPhone = settings?.whatsAppSettings?.phoneNumber || settings?.phonePrimary || '+966114897700';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Name is mandatory to initiate WhatsApp dispatch');
      return;
    }
    setNameError('');

    const queryTopic = selectedTag || 'General Civil Engineering Inquiry';
    const contactText = contactInfo.trim() ? contactInfo.trim() : 'Provided in chat';
    const notesText = customNotes.trim() ? `\nDetails: ${customNotes.trim()}` : '';

    const messageText = `*Fenova Hi-Tech Civil Engineering // Direct Inquiry*\n\n` +
      `*Client Name:* ${name.trim()}\n` +
      `*Contact (Phone/Mail):* ${contactText}\n` +
      `*Inquiry Sector:* ${queryTopic}${notesText}\n\n` +
      `[Timestamp: ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC]`;

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* WhatsApp Modal Window */}
      {isOpen && (
        <div
          id="whatsapp-chat-panel"
          className="mb-4 w-[340px] sm:w-[380px] bg-[#060b13] border border-white/20 shadow-2xl text-slate-100 hexagon-cut p-5 relative backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
          style={{
            borderColor: 'var(--accent-border)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px var(--accent-glow)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-cyber tracking-wider text-white">
                  FENOVA WHATSAPP DISPATCH
                </h4>
                <p className="text-[10px] font-mono text-[#25D366] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  <span>ONLINE // DIRECT ROUTING</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name Field (Mandatory) */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                Full Name <span className="text-rose-400 font-bold">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="e.g. Eng. Khalid Mansoor"
                  className="w-full pl-9 pr-3 py-2 bg-[#020509] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366] transition-colors"
                />
              </div>
              {nameError && (
                <p className="text-[10px] text-rose-400 font-mono mt-1">{nameError}</p>
              )}
            </div>

            {/* Mobile Number or Mail ID (Optional) */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                Mobile Number or Email <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. +966 5X XXX XXXX or email@company.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#020509] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366] transition-colors"
                />
              </div>
            </div>

            {/* Inquiry Tags (Configured in Admin) */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Select Service Tag / Objective:
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {quickTags.map((tag, idx) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2 py-1 text-[10px] font-mono border transition-all text-left ${
                        isSelected
                          ? 'bg-[#25D366]/20 border-[#25D366] text-[#25D366] font-bold shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Project Message / Scope */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                Additional Note <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Brief project details, site location or BOQ requirement..."
                className="w-full px-3 py-1.5 bg-[#020509] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#25D366] transition-colors resize-none"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              id="whatsapp-dispatch-btn"
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#25D366]/40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Connect via WhatsApp</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Quick Connect on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer relative"
        style={{
          clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
        }}
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
        <MessageCircle className="w-7 h-7 text-[#020406] group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
};
