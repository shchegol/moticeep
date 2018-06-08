<template>
  <div class="mdc-card mdc-card--outlined card">
    <div :style="{ backgroundImage: `url( ${image} )` }" class="mdc-card__media mdc-card__media--16-9">
    </div>

    <div class="card__content">
      <h4 class="card__title mdc-typography--headline6">{{ title }}</h4>
      <h5 class="card__subtitle mdc-typography--subtitle2">{{ pointsString }}</h5>
    </div>

    <div class="mdc-card__actions">
      <div class="mdc-card__action-icons">
        <button @click="favoriteToggle" class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon">
          {{ favorite ? 'favorite' : 'favorite_border' }}
        </button>
        <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon">more_vert</button>
      </div>
    </div>
  </div>
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
