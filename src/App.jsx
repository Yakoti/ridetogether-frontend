import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import RegisterPage from './Pages/Register/RegisterPage'
import LoginPage from './Pages/Login/LoginPage';
import HomePage from './Pages/Home/HomePage';
import ChatPage from './Pages/Chat/ChatPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import FooterNav from './layouts/FooterNav';

function AppWrapper() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === "/register"; // add more paths if needed

  return (
    <div style={{ paddingBottom: hideFooter ? 0 : '60px' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {!hideFooter && <FooterNav />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
