<template>
  <header class="row align-items-center">
    <div class="col">
      <h1>MOTIKEEP</h1>
    </div>

    <div class="col-auto">
      <nuxt-link v-if="!auth" to="/auth" class="btn btn-link">Войти</nuxt-link>
      <button v-else @click="logout" class="btn btn-link">Выйти</button>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-main',

    props: {
      auth: {
        type: Boolean,
        required: true
      }
    },

    methods: {
      async logout() {
        try {
          await this.$store.dispatch('logout');
        } catch (e) {
          console.log(e.message);
        }
      },
    },
  };
</script>
