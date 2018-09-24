<template>
  <v-container fluid fill-height class="auth">
    <v-layout justify-center>
      <v-flex xs12 sm10 md6 lg4 xl3>
        <v-layout>
          <v-flex>
            <h1 class="auth__logo text-xs-center">
              Motikeep
            </h1>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <v-tabs fixed-tabs centered>
              <v-tab>Вход</v-tab>
              <v-tab>Регистрация</v-tab>
            </v-tabs>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <v-form>
              <v-text-field
                v-model="email.value"
                label="E-mail"
                required
                outline
              ></v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'auth-index',

    middleware: 'authenticated',

    data() {
      return {
        displayName: 'Александр',

        email: {
          value: 'test@test.ru',
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
      changeTab() {
        this.isRegister = !this.isRegister;
      },

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
        } catch (error) {
          this.serverError.message = error.response.data;
        }

        this.email.state = this.password.state = this.passwordConfirm.state = null;
      },

      async registerStart() {
        this.serverError.message = '';

        this.emailCheck();
        this.passwordCheck();
        this.passwordConfirmCheck();

        if (!this.email.state || !this.password.state || !this.passwordConfirm.state) return;

        try {
          await this.$store.dispatch('register', {
            displayName: this.displayName,
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
