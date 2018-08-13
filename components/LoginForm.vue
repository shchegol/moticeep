<template>
  <div class="div">


    <div class="row">
      <div class="col">
        <div class="h3">
          {{ isRegister ? 'Регистрация' : 'Вход' }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <b-form-group :state="email.state" :invalid-feedback="email.message"
                      label="Email" label-for="inputEmail">
          <b-form-input v-model.trim="email.value" :state="email.state"
                        type="email" id="inputEmail" placeholder="your@email.ru"></b-form-input>
        </b-form-group>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <b-form-group :state="password.state" :invalid-feedback="password.message"
                      label="Пароль" label-for="inputPassword">
          <b-form-input v-model.trim="password.value" :state="password.state"
                        type="password" id="inputPassword" placeholder="Введите пароль"></b-form-input>
        </b-form-group>
      </div>
    </div>

    <div v-if="isRegister" class="row">
      <div class="col">
        <b-form-group :state="passwordConfirm.state" :invalid-feedback="passwordConfirm.message"
                      label="Повторить пароль" label-for="inputPassword">
          <b-form-input v-model.trim="passwordConfirm.value" :state="passwordConfirm.state"
                        type="password" id="inputPasswordConfirm" placeholder="Тот же пароль ещё раз"></b-form-input>
        </b-form-group>
      </div>
    </div>

    <div v-if="serverError.state" class="row">
      <div class="col">
        <b-alert show variant="info">{{ serverError.message }}</b-alert>
      </div>
    </div>

    <div v-if="!isRegister" class="row mt-2">
      <div class="col">
        <b-btn @click="loginStart" variant="primary">Войти</b-btn>
      </div>

      <div class="col-auto">
        <b-btn @click="isRegister = true" variant="link">Регистрация</b-btn>
      </div>
    </div>

    <div v-else class="row mt-2">
      <div class="col">
        <b-btn @click="registerStart" variant="primary">Зарегистрироваться</b-btn>
      </div>

      <div class="col-auto">
        <b-btn @click="isRegister = false" variant="link">Вход</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'login-modal',

    middleware: 'auth',

    data() {
      return {
        email: {
          value: '',
          state: null,
          message: '',
        },

        password: {
          value: '',
          state: null,
          message: '',
        },

        passwordConfirm: {
          value: '',
          state: null,
          message: '',
        },

        serverError: {
          state: false,
          message: '',
        },

        isRegister: false,
      };
    },

    methods: {
      emailCheck() {
        if (!/^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(this.email.value)) {
          this.email.state = false;
          this.email.message = 'Пожалуйста введите корректный email';
        } else {
          this.email.state = true;
          this.email.message = '';
        }
      },

      passwordCheck() {
        if (this.password.value.length <= 4) {
          this.password.state = false;
          this.password.message = 'Пароль должен быть более 4х символов';
        } else {
          this.password.state = true;
          this.password.message = '';
        }
      },

      passwordConfirmCheck() {
        if (this.password.value.length > 4) {
          if (this.passwordConfirm.value !== this.password.value) {
            this.passwordConfirm.state = false;
            this.passwordConfirm.message = 'Поле "Пароль" и "Подтверждение пароля" должны совпадать';
          } else {
            this.passwordConfirm.state = true;
            this.passwordConfirm.message = '';
          }
        } else {
          this.passwordConfirm.state = null;
          this.passwordConfirm.message = '';
        }
      },

      loginStart() {
        console.log('login form start');

        this.serverError.state = false;
        this.serverError.message = '';

        this.emailCheck();
        this.passwordCheck();

        if (!this.email.state || !this.password.state) return;

        this.$emit('login', {
          email: this.email.value,
          password: this.password.value
        })

        // axios
        //   .post('/api/login', {
        //     email: this.email.value,
        //     password: this.password.value,
        //   })
        //   .then(res => {
        //     console.log(res.data);
        //
        //     if (res.data.error) {
        //       this.serverError.state = true;
        //       this.serverError.message = res.data.error.message;
        //     } else {
        //       this.$emit('auth', res.data);
        //     }
        //
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      },

      registerStart() {
        this.serverError.state = false;
        this.serverError.message = '';

        this.emailCheck();
        this.passwordCheck();
        this.passwordConfirmCheck();

        if (!this.email.state || !this.password.state || !this.passwordConfirm.state) return;

        this.$emit('register', {
          email: this.email.value,
          password: this.password.value
        })

        // axios
        //   .post('/api/register', {
        //     email: this.email.value,
        //     password: this.password.value,
        //   })
        //   .then(res => {
        //     console.log(res.data);
        //
        //     if (res.data.error) {
        //       this.serverError.state = true;
        //       this.serverError.message = res.data.error.message;
        //     } else {
        //       // this.$emit('auth', res.data);
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      },
    },
  };
</script>
