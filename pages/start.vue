<template>
  <div class="start">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto">
          <h1 class="start__logo">
            Motikeep
            <span class="start__text">Простое приложение для мотивации людей</span>
          </h1>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-auto">
          <nuxt-link to="/auth" class="start__btn">Войти</nuxt-link>
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
