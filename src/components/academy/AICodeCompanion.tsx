"use client";
import React from 'react';
import { Sparkles, Lock, Terminal } from 'lucide-react';

interface AICodeCompanionProps {
  isPro: boolean;
}

export default function AICodeCompanion({ isPro }: AICodeCompanionProps) {
  return (
    <div className="h-full flex flex-col bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden relative">
      <div className="p-4 border-b border-slate-800/60 flex items-center gap-2 bg-slate-900/60 shrink-0">
        <Sparkles size={18} className="text-indigo-400" />
        <h3 className="font-semibold text-slate-200">AI Companion</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar relative">
        {!isPro ? (
          // Blur-to-Desire State
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[4px] bg-[#0D0F14]/60">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-4 border border-slate-700/50 shadow-xl">
              <Lock size={28} className="text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-200 mb-2 font-display">Pro Feature Locked</h4>
            <p className="text-slate-400 text-sm mb-6 max-w-[250px]">
              Unlock contextual AI code explanations, vibe-coding templates, and real-time pair programming.
            </p>
            <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-semibold transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Upgrade to Pro
            </button>
          </div>
        ) : null}

        {/* Mock Content (blurred if not pro) */}
        <div className={`space-y-4 ${!isPro ? 'opacity-30 blur-sm select-none' : ''}`}>
          <div className="bg-slate-800/50 p-3 rounded-xl rounded-tl-none inline-block max-w-[90%] border border-slate-700/30">
            <p className="text-sm text-slate-300">I noticed you are watching the &quot;Advanced State Machines&quot; chapter. Need me to explain the Matrix implementation?</p>
          </div>

          <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Terminal size={14} />
              <span className="text-xs font-mono">Suggested Snippet</span>
            </div>
            <pre className="text-xs font-mono text-slate-300 bg-[#0D0F14] p-3 rounded-lg overflow-x-auto">
              {`const stateMachine = {\n  idle: { \n    on: { FETCH: 'loading' }\n  }\n};`}
            </pre>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800/60 bg-slate-900/60 shrink-0">
        <input
          type="text"
          placeholder={isPro ? "Ask the companion..." : "Unlock to ask..."}
          disabled={!isPro}
          className="w-full bg-[#0D0F14] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
        />
      </div>
    </div>
  );
}
