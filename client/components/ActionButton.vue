<template>
  <div>
    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="accent"
        dark
        fab
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="second"
        @click="showTaskModal({})"
      >
        <v-icon>assignment</v-icon>
        <span class="v-btn__label">Задание</span>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="second"
        @click="showMotivatorModal({})"
      >
        <v-icon>cake</v-icon>
        <span class="v-btn__label">Мотиватор</span>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'ActionButton',

    data() {
      return {
        fab: false,
      };
    },

    methods: {
      ...mapActions({
          'showTaskModal': 'tasks/showModal',
          'showMotivatorModal': 'motivators/showModal',
        },
      ),
    },
  };
</script>
