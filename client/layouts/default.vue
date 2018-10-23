<template>
  <v-app>
    <header-main></header-main>
    <navigation-drawer></navigation-drawer>

    <v-content class="main-container">
      <nuxt/>
    </v-content>

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
  </v-app>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import HeaderMain       from '~/components/HeaderMain';
  import NavigationDrawer from '../components/NavigationDrawer';
  import ActionButton     from '~/components/ActionButton';

  export default {
    components: {
      NavigationDrawer,
      HeaderMain,
      ActionButton,
    },

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
