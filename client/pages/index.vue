<template>
  <v-container>
    <tasks></tasks>

    <v-divider
      v-if="showCardsDivider"
      class="mt-5 mb-5"
    ></v-divider>

    <motivators></motivators>

    <emptiness-message></emptiness-message>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Tasks                  from '~/components/tasks/Tasks';
  import Motivators             from '~/components/motivators/Motivators';
  import EmptinessMessage       from '~/components/EmptinessMessage';

  export default {
    name: 'PageIndex',

    components: {
      Tasks,
      Motivators,
      EmptinessMessage,
    },

    middleware: ['notAuthenticated', 'filter'],

    computed: {
      ...mapGetters({
        showCardsDivider: 'common/showCardsDivider',
      }),
    },
  };
</script>

