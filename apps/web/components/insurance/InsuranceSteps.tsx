'use client';

import { motion } from '@/lib/motion';
import { FileText, BarChart3, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Formu Doldurun',
    description: 'Basit formu doldurarak sigorta ihtiyaçlarınızı belirtin',
    color: 'bg-blue-500'
  },
  {
    icon: BarChart3,
    title: 'Teklifleri Karşılaştırın',
    description: 'Size sunulan en uygun teklifleri karşılaştırın ve seçin',
    color: 'bg-green-500'
  },
  {
    icon: CheckCircle,
    title: 'Poliçenizi Başlatın',
    description: 'Seçtiğiniz teklif ile poliçenizi hemen başlatın',
    color: 'bg-accent'
  }
];

export default function InsuranceSteps() {
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
            Nasıl Çalışır?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sadece 3 basit adımda sigorta teklifinizi alın ve güvenle geleceğinizi planlayın.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              {/* Icon */}
              <div className={`w-24 h-24 ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="w-12 h-12 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gray-300"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Hemen Başlayın
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Sigorta ihtiyaçlarınız için uzman ekibimizle görüşün. 
              Size en uygun çözümü sunalım ve güvenle geleceğinizi planlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sigorta/teklif-al"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Teklif Al
              </a>
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
