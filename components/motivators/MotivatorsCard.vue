<template>
  <div class="col-12 col-md-6 col-lg-4 mb-2 align-items-stretch">
    <b-card no-body>
      <div class="card-img-top" :style="{'background-image': `url(${motivator.img})`}">
        <div class="row justify-content-end no-gutters card-img-buttons mt-2">
          <div class="col-auto">
            <b-button @click="motivatorFavorite" variant="link">
              <i class="material-icons md-24 color-orange-500">{{motivator.favorite ? 'star' : 'star_border' }}</i>
            </b-button>
          </div>
          <div class="col-auto">
            <b-dropdown variant="link" right no-caret>
              <template slot="button-content">
                <i class="material-icons md-24 text-white">more_vert</i>
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
      </div>

      <div class="card-body">
        <div class="row">
          <div class="col">
            <h4 class="card-title">{{ motivator.title }}</h4>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <b-progress :max=" motivator.maxValue" height="1rem" variant="success" striped>
              <b-progress-bar :value=" motivator.value">
                <strong>{{ motivator.value}} / {{motivator.maxValue}}</strong>
              </b-progress-bar>
            </b-progress>
          </div>
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
        this.$emit('motivatorDelete', this.motivator._id);
      },
      motivatorFavorite() {
        this.$emit('motivatorFavorite', this.motivator._id, {favorite: !this.motivator.favorite});
      }
    },
  };
</script>
