<template>
  <div class="container-fluid">
    <div class="row align-items-center header">
      <div class="col">
        <h1 class="logo">MOTIKEEP</h1>
      </div>

      <div class="col-auto pr-5">
        <router-link to="/donate" class="mdc-button">
          Поддержать
        </router-link>
      </div>

      <div class="col-auto">
        <router-link to="/user" class="avatar-btn">
          <span class="avatar-btn__img"></span>
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
