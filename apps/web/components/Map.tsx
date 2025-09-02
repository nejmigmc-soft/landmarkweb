'use client';

import dynamic from 'next/dynamic';
import { CSSProperties, useMemo } from 'react';

// SSR'de window yok; dynamic import ile sadece client'ta yükle
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker       = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup        = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

type Props = {
  lat?: number;
  lng?: number;
  zoom?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export default function Map({ lat, lng, zoom = 13, className = 'h-72 w-full rounded-xl overflow-hidden', style, title }: Props) {
  const center = useMemo(() => (lat && lng ? [lat, lng] as [number, number] : null), [lat, lng]);
  if (!center) return null; // konum yoksa hiç render etme

  return (
    <div className={className} style={style}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={center}>
          {title ? <Popup>{title}</Popup> : null}
        </Marker>
      </MapContainer>
    </div>
  );
}
