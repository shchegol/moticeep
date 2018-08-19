<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>Задание</h4>
      </div>

      <div class="col-auto">
        <b-button variant="link" v-b-modal.modal1 v-b-tooltip.hover title="Добавить задание">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <tasks-card v-for="task in tasks"
                  :key="task.id" :task="task"
                  @taskEdit="taskEdit" @taskDelete="taskDelete"></tasks-card>
    </div>

    <!-- Modal Component -->
    <b-modal ref="taskModal" id="modal1" centered hide-header hide-footer>
      <div class="row">
        <div class="col">
          <h3>Новое задание</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-group label="Заголовок" label-for="inputTitle">
            <b-form-input v-model="title" id="inputTitle" placeholder="Убрать в комнате"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group label="Сумма" label-for="inputValue">
            <b-form-input v-model="value" type="number" id="inputValue" placeholder="300"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-checkbox id="checkbox-editable" v-model="editable">
            редактируемое
          </b-form-checkbox>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-auto">
          <b-button @click="taskCreate" variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios     from 'axios';
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
        title: '',
        value: 0,
        editable: false,

        tasks: this.user.tasks,
      };
    },

    watch: {
      user(freshUser) {
        this.tasks = freshUser.tasks;
      },
    },

    methods: {
      async taskCreate() {
        try {
          const {data} = await axios.post(`/api/tasks`, {
            userId: this.user._id,
            title: this.title,
            value: this.value,
            editable: this.editable,
          });

          this.tasks = data;
          this.$refs.taskModal.hide();
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },

      taskEdit(id) {

      },

      async taskDelete(id) {
        try {
          const {data} = await axios.delete(`/api/tasks/${id}`, {params: {userId: this.user._id, taskId: id}});
          this.tasks = data;
        } catch (error) {
          if (!error.response) {
            throw new Error('Ошибка на сервере');
          }

          throw error;
        }
      },
    },
  };
</script>
