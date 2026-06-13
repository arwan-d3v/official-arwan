"use client";

import React, { useEffect } from 'react';
import MegaMenu from '@/components/ui/MegaMenu';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Remove public theme to ensure admin theme takes precedence
    document.documentElement.removeAttribute('data-theme');

    return () => {
      // Cleanup when leaving dashboard
      document.documentElement.removeAttribute('data-admin-theme');
      // In a real app, you'd restore the user's preferred public theme here from state/storage
      document.documentElement.setAttribute('data-theme', 'minimalist');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <MegaMenu />
      <div className="flex-grow flex">
        {/* Admin Sidebar with enhanced contrast */}
        <aside className="w-64 hidden md:block border-r border-secondary/30 bg-secondary/10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] dark:shadow-[4px_0_24px_-12px_rgba(0,0,0,0.5)] p-6 flex flex-col justify-between z-10">
          <div>
            <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Admin Panel</div>
            <nav className="space-y-2 flex flex-col">
              <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-secondary/20 text-foreground/80">Overview</Link>
              <Link href="/dashboard/portfolio" className="block px-3 py-2 rounded border border-neon-cyan/20 bg-black/40 text-neon-cyan hover:bg-neon-cyan/10 font-medium font-mono">Portfolio Builder</Link>
              <Link href="/dashboard/services" className="block px-3 py-2 rounded border border-red-500/20 bg-black/40 text-red-500 hover:bg-red-500/10 font-medium font-mono">Services Manager</Link>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
