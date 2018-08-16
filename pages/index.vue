<template>
  <div class="container">
    <header class="row align-items-center">
      <div class="col">
        <h1>MOTIKEEP</h1>
      </div>

      <div class="col-auto">
        <nuxt-link v-if="!auth" to="/auth" class="btn btn-link">Войти</nuxt-link>
        <button v-else @click="logout" class="btn btn-link">Выйти</button>
      </div>
    </header>


  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    components: {},

    data() {
      return {};
    },

    computed: mapState([
      'auth',
    ]),

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

