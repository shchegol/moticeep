<template>
  <div class="container">
    <header>
      <div class="row align-items-center">
        <div class="col">
          <h1>MOTIKEEP</h1>
        </div>

        <div class="col">
          <div class="btn-group">
            <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Зарегестрироваться
            </button>

            <section class="dropdown-menu dropdown-menu-right p-3 minw_250">
              <div class="form-group">
                <label for="registerEmail">Email</label>
                <input type="email" class="form-control" id="registerEmail" placeholder="email@example.com">
              </div>

              <div class="form-group">
                <label for="registerPassword">Пароль</label>
                <input type="password" class="form-control" id="registerPassword" placeholder="пароль">
              </div>

              <div class="form-group">
                <label for="registerPasswordConfirm">Ещё раз пароль</label>
                <input type="password" class="form-control" id="registerPasswordConfirm" placeholder="тот же пароль">
              </div>

              <button type="button" class="btn btn-primary btn-block">Зарегестироваться</button>
            </section>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Войти
            </button>

            <section class="dropdown-menu dropdown-menu-right p-3 minw_250">
              <div class="form-group">
                <label for="loginEmail">Email</label>
                <input type="email" class="form-control" id="loginEmail" placeholder="email@example.com">
              </div>

              <div class="form-group">
                <label for="loginPassword">Пароль</label>
                <input type="password" class="form-control" id="loginPassword" placeholder="пароль">
              </div>

              <button type="button" class="btn btn-primary btn-block">Войти</button>
            </section>
          </div>
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
  import Modal from '~/components/Modal.vue';

  export default {
    components: {
      Modal,
    },

    data() {
      return {
        isLogin: false,
        showModal: false,
      };
    },

    methods: {
      startRegistration() {

      },

      login() {
        axios
          .post('/login')
          .then(res => {
            console.log(res.data);
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

