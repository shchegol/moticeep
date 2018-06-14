<template>

  <mdc-card :outlined="true">
    <mdc-card-primary-action>
      <mdc-card-media :src="image">
      </mdc-card-media>
    </mdc-card-primary-action>
    <mdc-card-header :title="title" :subtitle="pointsString" >
    </mdc-card-header>
    <mdc-card-actions>
      <mdc-card-action-icons>
        <mdc-card-action-icon @click="favoriteToggle" :icon="favorite ? 'favorite' : 'favorite_border'" />
        <mdc-menu-anchor>
          <mdc-card-action-icon raised @click="open=true" icon="more_vert" />
          <mdc-menu v-model="open">
            <mdc-menu-item>Изменить</mdc-menu-item>
            <mdc-menu-item>Удалить</mdc-menu-item>
          </mdc-menu>
        </mdc-menu-anchor>
      </mdc-card-action-icons>
    </mdc-card-actions>
  </mdc-card>
</template>

<script>
  import {declOfNum} from '@/assets/js/utils';

  export default {
    name: 'card',
    props: {
      card: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        title: this.card.title,
        cost: this.card.cost,
        favorite: this.card.favorite,
        image: this.card.image,
        open: false,
      };
    },

    methods: {
      favoriteToggle() {
        this.favorite = !this.favorite;
      },
    },

    computed: {
      pointsString() {
        return `${this.cost} ${declOfNum(this.cost, ['очко', 'очка', 'очков'])}`;
      },
    },
  };
</script>
