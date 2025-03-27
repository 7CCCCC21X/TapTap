// cron/fetchLeaderboard.ts
import axios from 'axios';
import { redis } from '../lib/redis';

export default async function fetchLeaderboard() {
  const res = await axios.get('https://tap.eclipse.xyz/api/eclipse/leaderboards?limit=500000&offset=0');
  if (res.data.success) {
    await redis.set('leaderboard', JSON.stringify(res.data.data));
    console.log(`[Cron] Leaderboard updated at ${new Date().toLocaleString()}`);
  }
}
