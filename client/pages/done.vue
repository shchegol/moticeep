<template>
  <v-container>
    <motivators></motivators>
    <emptiness-message></emptiness-message>
  </v-container>
</template>

<script>
  import Motivators       from '~/components/motivators/Motivators';
  import EmptinessMessage from '~/components/EmptinessMessage';

  export default {
    name: 'PageDone',

    components: {
      Motivators,
      EmptinessMessage,
    },

    middleware: ['notAuthenticated', 'headerChange'],
  };
</script>
