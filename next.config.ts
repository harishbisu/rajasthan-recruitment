import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    domains: [
      'blackbuck.blob.core.windows.net',
      'www.rrcjaipur.in',
      'rpsc.rajasthan.gov.in',
      'rsmssb.rajasthan.gov.in',
      'th.bing.com',
      'hcraj.nic.in'
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
