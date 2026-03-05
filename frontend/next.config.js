/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure API routes can handle raw body for Stripe webhook
  experimental: {},
};

module.exports = nextConfig;

