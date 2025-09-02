'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import SummaryCard from '@/components/SummaryCard';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import { PropertyGridSkeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Building2, 
  Calendar,
  Flame,
  Car,
  Star,
  Share2,
  Heart,
  Phone,
  Mail
} from 'lucide-react';
import { formatPriceTRY, formatArea } from '@/lib/format';

interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  status: string;
  type: string;
  grossM2?: number;
  netM2?: number;
  rooms: string;
  bath?: number;
  floor?: number;
  totalFloor?: number;
  heating?: string;
  age?: number;
  furnished?: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    district: string;
    neighborhood?: string;
  };
  features?: string[];
  agent: {
    name: string;
    email: string;
  };
  images: Array<{
    url: string;
    alt?: string;
    order: number;
  }>;
  publishedAt?: string;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch property');
        }

        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('İlan yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        
        // Fallback to mock data for development
        setProperty({
          id: '1',
          slug: 'parkvadi-peyzaj-manzarali-3-plus-1',
          title: 'ParkVadi Sitesi – Peyzaj Manzaralı 3+1',
          description: 'Site içi geniş yeşil alanlar, spor sahası ve yürüyüş yolları. Modern tasarım ve kaliteli malzemeler ile inşa edilmiş bu 3+1 daire, aileler için ideal bir yaşam alanı sunuyor.',
          price: '6950000',
          currency: 'TRY',
          status: 'SATILIK',
          type: 'DAIRE',
          grossM2: 135,
          netM2: 110,
          rooms: '3+1',
          bath: 2,
          floor: 3,
          totalFloor: 8,
          heating: 'Merkezi',
          age: 2,
          furnished: false,
          location: {
            lat: 39.93,
            lng: 32.85,
            address: 'Bağlıca Mahallesi, Etimesgut',
            city: 'Ankara',
            district: 'Etimesgut',
            neighborhood: 'Bağlıca'
          },
          features: [
            'Kapalı otopark',
            'Asansör',
            'Güvenlik',
            'Merkezi ısıtma',
            'Oyun parkı',
            'Spor sahası',
            'Yürüyüş yolları',
            'Peyzaj alanları'
          ],
          agent: {
            name: 'Mert Yılmaz',
            email: 'mert@landmark.local'
          },
          images: [
            { url: '/assets/projects/landmark/garden-1.webp', alt: 'Site içi peyzaj', order: 1 },
            { url: '/assets/projects/landmark/garden-2.webp', alt: 'Yeşil alanlar', order: 2 },
            { url: '/assets/projects/landmark/hero.webp', alt: 'Genel görünüm', order: 3 },
            { url: '/assets/projects/landmark/sport-court.webp', alt: 'Spor sahası', order: 4 }
          ],
          publishedAt: '2024-01-15'
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <PropertyGridSkeleton count={1} />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Hata Oluştu</h2>
            <p className="text-red-600 mb-6">{error || 'İlan bulunamadı'}</p>
            <Button onClick={() => window.history.back()}>
              Geri Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const statusText = property.status === 'SATILIK' ? 'Satılık' : 'Kiralık';
  const statusColor = property.status === 'SATILIK' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-primary">Ana Sayfa</a></li>
            <li>/</li>
            <li><a href="/ilanlar" className="hover:text-primary">İlanlar</a></li>
            <li>/</li>
            <li className="text-gray-900">{property.title}</li>
          </ol>
        </nav>

        {/* Property Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg p-6 mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${statusColor} text-white`}>
                  {statusText}
                </Badge>
                <Badge variant="outline">
                  {property.type}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                <span>
                  {property.location.neighborhood && `${property.location.neighborhood}, `}
                  {property.location.district}, {property.location.city}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-primary mb-2">
                {formatPriceTRY(property.price)}
              </div>
              <div className="text-sm text-gray-500">
                {property.currency === 'TRY' ? 'Türk Lirası' : property.currency}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              <Phone className="h-4 w-4 mr-2" />
              Hemen Ara
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
              <Mail className="h-4 w-4 mr-2" />
              Mesaj Gönder
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Favorilere Ekle
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Gallery images={property.images} title={property.title} />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </motion.div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-6 w-6 text-accent mr-2" />
                  Özellikler
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Map */}
            {property.location.lat && property.location.lng && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Map lat={property.location.lat} lng={property.location.lng} title={property.title} />
              </motion.div>
            )}
          </div>

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SummaryCard property={property} />
            </motion.div>
          </div>
        </div>

        {/* Similar Properties (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Benzer İlanlar
            </h2>
            <div className="text-center py-12 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Benzer ilanlar burada görüntülenecek</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
