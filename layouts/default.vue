<template>
  <v-app>
    <header-main></header-main>

    <v-container class="mt-5">
      <nuxt/>
    </v-container>
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
