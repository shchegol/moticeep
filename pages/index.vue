<template>
  <div class="container">
    <header>
      <div class="row align-items-center">
        <div class="col">
          <h1>MOTIKEEP</h1>
        </div>

        <div class="col">
          <button class="btn btn-primary">
            Войти
          </button>

          <button class="btn btn-primary">
            Зарегестироваться
          </button>
        </div>
      </div>
    </header>

    <section class="row mt-4">
      <div class="col">
        private: {{ isLogin }}
      </div>
    </section>
  </div>
</template>

<script>
  import AppLogo from '~/components/AppLogo.vue';

  export default {
    components: {
      AppLogo,
    },

    data() {
      return {
        isLogin: false,
      };
    },

    methods: {
      login() {
        axios
          .post('/login')
          .then(res => {
            console.log(res.data)
            this.isLogin = true;
          })
          .catch(err => {
            console.log(err);
          });
      },

      register() {
        axios
          .post('/register')
          .then(res => {
            console.log(res.data)
            this.isLogin = true;
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
  };
</script>

