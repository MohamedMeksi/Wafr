
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Rechercher par numéro de téléphone..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full md:max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-14 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wafr-blue focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Button 
            type="submit"
            size="sm"
            className="h-7 bg-wafr-blue hover:bg-blue-600"
          >
            Rechercher
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
