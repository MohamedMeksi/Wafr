
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of our authentication context
type AuthContextType = {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user
const MOCK_ADMIN = {
  id: '1',
  name: 'Admin User',
  email: 'admin@wafr.com',
  role: 'admin',
};

// Provider component that wraps the app and makes auth available to any child component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('wafr_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Very simple mock validation - in a real app, this would be a server call
      if (email === 'admin@wafr.com' && password === 'password') {
        setUser(MOCK_ADMIN);
        setIsAuthenticated(true);
        localStorage.setItem('wafr_user', JSON.stringify(MOCK_ADMIN));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('wafr_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
