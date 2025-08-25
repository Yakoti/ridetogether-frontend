import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../layouts/Header';
import FooterNav from '../layouts/FooterNav';

import HomePage from '../Pages/Home/HomePage';
import ChatPage from '../Pages/Chat/ChatPage';
import ProfilePage from '../Pages/Profile/ProfilePage';
import LoginPage from '../Pages/Login/LoginPage';
import RegisterPage from '../Pages/Register/RegisterPage';

const TransportSharingApp = () => {

  // Force clear localStorage completely to fix User 2 issue
  useEffect(() => {
    localStorage.clear();
    console.log('Force cleared localStorage to fix User 2 issue');
  }, []);

  // Mock current user (as driver based on screenshot)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser_v4_clean');
    return saved ? JSON.parse(saved) : {
      id: 1,
      name: 'John Driver',
      role: 'DRIVER',
      preferredArrivalStart: '10:00',
      preferredArrivalEnd: '10:30'
    };
  });

  // Mock users data - available passengers for drivers to add
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users_v4_clean');
    const defaultUsers = [
      {
        id: 3,
        name: 'Alice',
        role: 'PASSENGER',
        preferredArrivalStart: '10:05',
        routeDeviation: 0.5,
        timeDeviation: 5,
        route: 'Central Sofia -> Business Park'
      },
      {
        id: 4,
        name: 'Bob',
        role: 'PASSENGER',
        preferredArrivalStart: '09:50',
        routeDeviation: 1.2,
        timeDeviation: 8,
        route: 'Vitosha Blvd -> Tech Park'
      },
      {
        id: 5,
        name: 'Carol',
        role: 'PASSENGER',
        preferredArrivalStart: '10:10',
        routeDeviation: 0.8,
        timeDeviation: 3,
        route: 'Studentski Grad -> City Center'
      },
      {
        id: 6,
        name: 'Angel',
        role: 'PASSENGER',
        preferredArrivalStart: '9:30',
        routeDeviation: 1.5,
        timeDeviation: 5,
        route: 'Manastirski -> Office X'
      },
      {
        id: 7,
        name: 'Svetlio',
        role: 'PASSENGER',
        preferredArrivalStart: '9:30',
        routeDeviation: 1.5,
        timeDeviation: 5,
        route: 'Studentski Grad -> Office X'
      }
    ];
    
    const users = saved ? JSON.parse(saved) : defaultUsers;
    console.log('Loaded users:', users);
    return users;
  });

  const [isLoading, setIsLoading] = useState(false);

  const [chats, setChats] = useState(() => {
    // Use a new key to force fresh data
    const saved = localStorage.getItem('chats_v4_clean');
    const defaultChats = [
      { id: 1, participants: [1, 3], isRead: false, messages: [
        { id: 1, sender: 1, text: "Hi Alice! I can pick you up tomorrow at 9:45 AM", timestamp: "2024-01-15T09:30:00Z" },
        { id: 2, sender: 3, text: "That sounds perfect! I'll be ready at the entrance", timestamp: "2024-01-15T09:32:00Z" }
      ]},
      { id: 2, participants: [1, 4], isRead: false, messages: [
        { id: 3, sender: 1, text: "Hey Bob, are you available for a ride on Wednesday?", timestamp: "2024-01-15T10:00:00Z" },
        { id: 4, sender: 4, text: "Sure! What time works best for you?", timestamp: "2024-01-15T10:05:00Z" }
      ]}
    ];
    
    console.log('Loading chats - saved from localStorage:', saved);
    const chats = saved ? JSON.parse(saved) : defaultChats;
    console.log('Final loaded chats:', chats);
    return chats;
  });

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to get user name by ID
  const getUserName = (userId) => {
    if (userId === currentUser.id) return currentUser.name;
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  // Function to process raw chats data for display
  const processChatsForDisplay = (rawChats) => {
    return rawChats.map(chat => {
      // If chat already has display properties, return as is
      if (chat.title && chat.subtitle && chat.time) {
        return chat;
      }

      // Otherwise, generate display properties from raw data
      const otherParticipant = chat.participants.find(id => id !== currentUser.id);
      const otherParticipantName = getUserName(otherParticipant);
      const lastMessage = chat.messages[chat.messages.length - 1];
      const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '';

      return {
        ...chat,
        title: `Chat with ${otherParticipantName}`,
        subtitle: lastMessage ? lastMessage.text : 'No messages yet',
        time: lastMessageTime,
        isRead: chat.isRead !== undefined ? chat.isRead : true // Preserve existing isRead status
      };
    });
  };

  // Get processed chats for display (only when users are loaded)
  const processedChats = users.length > 0 ? processChatsForDisplay(chats) : [];
  
  // Debug: Log chat read status
  console.log('Raw chats:', chats.map(c => ({ id: c.id, isRead: c.isRead })));
  console.log('Processed chats:', processedChats.map(c => ({ id: c.id, isRead: c.isRead })));
  console.log('Unread count:', processedChats.filter(chat => !chat.isRead).length);

  // Filter out users who already have chats with current user
  const availableUsers = users.filter(user => {
    const hasExistingChat = chats.some(chat => 
      chat.participants && 
      chat.participants.includes(currentUser.id) && 
      chat.participants.includes(user.id)
    );
    return !hasExistingChat;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('currentUser_v4_clean', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users_v4_clean', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('chats_v4_clean', JSON.stringify(chats));
  }, [chats]);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'PASSENGER',
    homeAddress: '',
    officeAddress: '',
    preferredArrivalStart: '09:00',
    preferredArrivalEnd: '09:30',
    flexibilityMinutes: 15,
    flexibilityKm: 2.0,
    freeSpaces: 3
  });
  const [showPassword, setShowPassword] = useState(false);



  // Load messages when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  // Handler for when user clicks "Add" on a passenger
  const handleUserAction = async (targetUser, action) => {
    if (action === 'add') {
      // Create a new chat with the passenger
      const newChat = {
        id: chats.length + 1,
        title: `${currentUser.name} + ${targetUser.name}`,
        subtitle: `Route created! Driver: ${currentUser.name}. Route details...`,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        driverId: currentUser.id,
        passengerId: targetUser.id,
        isRead: false, // New chats are unread
        messages: [
          { 
            id: 1, 
            senderId: currentUser.id, 
            text: `Hi ${targetUser.name}! Welcome to the ride. I'll pick you up at ${currentUser.preferredArrivalStart}`, 
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      
      const updatedChats = [...chats, newChat];
      setChats(updatedChats);
      
      // Remove the added passenger from available list
      const updatedUsers = users.filter(user => user.id !== targetUser.id);
      setUsers(updatedUsers);
      
      alert(`Added ${targetUser.name} to your ride! Check your chats.`);
    }
  };

  // Handler for marking chat as read when clicked
  const markChatAsRead = (chat) => {
    if (!chat.isRead) {
      const updatedChats = chats.map(c => 
        c.id === chat.id ? { ...c, isRead: true } : c
      );
      setChats(updatedChats);
    }
    setSelectedChat({ ...chat, isRead: true });
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        id: messages.length + 1,
        senderId: currentUser.id,
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      
      // Update the chat in the chats array
      const updatedChats = chats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: updatedMessages }
          : chat
      );
      setChats(updatedChats);
      
      // Update selectedChat to reflect the new messages
      setSelectedChat({ ...selectedChat, messages: updatedMessages });
      
      setNewMessage('');
    }
  };

  // Render routes passing needed props
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto border-x border-gray-200">
        <Header title="RideTogether" />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={
              <HomePage 
                currentUser={currentUser} 
                users={availableUsers} 
                isLoading={isLoading} 
                handleUserAction={handleUserAction} 
              />} 
            />
            <Route path="/chat" element={
              <ChatPage 
                currentUser={currentUser} 
                chats={processedChats} 
                selectedChat={selectedChat} 
                setSelectedChat={setSelectedChat} 
                messages={messages} 
                setMessages={setMessages} 
                newMessage={newMessage} 
                setNewMessage={setNewMessage} 
                sendMessage={sendMessage}
                markChatAsRead={markChatAsRead} 
              />} 
            />
            <Route path="/profile" element={
              <ProfilePage 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                handleLogout={() => setCurrentUser(null)} 
              />} 
            />
            <Route path="/login" element={
              <LoginPage 
                loginForm={loginForm} 
                setLoginForm={setLoginForm} 
                handleLogin={() => {/* your login handler*/}} 
                isLoading={isLoading} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
              />} 
            />
            <Route path="/register" element={
              <RegisterPage 
                registerForm={registerForm} 
                setRegisterForm={setRegisterForm} 
                handleRegister={() => {/* your register handler*/}} 
                isLoading={isLoading} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
              />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <FooterNav chatCount={processedChats.filter(chat => !chat.isRead).length} />
    </>
  );
};

export default TransportSharingApp;
