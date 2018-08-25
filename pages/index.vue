<template>
  <div class="container">
    <header-main :user="user"></header-main>

    <tasks :user="user"></tasks>

    <hr class="mt-4 mb-5">

    <motivators :user="user"></motivators>
  </div>
</template>

<script>
  import {mapState}     from 'vuex';
  import {getRundomInt} from '~/assets/js/utils';
  import HeaderMain     from '~/components/HeaderMain';
  import Tasks          from '~/components/tasks/Tasks';
  import Motivators     from '~/components/motivators/Motivators';

  export default {
    components: {
      HeaderMain,
      Tasks,
      Motivators,
    },

    middleware: 'notAuthenticated',

    computed: mapState([
      'user',
    ]),
  };
</script>

