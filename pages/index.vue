<template>
  <div class="container">
    <header-main :auth="Boolean(auth)"></header-main>

    <tasks :tasks="tasks"></tasks>

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
  import {mapState}     from 'vuex';
  import {getRundomInt} from '~/assets/js/utils';
  import HeaderMain         from '~/components/HeaderMain';
  import Tasks         from '~/components/tasks/Tasks';

  let tasksModel = (i = 3) => {
    let model  = [],
        single = i - 1;

    while (i--) {
      let isSingle = single === i,
          title    = isSingle
            ? ['Прочитать слова']
            : ['Помыть посуду', 'Убраться в комнате', 'Почистить зубы', 'Сходить в сад'];

      model.push({
        id: i,
        title: title[getRundomInt(0, title.length)],
        currency: 'руб',
        value: isSingle ? 1 : getRundomInt(1, 2000),
        single: !isSingle,
      });
    }

    return model;
  };

  export default {
    components: {
      HeaderMain,
      Tasks,
    },

    data() {
      return {
        tasks: tasksModel(),
      };
    },

    computed: mapState([
      'auth',
    ]),
  };
</script>

