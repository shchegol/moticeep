<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>Мотиваторы</h4>
      </div>

      <div class="col-auto">
        <b-button @click="motivatorCreateStart" variant="link" v-b-tooltip.hover title="Добавить мотиватор">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <motivators-card v-for="motivator in motivators" :key="motivator.id"
                       :motivator="motivator"
                       @motivatorUpdate="motivatorUpdateStart"
                       @motivatorDelete="motivatorDelete"
                       @motivatorFavorite="motivatorUpdate"
                       @motivatorDone="motivatorUpdate"></motivators-card>
    </div>

    <!--<div class="form-row">-->
      <!--<motivators-card v-for="motivator in archiveMotivators" :key="motivator.id"-->
                       <!--:motivator="motivator"-->
                       <!--@motivatorDelete="motivatorDelete"></motivators-card>-->
    <!--</div>-->

    <!-- Modal Component -->
    <b-modal ref="motivatorModal" @hidden="clearForm" centered hide-header hide-footer>
      <div class="row">
        <div class="col">
          <h3>{{ motivatorModal.isEdit ? 'Редактировать мотиватор' : 'Новый мотиватор'}}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-group label="Заголовок" label-for="inputTitle">
            <b-form-input v-model="motivatorModal.data.title" id="inputTitle" placeholder="Lego"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group label="Стоимость" label-for="inputValue">
            <b-form-input v-model.number="motivatorModal.data.maxValue" type="number" id="inputValue" placeholder="300"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-auto">
          <b-button v-if="motivatorModal.isEdit" @click="motivatorUpdate(editMotivatorId, motivatorModal.data)" variant="success">Редактировать</b-button>
          <b-button v-else @click="motivatorCreate" variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import _              from 'lodash';
  import axios          from 'axios';
  import MotivatorsCard from '~/components/motivators/MotivatorsCard';

  export default {
    name: 'Motivators',

    components: {
      MotivatorsCard,
    },

    // props: {
    //   user: {
    //     type: Object,
    //     required: true,
    //   },
    // },

    data() {
      return {
        motivatorModal: {
          data: {
            title: null,
            img: null,
            maxValue: null,
          },
          isEdit: false,
        },

        editMotivatorId: '',
        point: 0,
      };
    },

    computed: mapState({
      motivators: state => state.motivators.all
    }),

    // todo серверный рендеринг не выдаёт данную логику, при первой загрузке не видит обложку
    // computed: {
    //   pointsDistribution() {
        // let activeMotivators = _.filter(this.user.motivators, ['done', false])
        // let motivators = _.map(activeMotivators, motivator => Object.assign({}, motivator));
        // let totalPoints = this.user.points;
        // let favorite = _.filter(motivators, 'favorite')
        // let singlePoint;
        //
        // if (favorite.length > 0) {
        //   singlePoint = Math.floor(totalPoints / favorite.length);
        //
        //   _.each(motivators, motivator => {
        //     if (motivator.done) return;
        //
        //     if (motivator.favorite) {
        //       motivator.value = singlePoint;
        //     } else {
        //       motivator.value = 0
        //     }
        //   });
        // } else {
        //   singlePoint = Math.floor(totalPoints / motivators.length);
        //
        //   _.each(motivators, motivator => {
        //     if (motivator.done) return;
        //
        //     motivator.value = singlePoint;
        //   });
        // }

    //     return _.filter(this.user.motivators, ['done', false]);
    //   },
    //
    //   archiveMotivators() {
    //     return _.filter(this.user.motivators, 'done')
    //   }
    // },

    methods: {
      motivatorCreateStart() {
        this.motivatorModal.isEdit = false;
        this.modalShow();
      },

      motivatorUpdateStart(motivator) {
        this.editMotivatorId = motivator._id;
        this.motivatorModal.data.title = motivator.title;
        this.motivatorModal.data.maxValue = motivator.maxValue;
        this.motivatorModal.data.img = motivator.img;
        this.motivatorModal.isEdit = true;
        this.modalShow();
      },

      async motivatorCreate() {
        let createdFields = {
          title: this.motivatorModal.data.title || 'Мечта',
          value: 0,
          maxValue: this.motivatorModal.data.maxValue || 1000,
          img: this.motivatorModal.data.img || '/images/motivator.jpg',
          favorite: false,
          done: false,
        };

        try {
          await this.$store.dispatch('motivatorCreate', createdFields);
          this.modalHide();
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }
          throw error;
        }
      },

      async motivatorUpdate(id, updatedFields) {
        try {
          await this.$store.dispatch('motivatorUpdate', {id, updatedFields});

          this.modalHide();
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async motivatorDelete(id) {
        try {
          await this.$store.dispatch('motivatorDelete', id);
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      modalShow() {
        this.$refs.motivatorModal.show();
      },

      modalHide() {
        this.$refs.motivatorModal.hide();
      },

      clearForm() {
        _.forIn(this.motivatorModal.data, (value, key) => {
          this.motivatorModal.data[key] = null;
        });
      },
    },
  };
</script>
