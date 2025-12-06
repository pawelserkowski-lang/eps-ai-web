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
};

export default nextConfig;