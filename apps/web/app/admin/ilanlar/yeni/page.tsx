'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import { adminApi } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from '@/lib/motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import Link from 'next/link';

interface UploadedFile {
  url: string;
  key: string;
  contentType: string;
  alt?: string;
  order: number;
  isCover: boolean;
}

const PROPERTY_TYPES = [
  { value: 'DAIRE', label: 'Daire' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'RESIDENCE', label: 'Residence' },
  { value: 'ISYERI', label: 'İş Yeri' },
  { value: 'ARSA', label: 'Arsa' },
];

const PROPERTY_STATUS = [
  { value: 'SATILIK', label: 'Satılık' },
  { value: 'KIRALIK', label: 'Kiralık' },
];

const CURRENCIES = [
  { value: 'TRY', label: 'TL' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

export default function NewPropertyPage() {
  const { user, loading, logout } = useAdmin();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    type: 'DAIRE' as const,
    status: 'SATILIK' as const,
    price: '',
    currency: 'TRY' as const,
    rooms: '',
    bath: '',
    netM2: '',
    grossM2: '',
    floor: '',
    totalFloor: '',
    heating: '',
    age: '',
    furnished: false,
    city: '',
    district: '',
    neighborhood: '',
    address: '',
    published: false,
    agentId: user?.id || '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Otomatik slug oluştur
    if (field === 'title') {
      const slug = value.toString()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.city || !formData.district) {
      alert('Lütfen zorunlu alanları doldurun');
      return;
    }

    if (uploadedImages.length === 0) {
      alert('En az bir görsel eklemelisiniz');
      return;
    }

    setSaving(true);

    try {
      // İlan oluştur
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bath: formData.bath ? parseInt(formData.bath) : undefined,
        netM2: formData.netM2 ? parseInt(formData.netM2) : undefined,
        grossM2: formData.grossM2 ? parseInt(formData.grossM2) : undefined,
        floor: formData.floor ? parseInt(formData.floor) : undefined,
        totalFloor: formData.totalFloor ? parseInt(formData.totalFloor) : undefined,
        age: formData.age ? parseInt(formData.age) : undefined,
        location: {
          city: formData.city,
          district: formData.district,
          neighborhood: formData.neighborhood || undefined,
          address: formData.address || undefined,
        },
      };

      const property = await adminApi.admin.createProperty(propertyData);

      // Görselleri ekle
      for (const image of uploadedImages) {
        await adminApi.admin.addPropertyImage(property.id, {
          url: image.url,
          alt: image.alt,
          order: image.order,
          isCover: image.isCover,
        });
      }

      alert('İlan başarıyla oluşturuldu!');
      router.push('/admin/ilanlar');
      
    } catch (error) {
      console.error('Property creation failed:', error);
      alert('İlan oluşturulurken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/ilanlar">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Yeni İlan Ekle</h1>
            </div>
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

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">İlan Başlığı *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Örn: Merkezi konumda 3+1 daire"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="Otomatik oluşturulur"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Açıklama *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="İlan detaylarını açıklayın..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">İlan Türü *</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    {PROPERTY_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="status">Durum *</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    {PROPERTY_STATUS.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="published">Yayın Durumu</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => handleInputChange('published', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="published" className="text-sm">
                      Hemen yayınla
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price and Details */}
          <Card>
            <CardHeader>
              <CardTitle>Fiyat ve Detaylar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Fiyat *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="currency">Para Birimi</Label>
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {CURRENCIES.map(currency => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="rooms">Oda Sayısı *</Label>
                  <Input
                    id="rooms"
                    value={formData.rooms}
                    onChange={(e) => handleInputChange('rooms', e.target.value)}
                    placeholder="3+1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="bath">Banyo Sayısı</Label>
                  <Input
                    id="bath"
                    type="number"
                    value={formData.bath}
                    onChange={(e) => handleInputChange('bath', e.target.value)}
                    placeholder="1"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="netM2">Net m²</Label>
                  <Input
                    id="netM2"
                    type="number"
                    value={formData.netM2}
                    onChange={(e) => handleInputChange('netM2', e.target.value)}
                    placeholder="120"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="grossM2">Brüt m²</Label>
                  <Input
                    id="grossM2"
                    type="number"
                    value={formData.grossM2}
                    onChange={(e) => handleInputChange('grossM2', e.target.value)}
                    placeholder="140"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Bina Yaşı</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="5"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="floor">Bulunduğu Kat</Label>
                  <Input
                    id="floor"
                    type="number"
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                    placeholder="3"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="totalFloor">Toplam Kat</Label>
                  <Input
                    id="totalFloor"
                    type="number"
                    value={formData.totalFloor}
                    onChange={(e) => handleInputChange('totalFloor', e.target.value)}
                    placeholder="8"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="heating">Isıtma</Label>
                  <Input
                    id="heating"
                    value={formData.heating}
                    onChange={(e) => handleInputChange('heating', e.target.value)}
                    placeholder="Doğalgaz"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    checked={formData.furnished}
                    onChange={(e) => handleInputChange('furnished', e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="furnished">Eşyalı</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Konum Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Şehir *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="İstanbul"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="district">İlçe *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    placeholder="Kadıköy"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neighborhood">Mahalle</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    placeholder="Fenerbahçe"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Adres</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Detaylı adres bilgisi"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Görseller</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader
                onUploaded={setUploadedImages}
                initialImages={[]}
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/ilanlar')}
            >
              İptal
            </Button>
            
            <Button
              type="submit"
              disabled={saving}
              className="min-w-[120px]"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
