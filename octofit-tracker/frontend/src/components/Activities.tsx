import { useEffect, useState } from 'react';
import { fetchApi, normalizeArrayResponse } from '../api';

function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApi('activities/');
        setActivities(normalizeArrayResponse(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && activities.length === 0 && <p>No activity data found.</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id ?? `${activity.userId}-${activity.date}`}>
            <strong>{activity.type}</strong> by {activity.userId} · {activity.durationMinutes} min · {activity.calories} cal
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
