import { NextRequest, NextResponse } from 'next/server';
import { TradingViewWebhookPayload } from './types';
import { broadcastToFirebase } from './firebase-broadcaster';

// Stub function for Next.js API endpoint to listen to TradingView Alerts
// This is strictly an API layer function, isolated from the UI components.
export async function handleTradingViewWebhook(req: NextRequest) {
  try {
    const payload: TradingViewWebhookPayload = await req.json();
    
    // Validate payload
    if (!payload.symbol || !payload.action || !payload.timeframe) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Delegate broadcasting to Firebase
    await broadcastToFirebase(payload);

    return NextResponse.json({ success: true, message: 'Signal processed successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
