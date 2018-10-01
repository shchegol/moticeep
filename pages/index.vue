<template>
  <v-container class="mt-5">
    <tasks></tasks>
    <v-divider class="mt-5 mb-5"></v-divider>
    <motivators></motivators>
  </v-container>
</template>

<script>
  import Tasks          from '~/components/tasks/Tasks';
  import Motivators     from '~/components/motivators/Motivators';

  export default {
    components: {
      Tasks,
      Motivators,
    },

    middleware: 'notAuthenticated',
  };
</script>

