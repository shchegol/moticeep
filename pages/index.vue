<template>
  <div class="container">
    <header>
      <div class="row align-items-center">
        <div class="col">
          <h1>MOTIKEEP</h1>
        </div>

        <div class="col-auto">
          <!--<b-btn @click="modalLoginShow" variant="primary">Войти</b-btn>-->

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

    <div class="row mt-4">
      <div class="col">
        <b-form-input v-model.trim="email" placeholder="почта"></b-form-input>
      </div>

      <div class="col">
        <b-form-input v-model.trim="password" placeholder="пароль"></b-form-input>
      </div>

      <div class="col-auto">
        <b-button @click="login" variant="primary">
          Войти
        </b-button>
      </div>

      <div class="col-auto">
        <b-button @click="logout">
          Выйти
        </b-button>
      </div>
    </div>

    <section class="row mt-4">
      <div class="col">
        <div class="alert" :class="authUser ? 'alert-primary' : 'alert-secondary'" role="alert">
          <template v-if="authUser">
            Привет {{ authUser.email }}
          </template>

          <template v-else>
            Вы не авторезированы {{ authUser }}
          </template>
        </div>
      </div>
    </section>

    <!--<b-modal ref="loginModal" hide-header hide-footer>-->
    <!--<login-form @login="login" @register="register"></login-form>-->
    <!--</b-modal>-->
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
        password: '12345',

        // user: {
        //   name: '',
        //   auth: false,
        // },
      };
    },

    computed: mapState([
      'counter',
      'authUser'
    ]),

    methods: {
      increment() {
        this.$store.commit('increment');
      },

      // auth(user) {
      //   this.user.name = user.name;
      //   this.modalLoginHide();
      // },

      async login() {
        console.log('vue start login', this.email, this.password);

        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } catch (e) {
          console.log(e.message);
        }
      },

      async logout() {
        console.log('vue start logout');

        try {
          await this.$store.dispatch('logout');
        } catch (e) {
          console.log(e.message);
        }
      },

      async register() {
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

