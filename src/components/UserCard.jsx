import React from 'react';
import { Card, CardContent, Typography, Button, Box, Link } from '@mui/material';

const UserCard = ({ user, isDriver = false, handleUserAction }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        border: '2px solid #ffcdd2', 
        borderRadius: 2,
        '&:hover': { boxShadow: 3 }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold', mb: 1 }}>
              {isDriver ? user.name : user.name}
            </Typography>
            
            {isDriver && (
              <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                Free spaces: {user.freeSpaces}
              </Typography>
            )}
            
            <Link href="#" variant="body2" sx={{ color: '#1976d2', mb: 1, display: 'block' }}>
              see route: maps.link
            </Link>
            
            <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
              ({isDriver ? 'drivers route' : 'changed route'})
            </Typography>
            
            <Typography variant="body2" sx={{ color: '#333', mb: 1 }}>
              arrival time: {user.preferredArrivalStart?.substring(0, 5) || '10:05'}
            </Typography>
            
            {!isDriver && (
              <Typography variant="caption" sx={{ color: '#666' }}>
                +{user.routeDeviation || 0.5}km + {user.timeDeviation || 5}min + 2lv
              </Typography>
            )}
          </Box>
          
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleUserAction && handleUserAction(user, isDriver ? 'apply' : 'add')}
            sx={{ 
              color: '#d32f2f', 
              borderColor: '#ffcdd2', 
              '&:hover': { 
                backgroundColor: '#ffebee',
                borderColor: '#d32f2f'
              }
            }}
          >
            {isDriver ? 'Apply' : 'Add'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
