'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/hooks/useAdmin';
import { adminApi } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion } from '@/lib/motion';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  type: string;
  status: string;
  published: boolean;
  createdAt: string;
  agent: {
    name: string;
  };
  images: Array<{
    url: string;
    alt?: string;
  }>;
}

interface PropertiesResponse {
  items: Property[];
  total: number;
  page: number;
  take: number;
  totalPages: number;
}

export default function AdminPropertiesPage() {
  const { user, loading, logout } = useAdmin();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoadingProperties(true);
      const response: PropertiesResponse = await adminApi.admin.getProperties({
        search,
        page,
        take: 12,
      });
      setProperties(response.items);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Properties fetch failed:', error);
    } finally {
      setLoadingProperties(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchProperties();
    }
  }, [loading, search, page]);

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      setDeletingId(id);
      await adminApi.admin.deleteProperty(id);
      await fetchProperties();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('İlan silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">İlan Yönetimi</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hoş geldin, {user?.name}
              </span>
              <Button variant="outline" onClick={logout}>
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="İlan ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button asChild>
            <Link href="/admin/ilanlar/yeni">
              <Plus className="mr-2 h-4 w-4" />
              Yeni İlan
            </Link>
          </Button>
        </motion.div>

        {/* Properties Grid */}
        {loadingProperties ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      {property.images.length > 0 ? (
                        <img
                          src={property.images[0].url}
                          alt={property.images[0].alt || property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Eye className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">
                        {property.title}
                      </CardTitle>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{property.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          property.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.published ? 'Yayında' : 'Taslak'}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Fiyat:</span>
                          <span className="font-semibold">
                            {property.price.toLocaleString('tr-TR')} {property.currency}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Durum:</span>
                          <span className="text-sm">{property.status}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Danışman:</span>
                          <span className="text-sm">{property.agent.name}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Tarih:</span>
                          <span className="text-sm">
                            {new Date(property.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link href={`/admin/ilanlar/${property.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </Link>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(property.id)}
                          disabled={deletingId === property.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {deletingId === property.id ? 'Siliniyor...' : 'Sil'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center space-x-2"
              >
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Önceki
                </Button>
                
                <span className="text-sm text-gray-600">
                  Sayfa {page} / {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Sonraki
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500">
              {search ? 'Arama sonucu bulunamadı' : 'Henüz ilan eklenmemiş'}
            </div>
            {!search && (
              <Button asChild className="mt-4">
                <Link href="/admin/ilanlar/yeni">
                  <Plus className="mr-2 h-4 w-4" />
                  İlk İlanı Ekle
                </Link>
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
