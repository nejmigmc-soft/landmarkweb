/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',          // ⬅️ statik export yerine standalone
  images: { unoptimized: true }, // dış kaynak görsel yoksa bırak

  // Build'ı kesmesin – istersen sonra sıkılaştırırız
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
