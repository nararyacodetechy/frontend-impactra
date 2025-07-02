'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'; // Sekarang bisa pakai default

export type User = {
  id: number;
  uuid: string;
  email: string;
  username: string;
  full_name: string;
  role: 'user' | 'komunitas' | 'admin';
  is_verified: boolean;
};

type UserContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isInitialized: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token) as any;
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser({
            id: decoded.sub,
            uuid: decoded.uuid,
            email: decoded.email,
            username: decoded.username,
            full_name: decoded.full_name,
            role: decoded.role,
            is_verified: decoded.is_verified,
          });
        }
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setIsInitialized(true); // penting
  }, []);


  const login = (token: string) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token) as any;

      setUser({
        id: decoded.sub,
        uuid: decoded.uuid,
        email: decoded.email,
        username: decoded.username,
        full_name: decoded.full_name,
        role: decoded.role,
        is_verified: decoded.is_verified,
      });
    } catch (err) {
      console.error('Failed to decode token:', err);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isInitialized }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
