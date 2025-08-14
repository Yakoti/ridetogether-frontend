import { Link, useLocation } from 'react-router-dom';

const FooterNav = () => {
    const { pathname } = useLocation();

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0',
            borderTop: '1px solid #ccc',
            background: '#fff'
          }}>
            <Link style={{ color: pathname === '/' ? 'blue' : 'gray' }} to="/">Home</Link>
            <Link style={{ color: pathname === '/chat' ? 'blue' : 'gray' }} to="/chat">Chat</Link>
            <Link style={{ color: pathname === '/profile' ? 'blue' : 'gray' }} to="/profile">Profile</Link>
            </div>
    );
};

export default FooterNav;