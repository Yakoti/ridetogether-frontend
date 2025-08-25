import React from 'react';
import { 
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  List,
  ListItem
} from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';

const ChatDetailView = ({ 
  chat, 
  messages, 
  newMessage, 
  setNewMessage, 
  sendMessage, 
  onBack, 
  currentUser 
}) => {
  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 10, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={onBack} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            {chat.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            {chat.subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Messages */}
      <Paper 
        sx={{ 
          flex: 1, 
          p: 2, 
          mb: 2, 
          overflow: 'auto',
          backgroundColor: '#f5f5f5'
        }}
      >
        <List sx={{ p: 0 }}>
          {messages.map((message) => (
            <ListItem 
              key={message.id} 
              sx={{ 
                display: 'flex', 
                justifyContent: message.senderId === currentUser.id ? 'flex-end' : 'flex-start',
                mb: 1,
                p: 0
              }}
            >
              <Paper 
                sx={{ 
                  p: 2, 
                  maxWidth: '70%',
                  backgroundColor: message.senderId === currentUser.id ? '#ef5350' : '#fff',
                  color: message.senderId === currentUser.id ? 'white' : 'black'
                }}
              >
                <Typography variant="body2">
                  {message.text}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    opacity: 0.7, 
                    fontSize: '0.7rem',
                    display: 'block',
                    textAlign: 'right',
                    mt: 0.5
                  }}
                >
                  {message.timestamp}
                </Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Message Input */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
        />
        <Button 
          variant="contained" 
          onClick={handleSend}
          sx={{ 
            backgroundColor: '#ef5350',
            '&:hover': { backgroundColor: '#d32f2f' }
          }}
        >
          <Send />
        </Button>
      </Box>
    </Container>
  );
};

export default ChatDetailView;
