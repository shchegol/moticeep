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
      <motivators-card v-for="motivator in motivators"
                       :key="motivator.id" :motivator="motivator"
                       @motivatorEdit="motivatorEditStart"
                       @motivatorDelete="motivatorDelete"
                       @motivatorFavorite="motivatorFavorite"></motivators-card>
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
          <b-button v-if="motivatorModal.isEdit" @click="motivatorEdit" variant="success">Редактировать</b-button>
          <b-button v-else @click="motivatorCreate" variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
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
            _id: '',
            title: '',
            img: 'http://www.stihi.ru/pics/2016/07/28/10120.jpg',
            description: '',
            value: 0,
            maxValue: 0,
          },
          isEdit: false,
        },

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
        this.motivatorModal.data = motivator;
        this.motivatorModal.isEdit = true;
        this.modalShow();
      },

      clearForm() {
        this.motivatorModal.data._id = '';
        this.motivatorModal.data.title = '';
        this.motivatorModal.data.value = 0;
        this.motivatorModal.data.img = 'http://www.stihi.ru/pics/2016/07/28/10120.jpg';
        this.motivatorModal.data.description = '';
        this.motivatorModal.data.maxValue = 0;
      },

      async motivatorCreate() {
        try {
          const {data} = await axios.post(`/api/motivators`, {
            userId: this.user._id,
            motivator: {
              title: this.motivatorModal.data.title,
              value: this.motivatorModal.data.value,
              img: this.motivatorModal.data.img,
              // description: this.motivatorModal.data.description,
              maxValue: this.motivatorModal.data.maxValue,
            },
          });

          this.motivators = data;
          this.modalHide();
          this.clearForm();
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }
          throw error;
        }
      },

      async motivatorEdit() {
        try {
          const {data} = await axios.put(`/api/motivators/${this.motivatorModal.data._id}`, {
            userId: this.user._id,
            motivator: this.motivatorModal.data,
          });
          this.motivators = data;
          this.modalHide();
          this.clearForm();
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async motivatorDelete(motivator) {
        try {
          const {data} = await axios.delete(`/api/motivators/${motivator._id}`, {
            params: {
              userId: this.user._id,
            },
          });
          this.motivators = data;
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async motivatorFavorite(motivator) {
        motivator.favourite = !motivator.favourite;

        try {
          const {data} = await axios.put(`/api/motivators/${motivator._id}`, {
            userId: this.user._id,
            motivator: motivator,
          });
          this.motivators = data;
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
