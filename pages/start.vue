<template>
  <div class="start">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="start__logo">Motikeep</h1>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <nuxt-link to="/auth" class="btn btn_outline btn_pill btn_white btn_lg">Войти</nuxt-link>
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
