'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

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
  images: Array<{ url: string; alt?: string }>;
}

interface FeaturedPropertiesCarouselProps {
  properties: Property[];
}

export default function FeaturedPropertiesCarousel({
  properties,
}: FeaturedPropertiesCarouselProps) {
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: 'free-snap',
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 2, spacing: 16 } },
      '(min-width: 1024px)': { slides: { perView: 3, spacing: 24 } },
      '(min-width: 1280px)': { slides: { perView: 3, spacing: 24 } },
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const t = setInterval(() => instanceRef.current?.next(), 4000);
    return () => clearInterval(t);
  }, [instanceRef]);

  if (!properties.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Öne Çıkan İlanlar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En popüler ve güncel gayrimenkul fırsatları
          </p>
        </div>

        {/* SLIDER WRAPPER */}
        <div className="relative overflow-visible">
          {/* Oklar – kapsayıcının İÇİNDE konumlandır */}
          {loaded && instanceRef.current && (
            <>
              <button
                type="button"
                onClick={() => instanceRef.current?.prev()}
                aria-label="Önceki"
                className="absolute left-6 md:left-6 top-1/2 -translate-y-1/2
                           h-10 w-10 rounded-full bg-white shadow-md z-20
                           flex items-center justify-center text-gray-700
                           hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => instanceRef.current?.next()}
                aria-label="Sonraki"
                className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2
                           h-10 w-10 rounded-full bg-white shadow-md z-20
                           flex items-center justify-center text-gray-700
                           hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Track – mobilde oklarla çakışmasın diye küçük padding */}
          <div ref={sliderRef} className="keen-slider px-8 md:px-6">
            {properties.map((property) => (
              <div key={property.id} className="keen-slider__slide">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/ilanlar"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90"
          >
            Tüm İlanları Görüntüle
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
