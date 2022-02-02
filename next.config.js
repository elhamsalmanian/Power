module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      secret: 'eli123'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'dev.powerlineplus.com/test/interview:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  }
}