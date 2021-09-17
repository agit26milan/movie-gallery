/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'd212dc1bfc2d8009f736f68f2e71938f'
  }
}


module.exports = withPlugins([withImages({
  webpack(config, options) {
    return config
  }
})], nextConfig)
