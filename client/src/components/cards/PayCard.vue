<template>
  <div class="mdc-card mdc-card--outlined card">
    <div class="card__content">
      <h4 class="card__title mdc-typography--headline6">{{ title }}</h4>
      <h5 class="card__subtitle mdc-typography--subtitle2">{{ pointsString }}</h5>
    </div>

    <div class="mdc-card__actions">
      <div class="mdc-card__action-buttons">
        <button class="mdc-button mdc-card__action mdc-card__action--button">Добавить</button>
      </div>
      <div class="mdc-card__action-icons">
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
        points: this.card.points,
      };
    },

    computed: {
      pointsString() {
        return `${this.points} ${declOfNum(this.points, ['очко', 'очка', 'очков'])}`;
      },
    },
  };
</script>
