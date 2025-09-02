'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdmin } from '@/hooks/useAdmin';
import { adminApi } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion } from '@/lib/motion';
import { Plus, Home, Users, DollarSign, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalProperties: number;
  recentProperties: Array<{
    id: string;
    title: string;
    price: number;
    currency: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const { user, loading, logout } = useAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const properties = await adminApi.admin.getProperties({ take: 5 });
        setStats({
          totalProperties: properties.total,
          recentProperties: properties.items,
        });
      } catch (error) {
        console.error('Stats fetch failed:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (!loading) {
      fetchStats();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96" />
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
            <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
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
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam İlan</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingStats ? <Skeleton className="h-8 w-16" /> : stats?.totalProperties}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif İlanlar</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingStats ? <Skeleton className="h-8 w-16" /> : '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingStats ? <Skeleton className="h-8 w-16" /> : '₺0'}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-4"
        >
          <Button asChild>
            <Link href="/admin/ilanlar/yeni">
              <Plus className="mr-2 h-4 w-4" />
              Yeni İlan Ekle
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link href="/admin/ilanlar">
              Tüm İlanları Görüntüle
            </Link>
          </Button>
        </motion.div>

        {/* Recent Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Son Eklenen İlanlar</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {loadingStats ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))
            ) : stats?.recentProperties.length ? (
              stats.recentProperties.map((property) => (
                <div key={property.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(property.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {property.price.toLocaleString('tr-TR')} {property.currency}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                Henüz ilan eklenmemiş
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
