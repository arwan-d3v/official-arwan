"use client";

import React, { useEffect } from 'react';
import GlobalAppShell from '@/components/layout/GlobalAppShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Force the document to have dark mode characteristics for the admin/OS shell
    document.documentElement.classList.add('dark');
    document.documentElement.removeAttribute('data-theme'); // Clear public theme

    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <GlobalAppShell>
      {children}
    </GlobalAppShell>
  );
}
