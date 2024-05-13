const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  standalone: true,
  themeConfig: './theme.config.tsx'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withNextra(nextConfig);