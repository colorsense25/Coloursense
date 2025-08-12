/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Cloudinary images
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
