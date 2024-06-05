const { webpack } = require('@storybook/csf-plugin');

const withNextra = require('nextra')({
  theme: 'reablocks-docs-theme',
  themeConfig: './theme.config.tsx'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    scrollRestoration: true,
    webpackBuildWorker: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config, _options) => {
    config.plugins.push(
      webpack({})
    );

    return config;
  }
};

module.exports = withNextra(nextConfig);
