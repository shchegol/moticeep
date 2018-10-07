<template>
  <v-dialog
    v-modal="isShow"
    width="500"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Создать задание</span>
      </v-card-title>

      <v-card-text>
        <v-container class="pa-0">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="values.title"
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
          @click="hideModal"
        >
          Отменить
        </v-btn>

        <v-btn
          color="primary"
          flat
          @click="hideModal"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'tasks-modal',
    data() {
      return {
        isShow: this.isVisible
      }
    },
    computed: mapState({
      isVisible: state => state.tasks.modalVisibility,
      values: state => state.tasks.modalData,
    }),
    methods: {
      ...mapActions({
        hideModal: 'tasks/hideModal',
      }),
    },
  };
</script>
