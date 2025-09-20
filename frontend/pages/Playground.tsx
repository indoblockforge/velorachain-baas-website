import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Button } from '@/components/ui/Button';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function Playground() {
  const [spec, setSpec] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [editorValue, setEditorValue] = useState('// Write your code here');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSpec() {
      const res = await fetch('/api/openapi-spec');
      const data = await res.json();
      setSpec(data);
    }
    fetchSpec();
  }, []);

  async function handleTryItOut() {
    setLoading(true);
    setResponse('');
    try {
      // Call backend with editorValue (simulate running code)
      const res = await fetch('/api/playground-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: editorValue, endpoint: selectedEndpoint }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Playground API/SDK & Dokumentasi Interaktif</h1>
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Swagger/OpenAPI Spec (Try-it-out)</h2>
        {spec && <SwaggerUI spec={spec} />}
      </div>
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Live Code Editor</h2>
        <select
          className="border rounded px-2 py-1 mb-2"
          value={selectedEndpoint}
          onChange={e => setSelectedEndpoint(e.target.value)}
        >
          <option value="">Pilih Endpoint</option>
          {spec?.paths && Object.keys(spec.paths).map(ep => (
            <option value={ep} key={ep}>{ep}</option>
          ))}
        </select>
        <MonacoEditor
          height="180px"
          language="javascript"
          value={editorValue}
          onChange={v => setEditorValue(v ?? '')}
        />
        <Button className="mt-2" onClick={handleTryItOut} disabled={loading || !selectedEndpoint}>
          {loading ? 'Running...' : 'Run & Try'}
        </Button>
        <div className="mt-4">
          <label className="font-medium">Response:</label>
          <pre className="bg-gray-100 rounded p-4 text-sm">{response || 'Belum ada response.'}</pre>
        </div>
      </div>
    </div>
  );
}