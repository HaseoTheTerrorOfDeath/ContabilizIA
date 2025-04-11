/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // importante se você for usar Railway/Vercel Free
  },
};

export default nextConfig;

