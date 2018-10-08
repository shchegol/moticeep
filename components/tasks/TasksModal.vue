<template>
  <v-dialog
    :value="modalIsActive"
    @input="hideModal"
    width="500"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{isEdit ? 'Редактировать' : 'Создать'}} задание
        </span>
      </v-card-title>

      <v-card-text>
        <v-container class="pa-0">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                ref="title"
                :value="modalData.title"
                label="Заголовок"
                placeholder="За труды"
                box
                class="w-100"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                ref="value"
                :value="modalData.value"
                label="Награда"
                placeholder="300"
                box
                class="w-100"
              ></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-switch
                ref="editable"
                label="редактируемое"
                :value="modalData.editable"
              ></v-switch>
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
          @click="submit"
        >
          {{isEdit ? 'Редактировать' : 'Создать'}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import {isEmptyObject}        from '~/assets/js/utils';

  export default {
    name: 'TaskModal',

    data() {
      return {
        task: {
          title: '',
          value: '',
          editable: false,
        },
      };
    },

    computed: {
      ...mapState('tasks', {
        modalIsActive: state => state.modalIsActive,
        modalData: state => state.modalData,
      }),
      isEdit() {
        return !isEmptyObject(this.modalData);
      },
    },

    methods: {
      ...mapActions('tasks', [
        'hideModal',
      ]),

      submit() {
        let action = this.isEdit
          ? 'task-edit'
          : 'task-create';

        _.each(this.$refs, (field, name) => {
          let input = field.$refs.input;

          this.task[name] = (name === 'editable')
            ? input.checked
            : input.value;
        });

        this.$emit(action, this.modalData._id, this.task);
      },
    },
  };
</script>
