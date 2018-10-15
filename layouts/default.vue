<template>
  <v-app>
    <header-main></header-main>
    <navigation-drawer></navigation-drawer>

    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
  import HeaderMain       from '~/components/HeaderMain';
  import NavigationDrawer from '../components/NavigationDrawer';

  export default {
    components: {
      NavigationDrawer,
      HeaderMain,
    },
  };
</script>
