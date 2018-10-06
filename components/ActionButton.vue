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
        class="ma-2"
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="second"
        @click="dialogShow('task')"
      >
        <v-icon>assignment</v-icon>
        <span class="v-btn__label">Задание</span>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="second"
        @click="dialogShow('motivator')"
      >
        <v-icon>cake</v-icon>
        <span class="v-btn__label">Мотиватор</span>
      </v-btn>
    </v-speed-dial>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <dialog-create-card
        :dialog-type="dialogType"
        @dialog-hide="dialogHide"
      >
      </dialog-create-card>
    </v-dialog>
  </div>
</template>

<script>
  import DialogCreateCard from '~/components/DialogCreateCard';

  export default {
    name: 'action-button',
    components: {
      DialogCreateCard,
    },
    data() {
      return {
        dialogType: 'task',
        dialog: false,
        fab: false,
      };
    },
    methods: {
      /**
       * Show dialog window for create/update tasks/motivators
       * @param {string} type - type of card. Can be 'task' or 'motivator'
       */
      dialogShow(type) {
        this.dialogType = type;
        this.dialog = true;
      },
      /**
       * Hide task/motivator dialog window
       */
      dialogHide() {
        this.dialog = false;
      },
    },
  };
</script>
