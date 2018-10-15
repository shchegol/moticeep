<template>
  <v-toolbar
    color="primary"
    app
    flat
    dark
    fixed
    clipped-left
    height="64"
  >
    <v-toolbar-side-icon @click.native="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>MOTIKEEP</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-flex class="mr-5 align-self-center">
        <div class="d-flex align-center">
          <v-icon medium class="mr-1">account_balance_wallet</v-icon>
          <span class="title">
            {{ user.points }} p.
          </span>
        </div>

      </v-flex>

      <!--<v-btn flat to="/user">{{ user.displayName }}</v-btn>-->
      <v-btn icon to="/user">
        <v-avatar
          size="38"
          color="red"
        >
          <!--<span class="white&#45;&#45;text headline">A</span>-->
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-avatar>
      </v-btn>

      <v-btn icon @click="logoutStart">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'HeaderMain',

    data() {
      return {
        drawer: true,
      };
    },

    computed: {
      ...mapState({
        user: state => state.user.item,
      }),
    },

    methods: {
      ...mapActions({
          'logout': 'auth/logout',
          'toggleDrawer': 'common/toggleDrawer',
        },
      ),
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
