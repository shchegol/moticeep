<template>
  <div class="container">
    <header-main></header-main>
    <tasks></tasks>
    <hr class="mt-4 mb-5">
    <motivators></motivators>
  </div>
</template>

<script>

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
  };
</script>

