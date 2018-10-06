<template>
  <v-flex xs12 sm6 md4 lg3 xl2>
    <v-card>
      <v-card-title>
        <p class="headline mb-0">{{ task.title }}</p>
      </v-card-title>

      <v-card-actions>
        <v-btn
          flat
          large
          color="primary"
          @click="pointsAdd"
        >
          + {{task.value}} {{task.currency}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="taskFavorite">
          <v-icon color="orange">{{task.favorite ? 'star' : 'star_border' }}</v-icon>
        </v-btn>

        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>

          <v-list>
            <v-list-tile @click="taskEdit">
              <v-list-tile-title>Редактировать</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="taskDelete">
              <v-list-tile-title>Удалить</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'TasksCars',

    props: {
      task: {
        type: Object,
        required: true,
      },
    },

    methods: {
      /**
       * Emit action taskUpdate with task data as parameter to the task.vue
       */
      taskEdit() {
        this.$emit('taskUpdate', this.task);
      },
      /**
       * Emit action taskDelete with task id as parameter to the task.vue
       */
      taskDelete() {
        this.$emit('taskDelete', this.task._id);
      },
      /**
       * Emit action taskFavorite with task id as parameter to the task.vue
       */
      taskFavorite() {
        this.$emit('taskFavorite', this.task._id, {favorite: !this.task.favorite});
      },
      /**
       * Emit action pointsAdd with task.value as parameter to the task.vue
       */
      pointsAdd() {
        this.$emit('pointsAdd', {points: this.task.value});
      },
    },
  };
</script>
