export default {
  // mode: 'spa',
  head: {
    title: 'motikeep',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:300,400,500&amp;subset=cyrillic',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },

  loading: {color: '#3B8070'},

  css: [
    '@/assets/scss/main.scss',
  ],

  modules: [
    'bootstrap-vue/nuxt',
  ],

  build: {
    vendor: [
      'lodash',
      'axios',
      'moment',
    ],

    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};

