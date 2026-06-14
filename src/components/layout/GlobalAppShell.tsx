"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  LineChart, 
  GraduationCap, 
  Wrench, 
  UserCircle, 
  TerminalSquare,
  Search,
  Menu,
  Bell
} from 'lucide-react';
import CommandPalette from '@/components/ui/CommandPalette';

interface GlobalAppShellProps {
  children: React.ReactNode;
}

export default function GlobalAppShell({ children }: GlobalAppShellProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Hub Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Obsidian Nexus', href: '/dashboard/cv-builder', icon: FileText },
    { name: 'Quant Enterprise', href: '/dashboard/quant', icon: LineChart },
    { name: 'Tech Academy', href: '/dashboard/academy', icon: GraduationCap },
    { name: 'Utility Vault', href: '/dashboard/vault', icon: Wrench },
    { name: 'Unified Profile', href: '/dashboard/profile', icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-[#0D0F14] overflow-hidden text-slate-200 font-sans">
      
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 border-r border-slate-800/60 bg-slate-900/40 flex flex-col hidden md:flex shrink-0`}
      >
        <div className="p-4 md:p-6 flex items-center justify-between border-b border-slate-800/60 h-16 shrink-0">
          {isSidebarOpen ? (
            <span className="font-bold tracking-widest text-sm uppercase text-slate-300 font-display">
              Arwan <span className="text-indigo-400">OS</span>
            </span>
          ) : (
            <span className="font-bold text-indigo-400 mx-auto">OS</span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'));
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 font-semibold ring-1 ring-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <item.icon size={20} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                {isSidebarOpen && <span className="text-sm">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* God Mode Trigger */}
        <div className="p-4 border-t border-slate-800/60 mt-auto bg-slate-900/60">
          <Link 
            href="/god-mode"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group hover:ring-1 hover:ring-[#D4AF37]/50 ${
              pathname?.startsWith('/god-mode') 
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                : 'text-slate-400 hover:text-[#D4AF37] hover:bg-slate-800/50'
            }`}
            title={!isSidebarOpen ? "God Mode" : undefined}
          >
            <TerminalSquare size={20} className="group-hover:text-[#D4AF37] transition-colors" />
            {isSidebarOpen && (
              <span className="text-sm font-bold uppercase tracking-wider group-hover:text-[#D4AF37]">
                God Mode
              </span>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60 bg-[#0D0F14]/80 backdrop-blur-md shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-800/80 text-slate-400 transition-colors hidden md:block"
            >
              <Menu size={20} />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-md text-slate-400 text-sm cursor-text hover:bg-slate-800/80 transition-colors"
                onClick={() => {
                  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
                }}
            >
              <Search size={16} />
              <span>Search across OS...</span>
              <kbd className="ml-4 px-1.5 py-0.5 bg-[#0D0F14] border border-slate-700 rounded text-[10px] font-mono">Ctrl+K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-800/80 text-slate-400 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </button>
            <Link href="/dashboard/profile" className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-[#0D0F14] cursor-pointer hover:scale-105 transition-transform">
              A
            </Link>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-gradient-to-br from-[#0D0F14] to-slate-900/20">
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
