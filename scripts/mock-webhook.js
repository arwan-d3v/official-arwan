const http = require('http');

const TARGET_URL = 'http://127.0.0.1:3000/api/tradingview';

function sendMockWebhook() {
  const symbols = ['EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD'];
  const timeframes = ['M1', 'M5', 'M15', 'H1'];
  
  const payload = JSON.stringify({
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    action: Math.random() > 0.5 ? 'BUY' : 'SELL',
    timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
    price: +(Math.random() * 2000).toFixed(5)
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  console.log(`[Mock Webhook] Sending: ${payload}`);

  const req = http.request(TARGET_URL, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(`[Response] ${res.statusCode}: ${data}\n`));
  });

  req.on('error', error => {
    console.error(`[Error] Failed to send webhook: ${error.message}`);
  });

  req.write(payload);
  req.end();
}

console.log('Starting KiroiX MT5 Webhook Simulator...');
// Send one immediately, then every 5 seconds
sendMockWebhook();
setInterval(sendMockWebhook, 5000);
