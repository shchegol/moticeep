<template>
  <div class="container">
    <header>
      <div class="row align-items-center">
        <div class="col">
          <h1>MOTIKEEP</h1>
        </div>

        <div class="col-auto">
          <b-btn variant="primary" v-b-modal.loginModal>Войти</b-btn>
        </div>
      </div>
    </header>

    <section class="row mt-4">
      <div class="col">
        private: {{ isPrivate }}
      </div>
    </section>

    <b-modal id="loginModal" hide-header hide-footer>
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
        isPrivate: false,
      };
    },

    methods: {
      auth(isAuth) {
        this.isPrivate = isAuth
      }
    },
  };
</script>

