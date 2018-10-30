<template>
  <v-app>
    <header-main>
      <v-toolbar-side-icon slot="nav-button" @click="toggleDrawer"></v-toolbar-side-icon>

      <v-toolbar-items slot="toolbar">
        <v-flex class="align-self-center">
          <div class="d-flex align-center">
            <v-icon medium class="mr-1">account_balance_wallet</v-icon>
            <span class="title">
            {{ user.points }} p.
          </span>
          </div>

        </v-flex>

        <v-btn icon to="/user" class="hidden-sm-and-down ml-5">
          <v-avatar
            size="38"
            color="red"
          >
            <!--<span class="white&#45;&#45;text headline">A</span>-->
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-avatar>
        </v-btn>

        <v-btn icon @click="logoutStart" class="hidden-sm-and-down">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </header-main>

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
  import HeaderMain             from '~/components/HeaderMain';
  import NavigationDrawer       from '../components/NavigationDrawer';
  import ActionButton           from '~/components/ActionButton';

  export default {
    components: {
      NavigationDrawer,
      HeaderMain,
      ActionButton,
    },

    computed: {
      ...mapState({
        user: state => state.user.item,
        snackbar: state => state.common.snackbar,
      }),
    },

    methods: {
      ...mapActions({
        'logout': 'auth/logout',
        'toggleDrawer': 'common/toggleDrawer',
        'snackbarHide': 'common/snackbarHide',
      }),

      async logoutStart() {
        try {
          await this.logout();
          this.$router.push('/auth');
        } catch (e) {
          console.log(e.message);
        }
      },
    },
  };
</script>
