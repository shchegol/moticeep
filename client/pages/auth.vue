<template>
  <v-container fluid>
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
          <v-flex ref="form" xs12 sm6 md4 lg3 xl2>
            <v-text-field
              v-if="isRegister"
              v-model="displayName"
              label="Логин"
              placeholder="Alex Fincher"
              box
              color="white"
              dark
            ></v-text-field>

            <v-text-field
              ref="email"
              v-model="email"
              :rules="[rules.required, rules.isEmail]"
              label="E-mail"
              placeholder="name@mail.com"
              color="white"
              validate-on-blur
              required
              box
              dark
            ></v-text-field>

            <v-text-field
              ref="password"
              v-model="password"
              :append-icon="showPassword ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              :success="passEquality"
              :loading="isRegister && password.length > 0"
              label="Пароль"
              color="white"
              validate-on-blur
              required
              box
              dark
              @click:append="showPassword = !showPassword"
            >
              <v-progress-linear
                slot="progress"
                :value="passProgress"
                :color="passProgressColor"
                height="2"
              ></v-progress-linear>
            </v-text-field>

            <v-text-field
              ref="passConfirm"
              v-if="isRegister"
              v-model="passConfirm"
              :append-icon="showPassConfirm ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min, rules.isEqualPass]"
              :type="showPassConfirm ? 'text' : 'password'"
              :success="passEquality"
              name="input-10-2"
              label="Подтверждение пароля"
              color="white"
              validate-on-blur
              required
              box
              dark
              @click:append="showPassConfirm = !showPassConfirm"
            ></v-text-field>

            <v-btn
              :loading="loading"
              :disabled="loading"
              color="white"
              large
              outline
              dark
              block
              @click="submit"
            >
              {{ isRegister ? 'Зарегестрироваться' : 'Войти'}}
            </v-btn>

            <v-btn
              color="white"
              small
              flat
              dark
              block
              @click="changeAuthMethod"
              class="mt-3"
            >
              {{ isRegister ? 'Войти' : 'Зарегестрироваться'}}
            </v-btn>

            <v-alert
              :value="serverError.isShow"
              :icon="serverError.icon"
              transition="scale-transition"
              color="white"
              outline
              class="mt-5"
            >
              {{ serverError.message }}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  let emailCheck = value => /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
  export default {
    name: 'AuthPage',

    layout: 'auth',

    middleware: 'authenticated',

    data() {
      return {
        email: 'test@test.ru',
        password: '12345',
        passConfirm: '',
        displayName: 'Александр',

        rules: {
          required: value => !!value || 'Это поле обязательно для заполнения',
          min: v => v.length >= 5 || 'Минимум 5 знаков',
          isEmail: v => emailCheck(v) || 'Пример: name@mail.com',
          isEqualPass: value => value === this.password || 'Должен совпадать с паролем',
        },

        showPassword: false,
        showPassConfirm: false,

        serverError: {
          isShow: false,
          icon: 'priority_high',
          message: 'Не выходит. Попробуйте попозже.',
        },

        isRegister: false,
        loading: false,
      };
    },

    computed: {
      verifiableValues() {
        return {
          email: this.email,
          password: this.password,
          passConfirm: this.passConfirm,
        };
      },
      passProgress() {
        return Math.min(100, this.password.length * 10);
      },
      passProgressColor() {
        return ['error', 'warning', 'success'][Math.floor(this.passProgress / 40)];
      },
      passEquality() {
        return this.password === this.passConfirm && this.password.length >= 5;
      },
    },

    methods: {
      async submit() {
        let formHasErrors = false;
        let action = this.isRegister ? 'auth/register' : 'auth/login';

        Object.keys(this.verifiableValues).forEach(field => {
          let value = this.verifiableValues[field];

          if (!this.isRegister && field === 'passConfirm') return;

          if (this.isRegister && field === 'passConfirm') {
            if (this.verifiableValues['password'] !== value) formHasErrors = true;
          }

          if (field === 'password' && emailCheck(value)) {
            formHasErrors = true;
          }

          if (!value || value.length < 5) {
            formHasErrors = true;
          }

          this.$refs[field].validate(true);
        });

        if (formHasErrors) return;

        this.loading = true;

        try {
          await this.$store.dispatch(action, {
            displayName: this.displayName || null,
            email: this.email,
            password: this.password,
          });

          this.$router.push('/');
        } catch (error) {
          this.showMessage('Не выходит. Попробуйте попозже.');
        }

        this.loading = false;
      },
      showMessage(text) {
        this.serverError.message = text;
        this.serverError.isShow = true;

        setTimeout(() => {
          this.serverError.isShow = false;
        }, 3000);
      },
      changeAuthMethod() {
        this.passConfirm = this.password = '';
        this.isRegister = !this.isRegister;
      },
    },
  };
</script>
