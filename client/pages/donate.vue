<template>
  <div class="container-fluid ">
    <div class="row">
      <div class="col-auto">
        <nuxt-link to="/" class="btn" v-b-tooltip.hover title="Назад">
          <i class="material-icons md-36">arrow_back</i>
        </nuxt-link>
      </div>
    </div>

    <div class="row justify-content-center mt-5">
      <div class="col col-sm-6 col-lg-4">
        <div class="row align-items-center">
          <div class="col">
            <div class="h3">
              Помочь проекту
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageDonate',
    layout: 'modal',
  };
</script>
