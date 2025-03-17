import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';



const nextConfig: NextConfig = {
  /* config options here */
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
