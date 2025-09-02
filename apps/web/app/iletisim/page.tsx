
"use client";

import { motion } from "@/lib/motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { company } from "@/config/company";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 pt-20"
      >
        İletişim
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Phone className="w-4 h-4 text-primary" />
            Telefon
          </div>
          <a href={company.phoneHref} className="text-sm hover:underline">
            {company.phone}
          </a>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Mail className="w-4 h-4 text-primary" />
            E-posta
          </div>
          <a href={`mailto:${company.email}`} className="text-sm hover:underline">
            {company.email}
          </a>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            Adres
          </div>
          <p className="text-sm">{company.address}</p>
        </div>
      </div>

      <form
        className="mt-8 grid gap-4 rounded-xl border bg-white p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Mesajınız alındı. En kısa sürede dönüş yapacağız.");
        }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border rounded-md p-3" placeholder="Ad Soyad" required />
          <input type="email" className="border rounded-md p-3" placeholder="E-posta" required />
        </div>
        <input className="border rounded-md p-3" placeholder="Konu" />
        <textarea className="border rounded-md p-3 min-h-[120px]" placeholder="Mesaj" />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}
