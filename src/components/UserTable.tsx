
import { Link } from 'react-router-dom';
import { User } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

const UserTable = ({ users, isLoading = false }: UserTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return formatDistance(date, new Date(), {
      addSuffix: true,
      locale: fr,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wafr-blue"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center">
        <p className="text-lg text-gray-500">Aucun utilisateur trouvé</p>
        <p className="text-sm text-gray-400">Essayez avec un autre numéro de téléphone</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Utilisateur
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Téléphone
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Solde
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dernière activité
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-wafr-blue flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.phoneNumber}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">{formatCurrency(user.balance)}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {user.isBlocked ? (
                  <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                    Bloqué
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    Actif
                  </Badge>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.lastActive)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/users/${user.id}`}>
                  <Button variant="ghost" size="sm" className="text-wafr-blue hover:text-blue-700">
                    Détails
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
