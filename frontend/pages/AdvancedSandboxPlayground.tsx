import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const DEMO_TOKEN = 'demo-auth-token-123';

// Example OpenAPI endpoints (replace with dynamic fetch if needed)
const OPENAPI_SPEC = [
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
          js: `fetch('https://api.velora/sandbox/wallets/0x123/balance', {
  headers: { Authorization: 'Bearer demo-auth-token-123' }
}).then(res => res.json())`,
          python: `import requests
resp = requests.get('https://api.velora/sandbox/wallets/0x123/balance', headers={"Authorization": "Bearer demo-auth-token-123"})
print(resp.json())`
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
          js: `fetch('https://api.velora/sandbox/transactions/send', {
  method: 'POST',
  headers: { Authorization: 'Bearer demo-auth-token-123', 'Content-Type': 'application/json' },
  body: JSON.stringify({ from: '0x123', to: '0x456', amount: 1.5 })
}).then(res => res.json())`,
          python: `import requests
resp = requests.post('https://api.velora/sandbox/transactions/send',
  headers={"Authorization": "Bearer demo-auth-token-123"},
  json={"from": "0x123", "to": "0x456", "amount": 1.5})
print(resp.json())`
        }
      }
    ]
  }
];

export default function AdvancedSandboxPlayground() {
  const [tagIndex, setTagIndex] = useState(0);
  const [endpointIndex, setEndpointIndex] = useState(0);
  const [params, setParams] = useState({});
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [snippetLang, setSnippetLang] = useState<'js' | 'python'>('js');
  const [copied, setCopied] = useState(false);

  // Update params on endpoint change
  useEffect(() => {
    const endpoint = OPENAPI_SPEC[tagIndex].endpoints[endpointIndex];
    // Set default param values
    let newParams = {};
    endpoint.params.forEach(p => newParams[p.name] = '');
    setParams(newParams);
    setRequestBody(endpoint.body || '');
    setResponse('');
  }, [tagIndex, endpointIndex]);

  // Build URL with param substitution
  function buildUrl(path: string) {
    let url = path;
    Object.entries(params).forEach(([key, val]) => {
      url = url.replace(`{${key}}`, val || `{${key}}`);
    });
    return 'https://api.velora/sandbox' + url;
  }

  // Handle API request
  async function handleSendRequest() {
    setLoading(true);
    setResponse('');
    try {
      const endpoint = OPENAPI_SPEC[tagIndex].endpoints[endpointIndex];
      const url = buildUrl(endpoint.path);
      const options: any = {
        method: endpoint.method,
        headers: { Authorization: `Bearer ${DEMO_TOKEN}` }
      };
      if (endpoint.method === 'POST') {
        options.headers['Content-Type'] = 'application/json';
        options.body = requestBody;
      }
      // For demo: replace with actual fetch or mock as needed
      const mockResponse = endpoint.label === 'Get Wallet Balance'
        ? { balance: 123.45, currency: 'ETH' }
        : { txHash: '0xTXDEMO', status: 'success' };
      await new Promise(res => setTimeout(res, 700));
      setResponse(JSON.stringify(mockResponse, null, 2));
    } catch (err: any) {
      setResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const endpoint = OPENAPI_SPEC[tagIndex].endpoints[endpointIndex];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-2">Advanced Sandbox Playground</h2>
          <p className="text-gray-600">Coba API/SDK VeloraChain dengan autentikasi demo, multi-language, dan builder otomatis.</p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-3">
            <div>
              <label className="block font-medium mb-1">Kategori</label>
              <select
                value={tagIndex}
                onChange={e => { setTagIndex(Number(e.target.value)); setEndpointIndex(0); }}
                className="border rounded px-2 py-1"
              >
                {OPENAPI_SPEC.map((tag, idx) => (
                  <option value={idx} key={tag.tag}>{tag.tag}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Endpoint</label>
              <select
                value={endpointIndex}
                onChange={e => setEndpointIndex(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {OPENAPI_SPEC[tagIndex].endpoints.map((ep, idx) => (
                  <option value={idx} key={ep.label}>{ep.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">URL Endpoint</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={buildUrl(endpoint.path)}
              readOnly
            />
          </div>
          {endpoint.params.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-3">
              {endpoint.params.map(param => (
                <div key={param.name}>
                  <label className="block mb-1 font-medium">{param.name} {param.required && '*'}</label>
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={params[param.name]}
                    onChange={e => setParams({ ...params, [param.name]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          )}
          {endpoint.method === 'POST' && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Request Body</label>
              <MonacoEditor
                height="120px"
                language="json"
                value={requestBody}
                options={{ minimap: { enabled: false } }}
                onChange={v => setRequestBody(v ?? '')}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Autentikasi Token (Demo)</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={DEMO_TOKEN}
              readOnly
            />
          </div>
          <Button onClick={handleSendRequest} disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Request'}
          </Button>
          <div className="mt-6">
            <div className="flex gap-2 items-center">
              <label className="block font-medium mb-1">Response</label>
              <CopyToClipboard text={response} onCopy={() => {setCopied(true); setTimeout(()=>setCopied(false), 1500);}}>
                <Button size="sm">{copied ? "Copied!" : "Copy"}</Button>
              </CopyToClipboard>
            </div>
            <MonacoEditor
              height="120px"
              language="json"
              value={response}
              options={{ minimap: { enabled: false }, readOnly: true }}
            />
          </div>
          <div className="mt-8">
            <div className="flex gap-2 items-center mb-1">
              <label className="block font-medium">Kode Snippet</label>
              <select value={snippetLang} onChange={e => setSnippetLang(e.target.value as 'js' | 'python')}
                className="border rounded px-2 py-1 ml-2">
                <option value="js">JavaScript</option>
                <option value="python">Python</option>
              </select>
              <CopyToClipboard text={endpoint.languageSnippets[snippetLang]}>
                <Button size="sm">Copy</Button>
              </CopyToClipboard>
            </div>
            <MonacoEditor
              height="120px"
              language={snippetLang === 'js' ? 'javascript' : 'python'}
              value={endpoint.languageSnippets[snippetLang]}
              options={{ minimap: { enabled: false }, readOnly: true }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
        }
