<template>
  <div class="container-fluid ">
    <div class="row">
      <div class="col-auto">
        <nuxt-link to="/" class="btn" v-b-tooltip.hover title="Назад">
          <i class="material-icons md-36">arrow_back</i>
        </nuxt-link>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col col-sm-6 col-lg-4">
        <div class="row align-items-center">
          <div class="col">
            <div class="h3">
              {{ isRegister ? 'Регистрация' : 'Вход' }}
            </div>
          </div>

          <div class="col-auto">
            <b-btn @click="isRegister = !isRegister" variant="link">{{ isRegister ? 'Вход' : 'Регистрация' }}</b-btn>
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

        <div v-if="serverError.message !== ''" class="row">
          <div class="col">
            <b-alert show variant="info">{{ serverError.message }}</b-alert>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <b-btn v-if="!isRegister" @click="loginStart" variant="primary">Войти</b-btn>
            <b-btn v-else @click="registerStart" variant="primary">Зарегистрироваться</b-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'auth-index',

    middleware: 'notAuthenticated',

    data() {
      return {
        email: {
          value: '123@123.12',
          state: null,
          message: '',
        },

        password: {
          value: '12345',
          state: null,
          message: '',
        },

        passwordConfirm: {
          value: '12345',
          state: null,
          message: '',
        },

        serverError: {
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

      async loginStart() {
        this.serverError.message = '';

        this.emailCheck();
        this.passwordCheck();

        if (!this.email.state || !this.password.state) return;

        try {
          await this.$store.dispatch('login', {
            email: this.email.value,
            password: this.password.value,
          });

          this.$router.push('/');
        } catch (e) {
          console.log(e.message);
        }
      },

      async registerStart() {
        this.serverError.message = '';

        this.emailCheck();
        this.passwordCheck();
        this.passwordConfirmCheck();

        if (!this.email.state || !this.password.state || !this.passwordConfirm.state) return;

        try {
          await this.$store.dispatch('register', {
            email: this.email.value,
            password: this.password.value,
          });

          this.$router.push('/');
        } catch (error) {
          this.serverError.message = error.response.data;
          console.log('error', error.response);
        }

        this.email.state = this.password.state = this.passwordConfirm.state = null;
      },
    },
  };
</script>
