/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  //ビルドサイズ削減
  output: 'standalone',
  //日本語化
  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  }
}

module.exports = nextConfig
