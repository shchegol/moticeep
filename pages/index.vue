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
        private: {{ isLogin }}
      </div>
    </section>

    <b-modal id="loginModal" hide-header hide-footer centered>
      <div class="row">
        <div class="col">
          <b-form-group label="Email" label-for="inputEmail">
            <b-form-input id="inputEmail" v-model.trim="login.email" placeholder="your@email.ru"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group label="Пароль" label-for="inputPassword">
            <b-form-input type="password" id="inputPassword" v-model.trim="login.password" placeholder="Введите пароль"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">
          <b-btn @click="loginStart" variant="primary">Войти</b-btn>
        </div>
      </div>

    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios';
  import Modal from '~/components/Modal.vue';

  export default {
    components: {
      Modal,
    },

    data() {
      return {
        isLogin: false,

        login: {
          email: '',
          password: '',
        },

        register: {
          passwordConfirm: '',
        }
      };
    },

    methods: {
      loginStart() {
        axios
          .post('/api/login', this.login)
          .then(res => {
            console.log(res.data);
            if (res.data.error) {

            } else {
              this.isLogin = true;
            }

          })
          .catch(err => {
            console.log(err);
          });
      },

      registerStart() {
        axios
          .post('/api/register', this.register)
          .then(res => {
            console.log(res.data);
            this.isLogin = true;
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
  };
</script>

