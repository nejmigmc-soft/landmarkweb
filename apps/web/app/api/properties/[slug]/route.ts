import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/properties/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      throw new Error('Failed to fetch property');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching property:', error);
    
    // Return mock data for development
    const mockProperty = {
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
    };

    return NextResponse.json(mockProperty);
  }
}
