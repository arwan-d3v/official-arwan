"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Server, TrendingUp, AlertCircle, Wifi } from 'lucide-react';
import { listenToKiroixTelemetry } from '@/lib/firebase';

interface TelemetryData {
  status: string;
  latency: number;
  lastTick: number;
  trend: {
    symbol: string;
    action: 'BUY' | 'SELL';
    timeframe: string;
    price: number | null;
    condition: string;
  };
}

const KiroiXTelemetry = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    status: 'Active',
    latency: 24,
    lastTick: Date.now() - 12000,
    trend: {
      symbol: 'EURUSD',
      action: 'BUY',
      timeframe: 'M1',
      price: null,
      condition: 'Bullish'
    }
  });

  const [timeAgo, setTimeAgo] = useState('12s ago');
  const [pingHistory, setPingHistory] = useState<number[]>([4, 6, 5, 8, 4, 3, 5, 4, 7, 5, 4]);

  useEffect(() => {
    // Subscribe to Firebase real-time telemetry updates
    const unsubscribe = listenToKiroixTelemetry((data) => {
      if (data) {
        const telemetryData = data as TelemetryData;
        setTelemetry(telemetryData);
        
        // Dynamically add new latency ping to history chart
        setPingHistory((prev) => {
          const nextHistory = [...prev.slice(1), Math.min(Math.max(Math.floor(telemetryData.latency / 4), 2), 10)];
          return nextHistory;
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const updateTimeAgo = () => {
      const elapsedMs = Date.now() - telemetry.lastTick;
      if (elapsedMs < 1000) {
        setTimeAgo('just now');
      } else {
        const seconds = Math.floor(elapsedMs / 1000);
        if (seconds < 60) {
          setTimeAgo(`${seconds}s ago`);
        } else {
          const minutes = Math.floor(seconds / 60);
          setTimeAgo(`${minutes}m ago`);
        }
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [telemetry.lastTick]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-background border border-secondary/30 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Header / Top Bar */}
      <div className="bg-secondary/20 border-b border-secondary/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="text-primary animate-pulse" size={24} />
          <h3 className="text-lg font-bold text-foreground">KiroiX EA Telemetry</h3>
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
            LIVE MT5
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="font-medium">Connected</span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Status Agen AI */}
        <div className="bg-secondary/10 rounded-xl p-5 border border-secondary/20 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
          <div className="flex items-center gap-2 text-foreground/60 mb-2">
            <Server size={16} />
            <span className="text-sm font-medium">AI Agent Status</span>
          </div>
          <div className="text-3xl font-bold text-foreground mt-1">{telemetry.status}</div>
          <div className="mt-4 text-xs text-foreground/50 flex items-center gap-1 font-mono">
            <AlertCircle size={12} />
            Last tick: {timeAgo}
          </div>
        </div>

        {/* Broker Latency */}
        <div className="bg-secondary/10 rounded-xl p-5 border border-secondary/20 flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-2 text-foreground/60 mb-2">
            <Wifi size={16} />
            <span className="text-sm font-medium">Broker Latency</span>
          </div>
          <div className="text-3xl font-bold text-foreground flex items-baseline gap-1 mt-1">
            {telemetry.latency} <span className="text-sm font-normal text-foreground/50">ms</span>
          </div>
          {/* Mock Ping Chart Line */}
          <div className="mt-4 flex items-end gap-1 h-8 opacity-70">
            {pingHistory.map((h, i) => (
              <div key={i} className="w-full bg-primary/40 rounded-t-sm transition-all duration-300" style={{ height: `${h * 10}%` }}></div>
            ))}
          </div>
        </div>

        {/* Trend Filter (EMA 200) */}
        <div className="bg-secondary/10 rounded-xl p-5 border border-primary/30 flex flex-col relative overflow-hidden shadow-[0_0_15px_rgba(var(--primary),0.1)]">
          <div className="flex items-center gap-2 text-primary mb-2">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Trend Filter</span>
          </div>

          <div className="mt-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-xs text-foreground/70 mb-1">Current Reading</div>
            <div className="text-lg font-bold text-primary flex items-center gap-2">
              {telemetry.trend.symbol} ({telemetry.trend.timeframe})
              <span className={`px-2 py-0.5 text-xs rounded uppercase tracking-wider font-semibold ${
                telemetry.trend.action === 'BUY' 
                  ? 'bg-emerald-500/20 text-emerald-500' 
                  : 'bg-rose-500/20 text-rose-500'
              }`}>
                {telemetry.trend.condition}
              </span>
            </div>
          </div>

          <div className="mt-3 text-xs text-foreground/60">
            Condition: Price {telemetry.trend.action === 'BUY' ? '>' : '<'} EMA
          </div>
        </div>

      </div>
    </div>
  );
};

export default KiroiXTelemetry;
