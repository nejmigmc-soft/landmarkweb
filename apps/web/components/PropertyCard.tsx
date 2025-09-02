import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Car } from 'lucide-react';
import { formatPriceTRY, formatArea } from '@/lib/format';

interface Property {
  id: string;
  slug: string;
  title: string;
  price: string;
  currency: string;
  status: string;
  type: string;
  grossM2?: number;
  netM2?: number;
  rooms: string;
  bath?: number;
  location: {
    city: string;
    district: string;
    neighborhood?: string;
  };
  images: Array<{
    url: string;
    alt?: string;
  }>;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const statusText = property.status === 'SATILIK' ? 'Satılık' : 'Kiralık';
  const statusColor = property.status === 'SATILIK' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <Link href={`/ilan/${property.slug}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={property.images[0]?.url || '/assets/placeholder.jpg'}
            alt={property.images[0]?.alt || property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${statusColor} text-white`}>
              {statusText}
            </Badge>
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {property.type}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          {/* Price */}
          <div className="text-2xl font-bold text-primary mb-3">
            {formatPriceTRY(property.price)}
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-sm">
              {property.location.district}, {property.location.city}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-400" />
              <span>{property.rooms}</span>
            </div>
            
            {property.bath && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-gray-400" />
                <span>{property.bath}</span>
              </div>
            )}
            
            {property.grossM2 && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1 text-gray-400" />
                <span>{formatArea(property.grossM2)}</span>
              </div>
            )}
          </div>

          {/* Additional Info */}
          {property.netM2 && (
            <div className="mt-2 text-xs text-gray-500">
              Net: {formatArea(property.netM2)}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

