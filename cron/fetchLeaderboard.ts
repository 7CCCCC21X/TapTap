import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '../lib/redis'; // ✅ 正确

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { addresses } = req.body;

  if (!Array.isArray(addresses)) {
    return res.status(400).json({ error: 'Invalid addresses input' });
  }

  const raw = await redis.get('leaderboard');
  const data = raw ? JSON.parse(raw as string) : [];

  const matched = data.filter((item: any) => addresses.includes(item.address));
  res.status(200).json({ result: matched });
}
