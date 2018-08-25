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
                       @motivatorEdit="motivatorEditStart"
                       @motivatorDelete="motivatorDelete"
                       @motivatorFavorite="motivatorEdit"></motivators-card>
    </div>

    <!-- Modal Component -->
    <b-modal ref="motivatorModal" centered hide-header hide-footer>
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
          <b-button v-if="motivatorModal.isEdit" @click="motivatorEdit(editMotivatorId, motivatorModal.data)" variant="success">Редактировать</b-button>
          <b-button v-else @click="motivatorCreate" variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import _              from 'lodash';
  import axios          from 'axios';
  import MotivatorsCard from '~/components/motivators/MotivatorsCard';

  export default {
    name: 'Motivators',

    components: {
      MotivatorsCard,
    },

    props: {
      user: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        motivatorModal: {
          data: {
            title: null,
            img: null,
            value: null,
            maxValue: null,
          },
          isEdit: false,
        },
        editMotivatorId: '',
        motivators: this.user.motivators,
      };
    },

    watch: {
      user(freshUser) {
        this.motivators = freshUser.motivators;
      },
    },

    methods: {
      motivatorCreateStart() {
        this.motivatorModal.isEdit = false;
        this.modalShow();
      },

      motivatorEditStart(motivator) {
        this.editMotivatorId = motivator._id;
        this.motivatorModal.data.title = motivator.title;
        this.motivatorModal.data.value = motivator.value;
        this.motivatorModal.data.maxValue = motivator.maxValue;
        this.motivatorModal.data.img = motivator.img;
        this.motivatorModal.isEdit = true;
        this.modalShow();
      },

      clearForm() {
        _.forIn(this.motivatorModal.data, (value, key) => {
          this.motivatorModal.data[key] = null;
        });
      },

      async motivatorCreate() {
        let createdFields = {
          title: this.motivatorModal.data.title || 'Мечта',
          value: 0,
          maxValue: this.motivatorModal.data.maxValue || 1000,
          img: this.motivatorModal.data.img || 'http://www.stihi.ru/pics/2016/07/28/10120.jpg',
          favorite: false,
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

      async motivatorEdit(id, updatedFields) {
        try {
          await this.$store.dispatch('motivatorEdit', {id, updatedFields});

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
    },
  };
</script>
