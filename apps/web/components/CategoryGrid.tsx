import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Building2, 
  Briefcase, 
  TreePine, 
  Store, 
  Umbrella 
} from 'lucide-react';

const categories = [
  {
    name: 'Daire',
    icon: Home,
    href: '/ilanlar?type=DAIRE',
    description: 'Konut daireleri',
    color: 'bg-blue-500',
    count: '2,450+',
  },
  {
    name: 'Villa',
    icon: Building2,
    href: '/ilanlar?type=VILLA',
    description: 'Lüks villalar',
    color: 'bg-green-500',
    count: '180+',
  },
  {
    name: 'Ofis',
    icon: Briefcase,
    href: '/ilanlar?type=OFIS',
    description: 'İş ofisleri',
    color: 'bg-purple-500',
    count: '320+',
  },
  {
    name: 'Arsa',
    icon: TreePine,
    href: '/ilanlar?type=ARSA',
    description: 'Yatırım arsaları',
    color: 'bg-orange-500',
    count: '95+',
  },
  {
    name: 'Dükkan',
    icon: Store,
    href: '/ilanlar?type=DUKKAN',
    description: 'Ticari dükkanlar',
    color: 'bg-red-500',
    count: '210+',
  },
  {
    name: 'Yazlık',
    icon: Umbrella,
    href: '/ilanlar?type=YAZLIK',
    description: 'Tatil evleri',
    color: 'bg-teal-500',
    count: '75+',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Gayrimenkul Kategorileri
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İhtiyacınıza uygun gayrimenkul tipini seçin
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {category.description}
                  </p>
                  <span className="text-xs text-gray-500 font-medium">
                    {category.count}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/ilanlar"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Tüm İlanları Görüntüle
            <Building2 className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

