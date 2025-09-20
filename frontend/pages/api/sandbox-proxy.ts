import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next';

const VELORA_API_BASE = 'https://api.velora/sandbox';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validasi session user
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ error: 'Unauthorized: Please login!' });

  const { endpoint } = req.query;
  const method = req.method || 'GET';
  const url = `${VELORA_API_BASE}${endpoint}`;
  const headers: any = {
    Authorization: `Bearer ${token.accessToken || ''}`,
    'Content-Type': 'application/json',
  };

  try {
    const fetchOptions: RequestInit = {
      method,
      headers,
    };
    if (method === 'POST') {
      fetchOptions.body = req.body && typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
        }
