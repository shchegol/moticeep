<template>
  <div class="app">
    <v-header></v-header>

    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/layout/Header';

  export default {
    name: 'App',
    components: {
      'v-header': Header,
    },
  };
</script>

<style lang="scss">
  @import './assets/scss/app.scss';
</style>
