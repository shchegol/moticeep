<template>
  <v-layout>
    <v-flex>
      <template v-if="sortedTasks.length > 0">
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
          <transition-group name="flip-list" tag="div" class="layout row wrap">
            <tasks-card
              v-for="task in sortedTasks"
              :key="task.id"
              :task="task"
              @points-add="pointsAdd"
              @show-modal="taskEditStart"
              @edit="taskEdit"
              @delete="taskDelete"
            >
            </tasks-card>
          </transition-group>
        </v-container>
      </template>

      <v-layout
        v-else
        align-center
        class="mt-5"
      >
        <v-flex>
          <p class="text-xs-center grey--text darken-1 headline">
            Заданий не найдено.
          </p>
        </v-flex>
      </v-layout>
    </v-flex>

    <tasks-modal
      @task-create="taskCreate"
      @task-edit="taskEdit"
    >
    </tasks-modal>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex';
  import TasksCard                          from '~/components/tasks/TasksCard';
  import TasksModal                         from '~/components/tasks/TasksModal';

  export default {
    name: 'Tasks',

    components: {
      TasksCard,
      TasksModal,
    },

    computed: {
      ...mapState({
        user: state => state.user.item,
      }),
      ...mapGetters('tasks', [
        'sortedTasks',
      ]),
    },

    methods: {
      ...mapActions({
        hideModal: 'tasks/hideModal',
        snackbarShow: 'common/snackbarShow',
      }),

      taskEditStart(task) {
        this.$store.dispatch('tasks/showModal', task);
      },

      async taskCreate(id, createdFields) {
        try {
          await this.$store.dispatch('tasks/create', createdFields);
          this.hideModal();
        } catch (error) {
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
        }
      },

      async taskEdit(id, updatedFields) {
        try {
          await this.$store.dispatch('tasks/update', {id: id, ...updatedFields});
          this.hideModal();
        } catch (error) {
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
        }
      },

      async taskDelete(id) {
        try {
          await this.$store.dispatch('tasks/remove', id);
        } catch (error) {
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
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
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
        }
      },
    },
  };
</script>
