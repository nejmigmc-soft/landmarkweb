'use client';

import { motion } from '@/lib/motion';
import InsuranceQuoteForm from '@/components/insurance/InsuranceQuoteForm';
import { Shield, CheckCircle, Clock } from 'lucide-react';
import InsuranceSteps from '@/components/insurance/InsuranceSteps';

export default function InsuranceQuotePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background py-20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sigorta Teklifi Alın
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Size en uygun sigorta teklifini sunabilmemiz için lütfen aşağıdaki formu doldurun. 
            Uzman ekibimiz en kısa sürede size ulaşacak.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <InsuranceQuoteForm />
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Why Choose Us */}
            <div className="bg-primary/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Neden Landmark Sigorta?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Güvenilir Hizmet</h4>
                    <p className="text-sm text-gray-600">20+ yıllık deneyim ve güvenilir hizmet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Geniş Anlaşma Ağı</h4>
                    <p className="text-sm text-gray-600">Türkiye'nin önde gelen sigorta şirketleri</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Hızlı Hizmet</h4>
                    <p className="text-sm text-gray-600">24 saat içinde teklif ve hızlı tazminat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-accent/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-accent mb-4">
                Nasıl Çalışır?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-gray-700">Formu doldurun</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-gray-700">Teklifleri karşılaştırın</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-gray-700">Poliçenizi başlatın</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                İletişim
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>📞 +90 (553) 566 46 46</p>
                <p>📧 info@landmark.com</p>
                <p>🕒 Pazartesi - Cuma: 09:00 - 18:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
