const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')

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
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      config.plugins.push(
        new GoogleFontsPlugin({
          fonts: [{ family: 'Nunito', variants: ['400', '700'] }],
        })
      )

      // Important: return the modified config
      return config
    },
  }
}
