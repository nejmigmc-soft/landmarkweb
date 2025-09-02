'use client';

import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface InsuranceProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDesc: string;
    icon?: string;
  };
}

export default function InsuranceProductCard({ product }: InsuranceProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              {product.icon ? (
                <img 
                  src={product.icon} 
                  alt={product.name}
                  className="w-8 h-8"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <Shield className={`w-8 h-8 text-primary ${product.icon ? 'hidden' : ''}`} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-6 line-clamp-3">
              {product.shortDesc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <Link href={`/sigorta/urun/${product.slug}`} className="flex-1">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                Detaylar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href={`/sigorta/teklif-al?product=${product.slug}`} className="flex-1">
              <Button className="w-full bg-accent hover:bg-accent/90">
                Teklif Al
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
