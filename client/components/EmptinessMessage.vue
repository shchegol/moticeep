<template>
  <v-layout
    v-if="emptinessMessage.isShow"
    class="mt-3"
  >
    <v-flex class="text-xs-center mt-5">
      <v-icon
        color="grey lighten-2"
        size="150"
      >{{emptinessMessage.icon}}
      </v-icon>

      <p class="grey--text lighten-2 mt-3">
        {{emptinessMessage.text}}
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: 'EmptinessMessage',

    computed: {
      ...mapState({
        filterType: state => state.common.filterType,
      }),

      ...mapGetters({
        tasksCount: 'tasks/tasksCount',
        motivatorsCount: 'motivators/motivatorsCount',
      }),


      emptinessMessage() {
        let message = {
          icon: '',
          text: '',
          isShow: false,
        };

        if (this.filterType === 'main') {
          message = {
            icon: 'add_circle',
            text: 'Здесь ещё нет добавленных заданий, или мотиваторов.',
            isShow: this.tasksCount === 0 && this.motivatorsCount === 0,
          };
        }

        if (this.filterType === 'done') {
          message = {
            icon: 'work_outline',
            text: 'Нет достигнутых мотиваторов',
            isShow: this.motivatorsCount === 0,
          };
        }

        if (this.filterType === 'deleted') {
          message = {
            icon: 'delete_outline',
            text: 'В корзине пусто',
            isShow: this.tasksCount === 0 && this.motivatorsCount === 0,
          };
        }

        return message;
      },
    },
  };
</script>
