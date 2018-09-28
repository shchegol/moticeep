<template>
  <v-container fluid fill-height class="auth">
    <v-layout justify-center>
      <v-flex>
        <v-layout>
          <v-flex>
            <h1 class="auth__logo text-xs-center">
              Motikeep
            </h1>
          </v-flex>
        </v-layout>

        <v-layout justify-center>
          <v-flex xs12 sm6 md4 lg3 xl2>
            <v-text-field
              v-if="isRegister"
              v-model="email.value"
              label="Логин"
              box
              dark
            ></v-text-field>

            <v-text-field
              v-model="email.value"
              label="E-mail"
              required
              box
              dark
            ></v-text-field>

            <v-text-field
              v-model="password.value"
              :append-icon="password.isShow ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="password.isShow ? 'text' : 'password'"
              name="input-10-2"
              label="Пароль"
              required
              box
              dark
              @click:append="password.isShow = !password.isShow"
            ></v-text-field>

            <v-text-field
              v-if="isRegister"
              v-model="passConfirm.value"
              :append-icon="passConfirm.isShow ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="passConfirm.isShow ? 'text' : 'password'"
              name="input-10-2"
              label="Подтверждение пароля"
              required
              box
              dark
              @click:append="passConfirm.isShow = !passConfirm.isShow"
            ></v-text-field>

            <v-alert
              :value="serverError.isShow"
              color="error"
              icon="warning"
              outline
            >
              {{ serverError.message }}
            </v-alert>

            <v-btn large outline dark block>{{ isRegister ? 'Зарегестрироваться' : 'Войти'}}</v-btn>
            <v-btn small flat dark block
                   @click="isRegister = !isRegister"
                   class="mt-3">
              {{ isRegister ? 'Войти' : 'Зарегестрироваться'}}
            </v-btn>
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
        rules: {
          required: value => !!value || 'Обязательное',
          min: v => v.length >= 5 || 'Минимум 5 Знаков',
          emailMatch: () => ('Email или пароль, который вы ввели, неверен'),
        },

        displayName: 'Александр',

        email: {
          value: 'test@test.ru',
        },

        password: {
          value: '12345',
          isShow: false,
        },

        passConfirm: {
          value: '12345',
          isShow: false,
        },

        serverError: {
          isShow: false,
          message: 'Ошибка на сервере.',
        },

        isRegister: false,
      };
    },

    methods: {
      async loginStart() {
        this.serverError.message = '';

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
