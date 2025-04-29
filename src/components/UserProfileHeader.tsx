
import { useState } from 'react';
import { User } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Unlock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { toggleUserBlocked } from '@/utils/mockData';

interface UserProfileHeaderProps {
  user: User;
  onUserUpdate: (updatedUser: User) => void;
}

const UserProfileHeader = ({ user, onUserUpdate }: UserProfileHeaderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleToggleBlock = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = toggleUserBlocked(user.id, !user.isBlocked);
      
      if (updatedUser) {
        onUserUpdate(updatedUser);
        toast.success(updatedUser.isBlocked 
          ? `L'utilisateur ${user.name} a été bloqué` 
          : `L'utilisateur ${user.name} a été débloqué`
        );
      } else {
        toast.error("Une erreur s'est produite");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/dashboard" className="mr-4">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            
            <div className="h-12 w-12 rounded-full bg-wafr-blue flex items-center justify-center text-white text-xl mr-4">
              {user.name.charAt(0)}
            </div>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-sm text-gray-600 mr-3">{user.phoneNumber}</span>
                <span className="text-sm text-gray-500 mr-3">|</span>
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-2 md:mb-0 md:mr-4">
              <div className="text-sm text-gray-500">Solde actuel</div>
              <div className="text-xl font-bold text-wafr-blue">{formatCurrency(user.balance)}</div>
            </div>
            
            {user.isBlocked ? (
              <Badge variant="outline" className="mb-2 md:mb-0 md:mr-4 border-red-200 bg-red-50 text-red-700 px-3 py-1">
                Bloqué
              </Badge>
            ) : (
              <Badge variant="outline" className="mb-2 md:mb-0 md:mr-4 border-green-200 bg-green-50 text-green-700 px-3 py-1">
                Actif
              </Badge>
            )}
            
            <div className="flex space-x-2">
              <Button
                variant={user.isBlocked ? "outline" : "destructive"}
                size="sm"
                className={user.isBlocked ? "text-wafr-green border-wafr-green hover:bg-green-50" : ""}
                onClick={handleToggleBlock}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-b-transparent rounded-full mr-2"></div>
                    Traitement...
                  </div>
                ) : user.isBlocked ? (
                  <>
                    <Unlock className="h-4 w-4 mr-2" />
                    Débloquer
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Bloquer
                  </>
                )}
              </Button>
              
              <Link to={`/users/${user.id}/export`}>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
