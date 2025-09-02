'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2, DollarSign } from 'lucide-react';

interface SearchFilters {
  city: string;
  status: string;
  type: string;
  minPrice: string;
  maxPrice: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>({
    city: '',
    status: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const queryString = params.toString();
    router.push(`/ilanlar${queryString ? `?${queryString}` : ''}`);
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Şehir"
            value={filters.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          >
            <option value="">Durum</option>
            <option value="SATILIK">Satılık</option>
            <option value="KIRALIK">Kiralık</option>
          </select>
        </div>

        {/* Type */}
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          >
            <option value="">Tip</option>
            <option value="DAIRE">Daire</option>
            <option value="VILLA">Villa</option>
            <option value="OFIS">Ofis</option>
            <option value="ARSA">Arsa</option>
            <option value="DUKKAN">Dükkan</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="number"
            placeholder="Min Fiyat"
            value={filters.minPrice}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Max Price */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="number"
            placeholder="Max Fiyat"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button 
          onClick={handleSearch}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
        >
          <Search className="mr-2 h-5 w-5" />
          Arama Yap
        </Button>
      </div>
    </div>
  );
}

