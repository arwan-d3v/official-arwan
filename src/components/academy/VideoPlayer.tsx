"use client";
import React, { useState } from 'react';
import { Play, Pause, Maximize, Volume2, Settings } from 'lucide-react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group border border-slate-800/60 shadow-2xl">
      {/* Video Placeholder */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        <span className="text-slate-600 font-display text-2xl tracking-widest uppercase">Cinematic Player</span>
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mb-4 cursor-pointer relative">
          <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full w-1/3" />
        </div>

        <div className="flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="hover:text-white transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="hover:text-white transition-colors">
              <Volume2 size={20} />
            </button>
            <span className="text-sm font-mono">12:34 / 45:00</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <button className="hover:text-white transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
