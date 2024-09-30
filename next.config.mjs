/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
