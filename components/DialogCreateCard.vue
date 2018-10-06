<template>
  <v-card>
    <v-card-title>
      <span class="headline">Создать задание</span>
    </v-card-title>

    <v-card-text>
      <v-container class="pa-0">
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Заголовок"
              placeholder="За труды"
              box
              class="w-100"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click="dialogHide"
      >
        Отменить
      </v-btn>

      <v-btn
        color="primary"
        flat
        @click="dialogHide"
      >
        Создать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'modal-create-card',
    props: {
      dialogType: {
        type: String,
        required: true,
      },
    },
    methods: {
      /**
       * Emit action for hiding dialog window.
       */
      dialogHide() {
        this.$emit('dialog-hide');
      },
    },
  };
</script>
