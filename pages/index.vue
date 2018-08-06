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
      </div>
    </section>

    <b-modal ref="loginModal" hide-header hide-footer>
      <login-form @auth="auth"></login-form>
    </b-modal>
  </div>
</template>

<script>
  import LoginForm from '~/components/LoginForm.vue';

  export default {
    components: {
      LoginForm,
    },

    data() {
      return {
        user: {
          name: ''
        }
      };
    },

    methods: {
      auth(user) {
        this.user.name = user.name;
        this.modalLoginHide();
      },

      modalLoginShow() {
        this.$refs.loginModal.show();
      },

      modalLoginHide() {
        this.$refs.loginModal.hide();
      }
    },
  };
</script>

