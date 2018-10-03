<template>
  <v-container class="mt-5">
    <tasks></tasks>
    <v-divider class="mt-5 mb-5"></v-divider>
    <motivators></motivators>

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
        @click="dialogTask = true"
      >
        <v-icon>assignment</v-icon>
        <span class="v-btn__label">Задание</span>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="second"
        @click="dialogMotivator = true"
      >
        <v-icon>cake</v-icon>
        <span class="v-btn__label">Мотиватор</span>
      </v-btn>
    </v-speed-dial>



    <v-dialog
      v-model="dialogTask"
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
            @click="dialog = false"
          >
            Отменить
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="dialogMotivator"
      width="500"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Создать мотиватор</span>
        </v-card-title>

        <v-card-text>
          <v-container class="pa-0">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Заголовок"
                  placeholder="Мечта"
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
            @click="dialog = false"
          >
            Отменить
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Tasks      from '~/components/tasks/Tasks';
  import Motivators from '~/components/motivators/Motivators';

  export default {
    components: {
      Tasks,
      Motivators,
    },
    middleware: 'notAuthenticated',
    data() {
      return {
        dialogTask: false,
        dialogMotivator: false,
        fab: false,
      };
    },
  };
</script>

