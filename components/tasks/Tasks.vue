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
            :key="task.id"
            :task="task"
            @points-add="pointsAdd"
            @task-edit="taskEditStart"
            @task-favorite="taskEdit"
            @task-delete="taskDelete"
          >
          </tasks-card>
        </v-layout>
      </v-container>
    </v-flex>

    <tasks-modal
      @task-create="taskCreate"
      @task-edit="taskEdit"
    >
    </tasks-modal>
  </v-layout>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import TasksCard  from '~/components/tasks/TasksCard';
  import TasksModal  from '~/components/tasks/TasksModal';

  export default {
    name: 'tasks',

    components: {
      TasksCard,
      TasksModal
    },

    computed: mapState({
      tasks: state => state.tasks.all,
    }),

    methods: {
      ...mapActions('tasks', [
        'hideModal',
      ]),

      taskEditStart(task) {
        this.$store.dispatch('tasks/showModal', task)
      },

      async taskCreate(task) {
        try {
          await this.$store.dispatch('tasks/create', task);
          this.hideModal();
        } catch (error) {
          throw error;
        }
      },

      async taskEdit(task) {
        try {
          await this.$store.dispatch('tasks/update', task);
          this.hideModal();
        } catch (error) {
          throw error;
        }
      },

      async taskDelete(id) {
        try {
          await this.$store.dispatch('tasks/remove', id);
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
