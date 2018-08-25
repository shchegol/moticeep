<template>
  <div class="col-12 col-md-6 col-lg-4 mb-2 align-items-stretch">
    <b-card bg-variant="primary" text-variant="white" class="h-100" no-body>
      <div class="row align-items-center justify-content-end no-gutters mt-2">
        <div class="col-auto">
          <b-button @click="taskFavorite" variant="link">
            <i class="material-icons md-24 color-orange-500">{{task.favorite ? 'star' : 'star_border' }}</i>
          </b-button>
        </div>

        <div class="col-auto">
          <b-dropdown variant="primary" right no-caret>
            <template slot="button-content">
              <i class="material-icons md-24">more_vert</i>
            </template>

            <b-dropdown-item-button @click="taskEdit">
              <i class="material-icons">edit</i>&nbsp;Редактировать
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="taskDelete">
              <i class="material-icons">delete</i>&nbsp;Удалить
            </b-dropdown-item-button>
          </b-dropdown>
        </div>
      </div>

      <b-card-body class="d-flex flex-column pt-0">
        <div class="row flex-grow-1">
          <div class="col">
            <h4 class="card-title">{{ task.title }}</h4>
          </div>
        </div>

        <div class="row mt-2">
          <div v-if="task.editable" class="col">
            <b-input-group :append="task.currency">
              <b-form-input v-model="task.value" placeholder="Награда"></b-form-input>
            </b-input-group>
          </div>

          <div v-else class="col text-center">
            <p class="h3">+ {{task.value}} {{task.currency}}</p>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <b-button variant="success" block v-b-tooltip.hover title="Добавить в копилку">
              {{task.editable ? 'Добавить': 'Выполнено'}}
            </b-button>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'TasksCars',

    props: {
      task: {
        type: Object,
        required: true,
      },
    },

    methods: {
      taskEdit() {
        this.$emit('taskEdit', this.task);
      },
      taskDelete() {
        this.$emit('taskDelete', this.task._id);
      },
      taskFavorite() {
        this.$emit('taskFavorite', this.task._id, {favorite: !this.task.favorite});
      }
    },
  };
</script>
