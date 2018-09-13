<template>
  <div class="mt-3">
    <div class="row align-items-center">
      <div class="col">
        <h6>Задания</h6>

        <mdc-card>
          <mdc-card-primary-action>
            <mdc-card-media>
            </mdc-card-media>
          </mdc-card-primary-action>
          <mdc-card-header
            title="Title goes here"
            subtitle="subtitle here" >
          </mdc-card-header>
          <mdc-card-actions>
            <mdc-card-action-buttons>
              <mdc-card-action-button>ACTION</mdc-card-action-button>
            </mdc-card-action-buttons>
            <mdc-card-action-icons>
              <mdc-card-action-icon icon="star" />
            </mdc-card-action-icons>
          </mdc-card-actions>
        </mdc-card>
      </div>

      <div class="col-auto">
        <button @click="taskCreateStart" v-b-tooltip.hover title="Добавить задание" type="button" class="btn btn_icon">
          <i class="material-icons md-24">add</i>
        </button>
      </div>
    </div>

    <div class="slider">
      <div class="slider__content">
        <tasks-card v-for="task in tasks"
                    :key="task.id" :task="task"
                    @pointsAdd="pointsAdd"
                    @taskUpdate="taskUpdateStart"
                    @taskFavorite="taskUpdate"
                    @taskDelete="taskDelete">
        </tasks-card>
      </div>
    </div>



    <!-- Modal Component -->
    <!-- todo переписать со всеми проверками -->
    <b-modal ref="taskModal" @hidden="clearForm" centered hide-header hide-footer>
      <div class="row">
        <div class="col">
          <h3>{{ taskModal.isEdit ? 'Редактировать задание' : 'Новое задание'}}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-group label="Заголовок" label-for="inputTitle">
            <b-form-input v-model="taskModal.data.title" id="inputTitle" placeholder="Убрать в комнате"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group label="Сумма" label-for="inputValue">
            <b-form-input v-model.number="taskModal.data.value" type="number" id="inputValue" placeholder="300"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-checkbox id="checkbox-editable" v-model="taskModal.data.editable">
            редактируемое
          </b-form-checkbox>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-auto">
          <b-button v-if="taskModal.isEdit" @click="taskUpdate(editTaskId, taskModal.data)" variant="success">Редактировать</b-button>
          <b-button v-else @click="taskCreate" variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import _          from 'lodash';
  import TasksCard  from '~/components/tasks/TasksCard';

  export default {
    name: 'tasks',

    components: {
      TasksCard,
    },

    data() {
      return {
        taskModal: {
          data: {
            title: null,
            value: null,
            editable: null,
          },
          isEdit: false,
        },
        editTaskId: '',
      };
    },

    computed: mapState({
      tasks: state => state.tasks.all,
    }),

    methods: {
      taskCreateStart() {
        this.taskModal.isEdit = false;
        this.modalShow();
      },

      taskUpdateStart(task) {
        this.editTaskId = task._id;
        this.taskModal.data.title = task.title;
        this.taskModal.data.value = task.value;
        this.taskModal.data.editable = task.editable;

        this.taskModal.isEdit = true;
        this.modalShow();
      },

      clearForm() {
        _.forIn(this.taskModal.data, (value, key) => {
          this.taskModal.data[key] = null;
        });
      },

      async taskCreate() {
        let createdFields = {
          title: this.taskModal.data.title || 'За труды',
          value: this.taskModal.data.value || 1,
          editable: this.taskModal.data.editable || false,
          favorite: false,
        };

        try {
          await this.$store.dispatch('taskCreate', createdFields);
          this.modalHide();
        } catch (error) {
          throw error;
        }
      },

      async taskUpdate(id, updatedFields) {
        try {
          await this.$store.dispatch('taskUpdate', {id: id, ...updatedFields});

          this.modalHide();
        } catch (error) {
          throw error;
        }
      },

      async taskDelete(id) {
        try {
          await this.$store.dispatch('taskDelete', id);
        } catch (error) {
          throw error;
        }
      },

      async pointsAdd(updatedFields) {
        const userId = this.user._id;
        try {
          await this.$store.dispatch('userUpdate', {
            userId,
            updatedFields,
          });
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      modalShow() {
        this.$refs.taskModal.show();
      },

      modalHide() {
        this.$refs.taskModal.hide();
      },
    },
  };
</script>
