              import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const DEMO_TOKENS = [
  { label: 'Demo Token 1', value: 'demo-auth-token-123' },
  { label: 'Demo Token 2', value: 'demo-auth-token-456' },
  { label: 'Demo Token 3', value: 'demo-auth-token-789' },
];

// Dummy login function; ganti ke autentikasi backend Anda
async function loginUser(username: string, password: string) {
  // Simulasi login: replace with real login API
  if (username === 'sandbox' && password === 'sandbox123') {
    return { name: 'Sandbox User', email: 'sandbox@demo.com', token: 'user-session-xyz' };
  }
  throw new Error('Login gagal!');
}

export default function AdvancedSandboxPlayground() {
  const [spec, setSpec] = useState<any[]>([]);
  const [tagIndex, setTagIndex] = useState(0);
  const [endpointIndex, setEndpointIndex] = useState(0);
  const [params, setParams] = useState({});
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [snippetLang, setSnippetLang] = useState<'js' | 'python'>('js');
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState(DEMO_TOKENS[0].value);

  // User auth state
  const [user, setUser] = useState<{name: string, email: string, token: string} | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Auto-fetch OpenAPI spec from backend
  useEffect(() => {
    async function fetchSpec() {
      const res = await fetch('/api/sandbox-spec');
      const data = await res.json();
      setSpec(data.tags || []);
    }
    fetchSpec();
  }, []);

  // Update params on endpoint change
  useEffect(() => {
    if (spec.length === 0) return;
    const endpoint = spec[tagIndex]?.endpoints[endpointIndex];
    let newParams = {};
    endpoint?.params?.forEach((p: any) => newParams[p.name] = '');
    setParams(newParams);
    setRequestBody(endpoint?.body || '');
    setResponse('');
  }, [spec, tagIndex, endpointIndex]);

  function buildUrl(path: string) {
    let url = path;
    Object.entries(params).forEach(([key, val]) => {
      url = url.replace(`{${key}}`, val || `{${key}}`);
    });
    return url;
  }

  // Real request to backend proxy, with user authentication
  async function handleSendRequest() {
    if (!user) return;
    setLoading(true);
    setResponse('');
    try {
      const endpoint = spec[tagIndex].endpoints[endpointIndex];
      const url = buildUrl(endpoint.path);
      const proxyUrl = `/api/sandbox-proxy?endpoint=${encodeURIComponent(url)}`;
      let fetchOptions: RequestInit = {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-User-Session': user.token // custom header untuk session user
        }
      };
      if (endpoint.method === 'POST') {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Content-Type': 'application/json'
        };
        fetchOptions.body = requestBody;
      }
      const res = await fetch(proxyUrl, fetchOptions);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    try {
      const u = await loginUser(loginForm.username, loginForm.password);
      setUser(u);
    } catch (err: any) {
      setLoginError(err.message);
    }
  }

  if (!user) {
    return (
      <div className="max-w-sm mx-auto py-16">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold mb-2">Login User Sandbox</h2>
            <p className="text-gray-600">Login untuk menggunakan Playground API/SDK.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Username</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="text"
                  value={loginForm.username}
                  onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                  autoFocus
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Password</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="password"
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              {loginError && <div className="text-red-600">{loginError}</div>}
              <Button type="submit">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!spec.length) return <div className="p-8 text-gray-600">Loading API Spec ...</div>;
  const endpoint = spec[tagIndex].endpoints[endpointIndex];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-2">Advanced Sandbox Playground</h2>
          <p className="text-gray-600">Coba API/SDK VeloraChain dengan backend integrasi, multi-token demo, endpoint auto-fetch, dan autentikasi user.</p>
          <div className="mt-2 text-xs text-blue-600">Login sebagai: {user.name} ({user.email})</div>
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
                {spec.map((tag, idx) => (
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
                {spec[tagIndex].endpoints.map((ep: any, idx: number) => (
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
              {endpoint.params.map((param: any) => (
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
            <select
              className="border rounded px-3 py-2 w-full"
              value={token}
              onChange={e => setToken(e.target.value)}
            >
              {DEMO_TOKENS.map(t => (
                <option value={t.value} key={t.value}>{t.label}</option>
              ))}
            </select>
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
