/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    streamUrl: process.env.STREAM_URL,
  },
  experimental: {
    outputStandalone: true,
  },
}
