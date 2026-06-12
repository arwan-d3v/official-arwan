"use client";

import React, { useEffect } from 'react';
import MegaMenu from '@/components/ui/MegaMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // When entering dashboard, force admin theme (default to dark if not set)
    const currentAdminTheme = document.documentElement.getAttribute('data-admin-theme');
    if (!currentAdminTheme) {
      document.documentElement.setAttribute('data-admin-theme', 'dark');
    }
    // Remove public theme to ensure admin theme takes precedence
    document.documentElement.removeAttribute('data-theme');

    return () => {
      // Cleanup when leaving dashboard
      document.documentElement.removeAttribute('data-admin-theme');
      // In a real app, you'd restore the user's preferred public theme here from state/storage
      document.documentElement.setAttribute('data-theme', 'dark-neon');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <MegaMenu />
      <div className="flex-grow flex">
        {/* Mock Admin Sidebar */}
        <aside className="w-64 hidden md:block border-r border-secondary/20 bg-secondary/5 p-6">
          <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Admin Panel</div>
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded bg-primary/10 text-primary font-medium">Overview</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-secondary/20 text-foreground/80">Users</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-secondary/20 text-foreground/80">Telemetry Settings</a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
