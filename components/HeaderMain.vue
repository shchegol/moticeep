<template>
  <header class="row align-items-center">
    <div class="col-auto">
      <h1>MOTIKEEP</h1>
    </div>

    <div class="col">
      <nuxt-link to="/donate" class="btn btn-link">Помочь проекту</nuxt-link>
    </div>

    <div v-if="auth" class="col-auto">
      <nuxt-link to="/user" class="btn btn-link">{{user.displayName}}</nuxt-link>
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
        required: true,
      },

      user: {
        type: Object,
        required: true,
      },
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
