import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Building2, MapPin, Users, Shield, Award } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Geniş Portföy',
    description: 'Binlerce gayrimenkul seçeneği ile size en uygun olanı buluyoruz',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Building2,
    title: 'Profesyonel Hizmet',
    description: 'Uzman ekibimiz ile her adımda yanınızdayız',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: MapPin,
    title: 'Stratejik Konumlar',
    description: 'Şehrin en değerli bölgelerinde gayrimenkul fırsatları',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export default function FeatureBoxes() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Neden Landmark Gayrimenkul Yatırım Hizmetleri ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profesyonel gayrimenkul danışmanlığında ve Sigortacılık alanında 20 yıllık deneyim
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className={`mx-auto w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Row */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Güvenilir İşlem</h3>
              <p className="text-gray-600">Tüm işlemleriniz güvenli ve şeffaf</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Kalite Garantisi</h3>
              <p className="text-gray-600">En yüksek kalite standartlarında hizmet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

