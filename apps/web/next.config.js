/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // public/ içindeki dosyalar için domain gerekmez
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
