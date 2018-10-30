<template>
  <v-app>
    <header-main>
      <v-btn
        slot="nav-button"
        icon
        to="/"
        class="hidden-xs-only"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </header-main>

    <v-content class="main-container">
      <nuxt/>
    </v-content>

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
  import HeaderMain             from '~/components/HeaderMain';

  export default {
    components: {
      HeaderMain,
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
    },
  };
</script>
