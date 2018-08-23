<template>
  <div class="d-flex height_full align-items-center">
    <div class="container text-center">
      <div class="row">
        <div class="col">
            <i class="material-icons md-48">accessibility_new</i>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div>Мотивируй с</div>
          <h1 class="text-primary" style="font-size: 100px">MOTIKEEP</h1>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p class="font-weight-light">
            Простое приложение для преобретения хороших привычек.
          </p>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <nuxt-link to="/auth" class="btn btn-outline-success btn-lg">Войти</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'start',

    middleware: 'authenticated',
  };
</script>

<style scoped>

</style>
