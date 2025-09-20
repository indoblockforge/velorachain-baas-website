import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    tags: [
      {
        tag: "Wallet",
        endpoints: [
          {
            label: "Wallet Balance",
            method: "GET",
            path: "/wallets/{address}/balance",
            params: [{ name: "address", type: "string", required: true }],
            body: null,
            languageSnippets: {
              js: `fetch('/api/sandbox-proxy?endpoint=/wallets/0x123/balance')`,
              python: `import requests\nresp = requests.get('https://api.velora/sandbox/wallets/0x123/balance')\nprint(resp.json())`
            }
          },
          {
            label: "Send Token",
            method: "POST",
            path: "/wallets/send",
            params: [],
            body: '{ "from": "0x123", "to": "0x456", "amount": 10 }',
            languageSnippets: {
              js: `fetch('/api/sandbox-proxy?endpoint=/wallets/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ from: '0x123', to: '0x456', amount: 10 }) })`,
              python: `import requests\nresp = requests.post('https://api.velora/sandbox/wallets/send', json={"from": "0x123", "to": "0x456", "amount": 10})\nprint(resp.json())`
            }
          }
        ]
      },
      {
        tag: "Contract",
        endpoints: [
          {
            label: "Contract Stats",
            method: "GET",
            path: "/contracts/{address}/stats",
            params: [{ name: "address", type: "string", required: true }],
            body: null,
            languageSnippets: {
              js: `fetch('/api/sandbox-proxy?endpoint=/contracts/0xAAA/stats')`,
              python: `import requests\nresp = requests.get('https://api.velora/sandbox/contracts/0xAAA/stats')\nprint(resp.json())`
            }
          }
        ]
      }
    ]
  });
}