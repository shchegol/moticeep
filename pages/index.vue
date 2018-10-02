<template>
  <v-container class="mt-5">
    <tasks></tasks>
    <v-divider class="mt-5 mb-5"></v-divider>
    <motivators></motivators>

    <v-btn
      fab
      color="accent"
      fixed
      bottom
      right
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import Tasks      from '~/components/tasks/Tasks';
  import Motivators from '~/components/motivators/Motivators';

  export default {
    components: {
      Tasks,
      Motivators,
    },
    middleware: 'notAuthenticated',
    data() {
      return {
        dialog: false,
      };
    },
  };
</script>

