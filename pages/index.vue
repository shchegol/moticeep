<template>
  <v-container>
    <tasks v-if="tasksCount > 0"></tasks>

    <v-divider
      v-if="showCardsDivider"
      class="mt-5 mb-5"
    ></v-divider>

    <motivators v-if="motivatorsCount > 0"></motivators>

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
  </v-container>
</template>

<script>
  import Tasks                  from '~/components/tasks/Tasks';
  import Motivators             from '~/components/motivators/Motivators';
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: 'IndexPage',

    components: {
      Tasks,
      Motivators,
    },

    middleware: 'notAuthenticated',

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

      showCardsDivider() {
        if (this.tasksCount !== 0) {
          return this.motivatorsCount !== 0;
        } else {
          return false;
        }
      },

    },
  };
</script>

