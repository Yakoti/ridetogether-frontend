
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Badge from '@mui/material/Badge';

const FooterNav = ({ chatCount = 0 }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getValue = () => {
    if (pathname === '/chat') return 'chat';
    if (pathname === '/profile') return 'profile';
    return 'home';
  };
  return (
    <BottomNavigation
      value={getValue()}
      onChange={(event, newValue) => {
        navigate(newValue === 'home' ? '/' : `/${newValue}`);
      }}
      showLabels
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 1200,
        borderTop: '1px solid #e0e0e0',
        '& .MuiBottomNavigationAction-root': {
          color: '#999',
          '&.Mui-selected': {
            color: '#ef5350'
          }
        }
      }}
    >
      <BottomNavigationAction 
        label="Home" 
        value="home" 
        icon={<HomeIcon />} 
      />
      <BottomNavigationAction 
        label="Chat" 
        value="chat" 
        icon={
          <Badge badgeContent={chatCount > 0 ? chatCount : null} color="error">
            <ChatIcon />
          </Badge>
        } 
      />
      <BottomNavigationAction 
        label="Profile" 
        value="profile" 
        icon={<PersonIcon />} 
      />
     
    </BottomNavigation>
  );
};

export default FooterNav;