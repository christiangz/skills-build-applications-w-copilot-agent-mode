import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './api';

const navLinks = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>React 19 presentation tier with React Router and Codespaces-aware APIs.</p>
        <p className="api-note">API host: {apiBaseUrl}</p>
      </header>

      <nav>
        <ul className="nav-list">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active-link' : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
