import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { request, response } = req.body;
  if (!request || !response) return res.status(400).json({ error: 'Missing request/response' });

  try {
    const snippet = await prisma.playgroundSnippet.create({
      data: { request, response }
    });
    const shareUrl = `${req.headers.origin || ''}/playground/share/${snippet.id}`;
    res.status(200).json({ id: snippet.id, url: shareUrl });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}