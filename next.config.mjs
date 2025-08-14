/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Cloudinary images
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

