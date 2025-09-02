'use client';

import { motion } from '@/lib/motion';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

interface InsuranceProduct {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  features: string[];
  icon: string;
}

export default function InsuranceProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<InsuranceProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/insurance/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        const foundProduct = data.products.find((p: InsuranceProduct) => p.slug === slug);
        
        if (!foundProduct) {
          notFound();
        }

        setProduct(foundProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Ürün yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        
        // Fallback to mock data for development
        const mockProducts: InsuranceProduct[] = [
          {
            id: '1',
            name: 'Kasko',
            slug: 'kasko',
            shortDesc: 'Araç kasko sigortası ile güvende kalın',
            description: 'Kapsamlı araç kasko sigortası ile olası hasarlara karşı koruma altında olun. Çarpışma, hırsızlık, doğal afetler ve daha fazlası.',
            features: ['Çarpışma koruması', 'Hırsızlık koruması', 'Doğal afet koruması', 'Yol yardımı', '7/24 destek'],
            icon: '/assets/insurance/icons/kasko.svg'
          },
          {
            id: '2',
            name: 'Trafik',
            slug: 'trafik',
            shortDesc: 'Zorunlu trafik sigortası',
            description: 'Yasal zorunluluk olan trafik sigortası ile üçüncü şahıslara karşı sorumluluğunuzu karşılayın.',
            features: ['Üçüncü şahıs koruması', 'Yasal zorunluluk', 'Hızlı tazminat', 'Geniş anlaşma ağı'],
            icon: '/assets/insurance/icons/trafik.svg'
          },
          {
            id: '3',
            name: 'Konut',
            slug: 'konut',
            shortDesc: 'Evinizi ve eşyalarınızı koruyun',
            description: 'Konut sigortası ile evinizi, eşyalarınızı ve değerli varlıklarınızı olası risklere karşı koruma altına alın.',
            features: ['Yangın koruması', 'Hırsızlık koruması', 'Su hasarı', 'Doğal afetler', 'Eşya koruması'],
            icon: '/assets/insurance/icons/konut.svg'
          },
          {
            id: '4',
            name: 'DASK',
            slug: 'dask',
            shortDesc: 'Zorunlu deprem sigortası',
            description: 'Zorunlu Deprem Sigortası (DASK) ile deprem riskine karşı evinizi koruma altına alın.',
            features: ['Deprem koruması', 'Yasal zorunluluk', 'Devlet garantisi', 'Hızlı tazminat'],
            icon: '/assets/insurance/icons/dask.svg'
          }
        ];

        const foundProduct = mockProducts.find(p => p.slug === slug);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          notFound();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Ürün Bulunamadı</h2>
            <p className="text-gray-600 mb-6">{error || 'Aradığınız ürün bulunamadı.'}</p>
            <Link href="/sigorta">
              <Button>Sigorta Sayfasına Dön</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background py-20"
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Ana Sayfa</Link></li>
            <li><ArrowRight className="w-4 h-4" /></li>
            <li><Link href="/sigorta" className="hover:text-primary">Sigorta</Link></li>
            <li><ArrowRight className="w-4 h-4" /></li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Product Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Product Header */}
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-xl text-gray-600">{product.shortDesc}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ürün Açıklaması</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Özellikler</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Product */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Neden Bu Ürün?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Kapsamlı Koruma</h3>
                    <p className="text-gray-600 text-sm">Tüm risklere karşı tam koruma sağlar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hızlı Tazminat</h3>
                    <p className="text-gray-600 text-sm">7/24 destek ve hızlı tazminat süreci</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Uygun Fiyat</h3>
                    <p className="text-gray-600 text-sm">Rekabetçi fiyatlarla kaliteli hizmet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Uzman Danışmanlık</h3>
                    <p className="text-gray-600 text-sm">Deneyimli ekibimizle yanınızdayız</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Quote Card */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Hızlı Teklif Al
                </h3>
                <p className="text-gray-600 mb-6">
                  Bu ürün için hemen teklif alın. Uzman ekibimiz size en uygun fiyatı sunacak.
                </p>
                <Link href={`/sigorta/teklif-al?product=${product.slug}`}>
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Teklif Al
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  İletişim
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="text-gray-600">0312 123 45 67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="text-gray-600">sigorta@landmark.com</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Pazartesi - Cuma: 09:00 - 18:00
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
