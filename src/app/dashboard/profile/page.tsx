"use client";

import React from 'react';
import { Shield, User, Lock, ExternalLink, Zap, LineChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UnifiedProfilePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-8">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-100 font-display tracking-tight">Unified Identity Hub</h1>
        <p className="text-slate-400 mt-2">Manage your profile, security, and global ecosystem subscriptions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Identity & Security */}
        <div className="md:col-span-1 space-y-8">
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
                <User size={18} className="text-indigo-400" /> Personal Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-2xl shadow-sm ring-2 ring-[#0D0F14]">
                  A
                </div>
                <div>
                  <div className="font-semibold text-slate-200">Arwan</div>
                  <div className="text-sm text-slate-500">Owner & Architect</div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Email Address</div>
                <div className="text-sm text-slate-300">arwan@official-arwan.info</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
                <Shield size={18} className="text-emerald-400" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">2FA Enabled</span>
                </div>
                <button className="text-xs text-slate-400 hover:text-white transition-colors">Manage</button>
              </div>
              <button className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 transition-colors">
                Change Password
              </button>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Subscriptions & Upsells */}
        <div className="md:col-span-2 space-y-8">
          
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-slate-200">Active Modules Matrix</CardTitle>
              <CardDescription className="text-slate-400">Your current access level across the Arwan OS.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">M1: Obsidian Nexus (CV Builder)</div>
                    <div className="text-sm text-slate-500">Pro Tier - Billed Annually</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Active</div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-700 text-slate-400 rounded-lg">
                    <Lock size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-400">M3: Tech Academy</div>
                    <div className="text-sm text-slate-500">Immersive Learning</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Locked</div>
              </div>

            </CardContent>
          </Card>

          {/* Blur-to-Desire Upsell: Quant Enterprise */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-black group">
            {/* Blurred background preview of trading dashboard */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 blur-[4px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-[#0D0F14]/80 to-transparent" />
            
            <div className="relative p-8 flex flex-col items-center justify-center text-center space-y-4 h-64">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <LineChart size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">M2: Quant Enterprise</h3>
              <p className="text-slate-300 max-w-md">
                High-frequency algorithmic trading terminal. Unlock live Binance API keys and the Dark Terminal workspace.
              </p>
              <button className="mt-4 px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-all flex items-center gap-2">
                <Lock size={16} /> Unlock Trading Hub ($49/mo)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Signature Arwan Footer - Dashboard Variant */}
      <footer className="mt-16 py-8 border-t border-slate-800/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <p className="text-slate-300 font-bold tracking-widest text-sm uppercase mb-2">Arwan OS</p>
            <p className="text-slate-500 text-xs leading-relaxed">
              Engineered & Copyrighted by Arwan &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
          <div className="col-span-1">
            <p className="text-slate-400 font-semibold mb-3 text-sm">Ecosystem</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Obsidian Nexus</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Quant Enterprise</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Tech Academy</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <p className="text-slate-400 font-semibold mb-3 text-sm">Resources</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">System Status</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <p className="text-slate-400 font-semibold mb-3 text-sm">Legal</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
