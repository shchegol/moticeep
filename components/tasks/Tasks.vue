<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>Задание</h4>
      </div>

      <div class="col-auto">
        <b-button variant="link" v-b-tooltip.hover title="Добавить задание">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <tasks-card v-for="task in tasks" :key="task.id" :task="task"></tasks-card>
    </div>
  </div>
</template>

<script>
  import TasksCard from '~/components/tasks/TasksCard';

  export default {
    name: 'tasks',

    components: {
      TasksCard,
    },

    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
  };
</script>
