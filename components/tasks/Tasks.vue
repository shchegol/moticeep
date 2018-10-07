<template>
  <v-layout class="mt-3">
    <v-flex>
      <v-layout align-center>
        <v-flex>
          <h3>Задания</h3>
        </v-flex>
      </v-layout>

      <v-container
        fluid
        grid-list-md
        class="pa-0 mt-3"
      >
        <v-layout row wrap>
          <tasks-card
            v-for="task in tasks"
            :key="task.id" :task="task"
            @pointsAdd="pointsAdd"
            @taskUpdate="taskUpdateStart"
            @taskFavorite="taskUpdate"
            @taskDelete="taskDelete">
          </tasks-card>
        </v-layout>
      </v-container>
    </v-flex>

    <tasks-modal></tasks-modal>
  </v-layout>
</template>

<script>
  import {mapState} from 'vuex';
  import _          from 'lodash';
  import TasksCard  from '~/components/tasks/TasksCard';
  import TasksModal  from '~/components/tasks/TasksModal';

  export default {
    name: 'tasks',

    components: {
      TasksCard,
      TasksModal
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
      taskUpdateStart(task) {
        // this.editTaskId = task._id;
        // this.taskModal.data.title = task.title;
        // this.taskModal.data.value = task.value;
        // this.taskModal.data.editable = task.editable;
        //
        // this.taskModal.isEdit = true;
        this.$store.dispatch('tasks/showModal', task)
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
          await this.$store.dispatch('task/create', createdFields);
          this.modalHide();
        } catch (error) {
          throw error;
        }
      },

      async taskUpdate(id, updatedFields) {
        try {
          await this.$store.dispatch('task/update', {id: id, ...updatedFields});

          this.modalHide();
        } catch (error) {
          throw error;
        }
      },

      async taskDelete(id) {
        try {
          await this.$store.dispatch('task/remove', id);
        } catch (error) {
          throw error;
        }
      },

      async pointsAdd(updatedFields) {
        const userId = this.user._id;
        try {
          await this.$store.dispatch('user/update', {
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
    },
  };
</script>
