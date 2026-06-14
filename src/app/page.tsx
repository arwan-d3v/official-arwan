import React from 'react';
import Link from 'next/link';
import { ArrowRight, User, Briefcase, Rocket, Terminal } from 'lucide-react';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';

export default function GrandEntryPage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-slate-200 flex flex-col font-sans selection:bg-primary/30">
      
      {/* Cinematic Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-24">
        
        {/* Subtle glowing orb in background */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-slate-300 backdrop-blur-sm shadow-sm">
            <Terminal size={16} className="text-indigo-400" />
            <span>Arwan Personal OS v2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Ecosystem</span>
          </h1>
          
          <div className="text-lg md:text-xl text-slate-400 font-mono h-12 flex items-center justify-center">
            <TypewriterEffect text="Architecting high-density SaaS environments and enterprise systems." speed={30} delay={300} />
          </div>
        </div>

        {/* 3 Gates / Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
          
          {/* Gate 1: Portfolio */}
          <Link href="/arwan" className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-500 overflow-hidden backdrop-blur-md flex flex-col items-start h-full shadow-lg">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <User size={120} />
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl mb-6 ring-1 ring-indigo-500/20 group-hover:ring-indigo-500/50 transition-all">
              <User size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">My Portfolio</h2>
            <p className="text-slate-400 leading-relaxed mb-8 flex-1">
              Explore my verified credentials, open-source repositories, and interactive case studies.
            </p>
            <div className="flex items-center text-indigo-400 font-semibold group-hover:gap-3 gap-2 transition-all mt-auto">
              <span>View Profile</span>
              <ArrowRight size={18} />
            </div>
          </Link>

          {/* Gate 2: Services */}
          <Link href="/services" className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-500 overflow-hidden backdrop-blur-md flex flex-col items-start h-full shadow-lg">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Briefcase size={120} />
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-6 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/50 transition-all">
              <Briefcase size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">My Services</h2>
            <p className="text-slate-400 leading-relaxed mb-8 flex-1">
              Hire me for enterprise software architecture, full-stack consulting, and high-frequency UI/UX design.
            </p>
            <div className="flex items-center text-emerald-400 font-semibold group-hover:gap-3 gap-2 transition-all mt-auto">
              <span>Hire Me</span>
              <ArrowRight size={18} />
            </div>
          </Link>

          {/* Gate 3: SaaS Hub */}
          <Link href="/platform" className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-500 overflow-hidden backdrop-blur-md flex flex-col items-start h-full shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Rocket size={120} />
            </div>
            <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl mb-6 ring-1 ring-violet-500/20 group-hover:ring-violet-500/50 transition-all">
              <Rocket size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Premium SaaS Hub</h2>
            <p className="text-slate-400 leading-relaxed mb-8 flex-1">
              Access the Obsidian Nexus ecosystem. CV Builders, Quant Trading Dashboards, and the Tech Academy.
            </p>
            <div className="flex items-center text-violet-400 font-semibold group-hover:gap-3 gap-2 transition-all mt-auto">
              <span>Enter Platform</span>
              <ArrowRight size={18} />
            </div>
          </Link>

        </div>
      </main>

      {/* Signature Arwan Footer - Marketing Variant */}
      <footer className="w-full py-10 border-t border-slate-800/50 bg-[#0D0F14]/80 backdrop-blur-md mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-slate-500 font-medium">
            <Link href="/arwan" className="hover:text-slate-300 transition-colors">My Portfolio</Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors">Agency Services</Link>
            <Link href="/platform" className="hover:text-slate-300 transition-colors">SaaS Hub</Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">User Dashboard</Link>
            <Link href="/god-mode" className="hover:text-yellow-500 transition-colors flex items-center gap-1">
              <Terminal size={14} /> Owner Login
            </Link>
          </div>
          <div className="w-16 h-px bg-slate-800 rounded-full" />
          <div className="text-center">
            <p className="text-slate-700 text-xs font-bold tracking-[0.2em] uppercase mb-2">Arwan Personal OS</p>
            <p className="text-slate-500 text-sm">Engineered & Copyrighted by <span className="text-slate-300 font-semibold">Arwan</span> &copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
