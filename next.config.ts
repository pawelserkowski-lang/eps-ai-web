import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Włącza tryb standalone (wymagany dla Dockerfile i lekkich wdrożeń)
  output: "standalone",
  
  // Opcjonalnie: Konfiguracja logowania obrazów (skoro używamy Sanity)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
};

export default nextConfig;