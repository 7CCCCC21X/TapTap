// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleQuery = async () => {
    const addresses = input.split('\n').map((addr) => addr.trim()).filter(Boolean);
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addresses }),
    });
    const data = await res.json();
    setResults(data.result || []);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Eclipse 排行榜查询</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        className="w-full p-2 border rounded"
        placeholder="输入地址，每行一个"
      />
      <button onClick={handleQuery} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">查询</button>

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((r, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50">
              <p><strong>{r.name}</strong></p>
              <p>{r.address}</p>
              <p>草数：{r.points.toLocaleString()} | 排名：#{r.rank}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
