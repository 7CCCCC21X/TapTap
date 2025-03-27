// pages/api/cron.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetchLeaderboard from '../../cron/fetchLeaderboard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await fetchLeaderboard();
  res.status(200).json({ success: true });
}
