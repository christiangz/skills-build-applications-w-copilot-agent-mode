import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const normalizeArrayResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }
  return [];
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(workoutsUrl);
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(normalizeArrayResponse(data));
      } catch (err) {
        setError(err.message);
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
