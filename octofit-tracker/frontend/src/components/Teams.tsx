import { useEffect, useState } from 'react';
import { fetchApi, normalizeArrayResponse } from '../api';

function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApi('teams/');
        setTeams(normalizeArrayResponse(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && teams.length === 0 && <p>No teams found.</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.id ?? team.name}>
            <strong>{team.name}</strong> ({team.members ?? 0} members)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
