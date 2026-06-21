import { useEffect, useState } from 'react';
import { fetchApi, normalizeArrayResponse } from '../api';

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApi('users/');
        setUsers(normalizeArrayResponse(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id ?? user.id ?? user.email}>
            <strong>{user.name}</strong> ({user.email})
            {user.teamId && <span> — team {user.teamId}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
