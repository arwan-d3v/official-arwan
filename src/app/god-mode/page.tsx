"use client";

import React from 'react';
import { TerminalSquare, DollarSign, Activity, Server, Database, Globe, Power } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GodModePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div>
          <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
            <TerminalSquare size={28} />
            <h1 className="text-3xl font-bold uppercase tracking-widest text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">God Mode</h1>
          </div>
          <p className="text-slate-400 font-sans">Owner Command Center & Global Revenue Matrix.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System: Optimal
          </div>
        </div>
      </div>

      {/* Global Revenue Matrix */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <DollarSign size={20} className="text-[#D4AF37]" /> Global Revenue Matrix
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Unified Total */}
          <Card className="bg-[#D4AF37]/5 border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.05)] md:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="text-[#D4AF37] uppercase tracking-wider font-semibold">Unified Total MRR</CardDescription>
              <CardTitle className="text-4xl text-white font-sans font-extrabold">$12,450.00</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-emerald-400 flex items-center gap-1 mt-2">
                <Activity size={14} /> +15.4% from last month
              </div>
            </CardContent>
          </Card>

          {/* Local IDR */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400 uppercase tracking-wider font-semibold flex justify-between items-center">
                <span>Local Gateway (QRIS)</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">IDR</span>
              </CardDescription>
              <CardTitle className="text-2xl text-slate-200 font-sans font-bold">Rp 45.000.000</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-slate-500 mt-2">
                Approx. $2,850.00 USD
              </div>
            </CardContent>
          </Card>

          {/* International USD */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-slate-400 uppercase tracking-wider font-semibold flex justify-between items-center">
                <span>Intl. Gateway (Stripe)</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">USD</span>
              </CardDescription>
              <CardTitle className="text-2xl text-slate-200 font-sans font-bold">$9,600.00</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-slate-500 mt-2">
                Global recurring subscriptions
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Master System Toggles */}
      <section className="space-y-4 pt-8">
        <h2 className="text-xl font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Server size={20} className="text-[#D4AF37]" /> Master System Controls
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-40 group hover:border-red-500/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-slate-300 uppercase">M1: Nexus Signups</div>
                <div className="text-xs text-slate-500 mt-1 font-sans">Pause new CV Builder registrations.</div>
              </div>
              <Database size={20} className="text-slate-600" />
            </div>
            <button className="w-full py-2 bg-slate-800 text-slate-300 text-sm font-bold hover:bg-red-500/20 hover:text-red-400 transition-colors rounded">
              FORCE PAUSE
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-40 group hover:border-[#D4AF37]/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-slate-300 uppercase">M2: Quant Trading</div>
                <div className="text-xs text-slate-500 mt-1 font-sans">Force sync Binance/Bybit API keys.</div>
              </div>
              <Globe size={20} className="text-slate-600" />
            </div>
            <button className="w-full py-2 bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/20 text-sm font-bold hover:bg-[#D4AF37]/20 transition-colors rounded">
              SYNC APIs
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-40 group hover:border-slate-600 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-slate-300 uppercase">Maintenance Mode</div>
                <div className="text-xs text-slate-500 mt-1 font-sans">Takes entire Mega-Platform offline.</div>
              </div>
              <Power size={20} className="text-slate-600" />
            </div>
            <button className="w-full py-2 bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors rounded">
              ENABLE
            </button>
          </div>

        </div>
      </section>

      {/* Signature Arwan Footer - Pro/Terminal Variant */}
      <footer className="mt-16 pt-4 border-t border-[#D4AF37]/20 text-xs text-[#D4AF37]/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>&copy; 2026 Arwan Engineering &bull; Institutional Tier</div>
        <div className="flex gap-4">
          <span>Latency: <span className="text-emerald-500">12ms</span></span>
          <span>Time (UTC): <span className="text-slate-300">{new Date().toISOString().slice(11, 19)}</span></span>
        </div>
      </footer>
    </div>
  );
}
