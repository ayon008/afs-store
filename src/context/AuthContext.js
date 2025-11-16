// context/AuthContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null); // ⬅️ Add username state
  const router = useRouter();

  useEffect(() => {
    const loggedIn = Cookies.get('isLoggedIn') === 'true';
    const storedUsername = Cookies.get('username'); // ⬅️ Get username from cookies
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername || null); // ⬅️ Set username if it exists
  }, []);

  const login = (user) => {
    Cookies.set('isLoggedIn', 'true', { path: '/' });
    Cookies.set('username', user, { path: '/' }); // ⬅️ Store username in cookies
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user); // ⬅️ Store username in localStorage
    setIsLoggedIn(true);
    setUsername(user);
  };

  const logout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('username'); // ⬅️ Remove username from cookies
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username'); // ⬅️ Remove username from localStorage
    setIsLoggedIn(false);
    setUsername(null); // ⬅️ Clear username
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);