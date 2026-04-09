import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('cps-user');
    const savedToken = localStorage.getItem('cps-token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('cps-user', JSON.stringify(userData));
    localStorage.setItem('cps-token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cps-user');
    localStorage.removeItem('cps-token');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('cps-user', JSON.stringify(userData));
  };

  const isTrialExpired = () => {
    if (!user) return true;
    if (user.plano === 'SUB') return false;
    const expiration = new Date(user.trialExpiration);
    return new Date() > expiration;
  };

  const getDaysLeft = () => {
    if (!user) return 0;
    const expiration = new Date(user.trialExpiration);
    const now = new Date();
    const diff = expiration - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading,
      login, 
      logout, 
      updateUser,
      isTrialExpired,
      getDaysLeft,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
