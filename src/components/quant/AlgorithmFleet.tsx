"use client";

import React, { useState } from 'react';
import { Play, Square, Settings2, Cpu, Zap } from 'lucide-react';

export default function AlgorithmFleet() {
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="flex flex-col h-full bg-[#000000] border-r border-slate-800 text-slate-300 font-mono">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Cpu size={14} /> Algorithm Fleet
        </h2>
        <div className="text-[10px] text-slate-600 bg-slate-900 px-2 py-0.5 rounded">1 / 5 BOTS</div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
        {/* Active Bot: MACD Scalper */}
        <div className={`border rounded-lg p-4 transition-all duration-300 ${isRunning ? 'border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-slate-800 bg-slate-900/50'}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm ${isRunning ? 'text-emerald-400' : 'text-slate-300'}`}>MACD Scalper v2</h3>
                {isRunning && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">PAIR: BTC/USDT (Paper)</div>
            </div>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <Settings2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-[#000000] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-500 mb-1">REALIZED PnL</div>
              <div className="text-sm font-bold text-emerald-400">+$245.50</div>
            </div>
            <div className="bg-[#000000] p-2 rounded border border-slate-800">
              <div className="text-[10px] text-slate-500 mb-1">WIN RATE</div>
              <div className="text-sm font-bold text-slate-300">68.2%</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-1.5 flex items-center justify-center gap-2 text-xs font-bold rounded transition-colors ${isRunning ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}
            >
              {isRunning ? <><Square size={12} fill="currentColor" /> STOP</> : <><Play size={12} fill="currentColor" /> START</>}
            </button>
          </div>
        </div>

        {/* Locked Pro Bots (Blur to desire simulation) */}
        <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/30 opacity-60">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-500">Arbitrage Engine</h3>
                <Zap size={12} className="text-indigo-400" />
              </div>
              <div className="text-[10px] text-slate-600 mt-1">PRO TIER REQUIRED</div>
            </div>
          </div>
          <button className="w-full py-1.5 bg-slate-800/50 text-slate-500 text-xs font-bold rounded border border-slate-700/50">
            UNLOCK ALGO
          </button>
        </div>
      </div>
    </div>
  );
}
