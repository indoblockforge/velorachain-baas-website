import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    res.status(200).json(joke);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch joke.' });
  }
}