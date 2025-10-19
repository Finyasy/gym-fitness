import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Redirect root to admin login */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Dashboard */}
      <Route path="/admin/dashboard" element={<Dashboard />} />

      {/* Fallback to login */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
