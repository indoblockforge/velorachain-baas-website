import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function AdvancedSandboxPlayground() {
  const { data: session, status } = useSession();
  const [spec, setSpec] = useState<any[]>([]);
  const [tagIndex, setTagIndex] = useState(0);
  const [endpointIndex, setEndpointIndex] = useState(0);
  const [params, setParams] = useState({});
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [snippetLang, setSnippetLang] = useState<'js' | 'python'>('js');
  const [copied, setCopied] = useState(false);

  // Fetch OpenAPI spec from backend
  useEffect(() => {
    async function fetchSpec() {
      const res = await fetch('/api/sandbox-spec');
      const data = await res.json();
      setSpec(data.tags || []);
    }
    fetchSpec();
  }, []);

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

  // Request to backend proxy with session
  async function handleSendRequest() {
    if (!session?.accessToken) return;
    setLoading(true);
    setResponse('');
    try {
      const endpoint = spec[tagIndex].endpoints[endpointIndex];
      const url = buildUrl(endpoint.path);
      const proxyUrl = `/api/sandbox-proxy?endpoint=${encodeURIComponent(url)}`;
      let fetchOptions: RequestInit = {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
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

  // Auth state
  if (status === 'loading') return <div>Loading session...</div>;
  if (!session) {
    return (
      <div className="max-w-sm mx-auto py-16">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold mb-2">Login untuk Playground API/SDK</h2>
            <p className="text-gray-600">Gunakan akun Google/GitHub untuk login.</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => signIn()}>Login dengan OAuth</Button>
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
          <p className="text-gray-600">Coba API/SDK VeloraChain dengan login OAuth, session aman, dan endpoint auto-fetch.</p>
          <div className="mt-2 text-xs text-blue-600">
            Login sebagai: {session.user?.name} ({session.user?.email}) &nbsp;
            <Button size="sm" onClick={() => signOut()}>Logout</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* ... endpoint builder & playground UI seperti contoh sebelumnya ... */}
        </CardContent>
      </Card>
    </div>
  );
}