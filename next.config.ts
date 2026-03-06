import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Netlify's CDN handles image optimization; disable Next.js built-in
  images: {
    unoptimized: true,
  },
  // Consistent URL handling — no trailing slashes
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:locale/about',
        destination: '/:locale/about/name',
        permanent: true,
      },
      {
        source: '/:locale/services',
        destination: '/:locale/what-we-do/focus',
        permanent: true,
      },
      {
        source: '/:locale/what-we-do',
        destination: '/:locale/what-we-do/focus',
        permanent: true,
      },
      {
        source: '/:locale/bridge',
        destination: '/:locale/bridge/collaboration',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
