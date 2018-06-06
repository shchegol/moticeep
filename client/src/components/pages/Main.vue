<template>
  <div>
    <v-header></v-header>

    <div class="container-fluid">
      <div class="row main">
        <div class="col col-md-6 col-lg-4">
          <div class="mdc-card mdc-card--outlined card">
            <div class="card__content">
              <h4 class="card__title mdc-typography--headline6">Прочитала слово</h4>
              <h5 class="card__subtitle mdc-typography--subtitle2">1 очко</h5>
            </div>

            <div class="mdc-card__actions">
              <div class="mdc-card__action-buttons">
                <button class="mdc-button mdc-card__action mdc-card__action--button">Добавить</button>
              </div>
              <div class="mdc-card__action-icons">
                <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Переименовать">edit</button>
                <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Удалить">delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/add-card" tag="button" class="mdc-fab material-icons" aria-label="Favorite">
      <span class="mdc-fab__icon">add</span>
    </router-link>
  </div>
</template>

<script>
  import Header from '@/components/layout/Header';

  export default {
    name: 'Main',
    components: {
      'v-header': Header,
    },
  };
</script>
