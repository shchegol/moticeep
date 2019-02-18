<template>
  <v-toolbar
    :color="header.color"
    app
    flat
    dark
    fixed
    clipped-left
    height="64"
  >
    <slot name="nav-button"></slot>

    <v-toolbar-title>
      {{ header.title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name="toolbar"></slot>
  </v-toolbar>
</template>

<script>
  // import {mapState} from 'vuex';

  export default {
    name: 'HeaderMain',

    computed: {
      header() {
        let path = this.$route.path;
        let headerOpt = {
          title: 'MOTIKEEP',
          color: 'primary',
        };

        if (path === '/done') {
          headerOpt = {
            title: 'Завершённые',
            color: 'blue-grey darken-2',
          };
        }

        if (path === '/deleted') {
          headerOpt = {
            title: 'Корзина',
            color: 'blue-grey darken-2',
          };
        }

        if (path === '/user') {
          headerOpt.title = 'Профиль';
        }

        return headerOpt;
      },
    },
  };
</script>
