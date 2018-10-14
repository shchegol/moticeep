<template>
    <v-toolbar
      color="primary"
      app
      flat
      dark
      dense
      class="pb-2 pt-2"
    >
      <v-toolbar-title>Motikeep</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!--<v-btn-->
        <!--flat-->
        <!--to="/donate"-->
        <!--class="mr-5"-->
        <!--&gt;-->
        <!--Помочь проекту-->
        <!--</v-btn>-->

        <v-flex class="mr-5 align-self-center">
          <span class="title">{{ user.points }} p.</span>
        </v-flex>

        <!--<v-btn flat to="/user">{{ user.displayName }}</v-btn>-->
        <v-btn icon to="/user">
          <v-avatar
            size="38"
            color="red"
          >
            <span class="white--text headline">A</span>
          </v-avatar>
        </v-btn>

        <v-btn flat @click="logoutStart">Выйти</v-btn>
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
      }
    },

    computed: {
      ...mapState({
        user: state => state.user.item,
      }),
    },

    methods: {
      ...mapActions('auth', [
        'logout',
      ]),
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
