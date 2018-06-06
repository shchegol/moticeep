<template>
  <div>
    <div class="container-fluid">
      <div class="row align-items-center header header--second">
        <div class="col">
          <router-link to="/" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded" aria-label="Add to favorites">
              arrow_back
          </router-link>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <m-input :name="'name'" :label="'Название'" class="w-100"></m-input>
        </div>

        <div class="w-100 d-block d-md-none"></div>

        <div class="col">
          <m-input :name="'reward'" :label="'Количество очков'" class="w-100"></m-input>
        </div>
      </div>

      <button @click="cardAdd" class="mdc-fab material-icons" aria-label="Favorite">
        <span class="mdc-fab__icon">save</span>
      </button>
    </div>
  </div>
</template>

<script>
  import Inpit from '@/components/common/Input';

  export default {
    name: 'Card-set',
    components: {
      'm-input': Inpit,
    },
    data() {
      return {};
    },
    methods: {
      cardAdd() {
        console.log('cardAdd clicked');
      },
    },
  };
</script>
