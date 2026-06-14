"use client";

import React from 'react';
import { Maximize2, BarChart2 } from 'lucide-react';

export default function TerminalChart() {
  // Generate random candlestick data for visual effect
  const candles = Array.from({ length: 40 }).map((_, i) => {
    const isGreen = Math.random() > 0.48;
    const height = 10 + Math.random() * 40;
    const wickTop = height + Math.random() * 15;
    const wickBottom = Math.random() * 15;
    const yOffset = 20 + Math.random() * 40;
    
    return { isGreen, height, wickTop, wickBottom, yOffset };
  });

  return (
    <div className="flex flex-col h-full bg-[#000000] border-r border-slate-800 relative group overflow-hidden">
      
      {/* Chart Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-[#000000] to-transparent">
        <div className="flex gap-4 items-center">
          <div className="font-bold text-slate-200">BTC/USDT</div>
          <div className="text-emerald-500 font-mono text-sm font-bold">64,230.50</div>
          <div className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">+2.45%</div>
        </div>
        <button className="text-slate-600 hover:text-slate-300 transition-colors">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Chart Grid Lines */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between opacity-10 pointer-events-none pt-16 pb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-px bg-slate-500" />
        ))}
      </div>
      <div className="absolute inset-0 z-0 flex justify-between opacity-10 pointer-events-none px-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-full w-px bg-slate-500" />
        ))}
      </div>

      {/* Candlesticks Visualization */}
      <div className="flex-1 flex items-end justify-between px-4 pb-12 pt-20 z-10 relative">
        {candles.map((candle, i) => (
          <div key={i} className="relative flex justify-center w-4 group-hover:opacity-80 transition-opacity">
            {/* Wick */}
            <div 
              className={`absolute w-px ${candle.isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} 
              style={{ 
                height: `${candle.wickTop + candle.wickBottom + candle.height}px`,
                bottom: `${candle.yOffset - candle.wickBottom}px` 
              }} 
            />
            {/* Body */}
            <div 
              className={`absolute w-3 rounded-sm ${candle.isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} 
              style={{ 
                height: `${candle.height}px`,
                bottom: `${candle.yOffset}px` 
              }} 
            />
          </div>
        ))}
        
        {/* Current Price Line */}
        <div className="absolute left-0 right-0 border-t border-dashed border-emerald-500/50 z-20 flex items-center justify-end" style={{ bottom: '45%' }}>
          <div className="bg-emerald-500 text-black text-[10px] font-bold px-1.5 py-0.5 font-mono">
            64,230.50
          </div>
        </div>
      </div>

      {/* Volume Bar Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-4 z-0 opacity-30">
         {candles.map((candle, i) => (
          <div 
            key={`vol-${i}`} 
            className={`w-2 mx-1 ${candle.isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} 
            style={{ height: `${Math.random() * 100}%` }} 
          />
        ))}
      </div>
      
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
        <BarChart2 size={200} />
      </div>
    </div>
  );
}
