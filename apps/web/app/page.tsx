'use client';

import { motion } from '@/lib/motion';
import HeroSlider from '@/components/HeroSlider';
import FeatureBoxes from '@/components/FeatureBoxes';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedPropertiesCarousel from '@/components/FeaturedPropertiesCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Building2,
  CheckCircle,
  Star,
  Shield,
  Phone
} from 'lucide-react';
import Link from 'next/link';

// Mock data for featured properties (replace with API call)
const mockProperties = [
  {
    id: '1',
    slug: 'parkvadi-peyzaj-manzarali-3-plus-1',
    title: 'ParkVadi Sitesi – Peyzaj Manzaralı 3+1',
    price: '6950000',
    currency: 'TRY',
    status: 'SATILIK',
    type: 'DAIRE',
    grossM2: 135,
    netM2: 110,
    rooms: '3+1',
    bath: 2,
    location: {
      city: 'Ankara',
      district: 'Etimesgut',
      neighborhood: 'Bağlıca'
    },
    images: [
      { url: '/assets/projects/landmark/garden-1.webp', alt: 'Site içi peyzaj' },
      { url: '/assets/projects/landmark/garden-2.webp', alt: 'Yeşil alanlar' }
    ]
  },
  {
    id: '2',
    slug: 'modern-villa-baglica',
    title: 'Modern Villa Bağlıca',
    price: '12500000',
    currency: 'TRY',
    status: 'SATILIK',
    type: 'VILLA',
    grossM2: 280,
    netM2: 220,
    rooms: '4+1',
    bath: 3,
    location: {
      city: 'Ankara',
      district: 'Etimesgut',
      neighborhood: 'Bağlıca'
    },
    images: [
      { url: '/assets/projects/landmark/hero.webp', alt: 'Modern villa' }
    ]
  },
  {
    id: '3',
    slug: 'ofis-katki-baglica',
    title: 'Ofis Katkı Bağlıca',
    price: '8500000',
    currency: 'TRY',
    status: 'SATILIK',
    type: 'OFIS',
    grossM2: 180,
    netM2: 150,
    rooms: 'Açık Ofis',
    bath: 2,
    location: {
      city: 'Ankara',
      district: 'Etimesgut',
      neighborhood: 'Bağlıca'
    },
    images: [
      { url: '/assets/projects/landmark/sport-court.webp', alt: 'Ofis alanı' }
    ]
  }
];

const stats = [
  { icon: Building2, value: '2,500+', label: 'Gayrimenkul' },
  { icon: Users, value: '1,200+', label: 'Mutlu Müşteri' },
  { icon: Award, value: '20+', label: 'Yıllık Deneyim' },
  { icon: Star, value: '4.9', label: 'Müşteri Puanı' },
];

const partners = [
  { name: 'Partner 1', logo: '/assets/brand/logo.png' },
  { name: 'Partner 2', logo: '/assets/brand/logo.png' },
  { name: 'Partner 3', logo: '/assets/brand/logo.png' },
  { name: 'Partner 4', logo: '/assets/brand/logo.png' },
];

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Slider */}
      <HeroSlider />

      {/* Feature Boxes */}
      <FeatureBoxes />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Properties */}
      <FeaturedPropertiesCarousel properties={mockProperties} />

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sigorta Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Güvenli yarınlar için kapsamlı sigorta çözümleri sunuyoruz. 
              Araç, konut, sağlık ve daha fazlası için uzman danışmanlık.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Kasko', icon: '🚗', desc: 'Araç kasko sigortası' },
              { name: 'Trafik', icon: '🛣️', desc: 'Zorunlu trafik sigortası' },
              { name: 'Konut', icon: '🏠', desc: 'Konut sigortası' },
              { name: 'DASK', icon: '🏢', desc: 'Deprem sigortası' },
            ].map((product, index) => (
              <motion.div
                key={product.name}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/sigorta/teklif-al">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Hemen Teklif Al
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Hayalinizdeki Eve Kavuşmaya Hazır mısınız?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Uzman ekibimiz ile iletişime geçin ve size özel çözümler sunalım
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ilanlar">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Building2 className="mr-2 h-5 w-5" />
                  İlanları Görüntüle
                </Button>
              </Link>
              <Button size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/iletisim" className="inline-flex items-center gap-2">
                  <Phone size={18} />
                  <span>İletişime Geç</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Güvenilir Ortaklarımız
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sektörde güvenilir markalarla çalışıyoruz
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-24 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
