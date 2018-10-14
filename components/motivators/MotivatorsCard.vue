<template>
  <v-flex xs12 sm6 md4 lg3 xl2>
    <v-card>
      <!--<v-img-->
        <!--:src="motivator.img"-->
        <!--aspect-ratio="2.75"-->
      <!--&gt;</v-img>-->

      <v-card-title>
          <div class="headline mb-0">{{ motivator.title }}</div>
      </v-card-title>

      <v-card-actions>
        <template v-if="!motivator.done">
          <template v-if="motivator.value >= motivator.maxValue">
            <v-btn
              flat
              color="primary"
              @click="motivatorDone"
            >
              Достигнуто
            </v-btn>
          </template>

          <template v-else>
            <span class="grey--text ml-2">{{motivator.value}} из {{motivator.maxValue}}</span>
          </template>

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
        <v-progress-linear
          v-model="motivator.valuePercent"
          height="12"
          color="green"
          class="mt-0"
        ></v-progress-linear>
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
        this.$emit('show-modal', this.motivator);
      },
      motivatorFavorite() {
        this.$emit('edit', this.motivator._id, {favorite: !this.motivator.favorite});
      },
      motivatorDone() {
        this.$emit('edit', this.motivator._id, {done: true});
      },
      motivatorDelete() {
        this.$emit('delete', this.motivator._id);
      },
    },
  };
</script>
