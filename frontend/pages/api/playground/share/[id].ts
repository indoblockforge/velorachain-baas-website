import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Missing id' });

  try {
    const snippet = await prisma.playgroundSnippet.findUnique({ where: { id } });
    if (!snippet) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ request: snippet.request, response: snippet.response, createdAt: snippet.createdAt });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}