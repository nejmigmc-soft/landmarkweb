import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Shield,
  Star
} from 'lucide-react';
import { 
  formatPriceTRY, 
  formatArea, 
  formatRooms, 
  formatBath, 
  formatFloor, 
  formatHeating, 
  formatAge 
} from '@/lib/format';

interface Property {
  id: string;
  title: string;
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
}

interface SummaryCardProps {
  property: Property;
}

export default function SummaryCard({ property }: SummaryCardProps) {
  const statusText = property.status === 'SATILIK' ? 'Satılık' : 'Kiralık';
  const statusColor = property.status === 'SATILIK' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className={`${statusColor} text-white`}>
            {statusText}
          </Badge>
          <Badge variant="secondary">
            {property.type}
          </Badge>
        </div>
        
        <CardTitle className="text-2xl font-bold text-primary mb-2">
          {formatPriceTRY(property.price)}
        </CardTitle>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">
            {property.location.district}, {property.location.city}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Property Details */}
        <div className="grid grid-cols-2 gap-4">
          {property.grossM2 && (
            <div className="flex items-center space-x-2">
              <Square className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Brüt</p>
                <p className="font-medium">{formatArea(property.grossM2)}</p>
              </div>
            </div>
          )}
          
          {property.netM2 && (
            <div className="flex items-center space-x-2">
              <Square className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Net</p>
                <p className="font-medium">{formatArea(property.netM2)}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Bed className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Oda</p>
              <p className="font-medium">{formatRooms(property.rooms)}</p>
            </div>
          </div>
          
          {property.bath && (
            <div className="flex items-center space-x-2">
              <Bath className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Banyo</p>
                <p className="font-medium">{formatBath(property.bath)}</p>
              </div>
            </div>
          )}
          
          {property.floor && (
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Kat</p>
                <p className="font-medium">{formatFloor(property.floor, property.totalFloor)}</p>
              </div>
            </div>
          )}
          
          {property.heating && (
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Isıtma</p>
                <p className="font-medium">{formatHeating(property.heating)}</p>
              </div>
            </div>
          )}
          
          {property.age && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Yaş</p>
                <p className="font-medium">{formatAge(property.age)}</p>
              </div>
            </div>
          )}
          
          {property.furnished !== undefined && (
            <div className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Eşyalı</p>
                <p className="font-medium">{property.furnished ? 'Evet' : 'Hayır'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Star className="h-4 w-4 mr-2 text-accent" />
              Özellikler
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Agent Info */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-primary" />
            Danışman
          </h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-gray-900">{property.agent.name}</p>
            <p className="text-sm text-gray-600">{property.agent.email}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button className="w-full inline-flex items-center gap-2 rounded-md border border-brand-700 px-4 py-2 text-brand-700 hover:bg-brand-700 hover:text-white transition">
            Danışman ile İletişime Geç
          </Button>
          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white">
            Detaylı Bilgi Al
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 text-center">
          <p>İlan No: {property.id}</p>
          <p>Son güncelleme: Bugün</p>
        </div>
      </CardContent>
    </Card>
  );
}

