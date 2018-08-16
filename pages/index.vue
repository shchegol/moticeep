<template>
  <div class="container">
    <main-header :auth="Boolean(auth)"></main-header>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Header     from '~/components/HeaderMain';

  export default {
    components: {
      'main-header': Header,
    },

    data() {
      return {};
    },

    computed: mapState([
      'auth',
    ]),
  };
</script>

