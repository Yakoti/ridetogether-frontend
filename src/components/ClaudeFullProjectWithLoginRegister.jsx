import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Settings, Car, Users, Clock, MapPin, Plus, Send, Eye, EyeOff } from 'lucide-react';

const TransportSharingApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Login/Register form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

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

  // Mock API base URL - replace with your Spring Boot server
  const API_BASE = 'http://localhost:8080/api';

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login validation
    if (loginForm.email && loginForm.password) {
      // Mock successful login - set a sample user
      const mockUser = {
        id: 1,
        name: 'John Driver',
        email: loginForm.email,
        role: 'DRIVER',
        homeAddress: 'Vitosha Boulevard 1, Sofia',
        officeAddress: 'Business Park Sofia, Sofia',
        preferredArrivalStart: '10:00',
        preferredArrivalEnd: '10:30',
        flexibilityMinutes: 15,
        flexibilityKm: 2.0,
        freeSpaces: 3
      };
      
      setCurrentUser(mockUser);
      setCurrentPage('home');
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Please fill in all fields');
    }
    
    setIsLoading(false);
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (registerForm.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    // Mock registration
    const newUser = {
      id: Date.now(),
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone,
      role: registerForm.role,
      homeAddress: registerForm.homeAddress,
      officeAddress: registerForm.officeAddress,
      preferredArrivalStart: registerForm.preferredArrivalStart,
      preferredArrivalEnd: registerForm.preferredArrivalEnd,
      flexibilityMinutes: registerForm.flexibilityMinutes,
      flexibilityKm: registerForm.flexibilityKm,
      freeSpaces: registerForm.freeSpaces
    };
    
    setCurrentUser(newUser);
    setCurrentPage('home');
    setRegisterForm({
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
    
    setIsLoading(false);
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setChats([]);
    setSelectedChat(null);
    setMessages([]);
  };

  // Fetch matching users based on role
  const fetchMatchingUsers = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const endpoint = currentUser.role === 'DRIVER' ? 
        `${API_BASE}/matching/passengers/${currentUser.id}` : 
        `${API_BASE}/matching/drivers/${currentUser.id}`;
      
      // Mock data for demo
      const mockUsers = currentUser.role === 'DRIVER' ? [
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
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentPage === 'home') {
      fetchMatchingUsers();
    }
  }, [currentUser, currentPage]);

  const handleUserAction = async (targetUser, action) => {
    if (action === 'apply' || action === 'add') {
      console.log(`${action} action for user:`, targetUser);
      
      const newChat = {
        id: Date.now(),
        driver: currentUser.role === 'DRIVER' ? currentUser : targetUser,
        passengers: currentUser.role === 'DRIVER' ? [targetUser] : [currentUser],
        routeUrl: 'https://maps.google.com/maps/sample-route',
        messages: [{
          id: 1,
          content: `Route created! Driver: ${currentUser.role === 'DRIVER' ? currentUser.name : targetUser.name}. Route details: +${targetUser.routeDeviation || 1.5}km, +${targetUser.timeDeviation || 6}min, +2lv`,
          sender: { name: 'System' },
          timestamp: new Date(),
          isGenerated: true
        }]
      };
      
      setChats(prev => [...prev, newChat]);
      alert(`${action === 'apply' ? 'Applied to' : 'Added'} ${targetUser.name}! Check your chats.`);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const message = {
      id: Date.now(),
      content: newMessage,
      sender: currentUser,
      timestamp: new Date(),
      isGenerated: false
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">RideTogether</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">RideTogether</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password (min 6 characters)"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="DRIVER"
                    checked={registerForm.role === 'DRIVER'}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, role: e.target.value }))}
                    className="text-red-600"
                  />
                  <span className="ml-2">Driver</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="PASSENGER"
                    checked={registerForm.role === 'PASSENGER'}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, role: e.target.value }))}
                    className="text-red-600"
                  />
                  <span className="ml-2">Passenger</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
              <input
                type="text"
                value={registerForm.homeAddress}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, homeAddress: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your home address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
              <input
                type="text"
                value={registerForm.officeAddress}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, officeAddress: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your office address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Start</label>
                <input
                  type="time"
                  value={registerForm.preferredArrivalStart}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, preferredArrivalStart: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival End</label>
                <input
                  type="time"
                  value={registerForm.preferredArrivalEnd}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, preferredArrivalEnd: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flexibility (minutes)</label>
                <input
                  type="number"
                  value={registerForm.flexibilityMinutes}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, flexibilityMinutes: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flexibility (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={registerForm.flexibilityKm}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, flexibilityKm: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                />
              </div>
            </div>

            {registerForm.role === 'DRIVER' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Free Spaces</label>
                <input
                  type="number"
                  value={registerForm.freeSpaces}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, freeSpaces: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="1"
                  max="8"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user, isDriver = false }) => (
    <div className="bg-white border-2 border-red-300 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-red-700 mb-1">
            {isDriver ? `Driver ${user.id}` : `Passenger ${user.id}`}
          </h3>
          {isDriver && (
            <p className="text-sm text-gray-600 mb-1">
              Free spaces: {user.freeSpaces}
            </p>
          )}
          <p className="text-xs text-blue-600 mb-1">
            see route: maps.link
          </p>
          <p className="text-xs text-gray-500 mb-1">
            ({isDriver ? 'drivers route' : 'changed route'})
          </p>
          <p className="text-sm text-gray-700">
            arrival time: {user.preferredArrivalStart?.substring(0, 5) || '10:20'}
          </p>
          {!isDriver && (
            <div className="mt-2 text-xs text-gray-600">
              <p>+{user.routeDeviation || 3}km + {user.timeDeviation || 6}min + 2lv</p>
            </div>
          )}
        </div>
        <button
          onClick={() => handleUserAction(user, isDriver ? 'apply' : 'add')}
          className="bg-white border border-red-300 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-50 transition-colors"
        >
          {isDriver ? 'apply' : 'add'}
        </button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {currentUser?.role === 'DRIVER' ? 'Available Passengers' : 'Available Drivers'}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Clock size={16} />
          <span>Showing matches for {currentUser?.preferredArrivalStart} - {currentUser?.preferredArrivalEnd}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading matches...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              isDriver={currentUser?.role === 'PASSENGER'} 
            />
          ))}
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users size={48} className="mx-auto mb-2 opacity-50" />
              <p>No matches found for your schedule</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const ChatPage = () => (
    <div className="p-4 h-full flex flex-col">
      {!selectedChat ? (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Chats</h2>
          {chats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
              <p>No active chats</p>
              <p className="text-sm">Match with users to start chatting</p>
            </div>
          ) : (
            <div className="space-y-3">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSelectedChat(chat);
                    setMessages(chat.messages || []);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {chat.driver.name} + {chat.passengers.map(p => p.name).join(', ')}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {chat.messages?.[chat.messages.length - 1]?.content?.substring(0, 50)}...
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date().toLocaleTimeString().substring(0, 5)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <button
              onClick={() => setSelectedChat(null)}
              className="text-red-600 hover:text-red-700"
            >
              ← Back
            </button>
            <h3 className="font-semibold text-gray-800">
              {selectedChat.driver.name} + {selectedChat.passengers.map(p => p.name).join(', ')}
            </h3>
            <div></div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender.id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                    message.isGenerated
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : message.sender.id === currentUser?.id
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {!message.isGenerated && (
                    <p className="text-xs opacity-75 mb-1">{message.sender.name}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={sendMessage}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ProfilePage = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
        <button
          onClick={handleLogout}
          className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={currentUser?.name || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={currentUser?.email || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={currentUser?.phone || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={currentUser?.role === 'DRIVER'}
                onChange={() => setCurrentUser(prev => ({ ...prev, role: 'DRIVER' }))}
                className="text-red-600"
              />
              <span className="ml-2">Driver</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={currentUser?.role === 'PASSENGER'}
                onChange={() => setCurrentUser(prev => ({ ...prev, role: 'PASSENGER' }))}
                className="text-red-600"
              />
              <span className="ml-2">Passenger</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
          <input
            type="text"
            value={currentUser?.homeAddress || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, homeAddress: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
          <input
            type="text"
            value={currentUser?.officeAddress || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, officeAddress: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Start</label>
            <input
              type="time"
              value={currentUser?.preferredArrivalStart || ''}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, preferredArrivalStart: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival End</label>
            <input
              type="time"
              value={currentUser?.preferredArrivalEnd || ''}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, preferredArrivalEnd: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flexibility (minutes)</label>
            <input
              type="number"
              value={currentUser?.flexibilityMinutes || ''}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, flexibilityMinutes: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flexibility (km)</label>
            <input
              type="number"
              step="0.1"
              value={currentUser?.flexibilityKm || ''}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, flexibilityKm: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        {currentUser?.role === 'DRIVER' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Spaces</label>
            <input
              type="number"
              value={currentUser?.freeSpaces || ''}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, freeSpaces: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}
        
        <button
          onClick={() => alert('Profile updated!')}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  // Show login/register pages when user is not authenticated
  if (!currentUser) {
    if (currentPage === 'register') {
      return <RegisterPage />;
    }
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto border-x border-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">RideTogether</h1>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs ${
              currentUser.role === 'DRIVER' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {currentUser.role}
            </div>
            <User size={20} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'chat' && <ChatPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentPage === 'home' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Car size={20} />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('chat')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors relative ${
              currentPage === 'chat' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageCircle size={20} />
            <span className="text-xs mt-1">Chat</span>
            {chats.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {chats.length}
              </div>
            )}
          </button>
          
          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentPage === 'profile' ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportSharingApp;