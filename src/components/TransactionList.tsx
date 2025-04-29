
import { Transaction } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionList = ({ transactions, isLoading = false }: TransactionListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50 text-green-700';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'failed':
        return 'border-red-200 bg-red-50 text-red-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const getStatusLabel = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'Complété';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return '↓';
      case 'withdrawal':
        return '↑';
      case 'transfer':
        return '↔';
      case 'reward':
        return '★';
      default:
        return '•';
    }
  };

  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'text-wafr-green';
      case 'withdrawal':
        return 'text-wafr-red';
      case 'transfer':
        return 'text-wafr-blue';
      case 'reward':
        return 'text-wafr-yellow';
      default:
        return 'text-wafr-gray';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wafr-blue"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center">
        <p className="text-lg text-gray-500">Aucune transaction trouvée</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Montant
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(transaction.date, 'dd MMM yyyy', { locale: fr })}
                </div>
                <div className="text-xs text-gray-500">
                  {format(transaction.date, 'HH:mm', { locale: fr })}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium flex items-center ${getTypeColor(transaction.type)}`}>
                  <span className="mr-1 text-lg">{getTypeIcon(transaction.type)}</span>
                  <span className="capitalize">
                    {transaction.type === 'deposit' && 'Dépôt'}
                    {transaction.type === 'withdrawal' && 'Retrait'}
                    {transaction.type === 'transfer' && 'Transfert'}
                    {transaction.type === 'reward' && 'Récompense'}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{transaction.description}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className={`text-sm font-semibold ${
                  transaction.type === 'deposit' || transaction.type === 'reward' 
                    ? 'text-wafr-green' 
                    : transaction.type === 'withdrawal' 
                      ? 'text-wafr-red' 
                      : 'text-gray-900'
                }`}>
                  {transaction.type === 'deposit' || transaction.type === 'reward' ? '+ ' : transaction.type === 'withdrawal' ? '- ' : ''}
                  {formatCurrency(transaction.amount)}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Badge variant="outline" className={getStatusColor(transaction.status)}>
                  {getStatusLabel(transaction.status)}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
