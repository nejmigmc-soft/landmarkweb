'use client';

import { motion } from '@/lib/motion';
import InsuranceHeroSlider from '@/components/insurance/InsuranceHeroSlider';
import InsuranceProductGrid from '@/components/insurance/InsuranceProductGrid';
import InsuranceWhyUs from '@/components/insurance/InsuranceWhyUs';
import InsuranceSteps from '@/components/insurance/InsuranceSteps';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function InsurancePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Section */}
      <InsuranceHeroSlider />

      {/* Quick CTA Section */}
      <section className="py-16 bg-brand-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hızlı Teklif Alın, Güvende Kalın
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Sadece birkaç dakikanızı ayırarak size en uygun sigorta teklifini alın. 
              Uzman ekibimiz en kısa sürede size ulaşacak.
            </p>
            <Link href="/sigorta/teklif-al">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg">
                Hemen Teklif Al
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Insurance Products Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sigorta Ürünlerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              İhtiyacınıza uygun sigorta ürünlerini keşfedin ve güvenle geleceğinizi planlayın.
            </p>
          </motion.div>
          
          <InsuranceProductGrid />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <InsuranceWhyUs />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <InsuranceSteps />
        </div>
      </section>

      {/* Final CTA (yorum satırına alındı) */}
      {/*
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hemen Başlayınnnn
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Sigorta ihtiyaçlarınız için uzman ekibimizle görüşün. 
              Size en uygun çözümü sunalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sigorta/teklif-al">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Teklif Al
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                  İletişime Geç
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      */}
    </motion.div>
  );
}
