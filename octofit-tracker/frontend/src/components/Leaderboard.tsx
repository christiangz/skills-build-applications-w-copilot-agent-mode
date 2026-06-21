import { useEffect, useState } from 'react';
import { fetchApi, normalizeArrayResponse } from '../api';

function Leaderboard() {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApi('leaderboard/');
        setRows(normalizeArrayResponse(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && rows.length === 0 && <p>No leaderboard data found.</p>}
      <ol>
        {rows.map((row) => (
          <li key={row._id ?? row.id ?? row.position}>
            {row.position}. {row.name} — {row.points} points
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
