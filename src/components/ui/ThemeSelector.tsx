"use client";

import React, { useState } from 'react';
import { Lock, Check } from 'lucide-react';

// List of all 27 themes matching globals.css
const THEMES = [
  // 2 Free Themes
  { id: 'light', name: 'Minimalist', isVip: false, color: '#f5f5f5' },
  { id: 'dark-neon', name: 'Dark Neon', isVip: false, color: '#09090b' },
  // 25 VIP Themes
  { id: 'cyberpunk-red', name: 'Cyberpunk Red', isVip: true, color: '#1a0000' },
  { id: 'ocean-blue', name: 'Ocean Blue', isVip: true, color: '#0d1a26' },
  { id: 'forest-green', name: 'Forest Green', isVip: true, color: '#0f260f' },
  { id: 'sunset-orange', name: 'Sunset Orange', isVip: true, color: '#261a0d' },
  { id: 'royal-purple', name: 'Royal Purple', isVip: true, color: '#1a0f26' },
  { id: 'gold-luxury', name: 'Gold Luxury', isVip: true, color: '#26200d' },
  { id: 'rose-quartz', name: 'Rose Quartz', isVip: true, color: '#311b21' },
  { id: 'emerald-city', name: 'Emerald City', isVip: true, color: '#0d261a' },
  { id: 'midnight-indigo', name: 'Midnight Indigo', isVip: true, color: '#0a0a1f' },
  { id: 'coral-reef', name: 'Coral Reef', isVip: true, color: '#2b1b18' },
  { id: 'slate-gray', name: 'Slate Gray', isVip: true, color: '#22262a' },
  { id: 'mint-fresh', name: 'Mint Fresh', isVip: true, color: '#12211c' },
  { id: 'lavender-dream', name: 'Lavender Dream', isVip: true, color: '#1a1825' },
  { id: 'crimson-shadow', name: 'Crimson Shadow', isVip: true, color: '#1d0c0e' },
  { id: 'sapphire-deep', name: 'Sapphire Deep', isVip: true, color: '#0a0f1f' },
  { id: 'amber-glow', name: 'Amber Glow', isVip: true, color: '#241d18' },
  { id: 'teal-matrix', name: 'Teal Matrix', isVip: true, color: '#0a1f1f' },
  { id: 'ruby-rich', name: 'Ruby Rich', isVip: true, color: '#240f11' },
  { id: 'cobalt-strike', name: 'Cobalt Strike', isVip: true, color: '#0f172e' },
  { id: 'olive-drab', name: 'Olive Drab', isVip: true, color: '#20311b' },
  { id: 'plum-velvet', name: 'Plum Velvet', isVip: true, color: '#260f26' },
  { id: 'tangerine-pop', name: 'Tangerine Pop', isVip: true, color: '#24120f' },
  { id: 'cerulean-clear', name: 'Cerulean Clear', isVip: true, color: '#12232b' },
  { id: 'magenta-shock', name: 'Magenta Shock', isVip: true, color: '#240f1f' },
  { id: 'charcoal-elegance', name: 'Charcoal Elegance', isVip: true, color: '#1f1f1f' },
];

const ThemeSelector = () => {
  const [activeTheme, setActiveTheme] = useState('dark-neon');
  const [showAlert, setShowAlert] = useState(false);

  const handleThemeClick = (theme: typeof THEMES[0]) => {
    if (theme.isVip) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setActiveTheme(theme.id);
    if (theme.id === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme.id);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-background border border-secondary/20 rounded-xl shadow-lg relative">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Design Tokens Engine</h2>
        <p className="text-foreground/60">Select from 27 meticulously crafted HSL color schemas.</p>
      </div>

      {/* VIP Paywall Alert Mockup */}
      {showAlert && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-medium border border-primary-foreground/20">
            <Lock size={18} />
            VIP Paywall: Upgrade to unlock premium themes!
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {THEMES.map((theme) => {
          const isActive = activeTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => handleThemeClick(theme)}
              className={`
                group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300
                ${isActive ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'border-secondary/20 hover:border-primary/50 hover:bg-secondary/10'}
                ${theme.isVip ? 'opacity-80 hover:opacity-100' : ''}
              `}
            >
              {/* Theme Color Preview Circle */}
              <div
                className="w-12 h-12 rounded-full mb-3 shadow-inner border border-white/10 relative flex items-center justify-center"
                style={{ backgroundColor: theme.color }}
              >
                {isActive && !theme.isVip && <Check size={20} className="text-white drop-shadow-md" />}
                {theme.isVip && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-[1px]">
                    <Lock size={18} className="text-white/80" />
                  </div>
                )}
              </div>

              <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground/80'}`}>
                {theme.name}
              </span>

              {theme.isVip && (
                <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                  VIP
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
