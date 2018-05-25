<template>
  <div class="container-fluid">
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
            <td v-for="date in dateModel" :key="date">{{date}}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data, index) in dataModel" :key="index">
            <td v-for="date in dateModel" :key="date">date</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  let data = [];
  let daysInMonth = moment(new Date(), 'YYYY-MM').daysInMonth();

  for (let i = 0; i < daysInMonth; i++) {
    data.push(i);
  }

  export default {
    name: 'Main',
    data() {
      return {
        dataModel: [
          {
            name: 'Детский сад',
            date: {
              '1': 40,
              '2': 40,
              '4': 40,
              '5': 40,
              '8': 40,
            },
          },
          {
            name: 'Чтение',
            date: {
              '2': 12,
              '11': 22,
              '15': 56,
              '20': 21,
            },
          },
        ],
        dateModel: data,
      };
    },
    mounted() {

    },
  };
</script>
