import React from 'react';
import { AppBar, Toolbar, Typography, Chip, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Header = ({ title = "RideTogether" }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', color: 'black' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="DRIVER" size="small" sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }} />
          <Avatar sx={{ width: 32, height: 32, backgroundColor: '#f5f5f5', color: '#666' }}>
            <PersonIcon fontSize="small" />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
