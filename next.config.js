/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'd212dc1bfc2d8009f736f68f2e71938f'
  }
}


module.exports = withPlugins([], nextConfig)
