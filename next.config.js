/** @type {import('next').NextConfig} */
const nextConfig = {
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
