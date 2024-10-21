/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'tailwindui.com',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
