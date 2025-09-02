'use client';

import { motion } from '@/lib/motion';
import { Shield, Clock, Users, Award } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Hızlı Teklif',
    description: '24 saat içinde size en uygun teklifi sunuyoruz',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    title: 'Geniş Anlaşma Ağı',
    description: 'Türkiye\'nin önde gelen sigorta şirketleri ile çalışıyoruz',
    color: 'text-green-600'
  },
  {
    icon: Award,
    title: 'Uzman Danışman',
    description: '20+ yıllık deneyime sahip uzman ekibimizle yanınızdayız',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Hasar Desteği',
    description: '7/24 hasar desteği ve hızlı tazminat süreci',
    color: 'text-orange-600'
  }
];

export default function InsuranceWhyUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neden Landmark Sigorta?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Güvenilir hizmet, geniş ürün yelpazesi ve uzman danışmanlık ile 
            sigorta ihtiyaçlarınız için en iyi çözümleri sunuyoruz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/5 transition-colors">
                <benefit.icon className={`w-10 h-10 ${benefit.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Müşteri Memnuniyeti Garantisi
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Binlerce müşterimizin güvenini kazandık. Siz de ailemize katılın ve 
            güvenle geleceğinizi planlayın. Müşteri memnuniyeti bizim önceliğimizdir.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>✓ 20+ Yıllık Deneyim</span>
            <span>✓ 10,000+ Mutlu Müşteri</span>
            <span>✓ 7/24 Destek</span>
            <span>✓ Hızlı Tazminat</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
