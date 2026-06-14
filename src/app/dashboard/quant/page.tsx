"use client";

import React, { useState } from 'react';
import AlgorithmFleet from '@/components/quant/AlgorithmFleet';
import TerminalChart from '@/components/quant/TerminalChart';
import OrderFeed from '@/components/quant/OrderFeed';
import LiveApiManager from '@/components/quant/LiveApiManager';
import { Activity, Lock, Settings, BarChart2 } from 'lucide-react';

export default function QuantEnterprisePage() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'api'>('terminal');

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Navbar for Terminal */}
      <header className="h-12 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 bg-[#000000]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm tracking-widest uppercase">
            <Activity size={16} /> Quant Enterprise
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <nav className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 text-xs font-semibold rounded uppercase tracking-wider transition-colors ${activeTab === 'terminal' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <BarChart2 size={14} className="inline mr-1" /> Terminal
            </button>
            <button 
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1 text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center gap-1 ${activeTab === 'api' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Settings size={14} /> Integrations <Lock size={12} className="text-slate-600" />
            </button>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SIMULATION ACTIVE</div>
          <div className="h-4 w-px bg-slate-800" />
          <div>BTC/USDT 64,230.50</div>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'terminal' ? (
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-800">
          {/* Left Pane: Algorithm Fleet */}
          <div className="lg:col-span-3 bg-[#000000] flex flex-col overflow-hidden">
            <AlgorithmFleet />
          </div>
          
          {/* Center Pane: Charting */}
          <div className="lg:col-span-6 bg-[#000000] flex flex-col overflow-hidden relative">
            <TerminalChart />
          </div>
          
          {/* Right Pane: Order Feed & PnL */}
          <div className="lg:col-span-3 bg-[#000000] flex flex-col overflow-hidden">
            <OrderFeed />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden bg-[#000000] p-8 flex items-start justify-center">
          <LiveApiManager />
        </div>
      )}

      {/* Terminal Footer */}
      <footer className="h-8 border-t border-slate-800 flex items-center justify-between px-4 shrink-0 text-[10px] text-slate-600 font-mono bg-[#000000]">
        <div>SYSTEM: ARWAN OS v2.0</div>
        <div className="flex gap-4">
          <span>LATENCY: <span className="text-emerald-500">8ms</span></span>
          <span>© 2026 ARWAN ENGINEERING</span>
        </div>
      </footer>
    </div>
  );
}
