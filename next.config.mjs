import nextra from 'nextra'
import { webpack } from '@storybook/csf-plugin';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  search: {
    codeblocks: false
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    scrollRestoration: true,
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

export default withNextra(nextConfig);
