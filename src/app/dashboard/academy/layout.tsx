import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Academy | Arwan OS',
  description: 'Immersive Learning and AI Code Companion',
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 w-full h-full flex flex-col">
      {children}
    </div>
  );
}
