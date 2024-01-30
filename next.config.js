/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/pictures/**",
      },
      {
        protocol: "https",
        hostname: "",
        port: "",
        pathname: "/pictures/**",
      },
    ],
  },
};

module.exports = nextConfig;
