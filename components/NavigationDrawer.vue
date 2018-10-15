<template>
  <v-navigation-drawer
    :value="drawer"
    app
    fixed
    floating
    clipped
  >
    123

  </v-navigation-drawer>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'NavigationDrawer',
    computed: {
      ...mapState({
        drawer: state => state.common.drawer,
      }),
    },
  };
</script>
