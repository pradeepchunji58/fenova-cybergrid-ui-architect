import React from 'react';
import { useApp } from '../context/AppContext.tsx';

interface LogoBrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LogoBrand: React.FC<LogoBrandProps> = ({ className = '', size = 'md' }) => {
  const { settings } = useApp();
  
  // Height (breadth) increased by 5%, with 3.75:1 ratio length
  const baseSize = settings.logoSize || 48;
  const zoom = settings.logoZoom || 1.0;
  const height = Math.round(baseSize * zoom * 1.65);
  const width = Math.round(height * 10.90);

  return (
    <div
      className={`relative inline-flex items-center justify-center p-1 bg-white border border-white/30 backdrop-blur-md hexagon-cut select-none group cursor-pointer shadow-lg overflow-hidden ${className}`}
      style={{
        clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
        height: `${height + 9}px`,
        maxWidth: '270px',
      }}
    >
      {/* Reflective sheen highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Custom Uploaded Logo Icon / Emblem scaled safely inside container */}
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        {settings.logoUrl ? (
          <img
            src={settings.logoUrl}
            alt="Logo Emblem"
            className="object-contain drop-shadow transition-all duration-300 max-h-full max-w-full"
            style={{ width: `${width}px`, height: `${height}px` }}
          />
        ) : (
          <svg
            viewBox="0 0 64 40"
            className="drop-shadow-md transition-all duration-300 max-h-[48px]"
            style={{ width: `${width}px`, height: `${height}px` }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <path
              d="M56 4C32 4 12 20 6 24C12 28 32 36 56 36C48 26 48 14 56 4Z"
              fill="url(#logoArrowGrad)"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

