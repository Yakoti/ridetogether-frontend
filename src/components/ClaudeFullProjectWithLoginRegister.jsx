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
  // Mock current user (as driver based on screenshot)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
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
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [
      {
        id: 3,
        name: 'Passenger 3',
        role: 'PASSENGER',
        preferredArrivalStart: '10:05',
        routeDeviation: 0.5,
        timeDeviation: 5,
        route: 'Central Sofia -> Business Park'
      },
      {
        id: 4,
        name: 'Passenger 4',
        role: 'PASSENGER',
        preferredArrivalStart: '09:50',
        routeDeviation: 1.2,
        timeDeviation: 8,
        route: 'Vitosha Blvd -> Tech Park'
      },
      {
        id: 5,
        name: 'Passenger 5',
        role: 'PASSENGER',
        preferredArrivalStart: '10:10',
        routeDeviation: 0.8,
        timeDeviation: 3,
        route: 'Studentski Grad -> City Center'
      }
    ];
  });

  const [isLoading, setIsLoading] = useState(false);

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('chats');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'John Driver + Alice Passenger',
        subtitle: 'Route created! Driver: John Driver. Route details...',
        time: '10:21',
        driverId: 1,
        passengerId: 101,
        messages: [
          { id: 1, senderId: 1, text: 'Welcome Alice! I\'ll pick you up at 10:00 AM', timestamp: '10:21' },
          { id: 2, senderId: 101, text: 'Perfect! Thank you', timestamp: '10:22' }
        ]
      },
      {
        id: 2,
        title: 'John Driver + Bob Passenger',
        subtitle: 'Route created! Driver: John Driver. Route details...',
        time: '10:21',
        driverId: 1,
        passengerId: 102,
        messages: [
          { id: 1, senderId: 1, text: 'Hi Bob! Route is confirmed for tomorrow', timestamp: '10:21' }
        ]
      }
    ];
  });

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

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
                users={users} 
                isLoading={isLoading} 
                handleUserAction={handleUserAction} 
              />} 
            />
            <Route path="/chat" element={
              <ChatPage 
                currentUser={currentUser} 
                chats={chats} 
                selectedChat={selectedChat} 
                setSelectedChat={setSelectedChat} 
                messages={messages} 
                setMessages={setMessages} 
                newMessage={newMessage} 
                setNewMessage={setNewMessage} 
                sendMessage={sendMessage} 
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
      <FooterNav />
    </>
  );
};

export default TransportSharingApp;
