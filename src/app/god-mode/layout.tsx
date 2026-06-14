import React from 'react';
import GlobalAppShell from '@/components/layout/GlobalAppShell';

export default function GodModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalAppShell>
      {children}
    </GlobalAppShell>
  );
}
