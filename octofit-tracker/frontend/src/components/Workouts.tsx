import { useEffect, useState } from 'react';
import { fetchApi, normalizeArrayResponse } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApi('workouts/');
        setWorkouts(normalizeArrayResponse(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && workouts.length === 0 && <p>No workouts found.</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id ?? workout.id ?? workout.name}>
            <strong>{workout.name}</strong> — {workout.focus} ({workout.durationMinutes} min)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
