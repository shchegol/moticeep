<template>
  <div class="container">
    <header>
      <div class="row align-items-center">
        <div class="col">
          <h1>MOTIKEEP</h1>
        </div>

        <div class="col-auto">
          <b-btn @click="modalLoginShow" variant="primary">Войти</b-btn>

          <!--<span v-else>Привет {{ user.name }}</span>-->

        </div>
      </div>
    </header>

    <section class="row mt-4">
      <div class="col">
        Просто счётчик

        <b-btn @click="increment">
          {{ counter }}
        </b-btn>
      </div>
    </section>

    <div class="row">
      <div class="col">
        <b-form-input v-model.trim="email" placeholder="почта"></b-form-input>
      </div>

      <div class="col">
        <b-form-input v-model.trim="password" placeholder="пароль"></b-form-input>
      </div>

      <div class="col-auto">
        <b-button @click="login" variant="primary">
          Выйти
        </b-button>
      </div>
    </div>

    <section class="row mt-4">
      <div class="col">
        <div class="alert" :class="user.auth ? 'alert-primary' : 'alert-secondary'" role="alert">
          <template v-if="user.auth">
            Привет {{ user.name }}
          </template>

          <template v-else>
            Вы не авторезированы
          </template>
        </div>
      </div>
    </section>

    <section class="row mt-4">
      <div class="col">
        <b-button @click="logout" variant="primary">
          Выйти
        </b-button>
      </div>
    </section>

    <b-modal ref="loginModal" hide-header hide-footer>
      <login-form @login="login" @register="register"></login-form>
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

    data() {
      return {
        email: '123@123.12',
        password: '123456',

        user: {
          name: '',
          auth: false,
        },
      };
    },

    computed: mapState([
      'counter',
    ]),

    methods: {
      increment() {
        this.$store.commit('increment');
      },

      // auth(user) {
      //   this.user.name = user.name;
      //   this.modalLoginHide();
      // },

      async login(data) {
        console.log('login', data);
        try {
          await this.$store.dispatch('login', {
            email: data.email,
            password: data.password,
          });
        } catch (e) {
          console.log(e.message);
        }
      },

      async logout() {
        try {
          await this.$store.dispatch('logout');
        } catch (e) {
          console.log(e.message);
        }
      },

      async register(data) {
        axios
          .post('/api/register', {
            email: data.email,
            password: data.password,
          })
          .then(res => {
            console.log(res.data);

            if (res.data.error) {
              this.serverError.state = true;
              this.serverError.message = res.data.error.message;
            } else {
              // this.$emit('auth', res.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
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

