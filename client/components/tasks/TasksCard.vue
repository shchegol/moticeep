<template>
  <v-flex xs12 sm6 md4 lg3 xl2>
    <v-card>
      <v-card-title>
        <p class="headline mb-0">{{ task.title }}</p>
      </v-card-title>

      <v-card-text v-if="!task.deleted" class="py-0">
        <v-text-field
          v-if="task.editable"
          v-model="points"
          type="number"
          label="Награда"
          placeholder="10"
          hide-details
          box
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          v-if="!task.deleted"
          flat
          large
          color="primary"
          @click="pointsAdd"
        >
          <v-icon>add</v-icon>
          {{points}}
        </v-btn>

        <span v-else class="title ml-2">
            <v-icon>add</v-icon> {{points}}
          </span>

        <v-spacer></v-spacer>

        <v-btn
          v-if="!task.deleted"
          icon
          @click="taskFavorite">
          <v-icon color="orange">{{task.favorite ? 'star' : 'star_border' }}</v-icon>
        </v-btn>

        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>

          <v-list>
            <template v-if="!task.deleted">
              <v-list-tile @click="taskEdit">
                <v-list-tile-title>Редактировать</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile @click="taskDelete">
              <v-list-tile-title>{{ task.deleted ? 'Восстановить' : 'Удалить' }}</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-if="task.deleted"
              @click="taskDeleteForever"
            >
              <v-list-tile-title>Удалить навсегда</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'TasksCard',

    data() {
      return {
        points: this.task.value,
      };
    },

    props: {
      task: {
        type: Object,
        required: true,
      },
    },

    methods: {
      taskEdit() {
        this.$emit('show-modal', this.task);
      },
      taskFavorite() {
        this.$emit('edit', this.task._id, {favorite: !this.task.favorite});
      },
      taskDelete() {
        this.$emit('edit', this.task._id, {deleted: !this.task.deleted});
      },
      taskDeleteForever() {
        this.$emit('delete', this.task._id);
      },
      pointsAdd() {
        let value;

        if (this.task.editable) {
          value = this.points;
        } else {
          value = this.task.value;
        }

        this.$emit('points-add', {points: value});
      },
    },
  };
</script>
