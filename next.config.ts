import { routing } from "@/i18n/routing";
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';



const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jg7oqc4zb0.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'hytvt9ozg5rmhdu3.public.blob.vercel-storage.com',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true
  },
  reactStrictMode: false
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
