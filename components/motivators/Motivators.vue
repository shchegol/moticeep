<template>
  <v-layout class="mt-3">
    <v-flex>
      <v-layout align-center>
        <v-flex>
          <h3>Мотиваторы</h3>
        </v-flex>
      </v-layout>

      <v-container
        fluid
        grid-list-md
        class="pa-0 mt-3"
      >
        <transition-group name="flip-list" tag="div" class="layout row wrap">
          <motivators-card
            v-for="motivator in sortedMotivators"
            :key="motivator.id"
            :motivator="motivator"
            @show-modal="showModal"
            @edit="motivatorEdit"
            @delete="motivatorDelete"
          >
          </motivators-card>
        </transition-group>
      </v-container>
    </v-flex>

    <motivators-modal
      @create="motivatorCreate"
      @edit="motivatorEdit"
    >
    </motivators-modal>
  </v-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import MotivatorsCard           from '~/components/motivators/MotivatorsCard';
  import MotivatorsModal          from '~/components/motivators/MotivatorsModal';

  export default {
    name: 'Motivators',

    components: {
      MotivatorsCard,
      MotivatorsModal,
    },

    data() {
      return {
        motivatorModal: {
          data: {
            title: null,
            img: null,
            maxValue: null,
          },
          isEdit: false,
        },

        editMotivatorId: '',
        point: 0,
      };
    },

    computed: {
      ...mapGetters('motivators', [
        'sortedMotivators',
      ]),
    },

    methods: {
      ...mapActions({
        hideModal: 'motivators/hideModal',
        snackbarShow: 'common/snackbarShow',
      }),

      showModal(motivator) {
        this.$store.dispatch('motivators/showModal', motivator);
      },

      async motivatorCreate(id, createdFields) {
        try {
          await this.$store.dispatch('motivators/create', createdFields);
          this.hideModal();
        } catch (error) {
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
        }
      },

      async motivatorEdit(id, updatedFields) {
        try {
          await this.$store.dispatch('motivators/update', {id: id, ...updatedFields});
          this.hideModal();
        } catch (error) {
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
        }
      },

      async motivatorDelete(id) {
        try {
          await this.$store.dispatch('motivators/remove', id);
        } catch (error) {
          this.snackbarShow({
            active: true,
            message: 'Не выходит. Попробуйте попозже.',
          });
        }
      },
    },
  };
</script>
