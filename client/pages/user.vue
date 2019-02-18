<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8 lg6 xl4>
        <v-layout>
          <v-flex class="text-xs-center">
            <croppa
              v-if="isEdit"
              v-model="myCroppa"
              :width="128"
              :height="128"
              :show-remove-button="false"
              canvas-color="#E91E63"
              placeholder=""
              prevent-white-space
              class="v-avatar"
              style="overflow: hidden"
            ></croppa>

            <v-avatar
              v-else
              size="128"
              color="accent"
            >
              <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="avatar">
            </v-avatar>
          </v-flex>
        </v-layout>

        <v-layout :class="{ 'mt-4': isEdit }">
          <v-flex>
            <h1 v-if="!isEdit" class="text-xs-center mt-3">
              {{ user.displayName }}
            </h1>

            <v-text-field
              v-else
              :value="user.displayName"
              label="Логин"
              placeholder="Alex Fincher"
              box
              color="white"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs12>
            <template v-if="!isEdit">
              <h5 class="text-xs-center mt-3">Email</h5>
              <p class="text-xs-center">{{ user.email }}</p>
            </template>

            <v-text-field
              v-else
              :value="user.email"
              label="Email"
              placeholder="name@mail.com"
              box
              color="white"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout v-if="isEdit">
          <v-flex class="text-xs-right">
            <v-btn color="success" class="ma-0">Сохранить</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-btn
      color="accent"
      dark
      fab
      fixed
      bottom
      right
      @click="isEdit = !isEdit"
    >
      <v-icon>{{ isEdit ? 'close' : 'edit' }}</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import {mapState}   from 'vuex';
  import ActionButton from '~/components/ActionButton';

  export default {
    name: 'PageUser',

    components: {
      ActionButton,
    },

    layout: 'single',

    middleware: ['notAuthenticated', 'filter'],

    data() {
      return {
        isEdit: true,
        myCroppa: {}
      };
    },

    computed: {
      ...mapState('user', {
        user: state => state.item,
      }),
    },
  };
</script>
