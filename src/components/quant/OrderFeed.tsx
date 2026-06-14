"use client";

import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface Order {
  id: number;
  type: 'BUY' | 'SELL';
  price: string;
  amount: string;
  time: string;
}

export default function OrderFeed() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Generate initial mock orders
    const initialOrders: Order[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() - i * 1000,
      type: Math.random() > 0.5 ? 'BUY' : 'SELL',
      price: (64200 + Math.random() * 50).toFixed(2),
      amount: (Math.random() * 2).toFixed(4),
      time: new Date(Date.now() - i * 1000).toLocaleTimeString([], { hour12: false })
    }));
    setOrders(initialOrders);

    // Simulate incoming high frequency orders
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: Date.now(),
        type: Math.random() > 0.45 ? 'BUY' : 'SELL',
        price: (64200 + Math.random() * 50).toFixed(2),
        amount: (Math.random() * 2).toFixed(4),
        time: new Date().toLocaleTimeString([], { hour12: false })
      };
      
      setOrders(prev => [newOrder, ...prev].slice(0, 30));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#000000] text-slate-300 font-mono text-[10px] md:text-xs">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <List size={14} /> Live Feed
        </h2>
      </div>

      <div className="flex-1 overflow-y-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-2 px-4 py-2 border-b border-slate-800/50 text-slate-500 font-bold shrink-0">
          <div>PRICE(USDT)</div>
          <div className="text-right">AMOUNT(BTC)</div>
          <div className="text-right">TIME</div>
        </div>

        {/* Order Stream */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-2">
            {orders.map((order, i) => (
              <div 
                key={order.id} 
                className={`grid grid-cols-3 gap-2 px-2 py-1.5 hover:bg-slate-900 transition-colors ${i === 0 ? 'animate-in fade-in slide-in-from-top-2 duration-300 bg-slate-900/50' : ''}`}
              >
                <div className={`font-bold ${order.type === 'BUY' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {order.price}
                </div>
                <div className="text-right text-slate-300">{order.amount}</div>
                <div className="text-right text-slate-500">{order.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* PnL Footer Matrix */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/30 shrink-0">
        <div className="text-slate-500 mb-2 font-bold tracking-wider">UNREALIZED PnL</div>
        <div className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
          +$892.40 <span className="text-xs bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400">+1.2%</span>
        </div>
      </div>
    </div>
  );
}
