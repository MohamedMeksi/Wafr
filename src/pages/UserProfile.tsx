
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import UserProfileHeader from '../components/UserProfileHeader';
import TransactionList from '../components/TransactionList';
import { getUserById, getUserTransactions, User, Transaction } from '@/utils/mockData';
import { toast } from 'sonner';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const userData = getUserById(id);
        
        if (userData) {
          setUser(userData);
          
          // Fetch transactions
          const transactionsData = getUserTransactions(id);
          setTransactions(transactionsData);
        } else {
          toast.error("Utilisateur non trouvé");
        }
      } catch (error) {
        toast.error("Une erreur s'est produite lors du chargement des données");
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wafr-blue"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="w-full py-16 flex flex-col items-center justify-center text-center">
            <p className="text-lg text-gray-500">Utilisateur non trouvé</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <UserProfileHeader user={user} onUserUpdate={handleUserUpdate} />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Historique des transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
