<template>
  <v-toolbar color="amber" app absolute clipped-left>
    <v-toolbar-title>Motikeep</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/donate">Помочь проекту</v-btn>
      <v-btn flat>{{ user.points }} p</v-btn>
      <!--<v-btn flat to="/user">{{ user.displayName }}</v-btn>-->
      <v-btn icon to="/user">
        <v-avatar
          size="38"
          color="red"
        >
          <span class="white--text headline">A</span>
        </v-avatar>
      </v-btn>

      <v-btn flat @click="logout">Выйти</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'header-main',

    computed: mapState({
      user: state => state.user.item,
    }),

    methods: {
      async logout() {
        try {
          await this.$store.dispatch('logout');
          this.$router.push('/auth');
        } catch (e) {
          console.log(e.message);
        }
      },
    },
  };
</script>
