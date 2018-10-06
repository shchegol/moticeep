<template>
  <v-container class="mt-5">
    <tasks></tasks>
    <v-divider class="mt-5 mb-5"></v-divider>
    <motivators></motivators>

    <action-button></action-button>
  </v-container>
</template>

<script>
  import Tasks           from '~/components/tasks/Tasks';
  import Motivators      from '~/components/motivators/Motivators';
  import ActionButton from '~/components/ActionButton';

  export default {
    components: {
      Tasks,
      Motivators,
      ActionButton,
    },
    middleware: 'notAuthenticated',
  };
</script>

