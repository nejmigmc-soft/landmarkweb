'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Phone,
  MapPin,
  Home,
  Search,
  MessageCircle,
  Shield,
} from 'lucide-react';

const navigation = [
  { name: 'Ana Sayfa', href: '/', icon: Home },
  { name: 'İlanlar', href: '/ilanlar', icon: Search },
  { name: 'Sigorta', href: '/sigorta', icon: Shield },
  { name: 'İletişim', href: '/iletisim', icon: MessageCircle },
] as const;

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const whatsappHref = useMemo(() => {
    const base = 'https://wa.me/905535664646';
    const msg =
      `Merhaba, Landmark Gayrimenkul web sitesinden yazıyorum.` +
      (pathname && pathname !== '/' ? ` Sayfa: ${pathname}.` : '') +
      ` Bir danışman ile görüşmek istiyorum.`;
    return `${base}?text=${encodeURIComponent(msg)}`;
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <nav className="container mx-auto px-3 md:px-4">
        {/* SATIR: tek satıra sabit, scrollbar yok */}
        <div className="flex flex-nowrap items-center justify-between gap-3 min-h-[72px] md:min-h-[84px]">
          {/* Sol: Logo + Marka (truncate) */}
          <Link
            href="/"
            aria-label="Landmark Gayrimenkul ve Yatırım Hizmetleri - Ana Sayfa"
            className="flex items-center min-w-0 shrink-0"
          >
            <Image
              src="/assets/brand/logo.svg"
              alt="Landmark Gayrimenkul ve Yatırım Hizmetleri"
              width={172}
              height={48}
              priority
              unoptimized
              className="h-10 w-auto md:h-12 inline-block"
            />
            <span
              className="ml-2 md:ml-3 font-bold tracking-tight text-primary leading-tight
                         text-[15px] md:text-[18px] truncate
                         max-w-[40vw] md:max-w-[26vw] lg:max-w-[28vw]"
              title="LANDMARK GAYRİMENKUL YATIRIM HİZMETLERİ"
            >
              <span className="lg:hidden">LANDMARK GAYRİMENKUL</span>
              <span className="hidden lg:inline">
                LANDMARK GAYRİMENKUL YATIRIM HİZMETLERİ
              </span>
            </span>
          </Link>

          {/* Orta: Menü (tek satır, sabit; ICONLAR md'de gizli) */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center whitespace-nowrap overflow-hidden">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1 md:gap-2 px-2.5 py-2 rounded-lg text-sm md:text-[15px]
                              transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                                isActive(item.href)
                                  ? 'text-primary bg-primary/10'
                                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                              }`}
                >
                  <Icon className="h-4 w-4 hidden lg:inline-block" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sağ: CTA'lar (kompakt, sabit genişlik) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* md'de kalabalığı azalt: sadece lg ve üstü */}
            <Button
              asChild
              variant="outline"
              className="h-9 px-3 border-accent text-accent hover:bg-accent hover:text-white hidden lg:inline-flex"
            >
              <Link href="tel:+905535664646">
                <Phone className="h-4 w-4 mr-2" />
                Hemen Ara
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-9 px-3 border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
            >
              <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Link>
            </Button>

            <Button asChild className="h-9 px-3 bg-primary hover:bg-primary/90">
              <Link href="/iletisim">
                <MapPin className="h-4 w-4 mr-2" />
                Danışman Bul
              </Link>
            </Button>
          </div>

          {/* Mobil menü butonu */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
            onClick={() => setMobileMenuOpen((s) => !s)}
          >
            <span className="sr-only">Ana menüyü aç</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobil menü */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobil CTA’lar */}
              <div className="pt-4 space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-10 border-accent text-accent hover:bg-accent hover:text-white"
                >
                  <Link href="tel:+905535664646">
                    <Phone className="h-4 w-4 mr-2" />
                    Hemen Ara
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full h-10 border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                >
                  <Link href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Link>
                </Button>

                <Button asChild className="w-full h-10 bg-primary hover:bg-primary/90">
                  <Link href="/iletisim">
                    <MapPin className="h-4 w-4 mr-2" />
                    Danışman Bul
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
