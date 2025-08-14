import { createContext, useContext, useEffect, useState } from 'react';
//If you need to use the current user just use:
//import { useAuth } from './context/AuthContext';
//const { user } = useAuth();


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const defaultUser = () => ({
  id: 'USER_ID',
  name: 'John Doe',
  role: 'PASSENGER',
  homeAddress: 'Vitosha Boulevard 1, Sofia',
  officeAddress: 'Business Park Sofia, Sofia',
  preferredArrivalStart: '09:00',
  preferredArrivalEnd: '09:30',
  flexibilityMinutes: 15,
  flexibilityKm: 2.0,
  availableSeats: 0,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : defaultUser())
      .then(setUser)
      .catch(() => setUser(defaultUser()));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
