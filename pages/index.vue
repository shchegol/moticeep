<template>
  <div class="container">
    <header>
      <div class="row align-items-center">
        <div class="col">
          <h1>MOTIKEEP</h1>
        </div>

        <div class="col-auto">
          <b-btn v-if="user.name.length === 0" @click="modalLoginShow" variant="primary">Войти</b-btn>

          <span v-else>Привет {{ user.name }}</span>
        </div>
      </div>
    </header>

    <section class="row mt-4">
      <div class="col">
        Привет {{ user.name }}

        <b-btn @click="increment">
          {{ counter }}
        </b-btn>
      </div>
    </section>

    <b-modal ref="loginModal" hide-header hide-footer>
      <login-form @auth="auth"></login-form>
    </b-modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import LoginForm  from '~/components/LoginForm.vue';

  export default {
    components: {
      LoginForm,
    },

    // middleware: 'notAuthenticated',

    data() {
      return {
        user: {
          name: '',
        },
      };
    },

    // fetch({store}) {
    //   store.commit('setCounter');
    // },

    computed: mapState([
      'counter',
    ]),

    methods: {
      increment() {
        this.$store.commit('increment');
      },

      auth(user) {
        this.user.name = user.name;
        this.modalLoginHide();
      },

      modalLoginShow() {
        this.$refs.loginModal.show();
      },

      modalLoginHide() {
        this.$refs.loginModal.hide();
      },
    },
  };
</script>

