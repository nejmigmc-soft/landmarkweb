import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/insurance/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch insurance products');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching insurance products:', error);
    
    // Return mock data for development
    const mockProducts = [
      {
        id: '1',
        name: 'Kasko',
        slug: 'kasko',
        shortDesc: 'Araç kasko sigortası ile güvende kalın',
        description: 'Kapsamlı araç kasko sigortası ile olası hasarlara karşı koruma altında olun. Çarpışma, hırsızlık, doğal afetler ve daha fazlası.',
        features: ['Çarpışma koruması', 'Hırsızlık koruması', 'Doğal afet koruması', 'Yol yardımı', '7/24 destek'],
        icon: '/assets/insurance/icons/kasko.svg'
      },
      {
        id: '2',
        name: 'Trafik',
        slug: 'trafik',
        shortDesc: 'Zorunlu trafik sigortası',
        description: 'Yasal zorunluluk olan trafik sigortası ile üçüncü şahıslara karşı sorumluluğunuzu karşılayın.',
        features: ['Üçüncü şahıs koruması', 'Yasal zorunluluk', 'Hızlı tazminat', 'Geniş anlaşma ağı'],
        icon: '/assets/insurance/icons/trafik.svg'
      },
      {
        id: '3',
        name: 'Konut',
        slug: 'konut',
        shortDesc: 'Evinizi ve eşyalarınızı koruyun',
        description: 'Konut sigortası ile evinizi, eşyalarınızı ve değerli varlıklarınızı olası risklere karşı koruma altına alın.',
        features: ['Yangın koruması', 'Hırsızlık koruması', 'Su hasarı', 'Doğal afetler', 'Eşya koruması'],
        icon: '/assets/insurance/icons/konut.svg'
      },
      {
        id: '4',
        name: 'DASK',
        slug: 'dask',
        shortDesc: 'Zorunlu deprem sigortası',
        description: 'Zorunlu Deprem Sigortası (DASK) ile deprem riskine karşı evinizi koruma altına alın.',
        features: ['Deprem koruması', 'Yasal zorunluluk', 'Devlet garantisi', 'Hızlı tazminat'],
        icon: '/assets/insurance/icons/dask.svg'
      }
    ];

    return NextResponse.json({ products: mockProducts });
  }
}
