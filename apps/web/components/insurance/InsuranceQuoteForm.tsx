'use client';

import { motion } from '@/lib/motion';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  city: z.string().optional(),
  productSlug: z.string().min(1, 'Lütfen bir ürün seçiniz'),
  details: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface InsuranceProduct {
  id: string;
  name: string;
  slug: string;
}

export default function InsuranceQuoteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  // Fetch products and set default product if specified in URL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/insurance/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
          
          // Set default product if specified in URL
          const productSlug = searchParams.get('product');
          if (productSlug) {
            setValue('productSlug', productSlug);
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to mock data
        setProducts([
          { id: '1', name: 'Kasko', slug: 'kasko' },
          { id: '2', name: 'Trafik', slug: 'trafik' },
          { id: '3', name: 'Konut', slug: 'konut' },
          { id: '4', name: 'DASK', slug: 'dask' },
        ]);
      }
    };

    fetchProducts();
  }, [searchParams, setValue]);

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/insurance/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Teklif gönderilemedi');
      }

      const result = await response.json();
      
      if (result.ok) {
        // Redirect to thank you page after successful submission
        router.push('/sigorta/tesekkur');
      } else {
        setError(result.message || 'Bir hata oluştu');
      }
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError('Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Sigorta Teklifi Alın
        </h2>
        <p className="text-gray-600">
          Size en uygun teklifi sunabilmemiz için lütfen formu doldurun
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Ad Soyad *
          </Label>
          <Input
            id="fullName"
            type="text"
            {...register('fullName')}
            className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
            placeholder="Adınız ve soyadınız"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="ornek@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefon *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="05XX XXX XX XX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            Şehir
          </Label>
          <Input
            id="city"
            type="text"
            {...register('city')}
            className="mt-1"
            placeholder="Şehriniz"
          />
        </div>
      </div>

      {/* Product Selection */}
      <div>
        <Label htmlFor="productSlug" className="text-sm font-medium text-gray-700">
          Sigorta Ürünü *
        </Label>
        <select
          id="productSlug"
          {...register('productSlug')}
          className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
            errors.productSlug ? 'border-red-500' : ''
          }`}
        >
          <option value="">Ürün seçiniz</option>
          {products.map((product) => (
            <option key={product.id} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
        {errors.productSlug && (
          <p className="mt-1 text-sm text-red-600">{errors.productSlug.message}</p>
        )}
      </div>

      {/* Details */}
      <div>
        <Label htmlFor="details" className="text-sm font-medium text-gray-700">
          Ek Bilgiler / Notlar
        </Label>
        <Textarea
          id="details"
          {...register('details')}
          className="mt-1"
          rows={4}
          placeholder="Sigorta ihtiyaçlarınız hakkında ek bilgi verebilirsiniz..."
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-accent/90 text-white py-3 text-lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Gönderiliyor...
          </div>
        ) : (
          'Teklif Talebi Gönder'
        )}
      </Button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center">
        Bilgileriniz güvenle saklanacak ve sadece sigorta teklifi için kullanılacaktır.
      </p>
    </motion.form>
  );
}
