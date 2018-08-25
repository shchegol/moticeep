<template>
  <header class="row align-items-center">
    <div class="col-auto">
      <h1>MOTIKEEP</h1>
    </div>

    <div class="col">
      <nuxt-link to="/donate" class="btn btn-link">Помочь проекту</nuxt-link>
    </div>

    <div class="col-auto">
      {{ user.points }}
    </div>

    <div v-if="isAuthenticated" class="col-auto">
      <nuxt-link to="/user" class="btn btn-link">{{ user.displayName }}</nuxt-link>
    </div>

    <div class="col-auto">
      <button v-if="isAuthenticated"  @click="logout" class="btn btn-link">Выйти</button>
      <nuxt-link v-else to="/auth" class="btn btn-link">Войти</nuxt-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'header-main',

    props: {
      user: {
        type: Object,
        required: true,
      },
    },

    computed: {
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    },

    methods: {
      async logout() {
        try {
          await this.$store.dispatch('logout');
          this.$router.push('/start');
        } catch (e) {
          console.log(e.message);
        }
      },
    },
  };
</script>
