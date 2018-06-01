<template>
  <section class="position-relative">
    <div class="header">
      <div class="container position-relative">
        <div class="row align-items-center pb-4">
          <div class="col">
            <h1>MOTIKEEP</h1>
          </div>

          <div class="col-auto">
            <router-link to="/donate" class="mdc-button">
              Поддержать
            </router-link>
          </div>

          <div class="col-auto">
            <router-link to="/user" class="mdc-button mdc-button--img mdc-button--chip">
              <img src="@/assets/images/avatar.png" alt="">
              zelenzoom
            </router-link>
          </div>
        </div>

        <button ref="actionButton" @click="addFormToggle" class="mdc-fab material-icons" aria-label="Favorite">
          <template v-if="flag.addForm"><span class="mdc-fab__icon">save</span> <span class="mdc-fab__text">Сохранить</span></template>
          <template v-else><span class="mdc-fab__icon">add</span> <span class="mdc-fab__text">Добавить</span></template>
        </button>
      </div>
    </div>

    <div ref="addForm" class="menu-add" :class="{'menu-add_show': flag.addForm}">
      <div class="container">
        <div class="row mt-3">
          <div class="col">
            <m-input :name="'name'" :label="'Название'" class="w-100"></m-input>
          </div>

          <div class="w-100 d-block d-md-none"></div>

          <div class="col">
            <m-input :name="'reward'" :label="'Количество очков'" class="w-100"></m-input>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {MDCRipple} from '@material/ripple';
  import Minput from '@/components/common/M-input';

  export default {
    name: 'Header',
    components: {
      'm-input': Minput,
    },
    data() {
      return {
        flag: {
          addForm: false,
        },
      };
    },
    methods: {
      addFormToggle(state) {
        if (typeof state === 'boolean') {
          this.flag.addForm = state;
        } else {
          this.flag.addForm = !this.flag.addForm;
        }
      },
    },
    mounted() {
      const self = this;
      const actionButton = self.$refs.actionButton;
      const addForm = self.$refs.addForm;

      document.addEventListener('click', outsideEvtListener);

      /**
       * Checking for out-of-element action button and adding menu clicks.
       * @param {object} evt The first number.
       */
      function outsideEvtListener(evt) {
        if (evt.target === actionButton || actionButton.contains(evt.target) || evt.target === addForm || addForm.contains(evt.target)) {
          return;
        }

        self.addFormToggle(false);
      }

      // init mdc ripple on fab button
      new MDCRipple(actionButton);
    },
  };
</script>
