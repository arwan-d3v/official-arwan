"use client";
import React, { useState } from 'react';
import VideoPlayer from '@/components/academy/VideoPlayer';
import AICodeCompanion from '@/components/academy/AICodeCompanion';
import { BookOpen, Code, Trophy, LayoutGrid, List } from 'lucide-react';

export default function AcademyPage() {
  // Simulate user tier for demonstration (true = Pro, false = Free)
  const [isProUser, setIsProUser] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const courseModules = [
    { id: 1, title: 'Vibe Coding Fundamentals', duration: '2h 15m', completed: true },
    { id: 2, title: 'Advanced State Machines', duration: '1h 45m', completed: false, active: true },
    { id: 3, title: 'Mega-Platform Architecture', duration: '3h 30m', completed: false },
    { id: 4, title: 'Enterprise Monetization Patterns', duration: '2h 00m', completed: false, proLocked: true },
  ];

  return (
    <div className="flex flex-col h-full gap-6 max-w-7xl mx-auto w-full">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <BookOpen size={20} />
            <span className="font-semibold uppercase tracking-wider text-xs">Tech Academy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-100">
            Immersive Learning
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm">
            Master the Arwan OS ecosystem. High-density video modules combined with contextual AI code companions.
          </p>
        </div>

        {/* Development Toggle (Hidden in production) */}
        <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-500 font-mono">Dev:</span>
          <button
            onClick={() => setIsProUser(!isProUser)}
            className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
              isProUser ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isProUser ? 'Pro Tier Active' : 'Free Tier'}
          </button>
        </div>
      </div>

      {/* Main Workspace - Theater Mode */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">

        {/* Left Column: Player & Meta */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">

          <div className="shrink-0">
            <VideoPlayer />
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-200 mb-2">Advanced State Machines</h2>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
              <span className="flex items-center gap-1"><BookOpen size={16} /> Module 2</span>
              <span className="flex items-center gap-1"><Code size={16} /> React/Next.js</span>
              <span className="flex items-center gap-1"><Trophy size={16} /> 150 XP</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              In this module, we dissect the Global State Machine Matrix used across the Arwan OS.
              Learn how to implement tactile feedback for all DOM interactions using the designated
              enterprise-grade micro-animations (e.g., emerald glows for success, crimson shakes for errors).
            </p>

            {/* Course Modules List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-200">Course Contents</h3>
                <div className="flex items-center gap-2 bg-[#0D0F14] rounded-lg p-1 border border-slate-800">
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}><List size={14} /></button>
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}><LayoutGrid size={14} /></button>
                </div>
              </div>

              <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {courseModules.map((mod, idx) => (
                  <div
                    key={mod.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      mod.active
                        ? 'bg-indigo-500/10 border-indigo-500/30'
                        : 'bg-[#0D0F14]/50 border-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                        mod.completed ? 'bg-emerald-500/20 text-emerald-400' :
                        mod.active ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {mod.completed ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${mod.active ? 'text-indigo-300' : 'text-slate-300'}`}>
                            {mod.title}
                          </p>
                          {mod.proLocked && !isProUser && (
                            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">Pro</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{mod.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Companion Panel */}
        <div className="lg:w-80 shrink-0 h-[600px] lg:h-auto">
          <AICodeCompanion isPro={isProUser} />
        </div>

      </div>
    </div>
  );
}
