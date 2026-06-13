import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import { TradingViewWebhookPayload } from './types';

// Broadcaster function to write TradingView alert payload to Firebase Real-time DB
export async function broadcastToFirebase(payload: TradingViewWebhookPayload): Promise<void> {
  const telemetryRef = ref(db, 'kiroix/telemetry');
  
  const telemetryData = {
    status: 'Active',
    latency: Math.floor(Math.random() * 20) + 10, // Dynamic simulated latency (10ms - 30ms)
    lastTick: Date.now(),
    trend: {
      symbol: payload.symbol,
      action: payload.action,
      timeframe: payload.timeframe,
      price: payload.price || null,
      condition: payload.action === 'BUY' ? 'Bullish' : 'Bearish'
    }
  };

  try {
    await set(telemetryRef, telemetryData);
    console.log('[Firebase Broadcaster] Broadcasted to Firebase successfully:', telemetryData);
  } catch (error) {
    console.error('[Firebase Broadcaster] Failed to broadcast payload to Firebase:', error);
    throw error;
  }
}
