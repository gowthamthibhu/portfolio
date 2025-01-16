/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/portfolio-deploy',  // This is correct for GitHub Pages deployment
    images: {
      unoptimized: true,
    },
  };

export default nextConfig;
