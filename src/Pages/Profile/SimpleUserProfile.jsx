// import React, { useState, useEffect } from 'react';
// import { User, Save } from 'lucide-react';
// import './SimpleUserProfile.css';

// const SimpleUserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setIsLoading] = useState(false);

//   const API_BASE = 'http://localhost:8080/users';
//   const USER_ID = 1;

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     setIsLoading(true);
//     //abort fetching after 1 sec
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 200);

//     try {
//       const response = await fetch(`${API_BASE}/${USER_ID}`, {
//         signal: controller.signal
//       });
//       clearTimeout(timeoutId);


//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       } else {
//         console.error('Failed to fetch user');
//         setUser(defaultUser());
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       setUser(defaultUser());
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const defaultUser = () => ({
//     id: USER_ID,
//     name: 'John Doe',
//     role: 'PASSENGER',
//     homeAddress: 'Vitosha Boulevard 1, Sofia',
//     officeAddress: 'Business Park Sofia, Sofia',
//     preferredArrivalStart: '09:00',
//     preferredArrivalEnd: '09:30',
//     flexibilityMinutes: 15,
//     flexibilityKm: 2.0,
//     availableSeats: 0
//   });

//   const updateUser = async () => {
//     setIsLoading(true);
//     console.log(JSON.stringify(user));
//     try {
//       const response = await fetch(`${API_BASE}/${user.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//       });
//       if (response.ok) {
//         const updatedUser = await response.json();
//         setUser(updatedUser);
//         alert('Profile updated successfully!');
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//       alert('Error updating profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setUser(prev => ({ ...prev, [field]: value }));
//   };

//   if (!user) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-header-inner">
//           <h1 className="title">Profile Settings</h1>
//           <div className="role-display">
//             <div className={`role-badge ${user.role.toLowerCase()}`}>
//               {user.role}
//             </div>
//             <User size={20} className="user-icon" />
//           </div>
//         </div>
//       </div>

//       <div className="profile-content">
//         <div className="form">
//           <div className="form-group">
//             <label>Name</label>
//             <input type="text" value={user.name || ''} onChange={e => handleChange('name', e.target.value)} />
//           </div>

//           <div className="form-group">
//             <label>Role</label>
//             <div className="radio-group">
//               <label><input type="radio" checked={user.role === 'DRIVER'} onChange={() => handleChange('role', 'DRIVER')} /> Driver</label>
//               <label><input type="radio" checked={user.role === 'PASSENGER'} onChange={() => handleChange('role', 'PASSENGER')} /> Passenger</label>
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Home Address</label>
//             <input type="text" value={user.homeAddress || ''} onChange={e => handleChange('homeAddress', e.target.value)} />
//           </div>

//           <div className="form-group">
//             <label>Office Address</label>
//             <input type="text" value={user.officeAddress || ''} onChange={e => handleChange('officeAddress', e.target.value)} />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Arrival Start</label>
//               <input type="time" value={user.preferredArrivalStart || ''} onChange={e => handleChange('preferredArrivalStart', e.target.value)} />
//             </div>
//             <div className="form-group">
//               <label>Arrival End</label>
//               <input type="time" value={user.preferredArrivalEnd || ''} onChange={e => handleChange('preferredArrivalEnd', e.target.value)} />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Flexibility (minutes)</label>
//               <input type="number" value={user.flexibilityMinutes || ''} onChange={e => handleChange('flexibilityMinutes', parseInt(e.target.value) || 0)} />
//             </div>
//             <div className="form-group">
//               <label>Flexibility (km)</label>
//               <input type="number" step="0.1" value={user.flexibilityKm || ''} onChange={e => handleChange('flexibilityKm', parseFloat(e.target.value) || 0)} />
//             </div>
//           </div>

//           {user.role === 'DRIVER' && (
//             <div className="form-group">
//               <label>Available Seats</label>
//               <input type="number" value={user.availableSeats || ''} onChange={e => handleChange('availableSeats', parseInt(e.target.value) || 0)} />
//             </div>
//           )}

//           <button className="save-button" onClick={updateUser} disabled={loading}>
//             <Save size={16} />
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleUserProfile;




//---------------------------------------------//

import React, { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
} from '@mui/material';

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
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Profile Settings</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              px: 2,
              py: 0.5,
              bgcolor: user.role === 'DRIVER' ? 'primary.main' : 'secondary.main',
              color: 'white',
              borderRadius: 1,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {user.role}
          </Box>
          <User size={24} />
        </Box>
      </Box>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          value={user.name || ''}
          onChange={e => handleChange('name', e.target.value)}
          margin="normal"
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup
            row
            value={user.role}
            onChange={e => handleChange('role', e.target.value)}
          >
            <FormControlLabel value="DRIVER" control={<Radio />} label="Driver" />
            <FormControlLabel value="PASSENGER" control={<Radio />} label="Passenger" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="Home Address"
          value={user.homeAddress || ''}
          onChange={e => handleChange('homeAddress', e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Office Address"
          value={user.officeAddress || ''}
          onChange={e => handleChange('officeAddress', e.target.value)}
          margin="normal"
        />

        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Arrival Start"
            type="time"
            value={user.preferredArrivalStart || ''}
            onChange={e => handleChange('preferredArrivalStart', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Arrival End"
            type="time"
            value={user.preferredArrivalEnd || ''}
            onChange={e => handleChange('preferredArrivalEnd', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
        </Box>

        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Flexibility (minutes)"
            type="number"
            value={user.flexibilityMinutes || ''}
            onChange={e => handleChange('flexibilityMinutes', parseInt(e.target.value) || 0)}
            sx={{ flex: 1 }}
            margin="normal"
          />
          <TextField
            label="Flexibility (km)"
            type="number"
            step="0.1"
            value={user.flexibilityKm || ''}
            onChange={e => handleChange('flexibilityKm', parseFloat(e.target.value) || 0)}
            sx={{ flex: 1 }}
            margin="normal"
          />
        </Box>

        {user.role === 'DRIVER' && (
          <TextField
            label="Available Seats"
            type="number"
            value={user.availableSeats || ''}
            onChange={e => handleChange('availableSeats', parseInt(e.target.value) || 0)}
            margin="normal"
            fullWidth
          />
        )}

        <Button
          variant="contained"
          color="primary"
          startIcon={<Save size={20} />}
          onClick={updateUser}
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
};

export default SimpleUserProfile;
