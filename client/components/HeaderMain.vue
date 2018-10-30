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
  import {mapState} from 'vuex';

  export default {
    name: 'HeaderMain',

    computed: {
      ...mapState({
        filterType: state => state.common.filterType,
        header: state => state.common.header,
      }),
    },
  };
</script>
