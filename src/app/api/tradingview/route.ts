import { NextRequest } from 'next/server';
import { handleTradingViewWebhook } from '@/modules/tradingview/webhook-receiver';

export async function POST(req: NextRequest) {
  return handleTradingViewWebhook(req);
}
