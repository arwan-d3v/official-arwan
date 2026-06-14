import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Code2, Server, Smartphone, Zap } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Navigation Bar */}
      <header className="h-20 flex items-center px-6 md:px-12 border-b border-slate-800/50 bg-[#0D0F14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium text-sm">Back to Hub</span>
          </Link>
          <div className="font-bold tracking-widest text-sm uppercase text-slate-300">
            Arwan <span className="text-emerald-400">Services</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-20">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
            <Zap size={16} />
            <span>Available for Enterprise Engagements</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Excellence</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            I architect, design, and deploy high-performance SaaS platforms, enterprise systems, and algorithmic interfaces. Turn your complex vision into a scalable reality.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Tier 1: UI/UX & Frontend */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-colors flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Smartphone size={120} />
            </div>
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl mb-6 ring-1 ring-cyan-500/20 w-fit">
              <Smartphone size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Frontend & UI/UX</h2>
            <div className="text-3xl font-bold text-slate-200 mb-6 flex items-baseline gap-2">
              $2,500 <span className="text-sm font-normal text-slate-500">starting at</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              High-frequency, pixel-perfect frontend engineering using React, Next.js, and Tailwind CSS.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {['Design System Architecture', 'Interactive Web Apps', 'Performance Optimization', 'Figma to React Conversion'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700">
              Request Quote
            </button>
          </div>

          {/* Tier 2: Full-Stack SaaS (Featured) */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900/80 border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(52,211,153,0.1)] group transform md:-translate-y-4 flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Code2 size={120} />
            </div>
            <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-500/30">
              Most Popular
            </div>

            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-6 ring-1 ring-emerald-500/20 w-fit">
              <Code2 size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Full-Stack SaaS</h2>
            <div className="text-3xl font-bold text-emerald-400 mb-6 flex items-baseline gap-2">
              $8,500 <span className="text-sm font-normal text-slate-500">starting at</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Complete end-to-end development of robust SaaS applications with modern authentication and billing.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {['Next.js / Node.js Backend', 'Supabase / PostgreSQL DB', 'Stripe Billing Integration', 'Row Level Security (RLS)', 'Admin Dashboard Included'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              Start Project
            </button>
          </div>

          {/* Tier 3: Enterprise Architecture */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-colors flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Server size={120} />
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl mb-6 ring-1 ring-indigo-500/20 w-fit">
              <Server size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">System Architecture</h2>
            <div className="text-3xl font-bold text-slate-200 mb-6 flex items-baseline gap-2">
              $15k+ <span className="text-sm font-normal text-slate-500">custom quote</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Scalable infrastructure design and microservices orchestration for high-traffic environments.
            </p>
            <ul className="space-y-4 mb-8 flex-1">
              {['Docker / Kubernetes Setup', 'Cloudflare R2 / AWS S3', 'Load Balancing & Caching', 'Real-time WebSocket Servers'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={18} className="text-indigo-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700">
              Contact Sales
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-800/50 bg-[#0D0F14]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Arwan Consulting Services &copy; {new Date().getFullYear()}. All engagements are subject to availability.
          </p>
        </div>
      </footer>
    </div>
  );
}
