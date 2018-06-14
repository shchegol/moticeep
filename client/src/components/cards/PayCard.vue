<template>
  <mdc-card :outlined="true">
    <mdc-card-header :title="title" :subtitle="pointsString"></mdc-card-header>

    <mdc-card-actions>
      <mdc-card-action-buttons>
        <mdc-card-action-button>Добавить</mdc-card-action-button>
      </mdc-card-action-buttons>

      <mdc-card-action-icons>
        <mdc-menu-anchor>
          <mdc-card-action-icon raised @click="open=true" icon="more_vert"/>
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
        points: this.card.points,
        open: false,
      };
    },

    computed: {
      pointsString() {
        return `${this.points} ${declOfNum(this.points, ['очко', 'очка', 'очков'])}`;
      },
    },
  };
</script>
