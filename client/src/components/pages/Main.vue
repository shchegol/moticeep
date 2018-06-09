<template>
  <div class="animate-page">
    <v-header></v-header>

    <div class="container-fluid main">
      <div class="row align-items-center">
        <div class="col">
          <h4>Достижения {{ totalPoints }}</h4>
        </div>
      </div>

      <div class="row align-items-stretch">
        <div v-for="(card, index) in cards.pay.data" :key="index" class="col col-md-6 col-lg-4 mb-3">
          <pay-card :card="card"></pay-card>
        </div>
      </div>
    </div>

    <div class="container-fluid main">
      <div class="row align-items-center">
        <div class="col">
          <h4>Мотивация {{ balanceMoti }}</h4>
        </div>
      </div>

      <template v-if="cardMotiFavorites.length > 0">
        <div class="row">
          <div class="col">
            <h5>Избранное</h5>
          </div>
        </div>

        <div class="row">
          <div v-for="(card, index) in cardMotiFavorites" :key="index" class="col col-md-6 col-lg-4 mb-3">
            <moti-card :card="card"></moti-card>
          </div>
        </div>
      </template>

      <template v-if="cardMoti.length > 0">
        <div class="row mt-5">
          <div v-for="(card, index) in cardMoti" :key="index" class="col col-md-6 col-lg-4 mb-3">
            <moti-card :card="card"></moti-card>
          </div>
        </div>
      </template>
    </div>

    <router-link to="/add-card" tag="button" class="mdc-fab material-icons" aria-label="Favorite">
      <span class="mdc-fab__icon">add</span>
    </router-link>
  </div>
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
  let motiTitiles = ['Lego', 'Кукла', 'Театр', 'Скейтборд'];
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
