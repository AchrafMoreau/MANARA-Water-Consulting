import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';



const nextConfig: NextConfig = {
  /* config options here */
  i18n:{
    locales: ['fr', 'en', 'ar'],
    defaultLocale: 'fr',
  },
  images: {
    domains: ['jg7oqc4zb0.ufs.sh'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds: true
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
