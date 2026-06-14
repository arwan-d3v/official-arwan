"use client";

import React from 'react';
import { Lock, Key, Link2, ShieldAlert } from 'lucide-react';

export default function LiveApiManager() {
  return (
    <div className="w-full max-w-4xl relative min-h-[60vh] flex flex-col">
      
      {/* Background Content (Blurred) */}
      <div className="filter blur-md opacity-50 select-none pointer-events-none space-y-6 flex-1">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Exchange Integrations</h2>
          <p className="text-slate-400">Connect your live exchange accounts to the Arwan Quant Engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-800 rounded-xl bg-slate-900/50 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full" />
              <div>
                <div className="font-bold text-white">Binance Global</div>
                <div className="text-sm text-emerald-500">Connected</div>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">API Key</span>
                <span className="font-mono text-slate-300">xxxx-xxxx-xxxx-892A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Permissions</span>
                <span className="text-emerald-500">Read, Trade</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 border border-slate-800 rounded-xl bg-slate-900/50 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black border border-slate-700 rounded-full" />
              <div>
                <div className="font-bold text-white">Bybit V5</div>
                <div className="text-sm text-slate-500">Not Connected</div>
              </div>
            </div>
            <button className="w-full py-2 bg-slate-800 text-white rounded font-bold">Add API Key</button>
          </div>
        </div>
      </div>

      {/* Foreground Overlay (The Upsell Hook) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-8 md:p-10 rounded-3xl max-w-md text-center shadow-2xl flex flex-col items-center relative overflow-hidden">
          {/* Neon Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            <Lock size={28} className="text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4 font-display">Pro Tier Required</h3>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Live exchange integration is restricted to the <strong className="text-white">Quant Enterprise Pro</strong> tier. Upgrade now to connect Binance & Bybit API keys and execute real-time automated trades.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button className="w-full py-3.5 bg-white text-black font-bold rounded-xl hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <Key size={18} /> Unlock Live Trading ($49/mo)
            </button>
            <button className="w-full py-3.5 bg-transparent border border-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-800 transition-colors">
              Continue in Paper Trading
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
            <ShieldAlert size={14} className="text-slate-600" /> API Keys are always encrypted client-side.
          </div>
        </div>
      </div>

    </div>
  );
}
