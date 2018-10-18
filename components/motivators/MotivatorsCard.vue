<template>
  <v-flex xs12 sm6 md4 lg3 xl2>
    <v-card
      :color="motivator.done ? 'success' : undefined"
      :dark="motivator.done"
    >
      <!--<v-img-->
      <!--:src="motivator.img"-->
      <!--aspect-ratio="2.75"-->
      <!--&gt;</v-img>-->

      <v-card-title>
        <div class="headline mb-0">{{ motivator.title }}</div>
      </v-card-title>

      <v-card-actions>
        <template v-if="!motivator.deleted">
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
          </template>

          <span v-else class="title white--text ml-2">
            <v-icon>done</v-icon> {{motivator.value}}
          </span>
        </template>

        <v-spacer></v-spacer>

        <v-btn
          v-if="!motivator.done && !motivator.deleted"
          icon
          @click="motivatorFavorite">
          <v-icon color="orange">
            {{motivator.favorite ? 'star' : 'star_border'}}
          </v-icon>
        </v-btn>

        <v-menu bottom left>
          <v-btn
            icon
            slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>

          <v-list>
            <template v-if="!motivator.deleted">
              <v-list-tile
                v-if="!motivator.done"
                @click="motivatorEdit"
              >
                <v-list-tile-title>Редактировать</v-list-tile-title>
              </v-list-tile>

              <v-list-tile @click="motivatorArchive">
                <v-list-tile-title>{{ motivator.archive ? 'Вернуть из архива' : 'Архивировать' }}</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile @click="motivatorDelete">
              <v-list-tile-title>{{ motivator.deleted ? 'Восстановить' : 'Удалить' }}</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-if="motivator.deleted"
              @click="motivatorDeleteForever"
            >
              <v-list-tile-title>Удалить навсегда</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-actions>

      <v-progress-linear
        v-if="progressVisibility"
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

    computed: {
      progressVisibility() {
        return !this.motivator.archive && !this.motivator.deleted && !this.motivator.done;
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
      motivatorArchive() {
        this.$emit('edit', this.motivator._id, {archive: !this.motivator.archive});
      },
      motivatorDelete() {
        this.$emit('edit', this.motivator._id, {deleted: !this.motivator.deleted});
      },
      motivatorDeleteForever() {
        this.$emit('delete', this.motivator._id);
      },
    },
  };
</script>
