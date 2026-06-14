import React from 'react';

export default function QuantEnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-m-4 md:-m-8 h-[calc(100vh-4rem)] bg-[#000000] text-slate-300 font-mono flex flex-col overflow-hidden">
      {children}
    </div>
  );
}
