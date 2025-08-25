import { useState } from 'react';
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
  Link
} from '@mui/material';

const RegisterPage = () => {
  const [role, setRole] = useState('PASSENGER');
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    homeAddress: '', officeAddress: '',
    preferredArrivalStart: '', preferredArrivalEnd: '',
    flexibilityMinutes: '', flexibilityKm: '',
    availableSeats: '', costPer100KmEUR: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      role,
      availableSeats: role === 'DRIVER' ? form.availableSeats || null : null,
      costPer100KmEUR: role === 'DRIVER' ? form.costPer100KmEUR || null : null
    };

    console.log(payload);

    await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            RideTogether
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="name"
            label="Full Name *"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          
          <TextField
            name="email"
            type="email"
            label="Email *"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          
          <TextField
            name="phone"
            label="Phone *"
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          
          <TextField
            name="password"
            type="password"
            label="Password *"
            placeholder="Enter your password (min 6 characters)"
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            inputProps={{ minLength: 6 }}
          />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <FormControlLabel value="DRIVER" control={<Radio />} label="Driver" />
              <FormControlLabel value="PASSENGER" control={<Radio />} label="Passenger" />
            </RadioGroup>
          </FormControl>

          <TextField
            name="homeAddress"
            label="Home Address"
            placeholder="Enter your home address"
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          
          <TextField
            name="officeAddress"
            label="Office Address"
            placeholder="Enter your office address"
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="preferredArrivalStart"
                type="time"
                label="Arrival Start"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="preferredArrivalEnd"
                type="time"
                label="Arrival End"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="flexibilityMinutes"
                type="number"
                label="Flexibility (minutes)"
                placeholder="15"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="flexibilityKm"
                type="number"
                label="Flexibility (km)"
                placeholder="2"
                onChange={handleChange}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>
          </Grid>

          {role === 'DRIVER' && (
            <TextField
              name="availableSeats"
              type="number"
              label="Free Spaces"
              placeholder="Available seats"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ min: 1, max: 8 }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ 
              mt: 3, 
              py: 1.5, 
              backgroundColor: '#ef5350', 
              '&:hover': { backgroundColor: '#d32f2f' },
              fontWeight: 'bold'
            }}
          >
            Create Account
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link href="/login" sx={{ color: '#ef5350', fontWeight: 'medium' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};


export default RegisterPage;
