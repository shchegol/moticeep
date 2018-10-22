<template>
  <v-container>
    <motivators></motivators>
  </v-container>
</template>

<script>
  import Motivators from '~/components/motivators/Motivators';

  export default {
    name: 'donate',
    layout: 'default',
    components: {
      Motivators,
    },
  };
</script>
