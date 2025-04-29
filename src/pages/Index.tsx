
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Display a loading indicator while checking authentication status
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="h-16 w-16 mx-auto mb-4 bg-wafr-blue rounded-2xl flex items-center justify-center">
          <span className="text-2xl font-bold text-white">W</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <span className="text-wafr-blue">WafR</span>
          <span className="font-light ml-2">Console</span>
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-wafr-blue mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
