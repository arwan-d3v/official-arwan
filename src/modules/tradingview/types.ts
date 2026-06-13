export interface TradingViewWebhookPayload {
  symbol: string;
  action: 'BUY' | 'SELL';
  timeframe: string;
  price?: number;
  timestamp?: number;
}
