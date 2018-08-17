<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>Задание</h4>
      </div>

      <div class="col-auto">
        <b-button variant="link" v-b-modal.modal1 v-b-tooltip.hover title="Добавить задание">
          <i class="material-icons md-24">add</i>
        </b-button>
      </div>
    </div>

    <div class="form-row">
      <tasks-card v-for="task in tasks" :key="task.id" :task="task"></tasks-card>
    </div>

    <!-- Modal Component -->
    <b-modal id="modal1" centered hide-header hide-footer>
      <div class="row">
        <div class="col">
          <h3>Новое задание</h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-group label="Заголовок" label-for="inputTitle">
            <b-form-input  id="inputTitle" placeholder="Убрать в комнате"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group label="Сумма" label-for="inputValue">
            <b-form-input  id="inputValue" placeholder="300"></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-checkbox v-model="editable">
            редактируемое
          </b-form-checkbox>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-auto">
          <b-button variant="success">Создать</b-button>
        </div>
      </div>
    </b-modal>
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

    data() {
      return {
        editable: false
      }
    }
  };
</script>
