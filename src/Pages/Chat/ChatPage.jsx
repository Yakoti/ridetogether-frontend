import React from 'react';
import { 
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip
} from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import ChatDetailView from './ChatDetailView';

const ChatPage = ({ 
  chats = [], 
  selectedChat, 
  setSelectedChat, 
  messages, 
  setMessages,
  newMessage,
  setNewMessage,
  sendMessage,
  currentUser 
}) => {
  // If a chat is selected, show the detail view
  if (selectedChat) {
    return (
      <ChatDetailView
        chat={selectedChat}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        onBack={() => setSelectedChat(null)}
        currentUser={currentUser}
      />
    );
  }

  // Otherwise show the chat list
  return (
    <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          Your Chats
        </Typography>
      </Box>

      {chats.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, color: '#999' }}>
          <ChatIcon sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
          <Typography variant="body1">No active chats</Typography>
          <Typography variant="body2">Match with drivers to start chatting</Typography>
        </Box>
      ) : (
        <List sx={{ p: 0 }}>
          {chats.map((chat) => (
            <Paper key={chat.id} elevation={1} sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
              <ListItem 
                onClick={() => setSelectedChat && setSelectedChat(chat)}
                sx={{ 
                  p: 2, 
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', mb: 0.5 }}>
                      {chat.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {chat.subtitle}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="caption" sx={{ color: '#999', mb: 1 }}>
                    {chat.time}
                  </Typography>
                  <Chip 
                    label={chat.messages ? chat.messages.length : "1"} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#ef5350', 
                      color: 'white', 
                      fontSize: '0.75rem',
                      height: 20,
                      minWidth: 20
                    }} 
                  />
                </Box>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ChatPage;