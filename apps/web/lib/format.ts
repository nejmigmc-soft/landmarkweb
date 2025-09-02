import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceTRY(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

export function formatArea(area: number): string {
  return `${area} m²`;
}

export function formatRooms(rooms: string): string {
  return rooms;
}

export function formatBath(bath: number): string {
  if (bath === 1) return '1 Banyo';
  return `${bath} Banyo`;
}

export function formatFloor(floor?: number, totalFloor?: number): string {
  if (!floor) return '';
  if (totalFloor) return `${floor}/${totalFloor}. Kat`;
  return `${floor}. Kat`;
}

export function formatHeating(heating?: string): string {
  if (!heating) return '';
  return heating;
}

export function formatAge(age?: number): string {
  if (!age) return '';
  if (age === 1) return '1 Yaşında';
  return `${age} Yaşında`;
}

