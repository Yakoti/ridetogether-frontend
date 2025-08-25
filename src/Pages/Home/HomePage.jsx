import React from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { AccessTime, People } from '@mui/icons-material';
import UserCard from '../../components/UserCard';

const HomePage = ({ currentUser, users = [], isLoading, handleUserAction }) => (
  <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
        {currentUser?.role === 'DRIVER' ? 'Available Passengers' : 'Available Drivers'}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666', mb: 2 }}>
        <AccessTime fontSize="small" />
        <Typography variant="body2">
          Showing matches for {currentUser?.preferredArrivalStart} - {currentUser?.preferredArrivalEnd}
        </Typography>
      </Box>
    </Box>

    {isLoading ? (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#d32f2f', mb: 2 }} />
        <Typography variant="body2" sx={{ color: '#666' }}>Loading matches...</Typography>
      </Box>
    ) : (
      <Box>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isDriver={currentUser?.role === 'PASSENGER'}
            handleUserAction={handleUserAction}
          />
        ))}
        {users.length === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, color: '#999' }}>
            <People sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
            <Typography variant="body1">No matches found for your schedule</Typography>
          </Box>
        )}
      </Box>
    )}
  </Container>
);

export default HomePage;
