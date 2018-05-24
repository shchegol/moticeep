<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-2">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Вид работ">
        </div>
      </div>
      <div class="col-2">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Оплата">
        </div>
      </div>
      <div class="col-auto">
        <button type="button" class="btn">
          Добавить
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
          <tr>
            <th>Работа</th>
            <th>Оплата, р.</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Какая-то работа</td>
            <td>40</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
