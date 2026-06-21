import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

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

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(usersUrl);
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        const data = await response.json();
        setUsers(normalizeArrayResponse(data));
      } catch (err) {
        setError(err.message);
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
