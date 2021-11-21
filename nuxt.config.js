const conf = require('./package.json');

export default {
  mode: 'universal',
  head: {
    title: conf.name,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: conf.description },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      },
    ],
    script: []
  },
  loading: { color: 'blue' },
  css: [],
  plugins: [],
  components: true,
  buildModules: [],
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios'],
  build: {
    plugins: [
    ]
  },

}
