/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are served from /public/assets (product photos & icons copied
  // verbatim from the original catalogue), so no remote image domains are
  // required at the moment. Add `images.remotePatterns` here if product
  // media is later migrated to a CDN or headless CMS.
};

export default nextConfig;
