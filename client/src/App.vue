<template>
  <div id="app">
    <section class="position-relative">
      <div class="header">
        <div class="container position-relative">
          <div class="row align-items-center pb-4">
            <div class="col">
              <h1>MOTIKEEP</h1>
            </div>
            <div class="col-auto">
              <button class="mdc-button">
                  Помощь проекту
              </button>
            </div>
            <div class="col-auto">
              <button class="mdc-button mdc-button--img mdc-button--chip">
                <img src="./assets/images/avatar.png" alt="">
                Щеголь А.А.
              </button>
            </div>
          </div>

          <button @click="addMenuShow" class="mdc-fab material-icons" aria-label="Favorite">
            <template v-if="flag.addMenu"><span class="mdc-fab__icon">save</span> <span class="mdc-fab__text">Сохранить</span></template>
            <template v-else><span class="mdc-fab__icon">add</span> <span class="mdc-fab__text">Добавить</span></template>
          </button>
        </div>
      </div>

      <div class="menu-add" :class="{'menu-add_show': flag.addMenu}">
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

    <router-view></router-view>
  </div>
</template>

<script>
  import {MDCRipple} from '@material/ripple';
  import Minput from './components/common/m-input';

  export default {
    name: 'App',
    components: {
      'm-input': Minput,
    },
    data() {
      return {
        flag: {
          addMenu: false,
        },
      };
    },
    methods: {
      addMenuShow() {
        this.flag.addMenu = !this.flag.addMenu;
      },
    },
    mounted() {
      new MDCRipple(document.querySelector('.mdc-fab'));
    },
  };
</script>

<style lang="scss">
  @import './assets/scss/app.scss';
</style>
