<template>
  <v-flex xs12 sm6 md4 lg3 xl2>
    <v-card>
      <v-img
        :src="motivator.img"
        aspect-ratio="2.75"
      ></v-img>

      <v-card-title>
        <p class="headline mb-0">{{ motivator.title }}</p>
      </v-card-title>

      <v-card-actions>
        <template v-if="!motivator.done">
          <v-btn
            v-show="motivator.value >= motivator.maxValue && !motivator.done"
            flat
            large
            color="primary"
            @click="motivatorDone"
          >
            Достигнуто
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="motivatorFavorite">
            <v-icon color="orange">
              {{motivator.favorite ? 'star' : 'star_border' }}
            </v-icon>
          </v-btn>

          <v-menu bottom left>
            <v-btn
              icon
              slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile @click="motivatorEdit">
                <v-list-tile-title>Редактировать</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="motivatorDelete">
                <v-list-tile-title>Удалить</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
          <v-btn
            slot="activator"
            icon
            @click="motivatorDelete">
            <v-icon color="red">delete</v-icon>
          </v-btn>
            <span>Удалить навсегда</span>
          </v-tooltip>
        </template>

      </v-card-actions>
      <v-tooltip bottom>
        <v-progress-linear
          v-model="motivator.value"
          slot="activator"
          height="4"
          color="green"
          class="mt-0"
        ></v-progress-linear>
        <span>{{ motivator.value }} / {{ motivator.maxValue }}</span>
      </v-tooltip>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: 'MotivatorsCard',

    props: {
      motivator: {
        type: Object,
        required: true,
      },

      img: {
        type: String,
      },
    },

    methods: {
      motivatorEdit() {
        this.$emit('motivatorEdit', this.motivator);
      },
      motivatorDelete() {
        this.$emit('motivatorDelete', this.motivator._id);
      },
      motivatorFavorite() {
        this.$emit('motivatorFavorite', this.motivator._id, {favorite: !this.motivator.favorite});
      },
      motivatorDone() {
        this.$emit('motivatorDone', this.motivator._id, {done: true});
      },
    },
  };
</script>
