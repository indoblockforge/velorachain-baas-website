import type { NextApiRequest, NextApiResponse } from 'next';

// Contoh static, bisa digenerate dari OpenAPI spec backend
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    tags: [
      {
        tag: 'Wallet',
        endpoints: [
          {
            label: 'Get Wallet Balance',
            method: 'GET',
            path: '/wallets/{address}/balance',
            params: [{ name: 'address', type: 'string', required: true }],
            body: null,
            languageSnippets: {
              js: `fetch('/api/sandbox-proxy?endpoint=/wallets/0x123/balance', { headers: { Authorization: 'Bearer demo-auth-token-123' } }).then(res => res.json())`,
              python: `import requests\nresp = requests.get('https://api.velora/sandbox/wallets/0x123/balance', headers={"Authorization": "Bearer demo-auth-token-123"})\nprint(resp.json())`
            }
          }
        ]
      },
      {
        tag: 'Transaction',
        endpoints: [
          {
            label: 'Send Transaction',
            method: 'POST',
            path: '/transactions/send',
            params: [],
            body: '{ "from": "0x123", "to": "0x456", "amount": 1.5 }',
            languageSnippets: {
              js: `fetch('/api/sandbox-proxy?endpoint=/transactions/send', { method: 'POST', headers: { Authorization: 'Bearer demo-auth-token-123', 'Content-Type': 'application/json' }, body: JSON.stringify({ from: '0x123', to: '0x456', amount: 1.5 }) }).then(res => res.json())`,
              python: `import requests\nresp = requests.post('https://api.velora/sandbox/transactions/send', headers={"Authorization": "Bearer demo-auth-token-123"}, json={"from": "0x123", "to": "0x456", "amount": 1.5})\nprint(resp.json())`
            }
          }
        ]
      }
    ]
  });
}
