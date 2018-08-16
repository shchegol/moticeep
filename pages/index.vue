<template>
  <div class="container">
    <main-header :auth="Boolean(auth)"></main-header>

    <div class="row">
      <div class="col">
        <h4>Задание</h4>
      </div>

      <div class="col-auto">
        <b-button variant="link" v-b-tooltip.hover title="Добавить задание">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <div class="col-12 col-md-6 col-lg-4 mb-2">
        <b-card bg-variant="primary" text-variant="white">
          <div class="row">
            <div class="col">
              <h4 class="card-title">Почитать</h4>
            </div>

            <div class="col-auto">
              <b-dropdown variant="primary" right no-caret>
                <template slot="button-content">
                  <i class="material-icons md-24">more_vert</i>
                </template>

                <b-dropdown-item-button>
                  <i class="material-icons">edit</i>&nbsp;Редактировать
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  <i class="material-icons">delete</i>&nbsp;Удалить
                </b-dropdown-item-button>
              </b-dropdown>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col">
              <b-input-group append="руб">
                <b-form-input placeholder="Награда"></b-form-input>
              </b-input-group>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col">
              <b-button variant="success" block v-b-tooltip.hover title="Добавить в копилку">
                Добавить
              </b-button>
            </div>
          </div>
        </b-card>
      </div>

      <div class="col-12 col-md-6 col-lg-4 mb-2">
        <b-card bg-variant="primary" text-variant="white">
          <div class="row">
            <div class="col">
              <h4 class="card-title">Убрать игрушки</h4>
            </div>

            <div class="col-auto">
              <b-dropdown variant="primary" right no-caret>
                <template slot="button-content">
                  <i class="material-icons md-24">more_vert</i>
                </template>

                <b-dropdown-item-button>
                  <i class="material-icons">edit</i>&nbsp;Редактировать
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  <i class="material-icons">delete</i>&nbsp;Удалить
                </b-dropdown-item-button>
              </b-dropdown>
            </div>
          </div>

          <div class="row no-gutters align-items-center mt-2">
            <div class="col text-center">
              <p class="h3">+ 100 руб</p>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col">
              <b-button variant="success" block v-b-tooltip.hover title="Добавить в копилку">
                Выполнено
              </b-button>
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <hr class="mt-4 mb-5">

    <div class="row">
      <div class="col">
        <h4>Мотиватор</h4>
      </div>

      <div class="col-auto">
        <b-button variant="link" v-b-tooltip.hover title="Добавить мотиватор">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <div class="col-12 col-md-6 col-lg-4 mb-2" v-for="i in 2" :key="i">
        <b-card img-src="http://www.stihi.ru/pics/2016/07/28/10120.jpg"
                img-alt="Card Image" img-top>
          <div class="row">
            <div class="col">
              <h4 class="card-title">Игрушка</h4>
            </div>

            <div class="col-auto">
              <b-dropdown variant="link" right no-caret>
                <template slot="button-content">
                  <i class="material-icons md-24">more_vert</i>
                </template>

                <b-dropdown-item-button>
                  <i class="material-icons">edit</i>&nbsp;Редактировать
                </b-dropdown-item-button>
                <b-dropdown-item-button>
                  <i class="material-icons">delete</i>&nbsp;Удалить
                </b-dropdown-item-button>
              </b-dropdown>
            </div>
          </div>
          <div class="row">
            <div class="col">
              Какая-то инфа
            </div>
          </div>

          <div class="row mt-3">
            <div class="col">
              <b-progress :max="2000" height="2rem" variant="success" striped>
                <b-progress-bar :value="500">
                  <strong>500 / 2000</strong>
                </b-progress-bar>
              </b-progress>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Header     from '~/components/HeaderMain';

  export default {
    components: {
      'main-header': Header,
    },

    data() {
      return {};
    },

    computed: mapState([
      'auth',
    ]),
  };
</script>

