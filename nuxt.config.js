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
        href: 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700|Pacifico&amp;subset=cyrillic',
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
    // 'vue-mdc-adapter/dist/styles',
  ],

  modules: [
    ['bootstrap-vue/nuxt', {css: false}],
  ],

  plugins: [
    {
      src: '~/plugins/vue-mdc-adapter',
      ssr: false,
    },
  ],

  build: {
    vendor: [
      'lodash',
      'axios',
      'moment',
    ],

    // styleResources: {
    //   scss: './assets/scss/main.scss',
    //   options: {
    //     sourceMap: false,
    //     includePaths: ['node_modules', 'node_modules/@material'],
    //   },
    // },

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

