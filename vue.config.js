module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },

  },
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      // .end()
      // .rule('vue')
      // .use('vue-loader')
      //   .tap(options => {
      //           postcss: [require('postcss-inline-rtl')()]
      //   })

   

      config.plugins.delete("prefetch")

  }
}



