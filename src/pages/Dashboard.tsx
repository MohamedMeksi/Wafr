
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import UserTable from '../components/UserTable';
import { searchUsersByPhone, mockUsers } from '@/utils/mockData';

const Dashboard = () => {
  const [users, setUsers] = useState(mockUsers.slice(0, 10)); // Initially show 10 users
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const results = searchUsersByPhone(query);
      setUsers(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Recherchez et gérez les utilisateurs de la plateforme WafR</p>
        </div>
        
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div>
          <UserTable users={users} isLoading={isLoading} />
          
          {users.length > 0 && !searchQuery && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Affichage des 10 premiers utilisateurs. Utilisez la recherche pour trouver un utilisateur spécifique.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
