module.exports = (_, { defaultConfig }) => {
  return {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/app/',
          permanent: true,
        },
      ]
    },
  }
}
