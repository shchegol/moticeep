<template>
  <div class="col-12 col-md-6 col-lg-4 mb-2 align-items-stretch">
    <b-card :img-src="motivator.img" img-alt="Card Image" img-top>
      <div class="row">
        <div class="col">
          <h4 class="card-title">{{ motivator.title }}</h4>
        </div>

        <div class="col-auto">
          <b-dropdown variant="link" right no-caret>
            <template slot="button-content">
              <i class="material-icons md-24">more_vert</i>
            </template>

            <b-dropdown-item-button @click="motivatorEdit">
              <i class="material-icons">edit</i>&nbsp;Редактировать
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="motivatorDelete">
              <i class="material-icons">delete</i>&nbsp;Удалить
            </b-dropdown-item-button>
          </b-dropdown>
        </div>
      </div>

      <div class="row">
        <div class="col">
          {{ motivator.description }}
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <b-progress :max=" motivator.maxValue" height="2rem" variant="success" striped>
            <b-progress-bar :value=" motivator.value">
              <strong>{{ motivator.value}} / {{motivator.maxValue}}</strong>
            </b-progress-bar>
          </b-progress>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: 'MotivatorsCard',

    props: {
      motivator: {
        type: Object,
        required: true,
      },
    },

    methods: {
      motivatorEdit() {
        this.$emit('motivatorEdit', this.motivator);
      },
      motivatorDelete() {
        this.$emit('motivatorDelete', this.motivator);
      },
    },
  };
</script>
