/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/',  // This is correct for GitHub Pages deployment
    images: {
      unoptimized: true,
    },
  };

export default nextConfig;
