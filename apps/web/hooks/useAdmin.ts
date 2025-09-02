'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/admin-api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: string;
}

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const userData = await adminApi.auth.me();
        setUser(userData);
        
        // ADMIN rolü kontrolü
        if (userData.role !== 'ADMIN') {
          router.push('/admin/login');
          return;
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Yetkilendirme hatası');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = async () => {
    try {
      await adminApi.auth.logout();
      setUser(null);
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: !!user && user.role === 'ADMIN',
  };
}
