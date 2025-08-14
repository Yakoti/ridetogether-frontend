// import React, { useState, useEffect } from 'react';
// import './DemoHomePage.css';
// const DemoHomePage = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const currentUser = {
//     id: 1,
//     role: 'DRIVER', // added role here, needed for defaultUsers logic
//     name: 'John Driver',
//     freeSpaces: 3,
//     homeAddress: 'Vitosha Boulevard 1, Sofia',
//     officeAddress: 'Business Park Sofia, Sofia',
//     preferredArrivalStart: '10:00',
//     preferredArrivalEnd: '10:30',
//     routeDeviation: 0.5,
//     timeDeviation: 5
//   };
//   const API_BASE = 'http://localhost:8080/api/matching';
//   const USER_ID = currentUser.id;

//   const defaultUsers = () => currentUser.role === 'DRIVER' ? [
//     {
//       id: 3,
//       name: 'Alice Passenger',
//       homeAddress: 'Opalchenska Street 10, Sofia',
//       officeAddress: 'Business Park Sofia, Sofia',
//       preferredArrivalStart: '10:05',
//       preferredArrivalEnd: '10:25',
//       flexibilityMinutes: 20,
//       routeDeviation: 0.5,
//       timeDeviation: 5
//     },
//     {
//       id: 1,
//       name: 'John Driver',
//       freeSpaces: 3,
//       homeAddress: 'Vitosha Boulevard 1, Sofia',
//       officeAddress: 'Business Park Sofia, Sofia',
//       preferredArrivalStart: '10:00',
//       preferredArrivalEnd: '10:30',
//       routeDeviation: 0.5,
//       timeDeviation: 5
//     }
//     // more passengers...
//   ] : [
//     {
//       id: 1,
//       name: 'John Driver',
//       freeSpaces: 3,
//       homeAddress: 'Vitosha Boulevard 1, Sofia',
//       officeAddress: 'Business Park Sofia, Sofia',
//       preferredArrivalStart: '10:00',
//       preferredArrivalEnd: '10:30',
//       routeDeviation: 0.5,
//       timeDeviation: 5
//     },
//     // more drivers...
//   ];

//   useEffect(() => {
//     const fetchMatchingUsers = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${API_BASE}/${USER_ID}`);
//         if (response.ok) {
//           const usersData = await response.json();
//           setUsers(usersData);
//         } else {
//           console.error('Failed to fetch matching users');
//           setUsers(defaultUsers());
//         }
//       } catch (error) {
//         console.error('Error fetching matching users:', error);
//         setUsers(defaultUsers());
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMatchingUsers();
//   }, []);

//   if (isLoading) {
//     return <div>Loading matches...</div>;
//   }

//   //TODO: fix return....

//   return (
//     <div>
//       <h2>{currentUser.role === 'DRIVER' ? 'Available Passengers' : 'Available Drivers'}</h2>
//       {users.length === 0 ? (
//         <p>No matches found</p>
//       ) : (
//         <div className="match-list">
//           {users.map(user => (
//             <div key={user.id} className="match-card">
//               <div className="match-header">
//                 <strong className="passenger-name">{user.name}</strong>
//                 <button className="add-button">add</button>
//               </div>
//               <a href="https://maps.link" className="map-link" target="_blank" rel="noopener noreferrer">see route: maps.link</a>
//               <p>(changed route)</p>
//               <p>arrival time: {user.arrivalTime || '10:00'}</p>
//               <p>+{user.routeDeviation || '0.5'}km + {user.timeDeviation || '5'}min + 2lv</p>
//             </div>
//           ))}
//         </div>

//       )}
//     </div>
//   );
// };

// export default DemoHomePage;









// variant without pop up------------------------------------------------------------------///









// import React, { useState, useEffect } from 'react';
// import { Button, Typography, Box, CircularProgress, Link, Paper } from '@mui/material';

// const HomePage = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const currentUser = {
//     id: 1,
//     role: 'DRIVER',
//     name: 'John Driver',
//     freeSpaces: 3,
//     homeAddress: 'Vitosha Boulevard 1, Sofia',
//     officeAddress: 'Business Park Sofia, Sofia',
//     preferredArrivalStart: '10:00',
//     preferredArrivalEnd: '10:30',
//     routeDeviation: 0.5,
//     timeDeviation: 5
//   };

//   const API_BASE = 'http://localhost:8080/api/matching';
//   const USER_ID = currentUser.id;

//   const defaultUsers = () =>
//     currentUser.role === 'DRIVER'
//       ? [
//           {
//             id: 3,
//             name: 'Alice Passenger',
//             homeAddress: 'Opalchenska Street 10, Sofia',
//             officeAddress: 'Business Park Sofia, Sofia',
//             preferredArrivalStart: '10:05',
//             preferredArrivalEnd: '10:25',
//             flexibilityMinutes: 20,
//             routeDeviation: 0.5,
//             timeDeviation: 5
//           },
//           currentUser
//         ]
//       : [
//           currentUser
//         ];

//   useEffect(() => {
//     const fetchMatchingUsers = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${API_BASE}/${USER_ID}`);
//         if (response.ok) {
//           const usersData = await response.json();
//           setUsers(usersData);
//         } else {
//           setUsers(defaultUsers());
//         }
//       } catch {
//         setUsers(defaultUsers());
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMatchingUsers();
//   }, []);

//   if (isLoading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;

//   return (
//     <Box p={2}>
//       <Typography variant="h5" mb={2}>
//         {currentUser.role === 'DRIVER' ? 'Available Passengers' : 'Available Drivers'}
//       </Typography>

//       {users.length === 0 ? (
//         <Typography>No matches found</Typography>
//       ) : (
//         <Box display="flex" flexDirection="column" gap={2}>
//           {users.map(user => (
//             <Paper key={user.id} elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                 <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
//                 <Button variant="contained" size="small">Add</Button>
//               </Box>
//               <Link href="https://maps.link" target="_blank" rel="noopener noreferrer" underline="hover">
//                 See route: maps.link
//               </Link>
//               <Typography variant="body2">(changed route)</Typography>
//               <Typography variant="body2">Arrival time: {user.arrivalTime || '10:00'}</Typography>
//               <Typography variant="body2">
//                 +{user.routeDeviation || '0.5'}km + {user.timeDeviation || '5'}min + 2lv
//               </Typography>
//             </Paper>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default HomePage;




//variant with pop up with custom css--------------------------------------------------------------//


// import React, { useState, useEffect } from 'react';
// import './DemoHomePage.css';

// const HomePage = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null); // NEW STATE

//   const currentUser = {
//     id: 1,
//     role: 'DRIVER',
//     name: 'John Driver',
//     freeSpaces: 3,
//     homeAddress: 'Vitosha Boulevard 1, Sofia',
//     officeAddress: 'Business Park Sofia, Sofia',
//     preferredArrivalStart: '10:00',
//     preferredArrivalEnd: '10:30',
//     routeDeviation: 0.5,
//     timeDeviation: 5
//   };

//   const API_BASE = 'http://localhost:8080/api/matching';
//   const USER_ID = currentUser.id;

//   const defaultUsers = () => currentUser.role === 'DRIVER' ? [
//     {
//       id: 3,
//       name: 'Alice Passenger',
//       homeAddress: 'Opalchenska Street 10, Sofia',
//       officeAddress: 'Business Park Sofia, Sofia',
//       preferredArrivalStart: '10:05',
//       preferredArrivalEnd: '10:25',
//       flexibilityMinutes: 20,
//       routeDeviation: 0.5,
//       timeDeviation: 5
//     },
//     {
//       id: 1,
//       name: 'John Driver',
//       freeSpaces: 3,
//       homeAddress: 'Vitosha Boulevard 1, Sofia',
//       officeAddress: 'Business Park Sofia, Sofia',
//       preferredArrivalStart: '10:00',
//       preferredArrivalEnd: '10:30',
//       routeDeviation: 0.5,
//       timeDeviation: 5
//     }
//   ] : [
//     {
//       id: 1,
//       name: 'John Driver',
//       freeSpaces: 3,
//       homeAddress: 'Vitosha Boulevard 1, Sofia',
//       officeAddress: 'Business Park Sofia, Sofia',
//       preferredArrivalStart: '10:00',
//       preferredArrivalEnd: '10:30',
//       routeDeviation: 0.5,
//       timeDeviation: 5
//     }
//   ];

//   useEffect(() => {
//     const fetchMatchingUsers = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${API_BASE}/${USER_ID}`);
//         if (response.ok) {
//           const usersData = await response.json();
//           setUsers(usersData);
//         } else {
//           console.error('Failed to fetch matching users');
//           setUsers(defaultUsers());
//         }
//       } catch (error) {
//         console.error('Error fetching matching users:', error);
//         setUsers(defaultUsers());
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMatchingUsers();
//   }, []);

//   if (isLoading) {
//     return <div>Loading matches...</div>;
//   }

//   return (
//     <div>
//       <h2>{currentUser.role === 'DRIVER' ? 'Available Passengers' : 'Available Drivers'}</h2>
//       {users.length === 0 ? (
//         <p>No matches found</p>
//       ) : (
//         <div className="match-list">
//           {users.map(user => (
//             <div key={user.id} className="match-card">
//               <div className="match-header">
//                 <strong className="passenger-name" onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer', color: 'blue' }}>
//                   {user.name}
//                 </strong>
//                 <button className="add-button">add</button>
//               </div>
//               <a href="https://maps.link" className="map-link" target="_blank" rel="noopener noreferrer">see route: maps.link</a>
//               <p>(changed route)</p>
//               <p>arrival time: {user.arrivalTime || '10:00'}</p>
//               <p>+{user.routeDeviation || '0.5'}km + {user.timeDeviation || '5'}min + 2lv</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
//       {selectedUser && (
//         <div className="modal-backdrop">
//           <div className="modal">
//             <h3>{selectedUser.name}'s Details</h3>
//             <p>Home: {selectedUser.homeAddress}</p>
//             <p>Office: {selectedUser.officeAddress}</p>
//             <p>Preferred arrival: {selectedUser.preferredArrivalStart} - {selectedUser.preferredArrivalEnd}</p>
//             {selectedUser.freeSpaces && <p>Free spaces: {selectedUser.freeSpaces}</p>}
//             <p>Route deviation: {selectedUser.routeDeviation} km</p>
//             <p>Time deviation: {selectedUser.timeDeviation} min</p>
//             <button onClick={() => setSelectedUser(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;




//variant with pop up with mui ---------------------------------//
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import './DemoHomePage.css';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // const { user: currentUser } = useAuth();
  
  const currentUser = {
    id: 1,
    role: 'DRIVER',
    name: 'John Driver',
    freeSpaces: 3,
    homeAddress: 'Vitosha Boulevard 1, Sofia',
    officeAddress: 'Business Park Sofia, Sofia',
    preferredArrivalStart: '10:00',
    preferredArrivalEnd: '10:30',
    routeDeviation: 0.5,
    timeDeviation: 5
  };

  const API_BASE = 'http://localhost:8080/api/matching';
  const USER_ID = currentUser.id;

  const defaultUsers = currentUser.role === 'DRIVER' ? [
    {
      id: 3,
      name: 'Alice Passenger',
      homeAddress: 'Opalchenska Street 10, Sofia',
      officeAddress: 'Business Park Sofia, Sofia',
      preferredArrivalStart: '10:05',
      preferredArrivalEnd: '10:25',
      flexibilityMinutes: 20,
      routeDeviation: 0.5,
      timeDeviation: 5
    },
    {
      id: 4,
      name: 'Bob Passenger',
      homeAddress: 'Graf Ignatiev Street 15, Sofia',
      officeAddress: 'Tech Park Sofia, Sofia',
      preferredArrivalStart: '09:50',
      preferredArrivalEnd: '10:20',
      flexibilityMinutes: 15,
      routeDeviation: 1.2,
      timeDeviation: 8
    },
    {
      id: 5,
      name: 'Carol Passenger',
      homeAddress: 'Tsar Osvoboditel Boulevard 20, Sofia',
      officeAddress: 'Business Park Sofia, Sofia',
      preferredArrivalStart: '10:10',
      preferredArrivalEnd: '10:30',
      flexibilityMinutes: 25,
      routeDeviation: 0.8,
      timeDeviation: 3
    }
  ] : [
    {
      id: 1,
      name: 'John Driver',
      freeSpaces: 3,
      homeAddress: 'Vitosha Boulevard 1, Sofia',
      officeAddress: 'Business Park Sofia, Sofia',
      preferredArrivalStart: '10:00',
      preferredArrivalEnd: '10:30',
      routeDeviation: 0.5,
      timeDeviation: 5
    },
    {
      id: 2,
      name: 'Maria Driver',
      freeSpaces: 2,
      homeAddress: 'Ivan Vazov Street 5, Sofia',
      officeAddress: 'Tech Park Sofia, Sofia',
      preferredArrivalStart: '09:45',
      preferredArrivalEnd: '10:15',
      routeDeviation: 1.0,
      timeDeviation: 10
    }
  ];

  useEffect(() => {
    const fetchMatchingUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/${USER_ID}`);
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          console.error('Failed to fetch matching users');
          setUsers(defaultUsers());
        }
      } catch (error) {
        console.error('Error fetching matching users:', error);
        setUsers(defaultUsers);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatchingUsers();
  }, []);

  if (isLoading) return <div>Loading matches...</div>;

  return (
    <div>
      <h2>{currentUser.role === 'DRIVER' ? 'Available Passengers' : 'Available Drivers'}</h2>
      {users.length === 0 ? (
        <p>No matches found</p>
      ) : (
        <div className="match-list">
          {users.map(user => (
            <div key={user.id} className="match-card">
              <div className="match-header">
                <strong
                  className="passenger-name"
                  // listener for adding
                  // listener for adding
                  onClick={() => setSelectedUser(user)} 
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {user.name}
                </strong>
                <button className="add-button">add</button>
              </div>
              <a href="https://maps.link" className="map-link" target="_blank" rel="noopener noreferrer">see route: maps.link</a>
              <p>(changed route)</p>
              <p>arrival time: {user.arrivalTime || '10:00'}</p>
              <p>+{user.routeDeviation || '0.5'}km + {user.timeDeviation || '5'}min + 2lv</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Name:</strong> {selectedUser?.name}<br />
            <strong>Home:</strong> {selectedUser?.homeAddress}<br />
            <strong>Office:</strong> {selectedUser?.officeAddress}<br />
            <strong>Preferred Arrival:</strong> {selectedUser?.preferredArrivalStart} - {selectedUser?.preferredArrivalEnd}<br />
            <strong>Route Deviation:</strong> {selectedUser?.routeDeviation} km<br />
            <strong>Time Deviation:</strong> {selectedUser?.timeDeviation} min<br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUser(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
