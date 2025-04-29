
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileDown, Check } from 'lucide-react';
import { getUserById, getUserTransactions, User, Transaction } from '@/utils/mockData';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ExportPDF = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

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

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsGenerated(true);
      toast.success("PDF généré avec succès");
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la génération du PDF");
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    toast.success("Téléchargement du PDF en cours");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(amount);
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
        <div className="mb-6 flex items-center">
          <Link to={`/users/${id}`}>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900">Exportation des transactions</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Détails de l'exportation</h2>
            <p className="text-gray-500">Informations sur l'exportation des transactions de l'utilisateur</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Utilisateur</h3>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.phoneNumber}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Transactions</h3>
              <p className="text-lg font-semibold">{transactions.length} transactions</p>
              <p className="text-sm text-gray-600">
                Période: {format(transactions[transactions.length - 1]?.date || new Date(), 'dd/MM/yyyy', { locale: fr })} - {format(transactions[0]?.date || new Date(), 'dd/MM/yyyy', { locale: fr })}
              </p>
              <p className="text-sm text-gray-600">
                Solde actuel: <span className="font-semibold">{formatCurrency(user.balance)}</span>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center justify-center">
              {!isGenerated ? (
                <Button
                  className="w-full md:w-64 bg-wafr-blue hover:bg-blue-600"
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-4 w-4 border-2 border-b-transparent rounded-full mr-2"></div>
                      Génération en cours...
                    </div>
                  ) : (
                    <>
                      <FileDown className="h-5 w-5 mr-2" />
                      Générer le rapport PDF
                    </>
                  )}
                </Button>
              ) : (
                <div className="text-center w-full">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-8 w-8 text-wafr-green" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">Rapport généré avec succès</h3>
                  <p className="text-gray-600 mb-4">Le rapport est prêt à être téléchargé</p>
                  
                  <Button
                    className="w-full md:w-64 bg-wafr-blue hover:bg-blue-600"
                    onClick={handleDownloadPDF}
                  >
                    <FileDown className="h-5 w-5 mr-2" />
                    Télécharger le PDF
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExportPDF;
