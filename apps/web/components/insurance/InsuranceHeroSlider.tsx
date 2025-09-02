'use client';

import { motion } from '@/lib/motion';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import slides from '@/config/insurance-hero'; // <— sadece buradan okunacak

type Slide = {
  image: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string } | string; // geriye uyum
  link?: string; // geriye uyum
};

const AUTOPLAY_MS = 5000;

export default function InsuranceHeroSlider() {
  // Config’te olmayan alanlar için geriye uyumlu normalize
  const heroSlides: Slide[] = useMemo(() => {
    return slides.map((s) => {
      // Eski yapıyla uyum: {cta:'Teklif Al', link:'/sigorta/teklif-al'} gelmiş olabilir
      if (typeof (s as any).cta === 'string') {
        return {
          image: s.image,
          title: s.title,
          subtitle: (s as any).subtitle,
          cta: { label: (s as any).cta, href: (s as any).link ?? '#' },
        };
      }
      return s as Slide;
    });
  }, []);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  const go = (to: number) => setIdx((to + heroSlides.length) % heroSlides.length);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  return (
    <section className="relative h-[560px] md:h-[620px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {heroSlides.map((slide, i) => {
        const isActive = i === idx;
        const img = slide.image || '/assets/placeholder.jpg';

        return (
          <motion.div
            key={`${img}-${i}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            aria-hidden={!isActive}
          >
            {/* Background (CSS bg + darken) */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img})`, filter: 'brightness(0.65)' }}
            />

            {/* Hafif üstten gradient yalnızca okunabilirlik için */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center text-white max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>

                  {slide.subtitle && (
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* CTA */}
                  {((slide as any).cta || (slide as any).link) && (
                    <Link
                      href={
                        typeof slide.cta === 'object'
                          ? slide.cta.href
                          : (slide as any).link ?? '#'
                      }
                    >
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
                      >
                        {typeof slide.cta === 'object' ? slide.cta.label : (slide as any).cta}
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Arrows */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Görsel ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === idx ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
