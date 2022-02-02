module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      secret: 'eli123'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'https://dev.powerlineplus.com:3000/api' // development api
          : 'https://localhost:3000/api' // production api
  }
}