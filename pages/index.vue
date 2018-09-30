<template>
  <div>
    <tasks></tasks>
    <motivators></motivators>
  </div>
</template>

<script>
  import Tasks          from '~/components/tasks/Tasks';
  import Motivators     from '~/components/motivators/Motivators';

  export default {
    components: {
      Tasks,
      Motivators,
    },

    middleware: 'notAuthenticated',
  };
</script>

