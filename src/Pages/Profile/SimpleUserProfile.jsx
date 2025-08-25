import React, { useState, useEffect } from 'react';
import { 
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  CircularProgress,
  Chip
} from '@mui/material';
import { Save, Person } from '@mui/icons-material';

const SimpleUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const API_BASE = 'http://localhost:8080/users';
  const USER_ID = 1;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 200);

    try {
      const response = await fetch(`${API_BASE}/${USER_ID}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(defaultUser());
      }
    } catch (error) {
      setUser(defaultUser());
    } finally {
      setIsLoading(false);
    }
  };

  const defaultUser = () => ({
    id: USER_ID,
    name: 'John Driver',
    role: 'DRIVER',
    homeAddress: 'Vitosha Boulevard 1, Sofia',
    officeAddress: 'Business Park Sofia, Sofia',
    preferredArrivalStart: '10:00',
    preferredArrivalEnd: '10:30',
    flexibilityMinutes: 15,
    flexibilityKm: 2.0,
    availableSeats: 3,
  });

  const updateUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress sx={{ color: '#ef5350' }} />
      </Container>
    );
  }

  return (
    <><Container maxWidth="sm" sx={{ py: 2, pb: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            Profile Settings
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={user.role}
              size="small"
              sx={{
                backgroundColor: user.role === 'DRIVER' ? '#e3f2fd' : '#e8f5e8',
                color: user.role === 'DRIVER' ? '#1976d2' : '#2e7d32',
                fontWeight: 'bold'
              }} />
            <Person sx={{ color: '#666' }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Name"
            value={user.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            variant="outlined" />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: '#666', fontWeight: 'bold' }}>Role</FormLabel>
            <RadioGroup
              row
              value={user.role}
              onChange={(e) => handleChange('role', e.target.value)}
            >
              <FormControlLabel value="DRIVER" control={<Radio />} label="Driver" />
              <FormControlLabel value="PASSENGER" control={<Radio />} label="Passenger" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Home Address"
            value={user.homeAddress || ''}
            onChange={(e) => handleChange('homeAddress', e.target.value)}
            fullWidth
            variant="outlined" />

          <TextField
            label="Office Address"
            value={user.officeAddress || ''}
            onChange={(e) => handleChange('officeAddress', e.target.value)}
            fullWidth
            variant="outlined" />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Arrival Start"
                type="time"
                value={user.preferredArrivalStart || ''}
                onChange={(e) => handleChange('preferredArrivalStart', e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Arrival End"
                type="time"
                value={user.preferredArrivalEnd || ''}
                onChange={(e) => handleChange('preferredArrivalEnd', e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Flexibility (minutes)"
                type="number"
                value={user.flexibilityMinutes || ''}
                onChange={(e) => handleChange('flexibilityMinutes', parseInt(e.target.value) || 0)}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0 }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Flexibility (km)"
                type="number"
                value={user.flexibilityKm || ''}
                onChange={(e) => handleChange('flexibilityKm', parseFloat(e.target.value) || 0)}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0, step: 0.1 }} />
            </Grid>
          </Grid>

          {user.role === 'DRIVER' && (
            <TextField
              label="Free Spaces"
              type="number"
              value={user.availableSeats || ''}
              onChange={(e) => handleChange('availableSeats', parseInt(e.target.value) || 0)}
              fullWidth
              variant="outlined"
              inputProps={{ min: 1, max: 8 }} />
          )}

          <Button
            onClick={updateUser}
            disabled={loading}
            variant="contained"
            fullWidth
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            sx={{
              mt: 1,
              backgroundColor: '#ef5350',
              '&:hover': { backgroundColor: '#d32f2f' },
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Paper>
    </Container>
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            // Clear user session (example: localStorage, cookies)
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          } }
          sx={{ fontWeight: 'bold' }}
        >
          Logout
        </Button>
      </Box></>
  );
};

export default SimpleUserProfile;
