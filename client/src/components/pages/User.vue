<template>
  <div class="animate-page">
    <div class="container-fluid">
      <div class="row align-items-center header header--second">
        <div class="col">
          <router-link to="/" class="mdc-icon-button material-icons mdc-ripple-upgraded--unbounded" aria-label="Back">
            arrow_back
          </router-link>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col">
          User
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
  };
</script>
