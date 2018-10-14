<template>
  <v-app>
    <header-main></header-main>
    <nuxt class="pt-5"/>
  </v-app>
</template>

<script>
  import HeaderMain from '~/components/HeaderMain';

  export default {
    components: {
      HeaderMain,
    },
  };
</script>
