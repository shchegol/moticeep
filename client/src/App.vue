<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: '',
      };
    },
    // watch: {
    //   '$route'(to) {
    //     this.transitionName = (to.path === '/') ? 'slide-right' : 'slide-left';
    //   },
    // },
  };
</script>

<style lang="scss">
  @import './assets/scss/app.scss';
</style>
