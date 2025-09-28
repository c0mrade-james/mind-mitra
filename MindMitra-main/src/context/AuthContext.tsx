import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email?: string;
  name: string;
  role: 'student' | 'counselor' | 'admin';
  avatar?: string;
  isAnonymous: boolean;
  preferences?: {
    language: string;
    anonymityLevel: 'full' | 'partial' | 'none';
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mindful_campus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with Supabase auth
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: (role as User['role']) || 'student',
        isAnonymous: false,
        preferences: {
          language: 'en',
          anonymityLevel: 'partial',
          notifications: true,
        },
      };
      
      setUser(mockUser);
      localStorage.setItem('mindful_campus_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    try {
      // Mock signup - replace with Supabase auth
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: role as User['role'],
        isAnonymous: false,
        preferences: {
          language: 'en',
          anonymityLevel: 'partial',
          notifications: true,
        },
      };
      
      setUser(mockUser);
      localStorage.setItem('mindful_campus_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = async () => {
    setIsLoading(true);
    try {
      const guestUser: User = {
        id: 'guest_' + Math.random().toString(36).substr(2, 9),
        name: 'Guest User',
        role: 'student',
        isAnonymous: true,
        preferences: {
          language: 'en',
          anonymityLevel: 'full',
          notifications: false,
        },
      };
      
      setUser(guestUser);
      localStorage.setItem('mindful_campus_user', JSON.stringify(guestUser));
    } catch (error) {
      console.error('Guest login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindful_campus_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('mindful_campus_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    loginAsGuest,
    logout,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};





