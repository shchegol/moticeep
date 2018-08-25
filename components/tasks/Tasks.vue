<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>Задания</h4>
      </div>

      <div class="col-auto">
        <b-button @click="taskCreateStart" variant="link" v-b-tooltip.hover title="Добавить задание">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <tasks-card v-for="task in tasks"
                  :key="task.id" :task="task"
                  @taskEdit="taskEditStart"
                  @taskFavorite="taskEdit"
                  @taskDelete="taskDelete"></tasks-card>
    </div>

    <!-- Modal Component -->
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
          <b-button v-if="taskModal.isEdit" @click="taskEdit(editTaskId, taskModal.data)" variant="success">Редактировать</b-button>
          <b-button v-else @click="taskCreate" variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import _         from 'lodash';
  import TasksCard from '~/components/tasks/TasksCard';

  export default {
    name: 'tasks',

    components: {
      TasksCard,
    },

    props: {
      user: {
        type: Object,
        required: true,
      },
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
        tasks: this.user.tasks,
      };
    },

    watch: {
      user(freshUser) {
        this.tasks = freshUser.tasks;
      },
    },

    methods: {
      taskCreateStart() {
        this.taskModal.isEdit = false;
        this.modalShow();
      },

      taskEditStart(task) {
        this.editTaskId = task._id;
        this.taskModal.data.title = task.title;
        this.taskModal.data.value = task.value;
        this.taskModal.data.editable = task.editable;

        this.taskModal.isEdit = true;
        this.modalShow();
      },

      clearForm() {
        _.forIn(this.taskModal.data, (value, key) => {
          this.taskModal.data[key] = null
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
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }
          throw error;
        }
      },

      async taskEdit(id, updatedFields) {
        try {
          await this.$store.dispatch('taskEdit', {id, updatedFields});

          this.modalHide();
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      async taskDelete(id) {
        try {
          await this.$store.dispatch('taskDelete', id);
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
