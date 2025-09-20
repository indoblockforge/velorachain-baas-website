import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const PRESET_REQUESTS = [
  {
    label: 'Wallet Balance',
    endpoint: '/wallets/{address}/balance',
    method: 'GET',
    params: [{ name: 'address', type: 'string', required: true }],
    body: null
  },
  {
    label: 'Send Token',
    endpoint: '/wallets/send',
    method: 'POST',
    params: [],
    body: '{ "from": "0x123", "to": "0x456", "amount": 10 }'
  },
  {
    label: 'Contract Stats',
    endpoint: '/contracts/{address}/stats',
    method: 'GET',
    params: [{ name: 'address', type: 'string', required: true }],
    body: null
  }
];

function generateShareableUrl(request: any, response: any) {
  // Simple hash-based share, in real production use a backend + DB
  const payload = btoa(JSON.stringify({ request, response }));
  return `${window.location.origin}/playground/share/${payload}`;
}

export default function PlaygroundBuilder() {
  const { data: session } = useSession();
  const [presetIndex, setPresetIndex] = useState(0);
  const [params, setParams] = useState({});
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  useEffect(() => {
    const preset = PRESET_REQUESTS[presetIndex];
    let newParams: any = {};
    preset.params.forEach(p => newParams[p.name] = '');
    setParams(newParams);
    setRequestBody(preset.body || '');
    setResponse(null);
    setShareUrl(null);
  }, [presetIndex]);

  function buildUrl(path: string) {
    let url = path;
    Object.entries(params).forEach(([key, val]) => {
      url = url.replace(`{${key}}`, val || `{${key}}`);
    });
    return url;
  }

  async function handleSendRequest() {
    setLoading(true);
    setResponse(null);
    setShareUrl(null);
    try {
      const preset = PRESET_REQUESTS[presetIndex];
      const url = buildUrl(preset.endpoint);
      const proxyUrl = `/api/sandbox-proxy?endpoint=${encodeURIComponent(url)}`;
      let fetchOptions: RequestInit = {
        method: preset.method,
        headers: {
          'Content-Type': 'application/json',
          ...(session?.accessToken && { Authorization: `Bearer ${session.accessToken}` }),
        }
      };
      if (preset.method === 'POST') fetchOptions.body = requestBody;
      const res = await fetch(proxyUrl, fetchOptions);
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    const preset = PRESET_REQUESTS[presetIndex];
    const shareUrl = generateShareableUrl(
      { endpoint: buildUrl(preset.endpoint), method: preset.method, params, body: requestBody },
      response
    );
    setShareUrl(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // Simple chart: contract stats response shape: { stats: { txCount: 10, holderCount: 5, ... } }
  function renderChart() {
    if (!response || !response.stats) return null;
    const labels = Object.keys(response.stats);
    const data = Object.values(response.stats);
    return (
      <div className="my-4">
        <Bar
          data={{
            labels,
            datasets: [{ label: 'Stats', data, backgroundColor: 'rgba(54,162,235,0.6)' }]
          }}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-2">Playground Request Builder</h2>
          <p className="text-gray-600">Pilih preset endpoint populer atau buat request custom.</p>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block font-medium mb-1">Preset Request</label>
            <select
              value={presetIndex}
              onChange={e => setPresetIndex(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {PRESET_REQUESTS.map((preset, idx) => (
                <option key={preset.label} value={idx}>{preset.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">URL Endpoint</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={buildUrl(PRESET_REQUESTS[presetIndex].endpoint)}
              readOnly
            />
          </div>
          {PRESET_REQUESTS[presetIndex].params.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-3">
              {PRESET_REQUESTS[presetIndex].params.map(param => (
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
          {PRESET_REQUESTS[presetIndex].method === 'POST' && (
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
          <Button onClick={handleSendRequest} disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Request'}
          </Button>

          {response && (
            <div className="mt-8">
              <label className="block font-medium mb-2">Visualisasi Response</label>
              <div className="mb-4">
                <MonacoEditor
                  height="150px"
                  language="json"
                  value={JSON.stringify(response, null, 2)}
                  options={{ minimap: { enabled: false }, readOnly: true }}
                />
              </div>
              {renderChart()}
              <div className="mt-4 flex gap-2 items-center">
                <Button size="sm" onClick={handleShare}>Share Snippet</Button>
                {shareUrl && (
                  <span className="text-xs break-all">
                    <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
                      <Button size="sm">{copied ? "Copied!" : "Copy Link"}</Button>
                    </CopyToClipboard>
                    <a href={shareUrl} target="_blank" rel="noopener" className="underline ml-2">Preview</a>
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}