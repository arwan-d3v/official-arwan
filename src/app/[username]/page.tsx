import React from 'react';

// Next.js 15 requires params to be a Promise in dynamic segments
export default async function UserPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = await params;
  const { username } = resolvedParams;

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/30 text-sm font-medium mb-6">
          SaaS Hosted Portfolio
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-primary">{username}</span>&apos;s Space
        </h1>
        <p className="text-xl text-foreground/70 mb-8">
          This is a dynamically routed page for SaaS users renting the Live Portfolio / CV Builder.
        </p>

        <div className="p-8 rounded-2xl border border-secondary/30 bg-secondary/10 text-left">
          <h3 className="text-xl font-semibold mb-4 border-b border-secondary/30 pb-2">User Configuration Data (Mock)</h3>
          <ul className="space-y-2 text-foreground/80 font-mono text-sm">
            <li><span className="text-foreground/50">Username:</span> {username}</li>
            <li><span className="text-foreground/50">Tier:</span> <span className="text-amber-500">VIP</span></li>
            <li><span className="text-foreground/50">Active Theme:</span> <span className="text-primary">cyberpunk-red</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
