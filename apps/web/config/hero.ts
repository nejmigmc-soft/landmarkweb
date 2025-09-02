export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  overlay: boolean;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: '/assets/hero/hero-1.jpg',
    title: 'Hayalinizdeki Eve Kavuşun',
    subtitle: 'Profesyonel gayrimenkul danışmanlığı ile en uygun fırsatları keşfedin',
    overlay: true,
  },
  {
    id: 2,
    image: '/assets/hero/hero-2.jpg',
    title: 'Stratejik Konumlar',
    subtitle: 'Şehrin en değerli bölgelerinde yatırım fırsatları',
    overlay: true,
  },
  {
    id: 3,
    image: '/assets/hero/hero-3.jpg',
    title: 'Güvenilir Hizmet',
    subtitle: '20 yıllık deneyim ile güvenilir gayrimenkul çözümleri',
    overlay: true,
  },
  {
    id: 4,
    image: '/assets/hero/hero-4.jpg',
    title: 'Güvenilir Sigorta Hizmetleri',
    subtitle: '20 yıllık deneyim ile güvenilir sigorta çözümleri',
    overlay: true,
  },
  {
    id: 5,
    image: '/assets/hero/hero-5.jpg',
    title: 'Mutlu Müşteriler',
    subtitle: '20 yıllık deneyim ile mutlu müşteriler',
    overlay: true,
  },
];

export default heroSlides;
