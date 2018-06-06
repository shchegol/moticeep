<template>
  <div class="container-fluid">
    <div class="row align-items-center header">
      <div class="col">
        <router-link to="/" class="logo">MOTIKEEP</router-link>
      </div>

      <div class="col-auto">
        <router-link to="/donate" class="mdc-button">
          Поддержать
        </router-link>
      </div>

      <div class="col-auto">
        <router-link to="/user" class="mdc-button mdc-button--img mdc-button--chip">
          <img src="@/assets/images/avatar.png" alt="">
          zelenzoom
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>
