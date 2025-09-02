'use client';

import { motion } from '@/lib/motion';
import { useState, useEffect } from 'react';
import InsuranceProductCard from './InsuranceProductCard';
import { Shield, AlertCircle } from 'lucide-react';

interface InsuranceProduct {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  icon?: string;
}

export default function InsuranceProductGrid() {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/insurance/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch insurance products');
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching insurance products:', err);
        setError('Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        
        // Fallback to mock data for development
        setProducts([
          {
            id: '1',
            name: 'Kasko',
            slug: 'kasko',
            shortDesc: 'Araç kasko sigortası ile güvende kalın',
            icon: '/assets/insurance/icons/kasko.svg'
          },
          {
            id: '2',
            name: 'Trafik',
            slug: 'trafik',
            shortDesc: 'Zorunlu trafik sigortası',
            icon: '/assets/insurance/icons/trafik.svg'
          },
          {
            id: '3',
            name: 'Konut',
            slug: 'konut',
            shortDesc: 'Evinizi ve eşyalarınızı koruyun',
            icon: '/assets/insurance/icons/konut.svg'
          },
          {
            id: '4',
            name: 'DASK',
            slug: 'dask',
            shortDesc: 'Zorunlu deprem sigortası',
            icon: '/assets/insurance/icons/dask.svg'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Hata Oluştu</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ürün Bulunamadı</h3>
        <p className="text-gray-600">Şu anda sigorta ürünü bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <InsuranceProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
