import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Optional expiration check
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
