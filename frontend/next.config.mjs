/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"], // Add image domains if needed
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Pass through from your .env.local
  },
  // Optional: Rewrites for development proxy (only if testing locally)
  // Uncomment if needed
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:5000/api/:path*", // Proxy to local backend
  //     },
  //   ];
  // },
};

export default nextConfig;
