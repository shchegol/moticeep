<template>
  <v-container class="mt-5">
    <v-layout justify-center>
      <v-flex xs12 sm6 md4>
        <v-layout align-center>
          <v-flex xs6>
            <h1>
              {{ user.displayName }}
            </h1>
          </v-flex>

          <v-flex xs6 class="text-xs-right">
            <v-btn flat icon to="/user/edit">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12 class="mt-3">
            <h5>Email</h5>
            <p>{{ user.email }}</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'User',
    middleware: 'notAuthenticated',
    computed: {
      ...mapState('user', {
        user: state => state.item,
      }),
    },
  };
</script>
