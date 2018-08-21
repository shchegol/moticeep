<template>
  <div class="container-fluid ">
    <div class="row align-items-center">
      <div class="col">
        <nuxt-link to="/" class="btn" v-b-tooltip.hover title="Назад">
          <i class="material-icons md-36">arrow_back</i>
        </nuxt-link>
      </div>

      <div class="col-auto">
        <nuxt-link to="/user/edit" class="btn" v-b-tooltip.hover title="Редактировать">
          <i class="material-icons md-24">edit</i>
        </nuxt-link>
      </div>
    </div>

    <div class="row justify-content-center mt-5">
      <div class="col col-sm-6 col-lg-4">
        <div class="row align-items-center">
          <div class="col">
            <div class="h3">
              {{ user.displayName }}
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <h5>Email</h5>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'user',

    middleware: 'authenticated',

    computed: mapState([
      'user',
    ]),
  };
</script>
