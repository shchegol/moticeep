<template>
  <v-container class="mt-5">
    <tasks></tasks>
    <v-divider class="mt-5 mb-5"></v-divider>
    <motivators></motivators>
    <action-button></action-button>

    <v-snackbar
      :value="snackbar.active"
      :color="snackbar.color"
      :timeout="3000"
      bottom
      @input="snackbarHide"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import Tasks            from '~/components/tasks/Tasks';
  import Motivators       from '~/components/motivators/Motivators';
  import ActionButton     from '~/components/ActionButton';

  export default {
    components: {
      Tasks,
      Motivators,
      ActionButton,
    },

    middleware: 'notAuthenticated',

    computed: {
      ...mapState('common', {
        snackbar: state => state.snackbar,
      }),
    },

    methods: {
      ...mapActions('common', [
        'snackbarHide',
      ]),
    }
  };
</script>

