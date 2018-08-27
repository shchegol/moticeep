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

    <div class="col-auto">
      <nuxt-link to="/user" class="btn btn-link">{{ user.displayName }}</nuxt-link>
    </div>

    <div class="col-auto">
      <button @click="logout" class="btn btn-link">Выйти</button>
    </div>
  </header>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'header-main',

    computed: mapState({
      user: state => state.user.item,
    }),

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
