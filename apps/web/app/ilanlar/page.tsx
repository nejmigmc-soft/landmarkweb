'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { useSearchParams, useRouter } from 'next/navigation';
import FiltersBar from '@/components/FiltersBar';
import PropertyCard from '@/components/PropertyCard';
import { PropertyGridSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/button';
import { Building2, Filter, X, Loader2 } from 'lucide-react';

interface Property {
  id: string;
  slug: string;
  title: string;
  price: string;
  currency: string;
  status: string;
  type: string;
  grossM2?: number;
  netM2?: number;
  rooms: string;
  bath?: number;
  location: {
    city: string;
    district: string;
    neighborhood?: string;
  };
  images: Array<{
    url: string;
    alt?: string;
  }>;
}

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const take = 12; // Default page size
  
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    district: searchParams.get('district') || '',
    status: searchParams.get('status') || '',
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  // Initial SSR fetch
  const fetchInitialProperties = async (filterParams: any) => {
    setLoading(true);
    setError(null);
    setSkip(0);

    try {
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== '') params.append(key, value.toString());
      });
      
      params.append('take', take.toString());
      params.append('skip', '0');

      const response = await fetch(`/api/properties?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setSkip(data.items?.length || 0);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('İlanlar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      setItems([]);
      setTotal(0);
      setSkip(0);
    } finally {
      setLoading(false);
    }
  };

  // Load more functionality
  const loadMore = async () => {
    if (loadingMore || items.length >= total) return;
    
    setLoadingMore(true);
    
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') params.append(key, value.toString());
      });
      
      params.append('take', take.toString());
      params.append('skip', skip.toString());

      const response = await fetch(`/api/properties?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch more properties');
      }

      const data = await response.json();
      const moreItems = data.items || [];
      
      if (moreItems.length > 0) {
        setItems((prev: Property[]) => [...prev, ...moreItems]);
        setSkip((prev: number) => prev + moreItems.length);
        setTotal(data.total || total);
      }
    } catch (err) {
      console.error('Error loading more properties:', err);
      setError('Daha fazla ilan yüklenirken bir hata oluştu.');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchInitialProperties(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    router.push('/ilanlar');
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);
  const hasMoreItems = items.length < total;
  const showLoadMore = items.length > 0 && hasMoreItems && !loading && !loadingMore;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 pt-20"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gayrimenkul İlanları
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Size en uygun gayrimenkulü bulun. Filtreleri kullanarak arama yapabilirsiniz.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Bar */}
      <FiltersBar onFiltersChange={handleFiltersChange} />

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-medium text-gray-900">
              {loading ? 'Yükleniyor...' : `${items.length} / ${total} İlan`}
            </span>
            {hasActiveFilters && (
              <span className="text-sm text-gray-500">
                (Filtrelenmiş sonuçlar)
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Filtreleri Temizle
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center gap-2 text-red-800">
              <X className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Properties Grid */}
        {loading ? (
          <PropertyGridSkeleton count={8} />
        ) : items.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {items.map((property: Property, index: number) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              İlan Bulunamadı
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Arama kriterlerinize uygun ilan bulunamadı. Filtreleri değiştirerek tekrar deneyin.
            </p>
            <Button onClick={clearAllFilters} className="bg-primary hover:bg-primary/90">
              <Filter className="h-4 w-4 mr-2" />
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="px-8 py-3"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Yükleniyor...
                </div>
              ) : (
                'Daha Fazla İlan Göster'
              )}
            </Button>
          </div>
        )}

        {/* Loading More Skeleton */}
        {loadingMore && (
          <div className="mt-8">
            <PropertyGridSkeleton count={4} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
