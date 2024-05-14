const { webpack } = require('@storybook/csf-plugin');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config, _options) => {
    config.plugins.push(
      webpack({})
    );

    return config;
  }
};

module.exports = withNextra(nextConfig);
