<template>
  <mdc-layout-app class="animate-page">
    <v-header></v-header>

    <mdc-drawer slot="drawer" :temporary=true toggle-on="toggle-drawer">
      <mdc-drawer-list>
        <mdc-drawer-item start-icon="inbox">Поддержать</mdc-drawer-item>
      </mdc-drawer-list>
    </mdc-drawer>

    <main>
      <mdc-layout-grid>
        <mdc-layout-cell span=12>
          <h2>Достижения {{ totalPoints }}</h2>
        </mdc-layout-cell>

        <mdc-layout-cell
          desktop=3 tablet=4
          v-for="card in cards.pay.data" :key="card.title">
          <pay-card :card="card"></pay-card>
        </mdc-layout-cell>
      </mdc-layout-grid>

      <mdc-layout-grid>
        <mdc-layout-cell span=12>
          <h2>Мотивация {{ balanceMoti }}</h2>
        </mdc-layout-cell>

        <template v-if="cardMotiFavorites.length > 0">
          <mdc-layout-cell desktop=3 tablet=4 v-for="card in cardMotiFavorites" :key="card.title">
            <moti-card :card="card"></moti-card>
          </mdc-layout-cell>
        </template>
      </mdc-layout-grid>
      <mdc-layout-grid>
        <template v-if="cardMoti.length > 0">
          <mdc-layout-cell desktop=3 tablet=4 v-for="card in cardMoti" :key="card.title">
            <moti-card :card="card"></moti-card>
          </mdc-layout-cell>
        </template>
      </mdc-layout-grid>
    </main>

    <mdc-fab fixed icon="add" @click="modal.open=!modal.open"></mdc-fab>

    <mdc-dialog v-model="modal.open" title="Title" accept="Сохранить" cancel="Отменить">
      <mdc-layout-grid>
        <mdc-layout-cell>
          <mdc-textfield v-model="modal.data.title" label="Заголовок"/>
        </mdc-layout-cell>

        <mdc-layout-cell>
          <mdc-textfield v-model="modal.data.points" label="Очки"/>
        </mdc-layout-cell>
      </mdc-layout-grid>
    </mdc-dialog>
  </mdc-layout-app>
</template>

<script>
  import _ from 'lodash';
  import {declOfNum, getRandomNumber} from '@/assets/js/utils';
  import Header from '@/components/layout/Header';
  import PayCard from '@/components/cards/PayCard';
  import MotiCard from '@/components/cards/MotiCard';

  const payCardsData = [];
  const motiCardsData = [];
  let payTitiles = ['Почитала', 'Позанималась английским', 'Убралась', 'Выучила стих'];
  let motiTitiles = ['Lego', 'Кукла, длинный текст, длинный тексты', 'Театр', 'Скейтборд'];
  let motiImages = [
    'https://le-go.ru/files/products/37085_large.jpg',
    'http://xn--80aqafmcch0bg.xn--p1ai/goods_img/goods1/gr_20938/20938161/b_20938161_0.gif',
    'http://shkvarki.org/media/k2/items/cache/8a67139f0be425d6cd3af06958708fc0_L.jpg',
    'https://static.kinderly.ru/images/products/1/7704/33439256/large_img7238713.jpg',
  ];
  let i;
  let j;

  for (i = payTitiles.length; i--;) {
    payCardsData.push({
      title: payTitiles[i],
      points: Math.floor(getRandomNumber(1, 51)),
    });
  }

  for (j = motiTitiles.length; j--;) {
    motiCardsData.push({
      title: motiTitiles[j],
      image: motiImages[j],
      cost: Math.floor(getRandomNumber(500, 3001)),
      favorite: Boolean(Math.floor(getRandomNumber(0, 2))),
    });
  }

  export default {
    name: 'Main',
    components: {
      'v-header': Header,
      'pay-card': PayCard,
      'moti-card': MotiCard,
    },
    data() {
      return {
        cards: {
          pay: {
            data: payCardsData,
          },
          moti: {
            data: motiCardsData,
          },
        },
        modal: {
          open: false,
          data: {
            title: '',
            points: '',
          },
        },
      };
    },
    computed: {
      totalPoints() {
        let points = this.$store.state.totalPoints;
        return `${points} ${declOfNum(points, ['очко', 'очка', 'очков'])}`;
      },
      balanceMoti() {
        let points = 0;

        _.forEach(this.cards.moti.data, (card) => {
          points += card.cost;
        });

        return `${points} ${declOfNum(points, ['очко', 'очка', 'очков'])}`;
      },
      cardMoti() {
        return _.filter(this.cards.moti.data, ['favorite', false]);
      },
      cardMotiFavorites() {
        return _.filter(this.cards.moti.data, 'favorite');
      },
    },
  };
</script>
