"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  FileText, 
  LineChart, 
  GraduationCap, 
  Wrench, 
  TerminalSquare, 
  UserCircle 
} from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { name: 'Go to Obsidian Nexus (CV Builder)', href: '/dashboard/cv-builder', icon: FileText, category: 'Modules' },
    { name: 'Go to Quant Enterprise (Trading)', href: '/dashboard/quant', icon: LineChart, category: 'Modules' },
    { name: 'Go to Tech Academy (Courses)', href: '/dashboard/academy', icon: GraduationCap, category: 'Modules' },
    { name: 'Go to Utility Vault (Tools)', href: '/dashboard/vault', icon: Wrench, category: 'Modules' },
    { name: 'Manage Profile & Subscriptions', href: '/dashboard/profile', icon: UserCircle, category: 'Account' },
    { name: 'God Mode: System Command Center', href: '/god-mode', icon: TerminalSquare, category: 'Owner Exclusive', color: 'text-[#D4AF37]' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) || 
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0F14]/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search size={20} className="text-slate-400" />
          <input
            autoFocus
            className="w-full bg-transparent border-none px-4 py-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-0"
            placeholder="Search modules, actions, or jump to..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">ESC</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No results found for &quot;{search}&quot;</div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => {
                    setIsOpen(false);
                    setSearch('');
                    router.push(cmd.href);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <cmd.icon size={18} className={cmd.color || 'text-slate-400 group-hover:text-indigo-400 transition-colors'} />
                  <div className="flex-1">
                    <div className={`font-medium ${cmd.color || 'text-slate-300 group-hover:text-white transition-colors'}`}>
                      {cmd.name}
                    </div>
                    <div className="text-xs text-slate-500">{cmd.category}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Background click handler */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
    </div>
  );
}
