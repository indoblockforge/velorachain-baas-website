import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // payload = btoa(JSON.stringify({request, response}))
  const payload = req.query.payload as string;
  if (!payload) return res.status(400).json({ error: "Missing payload" });

  try {
    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: "Invalid payload" });
  }
}